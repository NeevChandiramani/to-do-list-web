var users = [];
var currentUser = null;

document.getElementById('themeButton').addEventListener('click', function() {
    document.body.classList.toggle('dark');
});

document.getElementById('userButton').addEventListener('click', function() {
    document.getElementById('userModal').style.display = 'block';
});

document.getElementById('signInButton').addEventListener('click', function() {
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
    var user = users.find(user => user.name === username && user.password === password);
    if (user) {
        currentUser = user;
        document.getElementById('userModal').style.display = 'none';
        displayTasks();
    } else {
        alert('Invalid username or password');
    }
});

document.getElementById('signUpButton').addEventListener('click', function() {
    var username = document.getElementById('usernameInput').value;
    var password = document.getElementById('passwordInput').value;
    if (username && password) {
        users.push({ name: username, password: password, tasks: [] });
        document.getElementById('usernameInput').value = '';
        document.getElementById('passwordInput').value = '';
        document.getElementById('userModal').style.display = 'none';
    }
});

document.getElementById('addTaskButton').addEventListener('click', function() {
    var taskValue = document.getElementById('taskInput').value;
    var timeValue = document.getElementById('taskTime').value;
    if (taskValue && timeValue && currentUser) {
        currentUser.tasks.push({ task: taskValue, time: timeValue });
        document.getElementById('taskInput').value = '';
        document.getElementById('taskTime').value = '';
        displayTasks();
    }
});

function displayTasks() {
    var list = document.getElementById('taskList');
    list.innerHTML = '';
    if (currentUser) {
        currentUser.tasks.forEach(function(taskData, index) {
            var item = document.createElement('li');

            var taskText = document.createElement('span');
            taskText.innerText = taskData.task;
            item.appendChild(taskText);

            var timeText = document.createElement('span');
            timeText.innerText = taskData.time + ' mins';
            item.appendChild(timeText);

            var removeButton = document.createElement('button');
            removeButton.innerHTML = '<i class="fas fa-trash"></i>';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', function() {
                currentUser.tasks.splice(index, 1);
                displayTasks();
            });
            item.appendChild(removeButton);

            list.appendChild(item);
        });
    }
}

displayTasks();

// Add event listener to close button
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('userModal').style.display = 'none';
});