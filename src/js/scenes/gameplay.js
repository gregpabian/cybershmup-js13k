/* global makeButton changeScene isMobile drawButton a1: true a2: true a3: true
clicked:true handleButtonClick mx my levels makeBackground makeGauge makeLabel
enableGaugeGlow drawGauge drawLabel updateGauge health:true width
energy:true weapon:true PLAYER updatePlayer makePlayer level
updateBackground drawWave makeWaves updateWaves makeBullets updateBullets clamp
disableGaugeGlow collidePlayerWithWaves makeGlitch
collideBullets makeExplosions drawBatch updateExplosions updateGlitch
maxEnergy maxWeapon updateCollectibles collidePlayerWithCollectibles maxHealth
drawCollectible drawSprite collideGlitchWithWaves collideGlitchWithBullets
isVectorInRect resetGlitch height weaponLevel:true updateMissiles ENEMY dt
collideMissilesWithWaves drawMissile checkWavesComplete unlockedLevel: true
localStorage maxWeaponLevel seed:true initialSeed random makeBossWave
updateBossWave drawBossWave */

var player, bullets, waves, explosions, collectibles, glitch, missiles,
  levelComplete, completeTimer, boss, bossWave, bossWaveHealth;

var gameplay = [
  // 0 init
  function () {
    // reset random seed
    seed = initialSeed + level + 1;
    random(seed, 1);
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
      makeGauge(-40, 400, 300, '0d0', '020', maxHealth, health, -1.6),
      // wp
      makeGauge(500, 450, 300, 'f0c', '202', maxWeapon, weapon, -1.55, 1),
      // energy
      makeGauge(265, 645, 480, '0cf', '022', maxEnergy, energy, -0.05)
    ];

    // labels
    gameplay[7] = [
      makeLabel(3, 295, 'hp', '0d0', 2),
      makeLabel(463, 250, 'wp', 'f0c', 2),
      makeLabel(375, 570, 'glitch', '0cf', 3)
    ];

    // add boss gauge and label
    if (level == 2 || level == 5 || level == 8) {
      boss = 1;
      gameplay[6].push(makeGauge(195, 0, 320, 'd00', '200', 10, 10, -0.05));
      gameplay[7].push(makeLabel(280, 30, 'boss ' + levels[level][2], 'd00', 3));
      makeBossWave();
      bossWaveHealth = bossWave.reduce(function (result, boss) {
        return result + boss[0][3];
      }, 0);
    } else {
      // reset boss flag
      boss = bossWave = 0;
    }
    // reset health
    health = maxHealth;
    // reset energy and level completion
    energy = levelComplete = completeTimer = 0;
    // player
    makePlayer();
    // waves
    makeWaves();
    // bullets
    makeBullets(100);
    // explosions
    makeExplosions(100);
    // collectibles
    seedCollectibles();
    collectibles = [];
    // glitch
    makeGlitch();
    // missiles
    missiles = [];
  },
  // 1 update
  function () {
    // level failed
    if (health <= 0) {
      changeScene(1, 2);
      return;
    }

    updateBackground(gameplay[4], player[2][0], player[2][1]);

    updateGauge(gameplay[6][0], health);
    updateGauge(gameplay[6][1], weapon);
    updateGauge(gameplay[6][2], energy);

    if (boss) {
      updateGauge(gameplay[6][3], getBossHealth());
      updateBossWave();
    }

    collideGlitchWithWaves();
    collideGlitchWithBullets();
    collidePlayerWithWaves();
    collidePlayerWithCollectibles();
    collideMissilesWithWaves();
    collideBullets();
    updatePlayer();
    updateBullets();
    updateMissiles();
    updateWaves();
    updateExplosions();
    updateCollectibles();
    updateGlitch();

    // enable glitch
    if (energy >= maxEnergy) {
      enableGaugeGlow(gameplay[6][2]);
    } else {
      disableGaugeGlow(gameplay[6][2]);
    }

    // upgrade weapon
    if (weapon === maxWeapon) {
      if (weaponLevel < maxWeaponLevel) {
        weapon -= maxWeapon;
        weaponLevel++;
      }
    }

    // win condition was met
    if (!levelComplete && ((boss && !bossWave.length) || (!boss && checkWavesComplete()))) {
      levelComplete = 1;
      completeTimer = 0;
    }

    if (levelComplete) {
      completeTimer += dt;
    }

    if (completeTimer > 2000) {
      // end game
      if (level === 8) {
        changeScene(1, 0);
        //complete level
      } else {
        unlockedLevel = Math.max(unlockedLevel, level + 1);
        localStorage.setItem('csul', unlockedLevel);
        changeScene(1, 3);
      }
    }
  },
  // 2 input
  function () {
    if (!isMobile) {
      // if enter or space try using glitch
      if (a1 || a2) {
        // use glitch
        if (energy >= maxEnergy) {
          spawnGlitch();
        }
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
        clicked = 0;
        return true;
      }

      if (energy >= maxEnergy && isVectorInRect([mx, my], [width / 2, height - 25], width, 50)) {
        spawnGlitch();
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

    drawSprite(player[0]);
    waves.forEach(drawWave);
    drawBatch(bullets[1], bullets[0].length);
    missiles.forEach(drawMissile);
    collectibles.forEach(drawCollectible);
    drawBatch(explosions[1], explosions[0].length);
    if (glitch[4]) drawSprite(glitch[0]);

    if (boss) {
      drawBossWave();
    }
  }
];

function getBackgroundColor(color) {
  return color.split('').map(function (c) {
    c = parseInt(c, 10);
    return c ? c + 2 : c;
  }).join('');
}

function addHealth() {
  health = clamp(health + 1, 0, maxHealth);
}

function addEnergy() {
  energy = clamp(energy + 1, 0, maxEnergy);
}

function addWeapon() {
  weapon = clamp(weapon + 1, 0, maxWeapon);
}

function spawnGlitch() {
  resetGlitch();
  energy -= maxEnergy;
}

function getBossHealth() {
  return Math.round(bossWave.reduce(function (result, boss) {
    return result + boss[0][3];
  }, 0) / bossWaveHealth * 10);
}