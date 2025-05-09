function displayBooks() {

  const user = JSON.parse(localStorage.getItem("userProfile"));
  if (user && user.name) {
    const userNameElement = document.getElementById("fullName");
    if (userNameElement) {
      userNameElement.textContent = `Welcome, ${user.name}`;
    }
  }

    const bookRow = document.querySelector('.book-row');
    bookRow.innerHTML = ''; // Clear any previous content

    const books = JSON.parse(localStorage.getItem('books')) || [];

    const bookToDisplay= books.filter(book => book.shouldDisplay === true);

    if (bookToDisplay.length === 0) {
      bookRow.innerHTML = '<p style="font-size: 18px; text-align:center;">No books found.</p>';
      return;
    }

    bookToDisplay.forEach(book => {
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';

    bookContainer.innerHTML = `
        <a href="Admin_Book_Details.html?bookId=${book.id}">
          <img src="${book.image}" alt="${book.title}" />
        </a>
        <div class="book-description">
          <h2>
            <a href="Admin_Book_Details.html?bookId=${book.id}">${book.title}</a>
            <span class="mynaui--book-check"></span>
          </h2>
          <p>${book.author}</p>
        </div>
      `;

      bookRow.appendChild(bookContainer);
    });
  }
  // Call the function to display books on page load
  window.addEventListener('DOMContentLoaded', displayBooks);