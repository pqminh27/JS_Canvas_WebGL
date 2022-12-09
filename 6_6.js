// //6.6: Create animation of rotated triangle with speed (rad/s)
("use strict");
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
//Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "uniform mat4 u_Matrix;\n" +
    "void main() {\n" +
    "  gl_Position = u_Matrix * a_Position;\n" +
    "}\n";
// Fragment shader program
const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "uniform vec4 u_FragColor;\n" +
    "void main() {\n" +
    "  gl_FragColor = u_FragColor;\n" +
    "}\n";

const colors = {
    red: [1.0, 0.0, 0.0, 1.0],
    blue: [0.0, 0.0, 1.0, 1.0],
    green: [0.0, 1.0, 0.0, 1.0],
    cyan: [0.0, 1.0, 1.0, 1.0],
};

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
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const dataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);
    gl.uniform4fv(u_FragColor, colors.red); //red color

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

    const n = 3,
        ANGLE_STEP = 45.0; // grads/second
    let g_last = Date.now(),
        now,
        currentAngle = 0.0,
        elapsedTime;
    let rotated_Matrix = mat4.create();

    const animateTriangle = function () {
        now = Date.now();
        elapsedTime = now - g_last;
        g_last = now;
        currentAngle =
            (currentAngle + (ANGLE_STEP * elapsedTime) / 1000.0) % 360.0;
        draw(gl, n, currentAngle, rotated_Matrix, u_Matrix);
        // requestAnimationFrame(animateTriangle);
    };
    animateTriangle();
    // const animate = setInterval(() => animateTriangle(), 500);
}

function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
    // const RADIAN_ANGLE = (Math.PI * currentAngle) / 180.0;
    modelMatrix = mat4.fromRotation(
        modelMatrix,
        glMatrix.glMatrix.toRadian(currentAngle),
        [0.0, 0.0, 1.0] //axis Oz
    );
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
    // gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, n);
}
