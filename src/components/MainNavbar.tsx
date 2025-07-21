"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react"; // optional icons from lucide-react

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function MainNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 dark:bg-black/50 px-6 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold text-primaryLight dark:text-foregroundDark">
          <Link href="#home">SUTANTH</Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex space-x-6">
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="text-foregroundLight dark:text-foregroundDark hover:text-primaryDark font-medium transition-colors duration-200 px-3 py-2"
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden text-foregroundDark dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 space-y-2 px-4 pb-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-foregroundLight dark:text-foregroundDark hover:text-primaryDark font-medium transition-colors duration-200 px-3 py-2"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
