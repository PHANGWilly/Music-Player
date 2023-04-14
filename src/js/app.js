const volumeBtn = document.querySelector("#volume-btn");
const volumeInput = document.querySelector(".volume-range");
const volumeContainer = document.querySelector(".input-volume-container");

volumeBtn.addEventListener("click" , function(event) {
    volumeBtn.classList.toggle('active');
    volumeInput.classList.toggle('visible');
    volumeContainer.classList.toggle('visible');
    event.stopPropagation();
});

document.addEventListener('click', function(event) {
    if(volumeBtn.classList.contains('active')){
        volumeBtn.classList.remove('active')
    }
    if(volumeInput.classList.contains('visible')){
        volumeInput.classList.remove('visible')
    }

    if(volumeContainer.classList.contains('visible')){
        volumeContainer.classList.remove('visible')
    }
});

const audio = document.getElementById("music");

const durationSpan = document.querySelector(".music-duration");
const currentSpan = document.querySelector(".current-time");
const progressBar = document.querySelector(".progress-bar");

audio.addEventListener("loadedmetadata", function() {
  const duration = audio.duration;
  durationSpan.textContent = formatTime(duration);

  const currentTime = audio.currentTime;
  currentSpan.textContent = formatTime(currentTime);
});

const playBtn = document.querySelector(".player")
const iconPlayer = document.querySelector(".icon-player")
playBtn.addEventListener('click', () => {
    if(audio.paused){
        audio.play();
        iconPlayer.classList.remove("fa-play")
        iconPlayer.classList.add("fa-pause")
    }else{
        audio.pause();
        iconPlayer.classList.remove("fa-pause")
        iconPlayer.classList.add("fa-play")
    }
});

const replayBtn = document.querySelector(".btn-replay")
const lyrics = document.querySelectorAll('.lyrics p');

lyrics.forEach((lyric) => {
    lyric.addEventListener('click', () => {
      const debut = parseFloat(lyric.getAttribute('data-debut'));
      audio.currentTime = debut;
    });
});

audio.addEventListener("timeupdate", () => {
    const duration = audio.duration
    const time = audio.currentTime;
    currentSpan.textContent = formatTime(time);
    const progress = (time / duration) * 100;
    progressBar.style.width = `${progress}%`;

    
    lyrics.forEach(function(lyric) {
        const debut = parseFloat(lyric.getAttribute('data-debut'));
        const fin = parseFloat(lyric.getAttribute('data-fin'));
        
        if (time >= debut && time <= fin) {
          lyric.classList.add('active-lyrics');
        } else {
          lyric.classList.remove('active-lyrics');
        }
    });

    if(time === duration){
        replayBtn.disabled = false;
        replayBtn.classList.add("visible");
    }  

    replayBtn.addEventListener("click" , () => {
        audio.currentTime = 0;
        replayBtn.disabled = true;
        replayBtn.classList.remove("visible");
        audio.play();
    });
 
});




////////////////////////////////////////////////////////////////////////////////////

const iconVolume = document.querySelector(".icon-volume")
const volumeRange = document.querySelector(".volume-range");
audio.volume = 0.1;
volumeRange.addEventListener('input', function (){
    audio.volume = this.value;
    if(audio.volume >= 0.4){
        iconVolume.removeAttribute('class');
        iconVolume.setAttribute('class', 'icon-volume fas fa-volume-up')
    }else if(audio.volume > 0.1){
        iconVolume.removeAttribute('class');
        iconVolume.setAttribute('class', 'icon-volume fa-solid fa-volume-low')
    }
    if(audio.volume <= 0){
        iconVolume.removeAttribute('class');
        iconVolume.setAttribute('class', 'icon-volume fa-solid fa-volume-xmark')
    }
})

/////////////////////////////////////////////////////////////////////////////////////////////////
const audioSlider = document.querySelector('.audio-slider');

audioSlider.addEventListener('mousedown', function(event) {
    const containerWidth = audioSlider.offsetWidth;
    const mouseX = event.clientX - audioSlider.offsetLeft;
    const progressPercent = mouseX / containerWidth;
  
    progressBar.style.width = `${progressPercent * 100}%`;
  
    const audioDuration = audio.duration;
    const currentTime = audioDuration * progressPercent;
    audio.currentTime = currentTime;
  
    document.addEventListener('mousemove', moveProgressBar);
    document.addEventListener('mouseup', stopMovingProgressBar);
});
  
function moveProgressBar(event) {
    const containerWidth = audioSlider.offsetWidth;
    const mouseX = event.clientX - audioSlider.offsetLeft;
    const progressPercent = mouseX / containerWidth;
  
    progressBar.style.width = `${progressPercent * 100}%`;
}
  
function stopMovingProgressBar(event) {
    const containerWidth = audioSlider.offsetWidth;
    const mouseX = event.clientX - audioSlider.offsetLeft;
    const progressPercent = mouseX / containerWidth;
  
    progressBar.style.width = `${progressPercent * 100}%`;
  
    const audioDuration = audio.duration;
    const currentTime = audioDuration * progressPercent;
    audio.currentTime = currentTime;
  
    document.removeEventListener('mousemove', moveProgressBar);
    document.removeEventListener('mouseup', stopMovingProgressBar);
}

//////////////////////////////////////////////////////////////////////////
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}