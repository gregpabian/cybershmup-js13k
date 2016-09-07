/* global ENEMY dt makeEnemy makePath updateEnemy width height makeBatch
updateBatchItem drawBatch waves addExplosion */

// create waves for the given difficulty level
function makeWaves(level) {
  var waves = [];
  // TODO
  // waves.push(makeWave(1, 'ts', '2'));
  // waves.push(makeWave(2, 'tm', '4'));
  // waves.push(makeWave(1, 'tl', '2', 100, 1, 1));
  waves.push(makeWave(2, 'sm', 'z', 5, 1, 1));
  // waves.push(makeWave(9, 'ss', 'cm', 10));
  // waves.push(makeWave(14, 'ss', 's', 10));
  // waves.push(makeWave(14, 'ss', 'sm', 10));
  // waves.push(makeWave(20, 'ss', 'a', 10));
  // waves.push(makeWave(20, 'ss', 'am', 10));
  // waves.push(makeWave(27, 'ss', 'ux', 10));
  // waves.push(makeWave(27, 'ss', 'umx', 10));
  // waves.push(makeWave(33, 'ss', '1', 10));
  // waves.push(makeWave(34, 'ss', '2', 10));
  // waves.push(makeWave(35, 'ss', '3', 10));
  // waves.push(makeWave(36, 'ss', '4', 10));
  // waves.push(makeWave(37, 'ss', '5', 10));
  // waves.push(makeWave(38, 'ss', '6', 10));
  // waves.push(makeWave(39, 'ss', '7', 10));

  // waves.push(makeWave(1, 'ss', '1', 30));
  // waves.push(makeWave(1, 'ss', '2', 30));
  // waves.push(makeWave(1, 'ss', '3', 30));
  // waves.push(makeWave(1, 'ss', '4', 30));
  // waves.push(makeWave(1, 'ss', '5', 30));
  // waves.push(makeWave(1, 'ss', '6', 30));
  // waves.push(makeWave(1, 'ss', '7', 30));

  return waves;
}

function makeWave(delay, type, path, count, speed, interval) {
  count = count || 1;
  path = makePath(path);

  var enemies = [];
  var x = path[0] * width;
  var y = path[1] * height;

  for (var i = 0; i < count; i++) {
    enemies.push(makeEnemy(type, x, y, speed));
  }

  var image = ENEMY[type][1];

  return [
    delay, // delay before the wave starts
    enemies, // wave's enemies
    makeBatch(image, count),
    [], // wave's active enemies
    path, // wave's path
    0, // delay before next enemy
    interval || 0 // enemy spawning interval
  ];
}

function updateWaves() {
  waves.forEach(updateWave);
}

function updateWave(wave) {
  // wave spawn timer
  if (wave[0] > 0) {
    wave[0] -= dt / 1000;
    return;
  }

  var enemy;

  if (wave[5] <= 0 && wave[1].length) {
    wave[5] = wave[6];
    enemy = wave[1].pop();
    wave[3].push(enemy);
  }

  var d = 0;

  for (var i = 0, len = wave[3].length; i < len; i++) {
    enemy = wave[3][i];

    updateEnemy(enemy, wave[4]);

    if (enemy[3] > 0) {
      updateBatchItem(wave[2], i, enemy[1][0], enemy[1][1]);
    } else {
      // don't explode when leaving the screen
      if (enemy[3] > -1000) addExplosion(enemy[1][0], enemy[1][1], ENEMY[enemy[0]][0]);
      wave[3].splice(i, 1);
      len--;
      i--;
    }
  }

  wave[5] -= dt / 1000;
}

function drawWaves() {
  waves.forEach(drawWave);
}

function drawWave(wave) {
  drawBatch(wave[2], wave[3].length);
}
