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
    ships.push(makeShip(shape[1], shape[0], x, y));
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