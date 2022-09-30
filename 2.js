// 02.js

"use strict";

// Vertex shader program
const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "attribute float a_Size;\n" +
    "void main() {\n" +
    // "  gl_Position = vec4(-1.0, -1.0, 0.0, 1.0);\n" + // Set the vertex coordinates of the point
    "  gl_Position = a_Position;\n" +
    "  gl_PointSize = a_Size;\n" + // Set the point size
    "}\n";

// Fragment shader program
const FSHADER_SOURCE_COLOR_RED =
    "void main() {\n" +
    "  gl_FragColor = vec4(1.0,  0.0,  0.0,  1.0);\n" + // Set the point color
    "}\n";

const FSHADER_SOURCE_COLOR_BLUE =
    "void main() {\n" +
    "  gl_FragColor = vec4(0.0,  0.0,  1.0,  1.0);\n" + // Set the point color
    "}\n";

function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById("mycanvas");

    // Get the rendering context for WebGL
    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    // Set clear color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Clear <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE_COLOR_RED)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    // Get the storage location of a_Position
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    const a_Size = gl.getAttribLocation(gl.program, "a_Size");

    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
    }

    const points = [
        {x: 0.8, y: 0.0},
        {x: -0.6, y: 0.5},
        {x: 0.0, y: -0.5},
        {x: -0.5, y: 0.75},
        {x: -0.25, y: 0.5},
        {x: 0.25, y: -0.75},
        {x: 0.8, y: 0.5},
        {x: -0.7, y: 0.4},
        {x: 0.7, y: -0.4},
        {x: -0.5, y: -0.75},
    ];

    const getRandomSize = (arr) => {
        const randomIndex = Math.floor(Math.random() * arr.length);
        return arr[randomIndex];
    };
    const sizes = [10.0, 15.0, 20.0, 25.0];

    for (let i = 0; i < points.length; i++) {
        gl.vertexAttrib3f(a_Position, points[i].x, points[i].y, 0.0);
        gl.vertexAttrib1f(a_Size, getRandomSize(sizes));
        gl.drawArrays(gl.POINTS, 0, 1);

        gl.vertexAttrib3f(
            a_Position,
            points[i].x + 0.11,
            points[i].y - 0.22,
            0.0
        );
        gl.vertexAttrib1f(a_Size, getRandomSize(sizes));
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
