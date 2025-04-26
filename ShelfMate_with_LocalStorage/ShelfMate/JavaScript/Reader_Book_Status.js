// Function to update page title & show books depending on which button is clicked
function pageStatus(){
    const pageTitle= document.getElementById("title");
    const buttons =document.querySelectorAll(".buttons button");
    const books =document.querySelectorAll(".book-container");
    
    buttons.forEach(butn => {
        butn.addEventListener("click", () => {
            if(butn.classList.contains("selected")){
                butn.classList.remove("selected");
                pageTitle.textContent="Book Status";
                butn.style.backgroundColor="";
                books.forEach(i=>i.style.display="block");
            }
            else{
                pageTitle.textContent = butn.textContent;
                buttons.forEach(i => i.style.backgroundColor = ""); //reset style 
                butn.style.backgroundColor="#956034";

                const category= butn.className;
                books.forEach(book=>{
                    if(book.classList.contains(category)){
                        book.style.display="block";
                    }
                    else{
                        book.style.display="none"; // hides books that dont match the conditon
                    }
                })
                butn.classList.add("selected");
            }
        });
    });
}
pageStatus(); 



document.addEventListener('DOMContentLoaded', () => {
    const bookRow = document.querySelector('.book-row');
    const buttons = {
        borrowed: document.querySelector('.borrowed'),
        notCompleted: document.querySelector('.not-completed'),
        completed: document.querySelector('.completed'),
        favorites: document.querySelector('.favorites')
    };

    const books = JSON.parse(localStorage.getItem('books')) || [];

    function createBookHTML(book, page = 'Reader_Book_Details.html') {
        const iconClass = book.available ? 'mynaui--book-check' : 'mynaui--book-slash';
        return `
            <div class="book-container">
                <a href="${page}?bookId=${book.id}">
                    <img src="${book.image}" alt="${book.title}"/>
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

    function displayBooks(filterFn, page = 'Reader_Book_Details.html') {
        bookRow.innerHTML = '';
        const filteredBooks = books.filter(book => book.shouldDisplay && filterFn(book));

        if (filteredBooks.length === 0) {
            bookRow.innerHTML = '<p style="font-size: 18px; text-align:center;">No books found.</p>';
            return;
        }

        bookRow.innerHTML = filteredBooks.map(book => createBookHTML(book, page)).join('');
    }

    // Attach event listeners
    buttons.borrowed.addEventListener('click', () => displayBooks(book => book.borrowed, 'Reader_Completed_or_not.html'));
    buttons.notCompleted.addEventListener('click', () => displayBooks(book => !book.completed));
    buttons.completed.addEventListener('click', () => displayBooks(book => book.completed));
    buttons.favorites.addEventListener('click', () => displayBooks(book => book.favourite));

    // Default load: show borrowed books
    displayBooks(book => book.borrowed, 'Reader_Completed_or_not.html');
});



