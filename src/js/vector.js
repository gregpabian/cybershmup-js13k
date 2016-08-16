function vectorLength(v) {
  return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
}

function vectorNormalize(v) {
  var l = vectorLength(v);
  
  if (l === 0) {
    return [0, 0];
  }
  
  return [v[0] / l, v[1] / l];
}

function vectorDistance(v1, v2) {
  var dx = v2[0] - v1[0];
	var dy = v2[1] - v1[1];

	return Math.sqrt(dx * dx + dy * dy);
}

function vectorMultiply(v, s) {
  return [v[0] * s, v[1] * s];
}

function vectorAdd(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

function vectorSubtract(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}