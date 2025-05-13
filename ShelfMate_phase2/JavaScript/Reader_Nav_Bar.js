// Function to navigate page & desired category from status dropdown list
function statusDropdown(){
    const pageTitle= document.getElementById("title");
    const books =document.querySelectorAll(".book-container");
    const buttons =document.querySelectorAll(".buttons2 button");
    const searchName= document.querySelector("#search-name");
    document.addEventListener("DOMContentLoaded", () => {
        const params=new URLSearchParams(window.location.search);
        const category=params.get("category");
            
        if(category){
            pageTitle.textContent=category.replace("-"," ");
            books.forEach(book=>{
                if(book.classList.contains(category.toLowerCase().replace(" ","-"))){
                    book.style.display="block";
                    buttons.forEach(butn=>{
                        if(butn.textContent.toLowerCase()==category.toLowerCase())
                        butn.classList.add("selected");
                        butn.style.backgroundColor="#956034";
                    })
                }
                else{
                    book.style.display="none";
                }
            })
        }
        else{
            books.forEach(book=>{
                book.style.display="block";
            })
            pageTitle.textContent="Book Status";

        }   
    });

}

statusDropdown();
