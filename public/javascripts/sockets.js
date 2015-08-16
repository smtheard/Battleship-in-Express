var initiateSocket = function(player) {
  var socket = io.connect('http://localhost:3000');
  
  socket.emit('successful connection', { username: player })
  
  socket.on('update players', function (data) {
    if(data.players.length > 1) {
      var otherPlayers = data.players.filter(function (otherPlayer) {
        return otherPlayer !== player;
      });

      $('#playerList').empty();
      otherPlayers.forEach(function (player) {
      	$('#playerList').append("<tr><td align='right'>" + player + "</td><td><button id='" + player + "' type='button' onclick='challengePlayer(this.id)'>Challenge!</button></td></tr>");
      });
    } else {
    	$('#playerList').empty();
    }
  });

  challengePlayer = function(element) {
  	socket.emit('challenge player', { challenger: player, opponent: element })
  }

  socket.on('send challenge', function (data) {
  		var isAccepted = window.confirm('You have been challenged by ' + data.challenger);
  		if(isAccepted) {
  			var goesFirst = function() {
  				return (Math.round(Math.random()));
  			}
  			if(goesFirst() === 0) {
  				socket.emit('accepted challenge', { player1name: player, player2name: data.challenger })
  			} else {
  				socket.emit('accepted challenge', { player1name: data.challenger, player2name: player })
  			}
  		}
  })

  socket.on('send to game page', function (data) {
  	var queryMessage = data;
    var queryString = $.param(queryMessage);
    window.location.replace('/game?' + queryString);
  })
}

var challengePlayer;

var initiateGameSocket = function(player, game) {
  var socket = io.connect('http://localhost:3000');
  
  socket.emit('successful game connection', { player: player, gameID: game })
  
  socket.on('ship successfully placed', function(data) {
    document.getElementById(data.x + ',' + data.y).innerHTML = 'Ship';
  })

  socket.on('switch boards', function(data) {
    createEnemyTable(socket);
  })

  socket.on('attack response', function(data) {
    document.getElementById(data.x + ',' + data.y).innerHTML = data.response;
  })

  socket.on('opponents turn', function(data) {
    document.getElementById('info').innerHTML = 'It is your opponents turn.. Please wait';
    setTimeout(function(){document.getElementById('info').innerHTML = ''}, 1000);
  })

  socket.on('game over', function(data) {
    document.getElementById('boardArea').innerHTML = 'Game Over. ' + data.winner + ' wins the game.';
  })
  return socket;
}