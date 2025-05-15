let allBooks = []; // to store all books
let buttonPressed = "";

function loadBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    allBooks = storedBooks.filter(book => book.shouldDisplay); // Only the ones that should be displayed
    renderBooks(allBooks);
}

function renderBooks(booksToRender) {
    const booksContainer = document.querySelector(".book-row");
    booksContainer.innerHTML = "";

    booksToRender.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.className = "book-container";
        bookDiv.dataset.category = book.available ? "Available" : "Borrowed";

        bookDiv.innerHTML =  `
        <a href="Reader_Book_Details.html?bookId=${book.id}">
          <img src="${book.image}" alt="${book.title}" />
        </a>
        <div class="book-description">
          <h2>
            <a href="Reader_Book_Details.html?bookId=${book.id}">${book.title}</a>
            <span class="mynaui--book-check"></span>
          </h2>
          <p>${book.author}</p>
        </div>
      `;

        booksContainer.appendChild(bookDiv);
    });
}


function search() {
    const buttons = document.querySelectorAll(".buttons2 button");
    const searchbarInput = document.querySelector(".search-bar input[name='search']");
    const searchName = document.querySelector("#search-name");

    buttons.forEach(butn => {
        butn.addEventListener("click", () => {
            if (butn.classList.contains("selected")) {
                butn.classList.remove("selected");
                butn.style.backgroundColor = "";
                buttonPressed = "";
            } else {
                buttons.forEach(b => {
                    b.classList.remove("selected");
                    b.style.backgroundColor = "";
                });

                butn.classList.add("selected");
                butn.style.backgroundColor = "#956034";

                if (butn.classList.contains("title-button")) {
                    buttonPressed = "title";
                } else if (butn.classList.contains("author-button")) {
                    buttonPressed = "author";
                } else if (butn.classList.contains("category-button")) {
                    buttonPressed = "category";
                }
            }
            filterSearch();
        });
    });

    function filterSearch() {
        const searchbarValue = searchbarInput.value.toUpperCase();
        let filteredBooks = allBooks.filter(book => {
            const title = book.title.toUpperCase();
            const author = book.author.toUpperCase();
            const category = book.available ? "AVAILABLE" : "BORROWED";

            return (
                (buttonPressed == "title" && title.includes(searchbarValue)) ||
                (buttonPressed == "author" && author.includes(searchbarValue)) ||
                (buttonPressed == "category" && category.includes(searchbarValue)) ||
                (!buttonPressed && (title.includes(searchbarValue) || author.includes(searchbarValue) || category.includes(searchbarValue)))
            );
        });

        renderBooks(filteredBooks);
    }

    searchbarInput.addEventListener("input", () => {
        filterSearch();
        const currentSearchValue = searchbarInput.value;
        if (searchName) {
            searchName.textContent = currentSearchValue ? currentSearchValue : "";
        }
    });

    const searchForm = document.querySelector(".search-bar");
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        filterSearch();
    });
}

// First, load books into allBooks and display them
loadBooks();
// Then, activate search functionality
search();
