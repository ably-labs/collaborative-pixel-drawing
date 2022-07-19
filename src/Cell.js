let strokeColor = 40;

class Cell {
    constructor(col, row, c) {
        this.col = col;
        this.row = row;
        this.c = c;
    }

    draw() {
        stroke(strokeColor);
        fill(color(colorArray[this.c]));
        rect(this.col * sizeX, this.row * sizeY, sizeX, sizeY);
    }

    nextColor() {
        if (this.c < colorArray.length - 1) {
            this.c++;
        } else {
            this.c = 0;
        }
    }
}
