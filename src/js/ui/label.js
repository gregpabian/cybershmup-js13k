/* global Image, fImage, ctxUI, hex2rgb */

var fontImage = new Image();
fontImage.src = fImage;

var chars = 'abcdefghijklmnopqrstuvwxyz1234567890!?".,\':';

function makeLabel(x, y, text, color, size) {
  return [
    x, // 0
    y, // 1
    size, // 2
    color, // 3
    text, // 4 - current text
    text // 5 - old text
    // 6 - canvas
  ];
}

function updateLabel(label, text) {
  if (text != label[4]) {
    label[5] = label[4];
    label[4] = text;
  }
}

function drawLabel(label) {
  if (!label[6] || label[4] !== label[5]) {
    var c = label[6] = document.createElement('canvas');
    c.height = 5;
    c.width = 4 * label[4].length - 1;
    var ctx = c.getContext('2d');

    for (var i = 0; i < label[4].length; i++) {
      var j = chars.indexOf(label[4][i]);

      if (j > -1) ctx.drawImage(fontImage, j * 3, 0, 3, 5, i * 4, 0, 3, 5);
    }

    var imgData = ctx.getImageData(0, 0, c.width, 5);
    var data = imgData.data;

    var color = hex2rgb(label[3]);

    for (i = 0; i < data.length; i += 4) {
			data[i] = color[0];
			data[i + 1] = color[1];
			data[i + 2] = color[2];
		}

		ctx.putImageData(imgData, 0, 0);
  }

  ctxUI.drawImage(label[6], label[0], label[1], (4 * label[4].length - 1) * label[2], 5 * label[2]);
}