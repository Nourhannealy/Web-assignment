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

  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    let isValid = true;

   
    if (!validateEmail(email)) {
      showAlert("Please enter a valid email address.");
      isValid = false;
    }

  
    if (password.length === 0) {
      showAlert("Password cannot be empty.");
      isValid = false;
    }

    
    if (isValid) {
      showAlert("Login successful!", () => {
        form.submit(); 
      });
    }

  });

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
      if (callback) callback(); // Only runs if passed
    };
  }
  
});
