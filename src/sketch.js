let rows;
let cols;
const resoX = 500;
const resoY = resoX;
let userId;
let sizeX;
let sizeY;
let cells = [];
let users = [];

let slider;
const colorArray = ["#fff", "#55ffff", "#ff55ff", "#000"]

function setup() {
  userId = "a";
  users.push(new User(userId));
  const saveButton = createButton('Save as PNG');
  saveButton.mousePressed(saveGridAsPng);
  const clearButton = createButton('Reset');
  clearButton.mousePressed(clearGrid);
  slider = createSlider(4, 16, 8, 4);
  slider.changed(initGrid);
  initGrid();
}

function initGrid() {
  rows = slider.value();
  cols=rows;
  sizeX = resoX/rows;
  sizeY = resoY/cols;
  createCanvas(resoX, resoY);
  createGrid();
}

function draw() {
  cells.forEach(cell => {
    cell.draw();
  });
  users.forEach(user => {
    if (user.id === userId) {
      user.update();
    }
    user.draw();
  });
} 

function createGrid() {
  cells = [];
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = sizeX * col;
      const y = sizeY * row;
      cells.push(new Cell(col, row, x, y, colorArray[colorArray.length-1]));
    }
  }
}

function mouseClicked() {
  if (mouseX <= resoX && mouseY <= resoY) {
    clickCell(mouseX, mouseY);
  }
}

function clickCell(x, y) {
  const col = floor(x / sizeX);
  const row = floor(y / sizeY);
  const selectedCell = cells[col*cols+row];
  if (selectedCell) {
    selectedCell.nextColor();
  }
}

function drawMouseRect() {
  if (mouseX <= resoX && mouseY <= resoY) {
    user.draw();
  }
}

function saveGridAsPng() {
  strokeColor=0;
  draw();
  saveCanvas('pixel-grid', 'png');
  strokeColor=50;
}

function clearGrid() {
  createGrid();
}

function addUser(id) {
  const user = users.find(user => user.id === id)
  if (user === undefined) {
    users.push(new User(member.clientId));
  }
}

function setUserPosition(id, x, y) {
  const user = users.find(user => user.id === id);
  if (user) {
    user.setPosition(x, y);
  }
}
