"use strict";
const {mat2, mat3, mat4, vec2, vec3, vec4} = glMatrix;

// Vertex shader program
const VSHADER_SOURCE =
    "attribute vec4 a_Position;\n" +
    "attribute vec4 a_Colors;\n" +
    "uniform mat4 u_Matrix;\n" +
    "varying vec4 v_Colors;\n" +
    "void main() {\n" +
    "  v_Colors = a_Colors;\n" +
    "  gl_Position = u_Matrix * a_Position;\n" +
    "  gl_PointSize = 10.0;\n" +
    "}\n";

// Fragment shader program
const FSHADER_SOURCE =
    "precision mediump float;\n" +
    "varying vec4 v_Colors;\n" +
    "void main() {\n" +
    "  gl_FragColor = v_Colors;\n" +
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
        console.log("Failed to set the positions of the vertices");
        return;
    }

    // Specify the color for clearing <canvas>
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const controls = {
        view: "axonometry",
        perspective_method: "perspective",
        zoom: "in",
        perspective_effect: "more",
    };

    const gui = new dat.GUI();

    const u_Matrix = gl.getUniformLocation(gl.program, "u_Matrix");
    if (!u_Matrix) {
        console.log("Failed to get the storage location of u_Matrix");
        return;
    }
    let perspectiveMatrix = mat4.create();

    const projection = {
        type: "Orthographic",
        switchCamera: function () {
            if (this.type == "Perspective") {
                mat4.ortho(
                    perspectiveMatrix,
                    -1.0,
                    1.0,
                    -1.0,
                    1.0,
                    0.001,
                    1000
                );
                // TODO: настроить матрицу ортогонального проецирования

                this.type = "Orthographic";
                gui.remove(view);
                if (perspective_method != undefined)
                    gui.remove(perspective_method);
                if (perspective_effect != undefined)
                    gui.remove(perspective_effect);
                controls.view = "axonometry";
                view = gui.add(controls, "view", [
                    "left",
                    "right",
                    "top",
                    "bottom",
                    "front",
                    "back",
                    "isometry",
                    "axonometry",
                ]);
                zoom = gui.add(controls, "zoom", ["in", "out"]);
            } else {
                // TODO: настроить матрицу перспективной проекции
                mat4.perspective(
                    perspectiveMatrix,
                    glMatrix.glMatrix.toRadian(120),
                    1,
                    0.001,
                    1000
                );

                this.type = "Perspective";

                gui.remove(view);
                gui.remove(zoom);
                controls.view = "3-point";
                view = gui.add(controls, "view", [
                    "1-point",
                    "2-point",
                    "3-point",
                ]);
                perspective_method = gui.add(controls, "perspective_method", [
                    "perspective",
                    "frustum",
                ]);
                perspective_effect = gui.add(controls, "perspective_effect", [
                    "more",
                    "less",
                ]);
            }
        },
    };

    gui.add(projection, "switchCamera");
    gui.add(projection, "type").listen();
    let view = gui.add(controls, "view", [
        "left",
        "right",
        "top",
        "bottom",
        "front",
        "back",
        "isometry",
        "axonometry",
    ]);
    let zoom = gui.add(controls, "zoom", ["in", "out"]);
    let perspective_method;
    let perspective_effect;

    let eye = vec3.create(),
        centerPoint = [0.0, 0.0, 0.0],
        zoomScope = 1,
        viewMatrix = mat4.create(),
        projMatrix = mat4.create();

    function render() {
        switch (controls.view) {
            case "left":
                vec3.set(eye, -1.0, 0.0, 0.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                break;
            case "right":
                vec3.set(eye, 1.0, 0.0, 0.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                break;
            case "top":
                vec3.set(eye, 0.0, 1.0, 0.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [1.0, 0.0, 0.0]);
                break;
            case "bottom":
                vec3.set(eye, 0.0, -1.0, 0.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [1.0, 0.0, 0.0]);
                break;
            case "front":
                vec3.set(eye, 0.0, 0.0, 1.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                break;
            case "back":
                vec3.set(eye, 0.0, 0.0, -1.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                break;
            case "isometry":
                vec3.set(eye, 1.0, 1.0, 1.0);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                switch (controls.zoom) {
                    case "in":
                        mat4.ortho(
                            projMatrix,
                            -1.0,
                            1.0,
                            -1.0,
                            1.0,
                            0.001,
                            1000
                        );
                        break;
                    case "out":
                        mat4.ortho(
                            projMatrix,
                            -2.2,
                            2.2,
                            -2.2,
                            2.2,
                            0.001,
                            1000
                        );
                        break;
                }
                break;
            case "axonometry":
                vec3.set(eye, 0.2, 0.4, 0.6);
                mat4.lookAt(viewMatrix, eye, centerPoint, [0.0, 1.0, 0.0]);
                switch (controls.zoom) {
                    case "in":
                        mat4.ortho(
                            projMatrix,
                            -1.0,
                            1.0,
                            -1.0,
                            1.0,
                            0.001,
                            1000
                        );
                        break;
                    case "out":
                        mat4.ortho(
                            projMatrix,
                            -2.2,
                            2.2,
                            -2.2,
                            2.2,
                            0.001,
                            1000
                        );
                        break;
                }
                break;
            case "1-point":
                switch (controls.perspective_method) {
                    case "perspective":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.0, 0.0, 1.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(100),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 0.0, 0.0, 2.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(60),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                        }
                        break;
                    case "frustum":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.0, 0.0, 1.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.15,
                                    0.15,
                                    -0.15,
                                    0.15,
                                    0.1,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 0.0, 0.0, 2.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.15,
                                    0.15,
                                    -0.15,
                                    0.15,
                                    0.2,
                                    1000
                                );
                                break;
                        }
                        break;
                }
                break;

            case "2-point":
                // vec3.set(eye, 0.0, 0.6, 1.5);
                switch (controls.perspective_method) {
                    case "perspective":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.0, 0.6, 1.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(100),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 0.0, 1.2, 2.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(50),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                        }
                        break;

                    case "frustum":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.0, 0.8, 1.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.15,
                                    0.15,
                                    -0.15,
                                    0.15,
                                    0.25,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 0.0, 1.2, 2.0);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.12,
                                    0.12,
                                    -0.12,
                                    0.12,
                                    0.1,
                                    1000
                                );
                                break;
                        }
                        break;
                }
                break;

            case "3-point":
                switch (controls.perspective_method) {
                    case "perspective":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.6, 1.0, 1.5);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(60),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 1.2, 1.8, 2.5);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.perspective(
                                    projMatrix,
                                    glMatrix.glMatrix.toRadian(30),
                                    1,
                                    0.001,
                                    1000
                                );
                                break;
                        }
                        break;
                    case "frustum":
                        switch (controls.perspective_effect) {
                            case "more":
                                vec3.set(eye, 0.6, 1.0, 1.5);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.15,
                                    0.15,
                                    -0.15,
                                    0.15,
                                    0.25,
                                    1000
                                );
                                break;
                            case "less":
                                vec3.set(eye, 1.2, 1.8, 2.5);
                                mat4.lookAt(
                                    viewMatrix,
                                    eye,
                                    centerPoint,
                                    [0.0, 1.0, 0.0]
                                );
                                mat4.frustum(
                                    projMatrix,
                                    -0.125,
                                    0.125,
                                    -0.125,
                                    0.125,
                                    0.1,
                                    1000
                                );
                                break;
                        }
                        break;
                }
                break;
        }
        gl.uniformMatrix4fv(
            u_Matrix,
            false,
            mat4.multiply(mat4.create(), projMatrix, viewMatrix)
        );

        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);

        gl.drawArrays(gl.LINE_LOOP, 0, 4);
        gl.drawArrays(gl.LINE_LOOP, 4, 4);
        gl.drawArrays(gl.LINES, 8, 8);

        // render using requestAnimationFrame
        requestAnimationFrame(render);
    }

    // call the render function
    render();
}

function initVertexBuffers(gl) {
    const n = 16; // Number of vertices
    const vertices = new Float32Array([
        0.4, 0.4, 0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4,

        0.4, -0.4, -0.4, 0.4, 0.4, -0.4, -0.4, 0.4, -0.4, -0.4, -0.4, -0.4,

        0.4, 0.4, 0.4, 0.4, 0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4, -0.4,

        -0.4, -0.4, -0.4, -0.4, -0.4, 0.4, 0.4, -0.4, 0.4, 0.4, -0.4, -0.4,
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
        g_colors.red[2],

        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],
        g_colors.blue[0],
        g_colors.blue[1],
        g_colors.blue[2],

        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],
        g_colors.white[0],
        g_colors.white[1],
        g_colors.white[2],

        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],
        g_colors.yellow[0],
        g_colors.yellow[1],
        g_colors.yellow[2],

        //////////////////////////////////////////////
        // g_colors.red[0],
        // g_colors.red[1],
        // g_colors.red[2],
        // g_colors.red[0],
        // g_colors.red[1],
        // g_colors.red[2],
        // g_colors.blue[0],
        // g_colors.blue[1],
        // g_colors.blue[2],
        // g_colors.blue[0],
        // g_colors.blue[1],
        // g_colors.blue[2],
        // g_colors.white[0],
        // g_colors.white[1],
        // g_colors.white[2],
        // g_colors.white[0],
        // g_colors.white[1],
        // g_colors.white[2],
        // g_colors.yellow[0],
        // g_colors.yellow[1],
        // g_colors.yellow[2],
        // g_colors.yellow[0],
        // g_colors.yellow[1],
        // g_colors.yellow[2],
        // g_colors.red[0],
        // g_colors.red[1],
        // g_colors.red[2],
        // g_colors.white[0],
        // g_colors.white[1],
        // g_colors.white[2],
        // g_colors.red[0],
        // g_colors.red[1],
        // g_colors.red[2],
        // g_colors.white[0],
        // g_colors.white[1],
        // g_colors.white[2],
        // g_colors.blue[0],
        // g_colors.blue[1],
        // g_colors.blue[2],
        // g_colors.yellow[0],
        // g_colors.yellow[1],
        // g_colors.yellow[2],
        // g_colors.blue[0],
        // g_colors.blue[1],
        // g_colors.blue[2],
        // g_colors.yellow[0],
        // g_colors.yellow[1],
        // g_colors.yellow[2],
    ]);

    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const a_Position = gl.getAttribLocation(gl.program, "a_Position");
    if (a_Position < 0) {
        console.log("Failed to get the storage location of a_Position");
        return -1;
    }
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    const colorBuffer = gl.createBuffer();
    if (!colorBuffer) {
        console.log("Failed to create the buffer object");
        return -1;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const a_Colors = gl.getAttribLocation(gl.program, "a_Colors");
    if (a_Colors < 0) {
        console.log("Failed to get the storage location of a_Colors");
        return -1;
    }
    gl.vertexAttribPointer(a_Colors, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Colors);

    return n;
}
