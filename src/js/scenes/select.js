/* global makeBackground updateBackground drawBackground width height
makeButton changeScene handleButtonClick mx my isMobile updateButton version
focusButton soundOn: true highQuality: true makeLabel drawButton drawLabel
a1: true a2: true clickButton clicked: true blurButton ku: true kd: true clamp
kl: true kr: true unlockedLevel ctxUI */

var selectPath = [
  [80, 50, '1', 'ff0', '440'],
  [180, 130, '2', '6f0', '240'],
  [300, 130, '3', '0f0', '040'],
  [400, 210, '4', '0f6', '042'],
  [300, 290, '5', '0ff', '044'],
  [180, 290, '6', '06f', '024'],
  [80, 370, '7', '60f', '204'],
  [180, 450, '8', 'f0f', '404'],
  [300, 450, '9', 'f06', '402'],
  [400, 520, 'c', 'f00', '400']
];

function makeSelectButtons() {
  return selectPath.map(function (button, i) {
    return makeButton(button[0], button[1], 60, 60, button[2], 4, button[3], button[4], 0, function () {
        // go to the select scene
        changeScene(0, i);
      }, 1, i >= unlockedLevel);
  });
}

function drawSelectPath() {
  ctxUI.beginPath();
  ctxUI.lineWidth = 5;
  ctxUI.moveTo(selectPath[0][0], selectPath[0][1]);

  for (var i = 1; i < unlockedLevel; i++) {
    ctxUI.lineTo(selectPath[i][0], selectPath[i][1]);
    ctxUI.strokeStyle = '#' + selectPath[i][4];
    ctxUI.stroke();
    ctxUI.beginPath();
    ctxUI.moveTo(selectPath[i][0], selectPath[i][1]);
  }
}

var select = [
  // 0 init
  function () {
    // background
    select[4] = makeBackground('420', 0);
    updateBackground(select[4], 0, height, 1);

    // buttons array
    select[5] = makeSelectButtons().concat([
      makeButton(100, 580, 260, 60, 'main menu', 4, 'fc0', '420', -1, function () {
        // go to the select scene
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
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space - click focused button
      if (a1 || a2) {
        clickButton(select[5][select[6]]);
        a1 = a2 = 0;
      }

      if (ku || kl) {
        do {
          select[6]--;
        } while (select[5][select[6]] && select[5][select[6]][14]);
        ku = kl = 0;
      }

      if (kd || kr) {
        do {
          select[6]++;
        } while (select[5][select[6]] && select[5][select[6]][14]);
        kd = kr = 0;
      }

      select[6] = clamp(select[6], 0 ,select[5].length - 1);

      return;
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

    drawSelectPath();

    select[5].forEach(drawButton);
  }
];