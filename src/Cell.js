let strokeColor = 50;

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
        fill(color(this.c));
        rect(this.x, this.y, sizeX, sizeY);
    }

    drawBorder() {
        this.c = colorArray[0];
    }

    nextColor() {
        let colorIndex = colorArray.findIndex(c => c === this.c);
        if (colorIndex < colorArray.length - 1) {
            colorIndex++;
        } else {
            colorIndex = 0;
        }
        this.c = colorArray[colorIndex];
    }
}
