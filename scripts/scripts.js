// Function to fetch JSON data
async function fetchData() {
    try {
        const response = await fetch('data.json', { cache: "default" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        renderBlocks(data.semanticColors, 'semantic-colors');
        renderBlocks(data.rawColors, 'raw-colors');
        addSearchFunctionality();
        addImageClickEvents();
    } catch (error) {
        console.error("Error while loading JSON data:", error);
    }
}

// Function to check if content is hidden
function checkContentOverflow(blockElement) {
    const mediaContainer = blockElement.querySelector('.media');
    const descriptionElement = blockElement.querySelector('.description');
    const titleElement = blockElement.querySelector('.bloc h3');
    const idElement = blockElement.querySelector('.id');

    // Overflow check function
    function updateOverflowStatus() {
        // Checks if mediaContainer exists before accessing its properties
        const mediaHeight = mediaContainer ? mediaContainer.scrollHeight : 0;
        const descriptionHeight = descriptionElement ? descriptionElement.scrollHeight : 0;
        const titleHeight = titleElement ? titleElement.scrollHeight : 0;
        const idHeight = idElement ? idElement.scrollHeight : 0;

        const totalContentHeight = mediaHeight + descriptionHeight + titleHeight + idHeight;

        // Check if the block content is overflowing
        const isOverflowing = totalContentHeight > 390; // Fixed size here

        if (isOverflowing) {
            blockElement.classList.add('has-hidden-content');
        } else {
            blockElement.classList.remove('has-hidden-content');
        }
    }

    // Initial check
    updateOverflowStatus();

    // Using ResizeObserver to observe size changes
    const resizeObserver = new ResizeObserver(() => updateOverflowStatus());
    resizeObserver.observe(mediaContainer);
    resizeObserver.observe(descriptionElement);
    resizeObserver.observe(titleElement);
    resizeObserver.observe(idElement);
}

// Create blocks
function renderBlocks(blocks, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.warn(`Container with id "${containerId}" not found. Skipping rendering.`);
        return;
    }

    container.innerHTML = ''; // Clear container before rendering

    // Sort blocks by title in alphabetical order, handling numeric values correctly
    blocks.sort((a, b) => {
        const titleA = a.title.replace(/(\d+)/, (_, num) => String(num).padStart(10, '0'));
        const titleB = b.title.replace(/(\d+)/, (_, num) => String(num).padStart(10, '0'));
        return titleA.localeCompare(titleB);
    });

    // Create an IntersectionObserver with rootMargin to load images/videos earlier
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mediaElement = entry.target;
                if (mediaElement.tagName === 'IMG') {
                    mediaElement.src = mediaElement.dataset.src;
                } else if (mediaElement.tagName === 'VIDEO') {
                    mediaElement.src = mediaElement.dataset.src;
                    mediaElement.load();
                }
                observer.unobserve(mediaElement);
            }
        });
    }, {
        rootMargin: '400px 0px' // Load media when they are 400px from the viewport
    });

    blocks.forEach((block) => {
        const blockElement = document.createElement('div');
        blockElement.classList.add('bloc');
        blockElement.dataset.title = block.title.toLowerCase();
        blockElement.dataset.description = block.description.toLowerCase();

        // Create and append the Title element
        const titleElement = document.createElement('h3');
        titleElement.textContent = block.title;
        blockElement.appendChild(titleElement);

        // Create and append the Description element
        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('description');
        descriptionElement.textContent = block.description;
        blockElement.appendChild(descriptionElement);

        // Create and append the Images/Videos container
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('media');
        block.images.forEach((mediaUrl) => {
            const fileExtension = mediaUrl.split('.').pop().toLowerCase();

            if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                // Handle image
                const imgElement = document.createElement('img');
                imgElement.dataset.src = mediaUrl;
                imgElement.alt = block.title;
                imgElement.loading = 'lazy'; // Lazy loading
                mediaContainer.appendChild(imgElement);
                observer.observe(imgElement);

            } else if (['mp4', 'webm'].includes(fileExtension)) {
                // Handle video
                const videoElement = document.createElement('video');
                videoElement.dataset.src = mediaUrl;
                videoElement.controls = true;
                videoElement.preload = 'none';
                videoElement.setAttribute('playsinline', 'true');
                mediaContainer.appendChild(videoElement);
                observer.observe(videoElement);
            }
        });
        blockElement.appendChild(mediaContainer);

        // Create and append the ID element
        const idElement = document.createElement('p');
        idElement.classList.add('id');
        idElement.textContent = `ID: ${block.id}`;
        blockElement.appendChild(idElement);

        // Create and append bottom banner
        const bottomBanner = document.createElement('div');
        bottomBanner.classList.add('bottom-banner');
        blockElement.appendChild(bottomBanner);

        // Add an expand/collapse button
        const toggleButton = document.createElement('button');
        toggleButton.classList.add('toggle-button');

        const arrowIcon = document.createElement('span');
        arrowIcon.classList.add('material-symbols-rounded');
        arrowIcon.textContent = 'keyboard_arrow_down';

        toggleButton.appendChild(arrowIcon);
        toggleButton.appendChild(document.createTextNode(' More'));

        toggleButton.onclick = function () {
            toggleBlock(blockElement, toggleButton);
        };
        blockElement.appendChild(toggleButton);

        container.appendChild(blockElement);

        // Check if the content is initially hidden
        checkContentOverflow(blockElement);
    });
}

// Function to toggle block's expanded state
function toggleBlock(blockElement, button) {
    const isExpanded = blockElement.classList.contains('expanded');

    // Change the expanded state
    blockElement.classList.toggle('expanded');

    if (isExpanded) {
        // Check overflow status
        checkContentOverflow(blockElement);
    } else {
        // The block is now extended, remove the overflow status
        blockElement.classList.remove('has-hidden-content');
    }

    // Update button content according to state
    button.innerHTML = ''; // Clear existing content

    const icon = document.createElement('span');
    icon.classList.add('material-symbols-rounded');
    icon.textContent = blockElement.classList.contains('expanded') ? 'keyboard_arrow_up' : 'keyboard_arrow_down';

    button.appendChild(icon);
    button.appendChild(document.createTextNode(blockElement.classList.contains('expanded') ? ' Less' : ' More'));
}

let isFixedSearchFocused = false;
let previousScrollY = window.scrollY || window.pageYOffset;

// Detects whether the user has clicked on the fixed search bar
const fixedSearchBar = document.getElementById('fixedSearchBar');
if (fixedSearchBar) {
    fixedSearchBar.addEventListener('focus', () => {
        isFixedSearchFocused = true;
    });

    fixedSearchBar.addEventListener('blur', () => {
        isFixedSearchFocused = false;
    });
}

// Function to control display of fixed banner during scrolling
function handleScroll() {
    const fixedBanner = document.querySelector('.fixed-banner');
    const scrollThreshold = 100; // Fixed value
    const scrollY = window.scrollY || window.pageYOffset;

    // Check if the user is scrolling up or down
    const scrollingDown = scrollY > previousScrollY;
    previousScrollY = scrollY;

    if (scrollY > scrollThreshold && !fixedBanner.classList.contains('show')) {
        fixedBanner.style.display = 'flex';
        setTimeout(() => {
            fixedBanner.classList.add('show');
            fixedBanner.classList.remove('hide');
        }, 10);
    } else if (
        scrollY <= scrollThreshold &&
        fixedBanner.classList.contains('show') &&
        !isFixedSearchFocused &&
        !scrollingDown
    ) {
        fixedBanner.classList.add('hide');
        setTimeout(() => {
            fixedBanner.classList.remove('show');
            fixedBanner.style.display = 'none';
        }, 300); // Delay to match CSS animation duration
    }
}

// Function to filter blocks based on search query
function filterBlocks(query) {
    const allBlocks = document.querySelectorAll('.bloc');
    allBlocks.forEach(block => {
        const title = block.dataset.title;
        const description = block.dataset.description;
        if (title.includes(query) || description.includes(query)) {
            block.style.display = 'flex';
        } else {
            block.style.display = 'none';
        }
    });
}

// Function to add click events to images
function addImageClickEvents() {
    const images = document.querySelectorAll('.media img');
    images.forEach(img => {
        img.addEventListener('click', function () {
            openModal(this);
        });
    });
}

// Function to open the modal with the clicked image
function openModal(clickedImg) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');

    // Set the src for the modal image
    modalImage.src = clickedImg.dataset.src || clickedImg.src;

    // Set the title for the modal
    const blockElement = clickedImg.closest('.bloc');
    if (blockElement) {
        const titleElement = blockElement.querySelector('h3'); // Title= h3
        modalTitle.textContent = titleElement ? titleElement.textContent : '';
    }

    // Update the index and modal images
    updateModalImages();
    currentImageIndex = modalImages.indexOf(clickedImg.dataset.src || clickedImg.src);

    // Update title
    updateModalTitle();

    // Preload the current and adjacent images
    preloadAdjacentImages(currentImageIndex);

    // Show the modal
    modal.style.display = 'flex';

    // Add event listener to close modal when clicking outside the image
    modal.addEventListener('click', closeModalOutsideImage, true);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';

    // Remove the event listener to prevent multiple bindings
    modal.removeEventListener('click', closeModalOutsideImage, true);
}

// Function to close the modal when clicking outside the image
function closeModalOutsideImage(event) {
    const modalImage = document.getElementById('modalImage');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');

    // Close the modal if the click is outside the image and not on the navigation buttons
    if (event.target !== modalImage && event.target !== prevButton && event.target !== nextButton) {
        closeModal();
    }
}

// Function to navigate to the previous image
function showPrevImage() {
    if (modalImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
        loadCurrentImage();
        preloadAdjacentImages(currentImageIndex);
        updateModalTitle();
    }
}

// Function to navigate to the next image
function showNextImage() {
    if (modalImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % modalImages.length;
        loadCurrentImage();
        preloadAdjacentImages(currentImageIndex);
        updateModalTitle();
    }
}

// Function to update the title in the modal
function updateModalTitle() {
    const modalTitle = document.getElementById('modalTitle');
    const currentImgSrc = modalImages[currentImageIndex];
    const blockElement = Array.from(document.querySelectorAll('.bloc')).find(block => {
        return Array.from(block.querySelectorAll('.media img')).some(img => img.dataset.src === currentImgSrc || img.src === currentImgSrc);
    });

    if (blockElement) {
        const titleElement = blockElement.querySelector('h3');
        modalTitle.textContent = titleElement ? titleElement.textContent : '';
    }
}

// Function to update the list of images for modal navigation
function updateModalImages() {
    if (activeCategory) {
        modalImages = Array.from(document.querySelectorAll(`#${activeCategory} .media img`)).map(img => img.dataset.src || img.src);
    } else {
        modalImages = [];
    }
}

// Function to load the current image in the modal
function loadCurrentImage() {
    const modalImage = document.getElementById('modalImage');
    modalImage.src = modalImages[currentImageIndex];
}

// Function to preload adjacent images (previous and next)
function preloadAdjacentImages(index) {
    if (modalImages.length > 0) {
        const prevIndex = (index - 1 + modalImages.length) % modalImages.length;
        const nextIndex = (index + 1) % modalImages.length;

        preloadImage(modalImages[prevIndex]);
        preloadImage(modalImages[nextIndex]);
    }
}

// Function to preload a single image
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Add event listeners for modal controls
const closeButton = document.querySelector('.close');
if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

const prevButton = document.querySelector('.prev');
if (prevButton) {
    prevButton.addEventListener('click', showPrevImage);
}

const nextButton = document.querySelector('.next');
if (nextButton) {
    nextButton.addEventListener('click', showNextImage);
}


// Initial setup
let modalImages = [];
let currentImageIndex = 0;
let activeCategory = '';

// Function to show the category based on the button clicked
function showCategory(categoryId) {
    const categories = document.querySelectorAll('.category');
    const buttons = document.querySelectorAll('.category-button');

    // Remove 'active' class from all categories
    categories.forEach(category => {
        category.classList.remove('active');
    });

    // Add 'active' class to the selected category
    document.getElementById(categoryId).classList.add('active');

    // Remove 'active' class from all buttons
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    const activeButton = document.querySelector(`.category-button[onclick="showCategory('${categoryId}')"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Update the active category
    activeCategory = categoryId;
}

// Show the Back to Top button after scrolling down
window.onscroll = function () {
    const backToTopButton = document.getElementById('backToTopButton');
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll to the top of the page when the button is clicked
document.getElementById('backToTopButton').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dropdown Menu
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menuButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    menuButton.addEventListener("click", function () {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    // Hide menu if user clicks outside it
    window.addEventListener("click", function (event) {
        if (event.target !== menuButton && !menuButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});



// Init 
function initScrollHandling() {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

window.onload = function () {
    initScrollHandling();

    if (typeof initSearchFunctionality === "function") {
        initSearchFunctionality();
        fetchData();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const whatsthat = document.getElementById('whatsthat');
    if (whatsthat) {
        whatsthat.addEventListener('click', function(event) {
            event.preventDefault();
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        });
    }
});