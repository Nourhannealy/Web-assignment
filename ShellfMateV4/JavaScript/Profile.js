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

    // Save to localStorage
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
  }, 3000);
}

// Load saved data when the page loads
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("userProfile"));
  if (user) {
    document.getElementById("fullName").value = user.name || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";

    if (user.gender === "Male") document.getElementById("dot-1").checked = true;
    else if (user.gender === "Female") document.getElementById("dot-2").checked = true;
    else if (user.gender === "Prefer not to say") document.getElementById("dot-3").checked = true;
  }
};


