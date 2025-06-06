/**
 * Default tasks to use if no tasks are found in localStorage.
 */
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

/**
 * The main array holding all tasks.
 */
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

/**
 * Updates the Kanban columns with the current tasks.
 * Clears and repopulates the columns based on task status.
 */
function updateCanban() {
  todoDiv.innerHTML = "";
  doingDiv.innerHTML = "";
  doneDiv.innerHTML = "";

  initialTasks.forEach((task) => {
    /**
     * Create new tasks element
     */
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

/**
 * Opens the modal dialog for adding a new task.
 */
function openAddTaskModal() {
  /**
   * Reset input fields.
   */
  const modal = document.getElementById("task-modal1");
  if (modal) {
    modal.showModal();
  }
}

/**
 * Adds a new task to the task list and updates storage and UI.
 */
function addTask() {
  const taskTitle = document.getElementById("add-task-title").value;
  const taskDescription = document.getElementById("add-task-description").value;
  const taskStatus = document.getElementById("add-task-status").value;

  /**
   * Validate input.
   */
  const newTask = {
    id:
      initialTasks.length > 0
        ? Math.max(...initialTasks.map((t) => t.id)) + 1
        : 1,
    title: taskTitle,
    description: taskDescription,
    status: taskStatus,
  };

  initialTasks.push(newTask); /*Add the task to the array*/

  saveTasksToLocalStorage(); /* Save after adding*/

  updateCanban();

  document.getElementById("add-task-title").value = "";
  document.getElementById("add-task-description").value = "";
  document.getElementById("add-task-status").value = "todo";
}

/**
 * Sets the values in the edit modal for the selected task.
 */
function setUpdateTaskValues(taskId) {
  currentTask = initialTasks.find((task) => task.id === +taskId);
  console.log(currentTask);
  document.getElementById("edit-task-title").value = currentTask.title;
  document.getElementById("edit-task-description").value =
    currentTask.description;
  document.getElementById("edit-task-status").value = currentTask.status;
  /*Open modal.*/
  const modal = document.getElementById("task-modal");
  if (modal) {
    modal.showModal();
  }
}

/**
 * Closes both the add and edit modals.
 */
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

/**
 * Updates the current task with values from the edit modal,
 * saves to localStorage, and updates the UI.
 */
function updateTask() {
  currentTask.title = document.getElementById("edit-task-title").value;
  currentTask.description = document.getElementById(
    "edit-task-description"
  ).value;
  currentTask.status = document.getElementById("edit-task-status").value;

  saveTasksToLocalStorage(); /*Save after editing.*/

  updateCanban();
}

/**
 * Returns all tasks with status 'done'.
 */
const getCompletedTasks = () =>
  initialTasks.filter((task) => task.status === "done");

/**
 * Display tasks in the console
 */
console.log("All tasks: ", initialTasks);
console.log("Completed tasks: ", getCompletedTasks());

/**
 * Saves the current tasks array to localStorage.
 */
function saveTasksToLocalStorage() {
  localStorage.setItem("kanbanTasks", JSON.stringify(initialTasks));
}
