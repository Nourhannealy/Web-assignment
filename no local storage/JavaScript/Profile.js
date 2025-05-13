let isEditing = false;

function toggleEdit() {
  const btn = document.getElementById("editBtn");

  // Collect inputs
  const inputs = [
    document.getElementById("fullName"),
    document.getElementById("email"),
    document.getElementById("phone"),
    document.getElementById("dot-1"),
    document.getElementById("dot-2"),
    document.getElementById("dot-3")
  ];

  if (!isEditing) {
    // Enable inputs
    inputs.forEach(input => input.disabled = false);
    btn.textContent = "Save Changes";
    isEditing = true;
  } else {
    // Disable inputs
    inputs.forEach(input => input.disabled = true);
    btn.textContent = "Edit";
    isEditing = false;

    // Collect data
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    let gender = "";
    if (document.getElementById("dot-1").checked) gender = "Male";
    else if (document.getElementById("dot-2").checked) gender = "Female";
    else if (document.getElementById("dot-3").checked) gender = "Prefer not to say";

    // Save data (replace with actual logic to store or process user data)
    const userData = { fullName, email, phone, gender };
    console.log("User data saved:", userData); // Debugging/logging purposes

    showToast("ShelfMate says: Changes saved!");
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}

// Load saved data when the page loads (replace with actual logic if data needs to be pre-filled)
window.onload = function () {
  console.log("User data can be initialized here if necessary."); // Debugging/logging purposes
};




