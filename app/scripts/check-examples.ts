/**
 * Offline data lint for the language definitions in src/data. Two guards:
 *
 *   1. Foreign comment syntax — flags an example line that uses a comment
 *      delimiter belonging to a DIFFERENT language. This is the class of bug
 *      where the R example was pasted with Julia's block-comment delimiters
 *      (hash-equals ... equals-hash), which R has no equivalent for, and which
 *      contradicted R's own "no native block comment" annotation. The table
 *      below is deliberately conservative — only high-confidence,
 *      language-specific delimiters, each with an allow list — so it stays
 *      false-positive-free. Delimiters shared across many languages (line and
 *      C-style block comments, or a lone hash) are NOT reliable signals and are
 *      intentionally omitted.
 *
 *   2. Ref integrity — every `refs` entry on an example segment must name an
 *      annotation that exists in the same entry (a dangling ref draws a
 *      connector line pointing at nothing), and annotation ids must be unique.
 *
 * Deterministic and offline, so it runs as part of `bun run check`.
 *
 *   bun run check:examples
 */
import { languages } from '../src/data'

type Finding = { entry: string; where: string; detail: string }
const findings: Finding[] = []

// --- foreign comment-syntax rules ---------------------------------------
// A rule fires when a trimmed code line matches `test` inside a language whose
// id is NOT in `allow`. Tests are anchored to the delimiter's real usage (e.g.
// a block-comment marker alone on a line, or followed by a space) so ordinary
// code never trips them. Extend this table as new languages are added.
type SyntaxRule = { label: string; allow: string[]; test: (line: string) => boolean }
const SYNTAX_RULES: SyntaxRule[] = [
  {
    label: 'Julia block comment (#= ... =#)',
    allow: ['julia'],
    test: (t) => t === '#=' || t === '=#' || t.startsWith('#= ') || t.endsWith(' =#'),
  },
  {
    label: 'Lua block comment (--[[ ... ]])',
    allow: ['lua'],
    test: (t) => t.includes('--[['),
  },
  {
    label: 'HTML/XML comment (<!-- ... -->)',
    // php templates legitimately drop back into HTML and use HTML comments
    allow: ['html', 'php'],
    test: (t) => t.includes('<!--') || t.includes('-->'),
  },
  {
    label: 'Ruby block comment (=begin / =end)',
    allow: ['ruby'],
    test: (t) => t === '=begin' || t === '=end' || t.startsWith('=begin '),
  },
  {
    label: 'Perl POD documentation (=pod / =cut / =head ...)',
    allow: ['perl'],
    test: (t) => /^=(pod|cut|head[1-4]?|over|item|back|encoding)\b/.test(t),
  },
]

// --- walk every entry ---------------------------------------------------
for (const lang of languages) {
  // annotation id uniqueness
  const annotationIds = new Set<string>()
  for (const a of lang.annotations) {
    if (annotationIds.has(a.id)) {
      findings.push({
        entry: lang.name,
        where: `annotation "${a.id}"`,
        detail: 'duplicate annotation id',
      })
    }
    annotationIds.add(a.id)
  }

  // concept mockups render a live UI, not code examples — nothing more to lint
  if (!lang.examples) continue

  for (const [variant, segments] of Object.entries(lang.examples)) {
    segments.forEach((seg, i) => {
      // dangling refs
      for (const ref of seg.refs ?? []) {
        if (!annotationIds.has(ref)) {
          findings.push({
            entry: lang.name,
            where: `${variant} segment ${i}`,
            detail: `ref "${ref}" matches no annotation id`,
          })
        }
      }

      // foreign comment syntax
      for (const raw of seg.code.split('\n')) {
        const line = raw.trim()
        if (!line) continue
        for (const rule of SYNTAX_RULES) {
          if (rule.allow.includes(lang.id)) continue
          if (rule.test(line)) {
            findings.push({
              entry: lang.name,
              where: `${variant} segment ${i}`,
              detail: `looks like ${rule.label}, foreign to ${lang.name} — "${line}"`,
            })
          }
        }
      }
    })
  }
}

if (findings.length > 0) {
  console.error(`✗ ${findings.length} example issue(s):`)
  for (const f of findings) {
    console.error(`    [${f.entry}] ${f.where}: ${f.detail}`)
  }
  process.exit(1)
}
console.log(`✓ examples clean across ${languages.length} entries (foreign-syntax + ref integrity)`)
