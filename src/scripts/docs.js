import hljs from "highlight.js";
import MarkdownIt from "markdown-it";
import attrs from "markdown-it-attrs";
import container from "markdown-it-container";
import "highlight.js/styles/github-dark.css";
import { docPages } from "./shared.js";

const ADMONITIONS = {
	note: { title: "Note", icon: "info" },
	tip: { title: "Tip", icon: "lightbulb" },
	important: { title: "Important", icon: "label_important" },
	warning: { title: "Warning", icon: "warning" },
	caution: { title: "Caution", icon: "dangerous" },
};

const md = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	highlight: (str, lang) => {
		if (lang && hljs.getLanguage(lang)) {
			return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
		}
		return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
	},
}).use(attrs);

Object.entries(ADMONITIONS).forEach(([name, config]) => {
	md.use(container, name, {
		render: (tokens, idx) => {
			if (tokens[idx].nesting === 1) {
				const info = tokens[idx].info.trim().slice(name.length).trim();
				const title = md.utils.escapeHtml(info || config.title);
				return `<div class="admonition ${name}"><p class="admonition-title"><span class="material-symbols-rounded">${config.icon}</span> ${title}</p>`;
			}
			return "</div>\n";
		},
	});
});

export async function render(pageName = null) {
	const contentEl = document.getElementById("docsContent");
	if (!contentEl) return;

	const target =
		pageName ||
		new URLSearchParams(location.search).get("page") ||
		docPages[0]?.name;

	const page = docPages.find((p) => p.name === target);

	if (!page) {
		contentEl.innerHTML = "<p>Documentation page not found.</p>";
		return;
	}

	try {
		const res = await fetch(page.url);
		if (!res.ok) throw new Error("Fetch failed");
		const txt = await res.text();

		contentEl.innerHTML = md.render(txt);
		document.title = `${contentEl.querySelector("h1")?.textContent || page.title} — Docs`;

		const newUrl = new URL(window.location);
		newUrl.searchParams.set("page", page.name);
		window.history.pushState({}, "", newUrl);
	} catch (e) {
		console.error(e);
		contentEl.innerHTML = `<p>Unable to load page: ${page.title}</p>`;
	}
}

window.addEventListener("navigate-doc", (e) => {
	if (e.detail?.page) render(e.detail.page);
});

render();
