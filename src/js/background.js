/* global ctx, width, height, player, dt, SIZE_S, SIZE_L, SIZE_XS, SIZE_XXL */

function makePattern(wn, ww, h, color) {
  var d = (ww - wn) / 2;

  var tmp = document.createElement('canvas');
  tmp.width = wn + ww;
  tmp.height = h;

  var tmpCtx = tmp.getContext('2d');

  // draw hexagon
  tmpCtx.beginPath();
  tmpCtx.lineWidth = 4;
  tmpCtx.strokeStyle = color;
  tmpCtx.moveTo(d, 0);
  tmpCtx.lineTo(0, h /2);
  tmpCtx.lineTo(d, h);
  tmpCtx.lineTo(d + wn, h);
  tmpCtx.lineTo(ww, h / 2);
  tmpCtx.lineTo(d + wn, 0);
  tmpCtx.lineTo(d, 0);
  tmpCtx.moveTo(ww, h / 2);
  tmpCtx.lineTo(ww + wn, h / 2);
  tmpCtx.stroke();

  tmpCtx.lineWidth = 2;
  tmpCtx.strokeStyle = '#000';
  tmpCtx.stroke();

  return tmp;
}

function makeBackground(color, speed) {
  var bg = [];

  bg[3] = width * 1.33;
  bg[4] = Math.ceil(height / SIZE_S) * SIZE_S;
  bg[5] = '#' + color;
  bg[6] = speed;
  bg[7] = bg[8] = 0; // player coordinates

  bg[1] = (width - bg[3]) / 2;
  bg[2] = -bg[4];

  bg[0] = document.createElement('canvas');
  bg[0].width = bg[3];
  bg[0].height = 2 * bg[4];

  var bgctx = bg[0].getContext('2d');

  var pattern = bgctx.createPattern(makePattern(SIZE_XS, SIZE_L, SIZE_S, bg[5]), 'repeat');
  bgctx.fillStyle = pattern;
  bgctx.fillRect(0, 0, bg[3], 2 * bg[4]);

  return bg;
}

function updateBackground(bg, x, y, gradientOnly) {
  if (!gradientOnly) bg[1] = x / width * (width - bg[3]);
  bg[2] += bg[6] * dt / 10;
  bg[7] = x;
  bg[8] = y;

  if (bg[2] >= 0) {
    bg[2] -= bg[4];
  }
}

function drawBackground(bg) {
  var grd = ctx.createRadialGradient(bg[7], bg[8], height, bg[7], bg[8], 0);
  grd.addColorStop(0, '#000');
  grd.addColorStop(1, bg[5]);

  // Fill with gradient
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(bg[0], bg[1], bg[2]);
}
