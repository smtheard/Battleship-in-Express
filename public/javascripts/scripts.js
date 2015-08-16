GameBoard = function() {
	this.board = (function() {
		var board = new Array(10);
       for(var i = 0; i < 10; i++){
       	board[i] = new Array(10);
       	for(var j = 0; j <10; j++){
       		board[i][j] = 'empty';
       	}
      }
      return board;
   })(),

	this.at = function(x, y) {
		return this.board[x][y];
	},

	this.set = function(x, y, str) {
		this.board[x][y] = str;
	},

	this.isGameOver = function() {
		var hitCount = 0;
		for(var i = 0; i < 10; i++){
			for(var j = 0; j < 10; j++){
				if(this.board[i][j] === 'hit')
					hitCount++;
			}
		}
		return (hitCount >= 5);
	}
};

Player = function(id, socket) {
	this.id = id,
	this.shipCount = 0,
	this.socket = socket,
	this.friendlyBoard = new GameBoard(),
	this.enemyBoard = new GameBoard(),

	this.attack = function(x, y) {
		if(this.enemyBoard.at(x, y) === 'ship'){
			this.enemyBoard.set(x, y, 'hit');
			return true;
		}
		else {
			this.enemyBoard.set(x, y, 'miss');
			return false;
		}
	},
	
	this.placeShip = function(x, y) {
		if(this.friendlyBoard.at(x, y) === 'empty' && this.shipCount < 5){
			this.friendlyBoard.set(x, y, 'ship');
			this.shipCount++;
			return true;
		}
		else 
			return false;
	}
};

Game = function(player1, player2, gameID) {
	this.id = gameID,
	this.player1 = player1,
	this.player2 = player2,
	this.turn = 1,

	this.changeTurn = function() {
		if(this.turn === 1)
			this.turn = 2;
		else
			this.turn = 1;
	},

	this.makeNextMove = function(x, y) {
		var theTurn = this.turn;
		this.changeTurn();
		if(theTurn === 1)
			return this.player1.attack(x, y);
		else
			return this.player2.attack(x, y);
		
	},

	this.playersAreReady = function() {
		return (this.player1.shipCount === 5) && (this.player2.shipCount === 5)
	},

	this.initiateEnemyBoards = function() {
		this.player2.enemyBoard = this.player1.friendlyBoard;
		this.player1.enemyBoard = this.player2.friendlyBoard;
	},

	this.isGameOver = function() {
		return (this.player1.enemyBoard.isGameOver() || this.player2.enemyBoard.isGameOver());
	}
};

exports.GameBoard = GameBoard;
exports.Player = Player;
exports.Game = Game;