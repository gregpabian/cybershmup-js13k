/* global ENEMY dt makeEnemy makePath updateEnemy width height makeBatch hex2rgb
updateBatchItem drawBatch waves addExplosion trySpawningCollectible levels
seed randomIntWeighted random PATH randomInRange randomChance initialSeed */

var pathHashMap = ['c', 's', 'a', 'z', 'u'];
var enemyCounts = {'ss': 10, 'sm': 5, 'ts': 1, 'tm': 1, 'sl': 2, 'tl': 1};
var enemyTypes = Object.keys(enemyCounts);


// create waves for the given difficulty level
function makeWaves(level) {
  var difficulty = 1 + level / 10;
  var waves = [];
  var maxType = Math.floor(3 + level / 3);
  var types = [];
  var typesOrdered = [];
  var count = 9;
  var size = count / 3;
  var color = hex2rgb(levels[level][3]);
  var i;

  for (i = 0; i < count; i++) {
    types.push(randomIntWeighted(seed, maxType));
  }

  types = types.sort().map(function(type) { return enemyTypes[type]; });

  for (i = 0; i < size; i++) {
    typesOrdered.push(types[i], types[i + size], types[i + size * 2]);
  }

  var delay = 0;
  var waveDelay;

  for (i = 0; i < count; i++) {
    var pathType = pathHashMap[randomInRange(seed, typesOrdered[i][0] === 't' ? 0 : 1, 5)];
    var squeeze = false;
    var paths;

    if (pathType === 'c') {
      pathType = randomInRange(seed, 1, 8);
      paths = [makePath(pathType)];
    } else {
      squeeze = i > 5 && randomChance(seed, 20 + level);
      paths = [makePath(pathType, squeeze), makePath(pathType, squeeze, 1)];
    }

    for (var j = 0; j < paths.length; j++) {
      wave = makeWave(typesOrdered[i], paths[j], difficulty, color, pathType);
      waveDelay = wave[0];
      wave[0] = delay;
      waves.push(wave);
      if (!squeeze) delay += waveDelay;
    }
  }

  // add boss fight for levels a, b and c
  var wave = makeBossWave(level);

  if (wave) waves.push(wave);

  return waves;
}

function makeWave(type, path, difficulty, color, pathType) {
  var speed = difficulty * 1.5;
  var count = Math.floor(enemyCounts[type] * difficulty);
  var delay = ENEMY[type][0] * 16 / 1000 * 1.5 / speed;

  var x = path[0] * width;
  var y = path[1] * height;

  var enemies = [];

  for (var i = 0; i < count; i++) {
    enemies.push(makeEnemy(type, x, y, difficulty, speed, color));
  }

  return [
    (PATH[pathType].length - 5) / speed + count * delay, // 0 - wave duration
    enemies, // 1 - enemies to spawn
    makeBatch(ENEMY[type][1], count), // 2 - batch
    [], // 3 - active enemies
    path, // 4 - path
    0, // 5 - spawn timer
    delay // 6 - spawn delay
  ];
}

function makeBossWave(level) {
  // level a
  if (level === 2) {
    return [
      0,
      [],
      0,
      [],
      0,
      0
    ];
  }

  // level b
  if (level === 5) {

  }

  // level c
  if (level === 8) {

  }
}

function updateWaves() {
  waves.forEach(updateWave);
}

function updateWave(wave, i) {
  var reset = true;

  while (i-- && reset) {
    if (!waveComplete(waves[i])) {
      reset = false;
    }
  }

  // previous waves ended - reset timer
  if (reset) wave[0] = 0;

  if (wave[0] > 0) {
    wave[0] -= dt / 1000;
    return;
  }

  if (wave[5] <= 0 && wave[1].length) {
    wave[5] = wave[6];
    wave[3].push(wave[1].pop());
  }

  wave[5] -= dt / 1000;

  var len = wave[3].length;

  for (i = 0; i < len; i++) {
    var enemy = wave[3][i];

    updateEnemy(enemy, wave[4]);

    if (enemy[3] > 0) {
      updateBatchItem(wave[2], i, enemy[1][0], enemy[1][1], 0, 1, 1, 1, enemy[7]);
    } else {
      // don't explode when leaving the screen
      if (enemy[3] > -1000) {
        addExplosion(enemy[1][0], enemy[1][1], ENEMY[enemy[0]][0]);
        trySpawningCollectible(enemy[1]);
      }
      wave[3].splice(i, 1);
      len--;
      i--;
    }
  }
}

function wavesHaveActiveShips() {
  return waves.some(function (wave) {
    return wave[3].length > 0;
  });
}

function waveComplete(wave) {
  return !wave[1].length && wave[3].every(function (enemy) {
    return enemy[3] <= 0;
  });
}

function drawWaves() {
  waves.forEach(drawWave);
}

function drawWave(wave) {
  drawBatch(wave[2], wave[3].length);
}

function checkWavesComplete() {
  return waves.every(waveComplete);
}