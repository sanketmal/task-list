let taskName = "";
const taskListDivElement = document.getElementById("task-list");
const tasks = getItem("tasks") ?? [];
const input = document.getElementById("task");
const btn = document.getElementById("btn");
input.addEventListener("input", (event) => {
  taskName = event.target.value;
});

function addTask() {
  if (taskName) {
    tasks.push(taskName);
    addItem("tasks", tasks);
    showTask(tasks); // Refresh displayed tasks
    clearField();
  }
}
btn.addEventListener("click", addTask);

function addItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function showTask(taskList) {
  const taskContainer = document.getElementById("task-list");
  taskContainer.innerHTML = ""; // Clear previous tasks
  // Task show in descending order
  let length = taskList.length;
  if(length == 0){
    taskListDivElement.style = "display:none";
  }else{
    taskListDivElement.style = "display:block";
  }
  
  for (i = length; i > 0; i--) {
    const childDiv = document.createElement("div");
    childDiv.classList.add("task-item");

    const taskNumber = document.createElement("span");
    taskNumber.classList.add("task-number");
    taskNumber.textContent = `${length - i + 1}. `;

    const taskNameElement = document.createElement("span");
    taskNameElement.classList.add("task-name");
    taskNameElement.textContent = taskList[i - 1];

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.id = `btn-delete-${i - 1}`;
    deleteButton.textContent = "Delete";

    childDiv.appendChild(taskNumber);
    childDiv.appendChild(taskNameElement);
    childDiv.appendChild(deleteButton);
    taskContainer.appendChild(childDiv);
  }

  //Task in ascending order
  // taskList.forEach((task,index) => {

  //     const childDiv = document.createElement("div");
  //     childDiv.classList.add("task-item");

  //     const taskNumber = document.createElement("span");
  //     taskNumber.classList.add("task-number");
  //     taskNumber.textContent = `${index + 1}. `;

  //     const taskNameElement = document.createElement("span");
  //     taskNameElement.classList.add("task-name");
  //     taskNameElement.textContent = task;

  //     childDiv.appendChild(taskNumber);
  //     childDiv.appendChild(taskNameElement);
  //     taskContainer.appendChild(childDiv);
  // });
}

function clearField() {
  //document.getElementById("task").value = "";
  input.value = "";
  taskName = "";
}

function deleteTask(index) {
  tasks.splice(index, 1); //remove the 1 task from array in index number
  addItem("tasks", tasks); // Update localStorage
  showTask(tasks); // Refresh the task list
}

showTask(tasks);
const wrapper = document.getElementById("task-list");
wrapper.addEventListener("click", (event) => {
  if (event.target.nodeName === "BUTTON") {
    const buttonId = event.target.id;
    const index = parseInt(buttonId.split("-")[2]);
    deleteTask(index);
  }
});
