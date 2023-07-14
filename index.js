const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");
let tasks = [];

function createTaskItem(task) {
  const li = document.createElement("span");
  const checkbox = document.createElement("input");
  const span = document.createElement("span");
  span.style.color = "white";
  span.style.padding = "10px";
  // span.style.display = "block";
  span.style.display = "flex-start";

  const deleteButton = document.createElement("button");
  deleteButton.style.margin = "10px 0px";

  checkbox.type = "checkbox";
  span.textContent = task;
  deleteButton.textContent = "Delete";

  deleteButton.addEventListener("click", function () {
    const index = tasks.indexOf(task);
    if (index !== -1) {
      tasks.splice(index, 1);
    }
    li.remove();
  });

  span.addEventListener("click", function () {
    span.classList.toggle("selected");
  });
  checkbox.addEventListener("change", function () {
    span.classList.toggle("completed");
  });
  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function performSearch(query) {
  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(query.toLowerCase())
  );
  renderTaskList(filteredTasks);
}

function renderTaskList(taskArray) {
  taskList.innerHTML = "";
  taskArray.forEach((task) => {
    createTaskItem(task);
  });
}

addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push(taskText);
    createTaskItem(taskText);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addButton.click();
  }
});

searchInput.addEventListener("input", function (event) {
  const query = event.target.value.trim();
  performSearch(query);
});
