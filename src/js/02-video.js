import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(e) {
  localStorage.setItem(STORAGE_KEY, e.seconds);
}

setCurrentTime();

function setCurrentTime() {
  if (localStorage.getItem(STORAGE_KEY)) {
      player.setCurrentTime(localStorage.getItem(STORAGE_KEY));
  }
}
