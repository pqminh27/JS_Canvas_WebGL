"use strict";

function main() {
    const canvas = document.getElementById("mycanvas");
    if (!canvas) {
        console.log("Failed to retrieve the <canvas> element");
        return false;
    }

    const ctx = canvas.getContext("2d");

    //color background of all to cyan
    // ctx.fillStyle = "cyan";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    // // Variant 1
    // //head;
    // ctx.fillStyle = "Black";
    // ctx.fillRect(200, 75, 50, 50);
    // //body
    // ctx.fillRect(190, 160, 70, 110);
    // //neck
    // ctx.fillRect(220, 125, 10, 35);
    // //arms
    // ctx.fillRect(150, 150, 150, 10);
    // //space between 2 legs
    // ctx.fillStyle = "White";
    // ctx.fillRect(200, 220, 50, 50);

    //Variant 4: Watch
    //2 circles
    ctx.beginPath();
    ctx.arc(100, 100, 99, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(100, 100, 95, 0, Math.PI * 2, false);
    ctx.stroke();
    //2 lines
    ctx.beginPath();
    //short line
    ctx.moveTo(100, 100);
    ctx.lineTo(37, 100);
    ctx.stroke();
    //long line
    ctx.moveTo(100, 100);
    ctx.lineTo(100, 18);
    ctx.closePath();
    ctx.stroke();

    //Number 12
    ctx.font = "15px Arial";
    ctx.fillText("12", 92.5, 18);
    // -------------------------------------------------------------
}
