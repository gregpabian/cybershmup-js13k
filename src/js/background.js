/* global width height hex2rgb hex2rgba dt SIZE_S SIZE_L SIZE_XS SIZE_XXL
makeSprite drawProgram drawSprite updateSprite updateSpriteUVs sx sy */

var background;

function makePattern(wn, ww, h) {
  var d = (ww - wn) / 2;

  var tmp = document.createElement('canvas');
  tmp.width = wn + ww;
  tmp.height = h;

  var ctx = tmp.getContext('2d');

  // draw hexagon
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#ccc';
  ctx.moveTo(d, 0);
  ctx.lineTo(1, h /2);
  ctx.lineTo(d, h);
  ctx.lineTo(d + wn, h);
  ctx.lineTo(ww, h / 2);
  ctx.lineTo(d + wn, 0);
  ctx.lineTo(d, 0);
  ctx.moveTo(ww, h / 2);
  ctx.lineTo(ww + wn, h / 2);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#000';
  ctx.stroke();

  return tmp;
}

function makeGradient() {
  var tmp = document.createElement('canvas');
  var gs = height / 4;
  tmp.width = tmp.height = gs * 2;
  var ctx = tmp.getContext('2d');
  var gradient = ctx.createRadialGradient(gs, gs, gs, gs, gs, 0);
  gradient.addColorStop(0, hex2rgba('ccc', 0));
  gradient.addColorStop(1, '#ccc');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, gs * 2, gs * 2);

  return tmp;
}

function makeBackground(color, speed) {
  var bg = [];

  // gradient t
  bg[1] = makeSprite(makeGradient());
  // pattern position
  bg[2] = [width / 2, 0];
  // gradient position
  bg[3] = [0, 0];
  // width
  bg[4] = width * 1.33;
  // height
  bg[5] = Math.ceil(height / SIZE_S) * SIZE_S;
  // background color
  bg[6] = hex2rgb(color);
  // scroll speed
  bg[7] = speed;
  bg[8] = [20, 40];

  // pattern t
  bg[0] = makeSprite(makePattern(24, 40, 32), 1, bg[8][0], bg[8][1]);
  updateSprite(bg[0], bg[2][0], bg[2][1], 0, 1, 1, 1, bg[6]);

  return bg;
}

function updateBackground(bg, x, y, gradientOnly) {
  if (!gradientOnly) bg[2][0] = 2 * x / width + sx / bg[4];
  bg[2][1] -= bg[7] * dt / 500 + sy / bg[5];

  bg[3][0] = x;
  bg[3][1] = y;

  // simulate sprite scrolling by moving the UVs
  updateSpriteUVs(bg[0], bg[2][0], bg[2][1], bg[8][0], bg[8][1]);
  updateSprite(bg[1], bg[3][0], bg[3][1], 0, 1, 4, 4, bg[6]);
}

function drawBackground(bg) {
  drawSprite(bg[1]);
  drawSprite(bg[0]);
}
