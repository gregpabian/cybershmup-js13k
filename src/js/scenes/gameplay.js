var gameplay = [
  // 0 init
  function () {
    var glitchGauge = makeGauge(width / 2 + 17, height, 480, '0cf', '022', 10, 0, -0.05);
    var healthGauge = makeGauge(-20, 430, 300, '0d0', '020', 5, 0, -1.6);
    var weaponGauge = makeGauge(480, 450, 300, 'f0c', '202', 10, 0, -1.53, 1);

    var testLabel = makeLabel(20, 20, '00001234', 'fff', 4);

    var player = [
      PLAYER[1], // player image
      PLAYER[0], // player size
      [].concat(startPos), // position vector
      [0, 0], // velocity vector
      1, // alive flag
      [] // bullets
    ];


    waves.push(makeWave(1, 'ss', 'z', 10));
    waves.push(makeWave(1, 'ss', 'zm', 10));
    waves.push(makeWave(9, 'ss', 'c', 10));
    waves.push(makeWave(9, 'ss', 'cm', 10));
    waves.push(makeWave(14, 'ss', 's', 10));
    waves.push(makeWave(14, 'ss', 'sm', 10));
    waves.push(makeWave(20, 'ss', 'a', 10));
    waves.push(makeWave(20, 'ss', 'am', 10));
    waves.push(makeWave(27, 'ss', 'ux', 10));
    waves.push(makeWave(27, 'ss', 'umx', 10));
    waves.push(makeWave(33, 'ss', '1', 10));
    waves.push(makeWave(34, 'ss', '2', 10));
    waves.push(makeWave(35, 'ss', '3', 10));
    waves.push(makeWave(36, 'ss', '4', 10));
    waves.push(makeWave(37, 'ss', '5', 10));
    waves.push(makeWave(38, 'ss', '6', 10));
    waves.push(makeWave(39, 'ss', '7', 10));

    // waves.push(makeWave(1, 'ss', '1', 30));
    // waves.push(makeWave(1, 'ss', '2', 30));
    // waves.push(makeWave(1, 'ss', '3', 30));
    // waves.push(makeWave(1, 'ss', '4', 30));
    // waves.push(makeWave(1, 'ss', '5', 30));
    // waves.push(makeWave(1, 'ss', '6', 30));
    // waves.push(makeWave(1, 'ss', '7', 30));
  },
  // 1 update
  function () {

  },
  // 2 input
  function () {

  },
  // 3 render
  function () {

  }
];