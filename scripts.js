// Load tasks from localStorage or use default
const defaultTasks = [
  {
    id: 1,
    title: "Launch Epic Career🚀",
    description: "",
    status: "todo",
  },
  {
    id: 2,
    title: "Conquer React⚛️",
    description: "",
    status: "todo",
  },
  {
    id: 3,
    title: "Understand Databases⚙️",
    description: "",
    status: "todo",
  },
  {
    id: 4,
    title: "Crush Frameworks🖼️",
    description: "",
    status: "todo",
  },
  {
    id: 5,
    title: "Master JavaScript💛",
    description: "",
    status: "doing",
  },
  {
    id: 6,
    title: "Never Give Up🏆",
    description: "",
    status: "doing",
  },
  {
    id: 7,
    title: "Explore ES6 Features🚀",
    description: "",
    status: "done",
  },
  {
    id: 8,
    title: "Have fun 🥳",
    description: "",
    status: "done",
  },
];

let initialTasks = [];
if (localStorage.getItem("kanbanTasks")) {
  initialTasks = JSON.parse(localStorage.getItem("kanbanTasks"));
} else {
  initialTasks = defaultTasks;
}

let currentTask;
var todoDiv = document.getElementById("todo-tasks");
var doingDiv = document.getElementById("doing-tasks");
var doneDiv = document.getElementById("done-tasks");
updateCanban();

// This function updates the canban columns
function updateCanban() {
  todoDiv.innerHTML = "";
  doingDiv.innerHTML = "";
  doneDiv.innerHTML = "";

  initialTasks.forEach((task) => {
    // Create new tasks element
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-div";
    taskDiv.setAttribute("id", task.id);
    taskDiv.innerText = task.title;
    taskDiv.onclick = () => {
      setUpdateTaskValues(taskDiv.getAttribute("id"));
    };

    if (task.status === "todo") {
      todoDiv.appendChild(taskDiv);
    } else if (task.status === "doing") {
      doingDiv.appendChild(taskDiv);
    } else if (task.status === "done") {
      doneDiv.appendChild(taskDiv);
    }
  });
}

function openAddTaskModal() {
  // Reset input fields
  const modal = document.getElementById("task-modal1");
  if (modal) {
    modal.showModal();
  }
}
// Adds a new task by asking the user for input.
// Only allows 'todo', 'doing', or 'done' as status values.
function addTask() {
  const taskTitle = document.getElementById("add-task-title").value;
  const taskDescription = document.getElementById("add-task-description").value;
  const taskStatus = document.getElementById("add-task-status").value;

  const newTask = {
    id: initialTasks.length + 1, // Auto-increment ID based on task count
    title: taskTitle,
    description: taskDescription,
    status: taskStatus,
  };

  initialTasks.push(newTask); // Add the task to the array

  updateCanban();

  document.getElementById("add-task-title").value = "";
  document.getElementById("add-task-description").value = "";
  document.getElementById("add-task-status").value = "todo";
}

function setUpdateTaskValues(taskId) {
  currentTask = initialTasks.find((task) => task.id === +taskId);
  console.log(currentTask);
  document.getElementById("edit-task-title").value = currentTask.title;
  document.getElementById("edit-task-description").value =
    currentTask.description;
  document.getElementById("edit-task-status").value = currentTask.status;
  // Open modal
  const modal = document.getElementById("task-modal");
  if (modal) {
    modal.showModal();
  }
}

function closeModal() {
  const addModal = document.getElementById("task-modal1");
  if (addModal) {
    addModal.close();
  }
  const modal = document.getElementById("task-modal" || "task-modal1");
  if (modal) {
    modal.close();
  }
  console.log("All tasks: ", initialTasks);
  console.log("Completed tasks: ", getCompletedTasks());
}

function updateTask() {
  currentTask.title = document.getElementById("edit-task-title").value;
  currentTask.description = document.getElementById(
    "edit-task-description"
  ).value;
  currentTask.status = document.getElementById("edit-task-status").value;

  updateCanban();
}

// Keep adding tasks until there are 6 in total
const getCompletedTasks = () =>
  initialTasks.filter((task) => task.status === "done");

// Display tasks in the console
console.log("All tasks: ", initialTasks);
console.log("Completed tasks: ", getCompletedTasks());
