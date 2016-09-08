/* global TWO_PI getPathPosition dt hex2rgba addBullet ENEMY WEAPON player
getAngleBetweenVectors adjustHex ENEMY_WEAPON playSound SOUNDS */

function makeEnemy(type, x, y, speed) {
  var weapon;
  var rof = null;

  // turret shoot every 2 seconds
  if (type[0] === 't') {
    rof = 2000;
    // use a weapon's rof
  } else if ((weapon = getWeapon(type))) {
    rof = weapon[1];
  }

  return [
    type, // 0 - enemy type
    [x, y], // 1 - position
    0, // 2 - position along the path
    ENEMY[type][2], // 3 - hp
    rof, // 4 - shot timer
    speed // 5 - enemy movement speed
    // 6 - glitched
  ];
}

function getWeapon(enemyType) {
  return ENEMY_WEAPON[ENEMY[enemyType][3]];
}

function updateEnemy(enemy, path) {
  if (enemy[3] <= 0) return;

  enemy[2] += enemy[5] * dt / 4000;

  if (enemy[2] * 4 > path.length) {
    enemy[3] = -1000; // hp = 0 = dead
    return;
  }

  enemy[1] = getPathPosition(path, enemy[2]);
  enemy[4] -= dt;

  if (enemy[4] <= 0) {
    shootEnemy(enemy);
  }
}

function shootEnemy(enemy) {
  if (enemy[4] === undefined) return;

  var weapon;

  if (enemy[0][0] === 't') {
    weapon = ENEMY[enemy[0]];
    for (var a = weapon[5] || 0; a < TWO_PI; a += weapon[4]) {
      addBullet(weapon[3] + 3, enemy[1], a, 0, enemy[6]);
    }
     enemy[4] = 2000;
  } else if (( weapon = getWeapon(enemy[0]))) {
    addBullet(weapon[0], enemy[1], -getAngleBetweenVectors(enemy[1], player[2]), 0, enemy[6]);
    enemy[4] = weapon[1];
  } else {
    return;
  }

  playSound(SOUNDS[5], true);
}

function glitchEnemy(enemy) {
  enemy[6] = 1;
}

function renderShip(ship) {
  var c = document.createElement('canvas');
  var size = ship[0];
  var shape = ship[1];
  c.width = c.height = size + 4;
  var ctx = c.getContext('2d');

  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  // center canvas
  ctx.translate(c.width / 2, c.height / 2);

  for (var i = 0; i < shape.length; i += 2) {
    if (typeof shape[i] === 'string') {
      // close previous shape
      if (i > 0) {
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#' + shape[i];

      var fillColor = adjustHex(shape[i], 0.5);

      ctx.fillStyle = '#' + fillColor;
      // skip the shape color
      i++;
      ctx.moveTo(shape[i] * size, shape[i + 1] * size);
    } else {
      ctx.lineTo(shape[i] * size, shape[i + 1] * size);
    }
  }
  // close final shape
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // draw collider
  // TODO: remove
  // ctx.beginPath();
  // ctx.arc(0, 0, size / 2, 0, TWO_PI);
  // ctx.strokeStyle = '#69c';
  // ctx.lineWidth = 2;
  // ctx.stroke();

  return c;
}

function renderTurret(turret) {
  var size = turret[0];
  var d = Math.ceil(size * Math.sqrt(2) + 4);
  var i = 0;

  var c = document.createElement('canvas');
  c.width = c.height = d;
  var ctx = c.getContext('2d');
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#' + turret[1];
  ctx.fillStyle = '#' + adjustHex(turret[1], 0.5);
  ctx.save();
  ctx.translate(d / 2, d / 2);
  ctx.rotate(Math.PI / 4);
  do {
    ctx.beginPath();
    ctx.rect(-size / 2, -size / 2, size, size);
    ctx.stroke();
    ctx.fill();
    ctx.rotate(Math.PI / 6);
  } while (++i < 3);
  ctx.restore();
  ctx.beginPath();
  ctx.arc(d / 2, d / 2, size / 2, 0, TWO_PI, false);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(d / 2, d / 2, size / 6, 0, TWO_PI, false);
  ctx.fillStyle = hex2rgba('f0f', 0.4);
  ctx.strokeStyle = '#f0f';
  ctx.fill();
  ctx.stroke();

  return c;
}