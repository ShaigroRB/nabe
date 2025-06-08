# nabe - Not A Boring Editor

An alternative map editor for Boring Man v2.

## Getting started in development

### Requirements

- NVM: https://github.com/nvm-sh/nvm#installing-and-updating
- pnpm: https://pnpm.io/installation
- Rust for Tauri: https://tauri.app/v1/guides/getting-started/prerequisites

### Quick start

1. Clone the repository
2. `cd nabe`
3. `nvm use`: use node v20+
4. `pnpm install`: install dependencies
5. `pnpm taurid dev`: Run the app

#### Visual Studio Code

If you are using VSCode, you can install the following extensions.
By default, it will suggest them to you when you open VSCode at the root level of this repository.

For automatic formatting when saving

- ESLint extension: https://open-vsx.org/vscode/item?itemName=dbaeumer.vscode-eslint
- Prettier extension: https://open-vsx.org/extension/esbenp/prettier-vscode

For having more readable TypeScript errors:

- Pretty TypeScript Errors: https://open-vsx.org/extension/yoavbls/pretty-ts-errors

For Tauri:

- Tauri: https://open-vsx.org/extension/tauri-apps/tauri-vscode

## Implement a new asset

### Add an image representing the asset

The image should be white by default.

The image should be put in `src/assets/textures/`.

### Follow the instructions

Search for `NEW_ASSET` in the codebase and follow the instructions to implement a new asset.

If a new function that do different things depending on an asset, don't forget to add a comment `// NEW_ASSET: ...` with an explanation on what to do.
