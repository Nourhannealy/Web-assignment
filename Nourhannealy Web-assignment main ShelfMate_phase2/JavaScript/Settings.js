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

    // ⏪ Load saved settings from localStorage
    const savedSettings = JSON.parse(localStorage.getItem('settings'));
    if (savedSettings) {
        document.getElementById('username').value = savedSettings.username || '';
        document.getElementById('email').value = savedSettings.email || '';
        themeSelect.value = savedSettings.theme || 'light';
        document.getElementById('notifications').value = savedSettings.notifications || 'all';
        if (soundSelect) soundSelect.value = savedSettings.sound || 'chime';
        applyTheme(savedSettings.theme || 'light');
    } else {
        applyTheme('light'); // Default theme
    }

    // 💾 Save settings on form submit
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const theme = themeSelect.value;
        const notifications = document.getElementById('notifications').value;
        const sound = soundSelect ? soundSelect.value : 'chime';

        // ✅ Validate email
        if (!validateEmail(email)) {
            showAlert("Please enter a valid email address.");
            return;
        }

        // Save to localStorage
        localStorage.setItem('settings', JSON.stringify({
            username,
            email,
            theme,
            notifications,
            sound
        }));

        applyTheme(theme);
        showAlert("Settings saved successfully!");
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
});
