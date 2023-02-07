"use strict";

// ----------------- HTML ELEMENTS -----------------------

const toast = document.querySelector(".toast");
const notif = document.querySelector("#notif");
const notifText = document.querySelector(".notif-text");
const submitform = document.querySelector("#submitform");
const taskTitle = document.querySelector("#task");
const doneTask = document.querySelector("#done");
const progressTask = document.querySelector("#progress");
const mainList = document.querySelector(".list");
const delTask = document.querySelectorAll("#del");
const editTask = document.querySelectorAll("#edit");
const checkTask = document.querySelectorAll("#check");
const editedInput = document.querySelector("#editInp");
const editedButton = document.querySelector("#editBtn");
const mainModal = document.querySelector(".main-modal");

// ----------------- TASK LIST -----------------------

let task = [];
// localStorage.setItem("tasks", JSON.stringify(task))

// ----------------- DYNAMIC TASK LIST RENDERING -----------------------

function renderTaskList(tasklist) {
  mainList.innerHTML = "";
  if (tasklist.length) {
    tasklist.forEach((task) => {
      let content = `
                <p class="text-[#5a5a5a]">${task.title}</p>
                <div class="btn-group flex justify-between">
                  <i data-del="${
                    task.id
                  }" class="del bx bx-trash text-red-400 text-2xl mx-2 cursor-pointer active:text-red-500" ></i>
                  <i data-edit="${
                    task.id
                  }" class="edit bx bxs-edit text-yellow-400 text-2xl mx-2 cursor-pointer active:text-yellow-500" ></i>
                  <i data-check="${
                    task.id
                  }" class="check bx bx-check-circle text-2xl mx-2 cursor-pointer ${
        task.status
          ? "text-green-400  active:text-green-600"
          : "text-black active:text-[#3a3a3a]"
      }" ></i>
                </div>`;

      const taskItem = createElement(
        "li",
        "list__item w-full p-3 flex justify-between shadow-lg text-lg rounded-md mb-3",
        content
      );
      mainList.append(taskItem);
    });
  } else {
    mainList.innerHTML =
      "<h2 class='text-center text-xl text-red-600'>NOT FOUND</h2>";
  }
}

// ----------------- TASK LIST PROGRESS -----------------------

function countProgress() {
  doneTask.textContent = task.filter((task) => task.status).length;
  progressTask.textContent = task.filter((task) => !task.status).length;
}

// ----------------- RENDER AND COUNT  -----------------------

function renderAndCount() {
  renderTaskList(task);
  countProgress();
}

renderAndCount();

// ----------------- ADD NEW TASK  -----------------------

function addNewTask() {
  const title = taskTitle.value;
  const newTask = {
    id: Date.now(),
    title,
    status: false,
  };

  const check = {
    title: newTask.title.trim().length === 0,
  };

  if (check.title) {
    alert("Please enter a title for this task");
  } else {
    task.push(newTask);
    taskTitle.value = "";
  }
}

submitform.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask();
  notification("added", "green");
  renderAndCount();
});

// ----------------- TASK BTN ACTIONS   -----------------------

function notification(text, color) {
  toast.classList.add("translate-x-0", "duration-1000");

  notifText.textContent = text;
  toast.classList.add(`bg-${color}-500`);
  toast.classList.remove(`bg`);

  setTimeout(function () {
    toast.classList.remove("translate-x-0", "duration-1000");
    toast.classList.add("translate-x-72", "duration-1000");
  }, 2000);
}

// ----------------- TASK BTN ACTIONS   -----------------------
mainList.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    const id = e.target.getAttribute("data-del");
    task = task.filter((t) => t.id != id);
    notification("delited", "red");

    renderAndCount();
  } else if (e.target.classList.contains("check")) {
    const id = e.target.getAttribute("data-check");
    let box = false;
    if (e.target.classList.contains("text-black")) {
      box = true;
    }
    task.forEach((t) => {
      if (t.id == id) t.status = box;
    });
    notification("checked", "green");

    renderAndCount();
  } else if (e.target.classList.contains("edit")) {
    mainModal.classList.remove("hidden");
    const dataID = e.target.getAttribute("data-edit");
    const { title, id } = task.filter((t) => t.id == dataID)[0];
    editedInput.value = title;
    editedButton.dataset.id = id;
  }
});

// ----------------- EDIT BUTTON ACTION  -----------------------

editedButton.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");
  editedTask(id, editedInput.value);
});

// ----------------- EDIT TASK  -----------------------

function editedTask(id, title) {
  task.forEach((t) => {
    if (t.id == id) t.title = title;
    console.log(t.title);
  });
  mainModal.classList.add("hidden");
  notification("edited", "yellow");
  renderAndCount();
}

// ----------------- ADD HIIDEN PROPERTY  -----------------------

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("main-modal"))
    mainModal.classList.add("hidden");
});
