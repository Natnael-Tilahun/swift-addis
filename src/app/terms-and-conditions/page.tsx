"use client";

import { useTranslations } from "next-intl";
import Head from "next/head";
export default function TermsAndConditions() {
  const t = useTranslations("terms");

  return (
    <>
      <Head>
        <title>{"Terms and Conditions"} | Swift Addis</title>
        <meta name="description" content={"Terms and Conditions"} />
      </Head>
      <div className="w-full h-full p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-16 xl:pb-36 xl:px-20 space-y-8">
        <h1 className="text-4xl font-semibold">{t("title")}</h1>
        <div className="flex flex-col gap-6 text-lg">
          <div>
            <div className="prose prose-lg max-w-none mb-12">
              {Array.from({ length: 5 }).map((_, index) => (
                <p key={index} className="mb-6">
                  {t(`content.${index}`)}
                </p>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-right">
              {t("updated")} 2024-03-15
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
