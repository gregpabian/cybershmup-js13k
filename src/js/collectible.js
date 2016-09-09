/* global SIZE_XS TWO_PI COLLECTIBLE adjustHex makeSprite dt height updateSprite
drawSprite collectibles randomChance */

var collectibleSpeed = 50;
var spawnChance = 50;
var collectibleTypes = Object.keys(COLLECTIBLE);

function trySpawningCollectible(position) {
  // 10% chance of spawning
  if (!randomChance(spawnChance)) return;
  var type = collectibleTypes[~~(Math.random() * collectibleTypes.length)];
  addCollectible(type, position[0], position[1]);
}

function addCollectible(type, x, y) {
  var c = COLLECTIBLE[type];

  collectibles.push([
    makeSprite(c[1]), // sprite
    x, // start x
    [x, y], // pos x,y
    type, // type
    c[2], // value
    1, // alive flag
    0 // animation timer
  ]);
}

function updateCollectibles() {
  var i = collectibles.length - 1;

  while (i >= 0) {
    updateCollectible(collectibles[i]);

    if (!collectibles[i][5]) {
      collectibles.splice(i, 1);
    }

    i--;
  }
}

function updateCollectible(collectible) {
  if (!collectible[4]) return;
  var t = dt / 1000;

  collectible[6] += t;

  collectible[2][0] = collectible[1] + Math.sin(collectible[6]) * 30;
  collectible[2][1] += collectibleSpeed * t;

  if (collectible[2][1] > height) {
    collectible[5] = 0;
  } else {
    updateSprite(collectible[0], collectible[2][0], collectible[2][1]);
  }
}

function drawCollectibles() {
  collectibles.forEach(drawCollectible);
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