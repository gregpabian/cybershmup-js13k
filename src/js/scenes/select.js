/* global makeBackground updateBackground drawBackground height
makeButton changeScene handleButtonClick mx my isMobile focusButton drawButton
a1: true clickButton clicked: true blurButton ku: true kd: true clamp
kl: true kr: true unlockedLevel ctxUI a3: true vectorRotate vectorAdd
playSound SOUNDS level:true V_DOWN V_CENTER */

// level markers shown on the select level screen
var levels = [
  // x, y, label, foreground color, background color
  [180, 130, '1', '0ff', '034'],
  [300, 130, '2', '0af', '014'],
  [400, 210, 'a', '05f', '004'],
  [300, 290, '3', '50f', '104'],
  [180, 290, '4', 'a0f', '304'],
  [80, 370, 'b', 'f0f', '404'],
  [180, 450, '5', 'f0a', '403'],
  [300, 450, '6', 'f05', '401'],
  [400, 520, 'c', 'f33', '400']
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

    var c = vectorAdd(V_CENTER, vectorRotate(V_DOWN, Date.now() / 1000));

    updateBackground(select[4], c[0], c[1], 1);
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space - click focused button
      if (a1) {
        clickButton(select[5][select[6]]);
        a1 = 0;
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
        if (handleButtonClick(button)) {
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
  ctxUI.lineWidth = 5;
  for (var i = 0; i < unlockedLevel; i++) {
    ctxUI.beginPath();
    ctxUI.moveTo(levels[i][0], levels[i][1]);
    ctxUI.lineTo(levels[i + 1][0], levels[i + 1][1]);
    ctxUI.strokeStyle = '#' + levels[i + 1][4];
    ctxUI.stroke();
  }
}