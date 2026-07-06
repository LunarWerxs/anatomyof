import type { LanguageDef } from '../lib/types'

export const zig: LanguageDef = {
  id: 'zig',
  popularity: 48,
  name: 'Zig',
  titleWord: 'Zig',
  article: 'a',
  extensions: ['.zig'],
  accentHex: '#f7a41d',
  officialUrl: 'https://ziglang.org/',
  shikiLang: 'zig',
  note: 'Zig is a modern, general-purpose systems programming language focused on robustness, optimality, and clarity, with no hidden control flow.',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Single-line (//) or doc comments (///), ignored by the compiler.',
      details:
        'A double slash starts a comment that runs to the end of the line -- Zig has no block comment syntax, so every comment is single-line by construction. Three slashes (`///`) mark a doc comment attached to the declaration immediately below it, and two slashes with a bang (`//!`) write a doc comment for the containing file or module itself.\n\nDoc comments are picked up by `zig autodoc` to generate reference documentation directly from source. Because there is no `/* ... */` form, commenting out a block means prefixing every line, which nudges toward small, deletable comments rather than large ones that quietly rot.',
      learnMore: 'https://ziglang.org/documentation/master/#Comments',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'import',
      title: 'Import (@import)',
      body: 'Includes another file or package as a value.',
      details:
        '`@import` is a compiler builtin, not a keyword, hence the leading `@`. `@import("std")` returns the standard library as a struct-like value that you bind to a name with `const`; `@import("root")` reaches the top-level file of the current compilation, and a relative path like `@import("util.zig")` pulls in a sibling file as its own module.\n\nBecause the result of `@import` is an ordinary value, it can be stored, passed around, and referenced with `.` just like any other struct namespace -- there is no separate "module" grammar to learn. The same mechanism is how `build.zig.zon` dependencies get named and pulled into a project.',
      learnMore: 'https://ziglang.org/documentation/master/#import',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'struct',
      title: 'Struct definition',
      body: 'Defines a custom data type with fields using struct.',
      details:
        "`const Point = struct { ... }` declares an anonymous struct type and binds it to the name `Point`. Structs group related fields together and, unlike some languages, carry no implicit padding guarantees unless you ask for `extern struct` (C-compatible layout) or `packed struct` (bit-exact layout).\n\nMethods live inside the struct body as ordinary functions that take the instance as their first parameter (conventionally named `self`), so `struct` doubles as Zig's class-like construct without a separate `class` keyword. Struct literals are written `Point{ .x = 10, .y = 20 }`, with the type sometimes elided as `.{ .x = 10, .y = 20 }` when it can be inferred.",
      learnMore: 'https://ziglang.org/documentation/master/#struct',
      color: 'green',
      side: 'left',
    },
    {
      id: 'field',
      title: 'Field',
      body: 'A named, typed component of a struct.',
      details:
        "Each field pairs a name with an explicit type, such as `x: i32` for a signed 32-bit integer -- Zig never infers a struct's shape, so every field must be annotated. Fields may declare a default value (`x: i32 = 0`), which is used whenever a struct literal omits that field.\n\nFields are accessed with dot notation (`p.x`) and can only be reassigned through a `var`-bound instance; a `const` instance is fully immutable, fields included. There is no field-level visibility keyword -- an entire declaration is made private to its file simply by omitting `pub`.",
      learnMore: 'https://ziglang.org/documentation/master/#struct',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'variable',
      title: 'Variable declaration (const/var)',
      body: '`const` for immutable, `var` for mutable bindings.',
      details:
        '`const` declares a binding whose value can never change after initialization; `var` opts into mutation. The compiler enforces this at compile time and will refuse to build if a `var` is never actually mutated, nudging every binding toward the most restrictive form that still compiles.\n\nType is usually inferred from the initializer, as in `var sum: i32 = 0`, but can be written explicitly after a colon when inference would be ambiguous, such as with integer literals that need a specific bit width. Top-level `const` and `var` declarations are evaluated at compile time and may appear in any order in the file -- Zig does not require forward declarations.',
      learnMore: 'https://ziglang.org/documentation/master/#Variables',
      color: 'amber',
      side: 'right',
    },
    {
      id: 'global-constant',
      title: 'Global constant',
      body: 'A const declared at the top level of the file.',
      details:
        "A top-level `const` sits outside any function and is visible to every declaration in the file, evaluated once at compile time rather than on each access. Prefixing it with `pub` (`pub const stdout = ...`) exports it so other files can reach it through `@import`.\n\nBecause top-level order does not matter in Zig, a global constant can reference a function or type defined later in the same file -- the compiler resolves the whole file's declarations as a single graph before checking any of them.",
      learnMore: 'https://ziglang.org/documentation/master/#Container-Level-Variables',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'main-function',
      title: 'Main function (pub fn main)',
      body: 'The public entry point, optionally returning an error union.',
      details:
        '`pub fn main() !void { ... }` is the entry point an executable starts running from; `pub` makes it visible to the compiler driver that links the binary, since Zig has no separate "linker sees everything" default. The bare `!void` return type is shorthand for an inferred error set unioned with `void` -- the compiler works out exactly which errors the body can produce.\n\nIf `main` returns an error, the runtime prints it and exits with a nonzero status, which is a lightweight way to propagate startup failures without wrapping everything in your own `try`/`catch` scaffolding at the very top. A `main` that never fails can simply return plain `void` instead.',
      learnMore: 'https://ziglang.org/documentation/master/#Entry-Point',
      color: 'red',
      side: 'left',
    },
    {
      id: 'error-handling',
      title: 'Error handling (!T, try)',
      body: 'Explicit, value-based error propagation -- no exceptions.',
      details:
        'An error union type, written `!T` (or `ErrorSet!T` when the set is named explicitly), means a function returns either a successful `T` or one of a fixed set of error values -- errors are ordinary values, not a separate control-flow channel like exceptions. `try expr` is sugar for "evaluate `expr`, and if it is an error, return that error immediately from the current function," which is how errors climb back up the call stack one `try` at a time.\n\n`catch` is the other side of the same coin: `expr catch |err| { ... }` or `expr catch default_value` lets a caller handle or replace an error instead of propagating it. Because every fallible call site is marked with `try` or `catch`, error handling in Zig is always visible in the source -- there is no hidden `throw` that can surface arbitrarily far from where it happened.',
      learnMore: 'https://ziglang.org/documentation/master/#Errors',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'control-flow',
      title: 'Control flow (loop)',
      body: 'Executes code repeatedly with for or while.',
      details:
        '`for (0..5) |i| { ... }` iterates a range where the upper bound is exclusive, binding each value to `i`; `for` can also walk one or more slices or arrays directly, in lockstep when given several. `while (condition) { ... }` repeats as long as `condition` holds, and both loop forms support an optional continue expression, as in `while (i < 10) : (i += 1) { ... }`.\n\nEvery numeric loop variable and slice element in Zig is explicitly typed, so a loop over `0..5` yields `usize` values by default -- reaching for `@intCast` is common when the loop body needs to combine that index with a differently-sized integer. `break` and `continue` work as in most C-family languages, and a loop can also carry a value out through `break :blockLabel value` in labeled-block form.',
      learnMore: 'https://ziglang.org/documentation/master/#while',
      color: 'rose',
      side: 'left',
    },
    {
      id: 'function-call',
      title: 'Function call (standard library)',
      body: 'Invokes a function from the imported `std` library.',
      details:
        '`std.io.getStdOut().writer()` walks the standard library namespace to obtain a writer attached to standard output, and `.print(fmt, args)` formats and writes to it, following printf-style placeholders such as `{}` for default formatting and `{s}` for strings. Because `print` can fail (the underlying write can fail), it returns an error union and is almost always called with `try`.\n\nThe standard library itself is just Zig source compiled along with your program -- there is no hidden runtime magic, so `std.debug.print`, `std.mem`, and friends can all be read, and even stepped through in a debugger, the same as your own code.',
      learnMore: 'https://ziglang.org/documentation/master/std/#std.fmt',
      color: 'orange',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      { code: 'const std = @import("std");', refs: ['import'] },
      { code: '' },
      {
        code: '// Zero-cost abstractions, but the coffee is not included\nconst Vec2 = struct {\n    x: f32,\n    y: f32,\n};',
        refs: ['comment', 'struct', 'field'],
      },
      { code: '' },
      {
        code: 'pub fn main() !void {\n    const origin = Vec2{ .x = 0, .y = 0 };',
        refs: ['main-function', 'variable'],
      },
      {
        code: '    var total: f32 = 0;\n    for (0..3) |i| {\n        total += @as(f32, @floatFromInt(i));\n    }',
        refs: ['variable', 'control-flow'],
      },
      { code: '' },
      {
        code: '    const stdout = std.io.getStdOut().writer();\n    try stdout.print("origin=({d}, {d}), total={d}\\n", .{ origin.x, origin.y, total });',
        refs: ['global-constant', 'function-call', 'error-handling'],
      },
      { code: '}', refs: ['main-function'] },
    ],
    verbose: [
      { code: 'const std = @import("std"); // Import standard library', refs: ['import'] },
      { code: '' },
      { code: '// This is a single-line comment', refs: ['comment'] },
      { code: '' },
      { code: '// Defines a struct (custom data type)', refs: ['comment'] },
      {
        code: 'const Point = struct {\n    x: i32,\n    y: i32,\n};',
        refs: ['struct', 'field'],
      },
      { code: '' },
      { code: '// Main function, entry point', refs: ['comment'] },
      { code: 'pub fn main() !void {', refs: ['main-function'] },
      {
        code: '    // Immutable variable\n    const p = Point{ .x = 10, .y = 20 };',
        refs: ['main-function', 'comment', 'variable'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Mutable variable\n    var sum: i32 = 0;',
        refs: ['main-function', 'comment', 'variable'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Control flow (loop with range)\n    for (0..5) |i| {\n        sum += @as(i32, @intCast(i)); // undefined behavior stays outside, where it belongs\n    }',
        refs: ['main-function', 'comment', 'control-flow'],
      },
      { code: '', refs: ['main-function'] },
      {
        code: '    // Error handling with try\n    try stdout.print("Point: ({}, {})\\n", .{ p.x, p.y });\n    try stdout.print("Sum: {}\\n", .{sum});',
        refs: ['main-function', 'comment', 'error-handling', 'function-call'],
      },
      { code: '}', refs: ['main-function'] },
      { code: '' },
      {
        code: '// "It compiles" is not a personality, but it is a start\nconst stdout = std.io.getStdOut().writer(); // Global variable',
        refs: ['comment', 'global-constant', 'function-call'],
      },
    ],
  },
}
