/* global PLAYER ENEMY renderShip BULLET renderBullet gameplay home select
make2DProjection TURRET renderTurret width height BULLET_IMG:true hex2rgb
EXPLOSION_IMG:true SIZE_XXXS SIZE_XXL SOUNDS makeSound localStorage COLLECTIBLE
renderCollectible GLITCH_IMG:true renderGlitch MISSILE_IMG:true renderMissile */

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
  ENEMY[item][1] = renderShip(ENEMY[item]);
}

for (item in COLLECTIBLE) {
  COLLECTIBLE[item][1] = renderCollectible(COLLECTIBLE[item]);
}

for (item in TURRET) {
  TURRET[item][1] = renderTurret(TURRET[item]);
  // copy turrets to enemies
  ENEMY[item] = TURRET[item];
}

for (item in BULLET) {
  BULLET[item][0] = hex2rgb(BULLET[item][0]);
}

for (item in SOUNDS) {
  SOUNDS[item] = makeSound(SOUNDS[item]);
}

BULLET_IMG = renderBullet(SIZE_XXXS);

EXPLOSION_IMG = renderBullet(SIZE_XXL);

GLITCH_IMG = renderGlitch();

MISSILE_IMG = renderMissile();

var projectionMatrix = make2DProjection(width, height);
var scenes = [gameplay, home, select];

var currentScene = 0; loaded = true;

var health = 5;
var maxHealth = 5;
var energy = 0;
var maxEnergy = 10;
var weapon = 0;
var maxWeapon = 7;
var highscore = 0;
var score = 0;
var level = 0;

var weaponLevel = +localStorage.getItem('cswl') || 0;// weaponLevel = 5;
var unlockedLevel = +localStorage.getItem('csul') || 0;
var soundOn = localStorage.getItem('css');
soundOn = soundOn === null ? 1 : +soundOn;
var highQuality = localStorage.getItem('csq');
highQuality = highQuality === null ? 1 : +highQuality;
