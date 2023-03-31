import Vimeo from '@vimeo/player';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

 player.on('play', function () {
   console.log('played the video!');
 });

 player.getVideoTitle().then(function (title) {
   console.log('title:', title);
 });
