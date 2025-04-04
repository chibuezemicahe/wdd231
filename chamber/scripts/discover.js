document.addEventListener('DOMContentLoaded', () => {
    displayWelcomeMessage();
    loadLocations();
});

function displayWelcomeMessage() {
    const lastVisit = localStorage.getItem('lastVisit');
    const currentDate = new Date().getTime();
    const welcomeMessage = document.getElementById('welcomeMessage');
    
    if (!lastVisit) {
        welcomeMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysSinceLastVisit = Math.floor((currentDate - lastVisit) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            welcomeMessage.textContent = "Back so soon! Awesome!";
        } else {
            welcomeMessage.textContent = `You last visited ${daysSinceLastVisit} day(s) ago.`;
        }
    }
    
    localStorage.setItem('lastVisit', currentDate);
}

async function loadLocations() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        const grid = document.querySelector('.discover-grid');
        
        data.locations.forEach(location => {
            const card = createLocationCard(location);
            grid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading locations:', error);
    }
}

function createLocationCard(location) {
    const article = document.createElement('article');
    article.className = 'location-card';
    
    article.innerHTML = `
        <figure>
            <img src="${location.image}" 
                 alt="${location.title}"
                 loading="lazy">
        </figure>
        <div class="content">
            <h2>${location.title}</h2>
            <address>${location.address}</address>
            <p>${location.description}</p>
            <button class="learn-more" onclick="window.location.href='${location.learnMoreUrl}'">
                Learn More
            </button>
        </div>
    `;
    
    return article;
}