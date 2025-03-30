document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    
   
    document.getElementById('firstName').textContent = params.get('firstname') || 'N/A';
    document.getElementById('lastName').textContent = params.get('lastname') || 'N/A';
    document.getElementById('email').textContent = params.get('email') || 'N/A';
    document.getElementById('phone').textContent = params.get('phone') || 'N/A';
    document.getElementById('organization').textContent = params.get('organization') || 'N/A';
    
    const timestamp = params.get('timestamp');
    if (timestamp) {
        const date = new Date(timestamp);
        document.getElementById('timestamp').textContent = date.toLocaleString();
    } else {
        document.getElementById('timestamp').textContent = 'N/A';
    }
});