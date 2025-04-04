function Admin_Add_Book(){
document.getElementById("Used_page").innerHTML=`
<head>
        <title>Admin Add Book</title>
        <link rel="stylesheet" href="Admin_Add_Book.css">
</head>
        <section class="Main_interface">
            <div class="title_of_page">
                    <p>Add New Book</p>
            </div>
           <div class="content_screen">
                <div class="Tabs">
                    <P class="input_title">Book ID</P>
                    <input class="input_text" type="number"  >
                </div>                
                    
                <div class="Tabs">
                    <P class="input_title">Book Name</P>
                    <input class="input_text" type="text" >
                </div>            
        
                <div class="Tabs">
                    <P class="input_title">Author</P>
                    <input class="input_text" type="text"  >
                </div>
                
        
                <div class="Tabs">
                     <P class="input_title">Category</P>
                    <input class="input_text" type="text"  >
                </div>    
        
                <div class="Tabs">
                    <P class="input_title">Description</P>
                    <input class="input_text" type="text"  >
                </div>
                <div >
                    <P class="input_title">Upload Book Image</P>
                    
                    <button type="file" class="upload-button">No File Uploaded</button>
                    <button type="submit" class="submit"><p>Save</p></button>
                      
                </div>
           </div>

        </section>`;

}

function Admin_Edit_Book(){
document.getElementById("Used_page").innerHTML=`
<head>
        <title>Admin Edit Book</title>
        <link rel="stylesheet" href="Admin_Edit_Book.css">
</head>
       <section class="Main_interface">
            <div class="title_of_page">
                    <p>Edit Book</p>
            </div>
           <div class="content_screen">
                <div class="Tabs">
                    <P class="input_title">Book Name</P>
                    <input class="input_text" type="number"  >
                </div>                
                <div class="Tabs">
                    <P class="input_title">Author</P>
                    <input class="input_text" type="text"  >
                </div>
                
                <div class="Tabs">
                     <P class="input_title">Category</P>
                    <input class="input_text" type="text"  >
                </div>    
        
                <div class="Tabs">
                    <P class="input_title">Description</P>
                    <input class="input_text" type="text"  >
                </div>
                <div >
                    <P class="input_title">Upload Book Image</P>
                    
                    <button type="file" class="upload-button">No File Uploaded</button>
                    <button type="submit" class="submit"><p>Save Changes</p></button>
                      
                </div>
           </div>

        </section>`;

}