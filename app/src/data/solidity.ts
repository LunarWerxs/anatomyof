import type { LanguageDef } from '../lib/types'

export const solidity: LanguageDef = {
  id: 'solidity',
  popularity: 56,
  name: 'Solidity',
  titleWord: 'Solidity',
  article: 'a',
  extensions: ['.sol'],
  accentHex: '#627eea',
  officialUrl: 'https://soliditylang.org/',
  shikiLang: 'solidity',
  note: 'Solidity is a statically-typed programming language designed for developing smart contracts that run on the Ethereum Virtual Machine (EVM).',
  annotations: [
    {
      id: 'spdx',
      title: 'SPDX license identifier',
      body: "A comment declaring the source file's license.",
      details:
        'The compiler emits a warning if a source file is missing a machine-readable license comment, so `// SPDX-License-Identifier: MIT` is effectively mandatory in modern Solidity. It has no runtime effect at all -- it is metadata for tooling, block explorers, and anyone auditing the bytecode later.\n\nMultiple identifiers can be combined with `AND`/`OR` (e.g. `MIT OR Apache-2.0`) when a file is dual-licensed. Leaving it out does not stop compilation, it just nags you every single time, forever.',
      learnMore:
        'https://docs.soliditylang.org/en/latest/layout-of-source-files.html#spdx-license-identifier',
      color: 'slate',
      side: 'left',
    },
    {
      id: 'pragma',
      title: 'Pragma directive',
      body: 'Specifies the compiler version compatibility.',
      details:
        '`pragma solidity ^0.8.0;` tells the compiler which versions are allowed to compile this file. The caret pins a floor and allows patch/minor upgrades below the next breaking change, while an explicit range like `>=0.8.0 <0.9.0` spells the same intent out longhand.\n\nPinning matters because Solidity has changed semantics across major versions -- most famously, 0.8.x added default overflow/underflow checks on arithmetic that earlier versions silently wrapped. Deploying with an unexpected compiler version is a classic source of "it worked in Remix" surprises.',
      learnMore:
        'https://docs.soliditylang.org/en/latest/layout-of-source-files.html#version-pragma',
      color: 'blue',
      side: 'left',
    },
    {
      id: 'comment',
      title: 'Comments',
      body: 'Single-line (`//`), block (`/*...*/`), or NatSpec (`///`) for documentation.',
      details:
        'Ordinary `//` and `/* */` comments are stripped before compilation like in any C-family language. NatSpec comments (`///` or `/** */`) are special: tags like `@title`, `@notice`, `@param`, and `@dev` are parsed by the compiler and can be surfaced in generated documentation, Etherscan\'s "Read/Write Contract" UI, and wallet confirmation prompts.\n\n`@notice` is meant for end users ("what does this do"), while `@dev` is for other developers ("how does this work internally"). Because a deployed contract\'s logic can\'t be casually patched, comments explaining *why* a check exists are disproportionately valuable here compared to most languages.',
      learnMore: 'https://docs.soliditylang.org/en/latest/natspec-format.html',
      color: 'slate',
      side: 'right',
    },
    {
      id: 'contract',
      title: 'Contract definition',
      body: 'The fundamental building block for smart contracts.',
      details:
        "A `contract` is Solidity's closest analogue to a class: it bundles state variables, functions, events, and modifiers, and it compiles down to EVM bytecode deployed at its own address. Every contract implicitly has an address, a balance, and persistent storage that survives between transactions.\n\nContracts can inherit from other contracts (`contract Token is ERC20, Ownable`), and Solidity supports multiple inheritance with a C3-linearization-based resolution order. Unlike most classes, a contract's deployed code is immutable by default -- there is no `git push` to fix a bug after mainnet deployment, only upgrade patterns bolted on top.",
      learnMore: 'https://docs.soliditylang.org/en/latest/structure-of-a-contract.html',
      color: 'green',
      side: 'left',
    },
    {
      id: 'state-variable',
      title: 'State variable',
      body: 'Data stored permanently on the blockchain.',
      details:
        'State variables declared at contract scope live in persistent storage, meaning every write is a `SSTORE` opcode that costs real gas -- often the single largest cost in a transaction. Their visibility (`public`, `private`, `internal`) controls Solidity-level access, not blockchain-level secrecy: all storage is publicly readable off-chain regardless of the keyword.\n\n`private` only stops other *contracts* from reading the variable through Solidity; anyone can still inspect it directly via the storage slot with a node RPC call. This trips up newcomers who expect `private` to mean what it means in Java.',
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#visibility-and-getters',
      color: 'purple',
      side: 'right',
    },
    {
      id: 'event',
      title: 'Event definition',
      body: 'Defines a structure for logging and external notifications.',
      details:
        '`event` declares a log entry shape that `emit` writes into the transaction receipt rather than into storage, making events far cheaper than an equivalent state write. Off-chain applications (frontends, indexers like The Graph) subscribe to these logs instead of polling contract state.\n\nParameters marked `indexed` (up to three per event) are stored in a searchable topic, letting clients filter logs by that value efficiently; non-indexed parameters are ABI-encoded into the log data and must be decoded client-side.',
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#events',
      color: 'red',
      side: 'left',
    },
    {
      id: 'constructor',
      title: 'Constructor',
      body: 'An optional function executed once upon deployment.',
      details:
        '`constructor` runs exactly once, at deployment, and is not part of the deployed runtime bytecode -- it only exists in the creation transaction. It is commonly used to set immutable configuration, assign an initial owner, or seed state variables from constructor arguments.\n\nParameters marked `immutable` can only be assigned in the constructor (or at declaration) and are then baked directly into the bytecode rather than read from storage, saving a `SLOAD` on every later access.',
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#constructors',
      color: 'teal',
      side: 'left',
    },
    {
      id: 'modifier',
      title: 'Function modifier',
      body: 'Reusable code that can change the behavior of functions.',
      details:
        "A `modifier` wraps a function body, typically to run a precondition check before letting execution continue. The special symbol `_;` marks where the wrapped function's body gets inlined; code before it runs first, code after it runs after the function returns.\n\nModifiers can take parameters, be stacked (`function f() onlyOwner whenNotPaused`), and are the idiomatic place for access control and reentrancy guards -- OpenZeppelin's `nonReentrant` and `onlyOwner` are both just modifiers.",
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers',
      color: 'orange',
      side: 'right',
    },
    {
      id: 'error-handling',
      title: 'Error handling',
      body: 'Validates conditions and reverts state changes on failure.',
      details:
        '`require(condition, "message")` reverts the entire transaction and refunds unused gas if the condition is false, undoing every state change made so far -- there is no partial success. `revert` and custom errors (`error InsufficientBalance(uint256 available);`) do the same but are more gas-efficient than string messages since 0.8.4, as the error data is ABI-encoded rather than stored as a string.\n\n`assert` is reserved for conditions that should be mathematically impossible (internal invariant violations); tripping one used to consume all remaining gas and still signals a bug in the contract rather than bad user input, unlike `require`.',
      learnMore:
        'https://docs.soliditylang.org/en/latest/control-structures.html#error-handling-assert-require-revert-and-exceptions',
      color: 'rose',
      side: 'right',
    },
    {
      id: 'function',
      title: 'Function definition',
      body: 'Executable units of code within the contract.',
      details:
        'Functions declare visibility (`public`, `external`, `internal`, `private`) and optional state-mutability (`view`, `pure`, `payable`). `external` functions can only be called from outside the contract and are slightly cheaper to call than `public` because arguments are read directly from calldata instead of copied to memory.\n\n`payable` allows a function to receive Ether alongside the call; omitting it makes the compiler reject any transaction that tries to send value to that function, which is a deliberate safety default rather than an oversight.',
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#functions',
      color: 'amber',
      side: 'left',
    },
    {
      id: 'visibility-mutability',
      title: 'Visibility & mutability',
      body: 'Controls access and state-change behavior (`public`, `private`, `view`, `pure`).',
      details:
        "`view` promises the function reads state but never writes it, and `pure` promises it touches neither state nor blockchain context (`msg.sender`, `block.timestamp`, etc.) -- both are enforced by the compiler, not just documentation. Calling a `view`/`pure` function from off-chain (e.g. via `eth_call`) costs no gas since no transaction or state change is involved.\n\nIf a `view` function is called from within a state-changing transaction, though, it still costs gas as part of that transaction's execution -- the free lunch only applies to standalone read calls. Mixing this up is a frequent source of confused gas estimates.",
      learnMore: 'https://docs.soliditylang.org/en/latest/contracts.html#view-functions',
      color: 'indigo',
      side: 'right',
    },
  ],
  examples: {
    minimal: [
      {
        code: 'contract Piggybank {',
        refs: ['contract'],
      },
      {
        code: '    address public owner; // "private" storage everyone can still read',
        refs: ['state-variable'],
      },
      { code: '' },
      {
        code: '    constructor() {\n        owner = msg.sender;',
        refs: ['constructor'],
      },
      { code: '    }', refs: ['constructor'] },
      { code: '' },
      {
        code: '    modifier onlyOwner() {\n        require(msg.sender == owner, "not the owner, nice try");\n        _;\n    }',
        refs: ['modifier', 'error-handling'],
      },
      { code: '' },
      {
        code: '    function withdraw() external onlyOwner {\n        payable(owner).transfer(address(this).balance);\n    }',
        refs: ['function'],
      },
      { code: '}', refs: ['contract'] },
    ],
    verbose: [
      { code: '// SPDX-License-Identifier: MIT', refs: ['spdx'] },
      {
        code: 'pragma solidity ^0.8.0; // Compiler version directive (pin it or regret it)',
        refs: ['pragma'],
      },
      { code: '' },
      {
        code: '/// @title A simple storage contract\n/// @notice Allows storing and retrieving a single value',
        refs: ['comment'],
      },
      {
        code: 'contract SimpleStorage {',
        refs: ['contract'],
      },
      {
        code: '    // State variable stored on the blockchain forever, like your first commit message',
        refs: ['comment'],
      },
      {
        code: '    uint256 private storedData; // "private" is a suggestion, not a lockbox',
        refs: ['state-variable'],
      },
      { code: '' },
      {
        code: '    // Event definition for logging\n    event DataChanged(uint256 newValue);',
        refs: ['event', 'comment'],
      },
      { code: '' },
      {
        code: '    // Constructor, executed once on deployment -- no do-overs after this\n    constructor(uint256 initialValue) {\n        storedData = initialValue;\n    }',
        refs: ['constructor', 'comment'],
      },
      { code: '' },
      {
        code: '    // Modifier to check a condition\n    modifier onlyPositive(uint256 value) {\n        require(value > 0, "Value must be positive, this is not a horror movie about negative numbers");\n        _; // Placeholder for function body',
        refs: ['modifier', 'error-handling', 'comment'],
      },
      { code: '    }', refs: ['modifier'] },
      { code: '' },
      {
        code: '    // Function to update the state variable\n    function set(uint256 x) public onlyPositive(x) {\n        storedData = x;\n        emit DataChanged(x); // Emit event, because printf debugging is not a thing here',
        refs: ['function', 'comment', 'event'],
      },
      { code: '    }', refs: ['function'] },
      { code: '' },
      {
        code: '    // Function to read the state variable (read-only)\n    function get() public view returns (uint256) {\n        return storedData;',
        refs: ['function', 'visibility-mutability', 'comment'],
      },
      { code: '    }', refs: ['function'] },
      { code: '}', refs: ['contract'] },
    ],
  },
}
