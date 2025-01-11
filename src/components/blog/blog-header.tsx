"use client";

import Image from "next/image";
import type { BlogPost } from "@/types/type";
import { useTranslations } from "next-intl";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  const t = useTranslations("blog.header");

  return (
    <header className="mb-12">
      <h1 className="md:text-4xl text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-xl text-muted-foreground mb-10">{post.excerpt}</p>
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={post.coverImage ?? "/default-cover.jpg"}
          alt={
            post.title
              ? t("post_cover_alt", { title: post.title })
              : t("default_cover_alt")
          }
          fill
          className="object-cover"
          priority={true}
        />
      </div>
    </header>
  );
}
