import type { LanguageDef } from '../lib/types'

export const assembly: LanguageDef = {
  id: 'assembly',
  popularity: 17,
  name: 'Assembly',
  titleWord: 'Assembly',
  article: 'an',
  extensions: ['.asm', '.s'],
  accentHex: '#8b5a2b',
  officialUrl: 'https://en.wikipedia.org/wiki/Assembly_language',
  shikiLang: 'asm',
  note: 'Assembly is a low-level language that translates directly to machine code, specific to a CPU architecture (e.g., x86, ARM).',
  annotations: [
    {
      id: 'comment',
      title: 'Comment',
      body: 'Starts with `;` (or `#` in some syntaxes), ignored by the assembler.',
      details:
        'Everything from a `;` to the end of the line is discarded before assembly begins, same idea as `#` in Python or `//` in C. Because assembly gives you no function names, no types, and no structure beyond labels, comments are doing far more load-bearing work here than in higher-level languages -- they are often the only record of *why* a register holds what it holds.\n\nDifferent assemblers vary: NASM and MASM use `;`, while GAS (the GNU assembler, AT&T syntax) uses `#` for line comments and also supports C-style `/* */` block comments. The transcribed examples below use NASM syntax throughout.',
      learnMore: 'https://www.nasm.us/doc/nasmdoc2.html',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'section',
      title: 'Section directive',
      body: 'Defines a section for data or code.',
      details:
        'A directive like `section .data` or `section .text` is not a CPU instruction -- it is an instruction to the *assembler*, telling it which segment of the resulting object file the following bytes belong to. `.data` holds initialized variables, `.bss` holds uninitialized (zero-filled) storage, and `.text` holds the actual executable instructions.\n\nThe linker later maps each section to memory with different permissions: `.text` is typically read-only and executable, while `.data` and `.bss` are readable and writable but not executable. Mixing code and data in the same section is how decades of buffer-overflow exploits got their start, which is exactly why modern toolchains keep them apart.',
      learnMore: 'https://en.wikipedia.org/wiki/Data_segment',
      color: 'blue',
      side: 'right',
    },
    {
      id: 'data-def',
      title: 'Data definition',
      body: 'Allocates memory and initializes data.',
      details:
        "Directives like `db` (define byte), `dw` (define word), `dd` (define doubleword), and `dq` (define quadword) reserve storage and give it an initial value. `msg db 'Hello, World!', 0xA` lays out the ASCII bytes of the string followed by a single newline byte (`0xA`) -- assembly has no built-in string type, just contiguous bytes you agree to interpret as text.\n\n`equ` defines a compile-time constant rather than allocating memory: `len equ $ - msg` uses `$`, the assembler's \"current address\" symbol, to compute the string's length by subtraction. That length is baked into the binary at assemble time, not calculated at runtime.",
      learnMore: 'https://www.nasm.us/doc/nasmdoc3.html',
      color: 'sky',
      side: 'left',
    },
    {
      id: 'global',
      title: 'Global directive',
      body: 'Makes a label accessible outside the file.',
      details:
        'By default a label is only visible within the file (translation unit) that defines it. The `global` directive (spelled `.globl` in GAS) exports a symbol so the linker can find it from other object files -- most commonly `global _start`, which tells the linker where execution should begin.\n\nThe complementary directive is `extern`, which declares that a symbol is defined elsewhere and should be resolved at link time. Together they let you split a program across multiple assembled files, the same job `export` and `import` do in higher-level languages.',
      learnMore: 'https://en.wikipedia.org/wiki/Linker_(computing)',
      color: 'teal',
      side: 'right',
    },
    {
      id: 'label',
      title: 'Label',
      body: 'A symbolic name for a memory address.',
      details:
        'A label like `_start:` is just a name bound to "whatever address comes next" -- the assembler resolves it to a concrete offset when it builds the binary. Labels are how assembly fakes functions, loops, and jump targets, since the CPU itself has no concept of any of those, only addresses to jump to.\n\n`_start` is conventionally the true entry point the linker wires up (as opposed to `main`, which the C runtime calls only after its own startup code runs). Jumping to a label with `jmp`, `call`, or a conditional jump like `jne` is how assembly builds every control-flow structure other languages give you for free.',
      learnMore: 'https://en.wikipedia.org/wiki/Label_(computer_science)',
      color: 'green',
      side: 'left',
    },
    {
      id: 'instruction',
      title: 'Instruction (Mnemonic)',
      body: 'An operation for the CPU to perform.',
      details:
        'A mnemonic like `mov`, `add`, or `int` is a human-readable stand-in for a raw opcode byte the CPU actually decodes -- `mov eax, 4` might assemble to `b8 04 00 00 00`. The assembler\'s whole job is this one-to-one (or occasionally one-to-few) translation from mnemonic-plus-operands to machine code, which is exactly why assembly is considered the thinnest possible layer over "what the chip really does."\n\nInstruction sets are architecture-specific: x86 and ARM share no mnemonics, no register names, and no calling conventions. Code written for one will not run on, or even resemble, code written for the other.',
      learnMore: 'https://en.wikipedia.org/wiki/X86_instruction_listings',
      color: 'purple',
      side: 'left',
    },
    {
      id: 'operand',
      title: 'Operands',
      body: 'Arguments for an instruction (registers, memory, immediate values).',
      details:
        "Most instructions take one or two operands specifying what to operate on: `mov ebx, 1` moves the immediate value `1` into the `ebx` register, while `mov ecx, msg` moves the memory address of `msg` into `ecx`. NASM syntax (used here) writes destination first, then source -- `mov dst, src` -- which is the opposite order from AT&T/GAS syntax's `mov src, dst`.\n\nOperands can be immediates (literal constants), registers, or memory references (optionally with an offset, like `[ebp+8]`), and a single instruction's valid operand combinations are defined precisely by the CPU's instruction set architecture -- you cannot, for instance, move memory directly to memory in x86.",
      learnMore: 'https://en.wikipedia.org/wiki/X86_assembly_language',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'register',
      title: 'Register',
      body: 'A small, fast storage location within the CPU.',
      details:
        "Registers such as `eax`, `ebx`, `ecx`, and `edx` on x86 sit directly on the CPU die, so reading and writing them is dramatically faster than touching main memory -- there is no bus round-trip. There are only a handful of them (compare that to effectively unlimited variables in a high-level language), so a huge part of writing assembly is deciding which value gets to occupy which register at any given moment.\n\nSome registers carry conventional roles baked in by the calling convention or the instruction set itself: `eax` traditionally holds a function's return value and, on Linux x86, the system call number; `esp` holds the stack pointer. Reusing a register for an unrelated purpose without saving its old value is a classic source of assembly bugs.",
      learnMore: 'https://en.wikipedia.org/wiki/Processor_register',
      color: 'red',
      side: 'left',
    },
    {
      id: 'syscall',
      title: 'System call',
      body: 'An instruction to request a service from the kernel.',
      details:
        'User-space code cannot write to a file descriptor or exit a process directly -- those require the kernel, which runs in a more privileged CPU mode. `int 0x80` is the classic 32-bit Linux mechanism for triggering that privilege transition: it raises a software interrupt, the kernel inspects `eax` for the system call number, reads the remaining arguments from `ebx`/`ecx`/`edx`, performs the operation, and returns control to the instruction after the `int`.\n\nModern 64-bit Linux prefers the faster `syscall` instruction over `int 0x80`, and the calling convention changes accordingly (arguments move through `rdi`, `rsi`, `rdx`, and the call number through `rax`), but the underlying idea -- trap into the kernel, hand it a request number and arguments -- is identical.',
      learnMore: 'https://en.wikipedia.org/wiki/System_call',
      color: 'rose',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: '; A minimal x86 program. No garbage collector is coming to save you.',
        refs: ['comment'],
      },
      { code: 'section .data', refs: ['section'] },
      { code: "    reply db '42', 0xA", refs: ['data-def'] },
      { code: '' },
      { code: 'section .text', refs: ['section'] },
      { code: '    global _start', refs: ['global'] },
      { code: '' },
      { code: '_start:', refs: ['label'] },
      {
        code: '    mov eax, 4        ; sys_write -- four whole registers just to say hi',
        refs: ['instruction', 'register', 'operand'],
      },
      { code: '    mov ebx, 1', refs: ['instruction', 'register', 'operand'] },
      { code: '    mov ecx, reply', refs: ['instruction', 'register', 'operand'] },
      { code: '    mov edx, 2', refs: ['instruction', 'register', 'operand'] },
      { code: '    int 0x80         ; ask the kernel nicely', refs: ['syscall'] },
    ],
    verbose: [
      { code: '; This is a comment', refs: ['comment'] },
      { code: '' },
      {
        code: 'section .data                          ; Data section for initialized variables',
        refs: ['section'],
      },
      {
        code: "    msg db 'Hello, World!', 0xA        ; Define byte string with newline -- yes, still the first program every architecture learns",
        refs: ['data-def'],
      },
      {
        code: '    len equ $ - msg                    ; Calculate string length at assemble time, no strlen() here',
        refs: ['data-def'],
      },
      { code: '' },
      { code: 'section .text                          ; Code section', refs: ['section'] },
      {
        code: '    global _start                      ; Make label visible to linker',
        refs: ['global'],
      },
      { code: '' },
      { code: '_start:                                 ; Entry point label', refs: ['label'] },
      {
        code: '    ; write(1, msg, len) -- three C-library characters of comment for eleven lines of registers',
        refs: ['comment'],
      },
      {
        code: '    mov eax, 4                         ; System call number for write (sys_write)',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    mov ebx, 1                         ; File descriptor 1 (stdout)',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    mov ecx, msg                       ; Pointer to message buffer',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    mov edx, len                       ; Message length',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    int 0x80                           ; Call kernel -- the closest thing to a function call we get',
        refs: ['syscall'],
      },
      { code: '' },
      {
        code: '    ; exit(0) -- the only line every tutorial forgets, causing a glorious segfault',
        refs: ['comment'],
      },
      {
        code: '    mov eax, 1                         ; System call number for exit (sys_exit)',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    xor ebx, ebx                       ; Exit status 0 -- real assembly programmers zero a register by XORing it with itself',
        refs: ['instruction', 'register', 'operand'],
      },
      {
        code: '    int 0x80                           ; Call kernel',
        refs: ['syscall'],
      },
    ],
  },
}
