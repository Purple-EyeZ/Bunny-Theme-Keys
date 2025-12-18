# Contributing - Adding Documentation

Adding new docs to this site is super simple. Just drop a markdown file in the `src/Docs` folder and it'll automatically show up in the menu!

## Quick Start

1. Create a new `.md` file in `src/Docs/`
2. Name it with a number prefix for ordering: `01-getting-started.md`, `02-installation.md`, etc.
3. The number and hyphens are stripped in the menu, so `01-getting-started` displays as "Getting Started"
4. Write your content in markdown and it'll render automatically

## Features

### Images with Custom Size

Use the `{ width=... }` syntax:

```markdown
![My Image](/Docs/assets/my-image.png){ width=400 }
```

### Code Highlighting

Just specify the language in your code blocks:

````markdown
```js
const greeting = "Hello!";
console.log(greeting);
```
````

Supported languages: `js`, `ts`, `python`, `bash`, `html`, `css`, `json`, etc. (basically anything highlight.js supports)

### Info Boxes

Use these custom containers for important info:

```markdown
::: note
Basic info that users should know.
:::

::: tip
Helpful tips for success.
:::

::: important
Critical stuff users need to know.
:::

::: warning
Potential risks or issues.
:::

::: caution
Negative consequences of actions.
:::
```

You can customize the title:

```markdown
::: warning Watch Out!
This specific warning message.
:::
```

### Other Markdown Features

- **Bold**: `**text**` or `__text__`
- **Italic**: `*text*` or `_text_`
- **Links**: `[text](url)`
- **Tables**: Standard markdown tables work great
- **Blockquotes**: `> quote`
- **Lists**: `- item` or `1. item`
- **Inline code**: `` `code` ``
- **Code blocks**: Use triple backticks with language specifier

All standard markdown is supported, plus fancy typography (smart quotes, dashes, etc.).

## Navigation

Links between docs:

```markdown
[Check the installation guide](/Docs/?page=02-installation)
```

## Tips

- Use lowercase filenames with hyphens
- The first file (lowest number) shows by default
- Images in `/Docs/assets/` can be referenced as `/Docs/assets/filename.png`
- The first `# Heading` in your file becomes the browser tab title
