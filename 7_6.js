//7.6: каркасная модель куба
("use strict");
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_Colors;\n" +
    "attribute vec4 a_Colors;\n" +
    "uniform mat4 u_Matrix;\n" +
    "attribute vec4 a_Position;\n" +
    "void main() {\n" +
    "  v_Colors = a_Colors;\n" +
    "  gl_Position =  u_Matrix * a_Position;\n" +
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

    // Write the positions of vertices to a vertex shader
    const n = initBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.LINES, n, gl.UNSIGNED_BYTE, 0);
}

function initBuffers(gl) {
    const vertices = new Float32Array([
        0.4, 0.4, 0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4,

        0.4, 0.4, -0.4, -0.4, 0.4, -0.4, -0.4, -0.4, -0.4, 0.4, -0.4, -0.4,
    ]);

    //colors for each vertex
    const colors = new Float32Array([
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],

        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],

        g_colors.cyan[0],
        g_colors.cyan[1],
        g_colors.cyan[2],

        g_colors.cyan[0],
        g_colors.cyan[1],
        g_colors.cyan[2],

        g_colors.green[0],
        g_colors.green[1],
        g_colors.green[2],

        g_colors.green[0],
        g_colors.green[1],
        g_colors.green[2],

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
    ]);

    const indices = new Uint8Array([
        0,
        1,
        1,
        2,
        2,
        3,
        3,
        0, // front
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        4, // back
        0,
        4,
        1,
        5,
        2,
        6,
        3,
        7, // left and right
    ]);

    const n = indices.length;

    const vertexBuffer = gl.createBuffer();
    const colorBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    if (!colorBuffer) {
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
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const a_Colors = gl.getAttribLocation(gl.program, "a_Colors");
    if (a_Colors < 0) {
        console.log("Failed to get the storage location of a_Colors");
        return -1;
    }
    gl.vertexAttribPointer(a_Colors, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Colors);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");
    if (!u_Matrix) {
        console.log("Failed to get the storage location of u_Matrix");
        return;
    }
    let ma_Matrix = mat4.create(),
        per_Matrix = mat4.create(),
        uMatrix = mat4.create();

    mat4.lookAt(ma_Matrix, [1.0, 1.0, 1.0], [0, 0, 0], [0, 1, 0]);
    mat4.perspective(
        per_Matrix,
        glMatrix.glMatrix.toRadian(60),
        1,
        0.001,
        1000
    );
    mat4.multiply(uMatrix, per_Matrix, ma_Matrix);
    gl.uniformMatrix4fv(u_Matrix, false, uMatrix);

    return n;
}
