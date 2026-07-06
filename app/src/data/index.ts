import type { LanguageDef } from '../lib/types'
import { assembly } from './assembly'
import { awk } from './awk'
import { bash } from './bash'
import { batch } from './batch'
import { c } from './c'
import { clojure } from './clojure'
import { cobol } from './cobol'
import { cpp } from './cpp'
import { csharp } from './csharp'
import { css } from './css'
import { dart } from './dart'
import { dashboard } from './dashboard'
import { elixir } from './elixir'
import { email } from './email'
import { erlang } from './erlang'
import { fortran } from './fortran'
import { go } from './go'
import { groovy } from './groovy'
import { haskell } from './haskell'
import { html } from './html'
import { java } from './java'
import { javascript } from './javascript'
import { julia } from './julia'
import { kotlin } from './kotlin'
import { lua } from './lua'
import { matlab } from './matlab'
import { mobileapp } from './mobileapp'
import { nim } from './nim'
import { objectivec } from './objectivec'
import { ocaml } from './ocaml'
import { perl } from './perl'
import { php } from './php'
import { powershell } from './powershell'
import { python } from './python'
import { r } from './r'
import { ruby } from './ruby'
import { rust } from './rust'
import { scala } from './scala'
import { settings } from './settings'
import { solidity } from './solidity'
import { sql } from './sql'
import { swift } from './swift'
import { typescript } from './typescript'
import { vbnet } from './vbnet'
import { wasm } from './wasm'
import { website } from './website'
import { zig } from './zig'

// The full catalog. This array's ORDER IS NOT the display order — the sidebar
// sorts the "Languages" group by each entry's `popularity` field (see
// LanguageDef), so adding or re-ranking a language means editing that number,
// never reordering this list. Languages are listed alphabetically here purely
// for humans; concepts (which have no `popularity`) keep the curated order
// below and always render after the languages.
const catalog: LanguageDef[] = [
  // Languages (alphabetical — display order comes from `popularity`)
  assembly,
  awk,
  bash,
  batch,
  c,
  clojure,
  cobol,
  cpp,
  csharp,
  css,
  dart,
  elixir,
  erlang,
  fortran,
  go,
  groovy,
  haskell,
  html,
  java,
  javascript,
  julia,
  kotlin,
  lua,
  matlab,
  nim,
  objectivec,
  ocaml,
  perl,
  php,
  powershell,
  python,
  r,
  ruby,
  rust,
  scala,
  solidity,
  sql,
  swift,
  typescript,
  vbnet,
  wasm,
  zig,
  // Concepts (curated order; no popularity rank)
  website,
  settings,
  mobileapp,
  dashboard,
  email,
]

// Ranked ascending by popularity; unranked entries (concepts) fall to the end
// in their catalog order via the stable sort.
export const languages: LanguageDef[] = [...catalog].sort(
  (a, b) => (a.popularity ?? Number.POSITIVE_INFINITY) - (b.popularity ?? Number.POSITIVE_INFINITY),
)

export const defaultLanguage: LanguageDef = python
