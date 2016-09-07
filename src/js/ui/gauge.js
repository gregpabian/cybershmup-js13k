/* global ctxUI dt hex2rgba */

function makeGauge(x, y, w, c1, c2, max, value, r, right) {
  return [
    x,
    y,
    w,
    w / max,
    c1,
    c2,
    r,
    right,
    max,
    value,
    0, // glow enabled
    0 // glow timer
  ];
}

function updateGauge(gauge, value) {
  gauge[9] = value;
  if (gauge[10]) gauge[11] += dt / 100;
}

function enableGaugeGlow(gauge) {
  if (!gauge[10]) {
    gauge[10] = 1;
    gauge[11] = 0;
  }
}

function disableGaugeGlow(gauge) {
  gauge[10] = 0;
}

function drawGauge(gauge) {
  ctxUI.save();

  var w = gauge[2] + 20 + (gauge[8] - 1) * 5;
  var h = gauge[3] + 20;

  ctxUI.translate(gauge[0], gauge[1]);
  ctxUI.rotate(gauge[6]);
  ctxUI.transform(1, 0, gauge[7] ? 0.785 : -0.785, 1, -w / 2, -h / 2);

  // show glowing effect
  if (gauge[10]) {
    ctxUI.save();
    ctxUI.shadowColor = hex2rgba(gauge[4], 0.5 * (Math.sin(gauge[11]) + 1));
    ctxUI.shadowOffsetY = -10;
    ctxUI.shadowBlur = 50;
  }

  ctxUI.fillStyle = '#' + gauge[4];
  ctxUI.fillRect(0, 0, w, h);

  if (gauge[10]) {
    ctxUI.restore();
  }

  ctxUI.fillStyle = '#000';
  ctxUI.fillRect(5, 5, w - 10, h - 10);

  var cw = gauge[2] / gauge[8];

  for (var i = 0; i < gauge[8]; i++) {
    ctxUI.fillStyle = '#' + (gauge[9] > i ? gauge[4] : gauge[5]);
    ctxUI.fillRect(10 + i * (cw + 5), 10, cw, cw);
  }


  ctxUI.restore();
}