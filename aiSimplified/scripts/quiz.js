import Quiz from './modules/Quiz.js';

document.addEventListener('DOMContentLoaded', () => {
    const quiz = new Quiz();
    quiz.loadQuestions();
    
    // Display last attempt info if available
    const lastAttempt = localStorage.getItem('lastQuizAttempt');
    if (lastAttempt) {
        const lastAttemptDate = new Date(lastAttempt);
        const now = new Date();
        const timeDiff = now - lastAttemptDate;
        const hoursSince = Math.floor(timeDiff / (1000 * 60 * 60));
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'last-attempt-info';
        
        if (hoursSince < 1) {
            infoDiv.textContent = 'Last attempt: Less than an hour ago';
        } else if (hoursSince < 24) {
            infoDiv.textContent = `Last attempt: ${hoursSince} hour${hoursSince === 1 ? '' : 's'} ago`;
        } else {
            const daysSince = Math.floor(hoursSince / 24);
            infoDiv.textContent = `Last attempt: ${daysSince} day${daysSince === 1 ? '' : 's'} ago`;
        }
        
        document.querySelector('.quiz-container').prepend(infoDiv);
    }
});
