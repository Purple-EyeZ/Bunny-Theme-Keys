import { initMainPage } from "./main.js";
import { isFixedSearchFocused } from "./search.js";

const docFiles = import.meta.glob("/Docs/*.md", {
	eager: true,
	query: "?url",
	import: "default",
});

// --- Exports ---
export const docPages = Object.entries(docFiles)
	.sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
	.map(([path, url]) => {
		const filename = path.match(/\/Docs\/(.+?)\.md$/)[1];
		const title = filename
			.replace(/^\d+-/, "")
			.replace(/-/g, " ")
			.replace(/\b\w/g, (l) => l.toUpperCase());
		return { name: filename, title, url };
	});

export function showToast(message) {
	const toast = document.getElementById("toast");
	if (!toast) return;
	toast.innerHTML = message;
	toast.classList.add("show");
	setTimeout(() => toast.classList.remove("show"), 2000);
}

// --- Internal UI Logic ---

/**
 * Init sidebar navigation and docs menu
 */
function initSidebar() {
	const sidebar = document.getElementById("appSidebar");
	if (!sidebar) return;

	const els = {
		menuBtn: document.getElementById("menuButton"),
		closeBtn: document.getElementById("sidebarClose"),
		overlay: document.getElementById("sidebarOverlay"),
		docsToggle: document.getElementById("docsMenuToggle"),
		docsSubmenu: document.getElementById("docsSubmenu"),
	};

	if (els.docsSubmenu && docPages.length) {
		els.docsSubmenu.innerHTML = docPages
			.map(
				(p) =>
					`<li><a href="/Docs/?page=${p.name}" data-doc-link="${p.name}">${p.title}</a></li>`,
			)
			.join("");
	}

	const setActiveDoc = (pageName) => {
		els.docsSubmenu?.querySelectorAll("a[data-doc-link]")?.forEach((a) => {
			const isActive = a.dataset.docLink === pageName;
			a.classList.toggle("active", isActive);
			isActive
				? a.setAttribute("aria-current", "page")
				: a.removeAttribute("aria-current");
		});
	};

	if (location.pathname.includes("/Docs/")) {
		const initialDoc =
			new URLSearchParams(location.search).get("page") || docPages[0]?.name;
		setActiveDoc(initialDoc);
	} else {
		setActiveDoc(null);
	}

	const toggleSidebar = (show) => {
		sidebar.classList.toggle("open", show);
		els.overlay?.classList.toggle("active", show);
		document.body.style.overflow = show ? "hidden" : "";
	};

	els.menuBtn?.addEventListener("click", (e) => {
		e.stopPropagation();
		toggleSidebar(true);
	});
	els.closeBtn?.addEventListener("click", () => toggleSidebar(false));
	els.overlay?.addEventListener("click", () => toggleSidebar(false));

	els.docsSubmenu?.addEventListener("click", (e) => {
		const link = e.target.closest("a[data-doc-link]");
		if (link && window.location.pathname.includes("/Docs/")) {
			e.preventDefault();
			window.dispatchEvent(
				new CustomEvent("navigate-doc", {
					detail: { page: link.dataset.docLink },
				}),
			);
			setActiveDoc(link.dataset.docLink);
			if (window.innerWidth < 1024) toggleSidebar(false);
		}
	});

	const toggleDocs = (forceOpen = false) => {
		const isOpen = els.docsSubmenu.classList.contains("open");
		const shouldOpen = forceOpen || !isOpen;
		els.docsSubmenu.classList.toggle("open", shouldOpen);
		els.docsToggle.classList.toggle("expanded", shouldOpen);
	};

	els.docsToggle?.addEventListener("click", () => toggleDocs());

	if (
		location.pathname.includes("/Docs/") ||
		location.search.includes("page=")
	) {
		toggleDocs(true);
	}
}

/**
 * Init scroll-related features (fixed banner, back-to-top button)
 */
function initScrollFeatures() {
	const fixedBanner = document.querySelector(".fixed-banner");
	const backToTopBtn = document.getElementById("backToTopButton");
	let lastScrollY = window.scrollY;

	const handleScroll = () => {
		const scrollY = window.scrollY;
		const scrollingDown = scrollY > lastScrollY;
		lastScrollY = scrollY;

		if (backToTopBtn) {
			backToTopBtn.style.display = scrollY > 400 ? "block" : "none";
		}

		if (!fixedBanner) return;

		if (scrollY > 15 && !fixedBanner.classList.contains("show")) {
			fixedBanner.classList.remove("hide");
			fixedBanner.classList.add("show");
		} else if (
			scrollY <= 15 &&
			fixedBanner.classList.contains("show") &&
			!isFixedSearchFocused() &&
			!scrollingDown
		) {
			fixedBanner.classList.remove("show");
			fixedBanner.classList.add("hide");
		}
	};

	window.addEventListener("scroll", handleScroll);
	backToTopBtn?.addEventListener("click", () =>
		window.scrollTo({ top: 0, behavior: "smooth" }),
	);
	handleScroll();
}

/**
 * Init fluid background toggle
 */
function initFluidToggle() {
	const btn = document.getElementById("fluidToggleButton");
	const canvas = document.querySelector("canvas");
	if (!btn || !canvas) return;

	const isEnabled = localStorage.getItem("fluidEnabled") === "true";

	const setFluid = (active) => {
		canvas.style.display = active ? "block" : "none";
		btn.classList.toggle("active", active);
		document.body.classList.toggle("fluid-enabled", active);
	};

	setFluid(isEnabled);

	btn.addEventListener("click", () => {
		const newState = canvas.style.display === "none";
		localStorage.setItem("fluidEnabled", newState);
		setFluid(newState);
		if (newState) window.location.reload();
	});
}

// --- Initialization ---
window.onload = () => {
	initScrollFeatures();
	initSidebar();
	initFluidToggle();

	document.getElementById("whatsthat")?.addEventListener("click", (e) => {
		e.preventDefault();
		window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
	});

	if (
		["/", "/index.html", "/Bunny-Theme-Keys/"].includes(
			window.location.pathname,
		)
	) {
		initMainPage();
	}
};
