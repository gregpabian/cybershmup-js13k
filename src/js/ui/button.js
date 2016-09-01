/* global makeLabel, ctxUI, isVectorInRect, drawLabel */

function makeButton(x, y, w, h, text, s, c1, c2, a1, onClick) {
  return [
    x,
    y,
    w,
    h,
    text,
    s,
    c1,
    c2,
    a1 || 0,
    onClick,
    text,
    0, // focused
    null // label
  ];
}

function updateButton(button, text) {
  if (button[4] !== text) {
    button[10] = button[4];
    button[4] = text;
  }
}

function drawButton(button) {
  // redraw label
  if (!button[12] || button[4] !== button[10]) {
    var x = (button[2] - (button[4].length * 4 - 1) * button[5]) / 2;
    var y = (button[3] - 5 * button[5]) / 2;
    button[12] = makeLabel(x, y, button[4], button[6], button[5]);
  }

  ctxUI.save();
  // render button border according to the focus state
  ctxUI.fillStyle = '#' + button[button[11] ? 6 : 7];
  ctxUI.translate(button[0] - button[2] / 2, button[1] - button[3] / 2);
  ctxUI.save();
  ctxUI.transform(1, 0, button[8] * 0.78, 1, 0, 0);
  ctxUI.fillRect(0, 0, button[2], button[3]);
  ctxUI.fillStyle = '#000';
  ctxUI.fillRect(5, 5, button[2] - 10, button[3] - 10);
  ctxUI.fillStyle = '#' + button[7];
  ctxUI.fillRect(10, 10, button[2] - 20, button[3] - 20);
  ctxUI.restore();
  drawLabel(button[12]);
  ctxUI.restore();
}

function focusButton(button) {
  button[11] = 1;
}

function blurButton(button) {
  button[11] = 0;
}

function handleButtonClick(x, y, button) {
  if (isVectorInRect([x, y], [button[0], button[1]], button[2], button[3])) {
    clickButton(button);

    return true;
  }
}

function clickButton(button) {
  button[9](button);
}