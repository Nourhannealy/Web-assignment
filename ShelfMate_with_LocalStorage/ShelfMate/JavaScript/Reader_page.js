fetch('Reader_Page.html')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load navbar: ' + response.statusText);
        }
        return response.text();
    })
    .then(data => {
        const navbarContent = data.split('<!--Navigation bar-->')[1].split('<!--Footer-->')[0];
        const footerContent = data.split('<!--Footer-->')[1];

        document.getElementById('navbar').innerHTML = navbarContent.trim();
        document.getElementById('footer').innerHTML = footerContent.trim();
    })
    .catch(error => console.error(error));
