(function() {
	var board = document.querySelectorAll('.board');
	var twoPeopleDom = document.querySelector('#twoPlayer');
	var easyDom = document.querySelector('#easy');
	var resetButton = document.querySelector('#reset');
	var player = 'O';

	twoPeopleDom.addEventListener('click', twoPlayer, false);
	easyDom.addEventListener('click', easy, false);
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
					positionPlayed.push('test');
				}
			}

			// if the game is not won then second player
			if (positionPlayed.length <= 6 || !checkForWin(board, player)) {
				var randomNumber = Math.floor(Math.random() * 8);
				// check the section of the board has not already been played
				while (!(board.children[randomNumber].innerText === '')) {
					randomNumber = Math.floor(Math.random() * 8);
				}
				board.children[randomNumber].innerText = 'X';
				checkForWin(board, 'X');
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
					console.log('pass');
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
