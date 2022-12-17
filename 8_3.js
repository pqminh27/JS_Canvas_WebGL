"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "attribute vec4 a_Color;\n" +
    "attribute vec4 a_Normal;\n" +
    "uniform mat4 u_MvpMatrix;\n" +
    "uniform mat4 u_ModelMatrix;\n" +
    "uniform mat4 u_NormalMatrix;\n" +
    "uniform vec3 u_LightColor;\n" +
    "uniform vec3 u_LightPosition;\n" +
    "uniform vec3 u_AmbientLight;\n" +
    "uniform vec3 u_viewWorldPosition;\n" +
    "vec3 ka = vec3(0.2313, 0.2313, 0.2313);\n" + //Коэфф отражения фонового света
    "vec3 kd = vec3(0.2775, 0.2775, 0.2775);\n" + //Коэфф отражения рассеянного света
    "vec3 ks = vec3(0.7739, 0.7739, 0.7739);\n" + //Коэфф зеркального отражения
    "const float m = 90.0;\n" +
    "varying vec4 v_Color;\n" +
    "void main() {\n" +
    "   gl_Position = u_MvpMatrix * a_Position;\n" +
    "   vec3 normal = normalize(vec3(u_NormalMatrix * a_Normal));\n" +
    "   vec4 vertexPosition = u_ModelMatrix * a_Position;\n" +
    "   vec3 v_surfaceToLight = u_LightPosition - vec3(vertexPosition);\n" +
    "   vec3 v_surfaceToView = u_viewWorldPosition - vec3(vertexPosition);\n" +
    "   vec3 surfaceToLightDirection = normalize(v_surfaceToLight);\n" +
    "   vec3 surfaceToViewDirection = normalize(v_surfaceToView);\n" +
    "   vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);\n" +
    "   vec3 mirroredViewDirection = normalize(dot(normal + normal, surfaceToLightDirection) * normal - surfaceToLightDirection);\n" +
    "   float lightDirectionDotNormal = max(dot(surfaceToLightDirection, normal), 0.0);\n" +
    "   float viewDotMirroredDirection = max(dot(surfaceToViewDirection, mirroredViewDirection), 0.0);\n" +
    "   vec3 ambient = ka * u_AmbientLight * a_Color.rgb;\n" +
    "   vec3 diffuse = kd * u_LightColor * a_Color.rgb * lightDirectionDotNormal;\n" +
    "   vec3 specular = ks * u_LightColor * pow(viewDotMirroredDirection, m);\n" +
    "   v_Color = vec4(diffuse + ambient + specular, a_Color.a);\n" +
    // "   float specular = 0.0;\n" +
    // "   if (light > 0.0) {\n" +
    // "       specular = pow(max(dot(normal, halfVector), 0.0), u_shininess);\n" +
    // "   }\n" +
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

    const u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
    const u_MvpMatrix = gl.getUniformLocation(gl.program, "u_MvpMatrix");
    const u_NormalMatrix = gl.getUniformLocation(gl.program, "u_NormalMatrix");
    const u_LightColor = gl.getUniformLocation(gl.program, "u_LightColor");
    const u_LightPosition = gl.getUniformLocation(
        gl.program,
        "u_LightPosition"
    );
    const u_AmbientLight = gl.getUniformLocation(gl.program, "u_AmbientLight");
    if (
        !u_MvpMatrix ||
        !u_NormalMatrix ||
        !u_LightColor ||
        !u_LightPosition ||
        !u_AmbientLight
    ) {
        console.log("Failed to get the storage location");
        return;
    }

    gl.uniform3f(
        u_LightColor,
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2]
    );
    gl.uniform3f(u_LightPosition, 6.0, 6.0, 14.0);
    gl.uniform3f(u_AmbientLight, 0.0, 0.0, 0.0);

    const viewWorldPositionLocation = gl.getUniformLocation(
        gl.program,
        "u_viewWorldPosition"
    );
    const camera = [6.0, 6.0, 14.0];
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
    mat4.lookAt(viewMatrix, [7.0, 7.5, 10.0], [0.0, 0.0, 0.0], [0, 1, 0]);
    mat4.multiply(mvpMatrix, projMatrx, viewMatrix);

    mat4.multiply(mvpMatrix, mvpMatrix, modelMatrix);

    mat4.invert(normalMatrix, modelMatrix);
    mat4.transpose(normalMatrix, normalMatrix);

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

    if (!initArrayBuffer(gl, "a_Position", vertices, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Color", colors, 3, gl.FLOAT)) return -1;
    if (!initArrayBuffer(gl, "a_Normal", normals, 3, gl.FLOAT)) return -1;

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
