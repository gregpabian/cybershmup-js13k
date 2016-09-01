/* global Stats width height ctx resize ctxUI performance waves collideCircles
clicked: true scenes currentScene: true isMobile handleKeys */

/* dev */
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
/* end-dev */

var last = 0;
var dt = 0;

function loop(now) {
  /* dev */
  stats.begin();
  /* end-dev */
  dt = Math.min(now - last, 100);
	last = now;

  handleInput();

	update();

  render();
  /* dev */
  stats.end();
  /* end-dev */
  requestAnimationFrame(loop);
}

var sw = 0;
var sh = 0;
var lastResize = 0;

function update() {
  var now = performance.now();

  if (now - lastResize > 250) {
    lastResize = now;

    var ww = window.innerWidth;
    var wh = window.innerHeight;

    if (ww !== sw || wh !== sh) {
      sw = ww;
      sh = wh;

      resize(sw, sh);
    }
  }

  scenes[currentScene][1]();
}

function handleInput() {
  if (!isMobile) handleKeys();
  scenes[currentScene][2]();
}

function render() {
  ctx.clearRect(0, 0, width, height);
 	ctxUI.clearRect(0, 0, width, height);

  // render scene
  scenes[currentScene][3]();
}

function changeScene(id) {
  currentScene = id;
  // initialize scene
  scenes[currentScene][0].apply(null, Array.prototype.slice.call(arguments, 1));
}

changeScene(currentScene);
requestAnimationFrame(loop);


function drawBody(body) {
  if (!body[4]) return;

  ctx.drawImage(body[0], ~~(body[2][0] - body[1] / 2), ~~(body[2][1] - body[1] / 2));
}

function collideWithEnemies(body) {
  waves.forEach(function (wave) {
    wave[2].forEach(function (ship) {
      if (!ship[4]) return;

      if (collideCircles(body[2], body[1], ship[2], ship[1])) {
        body[4] = ship[4] = 0;
      }
    });
  });
}