// Validator
document.getElementById('validateButton').addEventListener('click', function () {
    const jsonInput = document.getElementById('jsonInput').value;
    const resultDiv = document.getElementById('result');

    // Reset result area
    resultDiv.innerHTML = '';

    // Reset line numbers
    const lines = jsonInput.split('\n');
    updateLineNumbers(lines);

    try {
        // JSON syntax check
        const parsedJSON = jsonlint.parse(jsonInput);

        // Proceed to validation
        const { errors, warnings } = validateJSON(parsedJSON, lines);

        if (errors.length > 0) {
            resultDiv.innerHTML = '<p style="color: red;">Validation errors:</p><ul>';
            errors.forEach(err => {
                resultDiv.innerHTML += `<li>${err}</li>`;
            });
            resultDiv.innerHTML += '</ul>';
        } else {
            resultDiv.innerHTML = '<p class="success">Valid theme!</p>';
        }

        if (warnings.length > 0) {
            resultDiv.innerHTML += '<p style="color: orange;">Validation warnings:</p><ul>';
            warnings.forEach(warn => {
                resultDiv.innerHTML += `<li>${warn}</li>`;
            });
            resultDiv.innerHTML += '</ul>';
        }

    } catch (error) {
        // Syntax error handling
        const lineMatch = error.message.match(/line (\d+)/);
        const lineNumber = lineMatch ? parseInt(lineMatch[1]) : 'unknown';
        const errorMessage = error.message || 'Unknown syntax error';

        resultDiv.innerHTML = `<p class="error">Syntax error on line ${lineNumber}: ${errorMessage}</p>`;
        if (lineNumber !== 'unknown') {
            highlightErrorLine(lineNumber - 1);
        }
    }
});

// Update lines number
function updateLineNumbers(lines) {
    const lineNumbersDiv = document.getElementById('lineNumbers');
    lineNumbersDiv.innerHTML = ''; // Reset line numbers
    lines.forEach((line, index) => {
        const lineNumberElem = document.createElement('div');
        lineNumberElem.textContent = index + 1;
        lineNumberElem.classList.add('line-number');
        lineNumbersDiv.appendChild(lineNumberElem);
    });
}

function highlightErrorLine(lineNumber) {
    const lineNumbersDiv = document.getElementById('lineNumbers').children;
    if (lineNumbersDiv[lineNumber]) {
        lineNumbersDiv[lineNumber].classList.add('highlight');
    }
}

// Validate Themes
function validateJSON(jsonObject, lines) {
    const errors = [];
    const warnings = [];

    // SemanticColors check
    if (jsonObject.semanticColors) {
        if (typeof jsonObject.semanticColors !== 'object') {
            errors.push('"semanticColors" must be an object.');
        } else {
            for (const key in jsonObject.semanticColors) {
                if (Array.isArray(jsonObject.semanticColors[key])) {
                    jsonObject.semanticColors[key].forEach(value => {
                        const isHexColor = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(value);
                        const isRgbaColor = /^rgba\(\s*(\d{1,3}|[0-9]{1,3}\s*\.\s*\d+)\s*,\s*(\d{1,3}|[0-9]{1,3}\s*\.\s*\d+)\s*,\s*(\d{1,3}|[0-9]{1,3}\s*\.\s*\d+)\s*,\s*(0|1|0?\.\d+|1\.0)\s*\)$/i.test(value);

                        if (typeof value !== 'string' || (!isHexColor && !isRgbaColor && value !== "transparent")) {
                            errors.push(`The value "${value}" for "${key}" is not a valid color code.`);
                        }

                        // Additional check for RGB values
                        if (isRgbaColor) {
                            const rgbaValues = value.match(/rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+|1\.0)\s*\)/i);
                            if (rgbaValues) {
                                const r = parseInt(rgbaValues[1], 10);
                                const g = parseInt(rgbaValues[2], 10);
                                const b = parseInt(rgbaValues[3], 10);
                                const a = parseFloat(rgbaValues[4]);
                                if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255 || a < 0 || a > 1) {
                                    errors.push(`The value "${value}" for "${key}" contains invalid RGB values (must be between 0 and 255) or alpha value (must be between 0 and 1).`);
                                }
                            }
                        }
                    });
                } else {
                    errors.push(`The key "${key}" in "semanticColors" must be an array.`);
                }
            }
        }
    }

    // rawColors check
    if (jsonObject.rawColors) {
        if (typeof jsonObject.rawColors !== 'object') {
            errors.push('"rawColors" must be an object.');
        } else {
            for (const key in jsonObject.rawColors) {
                const value = jsonObject.rawColors[key];
                if (Array.isArray(value)) {
                    errors.push(`The value for "${key}" must be a string, not an array.`);
                } else {
                    const isHexColor = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(value);
                    const isRgbaColor = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/.test(value);
                    if (typeof value !== 'string' || (!isHexColor && !isRgbaColor && value !== "transparent")) {
                        errors.push(`The value "${value}" for "${key}" is not a valid color code.`);
                    }
                }
            }
        }
    }

    // Authors check
    if (!Array.isArray(jsonObject.authors)) {
        errors.push('"authors" must be an array.');
    } else {
        jsonObject.authors.forEach((author, index) => {
            if (typeof author.name !== 'string') {
                errors.push(`The author at index ${index} must have a valid name.`);
            }
        });
    }

    // spec check
    if (jsonObject.spec === undefined) {
        errors.push('"spec" is missing.');
    } else if (typeof jsonObject.spec !== 'number' || jsonObject.spec !== 2) {
        errors.push('"spec" must be equal to 2.');
    }

    // name check
    if (typeof jsonObject.name !== 'string' || jsonObject.name.trim() === '') {
        errors.push('"name" must be a non-empty string.');
    }

    // description check
    if (typeof jsonObject.description !== 'string' || jsonObject.description.trim() === '') {
        errors.push('"description" must be a non-empty string.');
    }

    // "background" check
    if (jsonObject.background) {
        if (typeof jsonObject.background !== 'object') {
            errors.push('"background" must be an object.');
        } else {
            if (jsonObject.background.url) {
                const url = jsonObject.background.url;

                if (/^https?:\/\/(cdn\.discordapp\.com|discordapp\.com)/.test(url)) {
                    errors.push('"background" cannot be a Discord CDN URL.');
                } else {
                    // Check if it's a valid image URL
                    const isImageUrl = /\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url);
                    if (!isImageUrl) {
                        warnings.push(`The URL "${url}" may not be a valid image URL. It does not end with a common image extension (.jpg, .jpeg, .png, .gif) or include valid parameters.`);
                    }
                }
            }

            if (jsonObject.background.blur !== undefined) {
                if (typeof jsonObject.background.blur !== 'number') {
                    errors.push('"blur" in "background" must be a number.');
                } else if (jsonObject.background.blur < 0 || jsonObject.background.blur > 1) {
                    errors.push('"blur" in "background" must be between 0 and 1.');
                }
            }

            if (jsonObject.background.alpha !== undefined) {
                if (typeof jsonObject.background.alpha !== 'number') {
                    errors.push('"alpha" in "background" must be a number.');
                } else if (jsonObject.background.alpha < 0 || jsonObject.background.alpha > 1) {
                    errors.push('"alpha" in "background" must be between 0 and 1.');
                }
            }
        }
    }

    // Define the required font types
    const requiredFonts = [
        "ABCGintoNord-ExtraBold",
        "ggsans-Bold",
        "ggsans-BoldItalic",
        "ggsans-ExtraBold",
        "ggsans-ExtraBoldItalic",
        "ggsans-Medium",
        "ggsans-MediumItalic",
        "ggsans-Normal",
        "ggsans-NormalItalic",
        "ggsans-Semibold",
        "ggsans-SemiboldItalic",
        "NotoSans-Bold",
        "NotoSans-ExtraBold",
        "NotoSans-Medium",
        "NotoSans-Normal",
        "NotoSans-NormalItalic",
        "NotoSans-Semibold",
        "SourceCodePro-Semibold"
    ];

    // Check for "fonts"
    if (jsonObject.fonts) {
        if (typeof jsonObject.fonts !== 'object') {
            errors.push('"fonts" must be an object.');
        } else {
            requiredFonts.forEach(font => {
                if (!jsonObject.fonts[font]) {
                    errors.push(`Missing required font: "${font}".`);
                } else {
                    // Check if the font URL is a valid URL, allowing query parameters
                    const url = jsonObject.fonts[font];
                    const isValidFontUrl = /^(https?:\/\/.*\.(ttf|otf)(\?.*)?)$/.test(url);
                    if (!isValidFontUrl) {
                        errors.push(`Invalid URL for font "${font}": "${url}". Must be a valid .ttf or .otf URL.`);
                    }
                }
            });
        }
    }

    // Theme plus check
    if (jsonObject.plus) {
        if (jsonObject.plus.version !== 0) {
            errors.push('"plus.version" must be 0.');
        }

        if (jsonObject.plus.customOverlays && jsonObject.plus.iconpack) {
            warnings.push('"customOverlays" is incompatible with "iconpack".');
        }

        if (jsonObject.plus.icons) {
            if (typeof jsonObject.plus.icons !== 'object' || Array.isArray(jsonObject.plus.icons)) {
                errors.push('"plus.icons" must be an object.');
            } else {
                for (const [iconName, iconValue] of Object.entries(jsonObject.plus.icons)) {
                    if (!Array.isArray(iconValue) && typeof iconValue !== 'string') {
                        errors.push(`The value of "${iconName}" in "plus.icons" must be a string or an array of strings.`);
                    } else if (Array.isArray(iconValue)) {
                        iconValue.forEach(color => {
                            const isHexColor = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(color);
                            if (typeof color !== 'string' || !isHexColor) {
                                errors.push(`Each color in "${iconName}" must be a valid HEX color string.`);
                            }
                        });
                    } else {
                        const isHexColor = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(iconValue);
                        if (!isHexColor) {
                            errors.push(`The value of "${iconName}" must be a valid HEX color string.`);
                        }
                    }
                }
            }
        }

        // Check "mentionLineColor"
        if (jsonObject.plus.mentionLineColor) {
            const isHexColor = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(jsonObject.plus.mentionLineColor);
            if (typeof jsonObject.plus.mentionLineColor !== 'string' || !isHexColor) {
                errors.push('"mentionLineColor" must be a valid HEX color string.');
            }
        }
    }

    return { errors, warnings };

}

// Find the line of a key
function getLineOfKey(lines, key) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`"${key}"`)) {
            return i + 1;
        }
    }
    return '?';
}

document.getElementById('jsonInput').addEventListener('scroll', function () {
    const lineNumbersDiv = document.getElementById('lineNumbers');
    lineNumbersDiv.scrollTop = this.scrollTop;
});

// Formatter
document.getElementById('formatButton').addEventListener('click', function () {
    const jsonInput = document.getElementById('jsonInput').value;

    try {
        // Parse and format the JSON
        const parsedJSON = JSON.parse(jsonInput);
        const formattedJSON = JSON.stringify(parsedJSON, null, 4); // 4-space indentation

        // Replace the content of the text area with the formatted JSON
        document.getElementById('jsonInput').value = formattedJSON;
    } catch (error) {
        document.getElementById('result').innerHTML = '<p style="color: red;">Syntax error in JSON, unable to format.</p>';
    }
});

// Copy the JSON content
document.getElementById('copyButton').addEventListener('click', async function () {
    const jsonInput = document.getElementById('jsonInput');

    try {
        await navigator.clipboard.writeText(jsonInput.value);
        showToast(`<span class="material-symbols-rounded" style="color: #4CAF50;">check</span><span>Copied to clipboard!</span>`);
    } catch (error) {
        console.error('Copy error:', error);
        showToast(`<span class="material-symbols-rounded" style="color: #fa4343;">error</span><span>Failed to copy</span>`);
    }
});

// Clear text area
document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('jsonInput').value = '';
    document.getElementById('result').innerHTML = '';
});