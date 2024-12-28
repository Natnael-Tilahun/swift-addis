import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Step4() {
  const t = useTranslations("booking_step4");

  return (
    <div className="flex items-center justify-center">
      <Card className="md:w-2/3 w-full md:h-[400px] h-fit flex flex-col items-center justify-center p-10">
        <CardHeader className="flex flex-col items-center justify-center gap-8">
          <div className="bg-bookingSuccess w-40 h-24"></div>
          <CardTitle className="text-3xl font-semibold">
            {t("title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8">
          <CardDescription>
            {t("description")}
          </CardDescription>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/">{t("buttons.home")}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
