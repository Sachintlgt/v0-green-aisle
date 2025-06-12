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
      .select('stripe_account_id')
      .eq('user_id', user.id)
      .single();

    if (vendorError || !vendor || !vendor.stripe_account_id) {
      return NextResponse.json({ error: 'Stripe account not found' }, { status: 404 });
    }

    const { accountId } = await request.json();

    if (!accountId || accountId !== vendor.stripe_account_id) {
      return NextResponse.json({ error: 'Invalid account ID' }, { status: 400 });
    }

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor-stripe-setup?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor-stripe-setup/success`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ 
      url: accountLink.url,
      success: true,
      message: 'Account link created successfully'
    });

  } catch (error) {
    console.error('Error creating account link:', error);
    
    // Ensure we always return a JSON response
    const errorMessage = error instanceof Error ? error.message : 'Failed to create account link';
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
