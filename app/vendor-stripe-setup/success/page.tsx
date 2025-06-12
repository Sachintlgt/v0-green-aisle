"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
import { 
  Leaf, 
  CheckCircle, 
  Loader2,
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function StripeSetupSuccessPage() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [accountDetails, setAccountDetails] = useState<any>(null);

  useEffect(() => {
    // Give Stripe a moment to process the completion, then verify
    const timer = setTimeout(() => {
      verifySetupCompletion();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const verifySetupCompletion = async () => {
    try {
      const response = await fetch('/api/stripe/account-status');

      if (response.ok) {
        const data = await response.json();
        setAccountDetails(data);

        if (data.onboardingComplete) {
          setIsComplete(true);
        }
      }
    } catch (error) {
      console.error('Error verifying setup:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
    router.push('/dashboard');
  };

  const handleRetrySetup = () => {
    router.push('/vendor-stripe-setup');
  };

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
        <div className="container max-w-md">
          <Card className="text-center">
            <CardHeader className="pb-4">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                {isVerifying ? (
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                ) : isComplete ? (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                ) : (
                  <Sparkles className="h-8 w-8 text-green-600" />
                )}
              </div>
              
              <CardTitle className="text-2xl">
                {isVerifying ? 'Verifying Setup...' : 
                 isComplete ? 'Setup Complete!' : 
                 'Almost There!'}
              </CardTitle>
              
              <CardDescription>
                {isVerifying ? 
                  'We\'re confirming your Stripe account setup.' :
                  isComplete ? 
                    'Your payment processing is now active. You can start receiving payments from couples!' :
                    'Your Stripe setup is being processed. This may take a few minutes.'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isComplete && accountDetails && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Payment processing enabled</span>
                  </div>
                  {accountDetails.chargesEnabled && (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Charges enabled</span>
                    </div>
                  )}
                  {accountDetails.payoutsEnabled && (
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Payouts enabled</span>
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Ready to receive payments</span>
                  </div>
                </div>
              )}

              {!isVerifying && !isComplete && accountDetails && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Your account setup is still in progress.</p>
                  {accountDetails.currentlyDue && accountDetails.currentlyDue.length > 0 && (
                    <div>
                      <p className="font-medium text-orange-600">Additional information needed:</p>
                      <ul className="list-disc list-inside text-xs">
                        {accountDetails.currentlyDue.map((item: string, index: number) => (
                          <li key={index}>{item.replace(/_/g, ' ')}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {isComplete ? (
                <Button
                  onClick={handleContinue}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Continue to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : isVerifying ? (
                <Button
                  variant="outline"
                  onClick={verifySetupCompletion}
                  disabled={isVerifying}
                  className="w-full"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking...
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  <Button
                    variant="outline"
                    onClick={verifySetupCompletion}
                    className="w-full"
                  >
                    Check Status Again
                  </Button>
                  <Button
                    onClick={handleRetrySetup}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Complete Setup
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
}
