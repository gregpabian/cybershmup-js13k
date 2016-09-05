/* global PLAYER ENEMY renderShip BULLET renderBullet gameplay home select
make2DProjection TURRET renderTurret width height BULLET_IMG:true hex2rgb */

var cm = document.getElementById('m');
var cui = document.getElementById('ui');
var wrapper = document.getElementById('w');

cm.width = cui.width = width;
cm.height = cui.height = height;

var ctxUI = cui.getContext('2d');
var gl = cm.getContext('webgl') || cm.getContext('experimental-webgl');

// pre-render shapes
PLAYER = [PLAYER[0], renderShip(PLAYER)];

var item;

for (item in ENEMY) {
  ENEMY[item] = [ENEMY[item][0], renderShip(ENEMY[item])];
}

for (item in TURRET) {
  TURRET[item][1] = renderTurret(TURRET[item]);
  // copy turrets to enemies
  ENEMY[item] = TURRET[item];
}

for (item in BULLET) {
  BULLET[item][0] = hex2rgb(BULLET[item][0]);
}

BULLET_IMG = renderBullet();

var projectionMatrix = make2DProjection(width, height);

var scenes = [gameplay, home, select];

var currentScene = 0;

// TODO load from local storage
var unlockedLevel = 9;
var health = 100;
var maxHealth = 100;
var energy = 0;
var maxEnergy = 100;
var weapon = 0;
var maxWeapon = 100;
var highscore = 0;
var score = 0;
