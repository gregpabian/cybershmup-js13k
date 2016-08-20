function clamp(number, min, max) {
  return number < min ? min : number > max ? max : number;
}

function hex2rgba(hex, a) {
  hex = hex.split('');

  return 'rgba(' + parseInt(hex[0] + hex[0], 16) + ', ' +
    parseInt(hex[1] + hex[1], 16) + ', ' +
    parseInt(hex[2] + hex[2], 16) + ',' + a + ')';
}

function disposeDead(bodies) {
  var i = bodies.length - 1;

  while (bodies[i]) {
    if (!bodies[i][4]) {
      bodies.splice(i, 1);
    }
    i--;
  }
}