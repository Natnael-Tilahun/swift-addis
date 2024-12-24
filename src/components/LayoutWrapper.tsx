"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";

const queryClient = new QueryClient();

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapseNav, setCollapseNav] = useState(true);

  function toggleMenu() {
    setCollapseNav((prevState) => !prevState);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Header toggleMenu={toggleMenu} collapseNav={collapseNav} />
      <main className="h-full w-full row-start-2">{children}</main>
      <Footer  />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
