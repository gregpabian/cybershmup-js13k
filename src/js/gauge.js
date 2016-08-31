/* global ctxUI */

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
}

function drawGauge(gauge) {
  ctxUI.save();
  // ctxUI.transform(1, gauge[6], gauge[7], 1, gauge[0], gauge[1]);

  var w = gauge[2] + 20 + (gauge[8] - 1) * 5;
  var h = gauge[3] + 20;

  ctxUI.translate(gauge[0], gauge[1]);
  ctxUI.rotate(gauge[6]);
  ctxUI.translate(-w / 2, -h / 2);
  ctxUI.transform(1, 0, Math.PI / (gauge[7] ? 4 : -4), 1, 0, 0);


  ctxUI.fillStyle = '#' + gauge[4];
  ctxUI.fillRect(0, 0, w, h);
  ctxUI.fillStyle = '#000';
  ctxUI.fillRect(5, 5, w - 10, h - 10);

  var cw = gauge[2] / gauge[8];

  for (var i = 0; i < gauge[8]; i++) {
    ctxUI.fillStyle = '#' + (gauge[9] > i ? gauge[4] : gauge[5]);
    ctxUI.fillRect(10 + i * (cw + 5), 10, cw, cw);
  }


  ctxUI.restore();
}