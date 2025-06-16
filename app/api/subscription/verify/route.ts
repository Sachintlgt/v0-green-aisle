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

    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 });
    }

    // Get subscription details
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const product = await stripe.products.retrieve(subscription.items.data[0].price.product as string);

    // Map product ID to plan name
    const planNames: { [key: string]: string } = {
      'prod_SU5v6PMffy7iBw': '1',
      'prod_SU5wgCT5gxG1By': '2',
      'prod_SU5xPY7ZRcxDsC': '3',
    };

    const planName = planNames[product.id] || 'Unknown Plan';
    console.log('planName', planName)

    // Update vendor's subscription in database
    const { error: updateError } = await supabaseServer
      .from('vendors')
      .update({ 
        // subscription_tier: planName,
        plan_type: planName,
        subscription_plan_id: product.id,
        subscription_status: 'active',
        stripe_subscription_id: subscription.id,
        stripe_customer_id: session.customer as string,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating vendor subscription:', updateError);
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      planName,
      planId: product.id,
      subscriptionId: subscription.id,
      customerId: session.customer,
      status: subscription.status
    });

  } catch (error) {
    console.error('Error verifying subscription:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to verify subscription';
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
