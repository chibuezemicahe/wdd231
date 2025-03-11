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
                    <img src="./images/${member.image}" alt="${member.name}">
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

document.addEventListener('DOMContentLoaded', function () {
    loadMembers();

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