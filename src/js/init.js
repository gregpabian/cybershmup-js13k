/* global width, height, sc:true, PLAYER:true, ENEMY, renderShip, waves,
makeWave, BULLET, renderBullet, startPos, makeGauge */

var cm = document.getElementById('m');
var cfx = document.getElementById('fx');
var cui = document.getElementById('ui');
var wrapper = document.getElementById('w');

cm.width = cui.width = cfx.width = width;
cm.height = cui.height = cfx.height = height;

var ctx = cm.getContext('2d');
var ctxUI = cui.getContext('2d');
var gl = cfx.getContext('webgl') || cfx.getContext('experimental-webgl');

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

// pre-render player and enemy shapes
PLAYER = [PLAYER[0], renderShip(PLAYER)];

for (var enemy in ENEMY) {
  ENEMY[enemy] = [ENEMY[enemy][0], renderShip(ENEMY[enemy])];
}

for (var bullet in BULLET) {
  BULLET[bullet] = [BULLET[bullet][0], renderBullet(BULLET[bullet])];
}

var player = [
  PLAYER[1], // player image
  PLAYER[0], // player size
  [].concat(startPos), // position vector
  [0, 0], // velocity vector
  1, // alive flag
  [] // bullets
];

var glitchGauge = makeGauge(width / 2 + 17, height, 480, '0cf', '022', 10, 0, -0.05);
var healthGauge = makeGauge(-20, 430, 300, '0d0', '020', 5, 0, -1.6);
var weaponGauge = makeGauge(480, 450, 300, 'f0c', '202', 10, 0, -1.53, 1);

var testLabel = makeLabel(100, 100, 'lorem ipsum', 'f0f', 3);

waves.push(makeWave(1, 'ss', 'z', 10));
waves.push(makeWave(1, 'ss', 'zm', 10));
waves.push(makeWave(9, 'ss', 'c', 10));
waves.push(makeWave(9, 'ss', 'cm', 10));
waves.push(makeWave(14, 'ss', 's', 10));
waves.push(makeWave(14, 'ss', 'sm', 10));
waves.push(makeWave(20, 'ss', 'a', 10));
waves.push(makeWave(20, 'ss', 'am', 10));
waves.push(makeWave(27, 'ss', 'ux', 10));
waves.push(makeWave(27, 'ss', 'umx', 10));
waves.push(makeWave(33, 'ss', '1', 10));
waves.push(makeWave(34, 'ss', '2', 10));
waves.push(makeWave(35, 'ss', '3', 10));
waves.push(makeWave(36, 'ss', '4', 10));
waves.push(makeWave(37, 'ss', '5', 10));
waves.push(makeWave(38, 'ss', '6', 10));
waves.push(makeWave(39, 'ss', '7', 10));

// waves.push(makeWave(1, 'ss', '1', 30));
// waves.push(makeWave(1, 'ss', '2', 30));
// waves.push(makeWave(1, 'ss', '3', 30));
// waves.push(makeWave(1, 'ss', '4', 30));
// waves.push(makeWave(1, 'ss', '5', 30));
// waves.push(makeWave(1, 'ss', '6', 30));
// waves.push(makeWave(1, 'ss', '7', 30));