/* global ctx, dt, TWO_PI, vectorAdd, vectorMultiply, width, height */

var drag = 0.8;

function makeShip(shape, color, x, y, s) {
  return [
    shape,
    color,
    [x || 0, y || 0], // position
    [0, 0], // velocity
    s || 15 // speed
  ];
}

function drawShip(ship) {
  ctx.save();
  ctx.translate(ship[2][0], ship[2][1]);
  ctx.lineWidth = 5;
  ctx.lineCap= 'round';
  ctx.strokeStyle = ship[1];
  ctx.beginPath();
  
  var size = ship[0][0];
  
  for (var i = 1; i < ship[0].length; i += 2) {
    ctx.lineTo(ship[0][i] * size, ship[0][i + 1] * size);
  }
  
  ctx.closePath();
  ctx.stroke();
  
  ctx.beginPath()
  ctx.arc(0, 0, size / 2, 0, TWO_PI);
  ctx.strokeStyle = '#0c0';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
}

function updateShip(ship, v, constrain) {
  // update speed vector
  ship[3] = vectorAdd(ship[3], v);
  
  // apply drag
  ship[3] = vectorMultiply(ship[3], drag);
  
  // calculate movement vector
  var d = vectorMultiply(ship[3], ship[4] * dt / 1000);
  
  
  if (constrain) {
    var size = ship[0][0];
    var e = ship[2][0] + d[0] - size / 2;
    
    if (e < 0) {
      d[0] -= e;
    }
    
    e = ship[2][0] + d[0] + size / 2;
    
    if (e > width) {
      d[0] -= e - width;
    }
    
    e = ship[2][1] + d[1] - size / 2;
    
    if (e < 0) {
      d[1] -= e;
    }
    
    e = ship[2][1] + d[1] + size / 2;
    
    if (e > height) {
      d[1] -= e - height;
    }
  }
  
  ship[2] = vectorAdd(ship[2], d);
}