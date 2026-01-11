# 📕 Theme Docs

💡 Welcome to the documentation for Vendetta's themes! Here, you'll find information on how to use our raw colors and semantic colors to create beautiful and consistent designs across your application. Whether you're looking for a dark or light theme, we've got you covered. Cheers to a stylish and cohesive design!

Discord may change things within the app so if you'd like to track changes to colors and strings then join [Themelings](https://discord.gg/ZXWT9yRueq){target="_blank" rel="noopener"} and visit [#color-changes](https://discord.com/channels/1226954624372707348/1226955163080724645){target="_blank" rel="noopener"}.

- For a list of known strings and what they do, visit [here](/).
- For a full list of strings visit [Themelings](https://github.com/nexpid/Themelings/tree/data){target="_blank" rel="noopener"}.
- For theme templates visit [here](/Templates/).

## 🤖 Theme Format

```json
{
    "name": string,
    "description": string,
    "authors": [
        {
            "name": string,
            "id": string
        }
    ],
    "semanticColors": {
        "SEMANTIC_KEY_NAME": [
            string
        ]
    },
    "rawColors": {
        "raw_KEY_NAME": string
    },
    "background": {
        "blur": number,
        "url": string,
        "alpha": number
    },
    "spec": 2
}
```

### Semantic Colors and Raw Colors:

Values for `semanticColors` and `rawColors`:

- **Hexadecimal**: `#RGB(A)` or `#RRGGBB(AA)`
- **rgb() / rgba()**: `rgb(R, G, B)` or `rgba(R, G, B, A)`
- **transparent**: `transparent`

### Background values:

- **Blur**: Determines the blurriness of the background, goes from 0 to 1
- **URL**: A link to the background
  - If the background is hosted on GitHub, you must use the raw URL
  - Some sites, such as Imgur, are blocked in some countries so the backgrounds won't load
- **Alpha**: Determines the opacity of the background, goes from 0 to 1

## Additional Resources

Legacy theme docs can be found [here](https://vendetta-themes.gitbook.io/wiki){target="_blank" rel="noopener"}.
