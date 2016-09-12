/* global TWO_PI */

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

function adjustBrightness(color, brightness) {
  return color.map(function (c) { return c * brightness;});
}

function adjustHex(hex, brightness) {
  return rgb2hex(adjustBrightness(hex2rgb(hex), brightness));
}

function randomChance(seed, probability) {
  return random(seed) <= probability / 100;
}

function normalizeAngle(a) {
  return a - TWO_PI * Math.floor((a + Math.PI) / TWO_PI);
}

var rngs = {};

function random(seed, reset) {
  if (!rngs[seed] || reset) {
    rngs[seed] = [seed];
  }

  return !reset && makeRandom(seed);
}

function makeRandom(seed) {
  var result = Math.sin(rngs[seed][0]++) * 10000;
  return result - Math.floor(result);
}

function randomInt(seed, max) {
  return ~~(random(seed) * max);
}

function randomInRange(seed, min, max) {
  return randomInt(seed, max - min) + min;
}

function randomBoolean(seed) {
  return random(seed) < 0.5;
}

function randomIntWeighted(seed, max) {
  return Math.floor(Math.pow(random(seed), 2) * (max + 1));
}