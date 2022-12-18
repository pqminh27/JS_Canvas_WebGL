//6.3: Scale Triangle Blue
("use strict");
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
//Vertex shader program
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "uniform mat4 u_Matrix;\n" +
    "void main() {\n" +
    "   gl_Position = u_Matrix * a_Position;\n" +
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

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");

    //Draw the red triangle first
    let scaled_Matrix = mat4.create();
    scaled_Matrix = mat4.fromScaling(
        scaled_Matrix,
        [1.0, 1.0, 1.0] //scale Ox, Oy, Oz by 1.0
    );
    gl.uniformMatrix4fv(u_Matrix, false, scaled_Matrix);
    gl.uniform4fv(u_FragColor, colors.red); //red
    gl.drawArrays(gl.LINE_LOOP, 0, 3);

    // Draw the blue triangle
    scaled_Matrix = mat4.fromScaling(scaled_Matrix, [1.0, 1.5, 1.0]); //scale Ox, Oy
    gl.uniformMatrix4fv(u_Matrix, false, scaled_Matrix);
    gl.uniform4fv(u_FragColor, colors.blue); //blue
    gl.drawArrays(gl.LINE_LOOP, 0, 3);
}
