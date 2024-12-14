import Image from "next/image";
import { FacebookIcon, TwitterIcon, InstagramIcon } from "lucide-react";
export default function Page() {
  // const id = params.id;
  const blogData = {
    title:
      "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
    image: "/blog5.jpeg",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    postDate: "2024-01-01",
    author: "John Doe",
  };
  return (
    <div className="w-full h-full  p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-16 xl:pb-36 xl:px-36 space-y-8 flex flex-col items-cente justify-center">
      <div className="flex flex-col gap-4 items-center justify-center self-center md:w-1/2">
        <h1 className="text-4xl font-bold text-center">{blogData.title}</h1>
        <div className="flex gap-1 flex-col items-center justify-center">
          <p className="text-lg font-semibold">{blogData.author}</p>
          <p className="text-sm text-muted-foreground">{blogData.postDate}</p>
        </div>
      </div>
      <div className="w-full h-[480px] relative rounded-xl overflow-hidden">
        <Image
          alt={blogData.title}
          quality={100}
          fill={true}
          style={{ objectFit: "cover" }}
          src={blogData.image}
          priority={true}
          loading="eager"
          className=" hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-semibold">Share on social media</h1>
        <div className="flex gap-4 items-center">
          <FacebookIcon className="w-10 h-10 border rounded-lg border-gray-300 p-2" />
          <TwitterIcon className="w-10 h-10 border rounded-lg border-gray-300 p-2" />
          <InstagramIcon className="w-10 h-10 border rounded-lg border-gray-300 p-2" />
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
    </div>
  );
}
