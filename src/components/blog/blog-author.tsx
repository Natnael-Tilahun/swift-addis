import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import type { BlogPost } from '@/types/type';

interface BlogAuthorProps {
  author: BlogPost['author'];
  publishedAt: string;
}

export function BlogAuthor({ author, publishedAt }: BlogAuthorProps) {
  return (
    <div className="flex items-center space-x-4 border-t pt-8">
      <Avatar className="h-12 w-12">
        <AvatarImage src={author?.image} alt={author?.name} />
        <AvatarFallback>{author?.name?.[0] || '?'}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author?.name}</p>
        <p className="text-sm text-muted-foreground">
          Published on {format(new Date(publishedAt), 'MMMM d, yyyy')}
        </p>
      </div>
    </div>
  );
}