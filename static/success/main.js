const urlParams = new URLSearchParams(window.location.search);

const username = urlParams.get('username');

if (username) {
    const welcomeText = document.createElement('div');
    //Vulnerability
    welcomeText.innerHTML = `Welcome, ${username}`;
    document.body.appendChild(welcomeText);
}