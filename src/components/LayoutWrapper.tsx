"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapseNav, setCollapseNav] = useState(true);

  function toggleMenu() {
    setCollapseNav((prevState) => !prevState);
  }

  function collapseMenu() {
    setCollapseNav(true);
  }

  return (
    <>
      <Header toggleMenu={toggleMenu} collapseNav={collapseNav} />
      <main collapseMenu={collapseMenu} className="h-full w-full row-start-2">
        {children}
      </main>
      <Footer toggleMenu={toggleMenu} />
    </>
  );
}
