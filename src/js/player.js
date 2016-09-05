/* global mx my kx ky dt vectorAdd isMobile vectorNormalize vectorDistance
vectorMultiply vectorSubtract width height PLAYER drawProgram makeSprite
drawSprite, updateSprite addBullet WEAPON */

var followSpeed = 100;
var drag = 0.8;
var weaponLevel = 3;
var shotTimer = 0;
var startPos = [width / 2, height - 100];

function makePlayer() {
  var sprite = makeSprite(PLAYER[1], drawProgram);
  updateSprite(sprite, 0, 0, 0, 1, 1, 1);

  return [
    sprite, // player sprite
    PLAYER[0], // player size
    [].concat(startPos), // position vector
    [0, 0], // velocity vector
    1 // alive flag
  ];
}

function updatePlayer(player, bullets) {
  if (!player[4]) return;

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

  if (shotTimer <= 0) {
    shotTimer = WEAPON[weaponLevel][1];
    playerShoot(player, bullets);
  }
}

function playerShoot(player, bullets) {
  var weapon = WEAPON[weaponLevel];
  var guns = weapon.slice(2);

  for (var i = 0; i < guns.length; i++) {
    var a = guns[i][0];
    var o = guns[i][1] || [0, 0];

    addBullet(bullets, weapon[0], vectorAdd(player[2], vectorMultiply(o, player[1])), a, 1);
  }
}

function drawPlayer(player) {
  drawSprite(player[0]);
}