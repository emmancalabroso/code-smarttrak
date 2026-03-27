import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartTrak Auth",
  description: "Simple SmartTrak sign up and login interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
