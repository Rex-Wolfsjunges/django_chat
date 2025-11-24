const username = JSON.parse(document.querySelector("#json-username").textContent);
const chatRoomName = JSON.parse(document.querySelector("#json-chatroomname").textContent);
const chatSocket = new WebSocket(
  "ws://" + window.location.host + "/ws/" + chatRoomName + "/"
);

const messageInput = document.querySelector("#message-input");
const sendBtn = document.querySelector("#send-btn");

chatSocket.onmessage = function (event) {
  const data = JSON.parse(event.data);
  if (data.message) {
    let html = data.username + ": " +  data.message + "<br/>"
    const messagesDiv = document.querySelector("#chat-messages");
    messagesDiv.innerHTML += html;
  } else {
    alert("The message was empty!");
  }
}

chatSocket.onclose = function (event) {
  console.log("Socket closed");
}

sendBtn.onclick = function(event) {
  event.preventDefault();
  const message = messageInput.value;

  chatSocket.send(JSON.stringify({
    "message": message,
    "username": username,
    "room": chatRoomName
  }));
  messageInput.value = "";
}