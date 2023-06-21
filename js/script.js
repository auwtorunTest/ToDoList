let tasks = [];

// Memuat data dari localStorage saat halaman dimuat
window.addEventListener("load", function () {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  renderTasks();
});

function getSelectedCategory() {
  return categorySelect.value;
}

const taskInput = document.getElementById("taskInput");
const prioritySelect = document.getElementById("prioritySelect");
const taskDescriptionInput = document.getElementById("taskDescriptionInput")
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("categorySelect");

function addTask() {
    const taskText = taskInput.value;
    const priorityValue = prioritySelect.value;
    const taskDescription = taskDescriptionInput.value;
    const categoryFilter = categorySelect.value;
  
    if (taskText !== "") {
      tasks.push({
        text: taskText,
        priority: priorityValue,
        description: taskDescription,
        category: categoryFilter,
        icon: getCategoryIcon(categoryFilter),
        completed: false,
      });
      taskInput.value = "";
      taskDescriptionInput.value = "";
      saveTasksToLocalStorage();
      renderTasks();
    }
  }

taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });


function renderTasks() {
  const taskList = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");
  const categoryFilter = document.getElementById("categoryFilter");

  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "flex"; // Tampilkan pesan "Tidak ada tugas"
  } else {
    emptyMessage.style.display = "none"; // Sembunyikan pesan "Tidak ada tugas"
  }
  
  if (tasks.length === 0) {
    emptyMessage.style.overflow = "hidden"; // Tampilkan pesan "Tidak ada tugas"
  } else {
    emptyMessage.style.overflow = "visible"; // Sembunyikan pesan "Tidak ada tugas"
  }

  if (tasks.length === 0) {
    taskList.style.display = "none"; // Tampilkan pesan "Tidak ada tugas"
  } else {
    taskList.style.display = "block"; // Sembunyikan pesan "Tidak ada tugas"
  }

  tasks.forEach(function (task, index) {
    const li = document.createElement("li");
    const taskPriority = document.createElement("span");
    const taskText = document.createElement("span");
    const taskDescription = document.createElement("p");
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");
    const statusButton = document.createElement("button");
    const icon = document.createElement("i");
          icon.className = task.icon;
          li.appendChild(icon);

    taskPriority.textContent = getPriorityLabel(task.priority);
    taskPriority.classList.add("task-priority-" + task.priority); // Menambahkan kelas CSS sesuai dengan prioritas
    li.appendChild(taskPriority);

    taskText.textContent = task.text;
    li.appendChild(icon);
    li.appendChild(taskText);

    taskDescription.textContent = task.description; // Menambahkan deskripsi tugas
    li.appendChild(taskDescription);

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

    icon.className = task.icon; // Mengatur kelas ikon dengan properti 'icon' dari tugas
    li.appendChild(icon); // Menambahkan elemen ikon ke dalam elemen <li>

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

function getPriorityLabel(priorityValue) {
  if (priorityValue === "green") {
    return "";
  } else if (priorityValue === "yellow") {
    return "";
  } else if (priorityValue === "red") {
    return "";
  }

  return "";
}

function getPriorityLabel(categoryFilter) {
  if (categoryFilter === "personal") {
    return "";
  } else if (categoryFilter === "work") {
    return "";
  }

  return "";
}

function getCategoryIcon(categoryFilter) {
  switch (categoryFilter) {
    case "work":
      return "fa-solid fa-briefcase";
    default:
      return "fas fa-user";
  }
}


