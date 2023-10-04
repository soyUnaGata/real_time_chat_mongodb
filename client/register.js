const server = 'http://localhost:5000';
axios.defaults.baseURL = server;
const usernameInput = document.getElementById('inputUsername');
const passwordInput = document.getElementById('inputPassword');
const registrationForm = document.getElementById('registration');


registrationForm.addEventListener('submit', e => {
    e.preventDefault();
    let username = usernameInput.value;
    let password = passwordInput.value;

    axios.post('auth/register', {username: username, password: password})
    .then(response => {
        console.log(response)
    })


})



