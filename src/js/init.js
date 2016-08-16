/* global width, height, scale, isMobile, makeShip, makeBackground */

var cm = document.getElementById('m');
var cfx = document.getElementById('fx');
var cui = document.getElementById('ui');
var wrapper = document.getElementById('w');

cm.width = cui.width = cfx.width = width;
cm.height = cui.height = cfx.height = height;

var ctx = cm.getContext('2d');
var ctxUI = cm.getContext('2d');
var gl = cfx.getContext('webgl') || cfx.getContext('experimental-webgl');

addEventListener(isMobile ? 'orientationchange' : 'resize', resize);

function resize() {
  var ww = window.innerWidth;
  var wh = window.innerHeight;
  
  scale = Math.min(1 / Math.max(width / ww, height / wh), 1);

  wrapper.style.webkitTransform = 'scale(' + (scale) + ')';
  wrapper.style.top = ~~((wh - (height * scale)) / 2) + 'px';
  wrapper.style.left = ~~((ww - (width * scale)) / 2) + 'px';
}

resize();

var player = makeShip([50, -0.5, 0.5, 0, -0.5, 0.5, 0.5], '#fff', width / 2, height / 2);

makeBackground();