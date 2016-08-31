/* global cfx, wrapper, sc, clamp, width, height, isMobile, resize */

var mx = isMobile ? -1 : 0;
var my = isMobile ? -1 : 0;

var kl = 0;
var kr = 0;
var ku = 0;
var kd = 0;

var isFullScreen = true;
var a1 = false;
var a2 = false;
var a3 = false;

if (isMobile) {
  document.addEventListener('touchstart', touchMove);
  document.addEventListener('touchmove', touchMove);
  document.addEventListener('touchend', touchEnd);
  document.addEventListener('touchcancel', touchEnd);
} else {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

function touchMove(event) {
  event.preventDefault();

  if (!isFullScreen && document.body.webkitRequestFullScreen) {
    document.body.webkitRequestFullScreen();
    resize();
    isFullScreen = true;
  }

  var touch = event.touches[0];
  var pos = cfx.getBoundingClientRect();
  mx = clamp((touch.clientX - pos.left) / sc, 0, width);
  my = clamp((touch.clientY - 40 - pos.top) / sc, 0, height);
}

function touchEnd(event) {
  event.preventDefault();

  var touch = event.touches[0];

  if (!touch) {
    mx = my = -1;
  }
}

function handleKeyDown(event) {
  var dx = 0;
  var dy = 0;

  switch (event.which) {
    case 13: a2 = true; break; // enter
    case 27: a3 = true; break; // escape
    case 32: a1 = true; break; // space
    case 37: case 65: kl = 1; break; // left, a
    case 38: case 87: ku = 1; break; // up, w
    case 39: case 68: kr = 1; break; // right, d
    case 40: case 83: kd = 1; break; // down, s
  }

  mx = dx;
  my = dy;
}

function handleKeyUp(event) {
  switch (event.which) {
    case 13: a2 = false; break; // enter
    case 27: a3 = false; break; // escape
    case 32: a1 = false; break; // space
    case 37: case 65: kl = 0; break; // left, a
    case 38: case 87: ku = 0; break; // up, w
    case 39: case 68: kr = 0; break; // right, d
    case 40: case 83: kd = 0; break; // down, s
  }
}

function handleKeys() {
  mx = my = 0;

  if (kl) mx--;
  if (kr) mx++;
  if (ku) my--;
  if (kd) my++;
}