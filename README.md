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

## React + Typescript + Vite template

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
