$(document).ready(function () {

})

var you = 1;
var turn = true;
var rank = ['a','b','c','d','e','f','g','h'];
var multipleMsg = 'There are multiple pieces that can make that move';

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
	for (var i = 0; i < 8; i++) {
		var j = i+1;
		//to select the right position in a table
		var row1 = 'table tr:nth-child('+1+') td:nth-child('+j+')';
		var row2 = 'table tr:nth-child('+2+') td:nth-child('+j+')';
		var for7 = 'table tr:nth-child('+7+') td:nth-child('+j+')';
		var row8 = 'table tr:nth-child('+8+') td:nth-child('+j+')';
		$(row2).html(pawn);
		$(for7).html(pawn);
		// if player clicks white, color and arrange the pieces accordingly
		if (color == 'white') {
			$(row1).html(backRow[i]);
			$(row8).html(backRow[i]);
			$(row1).css('color', '#000000');
			$(row2).css('color', '#000000');
			$(for7).css('color', '#ffffff');
			$(row8).css('color', '#ffffff');
			turn = true;
		} else {
			$(row1).html(backRow[7-i]);
			$(row8).html(backRow[7-i]);
			$(row1).css('color', '#ffffff');
			$(row2).css('color', '#ffffff');
			$(for7).css('color', '#000000');
			$(row8).css('color', '#000000');
			turn = false;
		};
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

	// change orientation of board
	if (turn) {
		white = 1;
	} else {
		white = -1;
	};
	console.log(white)
	console.log(turn);

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
function pawnMove(move) {
	var x = move[0];
	x = rank.indexOf(x)+1;
	var y = Number(move[1]);
	var from = get(x, y+white);
	var to = get(x, y);
	if (from === 'p' && to === '') {
		mov(x,y+white,x,y);
		finished();
	} else if (get(x, y+2*white) === 'p' && from === '' && to === '') {
		if (turn) { //TODO - Make turn 7/2 to shorten all this code
			if (y+2*white == 7) {
				mov(x,y+2*white,x,y);
				finished();
			} else {
				alert(moveMsg);
			};
		} else {
			if (y+2*white == 2) {
				mov(x,y+2*white,x,y);
				finished();
			} else {
				alert(moveMsg);
			}
		};
	} else {
		alert(moveMsg);
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
	var color = '';
	var positions = [];
	if (white == 1) {
		color = 'rgb(255, 255, 255)';
	} else {
		color = 'rgb(0, 0, 0)';
	}
	// check all possible starting locations
	if (get(x-1,y-2) == 'N' && get(x-1,y-2, 'c') == color) {
		positions.push([x-1,y-2]);			
	};
	if (get(x+1,y-2) == 'N' && get(x+1,y-2, 'c') == color) {
		positions.push([x+1,y-2]);	
	};
	if (get(x-1,y+2) == 'N' && get(x-1,y+2, 'c') == color) {
		positions.push([x-1,y+2]);	
	};
	if (get(x+1,y+2) == 'N' && get(x+1,y+2, 'c') == color) {
		positions.push([x+1,y+2]);	
	};
	if (get(x-2,y-1) == 'N' && get(x-2,y-1, 'c') == color) {
		positions.push([x-2,y-1]);	
	};
	if (get(x+2,y-1) == 'N' && get(x+2,y-1, 'c') == color) {
		positions.push([x+2,y-1]);	
	};
	if (get(x-1,y+1) == 'N' && get(x-1,y+1, 'c') == color) {
		positions.push([x-1,y+1]);	
	};
	if (get(x+1,y+1) == 'N' && get(x+1,y+1, 'c') == color) {
		positions.push([x+1,y+1]);	
	};
	console.log(positions);
	if (positions.length > 1) {
		alert(multipleMsg);
	} else {
		mov(positions[0][0],positions[0][1],x,y);
		finished();
	}
};

// get the letter or color of the piece on given square
function get(x, y, c) {
	if (c == 'c') {
		var yy = $('table tr:nth-child('+y+') td:nth-child('+x+')').css('color');
		console.log(yy);
		return yy;
	} else {
		console.log(x,y)
		var xx = $('table tr:nth-child('+y+') td:nth-child('+x+')').html();
		console.log(xx);
		return xx;
	};
}
function mov(x, y, i, j) {
	var piece = $('table tr:nth-child('+y+') td:nth-child('+x+')').html();
	var color = $('table tr:nth-child('+y+') td:nth-child('+x+')').css('color');
	console.log(piece,color);
	console.log(x,y,i,j);
	$('table tr:nth-child('+j+') td:nth-child('+i+')').css('color', color);
	$('table tr:nth-child('+j+') td:nth-child('+i+')').html(piece);
	$('table tr:nth-child('+y+') td:nth-child('+x+')').empty();
}

function finished() {
	$('#input').val('');
	turn = !turn;
	if ($("#whatColor").html() == "white's") {
		$("#whatColor").html("black's");
	} else{
		$("#whatColor").html("white's");
	};
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




