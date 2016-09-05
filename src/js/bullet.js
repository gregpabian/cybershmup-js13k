/* global TWO_PI BULLET dt width height vectorMultiply vectorAdd makeBatch
vectorRotate SIZE_XXXS isVectorOnScreen BULLET_IMG drawProgram updateBatchItem
drawBatch */

var bulletSpeed = 0.75;

function makeBullets(size) {
  return [
    [],
    makeBatch(BULLET_IMG, drawProgram, size),
    size
  ];
}

function addBullet(bullets, type, p, a, isPlayers) {
  // remove old bullets
  if (bullets[0].length === bullets[2]) {
    bullets[0].shift();
  }

  var bullet = [].concat(BULLET[type]);

  bullet.push(
    // 0 - color
    // 1 - damage
    p, // 2- bullet position
    vectorRotate([1, 0], a), // 3 - velocity vector
    1, // 4 - alive state
    isPlayers // 5 - tells if that's a bullet from the player
  );

  bullets[0].push(bullet);
}

function updateBullets(bullets) {
  var bullet;

  var i = bullets[0].length - 1;

  while (i >= 0) {
    bullet = bullets[0][i];
    updateBullet(bullet);

    // dispose dead bullet
    if (bullet[4]) {
      updateBatchItem(bullets[1], i, bullet[2][0], bullet[2][1], 0, undefined, 1, 1, bullet[0]);
    } else {
      bullets[0].splice(i, 1);
    }

    i--;
  }
}

function updateBullet(bullet) {
  if (!bullet[4]) return;

  var d = vectorMultiply(bullet[3], bulletSpeed * dt);

  bullet[2] = vectorAdd(bullet[2], d);

  // kill the bullet when it leaves the screen
  if (!isVectorOnScreen(bullet[2], width, height)) {
    bullet[4] = 0;
  }
}

function drawBullets(bullets) {
  drawBatch(bullets[1], bullets[0].length);
}

function renderBullet() {
  var c = document.createElement('canvas');
  c.width = c.height = SIZE_XXXS;
  var ctx = c.getContext('2d');

  ctx.beginPath();
  ctx.fillStyle = '#fff';
  var hs = SIZE_XXXS / 2;
  ctx.arc(hs, hs, hs, 0, TWO_PI, false);
  ctx.fill();

  return c;
}