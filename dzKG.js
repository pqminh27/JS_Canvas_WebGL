"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4, quat, quat4} = glMatrix;

// Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "attribute vec4 a_Color;\n" +
    "varying vec4 v_Color;\n" +
    "uniform mat4 u_Matrix;\n" +
    "void main() {\n" +
    "  gl_Position = u_Matrix * a_Position;\n" +
    "  v_Color = a_Color;\n" +
    "  gl_PointSize = 10.0;\n" +
    "}\n";

// Fragment shader program
const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_Color;\n" +
    "void main() {\n" +
    "  gl_FragColor = v_Color;\n" +
    // "  gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);\n" +
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
    // Retrieve <canvas> element
    const canvas = document.getElementById("webgl");
    // Get the rendering context for WebGL
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return;
    }
    // Write the positions of vertices to a vertex shader
    const n = initVertexBuffers(gl); // n = 144
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }
    // Specify the color for clearing <canvas>
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");
    let eye = vec3.create(),
        centerPoint = vec3.create(),
        directionUp = vec3.create();
    vec3.set(eye, 0.2, 0.6, 1.0);
    vec3.set(centerPoint, 0.0, 0.0, 0.0);
    vec3.set(directionUp, 0.0, 1.0, 0.0);
    let uMatrix = mat4.create(),
        projMatrix = mat4.create(),
        viewMatrix = mat4.create();

    mat4.perspective(
        projMatrix,
        glMatrix.glMatrix.toRadian(60),
        1.0,
        0.01,
        1000
    );
    mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
    mat4.multiply(uMatrix, projMatrix, viewMatrix);

    const ANGLE_SPEED_IN_GRAD = 30.0; // grad/second
    let g_last = Date.now(),
        now,
        AngleBetween2RendersInGrad,
        elapsedTime;

    const render = () => {
        now = Date.now();
        elapsedTime = now - g_last;
        g_last = now;
        AngleBetween2RendersInGrad = (elapsedTime * ANGLE_SPEED_IN_GRAD) / 1000;
        draw(gl, n, AngleBetween2RendersInGrad, uMatrix, u_Matrix);
        requestAnimationFrame(render);
    };
    render();
    const renderBySecond = setInterval(() => render(), 1000);
}

function draw(gl, n, AngleBetween2RendersInGrad, matrixModel, u_MatrixModel) {
    let moveMatrix = mat4.create();
    let quat_begin = quat.create(),
        quat_end = quat.create(),
        res_quat = quat.create();
    quat.normalize(quat_begin, quat_begin); //normalize quat to have its length = 1
    quat.normalize(quat_end, quat_end);

    quat.setAxisAngle(
        quat_end,
        [0.0, 0.0, 1.0], //axis Oz
        glMatrix.glMatrix.toRadian(AngleBetween2RendersInGrad)
    );
    quat.lerp(res_quat, quat_begin, quat_end, 1.0); //full process from begin quat to end quat

    moveMatrix = mat4.fromRotationTranslation(
        moveMatrix,
        res_quat,
        [0.0, 0.0, 0.0]
    ); //this will make the cone not translate

    mat4.multiply(matrixModel, matrixModel, moveMatrix);
    gl.uniformMatrix4fv(u_MatrixModel, false, matrixModel);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.LINE_LOOP, n, gl.UNSIGNED_SHORT, 0);
}

function initVertexBuffers(gl) {
    const RADIUS = 0.25,
        STACK_COUNT = 24;

    let vertices = [],
        indices = [];

    ////Colors for each vertex
    // let colors = [];
    // colors.push(g_colors.green[0], g_colors.green[1], g_colors.green[2]);
    // for (let i = 1; i < STACK_COUNT; i++) {
    //     colors.push(g_colors.red[0], g_colors.red[1], g_colors.red[2]);
    // }

    const stackStep = glMatrix.glMatrix.toRadian(360) / STACK_COUNT;
    let stackAngle;

    vertices.push(0.0, 0.6, 0.0); //coordinates of top vertex

    let x, y, z;
    for (let i = 1; i <= STACK_COUNT; i += 1) {
        stackAngle = i * stackStep;
        x = RADIUS * Math.cos(stackAngle);
        z = RADIUS * Math.sin(stackAngle);
        y = 0.0;
        vertices.push(x, y, z);
    }

    //Create edge of the cone
    for (let i = 1; i <= STACK_COUNT; i += 1) {
        if (i != STACK_COUNT) indices.push(0, i + 1, i);
        else indices.push(0, 1, i);
    }
    //Create edge by related vertex
    for (let i = 1; i <= STACK_COUNT; i += 1) {
        indices.push(STACK_COUNT + 1, i + 1, i);
    }

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(indices),
        gl.STATIC_DRAW
    );

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // //Create Color Buffer
    // const colorBuffer = gl.createBuffer();
    // if (!colorBuffer) {
    //     console.log("Failed to create the buffer object");
    //     return -1;
    // }
    // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const a_Color = gl.getAttribLocation(gl.program, "a_Color");
    if (a_Color < 0) {
        console.log("Failed to get the storage location of a_Color");
        return -1;
    }
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    return indices.length;
}

//Quaternions 4-dimensional extension of the complex number: a + bi + cj + dk ; Vector part of its is (b,c,d)
//Lerp: Move 1 object from 1 location to another location in a line (with a fixed speed)
