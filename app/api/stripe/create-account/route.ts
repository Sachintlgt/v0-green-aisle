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

    // Check if vendor already has a Stripe account
    if (vendor.stripe_account_id) {
      return NextResponse.json({ 
        error: 'Stripe account already exists',
        accountId: vendor.stripe_account_id 
      }, { status: 400 });
    }

    // Create Stripe Express account
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'US', // You might want to make this dynamic based on vendor location
      email: user.email,
      business_profile: {
        name: vendor.business_name,
        product_description: `${vendor.business_type} services for weddings`,
        support_email: user.email,
        url: vendor.website || undefined,
      },
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      settings: {
        payouts: {
          schedule: {
            interval: 'daily',
          },
        },
      },
    });

    // Update vendor record with Stripe account ID
    const { error: updateError } = await supabaseServer
      .from('vendors')
      .update({ 
        stripe_account_id: account.id,
        stripe_onboarding_complete: false 
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating vendor:', updateError);
      return NextResponse.json({ error: 'Failed to update vendor record' }, { status: 500 });
    }

    return NextResponse.json({ 
      accountId: account.id,
      success: true,
      message: 'Stripe account created successfully'
    });

  } catch (error) {
    console.error('Error creating Stripe account:', error);
    
    // Ensure we always return a JSON response
    const errorMessage = error instanceof Error ? error.message : 'Failed to create Stripe account';
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
