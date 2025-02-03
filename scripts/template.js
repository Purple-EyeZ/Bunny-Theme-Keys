// Template preview
function showPreview(fileName) {
    const previewContainer = document.getElementById("previewContainer");
    const jsonPreview = document.getElementById("jsonPreview");

    // Templates URL
    const fileUrl = `https://raw.githubusercontent.com/Purple-EyeZ/Bunny-Theme-Keys/refs/heads/main/templates/${fileName}`;

    // Fetch and display json content
    fetch(fileUrl)
        .then(response => response.json())
        .then(data => {
            jsonPreview.textContent = JSON.stringify(data, null, 2);
            previewContainer.style.display = "block";
            previewContainer.scrollIntoView({ behavior: "smooth" });
        })
        .catch(error => {
            console.error("Error loading JSON file:", error);
            jsonPreview.textContent = "Failed to load preview.";
            previewContainer.style.display = "block";
            previewContainer.scrollIntoView({ behavior: "smooth" });
        });

    const downloadLink = document.getElementById("downloadLink");
    downloadLink.onclick = () => downloadTemplate(fileName);
}

// Download button
function downloadTemplate(fileName) {
    const fileUrl = `https://raw.githubusercontent.com/Purple-EyeZ/Bunny-Theme-Keys/refs/heads/main/templates/${fileName}`;

    fetch(fileUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to download JSON file: ${response.status} - ${response.statusText}`);
            }
            return response.blob();
        })
        .then(blob => {
            const tempLink = document.createElement('a');
            tempLink.href = URL.createObjectURL(blob);
            tempLink.download = fileName;

            document.body.appendChild(tempLink);
            tempLink.click();

            document.body.removeChild(tempLink);
            URL.revokeObjectURL(tempLink.href);
        })
        .catch(error => {
            console.error("Error downloading JSON file:", error);
            alert("Failed to download JSON file. Please check the URL or try again later.");
        });
}

// Close preview
function closePreview() {
    document.getElementById("previewContainer").style.display = "none";
}