import { initModal, openModal } from "./modal.js";
import { initSearch } from "./search.js";

const BLOCK_HEIGHT_LIMIT = 400;
const IMAGE_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "webp"];
const VIDEO_EXTENSIONS = ["mp4", "webm"];
const OBSERVER_OPTIONS = { rootMargin: "400px 0px" };

const getFileExtension = (url) => url.split(".").pop().toLowerCase();
const isImage = (url) => IMAGE_EXTENSIONS.includes(getFileExtension(url));
const isVideo = (url) => VIDEO_EXTENSIONS.includes(getFileExtension(url));

export let activeCategory = "semantic-colors"; // Default category

// Init
export function initMainPage() {
	initModal();
	initSearch();
	initCategoryButtons();
	fetchData();
}

// Function to show category
function showCategory(categoryId) {
	const categories = document.querySelectorAll(".category");
	const buttons = document.querySelectorAll(".category-button");

	categories.forEach((category) => {
		category.classList.remove("active");
	});

	document.getElementById(categoryId).classList.add("active");

	buttons.forEach((button) => {
		button.classList.remove("active");
		if (button.dataset.category === categoryId) {
			button.classList.add("active");
		}
	});

	document.dispatchEvent(
		new CustomEvent("categoryChange", {
			detail: { category: categoryId },
		}),
	);

	activeCategory = categoryId;
}

// Function to initialize category buttons
function initCategoryButtons() {
	showCategory(activeCategory);

	const buttons = document.querySelectorAll(".category-button");
	buttons.forEach((button) => {
		button.addEventListener("click", () => {
			showCategory(button.dataset.category);
		});
	});
}

// Function to fetch JSON data
async function fetchData() {
	try {
		const response = await fetch("data.json", { cache: "default" });
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		renderBlocks(data.semanticColors, "semantic-colors");
		renderBlocks(data.rawColors, "raw-colors");
	} catch (error) {
		console.error("Error while loading JSON data:", error);
	}
}

// Function to check if content overflows
function checkContentOverflow(blockElement) {
	const mediaContainer = blockElement.querySelector(".media");
	const descriptionElement = blockElement.querySelector(".description");
	const titleElement = blockElement.querySelector("h3");
	const idElement = blockElement.querySelector(".id");

	function updateOverflowStatus() {
		const hasOverflow = blockElement.scrollHeight > BLOCK_HEIGHT_LIMIT;
		blockElement.classList.toggle("has-hidden-content", hasOverflow);
	}

	updateOverflowStatus();

	const resizeObserver = new ResizeObserver(updateOverflowStatus);
	resizeObserver.observe(mediaContainer);
	resizeObserver.observe(descriptionElement);
	resizeObserver.observe(titleElement);
	resizeObserver.observe(idElement);
}

// Function to render blocks
function renderBlocks(blocks, containerId) {
	const container = document.getElementById(containerId);
	if (!container) {
		console.warn(
			`Container with id "${containerId}" not found. Skipping rendering.`,
		);
		return;
	}

	container.innerHTML = "";

	const sortedBlocks = [...blocks].sort((a, b) => {
		const titleA = a.title.replace(/(\d+)/, (_, num) =>
			String(num).padStart(10, "0"),
		);
		const titleB = b.title.replace(/(\d+)/, (_, num) =>
			String(num).padStart(10, "0"),
		);
		return titleA.localeCompare(titleB);
	});

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const media = entry.target;
				media.src = media.dataset.src;
				if (media.tagName === "VIDEO") media.load();
				observer.unobserve(media);
			}
		});
	}, OBSERVER_OPTIONS);

	sortedBlocks.forEach((block) => {
		const blockElement = createBlockElement(block, observer);
		container.appendChild(blockElement);
		checkContentOverflow(blockElement);
	});
}

// Function to create a block element
function createBlockElement(block, observer) {
	const blockElement = document.createElement("div");
	blockElement.classList.add("bloc");
	blockElement.dataset.title = block.title.toLowerCase();
	blockElement.dataset.description = block.description.toLowerCase();

	// Create and append the Title element
	const titleElement = document.createElement("h3");
	titleElement.textContent = block.title;
	blockElement.appendChild(titleElement);

	// Create and append the Description element
	const descriptionElement = document.createElement("p");
	descriptionElement.classList.add("description");
	descriptionElement.textContent = block.description;
	blockElement.appendChild(descriptionElement);

	// Create and append the Images/Videos container
	const mediaContainer = document.createElement("div");
	mediaContainer.classList.add("media");
	block.images.forEach((mediaUrl) => {
		if (isImage(mediaUrl)) {
			const imgElement = document.createElement("img");
			imgElement.dataset.src = mediaUrl;
			imgElement.alt = block.title;
			imgElement.loading = "lazy";
			mediaContainer.appendChild(imgElement);
			observer.observe(imgElement);
		} else if (isVideo(mediaUrl)) {
			const videoElement = document.createElement("video");
			videoElement.dataset.src = mediaUrl;
			videoElement.controls = true;
			videoElement.preload = "none";
			videoElement.setAttribute("playsinline", "true");
			mediaContainer.appendChild(videoElement);
			observer.observe(videoElement);
		}
	});
	blockElement.appendChild(mediaContainer);

	// Create and append the ID element
	const idElement = document.createElement("p");
	idElement.classList.add("id");
	idElement.textContent = `ID: ${block.id}`;
	blockElement.appendChild(idElement);

	// Create and append bottom banner
	const bottomBanner = document.createElement("div");
	bottomBanner.classList.add("bottom-banner");
	blockElement.appendChild(bottomBanner);

	// Add an expand/collapse button
	const toggleButton = document.createElement("button");
	toggleButton.classList.add("toggle-button");
	const arrowIcon = document.createElement("span");
	arrowIcon.classList.add("material-symbols-rounded");
	arrowIcon.textContent = "keyboard_arrow_down";
	toggleButton.appendChild(arrowIcon);
	toggleButton.appendChild(document.createTextNode(" More"));
	toggleButton.onclick = () => toggleBlock(blockElement, toggleButton);
	blockElement.appendChild(toggleButton);

	return blockElement;
}

// Function to update button content
function updateButtonContent(button, isExpanded) {
	button.innerHTML = `
        <span class="material-symbols-rounded">
            ${isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
        </span>
        ${isExpanded ? " Less" : " More"}`;
}

// Function to toggle block's expanded state
function toggleBlock(blockElement, button) {
	const isExpanded = blockElement.classList.contains("expanded");

	blockElement.classList.toggle("expanded");

	if (isExpanded) {
		checkContentOverflow(blockElement);
	} else {
		blockElement.classList.remove("has-hidden-content");
	}

	updateButtonContent(button, blockElement.classList.contains("expanded"));
}

// Add click events to images
document.addEventListener("click", (e) => {
	if (e.target.matches(".media img")) {
		openModal(e.target);
	}
});
