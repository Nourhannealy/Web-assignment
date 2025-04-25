fetch('Reader_Page.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load page content: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        const navbarContent = data.split('<!--Navigation bar-->')[1].split('<!--Footer-->')[0];
        const footerContent = data.split('<!--Footer-->')[1].split('<!--Assistant-->')[0];
        const assistantContent = data.split('<!--Assistant-->')[1];

        document.getElementById('navbar').innerHTML = navbarContent.trim();
        document.getElementById('footer').innerHTML = footerContent.trim();
        document.getElementById('Assistant').innerHTML = assistantContent.trim();

        // Reinitialize the JavaScript for dynamically added content
        search();
    })
    .catch(error => console.error(error));

// Function to search then navigate to Reader_Search page & show results
function search(){

    const buttons =document.querySelectorAll(".buttons2 button");
    const searchbarInput= document.querySelector("#search-bar-1");
    const books= document.querySelectorAll(".book-container");
    const searchName= document.querySelector("#search-name");
    let buttonPressed="";

    buttons.forEach(butn=>{
        butn.addEventListener("click",()=>{
            // in case button is clicked more than once
            if(butn.classList.contains("selected")){ //if it was already clicked
                butn.classList.remove("selected");
                butn.style.backgroundColor="";
                buttonPressed="";
            }
            
            else{ // first time being clicked 
                buttons.forEach(b=>{ //reset the button
                    b.classList.remove("selected");
                    b.style.backgroundColor="";
                    
                });
                
                butn.classList.add("selected");
                butn.style.backgroundColor="#956034";
                
                // which button is clicked
                if (butn.classList.contains("title-button")) {
                    buttonPressed="title";
                } else if (butn.classList.contains("author-button")) {
                    buttonPressed="author";
                }
                else if(butn.classList.contains("category-button")){
                    buttonPressed="category";
                }
                
            }
            filterSearch();
        })
    }) 

    function filterSearch(){
        const searchbarValue= searchbarInput.value.toUpperCase()
    
        books.forEach(book=>{
            const bookTitle=book.querySelector(".book-title").textContent.toUpperCase();
            const bookAuthor= book.querySelector("p").textContent.toUpperCase();
            const bookCategory=book.dataset.category.toUpperCase();
                
            if (
                (buttonPressed=="title"&&bookTitle.includes(searchbarValue))||
                (buttonPressed=="author"&&bookAuthor.includes(searchbarValue))||
                (buttonPressed=="category"&&bookCategory.includes(searchbarValue))||
                (!buttonPressed&&(bookTitle.includes(searchbarValue)||bookAuthor.includes(searchbarValue)||bookCategory.includes(searchbarValue)))
            ) {
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
            const query=encodeURIComponent(searchbarInput.value.trim());
            window.location.href =`Reader_Search.html?query=${query}`;
        }
        filterSearch();
    });
}

// Function to navigate page & desired category from status dropdown listfunction statusDropdown(){
function statusDropdown(){
    const pageTitle= document.getElementById("title");
    const books =document.querySelectorAll(".book-container");
    const buttons =document.querySelectorAll(".buttons button");
    const params=new URLSearchParams(window.location.search);
    const category=params.get("category");
            
    if(category){
        pageTitle.textContent=category.replace("-"," ");
        books.forEach(book=>{
            if(book.classList.contains(category.toLowerCase().replace(" ","-"))){
                book.style.display="block";
            }
            else{
                book.style.display="none";
            }
        })
        buttons.forEach(butn=>{
            if(butn.classList.contains(category.toLowerCase().replace(" ","-"))){
                butn.classList.add("selected");
                butn.style.backgroundColor="#956034";
            }
                
        });
    }
    else{
        books.forEach(book=> book.style.display="block")
        pageTitle.textContent="Book Status";
        buttons.forEach(btn => {
            btn.classList.remove("selected");
            btn.style.backgroundColor = "";
        });
    }   

}
statusDropdown();



// Assistant 
const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
        if (mutation.type==="childList") {
            const assistant=document.getElementById("ai");
            const userInput=document.getElementById("user-input");
            const responseBox=document.getElementById("response");
            if (assistant&&userInput&&responseBox&&!userInput.dataset.listenerAttached) {
                userInput.dataset.listenerAttached=true;
                userInput.addEventListener("keydown",(event) => {
                    if (event.key === "Enter") {
                        handleUserInput(userInput, responseBox);
                    }
                });
                observer.disconnect();
            }
        }
    });
});
observer.observe(document.body, { childList: true, subtree: true });

function handleUserInput(userInput, responseBox) {
    const inputText = userInput.value.toLowerCase();
    let reply;
    if (inputText.includes("hello")||inputText.includes("hi")) {
        reply = "Hello! How can I help you today?";
    } else if (inputText.includes("how are you")) {
        reply = "I'm doing great! Thanks for asking!";
    } else if (inputText.includes("your name")) {
        reply = "I'm Shellfmate your AI assistant!";
    } else if (inputText.includes("bye")) {
        reply = "Goodbye! Have a wonderful day!";
    } else {
        reply = "Sorry, I didn't understand that. Can you ask something else?";
    }
    responseBox.textContent=reply;
    userInput.value='';
}







