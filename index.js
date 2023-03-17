const input = document.querySelector('input[type="text"]')
const taskList = document.querySelector(".tasks")
const form = document.querySelector("form")

// Load tasks from local storage on page load
loadTasks()

function addToList(input) {
  const task = document.createElement("li")
  task.className = "task"
  task.innerHTML = `
  <input type="checkbox" />
  <label>${input}</label>
  <button class="edit">Edit</button>
  <button class="delete">Delete</button>
`
  taskList.appendChild(task)
  saveTasks()
}

function editListItem(e) {
  let oldLabel = e.target.parentNode.querySelector("label")
  let newLabel = prompt("Enter New Task", oldLabel.innerText)
  if (newLabel !== null) {
    oldLabel.innerText = newLabel
    saveTasks()
    showNotification("Task Edited Succesfully !!!")
  }
}

function removeFromList(e) {
  if (confirm("Do you want to Remove this Task ???")) {
    e.target.parentNode.remove()
    saveTasks()
    showNotification("Task Deleted from List !!!")
  }
}

function showNotification(message) {
  const notification = document.querySelector(".notification")
  notification.textContent = message
  notification.classList.add("show")
  setTimeout(function () {
    notification.classList.remove("show")
  }, 3000)
}

// Retrieve tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || []
  for (const task of tasks) {
    addToList(task)
  }
}

// Save tasks to local storage
function saveTasks() {
  const tasks = []
  for (const task of taskList.querySelectorAll("li")) {
    tasks.push(task.querySelector("label").innerText)
  }
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

handleEvents()
function handleEvents() {
  form.addEventListener("submit", function (e) {
    e.preventDefault()
    if (input.value == "") {
      showNotification("Please Enter Task before Adding !!!")
    } else {
      addToList(input.value)
      input.value = ""
      input.focus()
      showNotification("Task Added to List !!!")
    }
  })

  taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
      editListItem(e)
    }

    if (e.target.classList.contains("delete")) {
      removeFromList(e)
    }
  })
}
