"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { blogPosts } from "@/lib/blog-posts";
import { useTranslations } from "next-intl";
import Head from "next/head";
export default function Blogs() {
  const t = useTranslations("blog");

  return (
    <>
      <Head>
        <title>{"Blogs"} | Swift Addis</title>
        <meta name="description" content={"Blogs"} />
      </Head>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-xl text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.coverImage}
                  alt={t("image_alt", { title: post.title })}
                  fill
                  className="object-cover"
                  priority={true}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  <Link
                    href={`/blogs/${post.id}`}
                    className="hover:text-primary"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-10 w-10 border">
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
                    {t("published_at", {
                      date: format(new Date(post.publishedAt), "MMM d, yyyy"),
                    })}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
