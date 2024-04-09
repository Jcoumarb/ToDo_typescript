const list = document.querySelector("#list");
const form = document.getElementById("new-task-form");
const input = document.querySelector("#new-task-title");
let tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});
const removeButton = document.getElementById("remove");
removeButton?.addEventListener("click", function() {
  const checkedItems = list?.querySelectorAll("input[type='checkbox']:checked");
  const textRemoving = [];
  checkedItems?.forEach(function(item) {
    const parentElement = item.parentElement;
    parentElement?.remove();
    const taskText = parentElement?.textContent?.trim() || "";
    textRemoving.push(taskText);
  });
  tasks = tasks.filter((item) => !textRemoving.includes(item.title));
  saveTasks();
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null)
    return [];
  return JSON.parse(taskJSON);
}
