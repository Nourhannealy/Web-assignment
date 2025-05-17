// Admin_Page.js

// 1) Initialize everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize the search functionality
    search();

    // Initialize the sidebar toggle functionality
    initSidebarToggle();
});

// 2) Function to handle search and navigate to Reader_Search page & show results
function search() {
    const searchbarInput = document.querySelector("#search-bar-1");
    const books = document.querySelectorAll(".book-container");
    const searchName = document.querySelector("#search-name");

    const savedTerm = localStorage.getItem("lastSearchTerm");
    if (savedTerm) {
        searchbarInput.value = savedTerm;
        searchName.textContent = savedTerm;
        localStorage.removeItem("lastSearchTerm");
    }

    function filterSearch() {
        const searchbarValue = searchbarInput.value.toUpperCase();

        books.forEach((book) => {
            const bookTitle = book.querySelector(".book-title").textContent.toUpperCase();
            const bookAuthor = book.querySelector("p").textContent.toUpperCase();
            const bookCategory = book.dataset.category.toUpperCase();

            book.style.display =
                bookTitle.includes(searchbarValue) ||
                bookAuthor.includes(searchbarValue) ||
                bookCategory.includes(searchbarValue)
                    ? ""
                    : "none";
        });

        // Update results for "" while searching
        searchName.textContent = searchbarValue ? searchbarInput.value : "";
    }

    searchbarInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const term = searchbarInput.value.trim();
            localStorage.setItem("lastSearchTerm", term);
            window.location.href = "/reader_search/?q=" + encodeURIComponent(term); // Adjust URL if needed
        }
        filterSearch();
    });
}

// 3) Function to open and close the side-nav bar
function initSidebarToggle() {
    const menuBtn = document.querySelector(".menu-content");
    const sidebar = document.querySelector(".side-bar");
    const overlay = document.querySelector(".overlay");
    const closeBtn = document.querySelector(".logo-exit .streamline--delete-1-solid");

    if (!menuBtn || !sidebar || !overlay || !closeBtn) return;

    function openSidebar() {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    }

    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("active");
    }

    menuBtn.addEventListener("click", openSidebar);
    overlay.addEventListener("click", closeSidebar);
    closeBtn.addEventListener("click", closeSidebar);
}
