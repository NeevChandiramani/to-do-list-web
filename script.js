// Import Firebase in index.html
// Add before </body>:
// <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-auth.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-firestore.js"></script>

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase config object goes here
    // Get this from Firebase Console after creating a project
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// User Authentication
signUpButton.addEventListener('click', async () => {
    const email = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        alert('Account created successfully!');
    } catch (error) {
        alert(error.message);
    }
});

signInButton.addEventListener('click', async () => {
    const email = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        userModal.style.display = 'none';
    } catch (error) {
        alert(error.message);
    }
});

// Listen for auth state changes
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = user;
        userDisplay.textContent = `Welcome, ${user.email}!`;
        userButton.style.display = 'none';
        logoutButton.style.display = 'inline-block';
        loadTasks();
    } else {
        currentUser = null;
        userDisplay.textContent = '';
        userButton.style.display = 'inline-block';
        logoutButton.style.display = 'none';
        document.getElementById('taskList').innerHTML = '';
    }
});

// Task Management
async function loadTasks(sort = 'none') {
    if (!currentUser) return;
    
    try {
        let query = db.collection('tasks').where('userId', '==', currentUser.uid);
        
        if (sort === 'asc') {
            query = query.orderBy('dueDate', 'asc');
        } else if (sort === 'desc') {
            query = query.orderBy('dueDate', 'desc');
        }
        
        const snapshot = await query.get();
        const tasks = [];
        snapshot.forEach(doc => {
            tasks.push({ id: doc.id, ...doc.data() });
        });
        
        renderTasks(tasks);
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Error loading tasks');
    }
}

addTaskButton.addEventListener('click', async () => {
    if (!currentUser) {
        alert('Please sign in first');
        return;
    }

    const content = taskInput.value;
    const dueDate = dueDateInput.value;
    const timeEstimate = parseInt(taskTimeInput.value);

    if (!content.trim() || !dueDate || isNaN(timeEstimate) || timeEstimate <= 0) {
        alert('Please fill in all fields correctly');
        return;
    }

    try {
        await db.collection('tasks').add({
            userId: currentUser.uid,
            content: content,
            dueDate: dueDate,
            timeEstimate: timeEstimate,
            completed: false,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        loadTasks(sortSelect.value);
        taskInput.value = '';
        dueDateInput.value = '';
        taskTimeInput.value = '';
    } catch (error) {
        alert('Error creating task');
    }
});

async function deleteTask(taskId) {
    try {
        await db.collection('tasks').doc(taskId).delete();
        loadTasks(sortSelect.value);
    } catch (error) {
        alert('Error deleting task');
    }
}

async function toggleTaskComplete(taskId, completed) {
    try {
        await db.collection('tasks').doc(taskId).update({
            completed: !completed
        });
        loadTasks(sortSelect.value);
    } catch (error) {
        alert('Error updating task');
    }
}

// Modified render function to work with Firestore documents
function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = `${task.content} (Due: ${new Date(task.dueDate).toLocaleDateString()}, Time Estimate: ${task.timeEstimate} mins)`;

        const doneButton = document.createElement('button');
        doneButton.innerHTML = '<img src="check.png" alt="Done" style="width: 20px; height: 20px;">';
        doneButton.classList.add('done-button');
        doneButton.addEventListener('click', () => toggleTaskComplete(task.id, task.completed));

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img src="cross.png" alt="Delete" style="width: 20px; height: 20px;">';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        const buttonsDiv = document.createElement('div');
        buttonsDiv.appendChild(doneButton);
        buttonsDiv.appendChild(deleteButton);

        listItem.appendChild(buttonsDiv);
        if (task.completed) {
            listItem.style.textDecoration = 'line-through';
        }
        taskList.appendChild(listItem);
    });
}