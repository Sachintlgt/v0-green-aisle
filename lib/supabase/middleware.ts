import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          } catch (error) {
            console.error('Error setting cookies:', error)
          }
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()


  const path = request.nextUrl.pathname
  // *********  Add your public route apart from this everthing is consider as protected routes  *********
  const publicRoute = ['/', '/login', '/onboarding', '/reset-password', '/vendor-stripe-setup', '/vendor-stripe-setup/success']

  const isAuthRoute = publicRoute.includes(path)
  const isStripeSetupRoute = path.startsWith('/vendor-stripe-setup')

  const isApiRoute = path.startsWith('/api');

  if (isApiRoute) {
    // Allow all API routes without redirect
    return NextResponse.next({ request });
  }

  if (!user && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // once logged user can't access the public routes (except Stripe setup routes)
  // if (user && isAuthRoute && !isStripeSetupRoute) {
  if (user && isAuthRoute && !isStripeSetupRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Check if vendor needs to complete Stripe setup
  if (user && !isStripeSetupRoute && path !== '/api/stripe/account-status') {
    try {
      // Get user profile to check if they're a vendor
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', user.id)
        .single()

      if (profile?.user_type === 'vendor') {
        // Check vendor's Stripe status
        const { data: vendor } = await supabase
          .from('vendors')
          .select('stripe_onboarding_complete')
          .eq('user_id', user.id)
          .single()

        // If vendor exists but hasn't completed Stripe setup, redirect to setup
        if (vendor && !vendor.stripe_onboarding_complete) {
          return NextResponse.redirect(new URL('/vendor-stripe-setup', request.url))
        }
      }
    } catch (error) {
      // If there's an error checking vendor status, continue normally
      console.error('Error checking vendor Stripe status:', error)
    }
  }

  return supabaseResponse
}
