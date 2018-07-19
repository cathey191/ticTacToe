(function() {
	var board = document.querySelectorAll('.board');
	var twoPeopleDom = document.querySelector('#twoPlayer');
	var easyDom = document.querySelector('#easy');
	var mediumDom = document.querySelector('#medium');
	var hardDom = document.querySelector('#hard');
	var resetButton = document.querySelector('#reset');
	var player = 'O';

	// twoPeopleDom.addEventListener('click', twoPlayer, false);
	// easyDom.addEventListener('click', easy, false);
	mediumDom.addEventListener('click', medium, false);
	// hardDom.addEventListener('click', hard, false);
	resetButton.addEventListener('click', reset, false);

	// two player
	function twoPlayer(e) {
		// check the board and position
		if (e.target.parentNode.id === 'twoPlayer' && e.target.innerText === '') {
			e.target.innerText = player;

			checkForWin(board, player);

			// reset player
			if (player === 'O') {
				player = 'X';
			} else {
				player = 'O';
			}
		}
	}

	// easy
	function easy(e) {
		var board = e.target.parentNode;
		// check the board and position
		if (board.id === 'easy' && e.target.innerText === '') {
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
				var randomNumber = random(board);
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
			}
		}
	}

	// medium
	function medium(e) {
		var board = e.target.parentNode;

		// check the board and position
		if (board.id === 'medium' && e.target.innerText === '') {
			e.target.innerText = player;

			var played = playedPositions(board);

			// check if it is the first round
			if (played.length === 1) {
				var randomNumber = random(board);
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
				// if the game is not won or full, then second player
			} else if (!checkForWin(board, player) && played.length < 8) {
				// if X can win, then win or if O is giong to win, then block
				if (!blocking(board, 'X') && !blocking(board, player)) {
					// else random
					var randomNumber = random(board);
					board.children[randomNumber].innerText = 'X';
					checkForWin(board, 'X');
				}
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

	// random position
	function random(board) {
		var randomNumber = Math.floor(Math.random() * 8);
		// check the section of the board has not already been played
		while (!(board.children[randomNumber].innerText === '')) {
			randomNumber = Math.floor(Math.random() * 8);
		}
		return randomNumber;
	}

	// block
	function blocking(board, player) {
		var Oarray = [];

		for (var i = 0; i < 8; i++) {
			if (board.children[i].innerText === player) {
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
					return true;
					break;
				}
			}
		}
	}

	// checks board for wins
	function checkForWin(board, player) {
		// loops through the different ways to win
		for (var i = 0; i < data.length; i++) {
			// array to check how may pass
			var pass = [];
			// loops tho the different positions in the different ways to win
			for (var j = 0; j < 3; j++) {
				var position = data[i].position[j];
				if (board.children[position].innerText === player) {
					// adds items to the pass array
					pass.push(position);
				}
				// if the array has a length of 3 equals win
				if (pass.length === 3) {
					console.log(player + ' Won!!');
					return true;
				}
			}
		}
	}

	// reset/clear board
	function reset(e) {
		for (var i = 0; i < board.length; i++) {
			for (var j = 0; j < board[i].children.length; j++) {
				board[i].children[j].innerText = '';
			}
		}
	}
})();
