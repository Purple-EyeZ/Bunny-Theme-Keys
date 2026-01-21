import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const BASE_DIR = "src/images";
const JSON_PATH = "src/data.json";

async function convertImagesToWebp(directory) {
	const entries = fs.readdirSync(directory, { withFileTypes: true });

	const backupDir = path.join(directory, "backup");
	if (!fs.existsSync(backupDir)) {
	}

	for (const entry of entries) {
		const fullPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			if (entry.name !== "backup") {
				await convertImagesToWebp(fullPath);
			}
			continue;
		}

		const ext = path.extname(entry.name).toLowerCase();
		if (ext === ".jpg" || ext === ".png") {
			fs.mkdirSync(backupDir, { recursive: true });

			const outputPath = path.join(
				directory,
				`${path.parse(entry.name).name}.webp`,
			);
			const backupPath = path.join(backupDir, entry.name);

			try {
				await sharp(fullPath).toFile(outputPath);
				console.log(`Converted: ${fullPath} -> ${outputPath}`);

				fs.renameSync(fullPath, backupPath);
				console.log(`Moved: ${fullPath} -> ${backupPath}`);
			} catch (err) {
				console.error(`Error processing ${fullPath}:`, err);
			}
		}
	}
}

function updateJsonFile(filePath) {
	const rawData = fs.readFileSync(filePath, "utf8");
	const data = JSON.parse(rawData);
	let modified = false;

	function updateImagePaths(obj) {
		if (Array.isArray(obj)) {
			for (const item of obj) {
				updateImagePaths(item);
			}
		} else if (typeof obj === "object" && obj !== null) {
			for (const key in obj) {
				if (key === "images" && Array.isArray(obj[key])) {
					const newImages = obj[key].map((img) => {
						const newImg = img.replace(/\.jpg$|\.png$/i, ".webp");
						if (newImg !== img) modified = true;
						return newImg;
					});
					obj[key] = newImages;
				} else {
					updateImagePaths(obj[key]);
				}
			}
		}
	}

	updateImagePaths(data);

	if (modified) {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf8");
		console.log("JSON updated!");
	} else {
		console.log("JSON already up to date.");
	}
}

(async () => {
	console.log("Starting conversion...");
	await convertImagesToWebp(BASE_DIR);
	updateJsonFile(JSON_PATH);
	console.log("Done.");
})();
