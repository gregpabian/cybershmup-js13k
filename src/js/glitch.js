/* global hex2rgba makeSprite GLITCH_IMG glitch width height dt waves ENEMY
bullets SIZE_XXXS drawSprite updateSprite clamp glitchBullet glitchEnemy */

var glitchSpeed = 200;
var glitchSize = 128;

function renderGlitch() {
  var c = document.createElement('canvas');
  c.width = 480;
  c.height = glitchSize;
  var ctx = c.getContext('2d');
  var grad = ctx.createLinearGradient(0, 0, 0, glitchSize);
  var color = hex2rgba('0ff', 0);
  grad.addColorStop(0, color);
  grad.addColorStop(0.5, '#0ff');
  grad.addColorStop(1, color);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 480, glitchSize);

  return c;
}

function makeGlitch() {
  return [
    makeSprite(GLITCH_IMG),
    width / 2, // x
    height + glitchSize / 2, // y
    1, // a
    0 // alive
  ];
}

function updateGlitch() {
  if (!glitch[4]) return;

  glitch[2] -= glitchSpeed * dt / 1000;

  if (glitch[2] < -glitchSize / 2) {
    glitch[4] = 0;
  }

  glitch[3] = clamp(glitch[2] / height + 0.1, 0, 1);

  updateSprite(glitch[0], glitch[1], glitch[2], 0, glitch[3]);
}

function drawGlitch() {
  if (!glitch[4]) return;
  drawSprite(glitch[0]);
}

function resetGlitch() {
  glitch[2] = height + glitchSize / 2;
  glitch[3] = glitch[4] = 1;
}

function collideGlitchWithWaves() {
  if (!glitch[4]) return;

  waves.forEach(function (wave) {
    wave[3].forEach(function (enemy) {
      var hs = ENEMY[enemy[0]][0] / 2;
      // enemy is alive, not glitched and collides with glitch wave
      if (enemy[3] > 0 && !enemy[6] &&
        enemy[1][1] + hs >= glitch[2] - glitchSize / 2 &&
        enemy[1][1] - hs <= glitch[2] + glitchSize / 2) {
        glitchEnemy(enemy);
      }
    });
  });
}

function collideGlitchWithBullets() {
  if (!glitch[4]) return;

  bullets[0].forEach(function (bullet) {
    // bullets is alive, not player's, not glitched and collides with glitch wave
    if (bullet[5] && !bullet[6] && !bullet[7] &&
      bullet[3][1] + SIZE_XXXS / 2 >= glitch[2] - glitchSize / 2 &&
      bullet[3][1] - SIZE_XXXS / 2 <= glitch[2] + glitchSize / 2) {
      glitchBullet(bullet);
    }
  });
}