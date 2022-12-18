// //6.1: Draw 1 Triangle Red, 1 Triangle Blue with vector translation
// ("use strict");
// const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform mat4 u_Matrix;\n" +
//     "void main() {\n" +
//     "   gl_Position = u_Matrix * a_Position;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

// const colors = {
//     red: [1.0, 0.0, 0.0, 1.0],
//     blue: [0.0, 0.0, 1.0, 1.0],
//     green: [0.0, 1.0, 0.0, 1.0],
//     cyan: [0.0, 1.0, 1.0, 1.0],
// };

// function main() {
//     const canvas = document.getElementById("mycanvas");
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const dataBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

//     //Draw the red triangle first
//     let moved_Matrix = mat4.create();
//     moved_Matrix = mat4.fromTranslation(
//         moved_Matrix,
//         [0.0, 0.0, 0.0] //stay still
//     );
//     gl.uniformMatrix4fv(u_Matrix, false, moved_Matrix);
//     gl.uniform4fv(u_FragColor, colors.red); //red
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     // Draw the blue triangle
//     moved_Matrix = mat4.fromTranslation(moved_Matrix, [0.5, 0.5, 0.0]); //move by axis Ox, Oy
//     gl.uniformMatrix4fv(u_Matrix, false, moved_Matrix);
//     gl.uniform4fv(u_FragColor, colors.blue); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }

//----------------------------------------------------------------------------------------------
//6.2: Rotate triangle blue: Rotate triangle blue
// ("use strict");
// const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform mat4 u_Matrix;\n" +
//     "void main() {\n" +
//     "   gl_Position = u_Matrix * a_Position;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

// const colors = {
//     red: [1.0, 0.0, 0.0, 1.0],
//     blue: [0.0, 0.0, 1.0, 1.0],
//     green: [0.0, 1.0, 0.0, 1.0],
//     cyan: [0.0, 1.0, 1.0, 1.0],
// };

// function main() {
//     const canvas = document.getElementById("mycanvas");
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const dataBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

//     //Draw the red triangle first
//     const ANGLE_BETA_RED = 0.0;
//     // const radian_triangle_red = (Math.PI * ANGLE_BETA_RED) / 180.0;
//     let rotated_Matrix = mat4.create();
//     rotated_Matrix = mat4.fromRotation(
//         rotated_Matrix,
//         glMatrix.glMatrix.toRadian(ANGLE_BETA_RED),
//         [0.0, 0.0, 1.0] //axis Oz
//     );
//     gl.uniformMatrix4fv(u_Matrix, false, rotated_Matrix);

//     gl.uniform4fv(u_FragColor, colors.red); //red
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     // Draw the blue triangle
//     const ANGLE_BETA_BLUE = 90.0;
//     // const radian_triangle_blue = (Math.PI * ANGLE_BETA_BLUE) / 180.0;
//     rotated_Matrix = mat4.fromRotation(
//         rotated_Matrix,
//         glMatrix.glMatrix.toRadian(ANGLE_BETA_BLUE),
//         [0.0, 0.0, 1.0] //axis Oz
//     );
//     gl.uniformMatrix4fv(u_Matrix, false, rotated_Matrix);
//     gl.uniform4fv(u_FragColor, colors.blue); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }

//-----------------------------------------------------------------------------------------------------------------------------
// //6.3: Scale Triangle Blue
// ("use strict");
// const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform mat4 u_Matrix;\n" +
//     "void main() {\n" +
//     "   gl_Position = u_Matrix * a_Position;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

// const colors = {
//     red: [1.0, 0.0, 0.0, 1.0],
//     blue: [0.0, 0.0, 1.0, 1.0],
//     green: [0.0, 1.0, 0.0, 1.0],
//     cyan: [0.0, 1.0, 1.0, 1.0],
// };

// function main() {
//     const canvas = document.getElementById("mycanvas");
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const dataBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

//     //Draw the red triangle first
//     let scaled_Matrix = mat4.create();
//     scaled_Matrix = mat4.fromScaling(
//         scaled_Matrix,
//         [1.0, 1.0, 1.0] //scale Ox, Oy, Oz by 1.0
//     );
//     gl.uniformMatrix4fv(u_Matrix, false, scaled_Matrix);
//     gl.uniform4fv(u_FragColor, colors.red); //red
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     // Draw the blue triangle
//     scaled_Matrix = mat4.fromScaling(scaled_Matrix, [1.0, 1.5, 1.0]); //scale Ox, Oy
//     gl.uniformMatrix4fv(u_Matrix, false, scaled_Matrix);
//     gl.uniform4fv(u_FragColor, colors.blue); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }

//--------------------------------------------------------------------------------------------------------------
//6.4: Draw 3 triangles, translate first then rotate triangle
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
    moved_Matrix = mat4.fromTranslation(
        BASE_MOVED_MATRIX,
        [-0.5, -0.1, 0.0] //move Ox, Oy, Oz
    );
    ANGLE_ROTATE = 0.0; //angle to rotate the red one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.rotate(
        rotated_Matrix,
        BASE_ROTATED_MATRIX,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, moved_Matrix);
    gl.uniformMatrix4fv(u_Matrix_2, false, rotated_Matrix);
    gl.uniform4fv(u_FragColor, colors.red); //red
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    // Draw the green triangle
    moved_Matrix = mat4.fromTranslation(
        BASE_MOVED_MATRIX,
        [0.3, -0.1, 0.0] //move Ox, Oy, Oz
    );
    ANGLE_ROTATE = 0.0; //angle to rotate the green one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.rotate(
        rotated_Matrix,
        BASE_ROTATED_MATRIX,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, moved_Matrix);
    gl.uniformMatrix4fv(u_Matrix_2, false, rotated_Matrix);
    gl.uniform4fv(u_FragColor, colors.green); //green
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    // Draw the blue triangle
    moved_Matrix = mat4.fromTranslation(
        BASE_MOVED_MATRIX,
        [-0.1, 0.6, 0.0] //move Ox, Oy, Oz
    );
    ANGLE_ROTATE = 60.0; //angle to rotate the blue one
    // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
    rotated_Matrix = mat4.rotate(
        rotated_Matrix,
        BASE_ROTATED_MATRIX,
        glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
        [0.0, 0.0, 1.0] //rotate by axis Oz
    );
    gl.uniformMatrix4fv(u_Matrix_1, false, moved_Matrix);
    gl.uniformMatrix4fv(u_Matrix_2, false, rotated_Matrix);
    gl.uniform4fv(u_FragColor, colors.blue); //blue
    gl.drawArrays(gl.LINE_LOOP, 0, 3);
}

//---------------------------------------------------------------------------------------------------------
//6.5: Draw 3 triangles, rotate first then move the triangles
// ("use strict");
// const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform mat4 u_Matrix_1;\n" +
//     "uniform mat4 u_Matrix_2;\n" +
//     "void main() {\n" +
//     "   gl_Position = u_Matrix_1 * u_Matrix_2 * a_Position;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

// const colors = {
//     red: [1.0, 0.0, 0.0, 1.0],
//     blue: [0.0, 0.0, 1.0, 1.0],
//     green: [0.0, 1.0, 0.0, 1.0],
//     cyan: [0.0, 1.0, 1.0, 1.0],
// };

// function main() {
//     const canvas = document.getElementById("mycanvas");
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const dataBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     const u_Matrix_1 = gl.getUniformLocation(gl.program, "u_Matrix_1");
//     const u_Matrix_2 = gl.getUniformLocation(gl.program, "u_Matrix_2");

//     const BASE_ROTATED_MATRIX = mat4.create(),
//         BASE_MOVED_MATRIX = mat4.create();
//     let moved_Matrix = mat4.create(),
//         rotated_Matrix = mat4.create(),
//         ANGLE_ROTATE,
//         RADIAN_ANGLE;

//     //Draw the red triangle first
//     ANGLE_ROTATE = 0.0; //angle to rotate the red one
//     // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
//     rotated_Matrix = mat4.fromRotation(
//         rotated_Matrix,
//         glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
//         [0.0, 0.0, 1.0] //rotate by axis Oz
//     );
//     moved_Matrix = mat4.translate(
//         moved_Matrix,
//         BASE_MOVED_MATRIX,
//         [-0.4, -0.1, 0.0] //move Ox, Oy, Oz
//     );
//     gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
//     gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
//     gl.uniform4fv(u_FragColor, colors.red); //red
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     // Draw the green triangle
//     ANGLE_ROTATE = 60.0; //angle to rotate the green one
//     // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
//     rotated_Matrix = mat4.fromRotation(
//         rotated_Matrix,
//         glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
//         [0.0, 0.0, 1.0] //rotate by axis Oz
//     );
//     moved_Matrix = mat4.translate(
//         moved_Matrix,
//         BASE_MOVED_MATRIX,
//         [-0.4, 0.4, 0.0] //move Ox, Oy, Oz
//     );
//     gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
//     gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
//     gl.uniform4fv(u_FragColor, colors.green); //green
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     // Draw the blue triangle
//     ANGLE_ROTATE = 60.0; //angle to rotate the blue one
//     // RADIAN_ANGLE = (Math.PI * ANGLE_ROTATE) / 180.0;
//     rotated_Matrix = mat4.fromRotation(
//         rotated_Matrix,
//         glMatrix.glMatrix.toRadian(ANGLE_ROTATE),
//         [0.0, 0.0, 1.0] //rotate by axis Oz
//     );
//     moved_Matrix = mat4.translate(
//         moved_Matrix,
//         BASE_MOVED_MATRIX,
//         [0.0, -0.3, 0.0] //move Ox, Oy, Oz
//     );
//     gl.uniformMatrix4fv(u_Matrix_1, false, rotated_Matrix); //rotate first then move the triangle
//     gl.uniformMatrix4fv(u_Matrix_2, false, moved_Matrix);
//     gl.uniform4fv(u_FragColor, colors.blue); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }


//----------------------------------------------------------------------------------------------------------------
// //6.6: Create animation of rotated triangle with speed (rad/s)
// ("use strict");
// const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform mat4 u_Matrix;\n" +
//     "void main() {\n" +
//     "  gl_Position = u_Matrix * a_Position;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

// const colors = {
//     red: [1.0, 0.0, 0.0, 1.0],
//     blue: [0.0, 0.0, 1.0, 1.0],
//     green: [0.0, 1.0, 0.0, 1.0],
//     cyan: [0.0, 1.0, 1.0, 1.0],
// };

// function main() {
//     const canvas = document.getElementById("mycanvas");
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const dataBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);
//     gl.uniform4fv(u_FragColor, colors.red); //red color

//     const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

//     const n = 3,
//         ANGLE_STEP = 45.0; // grads/second
//     let g_last = Date.now(),
//         now,
//         currentAngle = 0.0,
//         elapsedTime;
//     let rotated_Matrix = mat4.create();

//     const animateTriangle = function () {
//         now = Date.now();
//         elapsedTime = now - g_last;
//         g_last = now;
//         currentAngle =
//             (currentAngle + (ANGLE_STEP * elapsedTime) / 1000.0) % 360.0;
//         draw(gl, n, currentAngle, rotated_Matrix, u_Matrix);
//         requestAnimationFrame(animateTriangle);
//     };
//     animateTriangle();
// }

// function draw(gl, n, currentAngle, modelMatrix, u_ModelMatrix) {
//     // const RADIAN_ANGLE = (Math.PI * currentAngle) / 180.0;
//     modelMatrix = mat4.fromRotation(
//         modelMatrix,
//         glMatrix.glMatrix.toRadian(currentAngle),
//         [0.0, 0.0, 0.1] //axis Oz
//     );
//     gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.TRIANGLES, 0, n);
// }

