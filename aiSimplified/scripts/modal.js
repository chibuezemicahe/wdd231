class Modal {
    constructor() {
        // Get the modal element by ID
        this.modal = document.getElementById('infoModal');
        if (!this.modal) {
            console.error('Modal element not found');
            return;
        }
        
        this.closeBtn = this.modal.querySelector('.close-modal');
        this.title = this.modal.querySelector('#modalTitle');
        this.body = this.modal.querySelector('.modal-body');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button click
        this.closeBtn.addEventListener('click', () => this.close());
        
        // Click outside modal
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });
        
        // Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.close();
            }
        });
    }

    open(title, content) {
        this.title.textContent = title;
        this.body.innerHTML = content;
        this.modal.classList.add('active');
        this.closeBtn.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize modal
const modal = new Modal();

// Example usage:
// modal.open('Title', 'Content goes here');
