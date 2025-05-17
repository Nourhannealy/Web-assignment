document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const logoutButton = document.querySelector('button[type="button"]');
    const themeSelect = document.getElementById('theme');
    const soundSelect = document.getElementById('sound');
    const soundPlayer = new Audio();

    // 🔁 Apply theme by setting body and form class
    const applyTheme = (theme) => {
        document.body.className = theme;
        form.className = theme;
    };

    // Set default theme to light if no saved settings exist
    applyTheme('light');

    // 💾 Handle settings on form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const theme = themeSelect.value;
        const notifications = document.getElementById('notifications').value;
        const sound = soundSelect ? soundSelect.value : 'chime';
        let gender = "";
        if (document.getElementById("dot-1").checked) gender = "Male";
        else if (document.getElementById("dot-2").checked) gender = "Female";
        else if (document.getElementById("dot-3").checked) gender = "Prefer not to say";

        // ✅ Validate email only when the user clicks "Save Changes"
          if (isEditing && editBtn.textContent === "Edit") {
        if (!validateEmail(email)) {
            showAlert("Please enter a valid email address.");
            return;
        }
    }

        applyTheme(theme);
        if (editBtn.textContent === "Edit" ){
        showAlert("Settings saved successfully!");}
    });

    // 🎨 Change theme live when selected
    themeSelect.addEventListener('change', function () {
        applyTheme(this.value);
    });

    // 🔊 Play notification sound when selected
    if (soundSelect) {
        soundSelect.addEventListener('change', function () {
            const selectedSound = this.value;

            if (selectedSound === 'none') {
                soundPlayer.pause();
                soundPlayer.currentTime = 0;
                return;
            }

            // ✅ Adjust this path if needed based on folder structure
            soundPlayer.src = `./NotificationSounds/${selectedSound}.wav`;
            soundPlayer.play().catch((err) => {
                console.error("Sound playback failed:", err);
            });
        });
    }


    // 🚪 Confirm before logging out
    logoutButton.addEventListener('click', function () {
        if (confirm('Are you sure you want to log out?')) {
            alert('Logged out successfully!');
            window.location.href = 'login.html'; // Update path if needed
        }
    });

    // ✅ Email validation
    function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}


    // ✅ Alert box display (requires HTML element with id="custom-alert")
    function showAlert(message, callback) {
        const alertBox = document.getElementById("custom-alert");
        const alertText = document.getElementById("alert-message");
        const closeBtn = document.getElementById("close-alert");

        if (alertBox && alertText && closeBtn) {
            alertText.textContent = message;
            alertBox.classList.remove("hidden");

            closeBtn.onclick = () => {
                alertBox.classList.add("hidden");
                if (callback) callback();
            };
        } else {
            // Fallback to default alert
            alert(message);
            if (callback) callback();
        }
    }

    const editBtn = document.getElementById('editBtn');
    const inputs = form.querySelectorAll('input, select');
    let isEditing = false;

    // Set initial state: disable all inputs except theme, notifications, and sound
    inputs.forEach(input => {
        if (input.id !== 'theme' && input.id !== 'notifications' && input.id !== 'sound') {
            input.disabled = true;
        }
    });

    editBtn.addEventListener('click', () => {
        isEditing = !isEditing;

        if (isEditing) {
            // Enable all inputs for editing
            inputs.forEach(input => input.disabled = false);
            editBtn.textContent = "Save Changes";
        } else {
            // Save logic could be enhanced (e.g., saving to localStorage or server)
            inputs.forEach(input => input.disabled = true);
            editBtn.textContent = "Edit";
            showToast("Changes saved!");
        }
    });

    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.textContent = message;
        toast.style.display = "block";
        setTimeout(() => {
            toast.style.display = "none";
        }, 3000);
    }
});