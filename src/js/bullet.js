/* global hex2rgba, TWO_PI, BULLET, dt, width, height, vectorMultiply,
vectorAdd */

function renderBullet(bullet) {
  var c = document.createElement('canvas');
  c.width = c.height = bullet[0];
  var ctx = c.getContext('2d');

  ctx.beginPath();
  ctx.strokeStyle = '#' + bullet[1];
  ctx.lineWidth = 2;
  ctx.fillStyle = hex2rgba(bullet[1], 0.5);
  ctx.arc(bullet[0] / 2, bullet[0] / 2, bullet[0] / 2, 0, TWO_PI, false);
  ctx.fill();
  ctx.stroke();

  return c;
}

function makeBullet(type, x, y, vx, vy) {
  return [
    BULLET[type][1],
    BULLET[type][0],
    [x, y],
    [vx, vy],
    1
  ];
}

function updateBullet(bullet) {
  if (!bullet[4]) return;

  var d = vectorMultiply(bullet[3], dt / 1000);

  bullet[2] = vectorAdd(bullet[2], d);

  if (bullet[2][0] < 0 || bullet[2][0] > width || bullet[2][1] < 0 || bullet[2][1] > height) {
    bullet[4] = 0;
  }
}