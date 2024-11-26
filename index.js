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
    childDiv.id = `div-${i - 1}`;
    childDiv.classList.add("task-item");

    const taskNumber = document.createElement("span");
    taskNumber.classList.add("task-number");
    taskNumber.textContent = `${length - i + 1}. `;

    let taskNameElement = document.createElement("span");
    taskNameElement.classList.add("task-name");
    taskNameElement.id = `task-number-${i-1}`
    taskNameElement.textContent = taskList[i - 1];

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn-delete");
    deleteButton.id = `btn-delete-${i - 1}`;
    deleteButton.textContent = "Delete";

    const editButton = document.createElement("button");
    editButton.classList.add("btn-edit");
    editButton.id = `btn-edit-${i-1}`;
    editButton.textContent = "Edit";

    childDiv.appendChild(taskNumber);
    childDiv.appendChild(taskNameElement);
    childDiv.appendChild(editButton);
    childDiv.appendChild(deleteButton);

    taskContainer.appendChild(childDiv);

    deleteButton.addEventListener("click", deleteEventHandler);
    editButton.addEventListener("click", editEventHandler);
  }
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
function saveTask(index , value){
  tasks[index] = value;
  console.log(value);
  showTask(tasks);

}
function deleteEventHandler(event){
  if (event.target.nodeName === "BUTTON"){
    const buttonId = event.target.id;
    const index = parseInt(buttonId.split("-")[2]);
    deleteTask(index);
  }
  
}

function editEventHandler(event){
    //const childDiv 
    const buttonId = event.target.id;
    const index = parseInt(buttonId.split("-")[2]);
    const childDiv = document.getElementById(`div-${index}`);
    let defaultValue = document.getElementById(`task-number-${index}`).innerText;
    
    //Remove the task which want to edit
    const taskToRemove = document.getElementById(`task-number-${index}`);
    
     // Create an input field for editing
    let newTaskNameElement = document.createElement("input");
    newTaskNameElement.type = "text";
    newTaskNameElement.value = defaultValue;
    
    newTaskNameElement.classList.add("edit-task-input");
    newTaskNameElement.id = `edit-task-${index}`;

    // Replace the Edit button with a Save button
    const editButton = document.getElementById(`btn-edit-${index}`);
    const saveButton = document.createElement("button");
    saveButton.classList.add("btn-save");
    saveButton.id = `btn-save-${index}`;
    saveButton.textContent = "Save";    

    childDiv.replaceChild(newTaskNameElement, taskToRemove);
    childDiv.replaceChild(saveButton, editButton);
    let editTaskName =  defaultValue;
    newTaskNameElement.addEventListener("input", (event) => {
      editTaskName = event.target.value;
      console.log(event.target.value)
    });
    // Handle save operation
    saveButton.addEventListener("click", (event) => 
    {
      saveTask(index, editTaskName);
    });

}
showTask(tasks);

