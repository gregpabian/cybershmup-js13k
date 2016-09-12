/* global makeSprite MISSILE_IMG SIZE_XXS missiles drawSprite waves player dt
vectorDistance adjustHex getAngleBetweenVectors ENEMY collideCircles V_RIGHT
vectorRotate vectorMultiply vectorAdd updateSprite addExplosion isVectorOnScreen
width height TWO_PI normalizeAngle randomBoolean initialSeed */

var missileSpeed = 0.8;
var missileAngleSpeed = 6;

function addMissile(x, y) {
  missiles.push([
    makeSprite(MISSILE_IMG), // 0 - missile sprite
    [x, y], // 1 - pos x,y
    randomBoolean(initialSeed) ? Math.PI / 3 : Math.PI * 2 / 3, // 2 - rotation
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
  var t = dt / 1000;
  // find a target
  if (!missile[4] || missile[4][3] <= 0) {
    missile[4] = findClosestTargetInWaves();
  }

  // aim at the target
  if (missile[4] && missile[4][3] > 0) {
    var a = normalizeAngle(getAngleBetweenVectors(missile[1], missile[4][1]) - missile[2]);
    var d = Math.min(Math.abs(a), Math.abs(missileAngleSpeed * t)) * (a < 0 ? -1 : 1);
    missile[2] = normalizeAngle(missile[2] + d);
  }

  var v = vectorRotate(V_RIGHT, missile[2]);
  missile[3] += missileSpeed * t;
  missile[1] = vectorAdd(missile[1], vectorMultiply(v, missile[3]));

  if (isVectorOnScreen(missile[1], width, height)) {
    updateSprite(missile[0], missile[1][0], missile[1][1], missile[2]);
  } else {
    missile[5] = 0;
  }
}

function collideMissilesWithWaves() {
  waves.some(function (wave) {
    wave[3].some(function (enemy) {
      missiles.some(function (missile) {
        if (collideCircles(missile[1], SIZE_XXS, enemy[1], ENEMY[enemy[0]][0])) {
          // hit
          enemy[3] -= 3;
          missile[5] = 0;
          addExplosion(missile[1][0], missile[1][1], SIZE_XXS);
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

function drawMissile(missile) {
  drawSprite(missile[0]);
}

function renderMissile() {
  var c = document.createElement('canvas');
  c.width = c.height = SIZE_XXS;
  var ctx = c.getContext('2d');

  ctx.fillStyle = '#09f';
  ctx.moveTo(0, 0);
  ctx.lineTo(SIZE_XXS, SIZE_XXS / 2);
  ctx.lineTo(0, SIZE_XXS);
  ctx.fill();

  return c;
}