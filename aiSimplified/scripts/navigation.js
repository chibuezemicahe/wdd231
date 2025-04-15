document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
       
        menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
       
        menuToggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Add active class to current page link
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

