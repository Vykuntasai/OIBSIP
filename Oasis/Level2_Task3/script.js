document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const pendingTasksList = document.getElementById("pending-tasks-list");
    const completedTasksList = document.getElementById("completed-tasks-list");

    // Load tasks from local storage on page load
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

    function updateTasks() {
        // Clear the lists
        pendingTasksList.innerHTML = "";
        completedTasksList.innerHTML = "";

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.addEventListener("click", () => markAsCompleted(task));
            pendingTasksList.appendChild(li);
        });

        completedTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task.text;
            li.classList.add("completed");
            completedTasksList.appendChild(li);
        });

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    function addTask(event) {
        event.preventDefault();
        const text = taskInput.value.trim();

        if (text === "") return;

        const task = { text, completed: false };
        tasks.push(task);

        updateTasks();
        taskInput.value = "";
    }

    function markAsCompleted(task) {
        const index = tasks.indexOf(task);
        if (index !== -1) {
            tasks.splice(index, 1);
            task.completed = true;
            completedTasks.push(task);
        }

        updateTasks();
    }

    taskForm.addEventListener("submit", addTask);

    // Initial rendering of tasks
    updateTasks();
});