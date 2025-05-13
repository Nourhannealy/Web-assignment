function showAlert(message, callback) {
  const alertBox = document.getElementById("custom-alert");
  const alertText = document.getElementById("alert-message");
  const closeBtn = document.getElementById("close-alert");

  if (alertText && alertBox && closeBtn) {
    alertText.textContent = message;
    alertBox.classList.remove("hidden");

    closeBtn.onclick = () => {
      alertBox.classList.add("hidden");
      if (callback) callback();
    };
  } else {
    alert(message); // fallback
    if (callback) callback();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector(".submit");
  const inputFields = document.querySelectorAll(".input_text");
  const fileInput = document.querySelector(".upload-button");

  if (!saveButton || inputFields.length < 4) return; // prevent JS error on pages without the form

  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const bookId = inputFields[0].value.trim(); // only used in Add Book
    const bookName = inputFields[0].value.trim();
    const author = inputFields[1].value.trim();
    const category = inputFields[2].value.trim();
    const description = inputFields[3].value.trim();

    if (!bookName || !author || !category || !description || fileInput?.files.length === 0) {
      showAlert("Please fill out all fields and upload a book image.");
      return;
    }

    const bookData = {
      id: bookId || null, // might be unused in Edit Book
      name: bookName,
      author: author,
      category: category,
      description: description,
      imageFileName: fileInput?.files[0].name || null,
    };

    showAlert("Book saved successfully!", () => {
      inputFields.forEach(field => field.value = "");
      if (fileInput) fileInput.value = "";
    });
  });
});

