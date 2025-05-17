function getCSRFToken() {
  return csrfToken; // CSRF token passed from template
}
document.addEventListener('DOMContentLoaded', () => {
  const favoriteToggle = document.querySelector('#favoriteToggle');

  if (favoriteToggle) {
    favoriteToggle.addEventListener('change', () => {
      const bookId = favoriteToggle.dataset.bookId;
      const isFavorite = favoriteToggle.checked;

      updateFavoriteStatus(bookId, isFavorite);
    });
  }
});

function updateFavoriteStatus(bookId, isFavorite) {
  fetch(`/books/${bookId}/favorite/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': getCSRFToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ is_favorite: isFavorite }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.success) {
        alert('Failed to update favorite status.');
      }
    })
    .catch((err) => {
      console.error('Favorite update failed:', err);
    });
}

function showBorrowAlert(bookId, stock) {
  if (stock > 0) {
    showCustomAlert(
      "Are you sure you want to borrow this book?",
      () => confirmBorrow(bookId)
    );
  } else {
    showCustomAlert(
      "This book is out of stock.",
      null,
      null,
      true
    );
  }
}

function confirmBorrow(bookId) {
  fetch(`/books/${bookId}/borrow/`, {
    method: 'POST',
    headers: {
      'X-CSRFToken': getCSRFToken(),
      'Accept': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(`Borrow successful! Remaining stock: ${data.new_stock}`);
      } else {
        alert(`Error: ${data.error}`);
      }
    })
    .catch((err) => console.error('Borrow failed:', err));
}

// Export to global scope for HTML inline handlers
window.showBorrowAlert = showBorrowAlert;
