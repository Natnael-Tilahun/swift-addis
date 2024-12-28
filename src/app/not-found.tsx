"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      <h2 className="text-3xl font-bold">{t("title")}</h2>
      <p className="text-gray-600">{t("description")}</p>
      <Button variant="outline" className="w-fit" asChild>
        <Link href="/">{t("return_home")}</Link>
      </Button>
    </div>
  );
}
