/* global SIZE_XS TWO_PI COLLECTIBLE adjustHex makeSprite dt height updateSprite
drawSprite collectibles kills boss enemyCount weaponLevel maxWeaponLevel */

var collectibleSpeed = 70;
var spawnChance = 50;
var collectibleTypes = Object.keys(COLLECTIBLE);
var collectiblePattern = 'eeweeweehe';
var collectibleBatch;
var dropEvery;

function seedCollectibles() {
  collectibleBatch = [];

  var patt = collectiblePattern;

  if (weaponLevel === maxWeaponLevel) {
    patt = patt.replace(/w/g, 'h');
  }

  for (var i = 0, len = boss ? 6 : 3; i < len; i++) {
    collectibleBatch.push.apply(collectibleBatch, patt.split(''));
  }

  dropEvery = ~~(enemyCount / collectibleBatch.length);
}

function trySpawningCollectible(position) {
  if (kills % dropEvery === 0 && collectibleBatch.length) {
    addCollectible(collectibleBatch.shift(), position);
  }
}

function addCollectible(type, position) {
  collectibles.push([
    makeSprite(COLLECTIBLE[type][1]), // sprite
    position[0], // start x
    position.slice(), // pos x,y
    type, // type
    1, // alive flag
    0 // animation timer
  ]);
}

function updateCollectibles() {
  var i = collectibles.length - 1;

  while (i >= 0) {
    updateCollectible(collectibles[i]);

    if (!collectibles[i][4]) {
      collectibles.splice(i, 1);
    }

    i--;
  }
}

function updateCollectible(collectible) {
  if (!collectible[4]) return;

  collectible[5] += dt / 1000;

  collectible[2][0] = collectible[1] + Math.sin(collectible[5]) * 30;
  collectible[2][1] += collectibleSpeed * dt / 1000;

  if (collectible[2][1] > height) {
    collectible[4] = 0;
  } else {
    updateSprite(collectible[0], collectible[2][0], collectible[2][1]);
  }
}

function drawCollectible(collectible) {
  drawSprite(collectible[0]);
}

function renderCollectible(collectible) {
  var color = collectible[0];

  var c = document.createElement('canvas');
  c.width = c.height = SIZE_XS;
  var ctx = c.getContext('2d');

  ctx.beginPath();
  var hs = SIZE_XS / 2;
  ctx.fillStyle = '#' + adjustHex(color, 0.3);
  ctx.strokeStyle = '#' + color;
  ctx.lineWidth = 2;
  ctx.arc(hs, hs, hs - 1, 0, TWO_PI, false);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#' + color;
  ctx.textAlign = 'center';
  ctx.font = '20px sans-serif';
  ctx.fillText(collectible[1], hs, SIZE_XS * 4 / 5);

  return c;
}