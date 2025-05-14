document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#signup-form");

  // Enable toggle eye visibility
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

  
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission initially

    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    let isValid = true;

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      document.getElementById("confirm-password-error").textContent = "Passwords do not match.";
      isValid = false;
    }

    // Check if password is strong
    if (!isStrongPassword(password)) {
      document.getElementById("password-error").textContent =
        "Password must be at least 8 characters, include uppercase and lowercase letters, a number, and a special character.";
      isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
      document.getElementById("email-error").textContent = "Please enter a valid email address.";
      isValid = false;
    }

    // Ensure role is selected
    if (role === "") {
      document.getElementById("role-error").textContent = "Please select Admin or Reader.";
      isValid = false;
    }

    // If all validations pass, proceed with sign-up
    if (isValid) {
      const newUser = {
        name: document.getElementById("name").value,
        email: email,
        password: password,
        role: role
      };

      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Check for duplicate email
      if (users.some(user => user.email === email)) {
        showAlert("This email is already registered.");
        return;
      }

      // Add new user to the list
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Redirect based on role
      if (role === "admin") {
        window.location.href = "Adming_Landing_books.html";
      } else if (role === "reader") {
        window.location.href = "Reader_Landing_Book.html";
      }
    }
  });

  function isStrongPassword(password) {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return pattern.test(password);
  }

  function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  }

  function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertText = document.getElementById("alert-message");
    const closeBtn = document.getElementById("close-alert");

    alertText.textContent = message;
    alertBox.classList.remove("hidden");

    closeBtn.onclick = () => {
      alertBox.classList.add("hidden");
    };
  }
});
