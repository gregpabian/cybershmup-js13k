/* global mx my kx ky dt vectorAdd isMobile vectorNormalize vectorDistance waves
vectorMultiply vectorSubtract width height PLAYER makeSprite player:true
drawSprite updateSprite addBullet WEAPON weaponLevel collideCircles ENEMY
health:true playSound SOUNDS collectibles SIZE_XS addHealth addWeapon addEnergy
addMissile wavesHaveActiveShips */

var followSpeed = 100;
var drag = 0.8;
var shotTimer = 0;
var missileTimer = 0;
var startPos = [width / 2, height - 100];

function makePlayer() {
  var sprite = makeSprite(PLAYER[1]);
  updateSprite(sprite, 0, 0, 0, 1, 1, 1);

  player = [
    sprite, // player sprite
    PLAYER[0], // player size
    [].concat(startPos), // position vector
    [0, 0] // velocity vector
  ];
}

function updatePlayer() {
  var t = dt / 1000;
  var v = [0, 0];

  if (isMobile) {
    var mmy = my - 50;
    if (mx >= 0 && my >= 0) {
      var r = vectorDistance(player[2], [mx, mmy]);

      v = vectorSubtract([mx, mmy], player[2]);
      v = vectorNormalize(v);
      v = vectorMultiply(v, followSpeed);

      // dampening
      if (r < 15) {
        v = vectorMultiply(v, r / width);
      }
    }
  } else {
    v = vectorNormalize([kx, ky]);
    v = vectorMultiply(v, followSpeed);
  }

  // update speed vector
  player[3] = vectorAdd(player[3], v);

  // apply drag
  player[3] = vectorMultiply(player[3], drag);

  // calculate movement vector
  var d = vectorMultiply(player[3], t);

  // constrain to screen boundaries
  var size = player[1];
  var e = player[2][0] + d[0] - size / 2;

  if (e < 0) {
    d[0] -= e;
  }

  e = player[2][0] + d[0] + size / 2;

  if (e > width) {
    d[0] -= e - width;
  }

  e = player[2][1] + d[1] - size / 2;

  if (e < 0) {
    d[1] -= e;
  }

  e = player[2][1] + d[1] + size;

  if (e > height) {
    d[1] -= e - height;
  }

  // move to new position
  player[2] = vectorAdd(player[2], d);

  updateSprite(player[0], player[2][0], player[2][1]);

  shotTimer -= dt;

  var weapon = WEAPON[weaponLevel];

  if (shotTimer <= 0) {
    shotTimer = weapon[1];
    playerShoot(player, weapon);
    playSound(SOUNDS[1], true);
  }

  if (weaponLevel < 5) return;

  missileTimer -= dt;

  if (missileTimer <= 0 && wavesHaveActiveShips()) {
    missileTimer = weapon[5];
    addMissile(player[2][0], player[2][1]);
    playSound(SOUNDS[1], 1, 1);
  }
}

function playerShoot(player, weapon) {
  var guns = weapon.slice(2);

  for (var i = 0; i < guns.length; i++) {
    var a = guns[i][0];
    var o = guns[i][1] || [0, 0];

    addBullet(weapon[0], vectorAdd(player[2], vectorMultiply(o, player[1])), a, 1);
  }
}

function collidePlayerWithWaves() {
  waves.forEach(function (wave) {
    // collide active enemies with player
    wave[3].forEach(function (enemy) {
      if (enemy[3] <= 0) return;
      if (collideCircles(player[2], player[1], enemy[1], ENEMY[enemy[0]][0])) {
        enemy[3] = 0;
        if (!enemy[6]) health = 0;
      }
    });
  });
}

function collidePlayerWithCollectibles() {
  collectibles.forEach(function (collectible) {
    if (collideCircles(player[2], player[1], collectible[2], SIZE_XS)) {
      var fn;

      switch (collectible[3]) {
        case 'h': fn = addHealth; break;
        case 'w': fn = addWeapon; break;
        case 'e': fn = addEnergy; break;
      }

      fn();
      collectible[4] = 0;
    }
  });
}