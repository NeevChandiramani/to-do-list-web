var userButton = document.getElementById('userButton');
var logoutButton = document.getElementById('logoutButton');
var userDisplay = document.getElementById('userDisplay');
var userModal = document.getElementById('userModal');
var signInButton = document.getElementById('signInButton');
var signUpButton = document.getElementById('signUpButton');
var closeButton = document.querySelector('.close');
var addTaskButton = document.getElementById('addTaskButton');
var darkThemeButton = document.getElementById('themeButton');

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById('taskList');

    tasks.sort(function(a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
    });

    tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.textContent = task.content + ' (Due: ' + task.dueDate + ', Time Estimate: ' + task.time + ' mins)'; // Display due date and time estimate

        var doneButton = document.createElement('button');
        doneButton.innerHTML = '<img src="check.png" alt="Done" style="width: 20px; height: 20px;">';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', function() {
            task.completed = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            listItem.style.textDecoration = 'line-through';
            taskList.removeChild(listItem);
            taskList.appendChild(listItem);
        });

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="cross.png" alt="Delete" style="width: 20px; height: 20px;">';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            var index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskList.removeChild(listItem);
            }
        });
        var buttonsDiv = document.createElement('div');
        buttonsDiv.appendChild(doneButton);
        buttonsDiv.appendChild(deleteButton);

        listItem.appendChild(buttonsDiv);
        taskList.appendChild(listItem);
    });
});

// Current user
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (currentUser) {
    userDisplay.textContent = 'Welcome, ' + currentUser.username + '!';
    userButton.style.display = 'none'; // Hide the sign in/up button
    logoutButton.style.display = 'inline-block'; // Show the logout button
}

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
    var user = JSON.parse(localStorage.getItem(usernameInput));

    if (user && user.password === passwordInput) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
    var user = JSON.parse(localStorage.getItem(usernameInput));

    if (user) {
        alert('Username is already taken.');
    } else if (usernameInput && passwordInput) {
        localStorage.setItem(usernameInput, JSON.stringify({ username: usernameInput, password: passwordInput }));
        alert('Account created successfully. Please sign in.');
    } else {
        alert('Please enter a username and password.');
    }
});

// Logout
logoutButton.addEventListener('click', function() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    userDisplay.textContent = '';
    userButton.style.display = 'inline-block'; // Show the sign in/up button
    logoutButton.style.display = 'none'; // Hide the logout button
});

// Add Task
document.addEventListener('DOMContentLoaded', function() {
    var addTaskButton = document.getElementById('addTaskButton');

    addTaskButton.addEventListener('click', function() {
        var taskInput = document.getElementById('taskInput');
        var dueDateInput = document.getElementById('dueDateInput');
        var taskTimeInput = document.getElementById('taskTime'); // New line

        var taskContent = taskInput.value;
        var dueDate = dueDateInput.value;
        var taskTime = parseInt(taskTimeInput.value); // Convert to integer

        if (!taskContent.trim()) {
            alert('Please enter a task.');
            return;
        }
        if (!dueDate) {
            alert('Please select a due date.');
            return;
        }
        if (isNaN(taskTime) || taskTime <= 0) { // Check if taskTime is a valid number
            alert('Please enter a valid time estimate for the task.');
            return;
        }

        var task = {
            id: Date.now(),
            content: taskContent,
            completed: false,
            dueDate: dueDate,
            time: taskTime // Store estimated time
        };

        var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks(tasks);

        taskInput.value = '';
        dueDateInput.value = '';
        taskTimeInput.value = ''; // Clear task time input
    });
});

// Function to render tasks
function renderTasks(tasks) {
    var taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear existing tasks

    tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.textContent = task.content + ' (Due: ' + task.dueDate + ', Time Estimate: ' + task.time + ' mins)'; // Display due date and time estimate

        var doneButton = document.createElement('button');
        doneButton.innerHTML = '<img src="check.png" alt="Done" style="width: 20px; height: 20px;">';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', function() {
            task.completed = true;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            listItem.style.textDecoration = 'line-through';
            taskList.removeChild(listItem);
            taskList.appendChild(listItem);
        });

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="cross.png" alt="Delete" style="width: 20px; height: 20px;">';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            var index = tasks.indexOf(task);
            if (index !== -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskList.removeChild(listItem);
            }
        });
        var buttonsDiv = document.createElement('div');
        buttonsDiv.appendChild(doneButton);
        buttonsDiv.appendChild(deleteButton);

        listItem.appendChild(buttonsDiv);
        taskList.appendChild(listItem);
    });
}

// Dark Theme
darkThemeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark');
});
