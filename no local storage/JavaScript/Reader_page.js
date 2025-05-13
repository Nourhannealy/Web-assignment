// Reader_page.js

// 1) Your AI handler must exist before you bind it:
function handleUserInput(userInput, responseBox) {
    const inputText = userInput.value.trim().toLowerCase();
    
  
    let reply;
    if (inputText.includes("hello") || inputText.includes("hi")) {
      reply = "Hello! How can I help you today?";
    } else if (inputText.includes("how are you")) {
      reply = "I'm doing great! Thanks for asking!";
    } else if (inputText.includes("your name")) {
      reply = "I'm ShelfMate, your AI assistant!";
    } else if (inputText.includes("bye")) {
      reply = "Goodbye! Have a wonderful day!";
    } else {
      reply = "Sorry, I didn't understand that. Can you ask something else?";
    }
  
    
    responseBox.textContent = reply;
    userInput.value = "";
  }
  
  // 2) Fetch dynamic page sections and inject them
  fetch('Reader_Page.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load page content: ' + response.statusText);
      }
      return response.text();
    })
    .then(data => {
      // Extract pieces
      const navbarContent    = data.split('<!--Navigation bar-->')[1].split('<!--Footer-->')[0];
      const footerContent    = data.split('<!--Footer-->')[1].split('<!--Assistant-->')[0];
      const assistantContent = data.split('<!--Assistant-->')[1];
  
      // Inject into placeholders
      document.getElementById('navbar').innerHTML    = navbarContent.trim();
      document.getElementById('footer').innerHTML    = footerContent.trim();
      document.getElementById('Assistant').innerHTML = assistantContent.trim();
  
      // 3) Wire up the AI listener immediately after injection
      const userInput   = document.getElementById('user-input');
      const responseBox = document.getElementById('response');
      if (userInput && responseBox) {
        userInput.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            
            handleUserInput(userInput, responseBox);
          }
        });
        
      } else {
        
      }
  
      // 4) Reinitialize your other modules
      search();
      statusDropdown();
      initSidebarToggle();
    })
    .catch(error => console.error(error));
  
  // 5) Your existing search, statusDropdown, initSidebarToggle functions:
  
  function search(){
    const searchbarInput = document.querySelector("#search-bar-1");
    const books          = document.querySelectorAll(".book-container");
    const searchName     = document.querySelector("#search-name");
  
    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedTerm) {
      searchbarInput.value   = savedTerm;
      searchName.textContent = savedTerm;
      localStorage.removeItem('lastSearchTerm');
    }
  
    function filterSearch(){
      const val = searchbarInput.value.toUpperCase();
      books.forEach(book => {
        const title    = book.querySelector(".book-title").textContent.toUpperCase();
        const author   = book.querySelector("p").textContent.toUpperCase();
        const category = book.dataset.category.toUpperCase();
        book.style.display = (title.includes(val) || author.includes(val) || category.includes(val))
                             ? "" : "none";
      });
      searchName.textContent = val ? searchbarInput.value : "";
    }
  
    searchbarInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        const term = searchbarInput.value.trim();
        localStorage.setItem('lastSearchTerm', term);
        window.location.href = 'Reader_Search.html';
      }
      filterSearch();
    });
  }
  search();
  
  function statusDropdown(){
    document.addEventListener("DOMContentLoaded", () => {
      const pageTitle = document.getElementById("title");
      const books     = document.querySelectorAll(".book-container");
      const buttons   = document.querySelectorAll(".buttons button");
      const params    = new URLSearchParams(window.location.search);
      const category  = params.get("category");
  
      if (category) {
        pageTitle.textContent = category.replace("-", " ");
        books.forEach(book => {
          const cls = category.toLowerCase().replace(" ", "-");
          if (book.classList.contains(cls)) {
            book.style.display = "block";
            buttons.forEach(btn => {
              if (btn.textContent.toLowerCase() === category.toLowerCase()) {
                btn.classList.add("selected");
                btn.style.backgroundColor = "#956034";
              }
            });
          } else {
            book.style.display = "none";
          }
        });
      } else {
        books.forEach(book => book.style.display = "block");
        pageTitle.textContent = "Book Status";
      }
    });
  }
  statusDropdown();
  
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
  