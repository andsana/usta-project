import React from 'react';

interface Span {
  start: number;
  end: number;
  type: string;
}

interface RenderTextProps {
  text: string;
  spans?: Span[];
}

const RenderText: React.FC<RenderTextProps> = ({ text, spans }) => {
  if (!spans || spans.length === 0) return <>{text}</>;

  return (
    <>
      {spans
        .reduce<{ elements: React.ReactNode[]; lastIndex: number }>(
          (acc, span, index) => {
            const beforeText = text.slice(acc.lastIndex, span.start);
            const boldText = text.slice(span.start, span.end);

            return {
              elements: [
                ...acc.elements,
                beforeText && <span key={`before-${index}`}>{beforeText}</span>,
                <span style={{fontWeight: 600}} key={`bold-${index}`}>{boldText}</span>,
              ],
              lastIndex: span.end,
            };
          },
          { elements: [], lastIndex: 0 },
        )
        .elements.concat(text.slice(spans[spans.length - 1].end))}
    </>
  );
};

export default RenderText;
