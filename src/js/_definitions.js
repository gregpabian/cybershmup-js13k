var isMobile = 'ontouchstart' in document;
var width = 480;
var height = 640;

var TWO_PI = 2 * Math.PI;

var V_RIGHT = [1, 0];
var V_DOWN = [0, width];

var SIZE_XXXS = 12;
var SIZE_XXS = 16;
var SIZE_XS = 24;
var SIZE_S = 32;
var SIZE_M = 40;
var SIZE_L = 48;
var SIZE_XL = 56;
var SIZE_XXL = 64;
var SIZE_XXXL = 72;

var BULLET = [
  // player bullets
  ['fff', 1, 500],
  ['fc6', 1, 600],
  ['ff0', 1, 700],
  // enemy bullets
  ['06f', 0, 150],
  ['0cf', 0, 200],
  ['0ff', 0, 250]
];

var BULLET_IMG;

var COLLECTIBLE = {
  'h': ['0f0', '✚', 1],
  'w': ['f0c', '✊', 1],
  'e': ['0cf', '⚡', 1]
};

var ENEMY = {
  'ss': [
    SIZE_S,
    [ // enemy shape
      'fff', // main shape color
      -0.2, -0.5,
      0.2, -0.5,
      0.5, -0.2,
      0, 0.5,
      -0.5, -0.2,
      'fff',
      0, -0.5,
      0, -0.1
    ],
    3, // hp
    -1 // weapon level, -1 = no weapon
  ],
  'sm': [
    SIZE_M,
    [ // enemy shape
      'fff', // main shape color
      0, -0.5,
      0.5, -0.1,
      0.5, 0.1,
      0.2, 0.1,
      0, 0.5,
      -0.2, 0.1,
      -0.5, 0.1,
      -0.5, -0.1,
      'fff',
      0, -0.5,
      0, -0.2,
      'f0f', // gun shape color
      -0.1, 0,
      0.1, 0,
      0, 0.2
    ],
    5, // hp
    0 // weapon level, -1 = no weapon
  ],
  'sl': [
    SIZE_L,
    [ // enemy shape
      'fff', // main shape color
      -0.2, -0.5,
      0.2, -0.5,
      0.5, -0.2,
      0.5, 0.1,
      0.3, 0.5,
      0.2, 0.1,
      -0.2, 0.1,
      -0.3, 0.5,
      -0.5, 0.1,
      -0.5, -0.2,
      'fff',
      -0.2, -0.5,
      -0.2, -0.3,
      -0.5, -0,
      -0.5, -0.3,
      'fff',
      0.2, -0.5,
      0.2, -0.3,
      0.5, -0,
      0.5, -0.3,
      'f0f', // gun shape color
      0, -0.2,
      0.2, 0,
      -0.2, 0
    ],
    7, // hp
    1 // weapon level, -1 = no weapon
  ]
};

var EXPLOSION_IMG;
var GLITCH_IMG;
var MISSILE_IMG;

var TURRET = {
  // size, color, hp, shot angle, shot angle offset
  'ts': [SIZE_S, '0f0', 5, 0, Math.PI / 2, Math.PI / 4],
  'tm': [SIZE_M, 'ff0', 7, 1, Math.PI / 4],
  'tl': [SIZE_L, 'f03', 10, 2, Math.PI / 6]
};

var PLAYER = [
  SIZE_XL, // size
  [
    'fff', // main shape color
    0, -0.5,
    0.3, 0,
    0.5, 0.1,
    0.45, 0.25,
    0.2, 0.4,
    0, 0.35,
    -0.2, 0.4,
    -0.45, 0.25,
    -0.5, 0.1,
    -0.3, 0,
    'f0f', // window shape color
    0, -0.3,
    0.1, -0.1,
    -0.1, -0.1,
    'fff',
    0, 0.2,
    0, 0.5,
    'fff',
    0.3, 0,
    0.1, 0.1,
    'fff',
    -0.3, 0,
    -0.1, 0.1
  ]
];

var WEAPON = [
  // bullet, delay between shots (ms), bullet vector(s) and locations (0, 0 if none given), rocket timer
  // pulse laser
  [0, 500, [Math.PI / 2]],
  [1, 250, [Math.PI / 2]],
  [2, 166, [Math.PI / 2]],
  [2, 200, [Math.PI / 2, [-0.3, 0]], [Math.PI / 2, [0.3, 0]]],
  [2, 200, [Math.PI * 2 / 3], [Math.PI / 2], [Math.PI / 3]],
  [2, 200, [Math.PI * 2 / 3], [Math.PI / 2], [Math.PI / 3], 1500],
  [2, 200, [Math.PI * 2 / 3], [Math.PI / 2], [Math.PI / 3], 1000],
  [2, 200, [Math.PI * 2 / 3], [Math.PI / 2], [Math.PI / 3], 500]
];

var ENEMY_WEAPON = [
  [3, 1700],
  [4, 1500],
  [5, 1300]
];

var PATH = {
  // zig-zag
  'z': [
    0.2, -0.1,
    0.2, 0.1,
    0.5, 0.1,
    0.8, 0.1,
    0.8, 0.3,
    0.8, 0.5,
    0.5, 0.5,
    0.2, 0.5,
    0.2, 0.7,
    0.2, 0.9,
    0.5, 0.9,
    0.8, 0.9,
    0.8, 1.1
  ],
  // slide
  's': [
    -0.1, -0.1,
    0.05, 0.05,
    0.2, 0.2,
    0.35, 0.35,
    0.5, 0.5,
    0.65, 0.65,
    0.8, 0.8,
    0.95, 0.95,
    1.1, 1.1
  ],
  // arc
  'a': [
    -0.2, 0,
    0, 0,
    0.3, 0.05,
    0.6, 0.1,
    0.77, 0.3,
    0.9, 0.5,
    0.77, 0.7,
    0.6, 0.9,
    0.3, 0.95,
    0, 1,
    -0.2, 1
  ],
  // u-turn
  'u': [
    0.2, -0.1,
    0.2, 0,
    0.2, 0.2,
    0.2, 0.4,
    0.2, 0.6,
    0.2, 0.8,
    0.5, 0.8,
    0.8, 0.8,
    0.8, 0.6,
    0.8, 0.4,
    0.8, 0.2,
    0.8, 0,
    0.8, -0.1
  ]
};

// generate vertical paths 1 - 7
for (var i = 1; i <= 7; i++) {
  var p = PATH[i] = [];

  for (var j = -1; j < 12; j += 2) {
    p.push(i * 0.125, j / 10);
 }
}