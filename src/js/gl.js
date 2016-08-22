/* global gl */

var buffers = [];
var textures = [];
var programs = [];
var uniforms = [];
var attributes = [];

var rectVertexBuffer;

function initPrograms() {

}

function initBuffers() {
  var vertices = [
        0, 0,
        1, 0,
        0, 1,
        0, 1,
        1, 0,
        1, 1
    ];

    rectVertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, rectVertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function initShaders() {

}

function setUniforms(uniforms) {

}

function createShader(src, type) {
  var shader = gl.createShader(type);

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    /* dev */
    console.error('An error occurred compiling the shaders:', + gl.getShaderInfoLog(shader));
    /* end-dev */
    return null;
  }

  return shader;
}

function createBuffer(vertices) {
  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  return buffers.push(buffer);
}

function createProgram(vertexShader, fragmentShader) {
  var program = gl.createProgram();

  gl.attachShader(program, fragmentShader);
  gl.attachShader(program, vertexShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    /* dev */
    console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    /* end-dev */
    return null;
  }

  return programs.push(program);
}

function createTexture(image, repeat) {
  repeat = repeat ? gl.REPEAT : gl.CLAMP_TO_EDGE;

  var texture = gl.createTexture();

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, repeat);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, repeat);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  return textures.push(texture);
}

function useTexture(i) {
  gl.bindTexture(gl.TEXTURE_2D, textures[i]);
}



function draw(texture, width, height, matrix) {

}