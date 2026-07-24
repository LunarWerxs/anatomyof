import type { LanguageDef } from '../lib/types'

export const prolog: LanguageDef = {
  id: 'prolog',
  popularity: 24,
  name: 'Prolog',
  titleWord: 'Prolog',
  article: 'a',
  extensions: ['.pl', '.pro'],
  accentHex: '#e8790c',
  officialUrl: 'https://www.swi-prolog.org/',
  shikiLang: 'prolog',
  note: 'Prolog is a declarative logic programming language: source files describe facts and rules, and the runtime searches for substitutions that make a query true.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Uses `%` for the rest of a line or `/* ... */` for a block.',
      details:
        'A percent sign starts a line comment, while C-style delimiters enclose a block comment. SWI-Prolog also recognizes structured comments used by PlDoc to generate predicate documentation.\n\nComments do not participate in logical inference, but explaining the intended meaning of a relation is valuable because the same predicate can often be used in several directions.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=syntax',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'module-directive',
      title: 'Module directive',
      body: 'Names a module and lists the predicates it exports.',
      details:
        '`:- module(family, [ancestor/2]).` is a directive evaluated while the file is loaded. `ancestor/2` is a predicate indicator: the name followed by its arity, or number of arguments.\n\nModules give predicates a namespace and make the public interface explicit. Directives resemble rules with no head because they instruct the Prolog system rather than add an ordinary relation to the knowledge base.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=modules',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'fact',
      title: 'Fact',
      body: 'States an unconditional relation and ends with a period.',
      details:
        '`parent(ada, byron).` is a clause whose body is implicitly true. Lowercase words such as `parent` and `ada` are atoms; the complete compound term asserts that the relation holds.\n\nFacts are not assignments or rows in a fixed schema. They are clauses that the inference engine can match through unification when a query asks about the same predicate.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=quickstart',
      color: 'green',
      side: 'left',
    },
    {
      id: 'rule',
      title: 'Rule (`:-`)',
      body: 'Defines when a relation is true: the head holds if the body succeeds.',
      details:
        '`ancestor(X, Y) :- parent(X, Y).` reads as “X is an ancestor of Y if X is a parent of Y.” The term before `:-` is the head; the goals after it form the body.\n\nA predicate can have several clauses. Prolog tries matching clauses in source order and can backtrack to later clauses when a choice fails or the caller requests another solution.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=quickstart',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'variables',
      title: 'Variables and unification',
      body: 'Uppercase names are variables that become bound when terms unify.',
      details:
        '`X`, `Y`, and `Middle` begin as logical variables. Unification finds consistent bindings that make two terms identical; it is more general than one-way assignment.\n\nAn underscore starts an anonymous or intentionally ignored variable. Repeating a named variable within a clause requires every occurrence to receive the same value, which expresses data flow without a separate assignment statement.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=syntax',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'conjunction',
      title: 'Conjunction',
      body: 'A comma means logical “and”: each goal must succeed from left to right.',
      details:
        'In `parent(X, Middle), ancestor(Middle, Y)`, Prolog first finds a binding that satisfies `parent/2`, then tries the recursive goal with that binding. If the second goal fails, it backtracks into the first for another candidate.\n\nA semicolon expresses disjunction (“or”). Parentheses are worth using when both operators appear, because comma binds more tightly than semicolon.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=control',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'recursion',
      title: 'Recursive relation',
      body: 'Defines a transitive relationship by referring to the same predicate.',
      details:
        'The recursive `ancestor/2` clause walks from a parent to a more distant descendant through `Middle`. The earlier base clause handles the direct-parent case and stops the recursion.\n\nClause and goal order matter operationally even though the program is declarative. Putting the recursive call before the progress-making `parent/2` goal could search an unbounded space before discovering useful bindings.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=control',
      color: 'red',
      side: 'right',
    },
    {
      id: 'list',
      title: 'List',
      body: 'Uses `[A, B]` for elements and `[Head|Tail]` to split a list.',
      details:
        'Lists are ordinary recursive terms. `[]` is the empty list, `[a, b]` is syntax for a chain of list cells, and `[Head|Tail]` unifies with a nonempty list while exposing its first element and remaining list.\n\nMany Prolog programs express iteration as recursion over this head-tail structure, though library predicates such as `maplist/2` and `findall/3` often make the intent clearer.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=lists',
      color: 'orange',
      side: 'left',
    },
    {
      id: 'query-goal',
      title: 'Goal and query',
      body: 'Calling a predicate asks Prolog to prove the goal and find variable bindings.',
      details:
        '`findall(Person, ancestor(ada, Person), People)` runs the `ancestor/2` goal for every solution and collects the resulting `Person` bindings into `People`. An interactive query uses the same goals after the `?-` prompt, but the prompt itself is not normally stored in a source file.\n\nA goal can succeed once, succeed in multiple ways, or fail. Success does not return a Boolean object; it produces a proof state and any variable substitutions discovered along the way.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?section=quickstart',
      color: 'sky',
      side: 'right',
    },
    {
      id: 'initialization',
      title: 'Initialization directive',
      body: 'Runs a goal when the file is used as a program.',
      details:
        '`:- initialization(main, main).` is SWI-Prolog’s executable-entry convention. It calls `main/0` only when the file is launched as the top-level script, not merely imported as a library.\n\nThe ISO-compatible one-argument form schedules a goal after loading, while this two-argument form cleanly distinguishes command-line execution from consultation.',
      learnMore: 'https://www.swi-prolog.org/pldoc/man?predicate=initialization/2',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '% In Prolog, "Hello" is a goal. Small talk has become theorem proving.',
        refs: ['comment'],
      },
      {
        code: "greet(Name) :- format('Hello, ~w!~n', [Name]).",
        refs: ['rule', 'variables', 'list'],
      },
      {
        code: ":- initialization(greet('Prolog'), main).",
        refs: ['initialization', 'query-goal'],
      },
    ],
    verbose: [
      {
        code: ':- module(family, [ancestor/2, main/0]).',
        refs: ['module-directive', 'list'],
      },
      { code: '' },
      {
        code: '% Facts: no evidence attached, but the knowledge base sounds confident.',
        refs: ['comment'],
      },
      {
        code: 'parent(ada, byron).\nparent(byron, allegra).\nparent(allegra, lucas).',
        refs: ['fact'],
      },
      { code: '' },
      {
        code: '% Rules: direct and recursive cases for the same relation.',
        refs: ['comment'],
      },
      {
        code: 'ancestor(X, Y) :-\n    parent(X, Y).',
        refs: ['rule', 'variables'],
      },
      {
        code: 'ancestor(X, Y) :-\n    parent(X, Middle),\n    ancestor(Middle, Y).',
        refs: ['rule', 'variables', 'conjunction', 'recursion'],
      },
      { code: '' },
      {
        code: "describe(Person) :-\n    format('Proved descendant: ~w~n', [Person]).",
        refs: ['rule', 'variables', 'list'],
      },
      { code: '' },
      {
        code: "main :-\n    findall(Person, ancestor(ada, Person), People),\n    maplist(describe, People),\n    format('Backtracking completed; the family tree remains complicated.~n').",
        refs: ['rule', 'query-goal', 'conjunction', 'list'],
      },
      { code: '' },
      {
        code: ':- initialization(main, main).',
        refs: ['initialization', 'query-goal'],
      },
    ],
  },
}
