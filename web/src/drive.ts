var wsUri = "ws://localhost:42423";
var output;
var forwardBtn, leftBtn, rightBtn, reverseBtn, stopBtn;
var websocket;
		
function init() {
    output = document.getElementById("controls");
    connectWebSocket();
}

class listener {
    constructor() {
        forwardBtn = document.getElementById("forwardButton");
        leftBtn = document.getElementById("leftButton");
        rightBtn = document.getElementById("rightButton");
        reverseBtn = document.getElementById("reverseButton");
        stopBtn = document.getElementById("stopButton");

        forwardBtn.addEventListener("click", this.moveForward)
        leftBtn.addEventListener("click", this.moveLeft)
        rightBtn.addEventListener("click", this.moveRight)
        reverseBtn.addEventListener("click", this.moveReverse)
        stopBtn.addEventListener("click", this.moveStop)
    }

    moveForward() {
        doSend("Forward");        
    }
    
    moveLeft() {
        doSend("Left");
    }
    
    moveRight() {
        doSend("Right");
    }
    
    moveReverse() {
        doSend("Reverse");
    }
    
    moveStop() {
        doSend("Stop");
    }
}

function connectWebSocket() {
    websocket = new WebSocket(wsUri);
        
    websocket.onopen = function(evt) {
        onOpen(evt)
    };

    websocket.onmessage = function(evt) {
        onMessage(evt)
    };

    websocket.onerror = function(evt) {
        onError(evt)
    };

    new listener();
}

function onOpen(evt) {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
}

function onMessage(evt) {
    writeToScreen('<span style = "color: blue;">RESPONSE: ' +
    evt.data+'</span>');
}

function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
    writeToScreen("SENT: " + message); 
    websocket.send(message);
}

function writeToScreen(message) {
    var pre = document.createElement("p"); 
    pre.style.wordWrap = "break-word"; 
    pre.innerHTML = message; 
    output.appendChild(pre);
}

window.addEventListener("load", init, false);