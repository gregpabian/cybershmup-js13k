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

function vectorRotate(v, rad) {
		return [
		  v[0] * Math.cos(rad) + v[1] * Math.sin(rad),
		  -v[0] * Math.sin(rad) + v[1] * Math.cos(rad)
		];
}

function lerp(v1, v2, t) {
  return vectorAdd(v1, vectorMultiply(vectorSubtract(v2, v1), t));
}

function collideCircles(v1, d1, v2, d2) {
  return vectorDistance(v1, v2) < (d1 + d2) / 2;
}

function collideCircleRect(v1, d1, v2, w, h) {
  // v1 sits within the rectangle
  if (isVectorInRect(v1, v2, w, h)) return true;

  var tl = [v2[0] - w / 2, v2[1] - h / 2];
  var tr = [v2[0] + w / 2, v2[1] - h / 2];
  var bl = [v2[0] - w / 2, v2[1] + h / 2];
  var br = [v2[0] + w / 2, v2[1] + h / 2];
  var r = d1 / 2;

  // circle intersects with top edge
  return (vectorDistance(v1, projectOnSegment(v1, tl, tr)) <= r) ||
    // circle intersects with left edge
    (vectorDistance(v1, projectOnSegment(v1, tl, bl)) <= r) ||
    // circle intersects with right edge
    (vectorDistance(v1, projectOnSegment(v1, tr, br)) <= r) ||
    // circle intersects with bottom edge
    (vectorDistance(v1, projectOnSegment(v1, bl, br)) <= r);
}

function isVectorInRect(v1, v2, w, h) {
  return v1[0] > v2[0] - w / 2 &&
    v1[0] < v2[0] + w / 2 &&
    v1[1] > v2[1] - h / 2 &&
    v1[1] < v2[1] + h / 2;
}

function projectOnSegment(p, v1, v2) {
  var a = v2[1] - v1[1];
  var b = v1[0] - v2[0];
  var c1 = a * v1[0] + b * v1[1];
  var c2 = -b * p[0] + a * p[1];
  var d = a * b + b * b;

  if (d !== 0) {
    return [
      (a * c1 - b * c2) / d,
      (a * c2 + b * c1) / d
    ];
  // point's on the line
  } else {
    return [].concat(p);
  }
}