// //04.js

// "use strict";

// // Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "attribute float a_PointSize;\n" +
//     "varying vec4 v_FragColor;\n" +
//     "attribute vec4 a_color;\n" +
//     "void main() {\n" +
//     "gl_Position = a_Position;\n" +
//     "gl_PointSize = a_PointSize;\n" +
//     "v_FragColor = a_color;\n" +
//     "}\n";

// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform float u_Width;\n" +
//     "uniform float u_Height;\n" +
//     "varying vec4 v_FragColor;\n" +
//     "void main() {\n" +
//     "gl_FragColor = vec4(gl_FragCoord.x/u_Width, 0.0,\n" +
//     " gl_FragCoord.y/u_Height, 1.0);\n" +
//     "}\n";

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
//     const n = initVertexBuffers(gl);
//     if (n < 0) {
//         console.log("Failed to set the positions of the vertices");
//         return;
//     }

//     // Specify the color for clearing <canvas>
//     gl.clearColor(0, 0, 0, 1);

//     // Clear <canvas>
//     gl.clear(gl.COLOR_BUFFER_BIT);

//     // Draw three points
//     gl.drawArrays(gl.TRIANGLES, 0, n - 1);
//     gl.drawArrays(gl.TRIANGLES, 1, n);
// }

// function initVertexBuffers(gl) {
//     const n = 4; // The number of vertices

//     // Координаты - размер - цвет
//     const vertices = new Float32Array([
//         -1, 1, 10, 0, 0, 1, 1, -1, -1, 20, 0, 1, 0, 1, 1, 1, 20, 1, 0, 0, 1, 1,
//         -1, 20, 1, 0, 0, 1,
//     ]);

//     const vertexBuffer = gl.createBuffer();
//     if (!vertexBuffer) {
//         console.log("Failed to create the buffer object");
//         return -1;
//     }

//     const u_Width = gl.getUniformLocation(gl.program, "u_Width");
//     const u_Height = gl.getUniformLocation(gl.program, "u_Height");

//     gl.uniform1f(u_Width, gl.drawingBufferWidth);
//     gl.uniform1f(u_Height, gl.drawingBufferHeight);

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
//     const a_color = gl.getAttribLocation(gl.program, "a_color");
//     if (a_color < 0) {
//         console.log("Failed to get the storage location of a_color");
//         return -1;
//     }

//     const FSIZE = vertices.BYTES_PER_ELEMENT;
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 7, 0);
//     gl.vertexAttribPointer(
//         a_PointSize,
//         1,
//         gl.FLOAT,
//         false,
//         FSIZE * 7,
//         2 * FSIZE
//     );
//     gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, FSIZE * 7, 3 * FSIZE);
//     gl.enableVertexAttribArray(a_Position);
//     gl.enableVertexAttribArray(a_color);
//     gl.enableVertexAttribArray(a_PointSize);

//     return n;
// }

// 04.js

// "use strict";

// // Vertex shader program
// const VSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "attribute vec4 a_Position;\n" +
//     "attribute float a_PointSize;\n" +
//     "varying vec4 v_FragColor;\n" +
//     "attribute vec4 a_color;\n" +
//     "void main() {\n" +
//     "gl_Position = a_Position;\n" +
//     "gl_PointSize = a_PointSize;\n" +
//     "v_FragColor = a_color;\n" +
//     "}\n";

// // Fragment shader program
// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "varying vec4 v_FragColor;\n" +
//     "void main() {\n" +
//     "    gl_FragColor = v_FragColor;\n" +
//     "}\n";

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
//     const n = initVertexBuffers(gl);
//     if (n < 0) {
//         console.log("Failed to set the positions of the vertices");
//         return;
//     }

//     gl.enable(gl.BLEND);
//     gl.blendFunc(gl.ONE, gl.ONE_MINUS_DST_COLOR);

//     gl.clearColor(0, 0, 0, 1);
//     gl.clear(gl.COLOR_BUFFER_BIT);
//     gl.drawArrays(gl.TRIANGLES, 0, n / 2);
//     gl.drawArrays(gl.TRIANGLES, n / 2, n);
//     // gl.drawArrays(gl.TRIANGLES, 0, n);
// }

// function initVertexBuffers(gl) {
//     const n = 6; // The number of vertices

//     // Координаты - размер - цвет
//     const vertices = new Float32Array([
//         0.0, 0.5, 20, 1, 1, 0, 0.2, -0.5, -0.5, 10, 1, 1, 0, 0.2, 0.5, -0.5, 20,
//         1, 1, 0, 0.2, 0.4, 0.3, 20, 1, 0, 0, 0.2, -0.4, 0.3, 20, 1, 0, 0, 0.2,
//         -0.3, -0.7, 20, 1, 0, 0, 0.2,
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
//     const a_color = gl.getAttribLocation(gl.program, "a_color");
//     if (a_color < 0) {
//         console.log("Failed to get the storage location of a_color");
//         return -1;
//     }

//     const FSIZE = vertices.BYTES_PER_ELEMENT;
//     gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 7, 0);
//     gl.vertexAttribPointer(
//         a_PointSize,
//         1,
//         gl.FLOAT,
//         false,
//         FSIZE * 7,
//         2 * FSIZE
//     );
//     gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, FSIZE * 7, 3 * FSIZE);
//     gl.enableVertexAttribArray(a_Position);
//     gl.enableVertexAttribArray(a_color);
//     gl.enableVertexAttribArray(a_PointSize);

//     return n;
// }

// 04.js

"use strict";
const VSHADER_SOURCE =
    "precision mediump float;\n" +
    "attribute vec4 a_Position;\n" +
    "attribute float a_PointSize;\n" +
    "varying vec4 v_FragColor;\n" +
    "attribute vec4 a_color;\n" +
    "void main() {\n" +
    "   gl_Position = a_Position;\n" +
    "   gl_PointSize = a_PointSize;\n" +
    "   v_FragColor = a_color;\n" +
    "}\n";

const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_FragColor;\n" +
    "void main() {\n" +
    "   float distance = distance(gl_PointCoord,vec2(0.5,0.5));\n" +
    "   if(distance < 0.5){\n" +
    "       gl_FragColor = vec4(v_FragColor);\n" +
    "   } else discard;\n" +
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

    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return;
    }

    // Write the positions of vertices to a vertex shader
    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the positions of the vertices");
        return;
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    const n = 3; // The number of vertices

    //Coordinates - size - color
    const vertices = new Float32Array([
        0.0, 0.5, 70, 0, 1, 0, 1, -0.5, -0.5, 20, 0, 0, 1, 1, 0.5, -0.5, 100, 1,
        0, 0, 1,
    ]);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }

    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

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
    const a_color = gl.getAttribLocation(gl.program, "a_color");
    if (a_color < 0) {
        console.log("Failed to get the storage location of a_color");
        return -1;
    }

    const FSIZE = vertices.BYTES_PER_ELEMENT;
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 7, 0);
    gl.vertexAttribPointer(
        a_PointSize,
        1,
        gl.FLOAT,
        false,
        FSIZE * 7,
        2 * FSIZE
    );
    gl.vertexAttribPointer(a_color, 4, gl.FLOAT, false, FSIZE * 7, 3 * FSIZE);
    gl.enableVertexAttribArray(a_Position);
    gl.enableVertexAttribArray(a_color);
    gl.enableVertexAttribArray(a_PointSize);

    return n;
}
