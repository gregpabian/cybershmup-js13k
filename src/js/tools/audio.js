/* global webkitAudoContext jsfxr soundOn */

var AudioContext = AudioContext || webkitAudoContext;

var makeSound, playSound;

var SOUNDS = [
  // menu
  [0,, 0.0135, 0.32, 0.16, 0.33,,,,,,, 0.5,,,,,, 1,,,,, 0.4],
  // loading
  [0,, 0.34,, 0.49, 0.49,,,,,, 0.52, 0.5,, -1,, -1,, 1, -1,,, -1, 0.5],
  // shot
  [0,,0.22,,0.17,0.96,0.4,-0.286,,,,,,0.526,-0.652,,0.194,-0.019,1,,,0.013,,0.3],
  // explosion
  [3,,0.24,0.71,0.36,0.5405,,-0.3906,,,,0.0316,0.6223,,,,,,1,,,,,0.5],
  // explosion 2
  [3,,0.3861,0.7784,0.3445,0.1194,,-0.3543,,,,,,,,0.46,,,1,,,,,0.5],
  // shot 2
  [0,,0.27,,0.3,0.53,0.2,-0.3,,,,,,0.8,-0.565,,0.164,-0.157,1,,,0.012,,0.3]
];

if (AudioContext) {
  var audioCtx = new AudioContext();
  var dest = audioCtx.destination;

  makeSound = function (config) {
    return jsfxr(config).split('base64,')[1];
  };

  playSound = function (sound, randomPitch) {
    if (!soundOn) return;

    var src = audioCtx.createBufferSource();

    audioCtx.decodeAudioData(base64ToArrayBuffer(sound), function (buffer) {
      src.buffer = buffer;
      src.detune.value = randomPitch ? Math.random() * 400 - 200 : 1;
      src.connect(dest);
      src.start(0);

      setTimeout(function () {
        src.disconnect(dest);
      }, src.buffer.duration * 1000 + 100);
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