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
		if (e.target.parentNode.id === 'twoPlayer') {
			// check the position
			if (e.target.innerText === '') {
				e.target.innerText = player;

				checkForWin(board, player);

				// reset player
				if (player === 'O') {
					player = 'X';
				} else {
					player = 'O';
				}
			}

			// checkForWin();
		}
	}

	// easy
	function easy(e) {
		var board = e.target.parentNode;
		if (board.id === 'easy') {
			// check the position
			if (e.target.innerText === '') {
				e.target.innerText = player;

				if (!checkForWin(board, player)) {
					var randomNumber = Math.floor(Math.random() * 8);
					while (board.children[randomNumber].innerText === player) {
						randomNumber = Math.floor(Math.random() * 8);
					}
					board.children[randomNumber].innerText = 'X';
				}
			}
		}
	}

	function checkForWin(board, player) {
		// console.log('pass');
		for (var i = 0; i < data.length; i++) {
			var pass = [];
			for (var j = 0; j < 3; j++) {
				var position = data[i].position[j];
				if (board.children[position].innerText === player) {
					pass.push(position);
				}
				if (pass.length === 3) {
					console.log('pass');
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
