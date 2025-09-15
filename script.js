// StoryShelf - Book Selection App
// DOM Elements
const bookListTextarea = document.getElementById('book-list');
const pickBooksButton = document.getElementById('pick-books');
const pickAgainButton = document.getElementById('pick-again');
const errorMessage = document.getElementById('error-message');
const loadingMessage = document.getElementById('loading-message');
const resultsSection = document.getElementById('results-section');
const nextReadBook = document.getElementById('next-read-book');
const backupBook = document.getElementById('backup-book');
const alternativeBook = document.getElementById('alternative-book');

// Navigation elements
const navButtons = document.querySelectorAll('.nav-button');
const tabContents = document.querySelectorAll('.tab-content');

// Global variables
let currentBookList = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeBookPicker();

    // Auto-resize textarea
    autoResizeTextarea(bookListTextarea);
});

// Navigation functionality
function initializeNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);

            // Update active nav button
            navButtons.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchTab(targetTabId) {
    // Hide all tab contents
    tabContents.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show target tab
    const targetTab = document.getElementById(targetTabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// Book picker functionality
function initializeBookPicker() {
    pickBooksButton.addEventListener('click', handlePickBooks);
    pickAgainButton.addEventListener('click', handlePickAgain);

    // Auto-resize textarea on input
    bookListTextarea.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
}

// Main book picking function
async function handlePickBooks() {
    const bookListText = bookListTextarea.value.trim();

    // Validate input
    if (!bookListText) {
        showError("Please add some books to your TBR list!");
        return;
    }

    // Process book list
    const books = processBookList(bookListText);

    // Validate processed books
    if (books.length < 3) {
        showError("Add at least 3 books to get recommendations!");
        return;
    }

    // Store current book list for "Pick Again"
    currentBookList = books;

    // Show loading state
    showLoading();
    hideError();
    hideResults();

    // Simulate processing time for better UX
    setTimeout(() => {
        const selectedBooks = selectBooks(books);
        displayBookPicks(selectedBooks);
        hideLoading();
        showResults();
    }, 1000 + Math.random() * 1000); // 1-2 second delay
}

// Handle "Pick Again" functionality
function handlePickAgain() {
    if (currentBookList.length < 3) {
        showError("Not enough books in your list!");
        return;
    }

    // Show loading state
    showLoading();
    hideError();

    // Select new books with shorter delay
    setTimeout(() => {
        const selectedBooks = selectBooks(currentBookList);
        displayBookPicks(selectedBooks);
        hideLoading();
    }, 500 + Math.random() * 500); // 0.5-1 second delay
}

// Process book list from textarea
function processBookList(bookListText) {
    return bookListText
        .split('\n')
        .map(book => book.trim())
        .filter(book => book.length > 0)
        .map(book => book.replace(/^\d+\.\s*/, '')); // Remove numbered list formatting
}

// Random book selection algorithm
function selectBooks(books) {
    if (books.length < 3) {
        throw new Error('Not enough books to select from');
    }

    // Create array of indices to avoid duplicates
    const availableIndices = Array.from({length: books.length}, (_, i) => i);
    const selectedBooks = [];

    // Select 3 different books
    for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * availableIndices.length);
        const bookIndex = availableIndices[randomIndex];
        selectedBooks.push(books[bookIndex]);

        // Remove selected index to prevent duplicates
        availableIndices.splice(randomIndex, 1);
    }

    return {
        nextRead: selectedBooks[0],
        backup: selectedBooks[1],
        alternative: selectedBooks[2]
    };
}

// Display selected books in the UI
function displayBookPicks(selectedBooks) {
    nextReadBook.textContent = selectedBooks.nextRead;
    backupBook.textContent = selectedBooks.backup;
    alternativeBook.textContent = selectedBooks.alternative;

    // Add fade-in animation to book picks
    const bookPicks = document.querySelectorAll('.book-pick');
    bookPicks.forEach((pick, index) => {
        pick.style.opacity = '0';
        pick.style.transform = 'translateY(20px)';

        setTimeout(() => {
            pick.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            pick.style.opacity = '1';
            pick.style.transform = 'translateY(0)';
        }, index * 150); // Stagger the animations
    });
}

// Error handling functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

    // Auto-hide error after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}

// Loading state functions
function showLoading() {
    loadingMessage.classList.remove('hidden');
    pickBooksButton.disabled = true;
    pickBooksButton.style.opacity = '0.6';
}

function hideLoading() {
    loadingMessage.classList.add('hidden');
    pickBooksButton.disabled = false;
    pickBooksButton.style.opacity = '1';
}

// Results display functions
function showResults() {
    resultsSection.classList.remove('hidden');

    // Scroll to results on mobile
    setTimeout(() => {
        resultsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

function hideResults() {
    resultsSection.classList.add('hidden');
}

// Auto-resize textarea functionality
function autoResizeTextarea(textarea) {
    // Reset height to auto to get correct scrollHeight
    textarea.style.height = 'auto';

    // Set height to scrollHeight with minimum and maximum constraints
    const minHeight = 200; // Minimum height in pixels
    const maxHeight = 400; // Maximum height in pixels
    const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight);

    textarea.style.height = newHeight + 'px';
}

// Utility functions for animation and user experience
function addRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effects to buttons
document.querySelectorAll('.primary-button, .secondary-button, .nav-button').forEach(button => {
    button.addEventListener('click', function(e) {
        addRippleEffect(this, e);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to pick books
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (!pickBooksButton.disabled && bookListTextarea.value.trim()) {
            handlePickBooks();
        }
    }

    // Tab navigation with keyboard
    if (e.key === 'Tab' && e.altKey) {
        e.preventDefault();
        const currentActiveNav = document.querySelector('.nav-button.active');
        const currentIndex = Array.from(navButtons).indexOf(currentActiveNav);
        const nextIndex = (currentIndex + 1) % navButtons.length;
        navButtons[nextIndex].click();
    }
});

// Handle app installation prompt (PWA)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();

    // Stash the event so it can be triggered later
    deferredPrompt = e;

    // Show install button/banner (could be implemented later)
    console.log('App can be installed');
});

// Handle app installation
window.addEventListener('appinstalled', (evt) => {
    console.log('App installed successfully');

    // Show success message
    showTemporaryMessage('StoryShelf installed successfully! 📚', 'success');
});

// Show temporary messages
function showTemporaryMessage(message, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `temporary-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#c6f6d5' : '#e6fffa'};
        color: ${type === 'success' ? '#22543d' : '#234e52'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-weight: 500;
        max-width: 90%;
        text-align: center;
        animation: slideInFade 0.3s ease-out;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOutFade 0.3s ease-out';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// Add CSS animations for temporary messages
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInFade {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }

    @keyframes slideOutFade {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Debug mode for development
if (window.location.hash === '#debug') {
    console.log('Debug mode enabled');

    // Add debug info to console
    window.storyShelfDebug = {
        currentBookList: () => currentBookList,
        processBookList: processBookList,
        selectBooks: selectBooks,
        version: '1.0.0'
    };

    console.log('Debug functions available:', window.storyShelfDebug);
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`StoryShelf loaded in ${Math.round(loadTime)}ms`);
    });
}

// Accessibility enhancements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
    `;
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Announce results to screen readers
function announceResults(selectedBooks) {
    const message = `Book recommendations selected: Next read is ${selectedBooks.nextRead}, backup choice is ${selectedBooks.backup}, alternative pick is ${selectedBooks.alternative}`;
    announceToScreenReader(message);
}

// Update displayBookPicks to include accessibility announcement
const originalDisplayBookPicks = displayBookPicks;
displayBookPicks = function(selectedBooks) {
    originalDisplayBookPicks(selectedBooks);
    announceResults(selectedBooks);
};