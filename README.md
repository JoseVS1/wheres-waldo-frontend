# Where's Waldo Game
An interactive "Where's Waldo" game built with React and Vite that challenges players to find hidden characters in a detailed image.

## Overview
This Where's Waldo game is a front-end application that integrates with a backend API to create an engaging, interactive experience. Players must find and identify characters hidden within a large, detailed image while a timer tracks their completion time.

## Features
- **Interactive Gameplay**: Click on the image to find hidden characters
- **Character Selection**: Select characters from a dropdown menu when you think you've found them
- **Real-time Validation**: Instant feedback when a character is correctly identified
- **Position Markers**: Visual indicators showing found characters
- **Timer System**: Tracks completion time for competitive play
- **Highscore Tracking**: Save and display the best completion times
- **Responsive Design**: Works on both desktop and mobile devices
- **Success Animation**: Confetti animation when all characters are found

## Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **UI Components**: Custom components with Floating UI for dropdowns
- **Icons**: FontAwesome for markers and UI elements
- **Animations**: React Confetti for celebration animations
- **API Integration**: Fetch API for backend communication
- **Styling**: CSS with media queries for responsiveness

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/JoseVS1/wheres-waldo-frontend.git
   cd wheres-waldo-frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Project Structure
```
├── src
│   ├── components
│   │   ├── Circle.jsx
│   │   ├── Dropdown.jsx
│   │   ├── Marker.jsx
│   │   ├── Navbar.jsx
│   │   ├── NotificationBox.jsx
│   │   ├── Stopwatch.jsx
│   │   └── SuccessScreen.jsx
│   ├── hooks
│   │   └── useNotification.js
│   ├── App.jsx
│   ├── fontawesome.js
│   └── main.jsx
├── index.html
└── styles.css
```

## Game Components

### Core Components
- **App.jsx**: Main game component that orchestrates the game flow
- **Circle.jsx**: Creates a circle when clicking on the image to indicate selection
- **Dropdown.jsx**: Character selection menu that appears after clicking
- **Marker.jsx**: Permanent marker placed on the map when a character is found
- **Navbar.jsx**: Navigation bar containing the game title and timer
- **Stopwatch.jsx**: Timer component tracking game duration
- **SuccessScreen.jsx**: End game screen with highscore submission

### Custom Hooks
- **useNotification.js**: Hook for managing notification messages

## Game Flow
1. Player views the image and searches for hidden characters
2. Player clicks on a spot where they think a character is located
3. A selection circle appears with a dropdown menu of available characters
4. Player selects the character they think they've found
5. The game validates the position and provides feedback
6. If correct, a marker is placed and the character is removed from the list
7. When all characters are found, the game ends and displays the completion time
8. Player can submit their name if they achieve a new highscore

## API Integration
The frontend communicates with the backend API to:
- Fetch character data
- Validate character positions
- Retrieve and submit highscores

Example API call:
```javascript
const fetchCharacters = async () => {
  try {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/characters`);
    const data = await response.json();
    setCharacters(data.characters);
  } catch (err) {
    console.error(err);
  }
}
```

## Responsive Design
The application is designed to work on multiple device sizes:
- Desktop: Full-size experience
- Tablet: Adjusted layout for medium screens
- Mobile: Optimized for small screens with adjusted UI elements

## Building for Production
1. Create a production build:
   ```
   npm run build
   ```
2. Preview the production build:
   ```
   npm run preview
   ```

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
