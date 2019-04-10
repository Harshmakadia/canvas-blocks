$(document).ready(function() {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;

    var startX;
    var startY;
    var isDown = false;
    var dragTarget;

    var boxes = [];
    boxes.push({
        x: 50,
        y: 25,
        w: 75,
        h: 50,
        color: "red",
        text: "hello"
    }); // x,y,width,height
    boxes.push({
        x: 100,
        y: 100,
        w: 75,
        h: 60,
        color: "yellow",
        text: "World"
    });
    boxes.push({
        x: 200,
        y: 100,
        w: 75,
        h: 80,
        color: "green",
        text: "peace"
    });


    var connectors = [];
    connectors.push({
        box1: 0,
        box2: 1
    });
    connectors.push({
        box1: 1,
        box2: 2
    });

    draw();

    function draw() {

        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            // ctx.textAlign = 'center';
            ctx.font = "20px Arial black";
            ctx.strokeStyle = 'black';
            ctx.fillStyle = box.color;
            ctx.fillRect(box.x, box.y, box.w, box.h);
            ctx.fillStyle = 'black';
            //Adding random margin to properly set the text
            ctx.fillText(box.text,box.x+5, box.y+25);
        }
        for (var i = 0; i < connectors.length; i++) {
            var connector = connectors[i];
            var box1 = boxes[connector.box1];
            var box2 = boxes[connector.box2];
            ctx.beginPath();
            ctx.moveTo(box1.x + box1.w / 2, box1.y + box1.h / 2);
            ctx.lineTo(box2.x + box2.w / 2, box2.y + box2.h / 2);
            ctx.stroke();
        }

    }

    function hit(x, y) {
        for (var i = 0; i < boxes.length; i++) {
            var box = boxes[i];
            if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
                dragTarget = box;
                return (true);
            }
        }
        return (false);
    }

    function handleMouseDown(e) {
        startX = parseInt(e.clientX - offsetX);
        startY = parseInt(e.clientY - offsetY);

        // Put your mousedown stuff here
        isDown = hit(startX, startY);
    }

    function handleMouseUp(e) {
        // Put your mouseup stuff here
        dragTarget = null;
        isDown = false;
    }

    function handleMouseOut(e) {
        handleMouseUp(e);
    }

    function handleMouseMove(e) {
        if (!isDown) {
            return;
        }

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        // Put your mousemove stuff here
        var dx = mouseX - startX;
        var dy = mouseY - startY;
        startX = mouseX;
        startY = mouseY;
        dragTarget.x += dx;
        dragTarget.y += dy;
        draw();
    }

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });
});