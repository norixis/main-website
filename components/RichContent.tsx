import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

interface RichContentProps {
  source: string;
  className?: string;
}

export default function RichContent({ source, className = '' }: RichContentProps) {
  return (
    <div className={`content-prose ${className}`.trim()}>
      <MDXRemote
        source={source}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>
  );
}
