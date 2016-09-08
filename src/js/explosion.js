/* global explosions makeBatch EXPLOSION_IMG drawBatch dt updateBatchItem SOUNDS
SIZE_XXL playSound SIZE_S shakeCamera */

var explosionGrowthSpeed = 10;
var explosionColor = [255, 100, 0];

function addExplosion(x, y, size) {
  if (explosions[0].length >= explosions[2]) {
    explosions[0].shift();
  }

  explosions[0].push([
    [x, y], // pos x, y
    0, // current size
    size * 1.5, // size
    1, // alpha
    0, // animation timer
    1 // alive
  ]);

  playSound(SOUNDS[size < SIZE_S ? 3 : 4], true);
  if (size > SIZE_S) {
    shakeCamera(10);
  }
}

function makeExplosions(size) {
  return [
    [],
    makeBatch(EXPLOSION_IMG, size),
    size
  ];
}

function updateExplosions() {
  for (var i = 0, len = explosions[0].length; i < len; i++) {
    var explosion = explosions[0][i];

    if (explosion[5]) {
      explosion[4] += explosionGrowthSpeed * dt / 1000;

      // grow bigger
      if (explosion[4] <= 1) {
        explosion[1] = explosion[4] * explosion[2];
      } else {
        explosion[1] = explosion[2];
      }

      // start fade out
      if (explosion[4] > 1) {
        explosion[3] -= explosionGrowthSpeed * dt / 1000;
      }

      // kill
      if (explosion[3] <= 0) {
        explosion[5] = 0;
      }

      var s = explosion[1] / SIZE_XXL;

      updateBatchItem(explosions[1], i, explosion[0][0], explosion[0][1], 0, explosion[3], s, s, explosionColor);
    } else {
      explosions[0].splice(i, 1);
      len--;
      i--;
    }
  }
}

function drawExplosions() {
  drawBatch(explosions[1], explosions[0].length);
}