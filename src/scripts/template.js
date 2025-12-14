const elements = {
    previewContainer: document.getElementById("previewContainer"),
    previewOverlay: document.getElementById("previewOverlay"),
    jsonPreview: document.getElementById("jsonPreview"),
    downloadLink: document.getElementById("downloadLink")
};

const BASE_URL = 'https://raw.githubusercontent.com/Purple-EyeZ/Bunny-Theme-Keys/refs/heads/main/src/Templates/';

// Fetch template file
async function fetchTemplate(fileName) {
    try {
        const response = await fetch(`${BASE_URL}${fileName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch template: ${response.status} - ${response.statusText}`);
        }
        return response;
    } catch (error) {
        console.error('Network error:', error);
        throw new Error('Failed to fetch template. Please check your internet connection.');
    }
}

// Template preview
async function showPreview(fileName) {
    const { previewContainer, previewOverlay, jsonPreview, downloadLink } = elements;

    try {
        jsonPreview.textContent = 'Loading...';
        document.body.classList.add('modal-open');
        previewOverlay.classList.add('visible');
        previewContainer.classList.add('visible');

        const response = await fetchTemplate(fileName);
        const data = await response.json();

        requestAnimationFrame(() => {
            jsonPreview.textContent = JSON.stringify(data, null, 2);
        });

        downloadLink.onclick = () => downloadTemplate(fileName);
    } catch (error) {
        console.error("Error loading preview:", error);
        jsonPreview.textContent = "Failed to load preview. Please try again.";
    }
}

// Download button
async function downloadTemplate(fileName) {
    try {
        const response = await fetchTemplate(fileName);
        const blob = await response.blob();

        const tempLink = document.createElement('a');
        tempLink.href = URL.createObjectURL(blob);
        tempLink.download = fileName;

        const oldLink = document.querySelector('.temp-download-link');
        if (oldLink) document.body.removeChild(oldLink);

        tempLink.classList.add('temp-download-link');
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();

        // Cleanup
        setTimeout(() => {
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(tempLink.href);
        }, 100);
    } catch (error) {
        console.error("Error downloading template:", error);
        alert("Failed to download template. Please try again later.");
    }
}

// Close preview
function closePreview() {
    const { previewContainer, previewOverlay } = elements;

    document.body.classList.remove('modal-open');

    previewContainer.classList.remove('visible');
    previewOverlay.classList.remove('visible');

    setTimeout(() => {
        document.getElementById("jsonPreview").textContent = '';
    }, 300);
}

// Close preview on overlay click
document.addEventListener('DOMContentLoaded', () => {
    const { previewOverlay } = elements;
    previewOverlay?.addEventListener('click', (e) => {
        if (e.target === previewOverlay) {
            closePreview();
        }
    });
});

window.showPreview = showPreview;
window.downloadTemplate = downloadTemplate;
window.closePreview = closePreview;