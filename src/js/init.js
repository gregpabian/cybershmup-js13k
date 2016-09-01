/* global width, height, sc:true, PLAYER:true, ENEMY, renderShip, waves,
makeWave, BULLET, renderBullet, startPos, makeGauge, makeLabel, dis,
makeButton, credits, gameplay, home, pause, select */

var cm = document.getElementById('m');
var cfx = document.getElementById('fx');
var cui = document.getElementById('ui');
var wrapper = document.getElementById('w');

cm.width = cui.width = cfx.width = width;
cm.height = cui.height = cfx.height = height;

var ctx = cm.getContext('2d');
var ctxUI = cui.getContext('2d');
var gl = cfx.getContext('webgl') || cfx.getContext('experimental-webgl');

// disable antialiasing
dis(ctxUI);

gl.viewport(0, 0, width, height);
gl.clearColor(0, 0, 0, 0);

function resize(ww, wh) {
  sc = Math.min(1 / Math.max(width / ww, height / wh), 1);

  wrapper.style.webkitTransform = 'scale(' + (sc) + ')';
  wrapper.style.top = ~~((wh - (height * sc)) / 2) + 'px';
  wrapper.style.left = ~~((ww - (width * sc)) / 2) + 'px';
}

resize(window.innerWidth, window.innerHeight);

// pre-render shapes
PLAYER = [PLAYER[0], renderShip(PLAYER)];

for (var enemy in ENEMY) {
  ENEMY[enemy] = [ENEMY[enemy][0], renderShip(ENEMY[enemy])];
}

for (var bullet in BULLET) {
  BULLET[bullet] = [BULLET[bullet][0], renderBullet(BULLET[bullet])];
}

var scenes = [gameplay, home, select];

var currentScene = 1;

// TODO load from local storage
var unlockedLevel = 5;
var health = 100;
var maxHealth = 100;
var energy = 0;
var maxEnergy = 100;
var weapon = 0;
var maxWeapon = 100;
var highscore = 0;
var score = 0;