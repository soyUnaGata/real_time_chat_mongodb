const server = 'http://localhost:5000';
let socket = null;
axios.defaults.baseURL = server;
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginFrom = document.getElementById('login');
const usernameEl = document.getElementById('username');
let username = usernameEl.value;
const msgFromMeClass = 'message--from-me';
const msgSystemClass = 'message--system';

async function authenticate(username) {
    try {
      const response = await axios.post('auth/login', { username });
  
      if (response.status !== 200) {
        throw new Error('Authentication failed');
      }

      const data = response.data;
  
      const token = data.token;
      localStorage.setItem('jwtToken', token); 
  
      return token;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  }



loginFrom.addEventListener('submit', e =>{
    e.preventDefault(); 

    authenticate(usernameEl.value)
    .then((token) => {
      console.log('JWT token:', token);
      socket = io ("http://localhost:5000", {
            query: {token}
        });
      socket && socket.emit('new-user', usernameEl.value);
    //   socket && socket.on('user-connected', username => {
    //         console.log(socket, username)
    //     });
      
    })
    .catch((error) => {
      // Обработка ошибки аутентификации
      console.error('Authentication failed:', error);
    });
    // socket && socket.emit('new-user', username);
    // loginContainer.classList.add('hidden');
    // chatContainer.classList.remove('hidden');
    // socket && socket.on('user-connected', user => {
    //     console.log(socket)
    //     renderMessage('SYSTEM', `${user} connected`, msgSystemClass)
    // });
});


socket && socket.on('chat-message', data => {
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


