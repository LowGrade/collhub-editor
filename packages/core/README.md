<a href="https://collhub.sh">
  <img alt="Collhub is a Notion-style WYSIWYG editor with AI-powered autocompletions." src="https://novel.sh/opengraph-image.png">
  <h1 align="center">Collhub</h1>
  <h4 align="center">Using Novel text editor all rights reserved!</h4>
</a>

<p align="center">
  An open-source Notion-style WYSIWYG editor with AI-powered autocompletions. 
</p>

<p align="center">
  <a href="https://news.ycombinator.com/item?id=36360789"><img src="https://img.shields.io/badge/Hacker%20News-369-%23FF6600" alt="Hacker News"></a>
  <a href="https://github.com/steven-tey/collhub/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/steven-tey/collhub?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
  <a href="https://github.com/steven-tey/collhub"><img src="https://img.shields.io/github/stars/steven-tey/collhub?style=social" alt="Collhub.sh's GitHub repo"></a>
</p>

<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#setting-up-locally"><strong>Setting Up Locally</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#license"><strong>License</strong></a>
</p>
<br/>

## Introduction

[Collhub](https://collhub.sh/) is a Notion-style WYSIWYG editor with AI-powered autocompletions.

https://github.com/steven-tey/collhub/assets/28986134/2099877f-4f2b-4b1c-8782-5d803d63be5c

<br />

## Installation

To use Collhub in a project, you can run the following command to install the `collhub` [NPM package](https://www.npmjs.com/package/collhub):

```
npm i collhub
```

Then, you can use it in your code like this:

```jsx
import { Editor } from 'collhub';

export default function App() {
  return <Editor />;
}
```

The `Editor` is a React component that takes in the following props:

| Prop                  | Type                        | Description                                                                                                                                                                                    | Default                                                                                                                             |
| --------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `completionApi`       | `string`                    | The API route to use for the OpenAI completion API.                                                                                                                                            | `/api/generate`                                                                                                                     |
| `className`           | `string`                    | Editor container classname.                                                                                                                                                                    | `"relative min-h-[500px] w-full max-w-screen-lg border-stone-200 bg-white sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:shadow-lg"` |
| `defaultValue`        | `JSONContent` or `string`   | The default value to use for the editor.                                                                                                                                                       | [`defaultEditorContent`](https://github.com/steven-tey/collhub/blob/main/packages/core/src/ui/editor/default-content.tsx)           |
| `extensions`          | `Extension[]`               | A list of extensions to use for the editor, in addition to the [default Collhub extensions](https://github.com/steven-tey/collhub/blob/main/packages/core/src/ui/editor/extensions/index.tsx). | `[]`                                                                                                                                |
| `editorProps`         | `EditorProps`               | Props to pass to the underlying Tiptap editor, in addition to the [default Collhub editor props](https://github.com/steven-tey/collhub/blob/main/packages/core/src/ui/editor/props.ts).        | `{}`                                                                                                                                |
| `onUpdate`            | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated.                                                                                                                             | `() => {}`                                                                                                                          |
| `onDebouncedUpdate`   | `(editor?: Editor) => void` | A callback function that is called whenever the editor is updated, but only after the defined debounce duration.                                                                               | `() => {}`                                                                                                                          |
| `debounceDuration`    | `number`                    | The duration (in milliseconds) to debounce the `onDebouncedUpdate` callback.                                                                                                                   | `750`                                                                                                                               |
| `storageKey`          | `string`                    | The key to use for storing the editor's value in local storage.                                                                                                                                | `collhub__content`                                                                                                                  |
| `disableLocalStorage` | `boolean`                   | Enabling this option will prevent read/write content from/to local storage.                                                                                                                    | `false`                                                                                                                             |

## Setting Up Locally

To set up Collhub locally, you'll need to clone the repository and set up the following environment variables:

- `OPENAI_API_KEY` – your OpenAI API key (you can get one [here](https://platform.openai.com/account/api-keys))
- `BLOB_READ_WRITE_TOKEN` – your Vercel Blob read/write token (currently [still in beta](https://vercel.com/docs/storage/vercel-blob/quickstart#quickstart), but feel free to [sign up on this form](https://vercel.fyi/blob-beta) for access)

If you've deployed this to Vercel, you can also use [`vc env pull`](https://vercel.com/docs/cli/env#exporting-development-environment-variables) to pull the environment variables from your Vercel project.

To run the app locally, you can run the following commands:

```
pnpm i
pnpm build
pnpm dev
```

## Tech Stack

Collhub is built on the following stack:

- [Novel](https://www.npmjs.com/package/novel) - Core editor package
- [Next.js](https://nextjs.org/) – framework
- [Tiptap](https://tiptap.dev/) – text editor
- [OpenAI](https://openai.com/) - AI completions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI library
- [Vercel](https://vercel.com) – deployments
- [TailwindCSS](https://tailwindcss.com/) – styles
- [Cal Sans](https://github.com/calcom/font) – font

## License

Licensed under the [Apache-2.0 license](https://github.com/steven-tey/novel/blob/main/LICENSE.md).
