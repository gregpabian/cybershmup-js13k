/* global TWO_PI BULLET dt width height vectorMultiply vectorAdd makeBatch V_RIGHT
vectorRotate SIZE_XXXS isVectorOnScreen BULLET_IMG updateBatchItem shakeCamera
drawBatch bullets waves player collideCircles ENEMY addExplosion health:true
score:true level addScore */

var bulletSpeed = 0.75;

function makeBullets(size) {
  return [
    [],
    makeBatch(BULLET_IMG, size),
    size
  ];
}

function addBullet(type, p, a, isPlayers, glitched) {
  // remove old bullets
  if (bullets[0].length === bullets[2]) {
    bullets[0].shift();
  }

  var bullet = [].concat(BULLET[type]);

  if (glitched) {
    bullet[0] = [100, 100, 100];
  }

  bullet.push(
    // 0 - color
    // 1 - damage
    // 2 - speed
    p, // 3 - bullet position
    vectorRotate(V_RIGHT, a), // 4 - velocity vector
    1, // 5 - alive state
    isPlayers,  // 6 - tells if that's a bullet from the player
    glitched// 7 - glitched
  );

  bullets[0].push(bullet);
  updateBatchItem(bullets[1], bullets[0].length - 1, bullet[3][0], bullet[3][1], 0, undefined, 1, 1, bullet[0]);
}

function updateBullets() {
  var bullet;

  for (var i = 0, len = bullets[0].length; i < len; i++) {
    bullet = bullets[0][i];
    updateBullet(bullet);

    if (bullet[5]) {
      updateBatchItem(bullets[1], i, bullet[3][0], bullet[3][1], 0, undefined, 1, 1, bullet[0]);
    // dispose dead bullet
    } else {
      bullets[0].splice(i, 1);
      len--;
      i--;
    }
  }
}

function updateBullet(bullet) {
  if (!bullet[5]) return;

  var d = vectorMultiply(bullet[4], bullet[2] * dt / 1000);

  bullet[3] = vectorAdd(bullet[3], d);

  // kill the bullet when it leaves the screen
  if (!isVectorOnScreen(bullet[3], width, height)) {
    bullet[5] = 0;
  }
}

function glitchBullet(bullet) {
  bullet[7] = 1;
  bullet[0] = [100, 100, 100];
}

function drawBullets() {
  drawBatch(bullets[1], bullets[0].length);
}

function collideBullets() {
  bullets[0].forEach(function (bullet) {
    if (!bullet[5]) return;

    // player's bullet - collide with enemies
    if (bullet[6]) {
      waves.some(function (wave) {
        return wave[3].some(function (enemy) {
          if (collideCircles(bullet[3], SIZE_XXXS, enemy[1], ENEMY[enemy[0]][0])) {
            bullet[5] = 0;
            if (enemy[6]) {
              enemy[3] = 0;
            } else {
              enemy[3] -= bullet[1];
            }

            addScore(enemy);
            return true;
          }
        });
      });
      // enemy bullet - collide with player
    } else if (health > 0) {
      // not glitched and collides
      if (!bullet[7] && collideCircles(bullet[3], SIZE_XXXS, player[2], player[1])) {
        bullet[5] = 0;
        health -= bullet[1];
        shakeCamera(5);
      }
    }

    if (!bullet[5]) {
      addExplosion(bullet[3][0], bullet[3][1], SIZE_XXXS);
    }
  });
}

function renderBullet(size) {
  var c = document.createElement('canvas');
  c.width = c.height = size;
  var ctx = c.getContext('2d');

  ctx.beginPath();
  var hs = size / 2;
  ctx.fillStyle = '#fff';
  ctx.arc(hs, hs, hs, 0, TWO_PI, false);
  ctx.fill();

  return c;
}