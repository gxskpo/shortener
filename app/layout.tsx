import type { Metadata } from "next";
import React from "react";
import './global.css'

export const metadata: Metadata = {
  title: "Haruka's url shortener",
  description: "Short url's with ease",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
