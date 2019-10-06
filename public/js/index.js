import {CanvasCtrl} from './CanvasCtrl.js';

$(document).ready(() => {
    var $canvasElement = $('#js-canvas');
    var canvas = new CanvasCtrl($canvasElement);
debugger

$('#mapSelector').on('change', (e) => {
    let newImg = $(e.target).val()
    $('.container .map').attr('src', newImg)
});

    $canvasElement
        .bind("contextmenu", (e)  => {
            e.preventDefault();
            $("#tools-menu").hide(100, () => {
                $("#tools-menu").css("left",e.pageX);
                $("#tools-menu").css("top",e.pageY);
            });

            $("#tools-menu").delay(50).fadeIn(100, startFocusOut());
        })
        .bind('wheel', (e) => {
            e.preventDefault();
            let scale = event.deltaY < 0 ? 1 : 0;
            canvas.zoom(scale)
        })
        // .bind('mousedown', (e) => {
        //     e.preventDefault();
        //     canvas.zoom(-1)
        // })


    $('#tools-menu .items #reset').click(() => canvas.setBlack() );
    $('#tools-menu .items #reveal').click(() => canvas.revealAll() );
    $('#tools-menu .items #erase').click(() => canvas.setTool('erase') );
    $('#tools-menu .items #write').click(() => canvas.setTool('write') );

    function startFocusOut(){
        $(document).on("click",function(){
            $("#tools-menu").delay(100).hide();
            $(document).off("click");
      });
    }


})

// function init() { void(0)}
//
// export default {init()};
/*    var isDrawing, lastPoint;
    var container = document.getElementById('js-container'),
        canvas = document.getElementById('js-canvas'),
        canvasWidth = canvas.width,
        canvasHeight = canvas.height,
        ctx = canvas.getContext('2d'),
        image = new Image(),
        brush = new Image();

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    image.src = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/A_blank_black_picture.jpg';
    // brush.src = './images/brush.jpg';
    brush.src = './images/brush.png';

    image.onload = function() {
        ctx.drawImage(image, 0, 0);
        // document.querySelectorAll('.map')[0].style.visibility = 'visible';
        $('.map').show()
    };

    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('touchmove', handleMouseMove, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    canvas.addEventListener('touchend', handleMouseUp, false);

    function distanceBetween(point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }

    function angleBetween(point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    }

    function getMouse(e, canvas) {
        var offsetX = 0,
            offsetY = 0,
            mx, my;

        if (canvas.offsetParent !== undefined) {
            do {
                offsetX += canvas.offsetLeft;
                offsetY += canvas.offsetTop;
            } while ((canvas = canvas.offsetParent));
        }

        mx = (e.pageX || e.touches[0].clientX) - offsetX;
        my = (e.pageY || e.touches[0].clientY) - offsetY;

        return {
            x: mx,
            y: my
        };
    }

    function handleMouseDown(e) {
        isDrawing = true;
        lastPoint = getMouse(e, canvas);
    }

    function handleMouseMove(e) {
        if (!isDrawing) {
            return;
        }

        e.preventDefault();

        var currentPoint = getMouse(e, canvas),
            dist = distanceBetween(lastPoint, currentPoint),
            angle = angleBetween(lastPoint, currentPoint),
            x, y;

        for (var i = 0; i < dist; i++) {
            x = lastPoint.x + (Math.sin(angle) * i) - 25;
            y = lastPoint.y + (Math.cos(angle) * i) - 25;
            ctx.globalCompositeOperation = 'destination-out';
            ctx.drawImage(brush, x, y);
        }

        lastPoint = currentPoint;
    }

    function handleMouseUp(e) {
        isDrawing = false;
    }*/
