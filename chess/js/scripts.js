$(document).ready(function () {
	$('#second').hide();
})

var you = 1;
var turn = true;
var rank = ['a','b','c','d','e','f','g','h'];
var multipleMsg = 'There are multiple pieces that can make that move';
var noMoveMsg = "None of your pieces can make that move";
var white = -1;
var whiteTurn = true;
var yourColor = '';
var theirColor = '';

// initialise the board with starting positions
function setUp(color) {
	// clear board
	for (var i = 1; i < 9; i++) {
		for (var j = 1; j < 9; j++) {
			$('table tr:nth-child('+j+') td:nth-child('+i+')').html('');
		}
	}
	// reset turn indicator
	$("#whatColor").html("white's");
	// the piece identifiers
	var backRow = ['R','N','B','Q','K','B','N','R'];
	var pawn = 'p';
	// loop through squares on a rank
	for (var i = 1; i <= 8; i++) {
		// to select the right position in a table
		var row1 = 'table tr:nth-child('+1+') td:nth-child('+i+')';
		var row2 = 'table tr:nth-child('+2+') td:nth-child('+i+')';
		var for7 = 'table tr:nth-child('+7+') td:nth-child('+i+')';
		var row8 = 'table tr:nth-child('+8+') td:nth-child('+i+')';
		// set up the board
		$(row2).html(pawn);
		$(for7).html(pawn);
		$(row1).html(backRow[8-i]);
		$(row8).html(backRow[8-i]);
		$(row1).css('color', '#ffffff');
		$(row2).css('color', '#ffffff');
		$(for7).css('color', '#000000');
		$(row8).css('color', '#000000');

		flipBoard();

		//chose which board to display
		if (color == 'white') {
			$('#first').hide();	
			$('#second').show();
		} else {
			$('#first').show();
			$('#second').hide();
		}
		
	};
}

// check moves are valid
function checkSubmit() {
	var move = $('#input').val().split('');
	var length = move.length;
	var validMsg = 'That move is not in valid format';
	var validArray = ['a','b','c','d','e','f','g','h','1','2','3','4','5','6','7','8','R','N','B','Q','K','x'];
	var one = move[0];
	var two = move[1];
	
	// check move is of correct length
	if (length < 2 || length > 5) {
		alert(validMsg);
		return;
	};

	// check all characters are valid
	for (var x = 0; x < move.length; x++) {
		if ($.inArray(move[x], validArray) < 0) {
			alert(validMsg);
			return;
		}
	};

	// check the target square is valid
	if (!/[a-h]/.test(move[length-2]) || !/[1-8]/.test(move[length-1])) {
		alert(validMsg);
		return;
	};
	
	var pieceCheck = /[RNBKQ]/.test(one);
	switch (length) {
		case 2:
			pawnMove(move);
		case 3:
			if (pieceCheck) {
				pieceMove(move);
			} else if (numOrLet(one)) {
				pawnAmbigMove(move);
			} else {
				alert(validMsg);
			};
			break;
		case 4:
			if (numOrLet(one) && 'x' === two) {
				pawnTake(move);
			} else if (pieceCheck && 'x' === two) {
				pieceTake(move);
			} else if (pieceCheck && (numOrLet(two))) {
				pieceAmbigMove(move);
			} else {
				alert(validMsg);
			};
			break;
		case 5:
			if (pieceCheck && numOrLet(two) && 'x' === move[2]) {
				pieceAmbigTake(move)
			} else {
				alert(validMsg);
			};
			break;
	}
}
//check wether c is 1-8 or a-h
function numOrLet(c) {
	return (/[1-8]/.test(c) || /[a-h]/.test(c));
};

var moveMsg = "That is an invalid move"
// calculate wether or not a pawn can make a move
function pawnMove(move) {
	var x = move[0];
	x = rank.indexOf(x)+1;
	var y = Number(move[1]);
	var from = get(x, y+white);
	var to = get(x, y);
	console.log(x,y,from,to);
	// checks a pawn can move one place to the position
	if (from === 'p' && to === '') {
		mov(x,y+white,x,y);
		finished();
	// check a pawn can move two places to the positiion
	} else if (get(x, y+2*white) === 'p' && from === '' && to === '') {
		// make sure piece is on the starting rank, for double move
		if (turn) {
			if (y+2*white == 2) {
				mov(x,y+2*white,x,y);
				finished();
			} else {
				alert(moveMsg + " fuck");
			};
		} else {
			if (y+2*white == 2) {
				mov(x,y+2*white,x,y);
				finished();
			} else {
				alert(moveMsg + " fuck you");
			};
		};
	} else {
		alert(moveMsg + " fuckkk");
	};
};

function pieceMove(move) {
	switch (move[0]) {
		case 'R':
			rookMove(move);
		case 'N':
			knightMove(move);
		case 'B':
		case 'Q':
		case 'K':
	}
};

function pawnAmbigMove(move) {

};

function pawnTake(move) {

};

function pieceTake(move) {

};

function pieceAmbigMove(move) {

};

function pieceAmbigTake(move) {

};

function rookMove(move) {

};

function knightMove(move) {
	var x = move[1];
	x = rank.indexOf(x)+1;
	var y = Number(move[2]);
	var to = get(x,y);
	var positions = [];
	console.log(x,y)
	
	// check all possible starting locations
	if (get(x-1,y-2) == 'N' && get(x-1,y-2, 'c') == yourColor) {
		positions.push([x-1,y-2]);			
	};
	if (get(x+1,y-2) == 'N' && get(x+1,y-2, 'c') == yourColor) {
		positions.push([x+1,y-2]);	
	};
	if (get(x-1,y+2) == 'N' && get(x-1,y+2, 'c') == yourColor) {
		positions.push([x-1,y+2]);	
	};
	if (get(x+1,y+2) == 'N' && get(x+1,y+2, 'c') == yourColor) {
		positions.push([x+1,y+2]);	
	};
	if (get(x-2,y-1) == 'N' && get(x-2,y-1, 'c') == yourColor) {
		positions.push([x-2,y-1]);	
	};
	if (get(x+2,y-1) == 'N' && get(x+2,y-1, 'c') == yourColor) {
		positions.push([x+2,y-1]);	
	};
	if (get(x-1,y+1) == 'N' && get(x-1,y+1, 'c') == yourColor) {
		positions.push([x-1,y+1]);	
	};
	if (get(x+1,y+1) == 'N' && get(x+1,y+1, 'c') == yourColor) {
		positions.push([x+1,y+1]);	
	};
	console.log(positions);
	// if multiple/no pieces can make the move then alert, otherwise make the move
	if (positions.length == 0) {
		alert(noMoveMsg);
	} else if (positions.length > 1) {
		alert(multipleMsg);
	} else {
		if (get(x,y) == '' || get(x,y,'c') == theirColor) {
			mov(positions[0][0],positions[0][1],x,y);
			finished();	
		} else {
			alert(noMoveMsg);
		}
		
	};
};

// get the letter or color of the piece on given square
function get(x, y, c) {
	if (c == 'c') {
	//return the color
		return $('table tr:nth-child('+y+') td:nth-child('+x+')').css('color');
	} else {
	// return the piece
		return $('table tr:nth-child('+y+') td:nth-child('+x+')').html();
	};
}
function mov(x, y, i, j) {
	// find out what piece and color is ont he starting square
	var piece = $('table tr:nth-child('+y+') td:nth-child('+x+')').html();
	var color = $('table tr:nth-child('+y+') td:nth-child('+x+')').css('color');
	// empty starting tile
	$('table tr:nth-child('+y+') td:nth-child('+x+')').empty();
	console.log(piece,color);
	console.log(x,y,i,j);
	// put the piece on new tile
	$('table tr:nth-child('+j+') td:nth-child('+i+')').css('color', color);
	$('table tr:nth-child('+j+') td:nth-child('+i+')').html(piece);
}

function finished() {
	// change orientation
	white = -white;
	// change who's turn it is
	whiteTurn = !whiteTurn;
	// clear move input
	$('#input').val('');
	// flip the board to opposite view
	flipBoard();
	// change turn indicator
	if ($("#whatColor").html() == "white's") {
		$("#whatColor").html("black's");
	} else{
		$("#whatColor").html("white's");
	};
	// work out the colors of you and them
	if (whiteTurn) {
		yourColor = 'rgb(255, 255, 255)';
		theirColor = 'rgb(0, 0, 0)';
	} else {
		yourColor = 'rgb(0, 0, 0)';
		theirColor = 'rgb(255, 255, 255)';
	}
}
function flip() {
	$('#first').toggle();
	$('#second').toggle();
}
function flipBoard() {
	for (var i = 1; i <= 8; i++) {
		for (var j = 1; j <= 8; j++) {
			var piece = $('table.board1 tr:nth-child('+j+') td:nth-child('+i+')').html();
			var color = $('table.board1 tr:nth-child('+j+') td:nth-child('+i+')').css('color');
			var k = 9-j;
			var l = 9-i;
			$('table.board2 tr:nth-child('+k+') td:nth-child('+l+')').html(piece);
			$('table.board2 tr:nth-child('+k+') td:nth-child('+l+')').css('color', color);
		}
	}
}
/*
a1
e5
ae5
2f2
axe3

Be3
Bxe4
Bba4
B4b4
Bbxe4
B3xf5
*/




