import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcherSelect from "@/components/LanguageSwitcherSelect";

export default function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();

  return (
    <LanguageSwitcherSelect
      defaultValue={locale}
      items={[
        {
          value: "en",
          label: t("en"),
        },
        {
          value: "am",
          label: t("am"),
        },
      ]}
      label={t("label")}
    />
  );
}
