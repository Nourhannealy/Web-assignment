//Function to filter search depending on which button is clicked
function search(){

    const buttons =document.querySelectorAll(".buttons button");
    const searchbarInput= document.querySelector("#search-bar-2");
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
    searchbarInput.addEventListener("input",()=>{
        filterSearch();        
    })
}
search();

