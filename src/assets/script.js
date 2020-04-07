const video = document.querySelector(".player__video");
const play = document.querySelector(".controler__play");
const pause = document.querySelector(".play__pause");
const start = document.querySelector(".play__start");

play.addEventListener("click", () => {
  video.paused ? video.play() : video.pause();
  pause.classList.toggle("is-visible");
  start.classList.toggle("is-visible");
});

video.addEventListener("ended", () => {
  video.currentTime = 0;
  pause.classList.remove("is-visible");
  start.classList.add("is-visible");
});

const volumeController = document.querySelector(".volume__controller input");
const volMute = document.querySelector(".volume__mute");
const volumeIndication = document.querySelector(".volume__indication");

let previousVolume;

video.volume = 0.5;
volumeController.value = 0.5;

const changeVolume = (e) => {
  video.volume = e.target.value;
  if (video.volume === 0) {
    volMute.classList.add("is-muted");
  } else {
    volMute.classList.remove("is-muted");
  }
  previousVolume = video.volume;
  volumeIndication.innerHTML = `${Math.round(video.volume * 100)}%`;
};

const muteVolume = () => {
  if (previousVolume === 0) {
    video.volume = 0.2;
    volumeController.value = 0.2;
  } else if (video.volume > 0) {
    video.volume = 0;
    volumeController.value = 0;
  } else {
    video.volume = previousVolume;
    volumeController.value = previousVolume;
  }
  volMute.classList.toggle("is-muted");
};

volumeController.addEventListener("mousemove", (e) => {
  changeVolume(e);
});
volumeController.addEventListener("click", (e) => {
  changeVolume(e);
});

volMute.addEventListener("click", muteVolume);

const controler = document.querySelector(".controler");
const progressbarContainer = document.querySelector(".progress-bar");
const progressBar = document.querySelector(".progress-bar__bar");
const timeProgression = document.querySelector(".progress-bar__time");
const timeIndication = document.querySelector(
  ".progress-bar__time--indication"
);

progressBar.addEventListener("click", (e) => {
  let mousePosition =
    e.clientX - (progressbarContainer.offsetLeft + controler.offsetLeft);
  progressBar.value = (mousePosition * 100) / progressBar.offsetWidth;
  video.currentTime = (video.duration * progressBar.value) / 100;
});

video.addEventListener("timeupdate", () => {
  let progressRate = (video.currentTime * 100) / video.duration;
  progressBar.value = progressRate;
  timeIndication.innerHTML = setTime(Math.floor(video.currentTime));
});

progressBar.addEventListener("mousemove", (e) => {
  let mousePosition =
    e.clientX - (progressbarContainer.offsetLeft + controler.offsetLeft);
  timeProgression.style.left = `${mousePosition}px`;
  let effectiveTimeProgression = Math.floor(
    (video.duration * mousePosition) / progressBar.offsetWidth
  );
  timeProgression.innerHTML = setTime(effectiveTimeProgression);
});

const setTime = (time) => {
  let minutes;
  let seconds;
  if (time < 60) {
    seconds = time >= 10 ? time.toString() : `0${time.toString()}`;
    minutes = "00";
  } else if (time >= 60) {
    let calculMinutes = Math.floor(time / 60);
    let calculSeconds = time - 60 * calculMinutes;
    seconds =
      calculSeconds >= 10
        ? calculSeconds.toString()
        : `0${calculSeconds.toString()}`;
    minutes =
      calculMinutes >= 10
        ? calculMinutes.toString()
        : `0${calculMinutes.toString()}`;
  }
  return `${minutes}:${seconds}`;
};
