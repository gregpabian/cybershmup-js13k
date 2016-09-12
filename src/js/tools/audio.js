/* global jsfxr soundOn randomInRange initialSeed */

var AudioContext = window.AudioContext || window.webkitAudoContext;

var makeSound, playSound;

var SOUNDS = [
  // menu
  [0,, 0.0135, 0.32, 0.16, 0.33,,,,,,, 0.5,,,,,, 1,,,,, 0.4],
  // shot
  [0,,0.22,,0.17,0.96,0.4,-0.286,,,,,,0.53,-0.65,,0.2,-0.02,1,,,0.013,,0.3],
  // explosion
  [3,,0.24,0.71,0.36,0.54,,-0.39,,,,0.032,0.62,,,,,,1,,,,,0.5]
];

if (AudioContext) {
  var audioCtx = new AudioContext();
  var dest = audioCtx.destination;

  makeSound = function (config) {
    return jsfxr(config).split('base64,')[1];
  };

  playSound = function (sound, randomPitch, lower) {
    if (!soundOn) return;

    var src = audioCtx.createBufferSource();

    audioCtx.decodeAudioData(base64ToArrayBuffer(sound), function (buffer) {
      src.buffer = buffer;
      var min = lower ? -2000 : -200;
      var max = lower ? -1500 : 200;
      src.detune.value = randomPitch ? randomInRange(initialSeed, min, max) : 1;
      src.connect(dest);
      src.start(0);

      setTimeout(function () {
        src.disconnect(dest);
      }, src.buffer.duration * 1000 + 200);
    });
  };
} else {
  makeSound = playSound = function () {};
}

function base64ToArrayBuffer(base64) {
  var binaryString =  window.atob(base64);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);

  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer;
}