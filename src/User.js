class User {
    constructor(id, color) {
        this.id = id;
        this.strokeColor = color;
        this.x;
        this.y;
        this.col;
        this.row;
        this.prevCol;
        this.prevRow;
        
    }

    update() {
        this.x = mouseX;
        this.y = mouseY;
        this.col = floor(this.x / sizeX);
        this.row = floor(this.y / sizeY);
        if (this.col !== this.prevCol || this.row !== this.prevRow) {
            channel?.publish(hoverPosition, {
                x: this.x,
                y: this.y,
            });
        }
        this.prevCol = this.col;
        this.prevRow = this.row;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.col = floor(this.x / sizeX);
        this.row = floor(this.y / sizeY);
    }

    draw() {
        const x = this.col * sizeX;
        const y = this.row * sizeY;
        stroke(color(this.strokeColor));
        noFill();
        rect(x, y, sizeX, sizeY);
    }
}
