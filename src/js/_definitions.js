var isMobile = 'ontouchstart' in document;

var width = 480;
var height = 640;
var sc = 1;
var wx = 0;
var wy = 0;

var TWO_PI = 2 * Math.PI;

var SIZE_XXXS = 12;
var SIZE_XXS = 16;
var SIZE_XS = 24;
var SIZE_S = 32;
var SIZE_M = 40;
var SIZE_L = 48;
var SIZE_XL = 56;
var SIZE_XXL = 64;
var SIZE_XXXL = 72;

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

var BULLET = [
  [SIZE_XXXS, 'fc0']
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

(function () {
  for (var i = 1; i <= 7; i++) {
    var p = PATH[i] = [];

    for (var j = -1; j < 12; j += 2) {
      p.push(i * 0.125, j / 10);
   }
  }
})();

var currentState = 0;

var states = [
  // menu
  [
    // 0 init
    function () {

    },
    // 1 update
    function () {

    },
    // 2 render
    function () {

    }
  ],

  // level picker
  [
    // init
    function () {

    },
    // update
    function () {

    },
    // render
    function () {

    }
  ],

  // gameplay
  [
    // init
    function () {

    },
    // update
    function () {

    },
    // render
    function () {

    }
  ],

  // pause
  [
    // init
    function () {

    },
    // update
    function () {

    },
    // render
    function () {

    }
  ],

  // credits
  [
    // init
    function () {

    },
    // update
    function () {

    },
    // render
    function () {

    }
  ]
];