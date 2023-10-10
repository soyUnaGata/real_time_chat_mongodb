const server = 'http://localhost:5000';
let socket = null;
axios.defaults.baseURL = server;
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const chatContainer = document.getElementById('chat-container');
const usernameEl = document.getElementById('username');
const msgFromMeClass = 'message--from-me';
const msgSystemClass = 'message--system';


socket && socket.emit('user', username);
    console.log(username)
    socket.on('user-connected', data => {
    console.log('connected', data)
    });
    socket.on('chat-message', data => {
    const addingClass = username === data.username ? msgFromMeClass : '';
    renderMessage(data.username, data.message, addingClass);

});

socket && socket.on('user-disconnected', username => {
    renderMessage('SYSTEM', `${username} disconnected`, msgSystemClass)
});

messageForm.addEventListener('submit', handleSubmit);
messageInput.addEventListener('keydown', handleSubmit);

function handleSubmit(e) {
    if (e.key === 'Enter' || e.type === 'submit') {
      e.preventDefault();
      const message = messageInput.value;
      if (!message.trim()) return;
      socket && socket.emit('send-chat-message', message);
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