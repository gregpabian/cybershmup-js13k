/* global ctx, TWO_PI, getPathPosition, dt, hex2rgba, vectorDistance */

var shipSpeed = 1;

function makeShip(shape, x, y) {
  return [
    shape, // ship's shape definition
    [x, y], // x,y position
    0, // position along a path
    0 // alive flag
  ];
}

// example ship: [[40, 'fff', -0.5, 0.5, 0, -0.5, 0.5, 0.5], [0, 0]]
function drawShip(ship) {
  var size = ship[0][0];
  var shape = ship[0].slice(1);

  ctx.save();
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';

  // translate to the ship's position
  ctx.translate(ship[1][0], ship[1][1]);

  for (var i = 0; i < shape.length; i += 2) {
    if (typeof shape[i] === 'string') {
      // close previous shape
      if (i > 0) {
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
      }

      ctx.beginPath();
      ctx.strokeStyle = '#' + shape[i];
      ctx.fillStyle = hex2rgba(shape[i], 0.4);
      // skip the shape color
      i++;
      ctx.moveTo(shape[i] * size, shape[i + 1] * size);
    } else {
      ctx.lineTo(shape[i] * size, shape[i + 1] * size);
    }
  }

  // close final shape
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  // draw collider
  // TODO: remove
  // ctx.beginPath();
  // ctx.arc(0, 0, size / 2, 0, TWO_PI);
  // ctx.strokeStyle = '#69c';
  // ctx.lineWidth = 2;
  // ctx.stroke();

  ctx.restore();
}

function updateShip(ship, path) {
  var pos = ship[2] + dt / 1000;

  if (pos * 4 > path.length) {
    ship[4] = 0;
    return;
  }

  ship[1] = getPathPosition(path, pos);
  ship[2] = pos;
}

function collide(a, b) {
  return vectorDistance(a[1], b[1]) < (a[0][0] + b[0][0]) / 2;
}

function disposeDead(bodies) {
  var i = bodies.length - 1;

  while(bodies[i]) {
    if (!bodies[i--][3]) bodies.pop();
  }
}