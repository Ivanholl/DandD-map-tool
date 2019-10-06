let ctx;
let canvas;

class CanvasCtrl {
    constructor($canvasElement, brushSrc) {
        canvas = $canvasElement[0];
        ctx = canvas.getContext('2d');

        this.isDrawing = false;
        this.brush = new Image();
        this.zoomLevel = 1;

        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        this.setBlack();
        this.setBrush('', $canvasElement);
        this.setContextOperation('destination-out');

        $canvasElement
            .on('touchstart mousedown', (e) => {this.isDrawing = true; this.draw(e)})
            .on('touchmove mousemove', (e) => this.isDrawing ?  this.draw(e) : '')
            .on('touchend mouseup', (e) => this.isDrawing = false)

    }

    setBrush(src, canvasElement){
        this.brush.src = src || './images/brush.png';

        this.brush.onload = () => {
            this.offsetX = canvasElement.offset().left + this.brush.width / 2;
            this.offsetY = canvasElement.offset().top + this.brush.height / 2;
        }
    }

    getPosition(e){
        return {
            x: (e.pageX || e.touches[0].clientX) - this.offsetX,
            y: (e.pageY || e.touches[0].clientY) - this.offsetY,
        }
    }

    setContextOperation(operation){
        this.lastOperation = operation;
        ctx.globalCompositeOperation = operation;
    }

    draw(e) {
        var position = this.getPosition(e);

        ctx.drawImage(this.brush, position.x, position.y);
    };

    setTool = (tool) => {
        switch (tool) {
            case 'erase':
                this.setContextOperation('destination-out')
                break;
            case 'write':
                this.setContextOperation('source-over')
                break;
            default:

        }
    }
    setBlack = () => {
        ctx.globalCompositeOperation =  "source-over";
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        $('.map').show();
        ctx.globalCompositeOperation =  this.lastOperation;
    }
    revealAll = () =>  {
        ctx.globalCompositeOperation =  'destination-out';
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        $('.map').show();
        ctx.globalCompositeOperation =  this.lastOperation;
    }
    zoom = (up) => {

        let scale  = this.zoomLevel += up || 1;
        ctx.scale(scale, scale)
    }
}

export { CanvasCtrl };
