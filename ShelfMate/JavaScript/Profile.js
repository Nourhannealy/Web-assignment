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

    //localStorage
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    let gender = "";
    if (document.getElementById("dot-1").checked) gender = "Male";
    else if (document.getElementById("dot-2").checked) gender = "Female";
    else if (document.getElementById("dot-3").checked) gender = "Prefer not to say";

    const userData = { fullName, email, phone, gender };
    localStorage.setItem("userProfile", JSON.stringify(userData));

    showToast("ShelfMate says: Changes saved!");

  }
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000); // hides after 3 seconds
}


// Load saved data when the page loads
window.onload = function() {
  const data = JSON.parse(localStorage.getItem("userProfile"));
  if (data) {
    document.getElementById("fullName").value = data.fullName;
    document.getElementById("email").value = data.email;
    document.getElementById("phone").value = data.phone;

    // Set the correct radio button
    if (data.gender === "Male") document.getElementById("dot-1").checked = true;
    else if (data.gender === "Female") document.getElementById("dot-2").checked = true;
    else if (data.gender === "Prefer not to say") document.getElementById("dot-3").checked = true;
  }
};