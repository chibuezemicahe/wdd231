

async function loadMembers() {
    try {
        const response = await fetch('./data/members.json'); // Adjust path if needed
        const members = await response.json();
        const membersList = document.getElementById('members-list');
        
        members.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('member-card');
            
            memberCard.innerHTML = `
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="member-info">
                    <h3>${member.name}</h3>
                    <p class="industry"><strong>Industry:</strong> ${member.industry}</p>
                    <p class="description">${member.description}</p>
                    <p class="address"><strong>Address:</strong> ${member.address}</p>
                    <p class="phone"><strong>Phone:</strong> ${member.phone}</p>
                    <p class="membership-level">
                        <strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}
                    </p>
                    <a href="${member.website}" target="_blank" class="visit-website">Visit Website</a>
                </div>
            `;
            
            membersList.appendChild(memberCard);
        });
    } catch (error) {
        console.error("Error loading members:", error);
    }
}

function getMembershipLevel(level) {
    const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
    return levels[level] || "Unknown";
}

async function loadSpotlightMembers() {
    try {
        const response = await fetch('./data/members.json');
        const members = await response.json();
        
        // Filter for gold (level 3) and silver (level 2) members
        const spotlightMembers = members.filter(member => 
            member.membershipLevel >= 2
        ).sort(() => Math.random() - 0.5).slice(0, 3); // Randomly select 3 members

        const spotlightContainer = document.getElementById('spotlightId');
        
        spotlightMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('spotlight-card');
            
            memberCard.innerHTML = `
                <div class="spotlight-image">
                    <img src="${member.image}" alt="${member.name}">
                </div>
                <div class="spotlight-content">
                    <h3>${member.name}</h3>
                    <p class="member-type">${member.membershipLevel === 3 ? 'Gold Member' : 'Silver Member'}</p>
                    <p class="description">${member.description}</p>
                    <a href="${member.website}" class="spotlight-link" target="_blank">Visit Website</a>
                </div>
            `;
            
            spotlightContainer.appendChild(memberCard);
        });
    } catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadMembers();
    loadSpotlightMembers();

    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');
    const membersContainer = document.getElementById('members-list');

    gridButton.addEventListener('click', function () {
        membersContainer.classList.remove('list-view');
        membersContainer.classList.add('members-grid');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });

    listButton.addEventListener('click', function () {
        membersContainer.classList.remove('members-grid');
        membersContainer.classList.add('list-view');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });
});
