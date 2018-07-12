(function() {
	var board = document.querySelector('.board');
	var resetButton = document.querySelector('#reset');
	var player = 'O';

	board.addEventListener('click', twoPlayer, false);
	resetButton.addEventListener('click', reset, false);

	function twoPlayer(e) {
		// check the position
		if (e.target.innerText === '') {
			e.target.innerText = player;

			// reset player
			if (player === 'O') {
				player = 'X';
			} else {
				player = 'O';
			}
		}
	}

	// reset/clear board
	function reset(e) {
		for (var i = 0; i < board.children.length; i++) {
			board.children[i].innerText = '';
		}
	}
})();
