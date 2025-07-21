import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import MainNavbar from "@/components/MainNavbar";

export const metadata: Metadata = {
  title: "Sutanth | Portfolio",
  description: "My personal portfolio website",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MainNavbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
