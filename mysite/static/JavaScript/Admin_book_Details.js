const urlParams = new URLSearchParams(window.location.search);
const bookId = urlParams.get('id'); // Get bookId from the URL
const books = JSON.parse(localStorage.getItem('books'));
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


// Delete book from localStorage
function deleteBook(bookId) {
    let books = JSON.parse(localStorage.getItem('books'));
    const bookIndex = books.findIndex(book => book.id == bookId);

    if (bookIndex !== -1) {
        // Set shouldDisplay to false for the specific book
        books[bookIndex].shouldDisplay = false;

        // Update the books array in localStorage
        localStorage.setItem('books', JSON.stringify(books));
    }
    console.log("Deleting book with ID:", bookId);
    window.location.href = "Adming_Landing_books.html"; // Redirect to the books page

}
