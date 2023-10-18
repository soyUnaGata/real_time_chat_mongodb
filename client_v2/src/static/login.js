const server = 'http://localhost:5000';
axios.defaults.baseURL = server;
const usernameInput = document.getElementById('inputUsername');
const passwordInput = document.getElementById('inputPassword');
const loginForm = document.getElementById('login');
const errorWrapper = document.getElementById('error-wrapper');


loginForm.addEventListener('submit', e => {
    e.preventDefault();
    let username = usernameInput.value;
    let password = passwordInput.value;

    axios.post('auth/login', {username: username, password: password})
    .then((response) => {
        localStorage.setItem('token', response.data.token);
        location = '/chat'
    })
    .catch(error => {
        errorWrapper.innerHTML = `
        <div class="alert w-100 alert-danger d-flex align-items-center" role="alert">
            <svg class="bi danger-img" role="img" aria-label="Danger:">
                <use xlink:href="#exclamation-triangle-fill"/>
            </svg>
             
            <div>
                ${error.response.data.message}
            </div>
        </div>
        `
    })

})