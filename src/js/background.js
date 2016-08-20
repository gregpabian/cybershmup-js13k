/* global ctx, width, height, player, dt, SIZE_S, SIZE_L, SIZE_XS, SIZE_XXL */

var bg = [];

function makePattern(wn, ww, h) {
  var d = (ww - wn) / 2;

  var tmp = document.createElement('canvas');
  tmp.width = wn + ww;
  tmp.height = h;

  var tmpCtx = tmp.getContext('2d');

  tmpCtx.fillStyle = '#000';
  tmpCtx.fillRect(0, 0, wn + ww, h);

  tmpCtx.beginPath();
  tmpCtx.lineWidth = 2;
  tmpCtx.strokeStyle = '#247';
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

  return tmp;
}

function makeBackground() {
  bg[3] = width + SIZE_XXL * 2;
  bg[4] = Math.ceil(height / SIZE_S) * SIZE_S;

  bg[1] = 0;
  bg[2] = -bg[4];

  bg[0] = document.createElement('canvas');
  bg[0].width = bg[3];
  bg[0].height = 2 * bg[4];

  var bgctx = bg[0].getContext('2d');

  var pattern = bgctx.createPattern(makePattern(SIZE_XS, SIZE_L, SIZE_S), 'repeat');
  bgctx.fillStyle = pattern;
  bgctx.fillRect(0, 0, width + SIZE_XXL * 2, height * 2);
}

function updateBackground() {
  bg[1] = -SIZE_XXL * 2 * player[2][0] / width;
  bg[2] += dt / 10;

  if (bg[2] >= 0) {
    bg[2] -= bg[4];
  }
}

function drawBackground() {
  ctx.drawImage(bg[0], ~~bg[1], ~~bg[2]);
}

makeBackground();