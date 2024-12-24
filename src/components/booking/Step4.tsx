import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Step4() {
  return (
    <div className="flex items-center justify-center">
      <Card className="md:w-1/2 w-full md:h-[400px] h-fit flex flex-col items-center justify-center p-10">
        <CardHeader className="flex flex-col items-center justify-center gap-8">
          <div className="bg-bookingSuccess w-40 h-24"></div>
          <CardTitle className="text-3xl font-semibold">
            Thank you for booking with us
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-8">
          <CardDescription>
            We will contact you soon to confirm the booking
          </CardDescription>
          <Button className="w-full" variant="outline" asChild>
            <Link href="/">Back to home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
