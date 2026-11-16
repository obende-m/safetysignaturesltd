import type { ReactNode } from "react";

/**
 * Renders the small text format used for Security Insights, without injecting HTML:
 * blank-line-separated paragraphs, "## " headings and "- " bullet lists.
 */
export function ArticleBody({ body }: { body: string }) {
  const blocks = body.replace(/\r\n/g, "\n").split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const out: ReactNode[] = [];
  blocks.forEach((block, i) => {
    if (block.startsWith("## ")) {
      out.push(<h2 key={i}>{block.slice(3)}</h2>);
    } else if (block.split("\n").every((l) => l.startsWith("- "))) {
      out.push(
        <ul key={i}>
          {block.split("\n").map((l, j) => (
            <li key={j}>{l.slice(2)}</li>
          ))}
        </ul>,
      );
    } else {
      out.push(<p key={i}>{block.replace(/\n/g, " ")}</p>);
    }
  });
  return <div className="prose-ss">{out}</div>;
}
