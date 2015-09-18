window.addEventListener('load', function() {
	video = document.getElementById('video');
	pauseScreen = document.getElementById('screen');

  playButton = document.getElementById('play-btn');
  soundButton = document.getElementById('sound-btn');
  screenButton = document.getElementById('screen-btn');
  fullScreenButton = document.getElementById('full-btn');

  sbar = document.getElementById('sbar');
  sbarContainer = document.getElementById('sbar-container');
  pbar = document.getElementById('pbar');
  pbarContainer = document.getElementById('pbar-container');

  timeField = document.getElementById('time-field');
  
  video.load();
  video.addEventListener('canplay', function() {
  	updatePlayer();
  	playButton.addEventListener('click', playOrPause, false);
  	soundButton.addEventListener('click', muteOrUnmute, false);
  	screenButton.addEventListener('click', playOrPause, false); 
  	fullScreenButton.addEventListener('click', fullScreen, false);

  }, false);

  sbarContainer.addEventListener('click', changeVolume, false);
  pbarContainer.addEventListener('click', skipVideo, false);
}, false);


function playOrPause() {
	if(video.paused) {
		video.play();
		playButton.src = 'images/pause.png';
		update = setInterval(updatePlayer, 30);
		pauseScreen.style.display = 'none';
		screenButton.src = 'images/play.png';
	} else {
		video.pause();
		playButton.src = 'images/play.png';
		window.clearInterval(update);
		pauseScreen.style.display = 'block';
		screenButton.style.display = 'images/play.png';
	}
}

function muteOrUnmute() {
	if(!video.muted) {
		video.muted = true;
		soundButton.src = 'images/mute.png';
		sbar.style.display = 'none';
	} else {
		video.muted = false;
		soundButton.src = 'images/sound.png';
		sbar.style.display = 'block';
	}
}

function changeVolume(ev) {
	var mouseX = ev.pageX - sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');	
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width) * 100 + '%';
	video.muted = false;
	soundButton.src = 'images/sound.png';
	sbar.style.display = 'block';
}

function skipVideo(ev) {
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX/width) * video.duration;
	updatePlayer();
}

function updatePlayer() {
	var percentage = (video.currentTime/video.duration) * 100;
	pbar.style.width = percentage + '%';
	timeField.innerHTML = getFormattedTime();
	if(video.ended) {
		window.clearInterval(update);
		playButton.src = 'images/replay.png';
	}
}

function getFormattedTime() {
	var seconds = Math.round(video.currentTime);
	var minutes = Math.floor(seconds/60);
	if(minutes > 0) seconds -= minutes*60;
	if(seconds.toString().length === 1) seconds = '0' + seconds;

	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);

	if(totalMinutes > 0) totalSeconds -= totalMinutes*60;
	if(totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;
	return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function fullScreen() {
	if(video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullScreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	} else {
		alert("FullScreen is not avaliable!");
	}
}