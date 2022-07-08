let strokeColor = 40;

class Cell {
    constructor(col, row, x, y, c) {
        this.col = col;
        this.row = row;
        this.x = x;
        this.y = y;
        this.c = c;
    }

    draw() {
        stroke(strokeColor);
        fill(color(colorArray[this.c]));
        rect(this.x, this.y, sizeX, sizeY);
    }

    nextColor() {
        if (this.c < colorArray.length - 1) {
            this.c++;
        } else {
            this.c = 0;
        }
    }
}
