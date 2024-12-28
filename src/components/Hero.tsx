"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      className="w-full bg-heroImage bg-cover bg-center h-screen -mt-20 p-5 lg:p-14 xl:py-0 xl:px-20 rounded-b-3xl"
      id="hero"
    >
      <div className="flex flex-col gap-8 md:w-1/2 w-full h-full justify-center">
        <div className="flex flex-col italic gap-0">
          <h1 className="text-gray-200 px-4 md:text-4xl text-3xl font-bold">
            {t("title")}
          </h1>
          <h2 className="text-7xl font-extrabold [-webkit-text-stroke:2px_blue] bg-white text-transparent bg-clip-text">
            {t("subtitle")}
          </h2>
        </div>
        <p className="text-white text-xl">{t("hero.description")}</p>
        <div className="flex gap-6">
          <Button
            asChild
            className="md:w-48 w-full bg-primary font-bold text-white border"
          >
            <Link href={`/#services`}>{t("common.book_now")}</Link>
          </Button>
          <Button
            variant="outline"
            className="md:w-48 w-full outline-primary bg-transparent text-white font-bold"
          >
            {t("common.view_packages")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
