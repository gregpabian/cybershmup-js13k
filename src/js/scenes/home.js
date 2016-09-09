/* global makeBackground updateBackground drawBackground width height dt ctxUI
makeButton changeScene handleButtonClick mx my isMobile updateButton version
focusButton soundOn: true highQuality: true makeLabel drawButton drawLabel
a1: true a2: true clickButton clicked: true blurButton ku: true kd: true clamp
a3: true vectorRotate vectorAdd currentScene: true Image lImage localStorage
playSound SOUNDS level V_DOWN */

// show splash screen if false
var loaded = false;
var loadingPlayed = false;

var logoImage = new Image();
logoImage.src = lImage;

var loadingTimer = 0;
var pixelLabel = makeLabel(113, 404, 'pixel chinchilla', 'fff', 4);
var presentsLabel = makeLabel(193, 434, 'presents', 'fff', 3);

var home = [
  // 0 init
  function (mode) {
    if (!loaded) return;

    // background
    home[4] = makeBackground('046', 0);
    // current button
    home[6] = 0;
    // labels
    home[7] = [
      makeLabel(25, 40, 'cyber shmup', 'fff', 10),
      makeLabel(57, 100, 'escape from the c.o.r.e', '0cf', 4)
    ];

    var settingsButtons = [
      makeButton(365, 500, 300, 60, 'graphics: ' + (highQuality ? 'hi' : 'lo'), 4, 'f0c', '202', 1, function (button) {
        highQuality = highQuality ? 0 : 1;
        localStorage.setItem('csq', highQuality);
        updateButton(button, 'graphics: ' + (highQuality ? 'hi' : 'lo'));
      }),
      makeButton(380, 580, 260, 60, 'sound: ' + (soundOn ? 'on' : 'off'), 4, 'f0c', '202', 1, function (button) {
        soundOn = soundOn ? 0 : 1;
        localStorage.setItem('css', soundOn);
        updateButton(button, 'sound: ' + (soundOn ? 'on' : 'off'));
      })
    ];

    var pauseButtons = [
      makeButton(114, 350, 300, 60, 'change level', 4, '0cf', '024', -1, function () {
        // go to the home scene
        changeScene(2);
      }),
      makeButton(90, 430, 260, 60, 'main menu', 4, '0cf', '024', -1, function () {
        // go to the home scene
        changeScene(1);
      })
    ];

    switch (mode) {
      // credits
      case 0:
        home[5] = [
          makeButton(390, 580, 260, 60, 'main menu', 4, '0cf', '024', 1, function () {
            // go to the home scene
            changeScene(1);
          })
        ];

        home[7].push(
          makeLabel(70, 130, 'js13kgames 2016 entry', '09c', 4),
          makeLabel(160, 250, 'created by', '09c', 4),
          makeLabel(111, 280, 'greg pabian', '0cf', 6),
          makeLabel(90, 330, 'pixelchinchilla.com', '0cf', 4),
          makeLabel(90, 360, 'twitter: gregpabian', '0cf', 4),
          makeLabel(98, 390, 'github: gregpabian', '0cf', 4)
        );
        break;

      // pause
      case 1:
        home[5] = [
          makeButton(107, 270, 290, 60, 'resume game', 4, '0cf', '024', -1, function () {
            // back to game without re-initialising
            currentScene = 0;
          })
        ].concat(pauseButtons, settingsButtons);

        home[7].push(
          makeLabel(111, 170, 'game paused', '0cf', 6)
        );
        break;

      // failed
      case 2:
        home[5] = [
          makeButton(122, 270, 315, 60, 'restart level', 4, '0cf', '024', -1, function () {
            // restart level
            changeScene(0);
          })
        ].concat(pauseButtons, settingsButtons);

        home[7].push(
          makeLabel(100, 170, 'level failed', '0cf', 6)
        );
        break;

      // complete
      case 3:
        home[5] = [
          makeButton(99, 270, 260, 60, 'next level', 4, '0cf', '024', -1, function () {
            // go to the next level
            level++;
            changeScene(0);
          })
        ].concat(pauseButtons, settingsButtons);

        home[7].push(
          makeLabel(75, 170, 'level complete', '0cf', 6)
        );
        break;

      default:
        // buttons array
        home[5] = [
          makeButton(100, 250, 300, 60, 'start game', 4, '0cf', '024', -1, function () {
            // go to the select scene
            changeScene(2);
          }),
          makeButton(75, 330, 250, 60, 'credits', 4, '0cf', '024', -1, function () {
            // go to the credits scene
            changeScene(1, 0);
          })
        ].concat(settingsButtons);
    }
  },
  // 1 update
  function () {
    // update splash screen
    if (!loaded) {
      loadingTimer += dt / 2000;

      if (loadingTimer < 1) {
        ctxUI.globalAlpha = loadingTimer;
      } else {
        ctxUI.globalAlpha = 1;
      }

      if (loadingTimer > 1.7) {
        loaded = true;
        changeScene(1);
      }

      return;
    }

    if (!isMobile) {
      home[5].forEach(blurButton);
      focusButton(home[5][home[6]]);
    }

    var c = [width / 2, height / 2];
    var r = vectorRotate(V_DOWN, Date.now() / 1000);

    c = vectorAdd(c, r);

    updateBackground(home[4], c[0], c[1], 1);
  },
  // 2 input
  function () {
    if (!loaded) return;

    if (!isMobile) {
      // if enter or space - click focused button
      if (a1 || a2) {
        clickButton(home[5][home[6]]);
        a1 = a2 = 0;
      }

      // escape - show pause menu
      if (a3) {
        changeScene(1);
        a3 = 0;
      }

      if (ku) {
        home[6]--;
        ku = 0;
        playSound(SOUNDS[0]);
      }

      if (kd) {
        home[6]++;
        kd = 0;
        playSound(SOUNDS[0]);
      }

      home[6] = clamp(home[6], 0 ,home[5].length - 1);
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
    // render splash screen
    if (!loaded) {
      ctxUI.drawImage(logoImage, 0, 0, 32, 32, 185, 256, 128, 128);
      drawLabel(pixelLabel);

      if (loadingTimer > 1) {
        drawLabel(presentsLabel);
        if (!loadingPlayed) playSound(SOUNDS[1]);
        loadingPlayed = true;
      }

      return;
    }

    home[5].forEach(drawButton);
    home[7].forEach(drawLabel);
  }
];