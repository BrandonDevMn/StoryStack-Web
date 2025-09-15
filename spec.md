# StoryShelf Web App Specification

## Overview

Build a Progressive Web App (PWA) called **StoryShelf** using vanilla HTML + JavaScript, optimized for iPads and iPhones, that randomly selects books from a "to be read" (TBR) list. The app should be installable on mobile devices and work as a standalone application.

## Development Guidelines

### Code Quality
- Write simple, easy to read, well-commented code
- Use only HTML, CSS, and JavaScript (no frameworks or libraries)
- Ensure code is self-documenting with clear variable and function names

## Core Functionality

### File Structure
- **Entry point:** `index.html`
- **App icon:** `icon.jpg` (expected to be present)
- Include `manifest.json` for PWA functionality
- Include `sw.js` (service worker) for offline support

### iOS PWA Requirements
- Support iOS "Add to Home Screen" functionality
- Include proper meta tags for iOS Safari
- Ensure responsive design for iPad and iPhone
- Handle iOS safe areas and notches

### UI/UX Requirements
- **Bottom Navigation:** Always include tabs at the bottom of the screen
- **Left Tab:** Main function of the app (primary feature) - Picker Tab (📚)
- **Right Tab:** About tab (app information, version, etc.) - About Tab (ℹ️)
- **Middle Tabs:** Additional features as needed
- Design should be touch-friendly with appropriate tap targets
- Follow iOS design patterns and conventions

### Technical Specifications
- Viewport meta tag optimized for iOS
- Apple-specific meta tags for PWA behavior
- Touch icon declarations
- Service worker for caching and offline functionality
- Responsive CSS for various iOS device sizes

### Tab Navigation System

- **Two-tab interface** with bottom navigation
- **Picker Tab** (📚) - Contains all book selection functionality (default active)
- **About Tab** (ℹ️) - Contains app information, source code link, and attribution
- **Touch-friendly tab buttons** with smooth transitions
- **Active state indicators** for current tab selection

### Input Processing

- Accept a list of books from the user via a textarea
- Split the text on newline characters (`\n`)
- Filter out empty lines (lines with only whitespace)
- Count the total number of books in the TBR list

### Random Selection

- Generate random numbers within the range of available books
- Select 3 different books for:
1. **Next Read** (priority book)
1. **Backup Choice** (secondary option)
1. **Alternative Pick** (third option)
- Ensure no duplicate selections (same book can’t be selected multiple times)

### Display Results

- Show the three selected books with clear visual hierarchy
- Use color-coded sections: green (Next Read), orange (Backup Choice), blue (Alternative Pick)
- Display them in priority order with descriptive labels
- Include a “Pick Again” button to generate new random selections from the same TBR list

## Technical Requirements

### Progressive Web App (PWA) Features

- **Installable on mobile devices** - Support iOS “Add to Home Screen” and Android “Install App”
- **Standalone mode** - Runs without browser UI when installed
- **App icon integration** - Uses `icon.jpg` from repository
- **Offline functionality** - Works without internet connection after initial load
- **Web App Manifest** - Properly configured for app stores and installation

### Platform Optimization

- **Mobile-first design** for iPads and iPhones
- **Responsive layout** that works on both portrait and landscape orientations
- **Touch-friendly interface** with minimum 56px touch targets
- **Vanilla HTML, CSS, and JavaScript only** - no frameworks or libraries

### Code Style

- Write **simple, readable code** with clear variable names
- Use **comments** to explain key functionality
- **Avoid complex patterns** - prioritize clarity over cleverness
- Use **modern but widely supported** JavaScript features

## User Interface Specifications

### Branding

- **App Name:** StoryShelf
- **Visual Identity:** Book-themed with purple gradient (#667eea to #764ba2)
- **Icon:** Use `icon.jpg` from repository
- **Tagline:** “What should I read next?”

### Layout Structure

```
[Tab Navigation]
  - 📚 Picker (active by default)
  - ℹ️ About

[Picker Tab Content:]
  [Header: "📚 StoryShelf"]
  [Subtitle: "What should I read next?"]
  [Large textarea for book list input with placeholder examples]
  [Pick My Next Books button]
  [Error message area (hidden by default)]
  [Loading message (hidden by default)]
  [Results section (hidden initially)]
    - Next Read: [selected book] (green theme)
    - Backup Choice: [selected book] (orange theme)
    - Alternative Pick: [selected book] (blue theme)
  [Pick Again button]

[About Tab Content:]
  [App description and purpose]
  [Link to source code repository]
  [Attribution: "Made by Claude"]
```

### Styling Requirements

- **Large, touch-friendly elements** (minimum 56px for interactive elements)
- **Clear visual hierarchy** with good contrast ratios
- **Readable fonts** using system font stack for mobile optimization
- **Responsive margins and padding** that work on different screen sizes
- **Book-themed design** with subtle literary touches
- **Smooth animations** for state transitions and user feedback
- **Color-coded book picks** for easy visual distinction

### Mobile-Specific Considerations

- Prevent zoom on input focus (`user-scalable=no`)
- Use appropriate input types and attributes
- Handle both portrait and landscape orientations gracefully
- Ensure the interface fits within mobile viewport without horizontal scrolling
- Auto-resize textarea based on content
- Support keyboard navigation where appropriate

## Progressive Web App Implementation

### Required Meta Tags

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="StoryShelf">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#667eea">
<link rel="apple-touch-icon" href="icon.jpg">
<link rel="icon" href="icon.jpg">
```

### Web App Manifest

- Configure app name, short name, and description
- Set display mode to “standalone”
- Define theme and background colors
- Specify icon configuration using `icon.jpg`
- Set primary orientation to portrait
- Include start URL and scope

### Installation Features

- Support iOS “Add to Home Screen” functionality
- Support Android “Install App” prompts
- Provide visual feedback when running in standalone mode
- Maintain app branding when installed

## Functional Requirements

### Input Validation

- Handle empty textarea with message: “Please add some books to your TBR list!”
- Handle lists with fewer than 3 books: “Add at least 3 books to get recommendations!”
- Trim whitespace from book titles before processing
- Support various book title formats (with authors, series numbers, etc.)

### Error Handling

- Display user-friendly error messages with book-specific context
- Handle edge cases gracefully (empty lines, special characters, very long titles)
- Provide clear visual feedback for all user actions
- Maintain app state during error conditions

### User Experience

- Show loading state with encouraging message: “Selecting your perfect reads…”
- Use intuitive button labels: “Pick My Next Books”, “Pick Again”
- Provide immediate visual feedback for all interactions
- Include motivational reading-themed messages
- Smooth transitions between app states
- Clear visual hierarchy for reading recommendations

## File Structure

Create the following files for better organization and maintainability:

### File Requirements
1. `index.html` - Main entry point with PWA meta tags and configuration
2. `icon.jpg` - App icon (180x180px recommended)
3. `manifest.json` - PWA manifest
4. `sw.js` - Service worker
5. CSS files for styling
6. JavaScript files for functionality

**index.html:**
- HTML structure with semantic markup
- PWA meta tags and configuration
- Embedded Web App Manifest (base64 encoded)
- References to external CSS and JavaScript files

**styles.css:**
- Reset and base styles
- Mobile-first responsive design
- Component-specific styling with clear organization
- Animation and transition definitions
- Purple gradient theme (#667eea to #764ba2)

**script.js:**
- Book processing and validation functions
- Random selection algorithm
- UI update and state management
- Tab navigation functionality
- Event listeners and initialization

**manifest.json:**
- PWA manifest configuration

**sw.js:**
- Service worker for offline support

External dependencies:

- `icon.jpg` - App icon file in repository

## Example User Flow

1. User discovers StoryShelf via web browser on iPhone/iPad
1. User adds StoryShelf to home screen for easy access
1. User opens StoryShelf as standalone app
1. User pastes or types their to-be-read list (one book per line)
1. User taps “Pick My Next Books” button
1. App displays three prioritized book selections with visual hierarchy
1. User can tap “Pick Again” to explore different combinations
1. User can return to app anytime via home screen icon

## Code Organization

### HTML Structure

- Semantic markup with proper accessibility considerations
- Clear section divisions for different app areas
- Proper form elements and labeling

### CSS Organization

- Reset and base styles
- Component-specific styling with clear comments
- Responsive design patterns
- Animation and transition definitions
- Mobile-optimized touch targets

### JavaScript Functions

- `processBookList()` - handle TBR list processing and validation
- `selectBooks()` - random book selection algorithm
- `displayBookPicks()` - update UI with selected books and styling
- `pickAgain()` - generate new book selections
- `showError()` / `hideError()` - error state management
- `showLoading()` / `hideLoading()` - loading state management
- Event listeners for user interactions

## Testing Considerations

### Functionality Testing

- Test with various book title formats (series, subtitles, author names)
- Test edge cases (empty input, single book, exactly 3 books, very long titles)
- Verify random selection algorithm prevents duplicates
- Test error handling and recovery

### Mobile Testing

- Test on both iPhone and iPad in different orientations
- Verify touch interactions work smoothly across different screen sizes
- Test PWA installation process on iOS and Android
- Verify standalone mode functionality
- Test offline capability after installation

### User Experience Testing

- Verify visual hierarchy is clear and intuitive
- Test loading states and transitions
- Ensure text remains readable at all screen sizes
- Validate color contrast meets accessibility standards

## Performance Requirements

- **Fast loading** - Single file under 200 lines total
- **Smooth animations** - 60fps transitions where possible
- **Responsive interactions** - Immediate feedback for user actions
- **Efficient random selection** - Handle lists of 100+ books smoothly
- **Memory efficient** - Minimal resource usage for mobile devices

## Book-Specific Features

### Input Enhancements

- Placeholder text with realistic book title examples
- Support for various title formats:
  - “Book Title by Author Name”
  - “Series Name #1: Book Title”
  - “Book Title (Series Name Book 1)”
  - Just “Book Title”

### Display Enhancements

- Use encouraging, book-themed language throughout
- Clear priority indicators that relate to reading decisions
- Motivational messages about reading and book discovery
- Visual design that evokes libraries and bookshelves

### User Experience Touches

- Frame selections as personalized reading recommendations
- Use language that helps with reading decision-making
- Provide context for each pick level (priority, backup, alternative)
- Encourage exploration of different book combinations

## Additional Notes

- Keep the codebase maintainable and well-documented
- Use consistent indentation (2 spaces recommended)
- Include brief comments explaining main logic blocks
- Ensure app works completely offline after initial load
- Design with reading enthusiasts in mind - the goal is helping people decide what to read next
- Consider the emotional aspect: users often feel overwhelmed by choice, so provide clear guidance
- Make the experience feel personal and encouraging rather than purely random

## Future Enhancement Considerations

While not required for initial implementation, consider these potential features:

- Local storage to remember recent book lists
- Reading progress tracking
- Book cover integration
- Goodreads API integration
- Reading goal features
- Social sharing of book picks

## Browser Support

- iOS Safari 12+
- Chrome Mobile 70+
- Samsung Internet 10+
- Focus on modern mobile browsers with PWA support
- Graceful degradation for older browsers (still functional, just not installable)

## Implementation Notes

When implementing this spec, ensure the app works seamlessly on iOS devices and can be added to the home screen for a native-like experience. Follow iOS design patterns and conventions throughout the application to provide users with a familiar interface that feels natural on their devices.