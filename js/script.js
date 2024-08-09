// Select elements
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const addTaskBtn = document.getElementById('add-task-btn');
const taskContainer = document.getElementById('task-container');
const allTasksBtn = document.getElementById('all-tasks-btn');
const completedTasksBtn = document.getElementById('completed-tasks-btn');
const incompleteTasksBtn = document.getElementById('incomplete-tasks-btn');

// Array to hold tasks
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to display tasks
function displayTasks(filter = 'all') {
    taskContainer.innerHTML = '';  // Clear the task container

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;  // Show only completed tasks
        if (filter === 'incomplete') return !task.completed;  // Show only incomplete tasks
        return true;  // Show all tasks
    });

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');

        // Conditionally add the 'completed' class
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <span>${task.title} - ${task.description}</span>
            <div>
                <button onclick="toggleComplete(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        taskContainer.appendChild(taskItem);
    });
}

// Function to add a new task
function addTask() {
    const taskTitle = taskTitleInput.value.trim();
    const taskDesc = taskDescInput.value.trim();

    if (taskTitle) {
        tasks.push({ title: taskTitle, description: taskDesc, completed: false });  // Add new task to the array
        saveTasks();  // Save tasks to local storage
        displayTasks();  // Refresh the task list
        taskTitleInput.value = '';  // Clear the input fields
        taskDescInput.value = '';
    }
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;  // Toggle the completion status of the task
    saveTasks();  // Save changes to local storage
    displayTasks();  // Refresh the task list
}

// Function to edit a task
function editTask(index) {
    const newTitle = prompt('Edit Task Title', tasks[index].title);  // Prompt for a new title
    const newDesc = prompt('Edit Task Description', tasks[index].description);  // Prompt for a new description

    if (newTitle !== null && newTitle.trim() !== '' && newDesc !== null) {
        tasks[index].title = newTitle;  // Update the task title
        tasks[index].description = newDesc;  // Update the task description
        saveTasks();  // Save changes to local storage
        displayTasks();  // Refresh the task list
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);  // Remove the task from the array
    saveTasks();  // Save changes to local storage
    displayTasks();  // Refresh the task list
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));  // Convert tasks array to JSON and save to local storage
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);  // Add task on button click
allTasksBtn.addEventListener('click', () => displayTasks('all'));  // Display all tasks
completedTasksBtn.addEventListener('click', () => displayTasks('completed'));  // Display completed tasks
incompleteTasksBtn.addEventListener('click', () => displayTasks('incomplete'));  // Display incomplete tasks

// Initial display of tasks
displayTasks();  // Display tasks when the page loads
