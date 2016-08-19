/* global PATH, TWO_PI, ctx, ctxUI, width, height, dt, lerp */

function makePath(type) {
  var path = [].concat(PATH[type[0]]);

  if (type.indexOf('x') > -1) path = squeezePath(path);
  if (type.indexOf('m') > -1) path = mirrorPath(path);


  return path;
}

function mirrorPath(path) {
  path = [].concat(path);

  for (var i = 0; i < path.length; i += 2) {
    path[i] = 1 - path[i];
  }

  return path;
}

function squeezePath(path) {
  path = [].concat(path);

  for (var i = 0; i < path.length; i += 2) {
    path[i] = path[i] / 2;
  }

  return path;
}

function getPathPosition(path, pos) {
  var i = Math.floor(pos) * 4;

  if (i < path.length - 4) {
    var t = pos - Math.floor(pos);
    var a = [path[i], path[i + 1]];
    var b = [path[i + 2], path[i + 3]];
    var c = [path[i + 4], path[i + 5]];
    var p1 = lerp(a, b, t);
    var p2 = lerp(b, c, t);
    var p3 = lerp(p1, p2, t);

    return [p3[0] * width, p3[1] * height];
  }

  // return the last point of path
  return [path[path.length - 2] * width, path[path.length - 1] * height];
}

// var pos = 0;

// function drawPath(path) {
//   ctxUI.fillStyle = '#666';
//   ctxUI.lineWidth = 2;

//   for (var j = 0; j < path.length; j += 2) {
//     ctxUI.beginPath();
//     ctxUI.arc(path[j] * width, path[j + 1] * height, 5, 0, TWO_PI, false);
//     ctxUI.fill();
//   }

//   pos = pos + dt / 1000;

//   if (pos * 4 > path.length) {
//     pos = 0;
//     ctxUI.clearRect(0, 0, width, height);
//     return;
//   }

//   var p = getPathPosition(path, pos);

//   ctxUI.beginPath();
//   ctxUI.fillStyle = '#0f0';
//   ctxUI.arc(p[0], p[1], 2, 0, TWO_PI, false);
//   ctxUI.fill();
// }