/* global gl, width, height */

// px, py, ux, uy, r, g, b, a x 4
var defaultVertices = [
    0, 0, 0, 0, 1, 1, 1, 1,
    1, 0, 1, 0, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
    0, 1, 0, 1, 1, 1, 1, 1
];

var stepSize = defaultVertices.length / 4;

function getUniformLocation(program, name) {
    return program[name] || (program[name] = gl.getUniformLocation(program[0], name));
}

function makeShader(src, type) {
    var shader = gl.createShader(type);

    gl.shaderSource(shader, src);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders:', + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

function makeProgram(vs, fs, attributes) {
    fs = makeShader(fs, gl.FRAGMENT_SHADER);
    vs = makeShader(vs, gl.VERTEX_SHADER);

    var program = gl.createProgram();

    gl.attachShader(program, fs);
    gl.attachShader(program, vs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
        return gl.deleteProgram(program);
    }

    program = [program];

    for (var i = 0; i < attributes.length; i++) {
        program[attributes[i]] = gl.getAttribLocation(program[0], attributes[i]);
        gl.enableVertexAttribArray(program[attributes[i]]);
    }

    return program;
}

function makeTexture(image) {
    var texture = gl.createTexture();

    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    if (image) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    } else {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    }

    return texture;
}

function useTexture(texture, unit) {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    return unit;
}

function makeFramebuffer() {
    var fbo = gl.createFramebuffer();
    var texture = makeTexture();

    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    return [fbo, texture];
}

function setFramebuffer(fbo) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
}

function makeBuffer(items, type) {
    type = type || gl.ARRAY_BUFFER;

    var buffer = gl.createBuffer();

    gl.bindBuffer(type, buffer);
    gl.bufferData(type, items, gl.STATIC_DRAW);

    return buffer;
}

function makeBatch(image, size) {
    var vertices = makeVertices(size);

    return [
        makeTexture(image),
        vertices,
        makeBuffer(vertices),
        makeBuffer(makeIndices(size), gl.ELEMENT_ARRAY_BUFFER)
    ];
}

function drawBatch(batch, program, count) {
    gl.useProgram(program[0]);
    gl.uniform1i(getUniformLocation(program, 'texture'), useTexture(batch[0], 0));

    gl.bindBuffer(gl.ARRAY_BUFFER, batch[2]);
    gl.bufferData(gl.ARRAY_BUFFER, batch[1], gl.STATIC_DRAW);

    gl.vertexAttribPointer(program['a_pos'], 2, gl.FLOAT, false, stepSize * 4, 0);
    gl.vertexAttribPointer(program['a_uv'], 2, gl.FLOAT, false, stepSize * 4, 4 * 2);
    gl.vertexAttribPointer(program['a_color'], 4, gl.FLOAT, false, stepSize * 4, 4 * 4);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, batch[3]);

    gl.drawElements(gl.TRIANGLES, count * 6, gl.UNSIGNED_SHORT, 0);
}

function makeIndices(length) {
    var indices = [];

    length *= 6;

    for (var i = 0, j = 0; i < length; i += 6, j += 4) {
        indices[i + 0] = j + 0;
        indices[i + 1] = j + 1;
        indices[i + 2] = j + 2;
        indices[i + 3] = j + 0;
        indices[i + 4] = j + 2;
        indices[i + 5] = j + 3;
    }

    return new Uint16Array(indices);
}

function makeVertices(length) {
    var vertices = [];

    while (length) {
        vertices = vertices.concat(defaultVertices);
        length--;
    }

    return new Float32Array(vertices);
}

function updateBatchVertices(batch, i, p0, p1, p2, p3, color) {
    var vertices = batch[1];
    var offset = i * 4 * stepSize;

    vertices[offset + 0] = p0[0];
    vertices[offset + 1] = p0[1];

    vertices[offset + stepSize + 0] = p1[0];
    vertices[offset + stepSize + 1] = p1[1];

    vertices[offset + stepSize * 2 + 0] = p2[0];
    vertices[offset + stepSize * 2 + 1] = p2[1];

    vertices[offset + stepSize * 3 + 0] = p3[0];
    vertices[offset + stepSize * 3 + 1] = p3[1];

    for (var j = 0; j < 4; j++) {
        vertices[offset + stepSize * j + 4] = color[0];
        vertices[offset + stepSize * j + 5] = color[1];
        vertices[offset + stepSize * j + 6] = color[2];
        vertices[offset + stepSize * j + 7] = color[3];
    }
}