(function() {
	var board = document.querySelectorAll('.board')[0];
	var resetButton = document.querySelector('#reset');
	var twoButton = document.querySelector('#buttonTwo');
	var easyButton = document.querySelector('#buttonEasy');
	var mediumButton = document.querySelector('#buttonMedium');
	var hardButton = document.querySelector('#buttonHard');
	var player = 'O';

	board.addEventListener('click', selectBoards, false);
	resetButton.addEventListener('click', reset, false);
	twoButton.addEventListener('click', changeBoard, false);
	easyButton.addEventListener('click', changeBoard, false);
	mediumButton.addEventListener('click', changeBoard, false);
	hardButton.addEventListener('click', changeBoard, false);

	// change level of board
	function changeBoard(e) {
		var buttonID = e.target.id;
		var title = document.querySelector('#title');

		if (buttonID === 'buttonTwo') {
			board.id = 'twoPlayer';
			title.innerText = 'Two Player';
		} else if (buttonID === 'buttonEasy') {
			board.id = 'easy';
			title.innerText = 'Easy';
		} else if (buttonID === 'buttonMedium') {
			board.id = 'medium';
			title.innerText = 'Medium';
		} else if (buttonID === 'buttonHard') {
			board.id = 'hard';
			title.innerText = 'Hard';
		}
		reset();
	}

	// check what level the board is
	function selectBoards(e) {
		if (e.target.parentNode.id === 'twoPlayer' && e.target.innerText === '') {
			twoPlayer(e);
		} else if (e.target.parentNode.id === 'easy' && e.target.innerText === '') {
			easy(e);
		} else if (
			e.target.parentNode.id === 'medium' &&
			e.target.innerText === ''
		) {
			medium(e);
		} else if (e.target.parentNode.id === 'hard' && e.target.innerText === '') {
			hard(e);
		}
	}

	// two player
	function twoPlayer(e) {
		e.target.innerText = player;

		checkForWin(e.target.parentNode, player);

		// reset player
		if (player === 'O') {
			player = 'X';
		} else {
			player = 'O';
		}
	}

	// easy
	function easy(e) {
		board = e.target.parentNode;
		e.target.innerText = player;

		// check is the board is full
		var positionPlayed = [];
		for (var i = 0; i < 8; i++) {
			if (!(board.children[i].innerText === '')) {
				positionPlayed.push(i);
			}
		}

		// if the game is not won or full, then second player
		if (!checkForWin(board, player) && playedPositions(board).length < 8) {
			var randomNumber = random(board, 8);
			board.children[randomNumber].innerText = 'X';
			checkForWin(board, 'X');
		}
	}

	// medium
	function medium(e) {
		board = e.target.parentNode;

		e.target.innerText = player;

		var played = playedPositions(board);

		// check if it is the first round
		if (played.length === 1) {
			var randomNumber = random(board, 8);
			board.children[randomNumber].innerText = 'X';
			checkForWin(board, 'X');
			// if the game is not won or full, then second player
		} else if (!checkForWin(board, player) && played.length < 8) {
			// if X can win, then win or if O is giong to win, then block
			if (!blocking(board, 'X') && !blocking(board, player)) {
				// else random
				var randomNumber = random(board, 8);
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
			}
		}
	}

	// hard
	function hard(e) {
		board = e.target.parentNode;

		e.target.innerText = player;

		var played = playedPositions(board);
		var cornerPlayed = playedCorners(board);

		// check if it is the first round
		if (played.length === 1) {
			var randomNumber = corners(board, 5);
			board.children[randomNumber].innerText = 'X';
			checkForWin(board, 'X');
			// if the game is not won or full, then second player
		} else if (!checkForWin(board, player) && played.length < 8) {
			// if X can win, then win or if O is giong to win, then block
			if (blocking(board, 'X')) {
			} else if (blocking(board, player)) {
			} else if (cornerPlayed.length < 5) {
				// else random corner
				var randomNumber = corners(board, 5);
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
			} else if (cornerPlayed.length === 5) {
				// else random
				var randomNumber = random(board, 8);
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
			}
		}
	}

	// position played
	function playedPositions(board) {
		// check is the board is full
		var played = [];
		for (var i = 0; i < 8; i++) {
			if (!(board.children[i].innerText === '')) {
				played.push(i);
			}
		}
		return played;
	}

	// corners played
	function playedCorners(board) {
		// check is the board is full
		var played = [];
		for (var i = 0; i < corner.length; i++) {
			if (!(board.children[i].innerText === '')) {
				played.push(i);
			}
		}
		return played;
	}

	// random empty corner
	function corners(board, amount) {
		var randomCorner = Math.floor(Math.random() * amount);
		var cornerNumber = corner[randomCorner];

		// check the section of the board has not already been played
		while (!(board.children[cornerNumber].innerText === '')) {
			randomCorner = Math.floor(Math.random() * amount);
			cornerNumber = corner[randomCorner];
		}
		return cornerNumber;
	}

	// returns a random number that is empty on the board
	function random(board, amount) {
		var randomNumber = Math.floor(Math.random() * amount);

		// check the section of the board has not already been played
		while (!(board.children[randomNumber].innerText === '')) {
			randomNumber = Math.floor(Math.random() * amount);
		}
		return randomNumber;
	}

	// block
	function blocking(board, play) {
		var Oarray = [];
		var value = false;

		for (var i = 0; i < 8; i++) {
			if (board.children[i].innerText === play) {
				Oarray.push(i);
			}
		}
		// Check where to block
		for (var i = 0; i < data.length; i++) {
			var pass = [];
			var fail = [];
			for (var j = 0; j < data[i].position.length; j++) {
				if (Oarray.indexOf(data[i].position[j]) > -1) {
					pass.push(data[i].position[j]);
				} else {
					fail.push(data[i].position[j]);
				}
			}
			// block
			if (pass.length === 2 && fail.length === 1) {
				if (board.children[fail[0]].innerText === '') {
					board.children[fail[0]].innerText = 'X';
					checkForWin(board, 'X');
					value = true;

					// break loop
					break;
				}
			}
		}
		return value;
	}

	// checks board for wins
	function checkForWin(board, play) {
		// loops through the different ways to win
		for (var i = 0; i < data.length; i++) {
			// array to check how may pass
			var pass = [];
			// loops tho the different positions in the different ways to win
			for (var j = 0; j < 3; j++) {
				var position = data[i].position[j];
				if (board.children[position].innerText === play) {
					// adds items to the pass array
					pass.push(position);
				}
				// if the array has a length of 3 equals win
				if (pass.length === 3) {
					console.log(play + ' Won!!');
					return true;
				}
			}
		}
	}

	// reset/clear board
	function reset() {
		for (var i = 0; i < board.children.length; i++) {
			board.children[i].innerText = '';
		}
	}
})();
