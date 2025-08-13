// Information about tracks
let trackName = document.querySelector('.track-name');
let artistName = document.querySelector('.artist-name');
let trackArt = document.querySelector('.track-art');

// Buttons
let playPauseButton = document.querySelector('.playpause');
let prevButton = document.querySelector('.prev');
let nextButton = document.querySelector('.next');

// Volume
let volumeDownIcon = document.querySelector('.fa-volume-down');
let volumeSlider = document.querySelector('.volume-slider'); 
let volumeUpIcon = document.querySelector('.fa-volume-up');

// Progress bar
let currentTime = document.querySelector('.current-time');
let progressSlider = document.querySelector('.progress-slider');
let totalTime = document.querySelector('.total-time');

let currentTrackIndex = 0;
let isPlaying = false;
let updateTimer;

let currentTrack = document.createElement('audio');

let tracklist = [
  {
    name: "D>E>A>T>H>M>E>T>A>L",
    artist: "Panchiko",
    image: "art/deathmetal_art.png",
    path: "music/deathmetal_song.mp3",
  },
  
  {
    name: "Karma Police",
    artist: "Radiohead",
    image: "art/okComputer.png",
    path: "music/karmaPolice.mp3",
  },
  {
    name: "Fame < Infamy",
    artist: "Fall Out Boy",
    image: "art/Infinityonhigh.jpg",
    path: "music/fameInfamy.mp3",
  },
  {
    name: "Idle Worship",
    artist: "Paramore",
    image: "art/AL.png",
    path: "music/idleWorship.mp3",
  },
  {
    name: "Xerces",
    artist: "Deftones",
    image: "art/xerces_art.png",
    path: "music/xerces.mp3",
  }
];


function loadtrack(currentTrackIndex) {
    clearInterval(updateTimer);
    resetValues();

    currentTrack.src = tracklist[currentTrackIndex].path;
    currentTrack.load();

    trackArt.style.backgroundImage = "url(" + tracklist[currentTrackIndex].image + ")";
    trackName.textContent = tracklist[currentTrackIndex].name;
    artistName.textContent = tracklist[currentTrackIndex].artist;

    updateTimer = setInterval(progressBarUpdate, 1000);
    currentTrack.addEventListener("ended", nextTrack);  
}

function resetValues() {
    currentTime.textContent = "00:00";
    totalTime.textContent = "00:00";
    progressSlider.value = 0;
}

function playpause() {
    if (!isPlaying) {
        currentTrack.play();
        isPlaying = true;
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        updateTimer = setInterval(progressBarUpdate, 1000);
    } else {
        currentTrack.pause();
        isPlaying = false;
        playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        clearInterval(updateTimer);
    }
}

function prev() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
    } else {
        currentTrackIndex = tracklist.length - 1;
    }
    loadtrack(currentTrackIndex);
    
    if (isPlaying) {
        currentTrack.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function nextTrack() {
    next();
}

function next() {
    if (currentTrackIndex < tracklist.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    loadtrack(currentTrackIndex);
    
    if (isPlaying) {
        currentTrack.play();
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
}

function setProgress() {
    let seekto = currentTrack.duration * (progressSlider.value / 100);
    currentTrack.currentTime = seekto;
}

function setVolume() {
    currentTrack.volume = volumeSlider.value / 100;
}

function progressBarUpdate() {
    let barPosition = 0;

        if (!isNaN(currentTrack.duration)) {
        barPosition = currentTrack.currentTime * (100 / currentTrack.duration);
        progressSlider.value = barPosition;
        
        // Calculate current time display (minutes:seconds)
        let currentMinutes = Math.floor(currentTrack.currentTime / 60);
        let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
        
        // Calculate total duration display (minutes:seconds)
        let durationMinutes = Math.floor(currentTrack.duration / 60);
        let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);
        
        // Add leading zero to seconds if needed
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        
        // Update the time displays
        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalTime.textContent = durationMinutes + ":" + durationSeconds;
    }

}

// Initialize the player when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadtrack(currentTrackIndex);
});