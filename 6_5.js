//6.5: Draw 3 triangles, rotate first then move the triangles
("use strict");
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
//Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "uniform mat4 u_Matrix_1;\n" +
    "uniform mat4 u_Matrix_2;\n" +
    "void main() {\n" +
    "   gl_Position = u_Matrix_1 * u_Matrix_2 * a_Position;\n" +
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

    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const dataBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const u_Matrix_1 = gl.getUniformLocation(gl.program, "u_Matrix_1");
    const u_Matrix_2 = gl.getUniformLocation(gl.program, "u_Matrix_2");

    const BASE_ROTATED_MATRIX = mat4.create(),
        BASE_MOVED_MATRIX = mat4.create();
    let moved_Matrix = mat4.create(),
        rotated_Matrix = mat4.create(),
        ANGLE_ROTATE,
        RADIAN_ANGLE;

    //Draw the red triangle first
    ANGLE_ROTATE = 0.0; //angle to rotate the red one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.fromRotation(
        rotated_Matrix,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    moved_Matrix = mat4.translate(
        moved_Matrix,
        BASE_MOVED_MATRIX,
        [-0.4, -0.1, 0.0] //move Ox, Oy, Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
    gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
    gl.uniform4fv(u_FragColor, colors.red); //red
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    // Draw the green triangle
    ANGLE_ROTATE = 60.0; //angle to rotate the green one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.fromRotation(
        rotated_Matrix,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    moved_Matrix = mat4.translate(
        moved_Matrix,
        BASE_MOVED_MATRIX,
        [-0.4, 0.4, 0.0] //move Ox, Oy, Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
    gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
    gl.uniform4fv(u_FragColor, colors.green); //green
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    // Draw the blue triangle
    ANGLE_ROTATE = 60.0; //angle to rotate the blue one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.fromRotation(
        rotated_Matrix,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    moved_Matrix = mat4.translate(
        moved_Matrix,
        BASE_MOVED_MATRIX,
        [0.0, -0.3, 0.0] //move Ox, Oy, Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
    gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
    gl.uniform4fv(u_FragColor, colors.blue); //blue
    gl.drawArrays(gl.LINE_LOOP, 0, 3);
}
