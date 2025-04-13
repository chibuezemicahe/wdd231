export default class Quiz {
    constructor() {
        this.questions = [];
        this.currentScore = 0;
        this.userAnswers = new Map();
        
        // DOM Elements
        this.quizContainer = document.querySelector('.quiz-container');
        this.resultsDiv = document.getElementById('quiz-results');
    }

    async loadQuestions() {
        try {
            const response = await fetch('/aiSimplified/data/quiz-questions.json');
            const data = await response.json();
            this.questions = data.questions;
            this.renderQuiz();
            
            // Store last quiz attempt date
            localStorage.setItem('lastQuizAttempt', new Date().toISOString());
        } catch (error) {
            console.error('Error loading quiz questions:', error);
            this.quizContainer.innerHTML = '<p>Error loading quiz. Please try again later.</p>';
        }
    }

    renderQuiz() {
        const form = document.getElementById('ai-quiz');
        form.innerHTML = ''; // Clear existing content

        this.questions.forEach((q, index) => {
            const questionHTML = `
                <div class="question" data-question-id="${q.id}">
                    <p>${q.question}</p>
                    ${q.options.map(option => `
                        <label>
                            <input type="radio" name="q${q.id}" value="${option}">
                            ${option}
                        </label>
                    `).join('')}
                    <div class="feedback hidden"></div>
                </div>
            `;
            form.insertAdjacentHTML('beforeend', questionHTML);
        });

        form.insertAdjacentHTML('beforeend', '<button type="submit" class="quiz-submit">Check Answers</button>');
        
        // Add submit event listener
        form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleSubmit(e) {
        e.preventDefault();
        this.currentScore = 0;
        this.userAnswers.clear();

        // Collect answers
        this.questions.forEach(q => {
            const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
            if (selected) {
                this.userAnswers.set(q.id, selected.value);
                if (selected.value === q.correctAnswer) {
                    this.currentScore++;
                }
            }
        });

        this.showResults();
    }

    showResults() {
        const totalQuestions = this.questions.length;
        const percentage = (this.currentScore / totalQuestions) * 100;
        
        // Store score in localStorage
        const scores = JSON.parse(localStorage.getItem('quizScores') || '[]');
        scores.push({
            date: new Date().toISOString(),
            score: this.currentScore,
            total: totalQuestions
        });
        localStorage.setItem('quizScores', JSON.stringify(scores));

        // Show results modal
        modal.open('Quiz Results', `
            <div class="quiz-results">
                <h3>Your Score: ${this.currentScore}/${totalQuestions} (${percentage.toFixed(1)}%)</h3>
                <div class="answers-review">
                    ${this.questions.map(q => `
                        <div class="review-item ${this.userAnswers.get(q.id) === q.correctAnswer ? 'correct' : 'incorrect'}">
                            <p><strong>Q: ${q.question}</strong></p>
                            <p>Your answer: ${this.userAnswers.get(q.id) || 'Not answered'}</p>
                            <p>Correct answer: ${q.correctAnswer}</p>
                            <p class="explanation">${q.explanation}</p>
                        </div>
                    `).join('')}
                </div>
                <button onclick="location.reload()" class="retry-btn">Try Again</button>
            </div>
        `);
    }
}