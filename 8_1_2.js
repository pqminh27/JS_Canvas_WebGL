"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "attribute vec4 a_Color;\n" +
    "attribute vec4 a_Normal;\n" +
    "uniform mat4 u_MvpMatrix;\n" +
    "uniform vec3 u_LightColor;\n" +
    "uniform vec3 u_LightDirection;\n" + //мировые координаты
    "uniform vec3 u_LightDirectionFromEyes;\n" + // система координат наблюдения
    "varying vec4 v_Color;\n" +
    "void main() {\n" +
    "   gl_Position = u_MvpMatrix * a_Position ;\n" +
    "   vec3 normal = normalize(a_Normal.xyz);\n" +
    "   vec3 lightDirection = normalize(u_LightDirection);\n" + //мировые координаты
    "   float nDotL = max(dot(lightDirection, normal), 0.0);\n" + //мировые координаты
    // "   vec3 surfaceWorldPosition = vec3(gl_Position);\n" + // система координат наблюдения
    // "   vec3 surfaceToLightDirection = surfaceWorldPosition - u_LightDirectionFromEyes;\n" + // система координат наблюдения
    // "   surfaceToLightDirection = normalize(surfaceToLightDirection);\n" + // система координат наблюдения
    // "   float nDotL = max(dot(surfaceToLightDirection, normal), 0.0);\n" + // система координат наблюдения
    "   vec3 diffuse = u_LightColor * a_Color.rgb * nDotL;\n" +
    "   v_Color = vec4(diffuse, a_Color.a);\n" +
    "}\n";

const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_Color;\n" +
    "void main() {\n" +
    "   gl_FragColor = v_Color;\n" +
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
    const canvas = document.getElementById("webgl");

    const gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("Failed to get the rendering context for WebGL");
        return;
    }

    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log("Failed to intialize shaders.");
        return;
    }

    const n = initVertexBuffers(gl);
    if (n < 0) {
        console.log("Failed to set the vertex information");
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    const u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
    const u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");

    if (!u_MvpMatrix || !u_LightColor) {
        console.log("Failed to get the storage location");
        return -1;
    }

    gl.uniform3f(
        u_LightColor,
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2]
    ); //light color

    // мировая система
    const u_LightDirection = gl.getUniformLocation(
        gl.program,
        "u_LightDirection"
    );
    gl.uniform3f(u_LightDirection, 0.0, 4.0, 5.0);

    // // система наблюдения
    // const u_LightDirectionFromEyes = gl.getUniformLocation(
    //     gl.program,
    //     "u_LightDirectionFromEyes"
    // );
    // gl.uniform3f(u_LightDirectionFromEyes, 2.0, 0.0, 0.0);

    let mvpMatrix = mat4.create(),
        projMatrix = mat4.create(),
        viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix, [2.0, 4.0, 5.0], [0.0, 0.0, 0.0], [0, 1, 0]);
    mat4.perspective(
        projMatrix,
        glMatrix.glMatrix.toRadian(30),
        canvas.width / canvas.height,
        0.001,
        1000
    );
    gl.uniformMatrix4fv(
        u_MvpMatrix,
        false,
        mat4.multiply(mvpMatrix, projMatrix, viewMatrix)
    );

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        1.0,
        1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        1.0,
        -1.0,
        1.0, // v0-v1-v2-v3 front

        1.0,
        1.0,
        1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        1.0,
        -1.0, // v0-v3-v4-v5 right

        1.0,
        1.0,
        1.0,
        1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        1.0, // v0-v5-v6-v1 up

        -1.0,
        1.0,
        1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        1.0, // v1-v6-v7-v2 left

        -1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0, // v7-v4-v3-v2 down

        1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        -1.0,
        1.0,
        -1.0,
        1.0,
        1.0,
        -1.0, // v4-v7-v6-v5 back
    ]);

    const colors = new Float32Array([
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v0-v1-v2-v3 front

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v0-v3-v4-v5 right

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v0-v5-v6-v1 up

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v1-v6-v7-v2 left

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v7-v4-v3-v2 down

        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2],
        g_colors.red[0],
        g_colors.red[1],
        g_colors.red[2], // v4-v7-v6-v5 back
    ]);

    const normals = new Float32Array([
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0, // v0-v1-v2-v3 front face

        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0, // v0-v3-v4-v5 right face

        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0,
        0.0,
        1.0,
        0.0, // v0-v5-v6-v1 up face

        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0, // v1-v6-v7-v2 left face

        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0, // v7-v4-v3-v2 down face

        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0,
        0.0,
        0.0,
        -1.0, // v4-v7-v6-v5 back face
    ]);

    const indices = new Uint8Array([
        0,
        1,
        2,
        0,
        2,
        3, // front

        4,
        5,
        6,
        4,
        6,
        7, // right

        8,
        9,
        10,
        8,
        10,
        11, // up

        12,
        13,
        14,
        12,
        14,
        15, // left

        16,
        17,
        18,
        16,
        18,
        19, // down

        20,
        21,
        22,
        20,
        22,
        23, // back
    ]);

    if (!initArrayBuffer(gl, "a_Position", vertices, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Color", colors, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Normal", normals, 3, gl.FLOAT)) return -1;

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
        console.log("Failed to create the buffer object");
        return false;
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
}

function initArrayBuffer(gl, attribute, data, num, type) {
    const buffer = gl.createBuffer();
    if (!buffer) {
        console.log("Failed to create the buffer object");
        return false;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    const a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
        console.log("Failed to get the storage location of " + attribute);
        return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);

    return true;
}
