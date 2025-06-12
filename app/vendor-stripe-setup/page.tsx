"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Leaf,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Shield,
  DollarSign
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface StripeAccountStatus {
  hasAccount: boolean;
  onboardingComplete: boolean;
  accountId?: string;
  chargesEnabled?: boolean;
  payoutsEnabled?: boolean;
  detailsSubmitted?: boolean;
}

export default function VendorStripeSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  const [accountStatus, setAccountStatus] = useState<StripeAccountStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isCreatingLink, setIsCreatingLink] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isRefresh = searchParams.get('refresh') === 'true';

  useEffect(() => {
    if (user) {
      checkAccountStatus();
    }
  }, [user]);

  const checkAccountStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setError('User not authenticated');
        return;
      }

      // Call API to check account status (includes real Stripe API calls)
      const response = await fetch('/api/stripe/account-status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to check account status');
      }

      const data = await response.json();
      setAccountStatus(data);

      // If onboarding is complete, redirect to dashboard
      if (data.onboardingComplete) {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Error checking account status:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while checking account status');
    } finally {
      setIsLoading(false);
    }
  };

  const createStripeAccount = async () => {
    try {
      setIsCreatingAccount(true);
      setError(null);

      if (!user) {
        setError('User not authenticated');
        return;
      }

      // Call API to create real Stripe account
      const response = await fetch('/api/stripe/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('response', response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create Stripe account');
      }

      const data = await response.json();
      console.log('Stripe account created:', data);

      // Refresh account status
      await checkAccountStatus();
    } catch (err) {
      console.error('Error creating Stripe account:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while creating account');
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const createAccountLink = async () => {
    if (!accountStatus?.accountId) return;

    try {
      setIsCreatingLink(true);
      setError(null);

      if (!user) {
        setError('User not authenticated');
        return;
      }

      // Call API to create real Stripe account link
      const response = await fetch('/api/stripe/create-account-link', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: accountStatus.accountId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create account link');
      }

      const data = await response.json();

      // Redirect to Stripe onboarding
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No onboarding URL received');
      }

    } catch (err) {
      console.error('Error creating account link:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while creating account link');
    } finally {
      setIsCreatingLink(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <span className="text-xl font-semibold">Green Aisle</span>
            </Link>
          </div>
        </header>
        
        <main className="flex-1 py-12 md:py-24 bg-green-50 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading your account status...</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-semibold">Green Aisle</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12 md:py-24 bg-green-50">
        <div className="container max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Set Up Payment Processing
            </h1>
            <p className="text-muted-foreground mt-2">
              Connect your Stripe account to receive payments from couples
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isRefresh && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete your Stripe account setup to start receiving payments.
              </AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Account Setup
              </CardTitle>
              <CardDescription>
                We use Stripe to process payments securely. You'll need to complete
                the setup to receive payments from couples.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Benefits section */}
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Secure & Trusted</h3>
                    <p className="text-sm text-muted-foreground">
                      Stripe handles all payment processing with bank-level security
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Fast Payouts</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive payments directly to your bank account within 2 business days
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Easy Management</h3>
                    <p className="text-sm text-muted-foreground">
                      Track all your transactions and manage payouts from your dashboard
                    </p>
                  </div>
                </div>
              </div>

              {/* Account status */}
              {accountStatus && (
                <div className="border rounded-lg p-4 bg-muted/50">
                  <h3 className="font-medium mb-2">Account Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Stripe Account</span>
                      <span className={`flex items-center gap-1 ${
                        accountStatus.hasAccount ? 'text-green-600' : 'text-muted-foreground'
                      }`}>
                        {accountStatus.hasAccount ? (
                          <>
                            <CheckCircle className="h-4 w-4" />
                            Created
                          </>
                        ) : (
                          'Not created'
                        )}
                      </span>
                    </div>
                    
                    {accountStatus.hasAccount && (
                      <>
                        <div className="flex items-center justify-between">
                          <span>Details Submitted</span>
                          <span className={`flex items-center gap-1 ${
                            accountStatus.detailsSubmitted ? 'text-green-600' : 'text-muted-foreground'
                          }`}>
                            {accountStatus.detailsSubmitted ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Complete
                              </>
                            ) : (
                              'Pending'
                            )}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span>Payments Enabled</span>
                          <span className={`flex items-center gap-1 ${
                            accountStatus.chargesEnabled ? 'text-green-600' : 'text-muted-foreground'
                          }`}>
                            {accountStatus.chargesEnabled ? (
                              <>
                                <CheckCircle className="h-4 w-4" />
                                Enabled
                              </>
                            ) : (
                              'Disabled'
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex flex-col gap-4">
              {!accountStatus?.hasAccount ? (
                <Button 
                  onClick={createStripeAccount}
                  disabled={isCreatingAccount}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isCreatingAccount ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Accoun1t...
                    </>
                  ) : (
                    <>
                      Create Stripe Account
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : !accountStatus.onboardingComplete ? (
                <Button 
                  onClick={createAccountLink}
                  disabled={isCreatingLink}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isCreatingLink ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Redirecting...
                    </>
                  ) : (
                    <>
                      Complete Stripe Setup
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              ) : (
                <Button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={() => checkAccountStatus()}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Refresh Status'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
