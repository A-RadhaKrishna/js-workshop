// Set the inner HTML of the element with the id "main" to "TO-DO LIST"
document.getElementById("main").innerHTML = "TO-DO LIST";

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Function to add a new task to the to-do list
function addTask(taskText = '', completed = false) {
    // Get the task input element
    const taskInput = document.getElementById('taskInput');
    // If no task text is provided, get the text value of the task input
    if (taskText === '') {
        taskText = taskInput.value;
    }

    // Check if the task text is empty
    if (taskText === '') {
        // Alert the user to enter a task if the task text is empty
        alert('Please enter a task.');
        return;
    }

    // Get the task list element
    const taskList = document.getElementById('taskList');
    // Create a new list item element
    const listItem = document.createElement('li');

    // Create a new checkbox element
    const checkbox = document.createElement('input');
    // Set the type of the checkbox to "checkbox"
    checkbox.type = 'checkbox';
    // Set the checkbox checked state based on the completed parameter
    checkbox.checked = completed;
    // Add an event listener to the checkbox to toggle the text decoration of the list item
    checkbox.onclick = function() {
        listItem.style.textDecoration = this.checked ? 'line-through' : 'none';
        saveTasks();
    };

    // Create a new span element to hold the task text
    const taskSpan = document.createElement('span');
    // Set the text content of the span to the task text
    taskSpan.textContent = taskText;

    // Create a new edit button element
    const editButton = document.createElement('button');
    editButton.id = "Editbutton";
    // Set the text content of the edit button to "Edit"
    editButton.textContent = 'Edit';
    // Add an event listener to the edit button to edit the task
    editButton.onclick = function() {
        editTask(taskSpan);
    };

    // Create a new delete button element
    const deleteButton = document.createElement('button');
    deleteButton.id = "delete";
    // Set the text content of the delete button to "Delete"
    deleteButton.textContent = 'Delete';
    // Add an event listener to the delete button to remove the task
    deleteButton.onclick = function() {
        taskList.removeChild(listItem);
        saveTasks();
    };

    // Append the checkbox, task span, edit button, and delete button to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);
    // Clear the task input value
    taskInput.value = '';

    // Save tasks to localStorage
    saveTasks();
}

// Function to edit a task
function editTask(taskSpan) {
    // Prompt the user to enter a new task text
    const newTaskText = prompt('Edit your task:', taskSpan.textContent);
    // Check if the new task text is not null and not empty
    if (newTaskText !== null && newTaskText !== '') {
        // Set the text content of the task span to the new task text
        taskSpan.textContent = newTaskText;
        // Save tasks to localStorage
        saveTasks();
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(listItem => {
        const taskText = listItem.querySelector('span').textContent;
        const completed = listItem.querySelector('input[type="checkbox"]').checked;
        tasks.push({ text: taskText, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add an event listener to the task input to call the addTask function when the Enter key is pressed
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
