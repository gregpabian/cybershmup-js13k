/* global makeButton changeScene isMobile drawButton a1: true a2: true a3: true
clicked:true handleButtonClick mx my levels makeBackground makeGauge makeLabel
enableGaugeGlow drawGauge drawLabel updateGauge updateLabel health:true
energy:true weapon:true score padZero PLAYER updatePlayer makePlayer level
updateBackground drawPlayer makeWaves updateWaves makeBullets updateBullets
drawBullets drawWaves clamp disableGaugeGlow collidePlayerWithWaves makeGlitch
collideBullets makeExplosions drawExplosions updateExplosions updateGlitch
maxEnergy maxWeapon updateCollectibles collidePlayerWithCollectibles maxHealth
drawCollectibles drawGlitch collideGlitchWithWaves collideGlitchWithBullets */

var player, bullets, waves, explosions, collectibles, glitch;

var gameplay = [
  // 0 init
  function () {
    // background
    gameplay[4] = makeBackground(getBackgroundColor(levels[level][4]), 1 + level * 0.2);
     // menu button
    gameplay[5] = makeButton(430, 50, 60, 60, 'x', 4, '0cf', '024', 0, function () {
      // go to the select scene
      changeScene(1, 1);
    }, 1);
    // gauges
    gameplay[6] = [
      // hp
      makeGauge(-20, 430, 300, '0d0', '020', 5, health, -1.6),
      // wp
      makeGauge(490, 440, 300, 'f0c', '202', 7, weapon, -1.55, 1),
      // energy
      makeGauge(260, 630, 480, '0cf', '022', 10, energy, -0.05)
    ];
    // labels
    gameplay[7] = [
      makeLabel(20, 20, padZero(0), 'fff', 4),
      makeLabel(3, 295, 'hp', '0d0', 2),
      makeLabel(463, 240, 'wp', 'f0c', 2),
      makeLabel(375, 565, 'glitch', '0cf', 3)
    ];
    // reset health
    health = 100;
    // player
    player = makePlayer();
    // waves
    waves = makeWaves(level);
    // bullets
    bullets = makeBullets(100);
    // explosions
    explosions = makeExplosions(100);
    // collectibles
    collectibles = [];
    // glitch
    glitch = makeGlitch();
  },
  // 1 update
  function () {
    // level failed
    if (!health) {
      changeScene(1, 2);
      return;
    }

    updateBackground(gameplay[4], player[2][0], player[2][1]);

    updateGauge(gameplay[6][0], health);
    updateGauge(gameplay[6][1], weapon);
    updateGauge(gameplay[6][2], energy);
    updateLabel(gameplay[7][0], padZero(score));
    collideGlitchWithWaves();
    collideGlitchWithBullets();
    collidePlayerWithWaves();
    collidePlayerWithCollectibles();
    collideBullets();
    updatePlayer();
    updateBullets();
    updateWaves();
    updateExplosions();
    updateCollectibles();
    updateGlitch();

    // TODO show glow around glitch gauge when available
    if (energy >= 10) {
      enableGaugeGlow(gameplay[6][2]);
    } else {
      disableGaugeGlow(gameplay[6][2]);
    }
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space try using glitch
      if (a1 || a2) {
        // use glitch
        a1 = a2 = 0;
      }

      // escape - show pause menu
      if (a3) {
        changeScene(1, 1);
        a3 = 0;
      }
    }

    if (clicked) {
      if (handleButtonClick(mx, my, gameplay[5])) {
        clicked = false;
        return true;
      }
    }
  },
  // 3 render
  function () {
    // draw UI
    drawButton(gameplay[5]);
    gameplay[6].forEach(drawGauge);
    gameplay[7].forEach(drawLabel);

    drawPlayer();
    drawWaves();
    drawBullets();
    drawCollectibles();
    drawExplosions();
    drawGlitch();
  }
];

function getBackgroundColor(color) {
  return color.split('').map(function (c) {
    c = parseInt(c, 10);
    return c ? c + 2 : c;
  }).join('');
}

function addHealth(amount) {
  health = clamp(0, health + amount, maxHealth);
}

function addEnergy(amount) {
  energy = clamp(0, energy + amount, maxEnergy);
}

function addWeapon(amount) {
  weapon = clamp(0, weapon + amount, maxWeapon);
}