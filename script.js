var userButton = document.getElementById('userButton');
var logoutButton = document.getElementById('logoutButton');
var userDisplay = document.getElementById('userDisplay');
var userModal = document.getElementById('userModal');
var signInButton = document.getElementById('signInButton');
var signUpButton = document.getElementById('signUpButton');
var closeButton = document.querySelector('.close');

// Mock user data for simplicity
var users = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' }
];

// Current user
var currentUser = null;

// Show the user modal
userButton.addEventListener('click', function() {
    userModal.style.display = 'block';
});

// Hide the user modal
closeButton.addEventListener('click', function() {
    userModal.style.display = 'none';
});

// Sign in
signInButton.addEventListener('click', function() {
    var usernameInput = document.getElementById('usernameInput').value;
    var passwordInput = document.getElementById('passwordInput').value;

    // Check if the user exists
    var user = users.find(function(user) {
        return user.username === usernameInput && user.password === passwordInput;
    });

    if (user) {
        currentUser = user;
        userDisplay.textContent = 'Welcome, ' + currentUser.username + '!';
        userButton.style.display = 'none'; // Hide the sign in/up button
        logoutButton.style.display = 'inline-block'; // Show the logout button
        userModal.style.display = 'none';
    } else {
        alert('Invalid username or password.');
    }
});

// Sign up
signUpButton.addEventListener('click', function() {
    var usernameInput = document.getElementById('usernameInput').value;
    var passwordInput = document.getElementById('passwordInput').value;

    // Check if the username is already taken
    var user = users.find(function(user) {
        return user.username === usernameInput;
    });

    if (user) {
        alert('Username is already taken.');
    } else if (usernameInput && passwordInput) {
        users.push({ username: usernameInput, password: passwordInput });
        alert('Account created successfully. Please sign in.');
    } else {
        alert('Please enter a username and password.');
    }
});

// Logout
logoutButton.addEventListener('click', function() {
    currentUser = null;
    userDisplay.textContent = '';
    userButton.style.display = 'inline-block'; // Show the sign in/up button
    logoutButton.style.display = 'none'; // Hide the logout button
});