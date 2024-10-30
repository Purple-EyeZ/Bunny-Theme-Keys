// Function to add search functionality for both search bars
function addSearchFunctionality() {
    const searchBar = document.getElementById('search-bar');
    const fixedSearchBar = document.getElementById('fixedSearchBar');
    const clearButton = document.getElementById('clearSearch');
    const clearButtonFixed = document.getElementById('clearFixedSearch');

    if (searchBar) {
        searchBar.addEventListener('input', function () {
            filterBlocks(searchBar.value.toLowerCase());
            toggleClearButton(searchBar, searchBar.value);
        });

        clearButton.addEventListener('click', function () {
            searchBar.value = '';
            fixedSearchBar.value = '';
            toggleClearButton(searchBar, '');
            filterBlocks('');
            searchBar.focus();
        });
    }

    if (fixedSearchBar) {
        fixedSearchBar.addEventListener('input', function () {
            filterBlocks(fixedSearchBar.value.toLowerCase());
            toggleClearButton(fixedSearchBar, fixedSearchBar.value);
        });

        clearButtonFixed.addEventListener('click', function () {
            searchBar.value = '';
            fixedSearchBar.value = '';
            toggleClearButton(fixedSearchBar, '');
            filterBlocks('');
            fixedSearchBar.focus();
        });
    }
}

// Synchronize search bars
function syncSearchBars() {
    const searchBar = document.getElementById('search-bar');
    const fixedSearchBar = document.getElementById('fixedSearchBar');
    
    if (!searchBar || !fixedSearchBar) return;

    // Sync input between search bars
    searchBar.addEventListener('input', function () {
        fixedSearchBar.value = searchBar.value;
        toggleClearButton(fixedSearchBar, searchBar.value);
    });

    fixedSearchBar.addEventListener('input', function () {
        searchBar.value = fixedSearchBar.value;
        toggleClearButton(searchBar, fixedSearchBar.value);
    });
}

// Add click events to show/hide the search bar
function addSearchButtonEvent() {
    const searchButton = document.getElementById('searchButton');
    const searchBar = document.getElementById('fixedSearchBar');
    const clearButtonFixed = document.getElementById('clearFixedSearch');

    searchButton.addEventListener('click', () => {
        if (searchBar.classList.contains('hidden')) {
            // Show fixed search bar and clear button if there is text
            searchBar.classList.remove('hidden');
            searchBar.classList.add('show');
            searchBar.focus();

            if (searchBar.value.length > 0) {
                clearButtonFixed.style.display = 'block';
            }
        } else {
            // Hide fixed search bar and always hide the clear button
            searchBar.classList.remove('show');
            searchBar.classList.add('hidden');
            clearButtonFixed.style.display = 'none';
        }
    });

    // Make sure the clear button hides when the search bar is hidden
    window.addEventListener('scroll', () => {
        if (searchBar.classList.contains('hidden')) {
            clearButtonFixed.style.display = 'none';
        }
    });
}

function toggleClearButton(inputElement, value) {
    const clearButton = inputElement.id === 'search-bar' 
                        ? document.getElementById('clearSearch') 
                        : document.getElementById('clearFixedSearch');
    clearButton.style.display = value.length > 0 ? 'block' : 'none';
}

// Function to initialize search functionality
function initSearchFunctionality() {
    syncSearchBars();
    addSearchFunctionality();
    addSearchButtonEvent();
}