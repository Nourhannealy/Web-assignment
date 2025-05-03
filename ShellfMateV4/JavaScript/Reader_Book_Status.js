document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.getElementById('title');
    const bookRow   = document.querySelector('.book-row');
    const btns      = {
      borrowed:     document.querySelector('.borrowed'),
      notCompleted: document.querySelector('.not-completed'),
      completed:    document.querySelector('.completed'),
      favorites:    document.querySelector('.favorites'),
    };
    const books     = JSON.parse(localStorage.getItem('books')) || [];
  
    // Render helper
    function createBookHTML(book, page = 'Reader_Book_Details.html') {
      const iconClass = book.available ? 'mynaui--book-check' : 'mynaui--book-slash';
      return `
        <div class="book-container">
          <a href="${page}?bookId=${book.id}">
            <img src="${book.image}" alt="${book.title}" />
          </a>
          <div class="book-description">
            <h2>
              <a href="${page}?bookId=${book.id}">${book.title}</a>
              <span class="${iconClass}"></span>
            </h2>
            <p>${book.author}</p>
          </div>
        </div>
      `;
    }
  
    function displayBooks(filterFn = null, page = 'Reader_Book_Details.html') {
      const list = filterFn
        ? books.filter(book => book.shouldDisplay && filterFn(book))
        : books.filter(book => book.shouldDisplay);
  
      if (!list.length) {
        bookRow.innerHTML = '<p style="font-size:18px;text-align:center;">No books found.</p>';
      } else {
        bookRow.innerHTML = list.map(b => createBookHTML(b, page)).join('');
      }
    }
  
    // Clear all button states
    function clearSelection() {
      Object.values(btns).forEach(b => {
        b.classList.remove('selected');
        b.style.backgroundColor = '';
      });
    }
  
    function toggle(button, filterFn, titleText, page) {
      return () => {
        const isActive = button.classList.contains('selected');
  
        clearSelection();
  
        if (isActive) {
          pageTitle.textContent = 'Book Status';
          displayBooks();            
        } else {
          button.classList.add('selected');
          button.style.backgroundColor = '#956034';
          pageTitle.textContent = titleText;
          displayBooks(filterFn, page);
        }
      };
    }
  
    btns.borrowed.addEventListener(
      'click',
      toggle(
        btns.borrowed,
        book => book.borrowed,
        'Borrowed',
        'Reader_Completed_or_not.html'
      )
    );
  
    btns.notCompleted.addEventListener('click',toggle(btns.notCompleted, book => !book.completed, 'Not Completed'));
  
    btns.completed.addEventListener('click',toggle(btns.completed, book => book.completed, 'Completed'));
  
    btns.favorites.addEventListener('click',toggle(btns.favorites, book => book.favourite, 'Favorites'));
  
    pageTitle.textContent = 'Book Status';
    displayBooks();
  });
  