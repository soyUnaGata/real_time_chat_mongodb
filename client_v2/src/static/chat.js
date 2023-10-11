const token = localStorage.getItem('token');

if (!token){
    location = '/register'
}

const decoded = decodeJWT(token);
const username = decoded.payload.username;
const server = 'http://localhost:5000';
const socket = io ("http://localhost:5000", {
    query: {token}
});;

axios.defaults.baseURL = server;

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatContainer = document.getElementById('chat-container');
const usernameEl = document.getElementById('username');
const msgFromMeClass = 'message--from-me';
const msgSystemClass = 'message--system';

socket.on('user-connected', data => {
    renderMessage('SYSTEM', `${data} connected`, msgSystemClass)
});

socket.on('chat-message', data => {
    console.log(data)
    const addingClass = username === data.username ? msgFromMeClass : '';
    renderMessage(data.username, data.message, addingClass);

});

socket.on('user-disconnected', data => {
    renderMessage('SYSTEM', `${data} disconnected`, msgSystemClass)
});

messageForm.addEventListener('submit', handleSubmit);
messageInput.addEventListener('keydown', handleSubmit);

function handleSubmit(e) {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      const message = messageInput.value;
      if (!message.trim()) return;
      socket.emit('send-chat-message', message);
      messageInput.value = '';
    }
}


function renderMessage(from, message, className){
    messageContainer.innerHTML += `  
    <li class="${className}">
        <div class="message">
            <span class="author" style="font-size: 70%;">${from}</span>
            <span class="message-text">${message}</span>
        </div>
    </li>
    `;
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

function base64UrlDecode(base64Url) {
    let padding = '='.repeat((4 - (base64Url.length % 4)) % 4);
    let base64 = (base64Url + padding).replace(/-/g, '+').replace(/_/g, '/');
    return atob(base64);
  }
  
  function decodeJWT(token) {
    const [headerEncoded, payloadEncoded, signature] = token.split('.');
    const header = JSON.parse(base64UrlDecode(headerEncoded));
    const payload = JSON.parse(base64UrlDecode(payloadEncoded));
  
    return { header, payload, signature };
  }