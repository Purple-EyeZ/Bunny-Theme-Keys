import { initMainPage } from "./main.js";
import { isFixedSearchFocused } from "./search.js";

let previousScrollY = window.scrollY;
const fixedBanner = document.querySelector(".fixed-banner");
const backToTopButton = document.getElementById("backToTopButton");
const menuButton = document.getElementById("menuButton");
const dropdownMenu = document.getElementById("dropdownMenu");

// Control display of banner
function handleScroll() {
	const scrollThreshold = 15; // px scrolled before showing the banner
	const scrollY = window.scrollY;
	const scrollingDown = scrollY > previousScrollY;
	previousScrollY = scrollY;

	const shouldShowBanner =
		scrollY > scrollThreshold && !fixedBanner.classList.contains("show");
	const shouldHideBanner =
		scrollY <= scrollThreshold &&
		fixedBanner.classList.contains("show") &&
		!isFixedSearchFocused() &&
		!scrollingDown;

	if (shouldShowBanner) {
		fixedBanner.classList.add("show");
		fixedBanner.classList.remove("hide");
	} else if (shouldHideBanner) {
		fixedBanner.classList.add("hide");
		fixedBanner.classList.remove("show");
	}
}

// Back to Top button
window.onscroll = () => {
	const scrolled = document.documentElement.scrollTop > 400;
	backToTopButton.style.display = scrolled ? "block" : "none";
};

backToTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
});

// Dropdown Menu
document.addEventListener("DOMContentLoaded", () => {
	menuButton.addEventListener("click", () => {
		dropdownMenu.classList.toggle("visible");
	});

	// Hide menu if user clicks outside it
	window.addEventListener("click", (event) => {
		if (
			event.target !== menuButton &&
			!menuButton.contains(event.target) &&
			!dropdownMenu.contains(event.target)
		) {
			dropdownMenu.classList.remove("visible");
		}
	});
});

// Toast message
export function showToast(message) {
	const toast = document.getElementById("toast");
	toast.innerHTML = message;
	toast.classList.add("show");
	setTimeout(() => toast.classList.remove("show"), 2000); // 2 seconds
}

// Fluid effect toggle
function initFluidToggle() {
	const fluidToggleButton = document.getElementById("fluidToggleButton");
	const canvas = document.querySelector("canvas");

	const isFluidEnabled = localStorage.getItem("fluidEnabled") === "true";

	if (canvas) {
		canvas.style.display = isFluidEnabled ? "block" : "none";
		if (isFluidEnabled) {
			fluidToggleButton.classList.add("active");
			document.body.classList.add("fluid-enabled");
		}
	}

	fluidToggleButton?.addEventListener("click", () => {
		const newState = canvas.style.display === "none";
		canvas.style.display = newState ? "block" : "none";
		localStorage.setItem("fluidEnabled", newState);
		fluidToggleButton.classList.toggle("active");
		document.body.classList.toggle("fluid-enabled");

		if (newState) {
			window.location.reload();
		}
	});
}

// Init
function initScrollHandling() {
	handleScroll();
	window.addEventListener("scroll", handleScroll);
}

window.onload = () => {
	initScrollHandling();
	initFluidToggle();

	if (
		["/", "/index.html", "/Bunny-Theme-Keys/"].includes(
			window.location.pathname,
		)
	) {
		initMainPage();
	}
};

document.addEventListener("DOMContentLoaded", () => {
	const whatsthat = document.getElementById("whatsthat");
	if (whatsthat) {
		whatsthat.addEventListener("click", (event) => {
			event.preventDefault();
			window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
		});
	}
});
