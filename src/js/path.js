/* global PATH, TWO_PI, ctx, ctxUI, width, height, dt, lerp */

function makePath(type, mirror) {
  var path = PATH[type].slice();
  return mirror ? mirrorPath(path) : path;
}

function mirrorPath(path) {
  path = path.slice();

  for (var i = 0; i < path.length; i += 2) {
    path[i] = 1 - path[i];
  }

  return path;
}

function getPathPosition(path, pos) {
  var i = ~~(pos) * 4;
  var len = path.length;

  if (i < len - 4) {
    var t = pos - ~~(pos);
    var a = [path[i], path[i + 1]];
    var b = [path[i + 2], path[i + 3]];
    var c = [path[i + 4], path[i + 5]];
    var p1 = lerp(a, b, t);
    var p2 = lerp(b, c, t);
    var p3 = lerp(p1, p2, t);

    return [p3[0] * width, p3[1] * height];
  }

  // return the last point of path
  return [path[len - 2] * width, path[len - 1] * height];
}