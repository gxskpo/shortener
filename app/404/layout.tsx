import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "404 No encontrado",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
