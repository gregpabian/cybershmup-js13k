/* global makeSprite MISSILE_IMG SIZE_XXXS missiles drawSprite waves player dt
vectorDistance adjustHex getAngleBetweenVectors ENEMY collideCircles V_RIGHT
vectorRotate vectorMultiply vectorAdd updateSprite addExplosion isVectorOnScreen
*/

var missileColor = [0, 150, 255];

function addMissile(x, y) {
  missiles.push([
    makeSprite(MISSILE_IMG), // 0 - missile sprite
    [x, y], // 1 - pos x,y
    0, // 2 - rotation
    5, // 3 - speed
    null, // 4 - target
    1 // 5 - alive flag
  ]);
}

function updateMissiles() {
  for (var i = 0, len = missiles.length; i < len; i++) {
    var missile = missiles[i];

    if (missile[5]) {
      updateMissile((missile));
    }

    if (!missile[5]) {
      missiles.splice(i, 1);
      len--;
      i--;
    }
  }
}

function updateMissile(missile) {
  if (missile[4] === null) {
    missile[4] = findClosestTargetInWaves();
  }

  if (missile[4] && missile[4][3] > 0) {
    missile[2] = -getAngleBetweenVectors(missile[1], missile[4][1]);
  }

  var v = vectorRotate(V_RIGHT, missile[2]);
  missile[3] += dt / 1000;
  missile[1] = vectorAdd(missile[1], vectorMultiply(v, missile[3]));

  if (isVectorOnScreen(missile[1], width, height)) {
    updateSprite(missile[0], missile[1][0], missile[1][1], missile[2], 1, 1, 1, missileColor);
  } else {
    missile[5] = 0;
  }
}

function collideMissilesWithWaves() {
  waves.some(function (wave) {
    wave[3].some(function (enemy) {
      missiles.some(function (missile) {
        if (collideCircles(missile[1], SIZE_XXXS, enemy[1], ENEMY[enemy[0]][0])) {
          // hit
          enemy[3] -= 3;
          missile[5] = 0;
          addExplosion(missile[1][0], missile[1][1], SIZE_XXXS);
          return true;
        }
      });
    });
  });
}

function findClosestTargetInWaves() {
  var minDistance = Infinity;
  var target = false;

  waves.forEach(function (wave) {
    wave[3].forEach(function (enemy) {
      var d = vectorDistance(player[2], enemy[1]);

      if (d < minDistance) {
        minDistance = d;
        target = enemy;
      }
    });
  });

  return target;
}

function drawMissiles() {
  missiles.forEach(drawMissile);
}

function drawMissile(missile) {
  drawSprite(missile[0]);
}

function renderMissile() {
  var c = document.createElement('canvas');
  c.width = c.height = SIZE_XXXS;
  var ctx = c.getContext('2d');

  ctx.strokeStyle = '#fff';
  ctx.fillStyle = '#' + adjustHex('fff', 0.4);
  ctx.lineWidth = 2;
  ctx.moveTo(1, SIZE_XXXS - 1);
  ctx.lineTo(SIZE_XXXS / 2, 1);
  ctx.lineTo(SIZE_XXXS - 1, SIZE_XXXS - 1);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  return c;
}