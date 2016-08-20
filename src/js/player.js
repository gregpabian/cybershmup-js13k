/* global mx, my, dt, vectorAdd, isMobile, vectorNormalize, vectorDistance,
vectorMultiply, vectorSubtract, width, height, PLAYER, player, updateBullet,
makeBullet, disposeDead */

var followSpeed = 15;
var drag = 0.8;
var weaponLevel = 0;
var shotDelay = 0.25;
var shotTimer = 0;

function updatePlayer() {
  var t = dt / 1000;
  var v = [0, 0];

  if (isMobile) {
    if (mx >= 0 && my >= 0) {
      var r = vectorDistance(player[2], [mx, my]);

      v = vectorSubtract([mx, my], player[2]);
      v = vectorNormalize(v);
      v = vectorMultiply(v, r / width * followSpeed);
    }
  } else {
    v = vectorNormalize([mx, my]);
    v = vectorMultiply(v, 6);
  }

  // update speed vector
  player[3] = vectorAdd(player[3], v);

  // apply drag
  player[3] = vectorMultiply(player[3], drag);

  // calculate movement vector
  var d = vectorMultiply(player[3], followSpeed * t);

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

  e = player[2][1] + d[1] + size / 2;

  if (e > height) {
    d[1] -= e - height;
  }

  // move to new position
  player[2] = vectorAdd(player[2], d);

  shotTimer -= t;

  if (shotTimer <= 0) {
    shotTimer = shotDelay;
    playerShoot();
  }

player[4].forEach(updateBullet);
disposeDead(player[4]);
}

function playerShoot() {
  player[4].push(makeBullet(weaponLevel, player[2][0], player[2][1], 0, -500));
}