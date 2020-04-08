function clearMap(maxRows, maxColumns) {
  for (row = 0; row < maxRows; row++) {
    for (col = 0; col < maxColumns; col++) {
      document.getElementById(createIdFromRowAndColumn(row, col)).innerHTML = "";
    }
  }
}

function createGameBoard(maxRows, maxColumns) {
  for (var row = 0; row < maxRows; row++) {
    for (var col = 0; col < maxColumns; col++) {
      document.writeln("<div class='gameSquare' id='" + row + "-" + col + "'></div>")
    }
    document.writeln("<br />");
  }
}

function removeWeb() {
  var buzzyId = document.getElementById('buzzy').parentNode.id;

  // Get IDs of webs around it and put them out
  var row = parseInt(getRowFromId(buzzyId));
  var col = parseInt(getColFromId(buzzyId));

  upId = createIdFromRowAndColumn(row - 1, col);
  downId = createIdFromRowAndColumn(row + 1, col);
  leftId = createIdFromRowAndColumn(row, col - 1);
  rightId = createIdFromRowAndColumn(row, col + 1);

  checkForWebAndRemove(upId);
  checkForWebAndRemove(downId);
  checkForWebAndRemove(leftId);
  checkForWebAndRemove(rightId);
}



function checkForWebAndRemove(cellId) {
  var node = document.getElementById(cellId);
  if (node != undefined) {
    node.innerHTML = "";
  }
}

function move(currentId, colPositionChange, rowPositionChange) {
  var row = parseInt(getRowFromId(currentId));
  var col = parseInt(getColFromId(currentId));

  row += rowPositionChange;
  col += colPositionChange;

  var newId = createIdFromRowAndColumn(row, col);
  moveIfValid(currentId, newId);
}

function moveLeft() {
  var buzzy = document.getElementById('buzzy').parentNode.id;
  move(buzzy, -1, 0);
}

function moveRight() {
  var buzzy = document.getElementById('buzzy').parentNode.id;
  move(buzzy, 1, 0);
}

function moveUp() {
  var buzzy = document.getElementById('buzzy').parentNode.id;
  move(buzzy, 0, -1);
}

function moveDown() {
  var buzzy = document.getElementById('buzzy').parentNode.id;
  move(buzzy, 0, 1);
}

function moveIfValid(currentId, newId) {
  var tile = document.getElementById(newId);

  // Move as long as it is a valid tile
  if (tile != undefined && tile.innerHTML == "") {
    tile.innerHTML = document.getElementById(currentId).innerHTML;
    document.getElementById(currentId).innerHTML = "";
  } else if (tile.children[0].id == 'prize') {
    levelCompleted(tile);
  }
}

function getBuzzy() {
  return "<img src='buzz.png' class='gameImage' id='buzzy' />";
}

function getHoneyJar() {
  return "<img src='honey.png' class='gameImage' id='prize' />";
}

function getWeb() {
  return "<img src='web.png' class='gameImage'  />";
}

var keyCodeListenerMap = [];

function setupKeyListener(code, functionToCall) {
  // When the user presses a key, call a function
  keyCodeListenerMap[code] = functionToCall;
  document.onkeydown = function (e) {
    // Check if there is a key listener defined
    if (keyCodeListenerMap[e.keyCode]) {
      // Call the function
      keyCodeListenerMap[e.keyCode]();
    }
  };
}

// Helper methods
function getRowFromId(id) {
  return id.split("-")[0];
}

function getColFromId(id) {
  return id.split("-")[1];
}

function getRandomId(min1, max1, min2, max2) {
  var num1 = getRandomArbitrary(min1, max1);
  var num2 = getRandomArbitrary(min2, max2);

  return createIdFromRowAndColumn(num1, num2);
}

function createIdFromRowAndColumn(row, col) {
  return row + "-" + col;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function setHtmlElement(someId, someHtml) {
  document.getElementById(someId).innerHTML = someHtml;
}
function getHtmlElement(someId) {
  return document.getElementById(someId).innerHTML;
}