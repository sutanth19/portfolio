"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function MainNavbar() {
  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 dark:bg-black/50 px-6 py-2">


      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left - Logo / Name */}
        <div className="text-xl font-bold text-primaryLight dark:text-foregroundDark">
          <Link href="#home">SUTANTH</Link>
        </div>

        {/* Right - Nav Links + Theme Toggle */}
        <div className="flex items-center space-x-6">
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

          {/* Dark Mode Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
