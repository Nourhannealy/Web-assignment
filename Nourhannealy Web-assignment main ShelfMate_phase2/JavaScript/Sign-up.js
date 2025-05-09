document.addEventListener("DOMContentLoaded", function () {
    
  document.querySelectorAll('.toggle-eye').forEach(icon => {
    icon.addEventListener('click', () => {
      const inputId = icon.getAttribute('data-target');
      const input = document.getElementById(inputId);
      const isPassword = input.type === 'password';

      input.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  });

  document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    const name = document.getElementById("name").value.trim();
    const phone = "";
    const gender = ""; 
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;

    let isValid = true;

    if (password !== confirmPassword) {
      document.getElementById("confirm-password-error").textContent = "Passwords do not match.";
      isValid = false;
    }

    if (!validateEmail(email)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (role === "Choose Between Admin or Reader") {
      document.getElementById("role-error").textContent = "Please select Admin or Reader.";
      isValid = false;
    }

    if (isValid) {
    
      localStorage.setItem("user", JSON.stringify({
        name: name,
        email: email,
        role: role
      }));
    
      showAlert("Sign up successful!", () => {
        if (role === "admin") {
          window.location.href = "Adming_Landing_books.html";
        } else if (role === "reader") {
          window.location.href = "Reader_Landing_book.html";
        }
      });
    }
    

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function showAlert(message, callback) {
    const alertBox = document.getElementById("custom-alert");
    const alertText = document.getElementById("alert-message");
    const closeBtn = document.getElementById("close-alert");

    alertText.textContent = message;
    alertBox.classList.remove("hidden");

    closeBtn.onclick = () => {
      alertBox.classList.add("hidden");
      if (callback) callback();
    };
  }

     // Save data correctly
     const user = { name, email, phone, gender, role };
     localStorage.setItem("userProfile", JSON.stringify(user));
 
     // Show success message or redirect
     if (role === "admin") {
       window.location.href = "Adming_Landing_books.html";
     } else if (role === "reader") {
       window.location.href = "Reader_Landing_Book.html";
     }
     
   });

});

function signUp() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const role = document.getElementById("role").value; 

  // Create user object
  const user = { name, email, phone, gender, role };

  // Save to localStorage
  localStorage.setItem("userProfile", JSON.stringify({
    name: name,
    email: email,
    phone: phone,
    gender: gender,
    role: role
}));
;

  // Redirect based on role
  if (role === "admin") {
    window.location.href = "Adming_Landing_books.html";
  } else if (role === "reader") {
    window.location.href = "Reader_Landing_Book.html";
  }
}
