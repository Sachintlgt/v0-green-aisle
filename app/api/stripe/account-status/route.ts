import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not configured');
      return NextResponse.json({ 
        error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.',
        hasAccount: false,
        onboardingComplete: false 
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
        error: 'Database configuration error',
        hasAccount: false,
        onboardingComplete: false 
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
            // This is a read-only operation for GET requests
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
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('user_id', user.id)
      .single();

    if (vendorError || !vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    if (!vendor.stripe_account_id) {
      return NextResponse.json({ 
        hasAccount: false,
        onboardingComplete: false 
      });
    }

    // Check account status with Stripe
    const account = await stripe.accounts.retrieve(vendor.stripe_account_id);
    
    const isOnboardingComplete = account.details_submitted && 
                                account.charges_enabled && 
                                account.payouts_enabled;

    // Update database if onboarding status has changed
    if (isOnboardingComplete !== vendor.stripe_onboarding_complete) {
      await supabaseServer
        .from('vendors')
        .update({ stripe_onboarding_complete: isOnboardingComplete })
        .eq('user_id', user.id);
    }

    return NextResponse.json({
      hasAccount: true,
      onboardingComplete: isOnboardingComplete,
      accountId: vendor.stripe_account_id,
      chargesEnabled: account.charges_enabled,
      payoutsEnabled: account.payouts_enabled,
      detailsSubmitted: account.details_submitted,
      requirements: account.requirements,
      currentlyDue: account.requirements?.currently_due || [],
      eventuallyDue: account.requirements?.eventually_due || [],
      pastDue: account.requirements?.past_due || [],
    });

  } catch (error) {
    console.error('Error checking account status:', error);
    
    // Ensure we always return a JSON response
    const errorMessage = error instanceof Error ? error.message : 'Failed to check account status';
    return NextResponse.json({ 
      error: errorMessage,
      hasAccount: false,
      onboardingComplete: false,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
