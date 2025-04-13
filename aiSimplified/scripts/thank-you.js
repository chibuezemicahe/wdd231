document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const params = new URLSearchParams(window.location.search);
    
    // Display form submission details
    document.getElementById('displayName').textContent = params.get('fullName') || 'Not provided';
    document.getElementById('displayEmail').textContent = params.get('email') || 'Not provided';
    document.getElementById('displayCourse').textContent = formatCourseLevel(params.get('courseLevel'));
    document.getElementById('displayTime').textContent = formatPreferredTime(params.get('preferredTime'));
});

function formatCourseLevel(level) {
    const levels = {
        'beginner': 'Beginner - AI Fundamentals',
        'intermediate': 'Intermediate - Applied AI',
        'advanced': 'Advanced - AI Development'
    };
    return levels[level] || 'Not selected';
}

function formatPreferredTime(time) {
    const times = {
        'morning': 'Morning (9AM - 12PM)',
        'afternoon': 'Afternoon (1PM - 4PM)',
        'evening': 'Evening (5PM - 8PM)',
        'weekend': 'Weekend Classes'
    };
    return times[time] || 'Not selected';
}