interface BlogContentProps {
    content: string;
  }
  
  export function BlogContent({ content }: BlogContentProps) {
    return (
      <div className="prose prose-lg max-w-none mb-12">
        {content}
      </div>
    );
  }