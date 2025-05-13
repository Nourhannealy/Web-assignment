const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id'); // Get bookId from the URL

// Replace this with a data source or API call to get books
const books = []; // Example: Replace with a fetched list of books or another data source

const book = books.find(b => b.id == bookId);

if (book) {
    document.getElementById('book-title').innerText = book.title;
    document.getElementById('Authorname').innerText = book.author;
    document.querySelector('.book-cover img').src = book.image;
}

// Show the delete confirmation dialog
function showDeleteAlert() {
    document.getElementById('customAlert').style.display = 'flex';
}

// Close the delete confirmation dialog
function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

// Delete book (replace logic to work with your data source or backend)
function deleteBook(bookId) {
    // Replace with appropriate logic to update books
    console.log("Deleting book with ID:", bookId);

    // Redirect to the books page
    window.location.href = "Adming_Landing_books.html";
}
