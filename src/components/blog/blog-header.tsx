import Image from "next/image";
import type { BlogPost } from "@/types/type";

interface BlogHeaderProps {
  post: BlogPost;
}

export function BlogHeader({ post }: BlogHeaderProps) {
  return (
    <header className="mb-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
      <div className="relative h-[400px] rounded-lg overflow-hidden">
        <Image
          src={post.coverImage ?? "/default-cover.jpg"}
          alt={post.title ?? "Blog post cover image"}
          fill
          className="object-cover"
          priority
        />
      </div>
    </header>
  );
}
