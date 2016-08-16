/* global player, mx, my, updateShip, isMobile, vectorNormalize, vectorDistance, vectorMultiply, vectorSubtract, width */

function updatePlayer() {
  var v = [0, 0];
  
  if (isMobile) {
    if (mx >= 0 && my >= 0) {
      var d = vectorDistance(player[2], [mx, my]);
      
      v = vectorSubtract([mx, my], player[2]);
      v = vectorNormalize(v);
      v = vectorMultiply(v, d / width * player[4]);
    }
  } else {
    v = vectorNormalize([mx, my]);
    v = vectorMultiply(v, 6);
  }
  
  updateShip(player, v, 1);
}