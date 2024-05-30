// Set the inner HTML of the element with the id "main" to "TO-DO LIST"
document.getElementById("main").innerHTML = "TO-DO LIST";

// Function to add a new task to the to-do list
function addTask() {
    // Get the task input element
    const taskInput = document.getElementById('taskInput');
    // Get the text value of the task input
    const taskText = taskInput.value;

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
    // Add an event listener to the checkbox to toggle the text decoration of the list item
    checkbox.onclick = function() {
        listItem.style.textDecoration = this.checked? 'line-through' : 'none';
    };

    // Create a new span element to hold the task text
    const taskSpan = document.createElement('span');
    // Set the text content of the span to the task text
    taskSpan.textContent = taskText;

    // Create a new edit button element
    const editButton = document.createElement('button');
    // Set the text content of the edit button to "Edit"
    editButton.textContent = 'Edit';
    // Add an event listener to the edit button to edit the task
    editButton.onclick = function() {
        editTask(taskSpan);
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function(){
        taskList.removeChild(listItem);
    }

    // Append the checkbox, task span, and edit button to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);
    // Clear the task input value
    taskInput.value = '';
}

// Function to edit a task
function editTask(taskSpan) {
    // Prompt the user to enter a new task text
    const newTaskText = prompt('Edit your task:', taskSpan.textContent);
    // Check if the new task text is not null and not empty
    if (newTaskText!== null && newTaskText!== '') {
        // Set the text content of the task span to the new task text
        taskSpan.textContent = newTaskText;
    }
}


// Add an event listener to the task input to call the addTask function when the Enter key is pressed
document.getElementById('taskInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});