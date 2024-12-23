import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { blogPosts } from "@/lib/blog-posts";

export default function Blogs() {
  // const blogs = [
  //   {
  //     id: 1,
  //     title:
  //       "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
  //     image: "/blog1.jpg",
  //   },
  //   {
  //     id: 2,
  //     title:
  //       "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
  //     image: "/blog2.png",
  //   },
  //   {
  //     id: 3,
  //     title:
  //       "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
  //     image: "/blog3.jpeg",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
  //     image: "/blog4.jpeg",
  //   },
  //   {
  //     id: 5,
  //     title:
  //       "How to Maximize the Life of Your Vehicle's Ceramic Coating: Essential Maintenance Tips",
  //     image: "/blog5.jpeg",
  //   },
  // ];

  return (
    // <div className="w-full h-full  p-5 pb-16 lg:p-14 lg:pb-24 xl:pt-16 xl:pb-36 xl:px-36 space-y-11 flex flex-col items-center justify-center">
    //   <div className="flex flex-col gap-4 items-center justify-center">
    //     <h1 className="text-4xl font-bold">Blogs</h1>
    //     <p className="text-sm text-muted-foreground">
    //       If there is anything new happening at Swift Addis regarding our
    //       services and other news, you will find it here.
    //     </p>
    //   </div>

    //   <div className=" gap-x-8 gap-y-20 text-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    //     {blogs.map((blog) => (
    //       <div
    //         key={blog.id}
    //         className="flex flex-col items-center justify-center gap-3"
    //       >
    //         <div className="w-full h-60 bg-red-500 relative overflow-hidden rounded-xl">
    //           <Image
    //             src={blog.image}
    //             className=" hover:scale-105 transition-all duration-300"
    //             alt={blog.title}
    //             fill={true}
    //             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    //             priority={true}
    //             style={{ objectFit: "cover" }}
    //           />
    //         </div>

    //         <Link
    //           href={`/blogs/${blog.id}`}
    //           className="text-2xl hover:text-primary hover:underline"
    //         >
    //           {blog.title}
    //         </Link>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="container mx-auto px-6 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Latest news and tips about car detailing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/blogs/${post.id}`} className="hover:text-primary">
                  {post.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={post.author.image}
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {post.author.name}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(post.publishedAt), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
