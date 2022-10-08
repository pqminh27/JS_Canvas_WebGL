"use strict";

//Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "attribute vec4 a_Color;\n" +
    "varying vec4 v_color;\n" +
    "void main() {\n" +
    "  gl_Position = a_Position;\n" +
    // "  gl_PointSize = 10.0;\n" +
    "  gl_PointSize = a_PointSize;\n" +
    "  v_color = a_Color;\n" +
    "}\n";

const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_color;\n" +
    "void main() {\n" +
    // "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" +
    "   gl_FragColor = v_color;\n" +
    "}\n";

function main() {
    const canvas = document.getElementById("mycanvas");
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return;
    }

    const g_colors = {
        white: [1.0, 1.0, 1.0, 1.0],
        red: [1.0, 0.0, 0.0, 1.0],
        green: [0.0, 1.0, 0.0, 1.0],
        cyan: [0.0, 1.0, 1.0, 1.0],
        blue: [0.0, 0.0, 1.0, 1.0],
    };

    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const sizes = new Float32Array([10, 20, 30]);
    const colors = new Float32Array([
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[3],/
        g_colors.green[0],
        g_colors.green[1],
        g_colors.green[2],
        g_colors.green[3],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[3],
    ]);

    const buffer_data = gl.createBuffer();
    if (!buffer_data) {
        console.log("Unable to create buffer");
        return -1;
    }
    const FSIZE = sizes.BYTES_PER_ELEMENT;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer_data);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        (sizes.length + vertices.length + colors.length) * FSIZE,
        gl.STATIC_DRAW
    );

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    const a_Color = gl.getAttribLocation(gl.program, "a_Color");

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, sizes);
    gl.bufferSubData(gl.ARRAY_BUFFER, sizes.length * FSIZE, vertices);
    gl.bufferSubData(
        gl.ARRAY_BUFFER,
        (sizes.length + vertices.length) * FSIZE,
        colors
    );

    gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE, 0);
    gl.vertexAttribPointer(
        a_Position,
        2,
        gl.FLOAT,
        false,
        FSIZE * 2,
        FSIZE * sizes.length
    );
    gl.vertexAttribPointer(
        a_Color,
        4,
        gl.FLOAT,
        false,
        FSIZE * 4,
        FSIZE * (sizes.length + vertices.length)
    );

    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);
    gl.enableVertexAttribArray(a_Color);

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 2);
}
