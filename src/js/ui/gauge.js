/* global ctxUI dt adjustHex */

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
    value
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
  ctxUI.transform(1, 0, gauge[7] ? 0.78 : -0.78, 1, -w / 2, -h / 2);

  var fill = '#' + (gauge[10] ? adjustHex(gauge[4], 0.5 * (Math.sin(gauge[11]) + 1)) : gauge[4]);

  ctxUI.fillStyle = fill;
  ctxUI.fillRect(0, 0, w, h);

  ctxUI.fillStyle = '#000';
  ctxUI.fillRect(5, 5, w - 10, h - 10);

  var cw = gauge[2] / gauge[8];

  for (var i = 0; i < gauge[8]; i++) {
    ctxUI.fillStyle = gauge[9] > i ? fill : '#' + gauge[5];
    ctxUI.fillRect(10 + i * (cw + 5), 10, cw, cw);
  }

  ctxUI.restore();
}