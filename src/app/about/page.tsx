"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Shield, Users, Award } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

  return (
    <div className="w-full container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto text-center ">
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="relative h-[550px] w-full mb-6 rounded-2xl overflow-hidden">
        <Image
          src="/resizedlogo.png"
          alt={t("team_image_alt")}
          fill={true}
          className="object-contain rounded-2xl bg-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="p-6">
          <Shield className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("cards.mission.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("cards.mission.description")}
          </p>
        </Card>
        <Card className="p-6">
          <Users className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("cards.team.title")}
          </h3>
          <p className="text-muted-foreground">{t("cards.team.description")}</p>
        </Card>
        <Card className="p-6">
          <Award className="h-12 w-12 text-primary mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("cards.quality.title")}
          </h3>
          <p className="text-muted-foreground">
            {t("cards.quality.description")}
          </p>
        </Card>
      </div>

      <div className="w-full h-full relative space-y-4 flex flex-col tracking-wider leading-7">
        <h2 className="text-3xl font-bold text-center">{t("story.title")}</h2>
        <p>{t.rich("story.paragraphs.intro")}</p>
        <p>{t.rich("story.paragraphs.service")}</p>
        <p>{t("story.paragraphs.services")}</p>
        <p>
          {t.rich("story.paragraphs.motto", {
            motto: (children) => (
              <span className="font-bold text-primary bg-primary/10 p-2 rounded-xl">
                {children}
              </span>
            ),
          })}
        </p>
        <div className="flex flex-col gap-4 items-center justify-center bg-primary/10 rounded-xl p-4 mt-8">
          <blockquote className="text-center font-bold text-xl md:text-2xl text-primary">
            {t("story.closing")}
          </blockquote>
        </div>
      </div>
    </div>
  );
}
