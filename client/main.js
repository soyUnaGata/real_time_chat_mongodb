const socket = io('http://localhost:5000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginFrom = document.getElementById('login');
const usernameEl = document.getElementById('username');
let username = '';
const msgFromMeClass = 'message--from-me';
const msgSystemClass = 'message--system';

loginFrom.addEventListener('submit', e =>{
    e.preventDefault();  
    username =  usernameEl.value;

    socket.emit('new-user', username);
    loginContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
    socket.on('user-connected', user => {
        console.log(socket)
        renderMessage('SYSTEM', `${user} connected`, msgSystemClass)
    });
});


socket.on('chat-message', data => {
   const addingClass = username === data.username ? msgFromMeClass : '';
   renderMessage(data.username, data.message, addingClass);
  
});

socket.on('user-disconnected', username => {
    renderMessage('SYSTEM', `${username} disconnected`, msgSystemClass)
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


