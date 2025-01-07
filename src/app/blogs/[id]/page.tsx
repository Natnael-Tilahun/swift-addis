import { notFound } from "next/navigation";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogAuthor } from "@/components/blog/blog-author";
import { blogPosts } from "@/lib/blog-posts";
import Head from "next/head";
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
    <>
      <Head>
        <title>{post.title} | Swift Addis</title>
        <meta name="description" content={post.excerpt} />
        <meta name="image" content={post.coverImage} />
      </Head>
      <article className="container mx-auto px-6 py-12">
        <BlogHeader post={post} />
        <BlogContent content={post.content} />
        <BlogAuthor author={post.author} publishedAt={post.publishedAt} />
      </article>
    </>
  );
}
