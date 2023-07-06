let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let taskDiv = document.querySelector(".tasks");

// Empty Array
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
getDataFromLocal();
// Add Task
submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value); // Add Task To Array Of Tasks
    input.value = "";
  }
};

// Click On Task Element
taskDiv.addEventListener("click", (e) => {
  // Dlete Button
  if (e.target.classList.contains("del")) {
    // Remove Element From Loca Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentElement.remove();
  }
  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  // Add Tasks To Page
  addElemsToPage(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorage(arrayOfTasks);
}

function addElemsToPage(arrayOfTasks) {
  // Empyt Task Div
  taskDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // Check If Task Is Done
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // Add Task Div To Tasks Container
    taskDiv.appendChild(div);
  });
}
function addDataToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocal() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addElemsToPage(task);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}
