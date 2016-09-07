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

function rgb2hex(rgb) {
  return rgb.map(function (c) {
    c = (~~c).toString(16);

    if (c.length === 1) {
      c = '0' + c;
    }

    return c;
  }).join('');
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

function disableAA(ctx) {
	['mozI', 'msI', 'i'].forEach(function(name) {
		ctx[name + 'mageSmoothingEnabled'] = false;
	});

	return ctx;
}

function padZero(value) {
  value += '';
  var l = 9 - value.length + 1;

  return (new Array(l < 0 ? 0 : l)).join(0) + value;
}

function adjustBrightness(color, brightness) {
  return color.map(function (c) { return c * brightness;});
}