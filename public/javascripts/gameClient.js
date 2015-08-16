var placeShipHandler = function(x, y, socket) {
	var onclick = function(event) {
		socket.emit('ship placed', {x: x, y: y });
	};
	return onclick;
};

var attackHandler = function(x, y, socket) {
	var onclick = function(event) {
		socket.emit('attack!', {x: x, y: y});
	};
	return onclick;
};

var createFriendlyTable = function(playerSocket){
	for(var i = 0; i < 10; i++) {
      var tr = document.createElement("tr");
      for(var j = 0; j < 10; j++) {
        var button = document.createElement("BUTTON");
        button.id = i + ',' + j;
        button.onclick = placeShipHandler(i, j, playerSocket);
        var td = document.createElement("td");
        var txtBtn = document.createTextNode("Place Ship");
        button.appendChild(txtBtn);
        td.appendChild(button);
        tr.appendChild(td);
      }
      document.getElementById('boardArea').appendChild(tr);
    }
}

var createEnemyTable = function(playerSocket){
	document.getElementById('boardArea').innerHTML = '';
	for(var i = 0; i < 10; i++) {
      var tr = document.createElement("tr");
      for(var j = 0; j < 10; j++) {
        var button = document.createElement("BUTTON");
        button.id = i + ',' + j;
        button.onclick = attackHandler(i, j, playerSocket);
        var td = document.createElement("td");
        var txtBtn = document.createTextNode("Attack!");
        button.appendChild(txtBtn);
        td.appendChild(button);
        tr.appendChild(td);
      }
      document.getElementById('boardArea').appendChild(tr);
    }
}