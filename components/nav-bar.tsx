"use client";
import { Leaf } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import LogoutButton from "./ui/logout-button";
import { usePathname } from "next/navigation";

function Navbar() {
  let path = usePathname();
  const navMenu = [
    {
      route: "/dashboard",
      title: "Dashboard",
    },
    {
      route: "/floral-marketplace",
      title: "Floral Marketplace",
    },
    {
      route: "/vendor-coordination",
      title: "Vendors",
    },
    {
      route: "/mood-board",
      title: "Mood Board",
    },
    {
      route: "/match",
      title: "Couple Matching",
    },
  ];
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-semibold">Green Aisle</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navMenu.map((item, index) => (
            <Link
              key={index}
              href={item.route}
              className={`text-sm font-medium text-foreground ${
                path === item.route ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Image
              src="/placeholder.svg?height=32&width=32"
              width="32"
              height="32"
              className="rounded-full"
              alt="Avatar"
            />
            <span className="sr-only">User menu</span>
          </Button>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
