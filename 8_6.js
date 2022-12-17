"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;
// const VSHADER_SOURCE =
//     "attribute vec3 a_Position;\n" +
//     "attribute vec3 a_Normal;\n" +
//     "attribute vec3 a_Color;\n" +
//     "uniform mat4 uMVMatrix;\n" +
//     "uniform mat4 uPMatrix;\n" +
//     "uniform mat4 uNMatrix;\n" +
//     "uniform vec3 uLightPosition;\n" +
//     "uniform vec3 u_viewWorldPosition;\n" +
//     "uniform vec3 uSpecularLightColor;\n" +
//     "varying vec3 v_Normal;\n" +
//     "varying vec3 v_surfaceToLight;\n" +
//     "varying vec3 v_surfaceToView;\n" +
//     "varying vec4 v_Color;\n" +
//     "void main() {\n" +
//     "   gl_Position = uPMatrix * vec4(a_Position, 1.0);\n" +
//     "   v_Normal = mat3(uNMatrix) * a_Normal;\n" +
//     "   vec3 surfaceWorldPosition = (uMVMatrix * vec4(a_Position, 1.0)).xyz;\n" +
//     "   v_surfaceToLight = uLightPosition - surfaceWorldPosition;\n" +
//     "   v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;\n" +
//     "   v_Color = vec4(a_Color, 1.0);\n" +
//     "}\n";

// const FSHADER_SOURCE =
//     "precision mediump float;\n" +
//     "uniform vec3 u_AmbientLight;\n" +
//     "uniform vec3 u_LightColor;\n" +
//     "varying vec3 v_Normal;\n" +
//     "varying vec3 v_surfaceToLight;\n" +
//     "varying vec3 v_surfaceToView;\n" +
//     "varying vec4 v_Color;\n" +
//     "const float m = 90.0;\n" +
//     "void main() {\n" +
//     "   vec3 normal = normalize(v_Normal);\n" +
//     "   vec3 lightDirection = normalize(v_surfaceToLight);\n" +
//     "   vec3 viewDirection = normalize(v_surfaceToView);\n" +
//     "   vec3 reflectDirection = reflect(-lightDirection, normal);\n" + //Using reflect
//     // "   vec3 halfVector = normalize(lightDirection + viewDirection);\n" +
//     "   float nDotL = max(dot(normal, lightDirection), 0.0);\n" +
//     "	float vDotR = max(dot(v_surfaceToView, reflectDirection), 0.0);\n" +
//     "   vec3 ambient = u_AmbientLight * v_Color.rgb;\n" +
//     "   vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n" +
//     "   vec3 specular = u_LightColor * v_Color.rgb * pow(vDotR, m);\n" +
//     // "   if (light > 0.0) {\n" +
//     // "       specular = pow(dot(normal, halfVector), m);\n" +
//     // "   }\n" +
//     // "   gl_FragColor = v_Color;\n" +
//     // "   gl_FragColor.rgb *= nDotL;\n" +
//     // "   gl_FragColor.rgb += ambient;\n" +
//     // "   gl_FragColor.rgb += specular;\n" +
//     // "   gl_FragColor.rgb += diffuse;\n" +
//     "   gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n" +
//     "}\n";

const VSHADER_SOURCE =
    "attribute vec3 a_Position;\n" +
    "attribute vec3 a_Normal;\n" +
    "attribute vec3 a_Color;\n" +
    "uniform mat4 uMVMatrix;\n" +
    "uniform mat4 uPMatrix;\n" +
    "uniform mat4 uNMatrix;\n" +
    "varying vec3 v_surfaceWorldPosition;\n" +
    "varying vec4 v_Color;\n" +
    "varying vec3 v_Normal;\n" +
    "void main() {\n" +
    "   gl_Position = uPMatrix * vec4(a_Position, 1.0);\n" +
    "   v_Normal = normalize(mat3(uNMatrix) * a_Normal);\n" +
    "   v_surfaceWorldPosition = vec3((uMVMatrix * vec4(a_Position, 1.0)));\n" +
    "   v_Color = vec4(a_Color, 1.0);\n" +
    "}\n";

const FSHADER_SOURCE =
    "precision highp float;\n" +
    "uniform vec3 u_ViewPosition;\n" +
    "uniform vec3 u_LightPosition;\n" +
    "uniform vec3 u_AmbientLight;\n" +
    "uniform vec3 u_LightColor;\n" +
    "varying vec3 v_Normal;\n" +
    "varying vec4 v_Color;\n" +
    "varying vec3 v_surfaceWorldPosition;\n" +
    "const float m = 90.0;\n" +
    "void main() {\n" +
    "   vec3 lightDirection = normalize(u_LightPosition - v_surfaceWorldPosition);\n" +
    "   vec3 viewDirection = normalize(u_ViewPosition - v_surfaceWorldPosition);\n" +
    "	vec3 reflectDirection = reflect(-lightDirection, v_Normal);\n" +
    "   float nDotL = max(dot(lightDirection, v_Normal), 0.0);\n" +
    "	float vDotR = max(dot(viewDirection, reflectDirection), 0.0);\n" +
    "   vec3 diffuse = u_LightColor * v_Color.rgb * nDotL;\n" +
    "   vec3 ambient = u_AmbientLight * v_Color.rgb;\n" +
    // "   float specular = 0.0;\n" +
    // "   if (nDotL > 0.0) {\n" +
    // "       specular = pow(dot(v_Normal, halfVector), m);\n" +
    // "   }\n" +
    // "   gl_FragColor = v_Color;\n" +
    // "   gl_FragColor.rgb *= nDotL;\n" +
    // "   gl_FragColor.rgb += diffuse + ambient + specular;\n" +
    ///////////////////////////////////////////////////////////////
    // "   gl_FragColor = vec4(diffuse + ambient, v_Color.a);\n" +
    /////////////////////////////////////////////////////////////////
    "   vec3 specular = u_LightColor * v_Color.rgb * pow(vDotR, m);\n" +
    "   gl_FragColor = vec4(diffuse + ambient + specular, v_Color.a);\n" +
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

    const u_ModelMatrix = gl.getUniformLocation(gl.program, "uMVMatrix");
    const u_MvpMatrix = gl.getUniformLocation(gl.program, "uPMatrix");
    const u_NormalMatrix = gl.getUniformLocation(gl.program, "uNMatrix");

    const u_LightPosition = gl.getUniformLocation(
        gl.program,
        "u_LightPosition"
    );
    const u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
    const u_AmbientLight = gl.getUniformLocation(gl.program, "u_AmbientLight");

    gl.uniform3f(u_AmbientLight, 0.2, 0.2, 0.2);
    gl.uniform3f(u_LightPosition, 3.0, 3.5, 4.0);
    gl.uniform3f(
        u_LightColor,
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2]
    );

    const viewWorldPositionLocation = gl.getUniformLocation(
        gl.program,
        "u_ViewPosition"
    );
    const camera = [5.0, 5.0, 5.0];
    gl.uniform3fv(viewWorldPositionLocation, camera);

    const modelMatrix = mat4.create(),
        mvpMatrix = mat4.create(),
        normalMatrix = mat4.create();
    const projMatrx = mat4.create(),
        viewMatrix = mat4.create();

    mat4.rotate(
        modelMatrix,
        modelMatrix,
        glMatrix.glMatrix.toRadian(90),
        [0, 1, 0]
    ); // Axis Oy
    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);

    mat4.perspective(projMatrx, glMatrix.glMatrix.toRadian(30), 1, 0.001, 1000);
    mat4.lookAt(viewMatrix, [5.0, 7.5, 12.0], [0.0, 0.0, 0.0], [0, 1, 0]);
    mat4.multiply(mvpMatrix, projMatrx, viewMatrix);
    mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);
    mat4.invert(normalMatrix, modelMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

    gl.uniformMatrix4fv(u_ModelMatrix, false, modelMatrix);
    gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix);
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix);

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_BYTE, 0);
}

function initVertexBuffers(gl) {
    const vertices = new Float32Array([
        2.0,
        2.0,
        2.0,
        -2.0,
        2.0,
        2.0,
        -2.0,
        -2.0,
        2.0,
        2.0,
        -2.0,
        2.0, // v0-v1-v2-v3 front

        2.0,
        2.0,
        2.0,
        2.0,
        -2.0,
        2.0,
        2.0,
        -2.0,
        -2.0,
        2.0,
        2.0,
        -2.0, // v0-v3-v4-v5 right

        2.0,
        2.0,
        2.0,
        2.0,
        2.0,
        -2.0,
        -2.0,
        2.0,
        -2.0,
        -2.0,
        2.0,
        2.0, // v0-v5-v6-v1 up

        -2.0,
        2.0,
        2.0,
        -2.0,
        2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        2.0, // v1-v6-v7-v2 left

        -2.0,
        -2.0,
        -2.0,
        2.0,
        -2.0,
        -2.0,
        2.0,
        -2.0,
        2.0,
        -2.0,
        -2.0,
        2.0, // v7-v4-v3-v2 down

        2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        -2.0,
        2.0,
        -2.0,
        2.0,
        2.0,
        -2.0, // v4-v7-v6-v5 back
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
        1.0, // v0-v1-v2-v3 front

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
        0.0, // v0-v3-v4-v5 right

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
        0.0, // v0-v5-v6-v1 up

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
        0.0, // v1-v6-v7-v2 left

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
        0.0, // v7-v4-v3-v2 down

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
        -1.0, // v4-v7-v6-v5 back
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

    if (!initArrayBuffer(gl, "a_Position", vertices, 3)) return -1;
    if (!initArrayBuffer(gl, "a_Color", colors, 3)) return -1;
    if (!initArrayBuffer(gl, "a_Normal", normals, 3)) return -1;

    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    const indexBuffer = gl.createBuffer();
    if (!indexBuffer) {
        console.log("Failed to create the buffer object");
        return false;
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    return indices.length;
}

function initArrayBuffer(gl, attribute, data, num) {
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
    gl.vertexAttribPointer(a_attribute, num, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_attribute);

    return true;
}
