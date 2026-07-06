import type { LanguageDef } from '../lib/types'

export const nim: LanguageDef = {
  id: 'nim',
  popularity: 102,
  name: 'Nim',
  titleWord: 'Nim',
  article: 'a',
  extensions: ['.nim'],
  accentHex: '#cc9a06',
  officialUrl: 'https://nim-lang.org/',
  shikiLang: 'nim',
  note: 'Nim is a statically typed, compiled systems programming language known for its efficiency, expressiveness, and elegance.',
  annotations: [
    {
      id: 'comment-line',
      title: 'Comment (single-line)',
      body: 'Everything after `#` on a line is ignored by the compiler.',
      details:
        'A single-line comment starts with `#` and runs to the end of the line. The compiler discards it entirely before semantic analysis, so it costs nothing at compile time or runtime -- unlike a `sleep` call, which Nim programmers insist is "just a very thorough comment."\n\nComments can appear on their own line or trail actual code, as in `x = 1 # sets x`. Nim also supports documentation comments (`##`) that `nim doc` extracts into generated HTML documentation, so writing them well pays off twice.',
      learnMore: 'https://nim-lang.org/docs/manual.html#lexical-analysis-comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'comment-block',
      title: 'Comment (block)',
      body: 'A multi-line comment wrapped in `#[ ... ]#`, also ignored by the compiler.',
      details:
        'Block comments open with `#[` and close with `]#`, and unlike C-style `/* */` comments, Nim block comments nest -- you can comment out a region that already contains a block comment without the compiler getting confused about where it ends.\n\nThey are typically used for longer explanations at the top of a file or to temporarily disable a chunk of code during debugging. Because nesting works, "comment out the whole module to bisect the bug" is a safe, if slightly embarrassing, debugging technique.',
      learnMore: 'https://nim-lang.org/docs/manual.html#lexical-analysis-comments',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'imports',
      title: 'Import statement',
      body: 'Brings in modules from the standard library or third-party packages.',
      details:
        '`import std/strutils` pulls in a standard library module, exposing its public procs, types, and templates in the current scope. The `std/` prefix explicitly names the standard library, which disambiguates it from a same-named package a project might install via Nimble.\n\nMultiple modules can be imported on one line (`import std/[strutils, sequtils]`), and `import foo except bar` or `from foo import only: bar` let you control exactly what enters scope, which keeps large programs from drowning in identifier collisions.',
      learnMore: 'https://nim-lang.org/docs/manual.html#modules',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'type-def',
      title: 'Type definition (object)',
      body: 'Defines a custom data structure with `type` and `object`.',
      details:
        "A `type` block introduces one or more type definitions; `object` declares a record type with named, typed fields, similar to a struct in C or a dataclass in Python. Fields are plain values by default (no reference semantics), so assigning one `Person` to another copies it.\n\nObjects support inheritance via `object of RootObj`, optional fields through `case` objects (Nim's tagged unions/variant objects), and can be marked `ref object` when heap allocation and reference semantics are wanted instead.",
      learnMore: 'https://nim-lang.org/docs/manual.html#types-object-types',
      color: 'green',
      side: 'left',
    },
    {
      id: 'proc-def',
      title: 'Procedure definition (proc)',
      body: 'Defines a function or procedure using `proc`.',
      details:
        "`proc` declares a procedure: a named, typed, reusable block of code. Parameters are written `name: Type`, and the return type follows a `:` after the parameter list -- if omitted, the proc returns nothing (Nim's `void`).\n\nProcs are Nim's workhorse abstraction: they can be generic, take default argument values, and be marked with effects like `{.noSideEffect.}` for extra compiler-checked guarantees. A one-expression body can skip the newline-and-indent entirely, as in `proc greet(p: Person) = echo ...`.",
      learnMore: 'https://nim-lang.org/docs/manual.html#procedures',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration & object instantiation',
      body: 'Declares a variable and constructs an object instance.',
      details:
        '`var` declares a mutable variable; Nim infers its type from the initializer, so `var alice = Person(name: "Alice", age: 30)` needs no explicit type annotation. The parenthesized, named-field syntax after the type is object construction -- each field is set explicitly by name, so field order in the source never matters.\n\nNim also offers `let` for a single-assignment binding (preferred whenever a value never changes) and `const` for a value computed entirely at compile time. Reaching for `var` by default and tightening to `let` later is a common, low-drama refactor.',
      learnMore: 'https://nim-lang.org/docs/manual.html#statements-and-expressions-var-statement',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'loop',
      title: 'Control flow (loop)',
      body: 'Repeats code with `for` or `while`.',
      details:
        "`for i in 1..3:` iterates over a range -- `1..3` is inclusive on both ends, giving 1, 2, 3, which trips up newcomers expecting Python's exclusive-upper-bound `range`. Nim also provides `1..<3` for an explicitly exclusive upper bound and `countdown(3, 1)` for iterating backwards.\n\n`while` repeats as long as its condition holds, and both loop kinds support `break` and `continue`. Iterators in Nim are themselves a first-class language feature (`iterator`), so `for x in myIterator():` works over user-defined sequences just as naturally as over a built-in range.",
      learnMore: 'https://nim-lang.org/docs/manual.html#statements-and-expressions-for-statement',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'conditional',
      title: 'Control flow (conditional)',
      body: 'Executes code based on a condition (`if`, `elif`, `else`).',
      details:
        '`if`/`elif`/`else` branch on a `bool` expression -- Nim has no implicit truthiness, so an `int` or a string can never silently stand in for a condition the way it can in C or Python. Blocks are delimited by a colon and indentation, not braces.\n\n`if` is also an expression in Nim: `let msg = if age > 32: "older" else: "younger"` yields a value directly, which often replaces what other languages need a ternary operator for.',
      learnMore: 'https://nim-lang.org/docs/manual.html#statements-and-expressions-if-statement',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'main-block',
      title: 'Main execution block',
      body: 'Code that runs only when this file is the entry module.',
      details:
        '`when isMainModule:` is a compile-time conditional (`when`, not `if`) that is only `true` in the module Nim was asked to compile directly -- when the file is imported by another module instead, that block is skipped entirely, at compile time, with zero runtime cost.\n\nThis mirrors Python\'s `if __name__ == "__main__":` guard but is resolved during compilation rather than at runtime, since `when` conditions must be evaluable by the compiler itself. It is the idiomatic place to put a script\'s "run this as a program" logic while keeping the module safely importable elsewhere.',
      learnMore: 'https://nim-lang.org/docs/manual.html#statements-and-expressions-when-statement',
      color: 'red',
      side: 'left',
    },
    {
      id: 'proc-call',
      title: 'Procedure call',
      body: 'Executes a previously defined procedure.',
      details:
        '`greet(alice)` calls the `greet` proc with `alice` as its argument, using ordinary function-call syntax. Nim also supports method-call syntax -- `alice.greet()` -- for the exact same call, and the two forms are freely interchangeable, which is why Nim code reads comfortably in both a functional and an object-oriented style.\n\nFor a proc taking no arguments, the parentheses are optional at the call site (`doStuff` and `doStuff()` are equivalent), which occasionally makes a bare identifier and a zero-argument call visually indistinguishable -- context, and the compiler, sort it out.',
      learnMore: 'https://nim-lang.org/docs/manual.html#procedures-method-call-syntax',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '# A minimal Nim script -- compiles to C, runs like it means it',
        refs: ['comment-line'],
      },
      { code: '' },
      { code: 'import std/strformat', refs: ['imports'] },
      { code: '' },
      {
        code: 'type\n  Robot = object\n    name: string\n    bolts: int',
        refs: ['type-def'],
      },
      { code: '' },
      {
        code: 'proc beep(r: Robot) =\n  echo &"{r.name} says: BEEP. ({r.bolts} bolts remaining)"',
        refs: ['proc-def'],
      },
      { code: '' },
      {
        code: 'when isMainModule:\n  var wall_e = Robot(name: "WALL-E", bolts: 7) # no garbage collector jokes, please\n  beep(wall_e)',
        refs: ['main-block', 'variable', 'proc-call'],
      },
    ],
    verbose: [
      { code: '# This is a single-line comment', refs: ['comment-line'] },
      { code: '' },
      {
        code: "#[\n  This is a multi-line comment describing the file's purpose.\n  Legend says it compiles to C, C++, or JavaScript -- pick your fighter.\n]#",
        refs: ['comment-block'],
      },
      { code: '' },
      { code: 'import std/strutils # Import a standard library module', refs: ['imports'] },
      { code: '' },
      {
        code: 'type\n  Person = object # Type definition (object)\n    name: string\n    age: int',
        refs: ['type-def'],
      },
      { code: '' },
      {
        code: '# Procedure definition\nproc greet(p: Person) =\n  echo "Hello, ", p.name, "! You are ", p.age, " years old."',
        refs: ['proc-def'],
      },
      { code: '' },
      { code: '# Main execution block', refs: ['main-block'] },
      {
        code: 'when isMainModule:',
        refs: ['main-block'],
      },
      {
        code: '  var alice = Person(name: "Alice", age: 30) # Variable declaration & object instantiation, not a var-iable crisis',
        refs: ['main-block', 'variable'],
      },
      { code: '', refs: ['main-block'] },
      {
        code: '  # Control flow (loop)\n  for i in 1..3: # inclusive range -- 1, 2, 3, no off-by-one negotiations\n    alice.age += 1',
        refs: ['main-block', 'loop'],
      },
      {
        code: '  greet(alice) # Procedure call',
        refs: ['main-block', 'proc-call'],
      },
      { code: '', refs: ['main-block'] },
      {
        code: '  # Control flow (conditional)\n  if alice.age > 32:\n    echo "Alice is getting older, unlike this compiled binary\'s startup time."',
        refs: ['main-block', 'conditional'],
      },
    ],
  },
}
