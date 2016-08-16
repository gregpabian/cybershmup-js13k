/* global performance, width, height, ctx, ctxUI, drawShip, updatePlayer, handleKeys, isMobile, player, drawBackground, updateBackground */

requestAnimationFrame(render);

var last = 0;
var dt = 0;

function render(now) {
  stats.begin();
  dt = now - last;
	last = now;

	update();

  renderUI();
  renderGame();
  renderFX();
  stats.end();
  requestAnimationFrame(render);
}

function renderUI() {
  ctxUI.clearRect(0, 0, width, height);
}

function renderGame() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
// 	ctx.translate(camera.sx, camera.sy);

  drawBackground();
  drawShip(player);
	
	ctx.restore();
}

function renderFX() {
  
}

function update() {
  if (!isMobile) handleKeys();
  updatePlayer();
  updateBackground();
}