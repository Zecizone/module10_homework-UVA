// задание 1

let icon = document.querySelector('.icon');
let svg1 = document.querySelector('.svg1');
let svg2 = document.querySelector('.svg2');
let visible = true;

icon.addEventListener('click', () => {
    if (visible) {
        svg1.style.display = 'none';
        svg2.style.display = 'inline';
    } else {
        svg1.style.display = 'inline';
        svg2.style.display = 'none';
    };

    visible = !visible;
});

// задание 2 
const size = document.getElementById("size");
size.addEventListener("click", function() {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    alert(`Ширина вашего экрана ${screenWidth}, а высота ${screenHeight}`);
});

// задание 3

const messageInput = document.getElementById("messageInput");
const sendMessage = document.getElementById("sendMessage");
const sendLocation = document.getElementById("sendLocation");
const messages = document.getElementById("messages");
const socket = new WebSocket("wss://echo-ws-service.herokuapp.com");

socket.addEventListener("message", (event) => {
    const message = event.data;
    displayMessage(message);
});

function displayMessage(message) {
  const messageElement = document.createElement("p");
  messageElement.style.wordWrap = "break-word";
  messageElement.innerHTML = message;
  messages.appendChild(messageElement);
};

sendMessage.addEventListener("click", () => {
    const message = messageInput.value;
    if (message.trim() !== "") {
        socket.send("Чат: " + message);
        displayMessage("Вы: " + message);
        messageInput.value = "";
    };
});

sendLocation.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const locationLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
            displayMessage(`Гео-локация: ${locationLink}`);
            socket.send(locationLink);
        });
    } else {
        alert("Гео-локация не поддерживается в вашем браузере.");
    };
});
