"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import type { BlogPost } from '@/types/type';
import { useTranslations } from 'next-intl';

interface BlogAuthorProps {
  author: BlogPost['author'];
  publishedAt: string;
}

export function BlogAuthor({ author, publishedAt }: BlogAuthorProps) {
  const t = useTranslations("blog.author");

  return (
    <div className="flex items-center space-x-4 border-t pt-8">
      <Avatar className="h-12 w-12">
        <AvatarImage 
          src={author?.image} 
          alt={t("author_image_alt", { name: author?.name })} 
        />
        <AvatarFallback>{author?.name?.[0] || t("fallback_avatar")}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author?.name}</p>
        <p className="text-sm text-muted-foreground">
          {t("published_prefix")} {format(new Date(publishedAt), 'MMMM d, yyyy')}
        </p>
      </div>
    </div>
  );
}