"use client";

import React from "react";
// import { HashLink } from "react-router-hash-link";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

function Header({
  collapseNav,
  toggleMenu,
}: {
  collapseNav: boolean;
  toggleMenu: () => void;
}) {
  const tCommon = useTranslations("common");
  const tMetadata = useTranslations("metadata");
  const t = useTranslations("header");

  return (
    <nav
      id="header"
      className="flex justify-between items-center flex-wrap px-5 lg:px-14 xl:px-5 fixed inset-x-5 md:inset-x-5 top-5 z-50 h-14 backdrop-blur-md md:bg-[#E6EEFF]/70 bg-[#E6EEFF]/70 border-b text-black rounded-2xl md:rounded-2xl"
    >
      <Link
        href="/"
        scroll={true}
        onClick={() => {
          if (!collapseNav) toggleMenu();
        }}
      >
        <div className="flex items-center justify-center flex-shrink-0 mr-6 gap-4">
          <div className=" w-12 h-12 md:w-14 md:h-14  relative">
            <Image
              src="/logo1.png"
              fill={true}
              alt="A logo of a swift addis"
              className=" bg-contain rounded-full"
            />
          </div>
          <h1 className="font-extrabold text-xl md:text-2xl tracking-tight text-primary uppercase">
            {tMetadata("title")}
          </h1>
        </div>
      </Link>
      <div className=" flex items-center gap-4 w-fit lg:hidden">
        <LanguageSwitcher className="w-fit" />
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded  border-black "
            onClick={toggleMenu}
          >
            {collapseNav ? (
              <svg
                className="fill-current h-3 w-3 font-bold"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>{t("menu")}</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            ) : (
              <svg
                className="fill-current h-3 w-3 font-bold"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`w-full block lg:flex lg:items-center lg:w-auto duration-500 ease-in-out transition-all bg-[#E6EEFF] rounded-2xl md:rounded-none lg:bg-transparent shadow-lg lg:shadow-none fixed lg:static top-16 left-0 ${
          collapseNav ? "hidden" : "block"
        }`}
      >
        <div className="text-md font-bold md:text-center px-6 md:px-0 ">
          <Link
            href="/"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-10  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("home")}
          </Link>
          <Link
            href="/#services"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-10  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("services")}
          </Link>
          <Link
            href="/#gallery"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary  mr-6  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("gallery")}
          </Link>
          <Link
            href="/#testimonials"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-6  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("testimonials")}
          </Link>
          <Link
            href="/#contact"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-6  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("contact")}
          </Link>
          <Link
            href="/about"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-6  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("about")}
          </Link>
          <Link
            href="/blogs"
            scroll={true}
            onClick={toggleMenu}
            className="block mt-4 lg:inline-block lg:mt-0 hover:text-primary mr-10  border-primary pr-2 transition-all duration-200 hover:border-r-4"
          >
            {t("blogs")}
          </Link>
        </div>
        <div className="w-full flex gap-4 p-5 md:w-fit md:p-0">
          {/* <Link
            href="/book"
            scroll={true}
            onClick={toggleMenu}
            className="block text-center text-white py-3 text-lg px-5 leading-none border rounded-lg font-bold lg:inline-block lg:mx-4 lg:py-2 hover:text-white/70 mt-4 lg:mt-0 bg-primary backdrop-blur-sm transition-all duration-300 "
          >
            Book Now
          </Link> */}
          <LanguageSwitcher className="hidden lg:block" />
          <Button
            onClick={toggleMenu}
            className="md:w-fit w-full font-bold px-5 text-lg lg:mt-0  border"
            asChild
          >
            <Link href={`/#services`}>{tCommon("cta")}</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
