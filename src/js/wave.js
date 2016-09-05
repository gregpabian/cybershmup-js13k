/* global ENEMY dt makeShip drawBody makePath updateShip width height
collideCircles */

var waves = [];

// create waves for the given difficulty level
function makeWaves(level) {
  // TODO
  // waves.push(makeWave(1, 'ss', 'z', 10));
  // waves.push(makeWave(1, 'ss', 'zm', 10));
  // waves.push(makeWave(9, 'ss', 'c', 10));
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
}

function makeWave(delay, type, path, count, interval) {
  count = count || 1;
  path = makePath(path);

  var ships = [];
  var x = path[0] * width;
  var y = path[1] * height;
  var shape = ENEMY[type];

  for (var i = 0; i < count; i++) {
    ships.push(makeShip(shape[1], shape[0], x, y));
  }

  return [
    delay, // delay before the wave starts
    ships, // wave's ships
    [], // wave's active ships
    path, // wave's path
    0, // delay before next ship
    interval // ship spawning interval
  ];
}

function updateWaves(waves) {
  // TODO
}

function updateWave(wave) {
  if (wave[0] > 0) {
    wave[0] -= dt / 1000;
    return;
  }

  if (wave[4] <= 0) {
    wave[4] = wave[5];
    var ship = wave[1].pop();
    if (ship) wave[2].push(ship);
  }

  wave[2].forEach(function (ship) {
    updateShip(ship, wave[3]);
  });

  wave[4] -= dt;
}

function drawWaves(waves) {

}

function drawWave(wave) {

}



function collideWithEnemies(body) {
  waves.forEach(function (wave) {
    wave[2].forEach(function (ship) {
      if (!ship[4]) return;

      if (collideCircles(body[2], body[1], ship[2], ship[1])) {
        body[4] = ship[4] = 0;
      }
    });
  });
}