# 🔤 Font Docs

💡 This page introduces custom fonts support in theming. It explains how to install fonts, find fonts as well as creating your own.

Popular font sources: 
- [Rairof's Repo](https://rairof.github.io/Theme-Fonts/){target="_blank" rel="noopener"}
- [Arthurs Repo](https://github.com/Purple-EyeZ/Bunny-Fonts?tab=readme-ov-file#fonts-list){target="_blank" rel="noopener"}
- [Google Fonts](https://bunny-google-fonts.vercel.app/){target="_blank" rel="noopener"}
- [Revenge](https://discord.com/channels/1205207689832038522/1349083881869021296){target="_blank" rel="noopener"}

## Installing fonts

### Using font links (recommended):

1. Get the link to the font file you want
2. Go to `YouTab` > `Settings` > `Fonts` > `+`
3. Import font entries from a link

### Using theme files:

1. Find & install a theme with custom fonts support
2. Go to `YouTab` > `Settings` > `Fonts` > `+`
3. Extract font from theme

## Creating your own font

Font templates can be downloaded from [here](https://purple-eyez.github.io/Bunny-Theme-Keys/Templates/)

1. Create a public Git repository (recommended)
2. Upload fonts files (TTF/OTF) to the repository
3. Copy raw URLs
4. Make and upload a new json file with the following format:


```json
{
    "spec": 1,
    "name": string,
    "previewText": string,
    "main": {
        "ABCGintoNord-ExtraBold": "link",
        "ggsans-Bold": "link",
        "ggsans-BoldItalic": "link",
        "ggsans-ExtraBold": "link",
        "ggsans-ExtraBoldItalic": "link",
        "ggsans-Medium": "link",
        "ggsans-MediumItalic": "link",
        "ggsans-Normal": "link",
        "ggsans-NormalItalic": "link",
        "ggsans-Semibold": "link",
        "ggsans-SemiboldItalic": "link",
        "NotoSans-Bold": "link",
        "NotoSans-ExtraBold": "link",
        "NotoSans-Medium": "link",
        "NotoSans-Normal": "link",
        "NotoSans-NormalItalic": "link",
        "NotoSans-Semibold": "link",
        "SourceCodePro-Semibold": "link"
    }
}
```

5. Install the font