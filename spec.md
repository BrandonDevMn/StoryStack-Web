# Random Line Picker Web App Specification

## Overview

Build a simple vanilla HTML + JavaScript web application optimized for iPads and iPhones that randomly selects winners from a list of text entries.

## Core Functionality

### Input Processing

- Accept a block of text from the user via a textarea
- Split the text on newline characters (`\n`)
- Filter out empty lines (lines with only whitespace)
- Count the total number of valid lines

### Random Selection

- Generate random numbers within the range of available lines
- Select 3 different lines for:
1. Winner (1st place)
1. 2nd place
1. 3rd place
- Ensure no duplicate selections (same line can’t win multiple places)

### Display Results

- Show the three selected lines clearly labeled
- Display them in order: Winner, 2nd Place, 3rd Place
- Include a “Reroll” button to generate new random selections

## Technical Requirements

### Platform Optimization

- **Mobile-first design** for iPads and iPhones
- **Responsive layout** that works on both portrait and landscape orientations
- **Touch-friendly interface** with appropriately sized buttons and input areas
- **Vanilla HTML, CSS, and JavaScript only** - no frameworks or libraries

### Code Style

- Write **simple, readable code** with clear variable names
- Use **comments** to explain key functionality
- **Avoid complex patterns** - prioritize clarity over cleverness
- Use **modern but widely supported** JavaScript features

## User Interface Specifications

### Layout Structure

```
[Header: App Title]
[Large textarea for text input]
[Process/Start button]
[Results section (hidden initially)]
  - Winner: [selected line]
  - 2nd Place: [selected line] 
  - 3rd Place: [selected line]
[Reroll button]
```

### Styling Requirements

- **Large, touch-friendly elements** (minimum 44px touch targets)
- **Clear visual hierarchy** with good contrast
- **Readable fonts** appropriate for mobile devices
- **Responsive margins and padding** that work on different screen sizes
- **Simple, clean design** - avoid visual clutter

### Mobile-Specific Considerations

- Prevent zoom on input focus
- Use appropriate input types and attributes
- Handle both portrait and landscape orientations
- Ensure the interface fits within mobile viewport without horizontal scrolling

## Functional Requirements

### Input Validation

- Handle empty textarea (show appropriate message)
- Handle text with fewer than 3 lines (show error message)
- Trim whitespace from lines before processing

### Error Handling

- Display user-friendly error messages for invalid input
- Handle edge cases gracefully (empty lines, special characters, etc.)

### User Experience

- Show loading or processing state if needed
- Clear, intuitive button labels
- Immediate feedback for user actions
- Results should be easy to read and distinguish

## File Structure

Create a single HTML file containing:

- HTML structure
- Embedded CSS in `<style>` tags
- Embedded JavaScript in `<script>` tags

## Example User Flow

1. User opens the app on their iPhone/iPad
1. User pastes or types a list of names/items (one per line)
1. User taps “Pick Winners” button
1. App displays the three randomly selected winners
1. User can tap “Reroll” to select new winners from the same list

## Code Organization

- Keep HTML structure simple and semantic
- Group CSS by component/section with clear comments
- Organize JavaScript into logical functions:
  - `processText()` - handle input processing
  - `selectWinners()` - random selection logic
  - `displayResults()` - update UI with results
  - `reroll()` - generate new selections

## Testing Considerations

- Test with various text inputs (different lengths, special characters)
- Test on both iPhone and iPad in different orientations
- Test edge cases (empty input, single line, exactly 3 lines)
- Verify touch interactions work smoothly

## Additional Notes

- Keep the codebase under 200 lines total for simplicity
- Use consistent indentation (2 or 4 spaces)
- Include brief comments explaining the main logic
- Make the app work offline (no external dependencies)