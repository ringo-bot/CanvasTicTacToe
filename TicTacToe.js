'use strict';

var lineColor = "#242862";
var canvas = document.getElementById('tic-tac-toe-board');
var context = canvas.getContext('2d');

var canvasSize = 500;
var sectionSize = canvasSize / 3;
canvas.width = canvasSize;
canvas.height = canvasSize;
context.translate(0.5, 0.5);

function initializeBoard (defaultValue) {
  var board = [];

  for (var x = 0;x < 3;x++) {
    board.push([]);

    for (var y = 0;y < 3;y++) {
      board[x].push(defaultValue);
    }
  }

  return board;
}

function drawBoard (lineWidth, strokeStyle) {
  var lineStart = 4;
  var lineLength = canvasSize - 5;
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  context.strokeStyle = strokeStyle;
  context.beginPath();

  /*
   * Horizontal lines 
   */
  for (var y = 1; y <= 2; y++) {  
    context.moveTo(lineStart, y * sectionSize);
    context.lineTo(lineLength, y * sectionSize);
  }

  /*
   * Vertical lines 
   */
  for (var x = 1; x <= 2; x++) {
    context.moveTo(x * sectionSize, lineStart);
    context.lineTo(x * sectionSize, lineLength);
  }

  context.stroke();
}

drawBoard(10, lineColor);

var board = initializeBoard("");
var player = 0;

function addPlayingPiece (mouse) {
  var xCoordinate;
  var yCoordinate;

  for (var x = 0; x < 3; x++) {
    for (var y = 0; y < 3; y++) {
      xCoordinate = x * sectionSize;
      yCoordinate = y * sectionSize;

      if (
          mouse.x >= xCoordinate && mouse.x <= xCoordinate + sectionSize &&
          mouse.y >= yCoordinate && mouse.y <= yCoordinate + sectionSize
        ) { 

        if (player === 0 && board[x][y] === "") {
          drawX(xCoordinate, yCoordinate);
		  board[x][y] = "X";
		  drawLine(xCoordinate, yCoordinate, checkWinner());
		  return true;
        } else if (board[x][y] === "") {
          drawO(xCoordinate, yCoordinate);
		  board[x][y] = "Y";
		  drawLine(xCoordinate, yCoordinate, checkWinner());
		  return true;
        }
		return false;
      }
    }
  }
}

function drawO (xCoordinate, yCoordinate) {
  var halfSectionSize = (0.5 * sectionSize);
  var centerX = xCoordinate + halfSectionSize;
  var centerY = yCoordinate + halfSectionSize;
  var radius = (sectionSize - 100) / 2;
  var startAngle = 0 * Math.PI; 
  var endAngle = 2 * Math.PI;

  context.lineWidth = 10;
  context.strokeStyle = "#286224";
  context.beginPath();
  context.arc(centerX, centerY, radius, startAngle, endAngle);
  context.stroke();
}

function drawX (xCoordinate, yCoordinate) {
  context.strokeStyle = "#622428";

  context.beginPath();
  
  var offset = 50;
  context.moveTo(xCoordinate + offset, yCoordinate + offset);
  context.lineTo(xCoordinate + sectionSize - offset, yCoordinate + sectionSize - offset);

  context.moveTo(xCoordinate + offset, yCoordinate + sectionSize - offset);
  context.lineTo(xCoordinate + sectionSize - offset, yCoordinate + offset);

  context.stroke();
}

function drawLine(xCoordinate, yCoordinate, direction) {
	if (direction === 0) {
		return;
	}
	
	if (direction === 1) {
	  context.strokeStyle = "#625e24";
	  context.lineCap = 'round';
	  var halfSectionSize = (0.5 * sectionSize);
	  var centerY = yCoordinate + halfSectionSize;


	  context.beginPath();
	  
	  context.moveTo(0, centerY);
	  context.lineTo(canvasSize, centerY);
	  
	  context.stroke();
	  return;
	}
	
	if (direction === 2) {
	  context.strokeStyle = "#625e24";
	  context.lineCap = 'round';
	  var halfSectionSize = (0.5 * sectionSize);
	  var centerX = xCoordinate + halfSectionSize;


	  context.beginPath();
	  
	  context.moveTo(centerX, 0);
	  context.lineTo(centerX, canvasSize);
	  
	  context.stroke();
	  return;
	}
	
	if (direction === 3) {
	  context.strokeStyle = "#625e24";
	  context.lineCap = 'round';

	  context.beginPath();
	  
	  context.moveTo(0, 0);
	  context.lineTo(canvasSize, canvasSize);
	  
	  context.stroke();
	  return;
	}
	
	if (direction === 4) {
	  context.strokeStyle = "#625e24";
	  context.lineCap = 'round';

	  context.beginPath();
	  
	  context.moveTo(canvasSize, 0);
	  context.lineTo(0, canvasSize);
	  
	  context.stroke();
	  return;
	}
	
}

function checkWinner() {
	var winner = Math.max(checkVertical(), checkHorizontal(),  checkDiagonal());
	
	if (winner != 0) {
		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++) {
				board[x][y] = "W";
			}
		}
	}
	
	return winner;
}

function checkHorizontal() {
	for (var col = 0; col < 3; col++) {
		if (
			board[0][col] === board[1][col] &&
			board[1][col] === board[2][col] &&
			board[0][col] != ""
			) 
			{
			return 1;
			}
	}
	return 0;
}

function checkVertical() {
	for (var row = 0; row < 3; row++) {
		if (
			board[row][0] === board[row][1] &&
			board[row][1] === board[row][2] &&
			board[row][0] != ""
			) 
			{
			return 2;
			}
	}
	return 0;
}

function checkDiagonal() {
	if (
		board[0][0] === board[1][1] &&
		board[1][1] === board[2][2] &&
		board[0][0] != ""
		) {
		return 3;
	}
	
	if (
		board[0][2] === board[1][1] &&
		board[1][1] === board[2][0] && 
		board[0][2] != ""
		) {
		return 4;
	}
	return 0;
}

function checkDraw() {
	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++) {
			if (board[x][y] === "") {
				return false;
			}
		}
	}
	return true;
}

function announceWinner(winner) {
	if (winner === 0) {
		if (checkDraw()) {
			context.fillStyle = "white";
			context.strokeStyle = "black";
			context.lineWidth = 2;
			context.font = "100pt Arial";
			
			context.fillText("Draw!", 75, canvas.height/2 + 50);
			context.strokeText("Draw!", 75, canvas.height/2 + 50);	
		}
		return;
	}
	context.fillStyle = "white";
	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.font = "45pt Arial";
	
	context.fillText("Player " + (player+1)  + " Winner!", 25, canvas.height/2 + 50);
	context.strokeText("Player " + (player+1) + " Winner!", 25, canvas.height/2 + 50);	
	
}

function getCanvasMousePosition (event) {
  var rect = canvas.getBoundingClientRect();

  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

canvas.addEventListener('mouseup', function (event) {
	var canvasMousePosition = getCanvasMousePosition(event);
	if (addPlayingPiece(canvasMousePosition)) {
		announceWinner(checkWinner());
		player = 1 - player;
	}

});