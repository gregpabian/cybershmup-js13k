function clamp(number, min, max) {
  return number < min ? min : number > max ? max : number;
}

function hex2rgba(hex, a) {
  var rgb = hex2rgb(hex);

  return 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ',' + a + ')';
}

function hex2rgb(hex) {
  hex = hex.split('');

  return [
    parseInt(hex[0] + hex[0], 16),
    parseInt(hex[1] + hex[1], 16),
    parseInt(hex[2] + hex[2], 16)
  ];
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

function dis(ctx) {
	['mozI', 'webkitI', 'msI', 'i'].forEach(function(name) {
		ctx[name + 'mageSmoothingEnabled'] = false;
	});

	return ctx;
}