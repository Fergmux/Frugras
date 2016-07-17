$(document).ready(function () {
	$('#second').hide();
	$("#input").keyup(function(event){
	    if(event.keyCode == 13){
	        $("#submit").click();
	    }
	});
	$('#input').focus();
});

var you = 1;
var turn = true;
var rank = ['h','g','f','e','d','c','b','a'];
// var rank = ['a','b','c','d','e','f','g','h'];
var multipleMsg = 'There are multiple pieces that can make that (mov)e';
var no(Mov)eMsg = "None of your pieces can make that (mov)e";
var white = -1;
var whiteTurn = true;
var yourColor = 'rgb(255, 255, 255)';
var theirColor = 'rgb(0, 0, 0)';

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
 
		// chose which board to display
		if (color == 'white') {
			$('#first').hide();	
			$('#second').show();
		} else {
			$('#first').show();
			$('#second').hide();
		};
		flipBoard();
		$('#input').focus();

	};
}

// check (mov)es are valid
function checkSubmit() {
	var (mov)e = $('#input').val().split('');
	var length = (mov)e.length;
	var validMsg = 'That (mov)e is not in valid format';
	var validArray = ['a','b','c','d','e','f','g','h','1','2','3','4','5','6','7','8','R','N','B','Q','K','x'];
	var one = (mov)e[0];
	var two = (mov)e[1];
	console.log((mov)e)
	
	// check (mov)e is of correct length
	if (length < 2 || length > 5) {
		alert(validMsg + '2');
		return;
	};

	// check all characters are valid
	for (var x = 0; x < (mov)e.length; x++) {
		if ($.inArray((mov)e[x], validArray) < 0) {
			alert(validMsg + '3');
			return;
		}
	};

	// check the target square is valid
	if (!/[a-h]/.test((mov)e[length-2]) || !/[1-8]/.test(move[length-1])) {
		alert(validMsg + '4');
		return;
	};
	
	var pieceCheck = /[RNBKQ]/.test(one);
	console.log(length)
	switch (length) {
		case 2:
			pawnMove(move);
			break;
		case 3:
			if (pieceCheck) {
				pieceMove(move, 0);
			} else {
				alert(validMsg + '5');
			};
			break;
		case 4:
			if (numOrLet(one) && 'x' === two) {
				pawnTake(move);
			} else if (pieceCheck && 'x' === two) {
				pieceTake(move, 0);
			} else if (pieceCheck && (numOrLet(two))) {
				pieceMove(move, 1);
			} else {
				alert(validMsg + '6');
			};
			break;
		case 5:
			if (pieceCheck && numOrLet(two) && 'x' === move[2]) {
				pieceTake(move, 1)
			} else {
				alert(validMsg + '7');
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
	var from = get(x, y+white)[0];
	var to = get(x, y)[0];
	console.log(x,y,from,to);
	// checks a pawn can move one place to the position
	if (from === 'p' && to === '') {
		mov(x,y+white,x,y);
		finished();
	// check a pawn can move two places to the positiion
	} else if (get(x, y+2*white)[0] === 'p' && from === '' && to === '') {
		// make sure piece is on the starting rank, for double move
		if (turn) {
			var r;
			if (whiteTurn) {
				r = 2;
			} else {
				r = 7;
			}
			if (y+2*white == r) {
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

function pawnTake(move) {
	var x = move[2];
	x = rank.indexOf(x)+1;
	var y = Number(move[3]);
	var z = rank.indexOf(move[0])+1;;
	var to = get(x, y);
	var from = get(z, y+white);
	// checks a pawn can move one place to the position
	if (to[0] != '' && to[1] == theirColor && from[0] == 'p' && from[1] == yourColor && Math.abs(z-x) == 1) {
		mov(x-1, y+white, x, y);
		finished();
	} else {
		alert(moveMsg);
	};
};

function pieceMove(move, ambig) {
	switch (move[0]) {
		case 'R':
			rookMove(move, ambig, 0);
			break;
		case 'N':
			knightMove(move, ambig, 0);
			break;
		case 'B':
			bishopMove(move, ambig, 0);
			break;
		case 'Q':
			queenMove(move, 0);
			break;
		case 'K':
			kingMove(move, 0);
			break;
	}
};

function pieceTake(move, ambig) {
	switch (move[0]) {
		case 'R':
			rookMove(move, ambig, 1);
			break;
		case 'N':
			knightMove(move, ambig, 1);
			break;
		case 'B':
			bishopMove(move, ambig, 1);
			break;
		case 'Q':
			queenMove(move, 1);
			break;
		case 'K':
			kingMove(move, 1);
			break;
	}
};

function queenMove(move, take) {
	var x = move[1+take];
	x = rank.indexOf(x)+1;
	var y = Number(move[2+take]);
	var to = get(x,y);
	var pieces = [];
	var pieces2 = [];
	var comp;
	if (take) {
		comp = (to[0] != '' && to[1] == theirColor);
	} else {
		comp = to[0] == '';
	}
	if (comp) {
		for (var i = 8; i > 0; i--) {
			var a = get(x,y+i);
			if (a[0] != '') {
				pieces[0]= a;
			}
			a = get(x,y-i);
			if (a[0] != '') {
				pieces[1]= a;
			}
			a = get(x+i,y);
			if (a[0] != '') {
				pieces[2]= a;
			}
			a = get(x-i,y);
			if (a[0] != '') {
				pieces[3]= a;
			}
			a = get(x+i,y+i);
			if (a[0] != '') {
				pieces[4]= a;
			}
			a = get(x+i,y-i);
			if (a[0] != '') {
				pieces[5]= a;
			}
			a = get(x-i,y+i);
			if (a[0] != '') {
				pieces[6]= a;
			}
			a = get(x-i,y-i);
			if (a[0] != '') {
				pieces[7]= a;
			}
		};
		checkMoves(pieces, 'Q', x, y);
	} else {
		alert(noMoveMsg);
	};
};

function bishopMove(move, ambig, take) {
	var x = move[1+ambig+take];
	x = rank.indexOf(x)+1;
	var y = Number(move[2+ambig+take]);
	console.log(x, y);
	var to = get(x,y);
	var pieces = [];
	var pieces2 = [];
	var comp;
	if (take) {
		comp = (to[0] != '' && to[1] == theirColor);
	} else {
		comp = to[0] == '';
	}
	if (comp) {
		for (var i = 8; i > 0; i--) {
			var a = get(x+i,y+i);
			if (a[0] != '') {
				pieces[0]= a;
			}
			a = get(x+i,y-i);
			if (a[0] != '') {
				pieces[1]= a;
			}
			a = get(x-i,y+i);
			if (a[0] != '') {
				pieces[2]= a;
			}
			a = get(x-i,y-i);
			if (a[0] != '') {
				pieces[3]= a;
			}
		};
		checkMoves(pieces, 'B', x, y);
	} else {
		alert(noMoveMsg);
	};
};

function rookMove(move, ambig, take) {
	var x = move[1+ambig+take];
	x = rank.indexOf(x)+1;
	var y = Number(move[2+ambig+take]);
	var to = get(x,y);
	var pieces = [];
	var pieces2 = [];
	var comp;
	if (take) {
		comp = (to[0] != '' && to[1] == theirColor);
	} else {
		comp = to[0] == '';
	}
	if (comp) {
		for (var i = 8; i > 0; i--) {
			var a = get(x,y+i);
			if (a[0] != '') {
				pieces[0]= a;
			}
			a = get(x,y-i);
			if (a[0] != '') {
				pieces[1]= a;
			}
			a = get(x+i,y);
			if (a[0] != '') {
				pieces[2]= a;
			}
			a = get(x-i,y);
			if (a[0] != '') {
				pieces[3]= a;
			}
		};
		if (ambig) {
			checkMoves(pieces, 'R', x, y, move[1]);
		} else {
			checkMoves(pieces, 'R', x, y);
		}
		
	} else {
		alert(noMoveMsg);
	};
};


function knightMove(move, ambig, take) {
	console.log(yourColor);
	var x = move[1+ambig+take];
	x = rank.indexOf(x)+1;
	var y = Number(move[2+ambig+take]);
	var to = get(x,y);
	var pieces = [];
	console.log(x,y)
	var comp;
	if (take) {
		comp = (to[0] != '' && to[1] == theirColor);
	} else {
		comp = to[0] == '';
	}
	if (comp) {
		// check all possible starting locations
		if (get(x-1,y-2)[0] == 'N' && get(x-1,y-2)[1] == yourColor) {
			pieces.push(get(x-1,y-2));			
		};
		if (get(x+1,y-2)[0] == 'N' && get(x+1,y-2)[1] == yourColor) {
			pieces.push(get(x+1,y-2));	
		};
		if (get(x-1,y+2)[0] == 'N' && get(x-1,y+2)[1] == yourColor) {
			pieces.push(get(x-1,y+2));	
		};
		if (get(x+1,y+2)[0] == 'N' && get(x+1,y+2)[1] == yourColor) {
			pieces.push(get(x+1,y+2));	
		};
		if (get(x-2,y-1)[0] == 'N' && get(x-2,y-1)[1] == yourColor) {
			pieces.push(get(x-2,y-1));	
		};
		if (get(x+2,y-1)[0] == 'N' && get(x+2,y-1)[1] == yourColor) {
			pieces.push(get(x+2,y-1));	
		};
		if (get(x-2,y+1)[0] == 'N' && get(x-2,y+1)[1] == yourColor) {
			pieces.push(get(x-2,y+1));	
		};
		if (get(x+2,y+1)[0] == 'N' && get(x+2,y+1)[1] == yourColor) {
			pieces.push(get(x+2,y+1));	
		};
	} else {
		alert(noMoveMsg);
	}
	console.log(pieces);
	// if multiple/no pieces can make the move then alert, otherwise make the move
	if (ambig) {
		checkMoves(pieces, 'N', x, y, move[1]);
	} else {
		checkMoves(pieces, 'N', x, y);
	}

};

function kingMove(move, take) {
	console.log(yourColor);
	var x = move[1+take];
	x = rank.indexOf(x)+1;
	var y = Number(move[2+take]);
	var to = get(x,y);
	var pieces = [];
	console.log(x,y)
	var comp;
	if (take) {
		comp = (to[0] != '' && to[1] == theirColor);
	} else {
		comp = to[0] == '';
	}
	if (comp) {
		// check all possible starting locations
		if (get(x,y+1)[0] == 'K' && get(x,y+1)[1] == yourColor) {
			pieces.push(get(x,y+1));			
		};
		if (get(x+1,y+1)[0] == 'K' && get(x+1,y+1)[1] == yourColor) {
			pieces.push(get(x+1,y+1));	
		};
		if (get(x+1,y)[0] == 'K' && get(x+1,y)[1] == yourColor) {
			pieces.push(get(x+1,y));	
		};
		if (get(x+1,y-1)[0] == 'K' && get(x+1,y-1)[1] == yourColor) {
			pieces.push(get(x+1,y-1));	
		};
		if (get(x,y-1)[0] == 'K' && get(x,y-1)[1] == yourColor) {
			pieces.push(get(x,y-1));
		};
		if (get(x-1,y-1)[0] == 'K' && get(x-1,y-1)[1] == yourColor) {
			pieces.push(get(x-1,y-1));	
		};
		if (get(x-1,y)[0] == 'K' && get(x-1,y)[1] == yourColor) {
			pieces.push(get(x-1,y));	
		};
		if (get(x-1,y+1)[0] == 'K' && get(x-1,y+1)[1] == yourColor) {
			pieces.push(get(x-1,y+1));	
		};
	} else {
		alert(noMoveMsg);
	};
	console.log(pieces);
	// if multiple/no pieces can make the move then alert, otherwise make the move
	checkMoves(pieces, 'K', x, y);
};

function checkMoves(pieces, piece, x, y, select) {
	var pieces2 = [];
	for (var i = 0; i < pieces.length; i++) {
		if (pieces[i][0] == piece && pieces[i][1] == yourColor) {
			pieces2.push(pieces[i]);
		}
	}
	console.log(pieces2)
	if (pieces2.length == 1) {
		mov(pieces2[0][2],pieces2[0][3],x,y);
		finished();
	} else if (pieces2.length > 1) {
		if (select != undefined) {
			console.log(select, rank[pieces2[0][2]-1])
			if (/[a-h]/.test(select)) {
				if (select === rank[pieces2[0][2]-1] && select === rank[pieces2[1][2]-1]) {
					alert("That move could refer to multiple pieces")
				} else if (select === rank[pieces2[0][2]-1] && select != rank[pieces2[1][2]-1]) {
					mov(pieces2[0][2],pieces2[0][3],x,y);
					finished();
				} else if (select != rank[pieces2[0][2]-1] && select === rank[pieces2[1][2]-1]) {
					mov(pieces2[1][2],pieces2[1][3],x,y);
					finished();
				} else {
					alert(noMoveMsg);
				}
			} else {
				if (select == pieces2[0][2] && select == pieces2[1][2]) {
					alert("That move could refer to multiple pieces")
				} else if (select == pieces2[0][3] && select != pieces2[1][3]) {
					mov(pieces2[0][2],pieces2[0][3],x,y);
					finished();
				} else if (select != pieces2[0][3] && select == pieces2[1][3]) {
					mov(pieces2[1][2],pieces2[1][3],x,y);
					finished();
				} else {
					alert(noMoveMsg);
				}
			}
		} else {
			alert(multipleMsg);	
		}
	} else {
		alert(noMoveMsg);
	};
}

// get the letter or color of the piece on given square
function get(x, y) {
		var q = [$('table tr:nth-child('+y+') td:nth-child('+x+')').html(), $('table tr:nth-child('+y+') td:nth-child('+x+')').css('color'), x, y];
		console.log(q);
		return q;
};

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
	checkCheck(x,y,i,j);
};

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
	};
};

function flip() {
	$('#first').toggle();
	$('#second').toggle();
};

function clearInput() {
	$('#input').val('');
};

function flipBoard() {
	for (var i = 1; i <= 8; i++) {
		for (var j = 1; j <= 8; j++) {
			var piece = $('table.board1 tr:nth-child('+j+') td:nth-child('+i+')').html();
			var color = $('table.board1 tr:nth-child('+j+') td:nth-child('+i+')').css('color');
			var k = 9-j;
			var l = 9-i;
			$('table.board2 tr:nth-child('+k+') td:nth-child('+l+')').html(piece);
			$('table.board2 tr:nth-child('+k+') td:nth-child('+l+')').css('color', color);
		};
	};
};
// /*
function checkCheck(x,y,i,j) {
	var pieces = [];
	var pieces2 = [];
	for (var x = 0; x < 8; i++) {
		for (var y = 0; y < 8; y++) {
			var piece = get(x,y);
			if (piece[0] == 'K') {
				if (get(x-1,y-2)[0] == 'N') {
					pieces.push(get(x-1,y-2));
				};
				if (get(x+1,y-2)[0] == 'N') {
					pieces.push(get(x+1,y-2));
				};
				if (get(x-1,y+2)[0] == 'N') {
					pieces.push(get(x-1,y+2));
				};
				if (get(x+1,y+2)[0] == 'N') {
					pieces.push(get(x+1,y+2));
				};
				if (get(x-2,y-1)[0] == 'N') {
					pieces.push(get(x-2,y-1));
				};
				if (get(x+2,y-1)[0] == 'N') {
					pieces.push(get(x+2,y-1));
				};
				if (get(x-2,y+1)[0] == 'N') {
					pieces.push(get(x-2,y+1));
				};
				if (get(x+2,y+1)[0] == 'N') {
					pieces.push(get(x+2,y+1));
				};
				if (piece[1] == yourColor) {

				};
			};
			for (var i = 8; i > 0; i--) {
				var a = get(x,y+i);
				if (a[0] == 'Q' || a[0] == 'R') {
					pieces2[0]= a;
				}
				a = get(x,y-i);
				if (a[0] == 'Q' || a[0] == 'R') {
					pieces2[1]= a;
				}
				a = get(x+i,y);
				if (a[0] == 'Q' || a[0] == 'R') {
					pieces2[2]= a;
				}
				a = get(x-i,y);
				if (a[0] == 'Q' || a[0] == 'R') {
					pieces2[3]= a;
				}
				a = get(x+i,y+i);
				if (a[0] == 'Q' || a[0] == 'B') {
					pieces2[4]= a;
				}
				a = get(x+i,y-i);
				if (a[0] == 'Q' || a[0] == 'B') {
					pieces2[5]= a;
				}
				a = get(x-i,y+i);
				if (a[0] == 'Q' || a[0] == 'B') {
					pieces2[6]= a;
				}
				a = get(x-i,y-i);
				if (a[0] == 'Q' || a[0] == 'B') {
					pieces2[7]= a;
				}
			};
			if (get(x-i,y+white)[0] == 'p') {
				pieces.push(get(x-i,y+white));
			};
			if (get(x+i,y+white)[0] == 'p') {
				pieces.push(get(x+i,y+white));
			};
			if (get(x,y+1)[0] == 'K') {
				pieces.push(get(x,y+1));			
			};
			if (get(x+1,y+1)[0] == 'K') {
				pieces.push(get(x+1,y+1));	
			};
			if (get(x+1,y)[0] == 'K') {
				pieces.push(get(x+1,y));	
			};
			if (get(x+1,y-1)[0] == 'K') {
				pieces.push(get(x+1,y-1));	
			};
			if (get(x,y-1)[0] == 'K') {
				pieces.push(get(x,y-1));
			};
			if (get(x-1,y-1)[0] == 'K') {
				pieces.push(get(x-1,y-1));	
			};
			if (get(x-1,y)[0] == 'K') {
				pieces.push(get(x-1,y));	
			};
			if (get(x-1,y+1)[0] == 'K') {
				pieces.push(get(x-1,y+1));	
			};
			pieces = pieces.concat(pieces2);
			pieces2 = [];
			var thisColor;
			var thisAlert;
			if (piece[1] == yourColor) {
				thisColor = theirColor;
				thisAlert = 'That move will put you in check';
			} else {
				thisColor = yourColor;
				thisAlert = 'Check!';
			}
			for (var i = 0; i < pieces.length; i++) {
				if (pieces[i] != undefined && pieces[i][1] == thisColor) {
					alert(thisAlert);
					if(thisColor = yourColor) {
						// (mov)(i,j,x,y);
					}
					break;
				}
			}
		};
	};
};
// */



