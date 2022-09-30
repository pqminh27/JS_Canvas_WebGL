"use strict";

// Vertex shader program
const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "void main() {\n" +
    "  gl_Position = a_Position;\n" +
    "  gl_PointSize = 10.0;\n" + // Set the point size
    "}\n";

// Fragment shader program
const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "uniform vec4 u_FragColor;\n" +
    "void main() {\n" +
    "   gl_FragColor = u_FragColor;\n" +
    "}\n";

const g_colors = {
    white: [1.0, 1.0, 1.0, 1.0],
    red: [1.0, 0.0, 0.0, 1.0],
    green: [0.0, 1.0, 0.0, 1.0],
    cyan: [0.0, 1.0, 1.0, 1.0],
    blue: [0.0, 0.0, 1.0, 1.0],
};

const g_points = [];
function click(event, gl, canvas, a_Position, u_FragColor) {
    let x = event.clientX;
    let y = event.clientY;
    const rect = event.target.getBoundingClientRect();
    x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
    y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
    g_points.push({x: x, y: y});
    gl.clear(gl.COLOR_BUFFER_BIT);

    for (const point of g_points) {
        const x = point.x;
        const y = point.y;
        gl.vertexAttrib3f(a_Position, x, y, 0.0);

        if (x > 0 && y > 0)
            gl.uniform4f(
                u_FragColor,
                g_colors.red[0],
                g_colors.red[1],
                g_colors.red[2],
                g_colors.red[3]
            );
        else if (x > 0 && y <= 0)
            gl.uniform4f(
                u_FragColor,
                g_colors.white[0],
                g_colors.white[1],
                g_colors.white[2],
                g_colors.white[3]
            );
        else if (x <= 0 && y > 0)
            gl.uniform4f(
                u_FragColor,
                g_colors.white[0],
                g_colors.white[1],
                g_colors.white[2],
                g_colors.white[3]
            );
        else
            gl.uniform4f(
                u_FragColor,
                g_colors.green[0],
                g_colors.green[1],
                g_colors.green[2],
                g_colors.green[3]
            );

        gl.drawArrays(gl.POINTS, 0, 1);
    }
}

function main() {
    // Retrieve <canvas> element
    const canvas = document.getElementById("mycanvas");

    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to initialize shaders.");
        return;
    }

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return;
    }
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    canvas.onmousedown = (event) =>
        click(event, gl, canvas, a_Position, u_FragColor);
}
