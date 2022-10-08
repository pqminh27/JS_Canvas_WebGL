// // // // 04.js

// // 1 : Draw 3 points
// "use strict";

// // Vertex shader program
// const VSHADER_SOURCE =
//     "#version 100\n" +
//     "attribute vec4 a_Position;\n" +
//     "attribute float a_PointSize;\n" +
//     "void main() {\n" +
//     "  gl_Position = a_Position;\n" +
//     // '  gl_PointSize = 10.0;\n' +
//     "  gl_PointSize = a_PointSize;\n" +
//     "}\n";

// // Fragment shader program
// const FSHADER_SOURCE =
//     "void main() {\n" + "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";

// function main() {
//     // Retrieve <canvas> element
//     const canvas = document.getElementById("mycanvas");

//     // Get the rendering context for WebGL
//     const gl = getWebGLContext(canvas);
//     if (!gl) {
//         console.log("Failed to get the rendering context for WebGL");
//         return;
//     }

//     // Initialize shaders
//     if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
//         console.log("Failed to intialize shaders.");
//         return;
//     }

//     // Write the positions of vertices to a vertex shader
//     const n = 3;
//     initVertexBuffers(gl);
//     // Specify the color for clearing <canvas>
//     gl.clearColor(0, 0, 0, 1);
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     // Draw three points
//     gl.drawArrays(gl.POINTS, 0, n);
// }

// function initVertexBuffers(gl) {
//     const n = 3;

//     const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
//     const sizes = new Float32Array([10, 20, 30]);

//     // Create a buffer object
//     const vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) {
//         console.log("Failed to create the buffer object");
//         return -1;
//     }

//     const vertexSizesBuffer = gl.createBuffer();
//     if (!vertexSizesBuffer) {
//         console.log("Failed to create the buffer object");
//         return -1;
//     }
//     // Bind the buffer object to target
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     // Write date into the buffer object
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     if (a_Position < 0) {
//         console.log("Failed to get the storage location of a_Position");
//         return -1;
//     }
//     const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
//     if (a_PointSize < 0) {
//         console.log("Failed to get the storage location of a_PointSize");
//         return -1;
//     }
//     // Assign the buffer object to a_Position variable
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

//     // Enable the assignment to a_Position variable
//     gl.enableVertexAttribArray(a_Position);

//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexSizesBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);

//     // Assign the buffer object to a_Point_size variable
//     gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, 0, 0);
//     // Enable the assignment to a_Point_size variable
//     gl.enableVertexAttribArray(a_PointSize);
// }
// ------------------------------------------------------------------------

// 2 :
// "use strict";

// // Vertex shader program
// const VSHADER_SOURCE =
//     "attribute vec4 a_Position;\n" +
//     "attribute float a_PointSize;\n" +
//     "void main() {\n" +
//     "  gl_Position = a_Position;\n" +
//     "  gl_PointSize = a_PointSize;\n" +
//     "}\n";

// // Fragment shader program
// const FSHADER_SOURCE =
//     "void main() {\n" + "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";

// function main() {
//     // Retrieve <canvas> element
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
//     const n = 3;
//     initVertexBuffers(gl);

//     // Specify the color for clearing <canvas>
//     gl.clearColor(0, 0, 0, 1);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.POINTS, 0, n);
// }

// function initVertexBuffers(gl) {
//     const n = 3;
//     const vertices = new Float32Array([
//         10, 0.0, 0.5, 20, -0.5, -0.5, 40, 0.5, -0.5,
//     ]);
//     const vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) {
//         console.log("Failed to create the buffer object");
//         return -1;
//     }
//     // Bind the buffer object to target
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     // Write date into the buffer object
//     gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

//     const a_Position = gl.getAttribLocation(gl.program, "a_Position");
//     if (a_Position < 0) {
//         console.log("Failed to get the storage location of a_Position");
//         return -1;
//     }
//     const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
//     if (a_PointSize < 0) {
//         console.log("Failed to get the storage location of a_PointSize");
//         return -1;
//     }

//     const FSIZE = vertices.BYTES_PER_ELEMENT;
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, FSIZE);
//     gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, 0);

//     gl.enableVertexAttribArray(a_Position);
//     gl.enableVertexAttribArray(a_PointSize);
// }

// // // -----------------------------------------------------------------------------
//
// 3 :

("use strict");

//Vertex shader program
const VSHADER_SOURCE =
    "#version 100\n" +
    "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "void main() {\n" +
    "  gl_Position = a_Position;\n" +
    "  gl_PointSize = 10.0;\n" +
    "  gl_PointSize = a_PointSize;\n" +
    "}\n";
// Fragment shader program
const FSHADER_SOURCE =
    "void main() {\n" + "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";
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
    const n = 3;
    initVertexBuffers(gl);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
function initVertexBuffers(gl) {
    const n = 3;
    const vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
    const sizes = new Float32Array([10, 20, 40]);
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    const FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        (vertices.length + sizes.length) * FSIZE,
        gl.STATIC_DRAW
    );
    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    const a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");
    if (a_PointSize < 0) {
        console.log("Failed to get the storage location of a_PointSize");
        return -1;
    }

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, vertices);
    gl.bufferSubData(gl.ARRAY_BUFFER, 2 * FSIZE * n, sizes);

    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 2, 0);
    gl.vertexAttribPointer(
        a_PointSize,
        1,
        gl.FLOAT,
        false,
        FSIZE,
        FSIZE * vertices.length
    );
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_PointSize);
}
