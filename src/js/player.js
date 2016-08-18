/* global mx, my, dt, vectorAdd, isMobile, vectorNormalize, vectorDistance,
vectorMultiply, vectorSubtract, width, height, PLAYER, makeShip */

var followSpeed = 15;
var drag = 0.8;

function updatePlayer() {
  var v = [0, 0];

  if (isMobile) {
    if (mx >= 0 && my >= 0) {
      var r = vectorDistance(player[1], [mx, my]);

      v = vectorSubtract([mx, my], player[1]);
      v = vectorNormalize(v);
      v = vectorMultiply(v, r / width * followSpeed);
    }
  } else {
    v = vectorNormalize([mx, my]);
    v = vectorMultiply(v, 6);
  }

  // update speed vector
  player[2] = vectorAdd(player[2], v);

  // apply drag
  player[2] = vectorMultiply(player[2], drag);

  // calculate movement vector
  var d = vectorMultiply(player[2], followSpeed * dt / 1000);

  // constrain to screen boundaries

  var size = player[0][0];
  var e = player[1][0] + d[0] - size / 2;

  if (e < 0) {
    d[0] -= e;
  }

  e = player[1][0] + d[0] + size / 2;

  if (e > width) {
    d[0] -= e - width;
  }

  e = player[1][1] + d[1] - size / 2;

  if (e < 0) {
    d[1] -= e;
  }

  e = player[1][1] + d[1] + size / 2;

  if (e > height) {
    d[1] -= e - height;
  }

  // move to new position
  player[1] = vectorAdd(player[1], d);
}

var player = [PLAYER, [width / 2, height - 100], [0, 0]];