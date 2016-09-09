/* global makeBackground updateBackground drawBackground height
makeButton changeScene handleButtonClick mx my isMobile focusButton drawButton
a1: true a2: true clickButton clicked: true blurButton ku: true kd: true clamp
kl: true kr: true unlockedLevel ctxUI a3: true width vectorRotate vectorAdd
playSound SOUNDS level: true V_DOWN */

// level markers shown on the select level screen
var levels = [
  // x, y, label, foreground color, background color
  [80, 50, '1', '0ff', '044'],
  [180, 130, '2', '0af', '034'],
  [300, 130, '3', '05f', '014'],
  [400, 210, '4', '00f', '004'],
  [300, 290, '5', '50f', '104'],
  [180, 290, '6', 'a0f', '304'],
  [80, 370, '7', 'f0f', '404'],
  [180, 450, '8', 'f0a', '403'],
  [300, 450, '9', 'f05', '401'],
  [400, 520, 'c', 'f00', '400']
];

var select = [
  // 0 init
  function () {
    // background
    select[4] = makeBackground('043', 0);
    updateBackground(select[4], 0, height, 1);

    // buttons array
    select[5] = makeSelectButtons().concat([
      makeButton(100, 580, 260, 60, 'main menu', 4, '0fa', '043', -1, function () {
        // go to the home scene
        changeScene(1);
      })
    ]);
    // current button
    select[6] = 0;
  },
  // 1 update
  function () {
    if (!isMobile) {
      select[5].forEach(blurButton);
      focusButton(select[5][select[6]]);
    }

    var c = [width / 2, height / 2];
    var r = vectorRotate(V_DOWN, Date.now() / 1000);

    c = vectorAdd(c, r);

    updateBackground(select[4], c[0], c[1], 1);
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space - click focused button
      if (a1 || a2) {
        clickButton(select[5][select[6]]);
        a1 = a2 = 0;
      }

      // escape - show pause menu
      if (a3) {
        changeScene(1);
        a3 = 0;
      }

      if (ku || kl) {
        do {
          select[6]--;
        } while (select[5][select[6]] && select[5][select[6]][14]);
        ku = kl = 0;
        playSound(SOUNDS[0]);
      }

      if (kd || kr) {
        do {
          select[6]++;
        } while (select[5][select[6]] && select[5][select[6]][14]);
        kd = kr = 0;
        playSound(SOUNDS[0]);
      }

      select[6] = clamp(select[6], 0 ,select[5].length - 1);
    }

    if (clicked) {
      select[5].some(function (button) {
        if (handleButtonClick(mx, my, button)) {
          clicked = false;
          return true;
        }
      });
    }
  },
  // 3 render
  function () {
    drawBackground(select[4]);

    drawLevels();

    select[5].forEach(drawButton);
  }
];

function makeSelectButtons() {
  return levels.map(function (button, i) {
    return makeButton(button[0], button[1], 60, 60, button[2], 4, button[3], button[4], 0, function () {
        // go to the select scene
        level = i;
        changeScene(0);
      }, 1, i > unlockedLevel);
  });
}

function drawLevels() {
  ctxUI.beginPath();
  ctxUI.lineWidth = 5;
  ctxUI.moveTo(levels[0][0], levels[0][1]);

  for (var i = 1; i <= unlockedLevel; i++) {
    ctxUI.lineTo(levels[i][0], levels[i][1]);
    ctxUI.strokeStyle = '#' + levels[i][4];
    ctxUI.stroke();
    ctxUI.beginPath();
    ctxUI.moveTo(levels[i][0], levels[i][1]);
  }
}