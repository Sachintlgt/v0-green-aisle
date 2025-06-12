"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";
import type { Database } from "@/types/supabase";

type Vendor = Database["public"]["Tables"]["vendors"]["Row"];
type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface VendorStatus {
  isVendor: boolean;
  vendor: Vendor | null;
  profile: Profile | null;
  hasStripeAccount: boolean;
  stripeOnboardingComplete: boolean;
}

export function useVendorStatus() {
  const { user } = useAuth();
  const [vendorStatus, setVendorStatus] = useState<VendorStatus>({
    isVendor: false,
    vendor: null,
    profile: null,
    hasStripeAccount: false,
    stripeOnboardingComplete: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setVendorStatus({
        isVendor: false,
        vendor: null,
        profile: null,
        hasStripeAccount: false,
        stripeOnboardingComplete: false,
      });
      setLoading(false);
      return;
    }

    async function loadVendorStatus() {
      if(!user) return
      try {
        setLoading(true);
        setError(null);

        // Get user profile to check user type
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        const isVendor = profile.user_type === "vendor";

        if (!isVendor) {
          setVendorStatus({
            isVendor: false,
            vendor: null,
            profile,
            hasStripeAccount: false,
            stripeOnboardingComplete: false,
          });
          return;
        }

        // If user is a vendor, get vendor details
        const { data: vendor, error: vendorError } = await supabase
          .from("vendors")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (vendorError) {
          // Vendor profile might not exist yet
          setVendorStatus({
            isVendor: true,
            vendor: null,
            profile,
            hasStripeAccount: false,
            stripeOnboardingComplete: false,
          });
          return;
        }

        setVendorStatus({
          isVendor: true,
          vendor,
          profile,
          hasStripeAccount: !!vendor.stripe_account_id,
          stripeOnboardingComplete: !!vendor.stripe_onboarding_complete,
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    }

    loadVendorStatus();
  }, [user]);

  const refreshVendorStatus = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const isVendor = profile.user_type === "vendor";

      if (!isVendor) {
        setVendorStatus({
          isVendor: false,
          vendor: null,
          profile,
          hasStripeAccount: false,
          stripeOnboardingComplete: false,
        });
        return;
      }

      const { data: vendor, error: vendorError } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (vendorError) {
        setVendorStatus({
          isVendor: true,
          vendor: null,
          profile,
          hasStripeAccount: false,
          stripeOnboardingComplete: false,
        });
        return;
      }

      setVendorStatus({
        isVendor: true,
        vendor,
        profile,
        hasStripeAccount: !!vendor.stripe_account_id,
        stripeOnboardingComplete: !!vendor.stripe_onboarding_complete,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return {
    ...vendorStatus,
    loading,
    error,
    refreshVendorStatus,
  };
}
