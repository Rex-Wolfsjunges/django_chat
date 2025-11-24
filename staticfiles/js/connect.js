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
    let html = '<div class="message shadow-lg p-3 m-3 rounded-lg w-1/2 bg-blue-200 ">' +
      '<div class="text-sm text-gray-500">' +
      data.username +
      '</div>' +
      data.message +
      '<div class="text-sm text-gray-500">' + 'Now' + '</div>';

    const messagesDiv = document.querySelector("#chat-messages");
    messagesDiv.innerHTML += html;
  } else {
    alert("The message was empty!");
  }

  scroll();
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

function scroll() {
  const messageContainer = document.querySelector("#message-container");
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

scroll();