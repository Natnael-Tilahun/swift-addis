import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogAuthor } from "@/components/blog/blog-author";
import { blogPosts } from "@/lib/blog-posts";

interface BlogDetailPageProps {
  params: {
    id: string;
  };
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = blogPosts.find((post) => post.id === params.id);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-6 py-12">
      <BlogHeader post={post} />
      <BlogContent content={post.content} />
      <BlogAuthor author={post.author} publishedAt={post.publishedAt} />
    </article>
  );
}
