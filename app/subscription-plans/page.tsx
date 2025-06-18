"use client";

import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Leaf,
  Check,
  Crown,
  Zap,
  Gift,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";

interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: string;
  interval: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

const plans: SubscriptionPlan[] = [
  {
    id: "prod_SU5v6PMffy7iBw",
    name: "Free Plan",
    description: "Perfect for getting started with sustainable weddings",
    price: "$0",
    interval: "forever",
    features: [
      "List up to 3 wedding services",
      "Basic profile customization",
      "Access to marketplace",
      "Email support",
      "Basic analytics",
    ],
    icon: <Gift className="h-6 w-6" />,
    buttonText: "Get Started Free",
    buttonVariant: "outline",
  },
  {
    id: "prod_SU5wgCT5gxG1By",
    name: "Pro Plan",
    description: "Best for growing wedding businesses",
    price: "$29",
    interval: "month",
    features: [
      "Unlimited wedding services",
      "Advanced profile customization",
      "Priority marketplace placement",
      "Couple coordination tools",
      "Advanced analytics & insights",
      "Priority email support",
      "Custom booking forms",
    ],
    icon: <Zap className="h-6 w-6" />,
    popular: true,
    buttonText: "Start Pro Trial",
    buttonVariant: "default",
  },
  {
    id: "prod_SU5xPY7ZRcxDsC",
    name: "Unlimited Tier",
    description: "For established wedding professionals",
    price: "$99",
    interval: "month",
    features: [
      "Everything in Pro Plan",
      "Unlimited marketplace listings",
      "Advanced couple matching",
      "White-label solutions",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "24/7 phone support",
    ],
    icon: <Crown className="h-6 w-6" />,
    buttonText: "Go Unlimited",
    buttonVariant: "secondary",
  },
];

export default function SubscriptionPlansPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const handlePlanSelection = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedPlan(planId);

      if (planId === "prod_SU5v6PMffy7iBw") {
        // Free plan - just update the database
        const response = await fetch('/api/subscription/select-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            planId,
            planName: 'Free Plan'
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to select plan');
        }

        // Redirect to Stripe setup for free plan
        router.push('/vendor-stripe-setup');
      } else {
        // Paid plans - create Stripe checkout session
        const response = await fetch('/api/subscription/create-checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ planId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create checkout session');
        }

        const { url } = await response.json();
        
        if (url) {
          window.location.href = url;
        } else {
          throw new Error('No checkout URL received');
        }
      }
    } catch (err) {
      console.error('Error selecting plan:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
        <div className="container max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your sustainable wedding business. 
              Start with our free plan and upgrade as you grow.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-8 max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative ${
                  plan.popular 
                    ? 'border-green-500 shadow-lg scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.interval}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handlePlanSelection(plan.id)}
                    disabled={loading}
                    variant={plan.buttonVariant}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : ''
                    }`}
                  >
                    {loading && selectedPlan === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {plan.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              All plans include our core sustainability features. 
              Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
