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
import {
  Leaf,
  CheckCircle,
  Loader2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function SubscriptionSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<any>(null);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      verifySubscription();
    } else {
      setIsVerifying(false);
    }
  }, [sessionId]);

  const verifySubscription = async () => {
    try {
      const response = await fetch('/api/subscription/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionDetails(data);
        setIsComplete(true);
      }
    } catch (error) {
      console.error('Error verifying subscription:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleContinue = () => {
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
                {isVerifying ? 'Verifying Subscription...' : 
                 isComplete ? 'Subscription Activated!' : 
                 'Subscription Error'}
              </CardTitle>
              
              <CardDescription>
                {isVerifying ? 
                  'We\'re confirming your subscription payment.' :
                  isComplete ? 
                    'Your subscription is now active. Let\'s set up your payment processing!' :
                    'There was an issue with your subscription. Please try again.'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {isComplete && subscriptionDetails && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Subscription activated</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Plan: {subscriptionDetails.planName}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Ready for payment setup</span>
                  </div>
                </div>
              )}
              
              {!isVerifying && !isComplete && (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Your subscription could not be verified.</p>
                  <p>Please contact support if you believe this is an error.</p>
                </div>
              )}
            </CardContent>
            
            <CardFooter>
              {isComplete ? (
                <Button 
                  onClick={handleContinue}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Set Up Payment Processing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : isVerifying ? (
                <Button 
                  variant="outline"
                  disabled
                  className="w-full"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </Button>
              ) : (
                <div className="w-full space-y-2">
                  <Button 
                    onClick={() => router.push('/subscription-plans')}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Choose Plan Again
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    className="w-full"
                  >
                    Contact Support
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
