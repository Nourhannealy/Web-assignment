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


