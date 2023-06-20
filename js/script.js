let tasks = [];

// Memuat data dari localStorage saat halaman dimuat
window.addEventListener("load", function () {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  renderTasks();
});

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

function addTask() {
  const taskText = taskInput.value;

  if (taskText !== "") {
    tasks.push({
      text: taskText,
      completed: false
    });
    taskInput.value = "";
    saveTasksToLocalStorage();
    renderTasks();
  }
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {
        const li = document.createElement("li");
        const taskText = document.createElement("span");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        const statusButton = document.createElement("button");

        taskText.textContent = task.text;
        li.appendChild(taskText);

        deleteButton.textContent = "Hapus";
        deleteButton.addEventListener("click", function () {
            deleteTask(index);
        });
        li.appendChild(deleteButton);

        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editTask(index);
        });
        li.appendChild(editButton);

        statusButton.textContent = task.completed ? "Belum Selesai" : "Selesai";
        statusButton.addEventListener("click", function () {
            toggleStatus(index);
        });
        li.appendChild(statusButton);

        taskList.appendChild(li);
    });
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasksToLocalStorage();
  renderTasks();
}

function editTask(index) {
    const newText = prompt("Masukkan teks baru:", tasks[index].text);

    if (newText !== null && newText !== "") {
        tasks[index].text = newText;
        saveTasksToLocalStorage();
        renderTasks();
    }
}

function toggleStatus(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
