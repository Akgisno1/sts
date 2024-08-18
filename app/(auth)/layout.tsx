import TopBar from "@/components/TopBar";
import type { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Login | Register",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBar />
      <section>
        <div className="h-[91vh] w-screen overflow-hidden ">{children}</div>
      </section>
    </>
  );
}
