import type { ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold text-text">
          {match[1]}
        </strong>
      );
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-i-${i++}`}>{match[2]}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

/**
 * Minimal regex-based markdown renderer for AI-drafted blog content.
 * Supports #/##/### headings, **bold**, *italic*, and -/1. lists.
 * The leading `# Title` line is skipped since the page renders the
 * post title separately above the article body.
 */
export function renderMarkdown(content: string): ReactNode[] {
  const lines = content.trim().split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let nextKey = 0;

  // Explicit read-then-increment as its own statement, so the block's key
  // is never entangled with evaluation order inside the JSX it's used in.
  const takeKey = () => nextKey++;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      const blockKey = takeKey();
      blocks.push(
        <h3 key={blockKey} className="mb-2 mt-6 font-body text-xl font-bold text-text">
          {renderInline(trimmed.slice(4), `h3-${blockKey}`)}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const blockKey = takeKey();
      blocks.push(
        <h2 key={blockKey} className="mb-3 mt-8 font-display text-3xl font-semibold text-text">
          {renderInline(trimmed.slice(3), `h2-${blockKey}`)}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      i++;
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^-\s+/, ""));
        i++;
      }
      const blockKey = takeKey();
      blocks.push(
        <ul key={blockKey} className="my-4 list-disc space-y-1.5 pl-5 marker:text-gold-light">
          {items.map((itemText, idx) => (
            <li key={idx} className="font-body text-base leading-[1.8] text-text-muted">
              {renderInline(itemText, `ul-${blockKey}-${idx}`)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      const blockKey = takeKey();
      blocks.push(
        <ol
          key={blockKey}
          className="my-4 list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-gold-light"
        >
          {items.map((itemText, idx) => (
            <li key={idx} className="font-body text-base leading-[1.8] text-text-muted">
              {renderInline(itemText, `ol-${blockKey}-${idx}`)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    const blockKey = takeKey();
    blocks.push(
      <p key={blockKey} className="my-4 font-body text-base leading-[1.8] text-text-muted">
        {renderInline(trimmed, `p-${blockKey}`)}
      </p>
    );
    i++;
  }

  return blocks;
}
