// // 7.1, 7.2
"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

// Vertex shader program
const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "attribute vec4 a_Colors;\n" +
    "uniform mat4 u_Matrix;\n" +
    "varying vec4 v_Colors;\n" +
    "void main() {\n" +
    "  v_Colors = a_Colors;\n" +
    "  gl_Position = u_Matrix * a_Position;\n" +
    "  gl_PointSize = 10.0;\n" +
    "}\n";

// Fragment shader program
const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_Colors;\n" +
    "void main() {\n" +
    "  gl_FragColor = v_Colors;\n" +
    "}\n";

const g_colors = {
    white: [1.0, 1.0, 1.0, 1.0],
    red: [1.0, 0.0, 0.0, 1.0],
    green: [0.0, 1.0, 0.0, 1.0],
    cyan: [0.0, 1.0, 1.0, 1.0],
    black: [0.0, 0.0, 0.0, 1.0],
    blue: [0.0, 0.0, 1.0, 1.0],
    yellow: [1.0, 1.0, 0.0, 1.0],
    pink: [1.0, 0.0, 0.5, 1.0],
    gray: [0.5, 0.5, 0.5, 1.0],
    purple: [0.5, 0.0, 0.5, 1.0],
};

function main() {
    const canvas = document.getElementById("webgl");
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return;
    }
    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0, 0, 0, 1);

    // point the camera to the center of the scene
    const viewMatrix = mat4.create();
    let eye = vec3.create();
    mat4.lookAt(viewMatrix, eye, [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    //Turn on Z-buffer
    // gl.enable(gl.DEPTH_TEST);
    // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 4);
    gl.drawArrays(gl.LINE_LOOP, 4, 4);
    gl.drawArrays(gl.LINES, 8, 8);
}

function initVertexBuffers(gl) {
    const n = 16; // The number of vertices
    const vertices = new Float32Array([
        0.4, 0.4, 0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4,

        0.4, -0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, -0.4, -0.4, -0.4, -0.4,

        0.4, 0.4, 0.4, 0.4, 0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4, -0.4,

        -0.4, -0.4, -0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4, 0.4, -0.4, -0.4,
    ]);
    const colors = new Float32Array([
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],

        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],

        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],

        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
    ]);

    // Create buffer object
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const colorBuffer = gl.createBuffer();
    if (!colorBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const a_Colors = gl.getAttribLocation(gl.program, "a_Colors");
    if (a_Colors < 0) {
        console.log("Failed to get the storage location of a_Colors");
        return -1;
    }
    gl.vertexAttribPointer(a_Colors, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Colors);

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");
    if (!u_Matrix) {
        console.log("Failed to get the storage location of u_Matrix");
        return;
    }
    let uMatrix = mat4.create();
    // mat4.lookAt(uMatrix, [0.0, 0.0, 1.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]); //front
    // mat4.lookAt(uMatrix, [0.0, 0.0, -1.0], [0.0, 0.0, 0.0], [0.0, 1.0, 0.0]); //back
    mat4.lookAt(uMatrix, [0.0, 1.0, 0.0], [0.0, 0.0, 0.0], [1.0, 0.0, 0.0]); //view cube
    gl.uniformMatrix4fv(u_Matrix, false, uMatrix);
    return n;
}

//7.1: The face visibility depends on the order of the vertex
//7.2: The face visibility depends on the z-value (from viewer's perspective)
