"use client";

import { useState, useEffect, useRef } from "react";
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
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setCollapseNav(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function toggleMenu() {
    setCollapseNav((prevState) => !prevState);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={navRef}>
        <Header toggleMenu={toggleMenu} collapseNav={collapseNav} />
      </div>
      <main className="h-full w-full row-start-2">
        {children}
        <Toaster />
      </main>
      <Footer toggleMenu={() => setCollapseNav(true)} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
