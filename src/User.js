class User {
    constructor(id) {
        this.id = id;
        this.strokeColor = color(random(70, 255), random(70, 255), random(70, 255));
        this.x;
        this.y;
    }

    update() {
        this.x = mouseX;
        this.y = mouseY;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        const col = floor(this.x / sizeX);
        const row = floor(this.y / sizeY);
        const x = col * sizeX;
        const y = row * sizeY;
        stroke(this.strokeColor);
        noFill();
        rect(x, y, sizeX, sizeY);
    }
}
