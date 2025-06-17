import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green Aisle - Sustainable Wedding Planning",
  description:
    "Plan your sustainable wedding with Green Aisle. Connect with vendors, share resources, and reduce waste.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading setup...
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

