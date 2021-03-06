/* global wrapper clamp width height isMobile resize */

// screen scale, used to compute pointer position properly
var sc = 1;

var mx = -1;
var my = -1;
var kx = 0;
var ky = 0;
var clicked = 0;
var firstClick = 0;

var kl = 0;
var kr = 0;
var ku = 0;
var kd = 0;

var a1 = 0;
var a3 = 0;

function touchStart(event) {
  clicked = 1;
  firstClick = 1;
  touchMove(event);
}

function touchMove(event) {
  event.preventDefault();

  if (firstClick) {
    firstClick = 0;
  } else {
    clicked = 0;
  }

  var touch = event.touches ? event.touches[0] : event;
  var pos = wrapper.getBoundingClientRect();
  mx = clamp((touch.clientX - pos.left) / sc, 0, width);
  my = clamp((touch.clientY - pos.top) / sc, 0, height);
}

function touchEnd(event) {
  event.preventDefault();

  var touch = event.touches ? event.touches[0] : null;

  if (!touch) {
    clicked = 0;
    mx = my = -1;
  }
}

function handleKeyDown(event) {
  switch (event.which) {
    case 13: case 32: a1 = 1; break; // enter
    case 27: a3 = 1; break; // escape
    case 37: case 65: kl = 1; break; // left, a
    case 38: case 87: ku = 1; break; // up, w
    case 39: case 68: kr = 1; break; // right, d
    case 40: case 83: kd = 1; // down, s
  }
}

function handleKeyUp(event) {
  switch (event.which) {
    case 13: case 32: a1 = 0; break; // enter
    case 27: a3 = 0; break; // escape
    case 37: case 65: kl = 0; break; // left, a
    case 38: case 87: ku = 0; break; // up, w
    case 39: case 68: kr = 0; break; // right, d
    case 40: case 83: kd = 0; // down, s
  }
}

function handleKeys() {
  kx = ky = 0;

  if (kl) kx--;
  if (kr) kx++;
  if (ku) ky--;
  if (kd) ky++;
}