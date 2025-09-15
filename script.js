// Global variables
let currentBooks = [];

// DOM elements
const bookListTextarea = document.getElementById('bookList');
const pickBooksBtn = document.getElementById('pickBooksBtn');
const pickAgainBtn = document.getElementById('pickAgainBtn');
const errorMessage = document.getElementById('errorMessage');
const loadingMessage = document.getElementById('loadingMessage');
const results = document.getElementById('results');
const nextReadEl = document.querySelector('#nextRead .pick-book');
const backupChoiceEl = document.querySelector('#backupChoice .pick-book');
const alternativePickEl = document.querySelector('#alternativePick .pick-book');

// Tab navigation elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Tab navigation functionality
function initTabNavigation() {
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button and corresponding content
      button.classList.add('active');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Process book list from textarea
function processBookList() {
  const bookText = bookListTextarea.value.trim();

  if (!bookText) {
    showError('Please add some books to your TBR list!');
    return [];
  }

  // Split on newlines and filter out empty lines
  const books = bookText
    .split('\n')
    .map(book => book.trim())
    .filter(book => book.length > 0);

  if (books.length < 3) {
    showError('Add at least 3 books to get recommendations!');
    return [];
  }

  return books;
}

// Generate random numbers without duplicates
function getRandomIndexes(max, count) {
  const indexes = [];

  while (indexes.length < count) {
    const randomIndex = Math.floor(Math.random() * max);
    if (!indexes.includes(randomIndex)) {
      indexes.push(randomIndex);
    }
  }

  return indexes;
}

// Select three random books from the list
function selectBooks(books) {
  const randomIndexes = getRandomIndexes(books.length, 3);

  return {
    nextRead: books[randomIndexes[0]],
    backupChoice: books[randomIndexes[1]],
    alternativePick: books[randomIndexes[2]]
  };
}

// Display the selected books in the UI
function displayBookPicks(picks) {
  nextReadEl.textContent = picks.nextRead;
  backupChoiceEl.textContent = picks.backupChoice;
  alternativePickEl.textContent = picks.alternativePick;

  results.style.display = 'block';
}

// Show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = 'block';
  hideLoading();
}

// Hide error message
function hideError() {
  errorMessage.style.display = 'none';
}

// Show loading message
function showLoading() {
  loadingMessage.style.display = 'block';
  hideError();
}

// Hide loading message
function hideLoading() {
  loadingMessage.style.display = 'none';
}

// Main function to pick books
function pickBooks() {
  hideError();
  showLoading();

  // Simulate brief loading delay for better UX
  setTimeout(() => {
    const books = processBookList();

    if (books.length === 0) {
      hideLoading();
      return;
    }

    currentBooks = books;
    const picks = selectBooks(books);

    hideLoading();
    displayBookPicks(picks);
  }, 800);
}

// Pick again with same book list
function pickAgain() {
  if (currentBooks.length === 0) return;

  showLoading();

  setTimeout(() => {
    const picks = selectBooks(currentBooks);
    hideLoading();
    displayBookPicks(picks);
  }, 600);
}

// Event listeners
function initEventListeners() {
  pickBooksBtn.addEventListener('click', pickBooks);
  pickAgainBtn.addEventListener('click', pickAgain);

  // Auto-resize textarea
  bookListTextarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.max(200, this.scrollHeight) + 'px';
  });

  // Hide error when user starts typing
  bookListTextarea.addEventListener('input', hideError);
}

// Initialize the app
function init() {
  initTabNavigation();
  initEventListeners();
}

// Start the app when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}