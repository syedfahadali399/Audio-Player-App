let audio = document.getElementById("audio-player")
let getAudio = document.getElementById("audio-file")
let previousBtn = document.getElementById("prev-btn")
let playPauseBtn = document.getElementById("play-pause-btn")
let nextBtn = document.getElementById("next-btn")
let resetBtn = document.getElementById("reset-btn")
let showAudioRange = document.getElementById("volume-slider")
let showcurrentTime = document.getElementById("current-time")
let showTotalDuration = document.getElementById("duration")
let showPlaylist = document.getElementById("playlist-list")
let addSongtoPlaylist = document.getElementById("add-song")
let playlistArray = []
let current_audio;
let currentIndex = 0;
let seconds = 0;
let minutes = 0;
let minStr;
let minSec;
let duration;
let totalminutes;
let totalseconds;
let interval;

let displayTime = () => {

    minStr = minutes.toString().padStart(2, '0')
    minSec = seconds.toString().padStart(2, '0')
    showcurrentTime.textContent = `${minStr}:${minSec}`
}

let timer = () => {

    if(!interval) {

        interval = setInterval(() => {
    
            displayTime()
    
            if(seconds === 59) {
                minutes++
                seconds = 0
            } else {
                seconds++
            }
        }, 1000)
    }

}

let pauseTimer = () => {
    clearInterval(interval)
    interval = null
}

function resetTimer() {
  clearInterval(interval);
  interval = null;
  seconds = 0;
  minutes = 0;
  updateDisplay();
}

playPauseBtn.addEventListener("click", () => {

    if (audio.paused) {
        timer()
        audio.play();
        playPauseBtn.textContent = "Pause ⏸️";
    } else {
        pauseTimer()
        audio.pause();
        playPauseBtn.textContent = "Play ▶️";
    }
});


resetBtn.addEventListener("click", (e) => {
    e.preventDefault()

    if(getAudio.value === "" || null || undefined) {
        resetBtn.textContent = "no audio to reset"
    } else {
        resetBtn.textContent = "Reseted"
        getAudio.value = ""
        audio.src = ""

        totalseconds = 0
        totalminutes = 0
        totalminutes = String(totalminutes).padStart(2, "0")
        totalseconds = String(totalseconds).padStart(2, "0");
        showTotalDuration.textContent = `${totalminutes}:${totalseconds}`;
        
        // resetTimer()
    }
    
    setTimeout(() => {
        resetBtn.textContent = "Reset"
    }, 2000)


})

getAudio.addEventListener("change", (e) => {

    let file = e.target.files[0];
    if (file) {
      let fileURL = URL.createObjectURL(file);
      audio.src = fileURL;
      current_audio = fileURL
      audio.load();
    }

});

audio.addEventListener("loadedmetadata", () => {

    duration = audio.duration;
    totalminutes = Math.floor(duration / 60);
    totalseconds = Math.floor(duration % 60);

    totalseconds = String(totalseconds).padStart(2, "0");
    totalminutes = String(totalminutes).padStart(2, "0")

    showTotalDuration.textContent = `${totalminutes}:${totalseconds}`;

})

showAudioRange.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

let showSong = (audio) => {

    let createElementDiv = document.createElement("div")
    let createElement = document.createElement("a")
    createElement.href = audio
    createElement.textContent = `${audio}`
    createElementDiv.appendChild(createElement)
    showPlaylist.insertAdjacentElement("beforeend", createElementDiv)
}

addSongtoPlaylist.addEventListener("click", (e) => {
    e.preventDefault()

    if(current_audio) {
        playlistArray.push(current_audio)
        showSong(current_audio)
        console.log(current_audio);
        console.log(playlistArray);
    }
    
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault()

    currentIndex++
    audio.src = playlistArray[currentIndex]
    audio.play()
})

previousBtn.addEventListener("click", (e) => {

    e.preventDefault()
    audio.src = playlistArray[currentIndex]
    audio.play()
})