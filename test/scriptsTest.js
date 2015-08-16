var scripts = require('../public/javascripts/scripts.js');

exports.testCanary = function(test) {
  test.ok(true);
  test.done();
};

exports.initialGameBoardIsAllEmpty = function(test) {
	var gameBoard = new GameBoard;
	test.equal('empty', gameBoard.at(0, 0));
	test.done();
};

exports.playerCanPlaceShipAtLocation = function(test) {
	var player = new Player(1);
	player.placeShip(0, 0);
	test.equal('ship', player.friendlyBoard.at(0, 0));
	test.done();
};

exports.playerCanAttackLocationOnGameBoard = function(test) {
	var player = new Player(1);
	player.attack(0, 0);
	test.equal('miss', player.enemyBoard.at(0, 0));
	test.done();
};

exports.playerAttackReturnsTrueIfHit = function(test) {
	var player = new Player();
	player.enemyBoard.set(0, 0, 'ship');
	test.equal(true, player.attack(0, 0));
	test.done();
};

exports.playerAttackReturnsFalseIfMiss = function(test) {
	var player = new Player();
	test.equal(false, player.attack(0, 0));
	test.done();
};

exports.enemyBoardIsHitIfShipWasThereBeforeAttack = function(test) {
	var player = new Player(1);
	player.enemyBoard.set(5, 5, 'ship');
	player.attack(5, 5);
	test.equal('hit', player.enemyBoard.at(5, 5));
	test.done();
};

exports.enemyBoardIsMissIfMissedBeforeAttack = function(test) {
	var player = new Player(1);
	player.attack(2, 2);
	player.attack(2, 2);
	test.equal('miss', player.enemyBoard.at(2, 2));
	test.done();
};

exports.playerHasId = function(test) {
	var player1 = new Player(1);
	test.equal(1, player1.id);
	test.done();
};

exports.playerShipCountReturnsNumberOfShipsOnFriendlyBoard = function(test) {
	var player = new Player();
	player.placeShip(5, 5);
	player.placeShip(5, 4);
	test.equal(2, player.shipCount);
	test.done();
};

exports.playerCannotPlaceShipTwiceInOnePlace = function(test) {
	var player = new Player();
	player.placeShip(5, 5);
	player.placeShip(5, 5);
	test.equal(1, player.shipCount);
	test.done();
};

exports.playerCanOnlyPlace5Ships = function(test) {
	var player = new Player();
	player.placeShip(0, 1);
	player.placeShip(0, 2);
	player.placeShip(0, 3);
	player.placeShip(0, 4);
	player.placeShip(0, 5);
	player.placeShip(0, 6);

	test.equal(5, player.shipCount);
	test.done();
};

exports.gameContainsTwoPlayers = function(test) {
	var game = new Game(new Player(1), new Player(2));
	test.equal(1, game.player1.id);
	test.equal(2, game.player2.id);
	test.done();
};

exports.gameKnowsWhosTurnItIs = function(test) {
	var game = new Game(new Player(), new Player());
	test.equal(1, game.turn);
	test.done();
};

exports.gameCanSwitchTurnFrom1to2 = function(test) {
	var game = new Game(new Player(), new Player());
	game.changeTurn();
	test.equal(2, game.turn);
	test.done();
};

exports.gameCanSwitchTurnFrom2to1 = function(test) {
	var game = new Game(new Player(), new Player());
	game.changeTurn();
	game.changeTurn();
	test.equal(1, game.turn);
	test.done();
};

exports.gameMakesNextMoveForPlayer1 = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.makeNextMove(5, 5);
	test.equal('miss', game.player1.enemyBoard.at(5, 5));
	test.done();
};

exports.gameMakesNextMoveForPlayer2 = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.changeTurn();
	game.makeNextMove(5, 5);
	test.equal('miss', game.player2.enemyBoard.at(5, 5));
	test.done();
};

exports.gameMakeNextMoveChangesTurnTo2 = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.makeNextMove(5, 5);
	test.equal(2, game.turn);
	test.done();
};

exports.gameMakeNextMoveChangesTurnTo1From2 = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.makeNextMove(5, 5);
	game.makeNextMove(5, 5);
	test.equal(1, game.turn);
	test.done();
};

exports.gamePlayerReadyReturnsTrueIfBothPlayersHave5Ships = function(test) {
	var player1 = new Player(1);
	var player2 = new Player(2);

	player1.placeShip(0, 1);
	player1.placeShip(0, 2);
	player1.placeShip(0, 3);
	player1.placeShip(0, 4);
	player1.placeShip(0, 5);

	player2.placeShip(0, 1);
	player2.placeShip(0, 2);
	player2.placeShip(0, 3);
	player2.placeShip(0, 4);
	player2.placeShip(0, 5);

	var game = new Game(player1, player2);

	test.equal(true, game.playersAreReady());
	test.done();
};

exports.gamePlayerReadyReturnsFalseIfPlayer1DoesNotHave5Ships = function(test) {
	var player1 = new Player(1);
	var player2 = new Player(2);

	player1.placeShip(0, 4);
	player1.placeShip(0, 5);

	player2.placeShip(0, 1);
	player2.placeShip(0, 2);
	player2.placeShip(0, 3);
	player2.placeShip(0, 4);
	player2.placeShip(0, 5);

	var game = new Game(player1, player2);

	test.equal(false, game.playersAreReady());
	test.done();
};

exports.gamePlayerReadyReturnsFalseIfPlayer2DoesNotHave5Ships = function(test) {
	var player1 = new Player(1);
	var player2 = new Player(2);

	player1.placeShip(0, 1);
	player1.placeShip(0, 2);
	player1.placeShip(0, 3);
	player1.placeShip(0, 4);
	player1.placeShip(0, 5);

	player2.placeShip(0, 1);
	player2.placeShip(0, 2);

	var game = new Game(player1, player2);

	test.equal(false, game.playersAreReady());
	test.done();
};

exports.gameInitiateEnemyBoardsMakesPlayer1FriendlyBoardEqualToPlayer2EnemyBoard = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.initiateEnemyBoards();
	test.equal(game.player1.friendlyBoard, game.player2.enemyBoard);
	test.done();
};

exports.gameInitiateEnemyBoardsMakesPlayer2FriendlyBoardEqualToPlayer1EnemyBoard = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.initiateEnemyBoards();
	test.equal(game.player2.friendlyBoard, game.player1.enemyBoard);
	test.done();
};

exports.gameMakeNextMoveReturnsTrueIfHit = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.player2.placeShip(0, 0);
	game.initiateEnemyBoards();
	test.equal(true, game.makeNextMove(0, 0));
	test.done();
};

exports.gameMakeNextMoveReturnsFalseIfMiss = function(test) {
	var game = new Game(new Player(1), new Player(2));
	game.initiateEnemyBoards();
	test.equal(false, game.makeNextMove(0, 0));
	test.done();
};

exports.gameIsGameOverReturnsTrueIf5ShipsHaveBeenHitByPlayer1 = function(test) {
	var player2 = new Player(2);
	player2.placeShip(0, 1);
	player2.placeShip(0, 2);
	player2.placeShip(0, 3);
	player2.placeShip(0, 4);
	player2.placeShip(0, 5);

	var game = new Game(new Player(1), player2);
	game.initiateEnemyBoards();
	game.player1.attack(0, 1);
	game.player1.attack(0, 2);
	game.player1.attack(0, 3);
	game.player1.attack(0, 4);
	game.player1.attack(0, 5);

	test.equal(true, game.isGameOver());
	test.done();
};

exports.gameIsGameOverReturnsFalseIf5ShipsHaveNotBeenHitByPlayer1 = function(test) {
	var player2 = new Player(2);
	player2.placeShip(0, 1);
	player2.placeShip(0, 2);
	player2.placeShip(0, 3);
	player2.placeShip(0, 4);
	player2.placeShip(0, 5);

	var game = new Game(new Player(1), player2);
	game.initiateEnemyBoards();
	game.player1.attack(0, 1);
	game.player1.attack(0, 2);
	game.player1.attack(0, 3);
	game.player1.attack(0, 4);

	test.equal(false, game.isGameOver());
	test.done();
};

exports.gameIsGameOverReturnsTrueIf5ShipsHaveBeenHitByPlayer2 = function(test) {
	var player1 = new Player(2);
	player1.placeShip(0, 1);
	player1.placeShip(0, 2);
	player1.placeShip(0, 3);
	player1.placeShip(0, 4);
	player1.placeShip(0, 5);

	var game = new Game(player1, new Player(2));
	game.initiateEnemyBoards();
	game.player2.attack(0, 1);
	game.player2.attack(0, 2);
	game.player2.attack(0, 3);
	game.player2.attack(0, 4);
	game.player2.attack(0, 5);

	test.equal(true, game.isGameOver());
	test.done();
};

exports.gameIsGameOverReturnsFalseIf5ShipsHaveNotBeenHitByPlayer2 = function(test) {
	var player1 = new Player(2);
	player1.placeShip(0, 1);
	player1.placeShip(0, 2);
	player1.placeShip(0, 3);
	player1.placeShip(0, 4);
	player1.placeShip(0, 5);

	var game = new Game(player1, new Player(2));
	game.initiateEnemyBoards();
	game.player2.attack(0, 1);
	game.player2.attack(0, 2);
	game.player2.attack(0, 3);
	game.player2.attack(0, 4);

	test.equal(false, game.isGameOver());
	test.done();
};