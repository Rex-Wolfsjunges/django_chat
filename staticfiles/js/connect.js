const chatRoomName = JSON.parse(document.querySelector("#json-chatroomname").textContent);
const chatSocket = new WebSocket(
  "ws://" + window.location.host + "/ws/" + chatRoomName + "/"
);

chatSocket.onmessage = function (event) {
  console.log("This is a message");
}

chatSocket.onclose = function (event) {
  console.log("Socket closed");
}