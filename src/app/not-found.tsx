import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      <h2 className="text-3xl font-bold">Not Found</h2>
      <p className="text-gray-600">Could not find the requested resource</p>
      <Button variant="outline" className="w-fit" asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
