// //6.1
// ("use strict");
// //Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "uniform vec4 u_Vector;\n" +
//     "void main() {\n" +
//     "  gl_Position = a_Position + u_Vector;\n" +
//     "}\n";
// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec4 u_FragColor;\n" +
//     "void main() {\n" +
//     "  gl_FragColor = u_FragColor;\n" +
//     "}\n";

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
//     const Buffer_Data = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, Buffer_Data);
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     const u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
//     const u_Vector = gl.getUniformLocation(gl.program, "u_Vector");

//     gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0); //red
//     gl.uniform4fv(u_Vector, [0, 0, 0, 0]);

//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
//     gl.enableVertexAttribArray(a_Position);

//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0); //blue
//     gl.uniform4fv(u_Vector, [0.3, 0.3, 0, 0]);
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }
//-----------------------------------------------------------------------------------
// //6.3: Scale Triangle Blue
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
//     //Red Triangle
//     const transformX_Red = 1.0,
//         transformY_Red = 1.0,
//         transformZ_Red = 1.0;
//     const matrix_red = new Float32Array([
//         transformX_Red,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         transformY_Red,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         transformZ_Red,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         1.0,
//     ]);

//     gl.uniformMatrix4fv(u_Matrix, false, matrix_red);
//     gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0); //red
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     const transformX_Blue = 1.0,
//         transformY_Blue = 1.75,
//         transformZ_Blue = 1.0;
//     const matrix_blue = new Float32Array([
//         transformX_Blue,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         transformY_Blue,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         transformZ_Blue,
//         0.0,
//         0.0,
//         0.0,
//         0.0,
//         1.0,
//     ]);
//     gl.uniformMatrix4fv(u_Matrix, false, matrix_blue);
//     gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }
//---------------------------------------------------------------------------------
// //6.4: Draw 3 triangles, translate first then rotate triangle
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

//     //Red Triangle
//     const modelMatrix_Red = new Matrix4();
//     const ANGLE_ROTATE_RED = 0.0;
//     const transformX_Red = -0.5;
//     const transformY_Red = -0.1;
//     modelMatrix_Red.setTranslate(transformX_Red, transformY_Red, 0);
//     modelMatrix_Red.rotate(ANGLE_ROTATE_RED, 0, 0, 1); //axis Oz
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Red.elements);
//     gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     //Green Triangle
//     const modelMatrix_Green = new Matrix4();
//     const ANGLE_ROTATE_GREEN = 0.0; //Angle Of Rotation
//     const transformX_Green = 0.3; //Translate on axis Ox to the right 0.5
//     const transformY_Green = -0.1;
//     modelMatrix_Green.setTranslate(transformX_Green, transformY_Green, 0);
//     modelMatrix_Green.rotate(ANGLE_ROTATE_GREEN, 0, 0, 1); //axis Oz
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Green.elements);
//     gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0); //green
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     //Blue Triangle
//     const modelMatrix_Blue = new Matrix4();
//     const ANGLE_ROTATE_BLUE = 60.0; //Angle Of Rotation
//     const transformX_Blue = -0.1; //Translate on axis Ox to the right 0.5
//     const transformY_Blue = 0.6;
//     modelMatrix_Blue.setTranslate(transformX_Blue, transformY_Blue, 0);
//     modelMatrix_Blue.rotate(ANGLE_ROTATE_BLUE, 0, 0, 1); //axis Oz
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Blue.elements);
//     gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }
//----------------------------------------------------------------------------------
// //6.5: Draw 3 triangles, rotate first then translate triangle
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

//     //Red Triangle
//     const modelMatrix_Red = new Matrix4();
//     const ANGLE_ROTATE_RED = 0.0;
//     const transformX_Red = -0.4;
//     const transformY_Red = -0.1;
//     modelMatrix_Red.setRotate(ANGLE_ROTATE_RED, 0, 0, 1); //axis Oz
//     modelMatrix_Red.translate(transformX_Red, transformY_Red, 0);
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Red.elements);
//     gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     //Green Triangle
//     const modelMatrix_Green = new Matrix4();
//     const ANGLE_ROTATE_GREEN = 60.0; //Angle Of Rotation
//     const transformX_Green = -0.4; //Translate on axis Ox to the right 0.5
//     const transformY_Green = 0.4;
//     modelMatrix_Green.setRotate(ANGLE_ROTATE_GREEN, 0, 0, 1); //axis Oz
//     modelMatrix_Green.translate(transformX_Green, transformY_Green, 0);
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Green.elements);
//     gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0); //green
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);

//     //Blue Triangle
//     const modelMatrix_Blue = new Matrix4();
//     const ANGLE_ROTATE_BLUE = 60.0; //Angle Of Rotation
//     const transformX_Blue = 0.0; //Translate on axis Ox to the right 0.5
//     const transformY_Blue = -0.3;
//     modelMatrix_Blue.setRotate(ANGLE_ROTATE_BLUE, 0, 0, 1); //axis Oz
//     modelMatrix_Blue.translate(transformX_Blue, transformY_Blue, 0);
//     gl.uniformMatrix4fv(u_Matrix, false, modelMatrix_Blue.elements);
//     gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0); //blue
//     gl.drawArrays(gl.LINE_LOOP, 0, 3);
// }
//-----------------------------------------------------------------------------------------
//6.6: Create animation of rotated triangle with speed (rad/s)
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
    gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0); //red color
    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

    const ANGLE_STEP = 90.0; // grads/second
    const modelMatrix = new Matrix4();
    let currentAngle = 0.0;
    let timeLast = Date.now(),
        timeNow,
        elapsedTime;

    const tick = () => {
        timeNow = Date.now();
        elapsedTime = timeNow - timeLast;
        timeLast = timeNow;
        currentAngle =
            (currentAngle + (ANGLE_STEP * elapsedTime) / 1000.0) % 360.0;

        modelMatrix.setRotate(currentAngle, 0, 0, 1);
        gl.uniformMatrix4fv(u_Matrix, false, modelMatrix.elements);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
        requestAnimationFrame(tick);
    };
    tick();
}
