/* ---------- Data ---------- */
const songs = [
  { id: "amurich-electronic", title: "Amurich Electronic", artist: "Sergey Safikanov" },
  { id: "chill-lofi", title: "Chill Lofi", artist: "Marek Zielinski" },
  { id: "kaazoom-light-and-shade-music", title: "Light and Shade", artist: "Paul Winter" },
  { id: "kulakovka-pop", title: "Kulakovka Pop", artist: "Tony Vodnik" },
  { id: "pads-and-chill-harmonium-music", title: "Pads and Chill Harmonium", artist: "Omar Faruque" },
  { id: "piano-and-strings", title: "Piano and Strings", artist: "Zakhar Valaha" },
  { id: "positive-chill", title: "Positive Chill", artist: "domin dejco.art" },
  { id: "the-mountain-music", title: "The Mountain", artist: "Dmitrii Kolesnikov" },
];

/* ----------State ---------- */
const audio = new Audio(); 
let currentSongIndex = 0; 

/* ---------- DOM references ---------- */
const coverEl = document.getElementById("cover");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const playlistEl = document.getElementById("playlist");

const coverWrapEl = document.querySelector(".player__cover");
const playBtn = document.getElementById("play");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const progressBar = document.getElementById("progress-bar");
const volumeEl = document.getElementById("volume");

/* ----------  Functions ---------- */
function loadSong(index) {
  currentSongIndex = index;
  const song = songs[index];

  audio.src = `assets/audio/${song.id}.mp3`;
  coverEl.src = `assets/images/${song.id}.jpg`;
  coverEl.alt = `Cover art for ${song.title}`;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;

  highlightActiveTrack();
}

function renderPlaylist() {
  playlistEl.innerHTML = "";

  songs.forEach((song, index) => {
    const row = document.createElement("li");
    row.className = "track";
    row.dataset.index = index;
    row.innerHTML = `
      <img class="track__cover" src="assets/images/${song.id}.jpg" alt="" />
      <div class="track__info">
        <span class="track__title">${song.title}</span>
        <span class="track__artist">${song.artist}</span>
      </div>
      <span class="track__duration">--:--</span>
    `;
    playlistEl.appendChild(row);
  });
}

  currentTimeEl.textContent = "0:00";
  durationEl.textContent = "0:00";
  progressBar.value = 0;
  setFill(progressBar);

function highlightActiveTrack() {
  const rows = playlistEl.querySelectorAll(".track");
  rows.forEach((row, index) => {
    row.classList.toggle("track--active", index === currentSongIndex);
  });
}

function playSong() {
  audio.play().catch((error) => {
    if (error.name !== "AbortError") console.error("Playback failed:", error);
  });
}

function pauseSong() {
  audio.pause();
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  const nextIndex = (currentSongIndex + 1) % songs.length;
  loadSong(nextIndex);
  playSong();
}

function prevSong() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(prevIndex);
  playSong();
}

function updatePlayState() {
  const isPlaying = !audio.paused;
  iconPlay.hidden = isPlaying;
  iconPause.hidden = !isPlaying;
  playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
  coverWrapEl.classList.toggle("is-playing", isPlaying);
}

// Turns 135.6 seconds into "2:15"
function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Paints the lime "filled" part of a slider (uses the --fill variable from the CSS)
function setFill(slider) {
  const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--fill", `${percent}%`);
}

function updateProgress() {
  if (!audio.duration) return; // metadata not loaded yet
  progressBar.value = (audio.currentTime / audio.duration) * 100;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  setFill(progressBar);
}

function showDuration() {
  durationEl.textContent = formatTime(audio.duration);
}

/* ---------- 5. Event listeners ---------- */
playlistEl.addEventListener("click", (event) => {
  const row = event.target.closest(".track");
  if (!row) return;
  loadSong(Number(row.dataset.index));
  playSong();
});

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

audio.addEventListener("play", updatePlayState);
audio.addEventListener("pause", updatePlayState);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("loadedmetadata", showDuration);

/* ---------- 6. Start the app ---------- */
renderPlaylist();
loadSong(0);