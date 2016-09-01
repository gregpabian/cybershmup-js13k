/* global makeBackground updateBackground drawBackground width height
makeButton changeScene handleButtonClick mx my isMobile updateButton version
focusButton soundOn: true highQuality: true makeLabel drawButton drawLabel
a1: true a2: true clickButton clicked: true blurButton ku: true kd: true clamp */

var home = [
  // 0 init
  function () {
    // background
    home[4] = makeBackground('046', 0);

    // buttons array
    home[5] = [
      makeButton(100, 250, 300, 60, 'start game', 4, '0cf', '022', -1, function () {
        // go to the select scene
        changeScene(4);
      }),
      makeButton(75, 330, 250, 60, 'credits', 4, '0cf', '022', -1, function () {
        // go to the credits scene
        changeScene(0);
      }),
      makeButton(365, 500, 300, 60, 'graphics: ' + (highQuality ? 'hi' : 'lo'), 4, 'f0c', '202', 1, function (button) {
        highQuality = !highQuality;
        updateButton(button, 'graphics: ' + (highQuality ? 'hi' : 'lo'));
      }),
      makeButton(380, 580, 260, 60, 'sound: ' + (soundOn ? 'on' : 'off'), 4, 'f0c', '202', 1, function (button) {
        soundOn = !soundOn;
        updateButton(button, 'sound: ' + (soundOn ? 'on' : 'off'));
      }),
    ];

    // current button
    home[6] = 0;

    // labels
    home[7] = [
      makeLabel(30, 40, 'cyber shmup', 'fff', 10),
      makeLabel(50, 100, 'escape from the c.o.r.e', '099', 4),
      makeLabel(25, 600, 'v' + version, 'fff', 4),
    ];

    home[8] = 0;
  },
  // 1 update
  function () {
    if (!isMobile) {
      home[5].forEach(blurButton);
      focusButton(home[5][home[6]]);
    }

    home[8] += dt / 1000;

    var c = [width / 2, height / 2];
    var r = vectorRotate([0, width], home[8]);

    c = vectorAdd(c, r);

    updateBackground(home[4], c[0], c[1], 1);
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space - click focused button
      if (a1 || a2) {
        clickButton(home[5][home[6]]);
        a1 = a2 = 0;
      }

      if (ku) {
        home[6]--;
        ku = 0;
      }

      if (kd) {
        home[6]++;
        kd = 0;
      }

      home[6] = clamp(home[6], 0 ,home[5].length - 1);

      return;
    }

    if (clicked) {
      home[5].some(function (button) {
        if (handleButtonClick(mx, my, button)) {
          clicked = false;
          return true;
        }
      });
    }
  },
  // 3 render
  function () {
    drawBackground(home[4]);

    home[5].forEach(drawButton);
    home[7].forEach(drawLabel);
  }
];