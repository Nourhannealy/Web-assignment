fetch('Admin_Page.html') 
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load page content: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        const navbarContent = data.split('<!--Navigation bar-->')[1].split('<!--Footer-->')[0];
        const footerContent = data.split('<!--Footer-->')[1];

        document.getElementById('navbar').innerHTML = navbarContent.trim();
        document.getElementById('footer').innerHTML = footerContent.trim();
        // Reinitialize the JavaScript for dynamically added content
        search();
        initSidebarToggle();  
    })
    .catch(error => console.error(error));

// Function to search then navigate to Reader_Search page & show results
function search(){

    const searchbarInput= document.querySelector("#search-bar-1");
    const books= document.querySelectorAll(".book-container");
    const searchName= document.querySelector("#search-name");

    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedTerm) {
      searchbarInput.value   = savedTerm;
      searchName.textContent = savedTerm;
      localStorage.removeItem('lastSearchTerm');
    }

    function filterSearch(){
        const searchbarValue= searchbarInput.value.toUpperCase()

        books.forEach(book=>{
            const bookTitle=book.querySelector(".book-title").textContent.toUpperCase();
            const bookAuthor= book.querySelector("p").textContent.toUpperCase();
            const bookCategory=book.dataset.category.toUpperCase();
                
            if ((bookTitle.includes(searchbarValue)||bookAuthor.includes(searchbarValue)||bookCategory.includes(searchbarValue))) {
                book.style.display=""; 
            } else {
                book.style.display="none";
            }
        }) 
        // update results for "" while searching        
        if (searchbarValue) {
            searchName.textContent=searchbarInput.value;
        } else {
            searchName.textContent="";
        }   
    }
    searchbarInput.addEventListener("keydown", (event) => {
        if (event.key==="Enter") {
            event.preventDefault();
             const term = searchbarInput.value.trim();
             localStorage.setItem('lastSearchTerm', term);
             window.location.href = 'Reader_Search.html';
        }
        filterSearch();
    });
}
search();

// To open and close side-nav bar
function initSidebarToggle() {
    const menuBtn  = document.querySelector('.menu-content');
    const sidebar  = document.querySelector('.side-bar');
    const overlay  = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.logo-exit .streamline--delete-1-solid');
  
    if (!menuBtn || !sidebar || !overlay || !closeBtn) return;
  
    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
    }
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    }
  
    menuBtn.addEventListener('click', openSidebar);
    overlay.addEventListener('click', closeSidebar);
    closeBtn.addEventListener('click', closeSidebar);
  }
initSidebarToggle();  









