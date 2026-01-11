import { activeCategory } from "./main.js";

const ANIMATION_DURATION = 300;
const SWIPE_THRESHOLD = 50;
const SWIPE_DOWN_THRESHOLD = 100;
const TRANSITION_EASE = "transform 0.3s ease";
const DIRECTION = {
	PREV: { transform: "translateX(100vw)", delta: -1 },
	NEXT: { transform: "translateX(-100vw)", delta: 1 },
	CLOSE: { transform: "translateY(100vh)", delta: 0 },
};

let modalImages = [];
let currentImageIndex = 0;
let startX = 0,
	startY = 0,
	currentX = 0,
	currentY = 0;
let isDragging = false;

const getModalElements = () => ({
	modal: document.getElementById("imageModal"),
	image: document.getElementById("modalImage"),
	title: document.getElementById("modalTitle"),
	closeBtn: document.querySelector(".close"),
	prevBtn: document.querySelector(".prev"),
	nextBtn: document.querySelector(".next"),
});

const resetImagePosition = (image, withTransition = true) => {
	image.style.transition = withTransition ? TRANSITION_EASE : "none";
	image.style.transform = "translate(0, 0)";
};

// Initialization
export const initModal = () => {
	const { modal, prevBtn, nextBtn } = getModalElements();
	if (!modal) return;

	modal.addEventListener("touchstart", handleTouchStart, { passive: true });
	modal.addEventListener("touchmove", handleTouchMove, { passive: true });
	modal.addEventListener("touchend", handleTouchEnd);
	modal.addEventListener("click", handleModalClick);

	prevBtn?.addEventListener("click", showPrevImage);
	nextBtn?.addEventListener("click", showNextImage);

	updateModalImages();
};

// Event handlers
function handleModalClick(e) {
	const { image: modalImage, prevBtn, nextBtn, title } = getModalElements();
	const exemptElements = [modalImage, prevBtn, nextBtn, title];

	if (!exemptElements.includes(e.target)) {
		closeModal();
	}
}

// Open the modal with the clicked image
export function openModal(clickedImg) {
	const { modal, image: modalImage, title: modalTitle } = getModalElements();

	resetImagePosition(modalImage, false);

	modalImage.src = clickedImg.dataset.src || clickedImg.src;
	const blockElement = clickedImg.closest(".bloc");
	if (blockElement) {
		const titleElement = blockElement.querySelector("h3");
		modalTitle.textContent = titleElement ? titleElement.textContent : "";
	}

	updateModalImages();
	currentImageIndex = modalImages.indexOf(
		clickedImg.dataset.src || clickedImg.src,
	);

	document.body.classList.add("modal-open");
	modal.style.display = "flex";
}

// Function to close the modal
function closeModal() {
	const { modal, image: modalImage } = getModalElements();

	modalImage.style.transition = TRANSITION_EASE;
	modalImage.style.transform = DIRECTION.CLOSE.transform;

	setTimeout(() => {
		document.body.classList.remove("modal-open");
		modal.style.display = "none";
		resetImagePosition(modalImage, false);

		currentX = 0;
		currentY = 0;
		isDragging = false;
	}, ANIMATION_DURATION - 50);
}

// Touch event handlers
function handleTouchStart(event) {
	const { image: modalImage } = getModalElements();
	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;
	isDragging = true;
	modalImage.style.transition = "none";
}

function handleTouchMove(event) {
	if (!isDragging) return;

	const { image: modalImage } = getModalElements();
	const deltaX = event.touches[0].clientX - startX;
	const deltaY = event.touches[0].clientY - startY;

	const isVerticalMovement = Math.abs(deltaY) > Math.abs(deltaX);
	currentX = isVerticalMovement ? 0 : deltaX;
	currentY = isVerticalMovement ? Math.max(0, deltaY) : 0;

	modalImage.style.transform = `translate(${currentX}px, ${currentY}px)`;
}

function handleTouchEnd() {
	isDragging = false;

	const { image: modalImage } = getModalElements();
	const deltaX = currentX;
	const deltaY = currentY;

	if (Math.abs(deltaY) > Math.abs(deltaX)) {
		if (deltaY > SWIPE_DOWN_THRESHOLD) {
			closeModal();
		} else {
			resetImagePosition(modalImage);
		}
	} else {
		if (deltaX > SWIPE_THRESHOLD) {
			showPrevImage();
		} else if (deltaX < -SWIPE_THRESHOLD) {
			showNextImage();
		} else {
			resetImagePosition(modalImage);
		}
	}
}

// Change the image in the modal
function changeImage(direction) {
	if (modalImages.length === 0) return;

	const { image: modalImage } = getModalElements();
	modalImage.style.transition = TRANSITION_EASE;
	modalImage.style.transform = direction.transform;

	setTimeout(() => {
		currentImageIndex =
			(currentImageIndex + direction.delta + modalImages.length) %
			modalImages.length;
		loadCurrentImage();
		updateModalTitle();
		isDragging = false;
		currentX = currentY = 0;
	}, ANIMATION_DURATION);

	preloadAdjacentImages(currentImageIndex);
}

const showPrevImage = () => changeImage(DIRECTION.PREV);
const showNextImage = () => changeImage(DIRECTION.NEXT);

// Update the title in the modal
function updateModalTitle() {
	const { title: modalTitle } = getModalElements();
	const currentImgSrc = modalImages[currentImageIndex];
	const blockElement = Array.from(document.querySelectorAll(".bloc")).find(
		(block) => {
			return Array.from(block.querySelectorAll(".media img")).some(
				(img) => img.dataset.src === currentImgSrc || img.src === currentImgSrc,
			);
		},
	);

	if (blockElement) {
		const titleElement = blockElement.querySelector("h3");
		modalTitle.textContent = titleElement ? titleElement.textContent : "";
	}
}

// Update the list of images for modal navigation
function updateModalImages() {
	modalImages = Array.from(
		document.querySelectorAll(`#${activeCategory} .media img`),
	).map((img) => img.dataset.src || img.src);
}

// Load the current image in the modal
function loadCurrentImage() {
	const { image: modalImage } = getModalElements();
	modalImage.src = modalImages[currentImageIndex];
	resetImagePosition(modalImage, false);
	// setTimeout may help prevent flickering, cuz the next image may load too late (alternatively animate the transition later)
	// but it looks good without it now, so shrug
	// setTimeout(() => resetImagePosition(modalImage, false), 3);
}

// Preload previous and next images
function preloadAdjacentImages(index) {
	if (modalImages.length > 0) {
		const prevIndex = (index - 1 + modalImages.length) % modalImages.length;
		const nextIndex = (index + 1) % modalImages.length;

		preloadImage(modalImages[prevIndex]);
		preloadImage(modalImages[nextIndex]);
	}
}

// Preload a single image
function preloadImage(src) {
	const img = new Image();
	img.src = src;
}
