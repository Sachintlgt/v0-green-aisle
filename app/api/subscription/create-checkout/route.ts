import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ 
        error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' 
      }, { status: 500 });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
    });

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables not configured');
      return NextResponse.json({ 
        error: 'Database configuration error' 
      }, { status: 500 });
    }

    // Create server-side Supabase client
    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(_cookiesToSet) {
            // This is a read-only operation for POST requests
          },
        },
      }
    );

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabaseServer.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get vendor information
    const { data: vendor, error: vendorError } = await supabaseServer
      .from('vendors')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (vendorError || !vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json({ error: 'Plan ID is required' }, { status: 400 });
    }

    // Get the price for the product from Stripe
    const prices = await stripe.prices.list({
      product: planId,
      active: true,
    });

    if (!prices.data.length) {
      return NextResponse.json({ error: 'No active prices found for this product' }, { status: 404 });
    }

    // Use the first active price (you might want to filter by currency or type)
    const price = prices.data[0];

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription-plans?canceled=true`,
      metadata: {
        user_id: user.id,
        vendor_id: vendor.id,
        plan_id: planId,
      },
      subscription_data: {
        metadata: {
          user_id: user.id,
          vendor_id: vendor.id,
          plan_id: planId,
        },
      },
    });

    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id,
      success: true
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
