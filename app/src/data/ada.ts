import type { LanguageDef } from '../lib/types'

export const ada: LanguageDef = {
  id: 'ada',
  popularity: 16,
  name: 'Ada',
  titleWord: 'Ada',
  article: 'an',
  extensions: ['.adb', '.ads'],
  accentHex: '#059669',
  officialUrl: 'https://ada-lang.io/',
  shikiLang: 'ada',
  note: 'Ada is a strongly typed systems language designed for readability, reliability, real-time work, and high-integrity software; its package specifications commonly use .ads files and bodies use .adb.',
  annotations: [
    {
      id: 'context-clause',
      title: 'Context clause (`with`)',
      body: 'Makes another library unit available to the current compilation unit.',
      details:
        '`with Ada.Text_IO;` establishes a semantic dependency on the standard text-I/O package. The package name is still qualified unless a separate `use` clause makes its declarations directly visible.\n\nContext clauses sit before the compilation unit they affect. Ada records these dependencies precisely so the build system can compile units in a valid order and recompile dependents when a specification changes.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/modular_programming.html',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'use-clause',
      title: 'Use clause',
      body: 'Makes a package’s declarations directly visible without qualification.',
      details:
        '`use Ada.Text_IO;` allows `Put_Line` in place of `Ada.Text_IO.Put_Line`. The package must already be available through a `with` context clause.\n\nMany Ada codebases avoid broad `use` clauses in large scopes because qualification documents where a name comes from. `use type` is a narrower alternative that makes a type’s primitive operators directly visible without importing every declaration in its package.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/modular_programming.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'main-procedure',
      title: 'Main procedure',
      body: 'A library-level procedure can serve as the program entry point.',
      details:
        '`procedure Greeter is ... end Greeter;` declares and defines a parameterless library unit. The binder selects an eligible library-level procedure as the executable’s main subprogram.\n\nAda conventionally repeats the procedure name after the closing `end`. The compiler can verify that name, making the end of a long nested unit less ambiguous to a human reader.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/subprograms.html',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'declarative-part',
      title: 'Declarative part',
      body: 'Types, objects, constants, and nested subprograms are declared before `begin`.',
      details:
        'The region between `is` and `begin` is the subprogram’s declarative part. It establishes every local name and type before executable statements start, so a reader sees the data model and helper operations before control flow.\n\nNested declarations obey lexical scope: `Greeting`, `Say`, and `Hello` exist only inside `Greeter`. Elaborating the procedure creates or initializes these declarations before its statement sequence runs.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/imperative_language.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'record-type',
      title: 'Record type',
      body: 'Combines named, strongly typed components into one composite value.',
      details:
        '`type Greeting is record ... end record;` introduces a distinct composite type. Its components have explicit types and may carry constraints or default expressions.\n\nUnlike structural record systems, two separately declared Ada record types are not interchangeable merely because their fields look alike. That nominal typing prevents accidental mixing of values that represent different concepts.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/records.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'nested-procedure',
      title: 'Nested procedure',
      body: 'Defines a reusable operation scoped inside the enclosing procedure.',
      details:
        '`procedure Say (Item : Greeting) is ...` declares a local subprogram. Parameters default to mode `in`, so `Item` is an input that the procedure may read but not replace.\n\nAda distinguishes procedures, which do not return a value, from functions, which do. Both may be nested, overloaded, generic, or declared separately from their bodies in a package specification.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/subprograms.html',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'for-loop',
      title: 'For loop and range',
      body: 'Iterates across every value in a discrete range such as `1 .. Item.Times`.',
      details:
        'An Ada `for` loop declares its loop parameter implicitly and steps across the supplied range. The parameter is constant within the body and disappears after `end loop`.\n\nRanges are first-class parts of Ada’s type system, used for loops, array bounds, and scalar constraints. Bounds are checked, turning many indexing and domain mistakes into compile-time diagnostics or defined runtime exceptions.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/imperative_language.html',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'named-aggregate',
      title: 'Named record aggregate',
      body: 'Constructs a record by associating each component name with a value using `=>`.',
      details:
        '`(Text => "Hello", Times => 2)` is a record aggregate. Named association makes the meaning independent of component order and lets the compiler verify that every required component appears exactly once.\n\nAda also permits positional aggregates, but named aggregates are especially useful in long records because each value explains itself at the construction site.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/records.html',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'statement-part',
      title: 'Statement part',
      body: 'The `begin` section contains the executable sequence.',
      details:
        'The outer `begin` separates declarations from executable statements. Statements run in order and end with semicolons; structured constructs use explicit closers such as `end loop`, `end if`, and `end Greeter`.\n\nAda favors words over punctuation for control flow. The extra closing labels make nested code more verbose, but they also make its structure hard to misread.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/imperative_language.html',
      color: 'indigo',
      side: 'right',
    },
    {
      id: 'exception-handler',
      title: 'Exception handler',
      body: 'Handles a named failure raised while executing the statement part.',
      details:
        'An `exception` section follows the normal statements. Each `when` alternative matches an exception; `Constraint_Error`, for example, covers failed range, index, length, and related language-defined checks.\n\nIf no handler matches, the exception propagates to the caller. Ada defines the circumstances for its runtime checks rather than treating violations as arbitrary undefined behavior.',
      learnMore: 'https://learn.adacore.com/courses/intro-to-ada/chapters/exceptions.html',
      color: 'red',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: 'with Ada.Text_IO;',
        refs: ['context-clause'],
      },
      { code: '' },
      {
        code: 'procedure Hello is',
        refs: ['main-procedure', 'declarative-part'],
      },
      { code: 'begin', refs: ['statement-part'] },
      {
        code: '   Ada.Text_IO.Put_Line ("Hello, Ada! Readability cleared the launch checklist.");',
      },
      { code: 'end Hello;', refs: ['main-procedure'] },
    ],
    verbose: [
      {
        code: 'with Ada.Text_IO;\nuse Ada.Text_IO;',
        refs: ['context-clause', 'use-clause'],
      },
      { code: '' },
      {
        code: 'procedure Greeter is',
        refs: ['main-procedure', 'declarative-part'],
      },
      {
        code: '   -- Ada names every moving part; the parts have filed the proper paperwork.',
      },
      {
        code: '   type Greeting is record\n      Text  : String (1 .. 5);\n      Times : Positive;\n   end record;',
        refs: ['record-type'],
      },
      { code: '' },
      {
        code: '   procedure Say (Item : Greeting) is\n   begin',
        refs: ['nested-procedure', 'statement-part'],
      },
      {
        code: "      for Count in 1 .. Item.Times loop\n         Put_Line (Item.Text & Positive'Image (Count));\n      end loop;",
        refs: ['for-loop'],
      },
      { code: '   end Say;', refs: ['nested-procedure'] },
      { code: '' },
      {
        code: '   Hello : constant Greeting := (Text => "Hello", Times => 2);',
        refs: ['named-aggregate', 'declarative-part'],
      },
      { code: 'begin', refs: ['statement-part'] },
      { code: '   Say (Hello);' },
      {
        code: '   Put_Line ("All checks passed. The compiler would have sent a memo otherwise.");',
      },
      {
        code: 'exception\n   when Constraint_Error =>\n      Put_Line ("A constraint objected, formally and at runtime.");',
        refs: ['exception-handler'],
      },
      { code: 'end Greeter;', refs: ['main-procedure'] },
    ],
  },
}
