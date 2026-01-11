import jsonlint from "../jsonlint/jsonlint.js";
import { showToast } from "./shared.js";

// Fonts list
const REQUIRED_FONTS = [
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
	"ggmono-Normal",
];

// Helper functions
function isValidHexColor(value) {
	return /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3}|[0-9A-Fa-f]{4})$/.test(
		value,
	);
}

function isValidRgbaColor(value, key = null, errors = null) {
	const rgbaValues = value.match(
		/^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+|1\.0)\s*\)$/i,
	);
	if (!rgbaValues) return false;

	const [, r, g, b, a] = rgbaValues.map((v) => parseFloat(v));
	const isValid =
		r >= 0 &&
		r <= 255 &&
		g >= 0 &&
		g <= 255 &&
		b >= 0 &&
		b <= 255 &&
		a >= 0 &&
		a <= 1;

	if (!isValid && key && errors) {
		errors.push(
			`The value "${value}" for "${key}" contains invalid RGB values (must be between 0 and 255) or alpha value (must be between 0 and 1).`,
		);
	}

	return isValid;
}

function isValidColor(value) {
	return (
		typeof value === "string" &&
		(isValidHexColor(value) ||
			isValidRgbaColor(value) ||
			value === "transparent")
	);
}

function isValidFontUrl(url) {
	return /^(https?:\/\/.*\.(ttf|otf)(\?.*)?)$/.test(url);
}

function isDiscordCdnUrl(url) {
	return /^https?:\/\/(cdn\.discordapp\.com|discordapp\.com)/.test(url);
}

function validateRequired(obj, field, type, errors) {
	if (
		typeof obj[field] !== type ||
		(type === "string" && obj[field].trim() === "")
	) {
		errors.push(`"${field}" must be a non-empty ${type}.`);
		return false;
	}
	return true;
}

function validateObject(obj, field, errors) {
	if (
		!obj[field] ||
		typeof obj[field] !== "object" ||
		Array.isArray(obj[field])
	) {
		errors.push(`"${field}" must be an object.`);
		return false;
	}
	return true;
}

function validateFonts(fontObject, errors, warnings = false) {
	const urls = new Set();

	REQUIRED_FONTS.forEach((font) => {
		if (!fontObject[font]) {
			if (font === "ggmono-Normal" && fontObject["SourceCodePro-Semibold"]) {
				warnings.push(
					'"SourceCodePro-Semibold" has been replaced by "ggmono-Normal" in recent Discord versions. Consider updating your font pack.',
				);
				return;
			}
			errors.push(`Missing required font: "${font}".`);
		} else {
			const url = fontObject[font];
			urls.add(url);

			if (!isValidFontUrl(url)) {
				errors.push(`Invalid URL for font "${font}": "${url}".`);
			}
			if (isDiscordCdnUrl(url)) {
				errors.push(`Font "${font}" cannot use Discord CDN URL.`);
			}
		}
	});

	// Check URL diversity
	if (urls.size === 1 && Object.keys(fontObject).length > 1) {
		errors.push(
			"All fonts cannot use the same URL. Different font styles must point to different files.",
		);
	} else if (urls.size < Object.keys(fontObject).length * 0.5) {
		// if less than 50% of the fonts are unique
		warnings.push(
			"Most font styles use the same file, which can prevent visual differences and cause display inconsistencies. Use distinct files for each style.",
		);
	}

	return urls;
}

// Validator
document.getElementById("validateButton").addEventListener("click", () => {
	const jsonInput = document.getElementById("jsonInput").value;
	const resultDiv = document.getElementById("result");

	resultDiv.innerHTML = "";

	const lines = jsonInput.split("\n");
	updateLineNumbers(lines);

	try {
		const parsedJSON = jsonlint.parse(jsonInput);

		const { errors, warnings, type } = validateJSON(parsedJSON, lines);

		if (errors.length > 0) {
			resultDiv.innerHTML = '<p style="color: red;">Validation errors:</p><ul>';
			errors.forEach((err) => {
				resultDiv.innerHTML += `<li>${err}</li>`;
			});
			resultDiv.innerHTML += "</ul>";
		} else {
			const successMessage =
				type === "fontpack" ? "Valid font pack!" : "Valid theme!";
			resultDiv.innerHTML = `<p class="success">${successMessage}</p>`;
		}

		if (warnings.length > 0) {
			resultDiv.innerHTML +=
				'<p style="color: orange;">Validation warnings:</p><ul>';
			warnings.forEach((warn) => {
				resultDiv.innerHTML += `<li>${warn}</li>`;
			});
			resultDiv.innerHTML += "</ul>";
		}

		resultDiv.scrollIntoView({ behavior: "smooth" });
	} catch (error) {
		// Syntax error handling
		const lineMatch = error.message.match(/line (\d+)/);
		const lineNumber = lineMatch ? Number(lineMatch[1]) : "unknown";
		const errorMessage = error.message || "Unknown syntax error";

		resultDiv.innerHTML = `<p class="error">Syntax error on line ${lineNumber}: ${errorMessage}</p>`;
		if (lineNumber !== "unknown") {
			highlightErrorLine(lineNumber - 1);
		}

		resultDiv.scrollIntoView({ behavior: "smooth" });
	}
});

// Update lines number
function updateLineNumbers(lines) {
	const lineNumbersDiv = document.getElementById("lineNumbers");
	lineNumbersDiv.innerHTML = "";
	lines.forEach((_line, index) => {
		const lineNumberElem = document.createElement("div");
		lineNumberElem.textContent = index + 1;
		lineNumberElem.classList.add("line-number");
		lineNumbersDiv.appendChild(lineNumberElem);
	});
}

// Highlight the line with an error
function highlightErrorLine(lineNumber) {
	const lineNumbersDiv = document.getElementById("lineNumbers").children;
	if (lineNumbersDiv[lineNumber]) {
		lineNumbersDiv[lineNumber].classList.add("highlight");
	}
}

// Validate JSON
function validateJSON(jsonObject, _lines) {
	const errors = [];
	const warnings = [];
	let type = "";

	// Detect if it's a font pack or theme based on structure
	const isFontPack = !!jsonObject.main;
	const isTheme = !!jsonObject.semanticColors || !!jsonObject.rawColors;

	if (!isFontPack && !isTheme) {
		errors.push(
			'Invalid JSON: must contain either "main" for font packs or "semanticColors"/"rawColors" for themes.',
		);
		return { errors, warnings, type: "unknown" };
	}

	if (isFontPack && isTheme) {
		errors.push(
			"Invalid JSON: cannot contain both font pack and theme properties.",
		);
		return { errors, warnings, type: "unknown" };
	}

	type = isFontPack ? "fontpack" : "theme";

	if (isFontPack) {
		validateFontPack(jsonObject, errors, warnings);
	} else {
		validateTheme(jsonObject, errors, warnings);
	}

	return { errors, warnings, type };
}

// Validate Font Packs
function validateFontPack(jsonObject, errors, warnings) {
	validateRequired(jsonObject, "name", "string", errors);
	validateRequired(jsonObject, "previewText", "string", errors);
	validateRequired(jsonObject, "spec", "number", errors);

	if (jsonObject.spec !== 1) {
		errors.push('"spec" must be equal to 1.');
	}

	if (!jsonObject.main || typeof jsonObject.main !== "object") {
		errors.push('"main" must be an object containing font definitions.');
		return;
	}

	validateFonts(jsonObject.main, errors, warnings);

	Object.keys(jsonObject.main).forEach((font) => {
		if (!REQUIRED_FONTS.includes(font) && font !== "SourceCodePro-Semibold") {
			warnings.push(`Unknown font "${font}" found in "main".`);
		}
	});
	return { errors, warnings };
}

// Validate Themes
function validateTheme(jsonObject, errors, warnings) {
	validateRequired(jsonObject, "name", "string", errors);
	validateRequired(jsonObject, "description", "string", errors);

	// SemanticColors check
	if (jsonObject.semanticColors) {
		if (!validateObject(jsonObject, "semanticColors", errors)) return;
		else {
			for (const key in jsonObject.semanticColors) {
				if (Array.isArray(jsonObject.semanticColors[key])) {
					jsonObject.semanticColors[key].forEach((value) => {
						if (!isValidColor(value)) {
							errors.push(
								`The value "${value}" for "${key}" is not a valid color code.`,
							);
							return;
						}
						isValidRgbaColor(value, key, errors);
					});
				} else {
					errors.push(`The key "${key}" in "semanticColors" must be an array.`);
				}
			}
		}
	}

	// rawColors check
	if (jsonObject.rawColors) {
		if (!validateObject(jsonObject, "rawColors", errors)) return;
		else {
			for (const [key, value] of Object.entries(jsonObject.rawColors)) {
				if (Array.isArray(value)) {
					errors.push(`The value for "${key}" must be a string, not an array.`);
				} else if (!isValidColor(value)) {
					errors.push(
						`The value "${value}" for "${key}" is not a valid color code.`,
					);
				} else {
					isValidRgbaColor(value, key, errors);
				}
			}
		}
	}

	// Authors check
	if (!Array.isArray(jsonObject.authors)) {
		errors.push('"authors" must be an array.');
	} else {
		jsonObject.authors.forEach((author, index) => {
			if (typeof author.name !== "string") {
				errors.push(`The author at index ${index} must have a valid name.`);
			}
		});
	}

	// spec check
	if (jsonObject.spec === undefined) {
		errors.push('"spec" is missing.');
	} else if (typeof jsonObject.spec !== "number" || jsonObject.spec !== 2) {
		errors.push('"spec" must be equal to 2.');
	}

	// "background" check
	if (jsonObject.background) {
		if (!validateObject(jsonObject, "background", errors)) return;
		else {
			if (jsonObject.background.url) {
				const url = jsonObject.background.url;
				if (isDiscordCdnUrl(url)) {
					errors.push('"background" cannot be a Discord CDN URL.');
				} else if (!/\.(jpg|jpeg|png|gif)(\?.*)?$/i.test(url)) {
					warnings.push(`The URL "${url}" may not be a valid image URL.`);
				}
			}

			["blur", "alpha"].forEach((prop) => {
				if (jsonObject.background[prop] !== undefined) {
					if (typeof jsonObject.background[prop] !== "number") {
						errors.push(`"${prop}" in "background" must be a number.`);
					} else if (
						jsonObject.background[prop] < 0 ||
						jsonObject.background[prop] > 1
					) {
						errors.push(`"${prop}" in "background" must be between 0 and 1.`);
					}
				}
			});
		}
	}

	// Fonts check
	if (jsonObject.fonts) {
		if (!validateObject(jsonObject, "fonts", errors)) return;
		else {
			validateFonts(jsonObject.fonts, errors, warnings);
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

		if (jsonObject.plus?.icons) {
			if (!validateObject(jsonObject.plus, "icons", errors)) return;
			else {
				for (const [iconName, iconValue] of Object.entries(
					jsonObject.plus.icons,
				)) {
					if (Array.isArray(iconValue)) {
						iconValue.forEach((color) => {
							if (!isValidHexColor(color)) {
								errors.push(
									`Each color in "${iconName}" must be a valid HEX color string.`,
								);
							}
						});
					} else if (
						typeof iconValue === "string" &&
						!isValidHexColor(iconValue)
					) {
						errors.push(
							`The value of "${iconName}" must be a valid HEX color string.`,
						);
					} else if (
						typeof iconValue !== "string" &&
						!Array.isArray(iconValue)
					) {
						errors.push(
							`The value of "${iconName}" in "plus.icons" must be a string or an array of strings.`,
						);
					}
				}
			}

			// Check "mentionLineColor"
			if (
				jsonObject.plus.mentionLineColor &&
				!isValidHexColor(jsonObject.plus.mentionLineColor)
			) {
				errors.push('"mentionLineColor" must be a valid HEX color string.');
			}
		}
	}
	return { errors, warnings };
}

// Find the line of a key
/*function getLineOfKey(lines, key) {
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`"${key}"`)) {
            return i + 1;
        }
    }
    return '?';
}*/

document.getElementById("jsonInput").addEventListener("scroll", function () {
	const lineNumbersDiv = document.getElementById("lineNumbers");
	lineNumbersDiv.scrollTop = this.scrollTop;
});

// Formatter
document.getElementById("formatButton").addEventListener("click", () => {
	const jsonInput = document.getElementById("jsonInput").value;

	try {
		const parsedJSON = JSON.parse(jsonInput);
		const formattedJSON = JSON.stringify(parsedJSON, null, 4);

		document.getElementById("jsonInput").value = formattedJSON;
	} catch {
		document.getElementById("result").innerHTML =
			'<p style="color: red;">Syntax error in JSON, unable to format.</p>';
	}
});

// Copy the JSON content
document.getElementById("copyButton").addEventListener("click", async () => {
	const jsonInput = document.getElementById("jsonInput");

	try {
		await navigator.clipboard.writeText(jsonInput.value);
		showToast(
			`<span class="material-symbols-rounded" style="color: #4CAF50;">check</span><span>Copied to clipboard!</span>`,
		);
	} catch (error) {
		console.error("Copy error:", error);
		showToast(
			`<span class="material-symbols-rounded" style="color: #fa4343;">error</span><span>Failed to copy</span>`,
		);
	}
});

// Clear text area
document.getElementById("clearButton").addEventListener("click", () => {
	document.getElementById("jsonInput").value = "";
	document.getElementById("result").innerHTML = "";
});
