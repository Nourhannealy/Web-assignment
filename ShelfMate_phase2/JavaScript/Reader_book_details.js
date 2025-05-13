function showCustomAlert(message, onConfirm = null, onCancel = null, singleButton = false) {
    document.getElementById('alertMessage').textContent = message;
    document.getElementById('customAlert').style.display = 'flex';

    const confirmBtn = document.getElementById('alertConfirmBtn');
    const cancelBtn = document.getElementById('alertCancelBtn');

    // Remove old event listeners
    const newConfirmBtn = confirmBtn.cloneNode(true);
    const newCancelBtn = cancelBtn.cloneNode(true);
    confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
    cancelBtn.parentNode.replaceChild(newCancelBtn, cancelBtn);

    // Hide or show Cancel button based on singleButton flag
    newCancelBtn.style.display = singleButton ? 'none' : 'inline-block';

    newConfirmBtn.addEventListener('click', () => {
        document.getElementById('customAlert').style.display = 'none';
        if (onConfirm) onConfirm();
    });

    newCancelBtn.addEventListener('click', () => {
        document.getElementById('customAlert').style.display = 'none';
        if (onCancel) onCancel();
    });
}

    function addOrUpdateBook(bookData) {
    let books = JSON.parse(localStorage.getItem('books')) || [];
    const index = books.findIndex(b => b.title === bookData.title);

    if (index !== -1) {
        // Update existing book
        books[index] = { ...books[index], ...bookData };
    } else {
        // Add new book
        books.push(bookData);
    }

    localStorage.setItem('books', JSON.stringify(books));
    }

    function closeAlert() {
        document.getElementById('customAlert').style.display = 'none';
    }

    function showBorrowAlert() {
        const title = "You've Reached Sam";
        let books = JSON.parse(localStorage.getItem('books')) || [];
        const isAlreadyBorrowed = books.some(b => b.title === title && b.borrowed === true);

        if (isAlreadyBorrowed) {
            showCustomAlert('You have already borrowed this book.',null,null,true);
        } else {
            showCustomAlert("Are you sure you want to borrow this book?", confirmBorrow);
        }
    }

    function confirmBorrow() {
        const book = {
            title: "You've Reached Sam",
            author: "Dustin Thao",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1610730335i/53086843.jpg",
            borrowed: true
        };

        addOrUpdateBook(book);
        localStorage.setItem('book', JSON.stringify(book));

        showCustomAlert('You have borrowed the book!', () => {
            console.log("Redirecting now...");
            window.location.href = "Reader_Book_Status.html";
        });
    }


    document.getElementById('heart-toggle').addEventListener('change', function () {
        const book = {
            title: "You've Reached Sam",
            author: "Dustin Thao",
            image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1610730335i/53086843.jpg",
            favourite: this.checked
        };

        addOrUpdateBook(book);
        console.log(`Book '${book.title}' marked as favourite: ${this.checked}`);
    });
