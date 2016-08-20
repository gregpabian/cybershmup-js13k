/* global ENEMY, dt, makeShip, drawShip, makePath, updateShip, width, height */

var waves = [];

function makeWave(delay, type, path, count) {
  count = count || 1;
  path = makePath(path);

  var ships = [];
  var x = path[0] * width;
  var y = path[1] * height;
  var shape = ENEMY[type];

  for (var i = 0; i < count; i++) {
    ships.push(makeShip(shape, x, y));
  }

  return [
    delay, // delay before the wave starts
    ships, // wave's ships
    [], // wave's active ships
    path, // wave's path
    0 // delay before next ship
  ];
}

function updateWave(wave) {
  if (wave[0] > 0) {
    wave[0] -= dt / 1000;
    return;
  }

  if (wave[4] <= 0) {
    wave[4] = 250;
    var ship = wave[1].pop();
    if (ship) wave[2].push(ship);
  }

  wave[2].forEach(function (ship) {
    updateShip(ship, wave[3]);
  });

  wave[4] -= dt;
}

function drawWave(wave) {
  wave[2].forEach(drawShip);
}

waves.push(makeWave(1, 'ss', 'z', 10));
waves.push(makeWave(1, 'ss', 'zm', 10));
waves.push(makeWave(9, 'ss', 'c', 10));
waves.push(makeWave(9, 'ss', 'cm', 10));
waves.push(makeWave(14, 'ss', 's', 10));
waves.push(makeWave(14, 'ss', 'sm', 10));
waves.push(makeWave(20, 'ss', 'a', 10));
waves.push(makeWave(20, 'ss', 'am', 10));
waves.push(makeWave(27, 'ss', 'ux', 10));
waves.push(makeWave(27, 'ss', 'umx', 10));
waves.push(makeWave(33, 'ss', '1', 10));
waves.push(makeWave(34, 'ss', '2', 10));
waves.push(makeWave(35, 'ss', '3', 10));
waves.push(makeWave(36, 'ss', '4', 10));
waves.push(makeWave(37, 'ss', '5', 10));
waves.push(makeWave(38, 'ss', '6', 10));
waves.push(makeWave(39, 'ss', '7', 10));