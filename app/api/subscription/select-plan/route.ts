import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(request: NextRequest) {
  try {
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

    const { planId, planName } = await request.json();

    if (!planId || !planName) {
      return NextResponse.json({ error: 'Plan ID and name are required' }, { status: 400 });
    }

    // Update vendor's subscription tier
    const { error: updateError } = await supabaseServer
      .from('vendors')
      .update({ 
        plan_type: planName,
        subscription_plan_id: planId,
        subscription_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating vendor subscription:', updateError);
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Plan selected successfully',
      planId,
      planName
    });

  } catch (error) {
    console.error('Error selecting plan:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to select plan';
    return NextResponse.json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined
    }, { status: 500 });
  }
}
