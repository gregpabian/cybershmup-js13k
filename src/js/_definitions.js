var isMobile = 'ontouchstart' in document;

var width = isMobile ? 480 : 600;
var height = isMobile ? 640 : 800;
var sc = 1;
var wx = 0;
var wy = 0;

var TWO_PI = 2 * Math.PI;

var SIZE_XS = 0.0375 * width; // 18 or 24px
var SIZE_S = 0.05 * width; // 24 or 32px
var SIZE_M = 0.0625 * width; // 30 or 40px
var SIZE_L = 0.075 * width; // 36 or 48px
var SIZE_XL = 0.0875 * width; // 42 or 56px
var SIZE_XXL = 0.1 * width; // 48 or 64px
var SIZE_XXXL = 0.125 * width; // 60 or 80px

var ENEMY = {
  'ss': [
    SIZE_S, // size 30 or 40px
    'f00', // main shape color
    0, -0.5,
    0.5, -0.25,
    0.5, 0.25,
    0, 0.5,
    -0.5, 0.25,
    -0.5, -0.25
  ]
};

var PLAYER = [
  SIZE_XL, // size
  'fff', // main shape color
  0, -0.5,
  0.4, 0.2,
  0.2, 0.4,
  -0.2, 0.4,
  -0.4, 0.2,
  'f0f', // window shape color
  0, -0.2,
  0.1, 0,
  -0.1, 0
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
  // column
  'c': [
    -0.2, 0.1,
    0.0, 0.1,
    0.2, 0.1,
    0.4, 0.1,
    0.4, 0.3,
    0.4, 0.5,
    0.4, 0.7,
    0.4, 0.9,
    0.4, 1.1
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