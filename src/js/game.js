/* global Stats, width, height, ctx, resize, updatePlayer, ctxUI,
handleKeys,isMobile, player, drawBackground, updateBackground, drawGauge,
performance, waves, drawWave, updateWave, collideCircles, startPos,
updateGauge, glitchGauge, weaponGauge, healthGauge, drawLabel, drawButton,
testLabel, testButton */

/* dev */
var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
/* end-dev */

requestAnimationFrame(loop);

var last = 0;
var dt = 0;
var glitchValueTimer = 0;
var glitchValue = 1;

function loop(now) {
  /* dev */
  stats.begin();
  /* end-dev */
  dt = Math.min(now - last, 100);
	last = now;

	update();

	glitchValueTimer += dt;

	if (glitchValueTimer > 500) {
	  glitchValueTimer = 0;
	  glitchValue++;

	  if (glitchValue > 10) glitchValue = 0;
	}

	updateGauge(glitchGauge, glitchValue);
	updateGauge(weaponGauge, glitchValue);
	updateGauge(healthGauge, glitchValue);

	if (clicked) {
	  if (handleClick(mx, my, testButton)) {
	    clicked = false;
	  }
	}

  renderGame();
  /* dev */
  stats.end();
  /* end-dev */
  requestAnimationFrame(loop);
}

function renderGame() {
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  drawBackground();
  drawBody(player);
  player[5].forEach(drawBody);
  waves.forEach(drawWave);

	ctx.restore();

	ctxUI.clearRect(0, 0, width, height);

	drawGauge(healthGauge);
	drawGauge(weaponGauge);
	drawGauge(glitchGauge);

	drawLabel(testLabel);
	drawButton(testButton);
}


var sw = 0;
var sh = 0;
var lastResize = 0;

function update() {
  if (!isMobile) handleKeys();
  updatePlayer();

  player[5].forEach(collideWithEnemies);
  collideWithEnemies(player);

  if(!player[4]) {
    player[4] = 1;
    player[2] = [].concat(startPos);
  }

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