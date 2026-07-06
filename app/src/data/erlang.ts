import type { LanguageDef } from '../lib/types'

export const erlang: LanguageDef = {
  id: 'erlang',
  popularity: 55,
  name: 'Erlang',
  titleWord: 'Erlang',
  article: 'an',
  extensions: ['.erl'],
  accentHex: '#a90533',
  officialUrl: 'https://www.erlang.org/',
  shikiLang: 'erlang',
  note: 'Erlang is a functional, concurrent programming language designed for building scalable and fault-tolerant systems, running on the BEAM VM.',
  annotations: [
    {
      id: 'module',
      title: 'Module declaration',
      body: 'Defines the module name, must match the filename.',
      details:
        'Every Erlang source file is a module, declared with `-module(name).` as (conventionally) the first form in the file. The atom given must match the filename minus its `.erl` extension, so `math_utils.erl` must declare `-module(math_utils).` -- the compiler will refuse to link things up otherwise.\n\nModules are the unit of code loading on the BEAM: the runtime can hot-swap a new version of a module into a live system while old processes keep running the previous version, which is the basis of Erlang\'s famous "upgrade a phone switch without dropping a call" trick.',
      learnMore: 'https://www.erlang.org/doc/system/modules.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'export',
      title: 'Export attribute',
      body: 'Specifies which functions are publicly visible.',
      details:
        'By default every function in a module is private. `-export([area/1, sum_list/1]).` lists the functions callable from outside, each written as `name/arity` since Erlang distinguishes functions by their argument count -- `area/1` and `area/2` are entirely different functions that happen to share a name.\n\nEverything left out of the export list stays a private helper, callable only from within the same module. This mirrors the modest, deliberate surface area that BEAM-based systems favor: expose the minimum, keep the rest free to change.',
      learnMore: 'https://www.erlang.org/doc/system/modules.html#module-attributes',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comment',
      body: 'Starts with `%`, ignored by the compiler.',
      details:
        "A `%` marks the rest of the line as a comment; there is no block-comment syntax, so multi-line explanations just stack single-line comments. By convention `%%` is used for comments documenting a whole section or function, while a lone `%` trails an individual line -- a style convention, not a compiler rule.\n\nErlang has no docstrings built into the language the way some newer BEAM languages do, so comments (plus tools like EDoc) are the traditional way to document a module's intent.",
      learnMore: 'https://www.erlang.org/doc/system/reference_manual.html',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'module-attribute',
      title: 'Module attribute',
      body: 'Metadata about the module (`-author`, `-vsn`, etc.).',
      details:
        'Attributes like `-author("Erlang Developer").` or `-vsn(1).` attach metadata to the compiled module, retrievable at runtime via `Module:module_info()`. They have no effect on behavior -- they are read by tooling, documentation generators, and the occasional nostalgic developer scrolling to the top of a file.\n\nA module can carry any number of custom attributes beyond the well-known ones; the compiler stores whatever you declare, whether or not any tool reads it back.',
      learnMore: 'https://www.erlang.org/doc/system/modules.html#module-attributes',
      color: 'green',
      side: 'right',
    },
    {
      id: 'record',
      title: 'Record definition',
      body: 'Defines a named, structured data type.',
      details:
        '`-record(point, {x = 0, y = 0}).` defines a compile-time template for tuples with named fields and defaults. Under the hood a record is still an ordinary tagged tuple -- `#point{x=1, y=2}` compiles down to `{point, 1, 2}` -- so records are purely a readability layer the compiler erases before the BEAM ever sees it.\n\nBecause that expansion happens at compile time, record definitions must be visible wherever they are used, typically via a shared `.hrl` header file included with `-include("records.hrl").`; there is no runtime record registry to consult.',
      learnMore: 'https://en.wikipedia.org/wiki/Record_(computer_science)',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'function-def',
      title: 'Function definition (area/1)',
      body: 'A function with multiple clauses, separated by `;`.',
      details:
        'A function can have several clauses with the same name and arity, each ending in `;` except the last, which ends in `.`. At call time Erlang tries each clause top to bottom and runs the first whose head matches the argument and whose guard (if any) succeeds -- this is how `area/1` picks among a square, a circle, or a point without a single `if` statement in sight.\n\nIf no clause matches, the process crashes with a `function_clause` error rather than silently doing nothing -- in line with Erlang\'s "let it crash" philosophy, where a supervisor restarting a failed process is the expected recovery path, not exhaustive defensive coding.',
      learnMore: 'https://en.wikipedia.org/wiki/Function_(computer_programming)',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'pattern-matching',
      title: 'Pattern matching',
      body: 'Matching values and extracting data in function arguments.',
      details:
        "Function heads and the `=` operator both perform pattern matching, not assignment: `area({square, Side})` only matches a two-element tuple whose first element is the atom `square`, and simultaneously binds `Side` to the second element. A bound variable used again later must match its existing value rather than being overwritten -- Erlang variables are single-assignment within a clause.\n\nPattern matching extends to records too, as in `area(#point{x=X, y=Y})`, which destructures the record's fields directly in the argument list. This is the same mechanism used in `case` expressions and `receive` blocks, making it one of the most load-bearing ideas in the language.",
      learnMore: 'https://www.erlang.org/doc/system/patterns.html',
      color: 'red',
      side: 'right',
    },
    {
      id: 'guard',
      title: 'Guard sequence (when)',
      body: 'Additional constraints on function clauses.',
      details:
        'A `when` clause after a function head adds a boolean test that must also succeed for that clause to fire, as in `when Side > 0`. Guards are restricted to a safe subset of expressions -- comparisons, type tests like `is_number/1`, and a handful of arithmetic and boolean operators -- deliberately excluding anything with side effects, since the runtime may need to evaluate a guard speculatively.\n\nMultiple conditions can be combined with `,` (all must hold) or separated with `;` between whole guard sequences (any may hold), giving a compact way to layer validation directly onto dispatch instead of writing it into the function body.',
      learnMore: 'https://www.erlang.org/doc/system/expressions.html#guard-sequences',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'function-body',
      title: 'Function body',
      body: 'Expressions executed when a clause matches, ends with `.`.',
      details:
        "The body after `->` is a sequence of expressions separated by `,`, and the value of the last expression is the clause's return value -- there is no explicit `return` keyword anywhere in Erlang. The final clause of the function is terminated with a period `.` instead of the semicolon used between earlier clauses, marking the end of the whole function definition.\n\nBecause everything is an expression, control constructs like `case` and `if` also produce values that can be bound directly to a variable, which is why Erlang code tends to read as nested expressions rather than sequences of statements.",
      learnMore: 'https://en.wikipedia.org/wiki/Function_(computer_programming)',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'function-def-2',
      title: 'Function definition (sum_list/1)',
      body: 'A function with a single clause.',
      details:
        'Not every function needs multiple clauses -- `sum_list(List) -> ...` has exactly one, matching any argument bound to the name `List` with no guard at all. A single-clause function is just the degenerate case of the general multi-clause mechanism described above.\n\nArity still matters even here: a hypothetical `sum_list/2` would be a completely separate function, and both could be exported and called independently without conflict.',
      learnMore: 'https://en.wikipedia.org/wiki/Arity',
      color: 'pink',
      side: 'right',
    },
    {
      id: 'list-comprehension',
      title: 'List comprehension',
      body: 'Concise syntax for creating lists based on existing lists.',
      details:
        '`[X || X <- List, is_number(X)]` reads as "the list of `X` such that `X` is drawn from `List` and `is_number(X)` holds." The part after `<-` is a generator, and any comma-separated expressions after it are filters that must evaluate truthy for that element to be kept -- here, quietly dropping anything that snuck into the list without being a number.\n\nComprehensions can chain multiple generators to produce combinations (handy for building all pairs from two lists) and are typically far more concise than the equivalent hand-written recursive function, without sacrificing Erlang\'s purely functional, no-mutation style.',
      learnMore: 'https://www.erlang.org/doc/system/list_comprehensions.html',
      color: 'indigo',
      side: 'left',
    },
    {
      id: 'external-call',
      title: 'External function call',
      body: 'Calling a function from another module (`module:function`).',
      details:
        "Writing `math:pi()` or `lists:sum(List)` calls a function exported by another module, using the `Module:Function(Args)` form. This is also how the BEAM's hot code loading works under the hood: a remote call is resolved through the module's current code each time, so swapping in a new version of `lists` (in principle) affects every caller immediately.\n\nBy contrast, a local call like `area(Shape)` within the same module is resolved directly at compile time. The distinction matters for long-running systems, since a process stuck in an old module version via local calls will only pick up a fresh release at its next fully-qualified call or explicit code reload.",
      learnMore: 'https://www.erlang.org/doc/system/code_loading.html',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '%% A minimal module. No semicolons were harmed... much.',
        refs: ['comment'],
      },
      { code: '-module(greeter).', refs: ['module'] },
      { code: '-export([hello/1]).', refs: ['export'] },
      { code: '' },
      {
        code: '%% Clause for an enthusiastic greeting\nhello(Name) when is_list(Name) ->',
        refs: ['function-def', 'guard', 'pattern-matching'],
      },
      {
        code: '    io:format("Hello, ~s! Still no null pointer exceptions here.~n", [Name]);',
        refs: ['function-body', 'external-call'],
      },
      {
        code: '%% Clause for when someone hands us garbage\nhello(_) ->',
        refs: ['function-def', 'pattern-matching'],
      },
      {
        code: '    io:format("Hello, stranger.~n").',
        refs: ['function-body', 'external-call'],
      },
    ],
    verbose: [
      { code: '% This is a module for basic math operations.', refs: ['comment'] },
      { code: '-module(math_utils).', refs: ['module'] },
      { code: '-export([area/1, sum_list/1]).', refs: ['export'] },
      { code: '' },
      {
        code: '-author("Erlang Developer, est. 1986 -- yes, we\'re older than the web").',
        refs: ['module-attribute'],
      },
      { code: '' },
      {
        code: '%% Record definition for a point in 2D space\n-record(point, {x = 0, y = 0}).',
        refs: ['record'],
      },
      { code: '' },
      {
        code: '% Function to calculate area of geometric shapes\n% Clause for a square',
        refs: ['comment'],
      },
      {
        code: 'area({square, Side}) when Side > 0 ->',
        refs: ['function-def', 'pattern-matching', 'guard'],
      },
      {
        code: '    Side * Side;',
        refs: ['function-body'],
      },
      {
        code: '% Clause for a circle',
        refs: ['comment'],
      },
      {
        code: 'area({circle, Radius}) when Radius > 0 ->',
        refs: ['function-def', 'pattern-matching', 'guard'],
      },
      {
        code: '    math:pi() * Radius * Radius;',
        refs: ['function-body', 'external-call'],
      },
      {
        code: '% Clause for a point (area is 0), demonstrating record matching\narea(#point{x=_X, y=_Y}) ->',
        refs: ['function-def', 'pattern-matching'],
      },
      {
        code: '    0.  % A point has no area, only a very strong sense of self',
        refs: ['function-body'],
      },
      { code: '' },
      {
        code: '%% Function to sum numbers in a list using a list comprehension\nsum_list(List) ->',
        refs: ['function-def-2'],
      },
      {
        code: '    Numbers = [X || X <- List, is_number(X)], % Filter non-numbers -- trust, but verify',
        refs: ['list-comprehension'],
      },
      {
        code: '    lists:sum(Numbers).',
        refs: ['function-body', 'external-call'],
      },
    ],
  },
}
