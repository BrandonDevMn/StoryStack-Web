# StoryShelf Web App Specification

## Overview

Build a Progressive Web App (PWA) called **StoryShelf** using vanilla HTML + JavaScript, optimized for iPads and iPhones, that randomly selects books from a “to be read” (TBR) list. The app should be installable on mobile devices and work as a standalone application.

## Core Functionality

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
<!-- PWA Configuration -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="StoryShelf">
<meta name="mobile-web-app-capable" content="yes">
<meta name="theme-color" content="#667eea">

<!-- Icons -->
<link rel="icon" type="image/jpeg" href="icon.jpg">
<link rel="apple-touch-icon" href="icon.jpg">
<link rel="apple-touch-icon-precomposed" href="icon.jpg">
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

Create a single HTML file containing:

- HTML structure with semantic markup
- Embedded CSS in `<style>` tags with organized sections
- Embedded JavaScript in `<script>` tags with clear function separation
- Embedded Web App Manifest (base64 encoded)

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