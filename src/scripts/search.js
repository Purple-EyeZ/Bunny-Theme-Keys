// TODO: improve search functionality (with better scoring logic or hidden keywords in data.json?)
const CONSTANTS = {
	ANIMATION: {
		DEBOUNCE: 150,
	},
	SCORE: {
		EXACT_MATCH: 10,
		WORD_BOUNDARY: 5,
		WORD_START: 3,
		PARTIAL_MATCH: 1,
		TITLE_MULTIPLIER: 3,
	},
	CATEGORIES: {
		SEMANTIC: "semantic-colors",
		RAW: "raw-colors",
	},
};

const searchState = {
	currentValue: "",
	wasCleared: false,
};

const SELECTORS = {
	ACTIVE_CATEGORY: ".category.active",
	SEARCH_CONTAINER: ".search-container",
	BLOC: ".bloc",
};

const elements = {
	searchBar: document.getElementById("search-bar"),
	fixedSearchBar: document.getElementById("fixedSearchBar"),
	clearButton: document.getElementById("clearSearch"),
	clearButtonFixed: document.getElementById("clearFixedSearch"),
	searchButton: document.getElementById("searchButton"),
};

const getOtherCategory = (activeCategory) =>
	activeCategory === CONSTANTS.CATEGORIES.SEMANTIC
		? CONSTANTS.CATEGORIES.RAW
		: CONSTANTS.CATEGORIES.SEMANTIC;

// Add search functionality for both search bars
function addSearchFunctionality() {
	const { searchBar, fixedSearchBar, clearButton, clearButtonFixed } = elements;

	const handleSearchInput = (e) => {
		const value = e.target.value;
		searchState.currentValue = value;
		searchState.wasCleared = false;
		debouncedFilter(value);
		toggleClearButton(e.target, value);

		const otherBar = e.target === searchBar ? fixedSearchBar : searchBar;
		otherBar.value = value;
		toggleClearButton(otherBar, value);
	};

	[searchBar, fixedSearchBar].forEach((bar) => {
		if (bar) {
			bar.addEventListener("input", handleSearchInput);
		}
	});

	const clearSearch = (input) => {
		searchState.currentValue = "";
		searchState.wasCleared = true;
		[searchBar, fixedSearchBar].forEach((bar) => {
			bar.value = "";
			toggleClearButton(bar, "");
		});
		filterBlocks("");
		input.focus();
	};

	[
		{ button: clearButton, input: searchBar },
		{ button: clearButtonFixed, input: fixedSearchBar },
	].forEach(({ button, input }) => {
		button?.addEventListener("click", () => clearSearch(input));
	});
}

// Add click events to show/hide the search bar
function addSearchButtonEvent() {
	const { searchButton, fixedSearchBar, clearButtonFixed } = elements;

	searchButton.addEventListener("click", () => {
		const isHidden = fixedSearchBar.classList.contains("hidden");
		fixedSearchBar.classList.toggle("hidden", !isHidden);
		fixedSearchBar.classList.toggle("show", isHidden);

		if (isHidden) {
			fixedSearchBar.focus();
			clearButtonFixed.style.display =
				fixedSearchBar.value.length > 0 ? "block" : "none";
		} else {
			clearButtonFixed.style.display = "none";
		}
	});
}

// Toggle clear button visibility
function toggleClearButton(inputElement, value) {
	const clearButton =
		elements[
			inputElement.id === "search-bar" ? "clearButton" : "clearButtonFixed"
		];
	const shouldShow =
		value.length > 0 &&
		(inputElement.id !== "fixedSearchBar" ||
			inputElement.classList.contains("show"));

	clearButton.style.display = shouldShow ? "block" : "none";
}

// Detects whether the user has clicked on the fixed search bar
const fixedSearchBar = document.getElementById("fixedSearchBar");
if (fixedSearchBar) {
	fixedSearchBar.addEventListener("focus", () => {
		fixedSearchBar.dataset.isFocused = "true";
	});

	fixedSearchBar.addEventListener("blur", () => {
		fixedSearchBar.dataset.isFocused = "false";
	});
}

export const isFixedSearchFocused = () =>
	document.getElementById("fixedSearchBar")?.dataset.isFocused === "true";

// Search utils
function stemWord(word) {
	return word
		.replace(/([^aeiou])ies$/, "$1y")
		.replace(/([^aeiou])s$/, "$1")
		.replace(/e?s$/, "");
}

function normalizeText(text) {
	if (!text) return "";
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "") // Remove accents
		.replace(/[^a-z0-9\s]/g, "") // Keep only alphanumeric
		.replace(/\s+/g, " ") // Normalize spaces
		.trim() // Remove extra spaces
		.split(" ") // Split into words
		.map((word) => stemWord(word)) // Apply stemming
		.join(" "); // Rejoin words
}

function debounce(func, wait) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		return new Promise((resolve) => {
			timeout = setTimeout(() => resolve(func(...args)), wait);
		});
	};
}

// cache object to store blocks and container
const cache = {
	blocks: null,
	container: null,
	getBlocks() {
		const activeCategory = document.querySelector(SELECTORS.ACTIVE_CATEGORY).id;
		return document.querySelectorAll(`#${activeCategory} ${SELECTORS.BLOC}`);
	},
	getContainer() {
		const activeCategory = document.querySelector(".category.active").id;
		return document.getElementById(activeCategory);
	},
	clearCache() {
		this.blocks = null;
		this.container = null;
	},
};

// Highlight matching text in search results
function highlightMatch(text, query) {
	if (!query) return text;
	const normalizedQuery = normalizeText(query);
	const regex = new RegExp(`(${normalizedQuery})`, "gi");
	return text.replace(regex, "<mark>$1</mark>");
}

// Calculate score for search results (pretty useless for now)
function calculateScore(text, query) {
	const normalizedText = normalizeText(text);
	const normalizedQuery = normalizeText(query);
	const words = normalizedText.split(" ");
	const queryWords = normalizedQuery.split(" ");

	let score = 0;

	queryWords.forEach((queryWord) => {
		// Exact word match (highest priority)
		const exactMatchIndex = words.indexOf(queryWord);
		if (exactMatchIndex !== -1) {
			score += CONSTANTS.SCORE.EXACT_MATCH;
			return;
		}

		// Word boundary match (medium priority)
		if (new RegExp(`\\b${queryWord}\\b`).test(normalizedText)) {
			score += CONSTANTS.SCORE.WORD_BOUNDARY;
			return;
		}

		// Word starts with query (medium-low priority)
		if (words.some((word) => word.startsWith(queryWord))) {
			score += CONSTANTS.SCORE.WORD_START;
			return;
		}

		// Partial word match (low priority)
		if (words.some((word) => word.includes(queryWord))) {
			score += CONSTANTS.SCORE.PARTIAL_MATCH;
		}
	});

	return score;
}

// Sort blocks based on title
function sortBlocks(container) {
	const blocks = Array.from(container.children);
	blocks.sort((a, b) => {
		const titleA = a
			.querySelector("h3")
			.textContent.replace(/(\d+)/, (_, num) => String(num).padStart(10, "0"));
		const titleB = b
			.querySelector("h3")
			.textContent.replace(/(\d+)/, (_, num) => String(num).padStart(10, "0"));
		return titleA.localeCompare(titleB);
	});

	blocks.forEach((block) => {
		container.appendChild(block);
	});
}

// Filter blocks based on search query
function filterBlocks(query) {
	const activeCategory = document.querySelector(".category.active").id;
	const otherCategory = getOtherCategory(activeCategory);

	const blocks = cache.getBlocks();
	const otherBlocks = document.querySelectorAll(`#${otherCategory} .bloc`);
	const container = cache.getContainer();

	blocks.forEach((block) => {
		block.style.display = "none";
	});
	otherBlocks.forEach((block) => {
		block.style.display = "none";
	});

	if (!query) {
		blocks.forEach((block) => {
			block.style.display = "flex";
			block.querySelector("h3").innerHTML =
				block.dataset.originalTitle || block.querySelector("h3").textContent;
			block.querySelector(".description").innerHTML =
				block.dataset.originalDescription ||
				block.querySelector(".description").textContent;
		});
		sortBlocks(container);
		updateSearchSubtext("");
		return;
	}

	const results = {
		active: [],
		other: [],
	};

	blocks.forEach((block) => {
		processBlock(block, query, results.active);
	});
	otherBlocks.forEach((block) => {
		processBlock(block, query, results.other);
	});

	results.active.sort((a, b) => b.score - a.score);
	results.active.forEach(({ block }) => {
		block.style.display = "flex";
		container.appendChild(block);
	});

	// Update subtext
	const subtextMessage =
		results.other.length > 0
			? `Found ${results.other.length} matching result${results.other.length === 1 ? "" : "s"} in ${otherCategory.replace("-", " ")}`
			: "";
	updateSearchSubtext(subtextMessage);
}

// Process individual block
function processBlock(block, query, results) {
	if (!block.dataset.originalTitle) {
		block.dataset.originalTitle = block.querySelector("h3").textContent;
		block.dataset.originalDescription =
			block.querySelector(".description").textContent;
	}

	const title = block.dataset.originalTitle;
	const description = block.dataset.originalDescription;

	const titleScore =
		calculateScore(title, query) * CONSTANTS.SCORE.TITLE_MULTIPLIER;
	const descriptionScore = calculateScore(description, query);
	const totalScore = titleScore + descriptionScore;

	if (totalScore > 0) {
		block.querySelector("h3").innerHTML = highlightMatch(
			block.dataset.originalTitle,
			query,
		);
		block.querySelector(".description").innerHTML = highlightMatch(
			block.dataset.originalDescription,
			query,
		);
		results.push({ block, score: totalScore });
	}
}

// Update search subtext
function updateSearchSubtext(message) {
	let subtext = document.getElementById("searchSubtext");
	if (!subtext) {
		subtext = document.createElement("div");
		subtext.id = "searchSubtext";
		subtext.classList.add("search-subtext");
		document.querySelector(SELECTORS.SEARCH_CONTAINER).appendChild(subtext);
	}
	subtext.textContent = message;

	if (message) {
		subtext.classList.add("visible");
	} else {
		subtext.classList.remove("visible");
	}
}

// Reset blocks display
function resetBlocksDisplay(category) {
	const container = document.getElementById(category);
	const blocks = document.querySelectorAll(`#${category} .bloc`);

	blocks.forEach((block) => {
		block.style.display = "flex";
		if (block.dataset.originalTitle) {
			block.querySelector("h3").innerHTML = block.dataset.originalTitle;
			block.querySelector(".description").innerHTML =
				block.dataset.originalDescription;
		}
	});

	sortBlocks(container);
}

// Debounce search input
const debouncedFilter = debounce(filterBlocks, CONSTANTS.ANIMATION.DEBOUNCE);

// Initialize search functionality
export const initSearch = () => {
	const handleCategoryChange = (event) => {
		cache.clearCache();
		if (searchState.wasCleared || !searchState.currentValue) {
			resetBlocksDisplay(event.detail.category);
			updateSearchSubtext("");
		} else {
			filterBlocks(searchState.currentValue);
			const subtextMessage =
				document.getElementById("searchSubtext").textContent;
			updateSearchSubtext(subtextMessage);
		}
	};

	addSearchFunctionality();
	addSearchButtonEvent();
	document.addEventListener("categoryChange", handleCategoryChange);

	return () => {
		document.removeEventListener("categoryChange", handleCategoryChange);
	};
};
