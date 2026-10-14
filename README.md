``` # Music Player

A responsive music player built with plain HTML, CSS and JavaScript, with no frameworks or libraries.

![Music Player screenshot](docs\screenshot.png)

**[▶ Live demo](https://hope-022.github.io/music-player/)**

``` ## Features

- Play, pause, next and previous controls
- Song title, artist and duration display
- Progress bar with elapsed time, and click or drag to seek
- Volume control
- Clickable playlist with the current song highlighted
- Autoplay: the next song starts when one ends, and the playlist loops
- Spinning album cover while music plays
- Responsive layout for desktop and mobile
- Keyboard-accessible controls with screen reader labels  ```

``` ## Built with

- **HTML5**: semantic structure
- **CSS3**: custom properties, grid, flexbox, media queries
- **JavaScript (ES6+)**: the HTMLAudioElement API, DOM manipulation, event delegation
```
```## How to run

1. Clone the repository:
```bash
   git clone https://github.com/Hope-022/music-player.git
```
2. Open the folder and double-click `index.html`, or use the Live Server extension in VS Code.

No installation or build step is needed.
```

## Project structure

music-player/
├── index.html
├── style.css
├── script.js
├── assets/
│ ├── audio/
│ └── images/
└── docs/
└── screenshot.png
```


``## How it works

The `songs` array in `script.js` is the single source of truth. The player and the playlist are both built from it. A single `Audio` object plays the music, and the interface listens to its events (`play`, `pause`, `timeupdate`, `loadedmetadata`, `ended`) so the buttons, icons and progress bar always match the actual playback state.

```## Credits

Music from [Pixabay](https://pixabay.com/music/), used under the [Pixabay Content License](https://pixabay.com/service/license-summary/).

| Track | Artist |
|---|---|
| Amurich Electronic | Sergey Safikanov |
| Chill Lofi | Marek Zielinski |
| Light and Shade | Paul Winter |
| Kulakovka Pop | Tony Vodnik |
| Pads and Chill Harmonium | Omar Faruque |
| Piano and Strings | Zakhar Valaha |
| Positive Chill | domin dejco.art |
| The Mountain | Dmitrii Kolesnikov |

Cover images: (Unsplash photographers)

## Future improvements

- Shuffle and repeat modes
- Keyboard shortcuts (space to play and pause)
- Remember the last song and volume with `localStorage`
- Rebuild in React with TypeScript

## Author

**Chibudom Hope Idenyi**: [GitHub](https://github.com/Hope-022)
