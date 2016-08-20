/* global ctx, TWO_PI, getPathPosition, dt, hex2rgba, vectorDistance */

var shipSpeed = 1;

function makeShip(img, size, x, y) {
  return [
    img, // ship's image
    size, // size
    [x, y], // x,y position
    0, // position along a path
    1 // alive flag
  ];
}

// example shape: [40, 'fff', -0.5, 0.5, 0, -0.5, 0.5, 0.5]
function renderShip(shape) {
  var c = document.createElement('canvas');
  var size = shape[0];
  shape = shape.slice(1);
  c.width = c.height = size + 4;
  var ctx = c.getContext('2d');

  ctx.save();
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  // center canvas
  ctx.translate(c.width / 2, c.height / 2);

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

  return c;
}

function updateShip(ship, path) {
  if (!ship[4]) return;

  var pos = ship[3] + dt / 1000;

  if (pos * 4 > path.length) {
    ship[4] = 0;
    return;
  }

  ship[2] = getPathPosition(path, pos);
  ship[3] = pos;
}