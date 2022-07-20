const rows = 16;
const cols = rows;
const resoX = 500;
const resoY = resoX;
let sizeX;
let sizeY;
let cells = [];
let users = [];
let clientId;
let colorArray = ["#fff", "#55ffff", "#ff55ff", "#000"];

function setup() {
    frameRate(15);
    sizeX = resoX / rows;
    sizeY = resoY / cols;
    const canvas = createCanvas(resoX, resoY);
    canvas.parent("p5canvas");
    cells = defaultCells;
}

function start() {
    clientId = getRandomInt().toString();
    document.getElementById("clientId").innerText = `| You: ${clientId}`;
    const userColor = color(
        random(70, 255),
        random(70, 255),
        random(70, 255)
    ).toString("#rrggbb");
    console.log(`${clientId}-${userColor}`);
    const user = new User(clientId, userColor);
    users.push(user);
    connectAzureWebPubSub(user);
}

function draw() {
    cells.forEach((cell) => {
        cell.draw();
    });
    users.forEach((user) => {
        if (user.id === clientId) {
            user.update();
        }
        user.draw();
    });
}

async function changeColorPalette() {
    const paletteId =  document.getElementById("paletteSelect").value;
    const response = await fetch(
        `/api/ChangeColorPalette/${groupName}/${paletteId}?hubName=${hubName}`
    );
    if (response.ok) {
        const colors = await response.json();
        handleChangeColorPalette(paletteId, colors);
    }
}

function handleChangeColorPalette(paletteId, colors) {
    document.getElementById("paletteSelect").value = paletteId;
    colorArray = colors;
}

function keyTyped() {
    if (key === "r") {
        reset();
    }
}

function reset() {
    resetGrid();
    webSocket?.send(JSON.stringify({
        type: "sendToGroup",
        group: groupName,
        noEcho: true,
        data: {
            messageType: resetMessage
        }
    }));
}

function resetGrid() {
    cells = [];
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            cells.push(new Cell(col, row, colorArray.length - 1));
        }
    }
}

async function mouseClicked() {
    if (mouseX >= 0 && mouseX <= resoX && mouseY >= 0 && mouseY <= resoY) {
        clickCell(mouseX, mouseY);
        webSocket?.send(JSON.stringify({
            type: "sendToGroup",
            group: groupName,
            noEcho: true,
            data: {
                messageType: clickPositionMessage,
                x: mouseX,
                y: mouseY,
            }
        }));
    }
}

function clickCell(x, y) {
    const col = floor(x / sizeX);
    const row = floor(y / sizeY);
    const selectedCell = cells[col * cols + row];
    if (selectedCell) {
        selectedCell.nextColor();
    }
}

function setUserPosition(id, c, x, y) {
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
        addUser(id, c);
        setUserPosition(id, c, x, y);
    } else {
        user.setPosition(x, y);
    }
}

function exportAsPng() {
    strokeColor = color(colorArray.length - 1);
    draw();
    const date = new Date().toISOString().split("T")[0];
    saveCanvas(`${date}-pixel-drawing`, "png");
    strokeColor = 40;
}

function addUser(id, color) {
    const user = users.find((user) => user.id === id);
    if (user === undefined) {
        users.push(new User(id, color));
    }

    document.getElementById("users").innerText = users.length;
}

function removeUser(id) {
    users.splice(
        users.findIndex((user) => user.id === id),
        1
    );
    document.getElementById("users").innerText = users.length;
}

function disconnectUser() {
    users = [];
    document.getElementById("users").innerText = "";
    document.getElementById("clientId").innerText = "";
}

function getRandomInt() {
    const min = Math.ceil(1000);
    const max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
