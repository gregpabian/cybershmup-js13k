/* global Stats, width, height, ctx, ctxUI, resize, drawShip, updatePlayer,
handleKeys,isMobile, player, drawBackground, updateBackground,
performance, waves, drawWave, updateWave */

/* dev */
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
/* end-dev */

requestAnimationFrame(render);

var last = 0;
var dt = 0;

function render(now) {
  /* dev */
  stats.begin();
  /* end-dev */
  dt = Math.min(now - last, 100);
	last = now;

	update();

  // renderUI();
  renderGame();
  renderFX();
  /* dev */
  stats.end();
  /* end-dev */
  requestAnimationFrame(render);
}

// function renderUI() {
//   // ctxUI.clearRect(0, 0, width, height);
// }

function renderGame() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
// 	ctx.translate(camera.sx, camera.sy);
  drawBackground();
  drawBody(player);
  player[4].forEach(drawBody);
  waves.forEach(drawWave);

	ctx.restore();
}

function renderFX() {

}

var sw = 0;
var sh = 0;
var lastResize = 0;

function update() {
  if (!isMobile) handleKeys();
  updatePlayer();
  updateBackground();
  waves.forEach(updateWave);

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
}


function drawBody(body) {
  if (!body[4]) return;

  ctx.drawImage(body[0], ~~(body[2][0] - body[1] / 2), ~~(body[2][1] - body[1] / 2));
}