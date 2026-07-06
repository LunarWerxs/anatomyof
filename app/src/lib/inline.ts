export interface InlineSegment {
  code: boolean
  text: string
}

/** Split text on `backticks` so templates can render inline code spans. */
export function splitInline(text: string): InlineSegment[] {
  return text
    .split('`')
    .map((part, i) => ({ code: i % 2 === 1, text: part }))
    .filter((s) => s.text.length > 0)
}
