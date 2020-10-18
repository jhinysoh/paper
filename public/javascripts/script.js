window.onload = function(){

	// S 위지윅에디터(CKeditor)
	InlineEditor
			.create( document.querySelector( '#subjective' ),{
				toolbar: [ 'highlight', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ]
			} )
			.catch( error => {
					console.error( error );
			} );

}

// 회원가입, 병원등록 페이지 토글
function signUpFormSwitch(){
	document.getElementById("userSignUp").classList.toggle("signup-nav1");
	document.getElementById("hospitalSignUp").classList.toggle("signup-nav1");
	document.getElementById("userSignUpForm").classList.toggle("formHide");
	document.getElementById("hospitalSignUpForm").classList.toggle("formHide")
}


// 웹소켓 연결
var wsUri = "wss://echo.websocket.org/";
var output;

function init() {
  output = document.getElementById("output");
  testWebSocket();
}
function testWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}
function onOpen(evt) {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
}
function onClose(evt) { writeToScreen("DISCONNECTED") }
function onMessage(evt) {
    writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data+'</span>');
    websocket.close();
}
function onError(evt) { writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data) }
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
