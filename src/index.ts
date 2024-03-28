//test of bundler working
import { v4 as uuidV4 } from 'uuid'
console.log(uuidV4())

//this is setting up grabbing the html elements (u can define their TYPES as well) 
//the selector allows you to tell it the type in angle brackets
//getElementById accepts the format of 'as' after to denote type
const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// Local storage of tasks and loading from local storage
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

// Create type called 'Task' (seems like this is the meat and potatoes of typescript)
type Task = {
	id: string
	title: string
	completed: boolean
	createdAt: Date
}

// Event listener for form to detect text input
form?.addEventListener("submit", e => {
	e.preventDefault() //no accidental refresh

	if(input?.value == "" || input?.value == null) return

	//while this isnt't specifically declared as a task it has all the elements so it can be passed to 'addListItem'
	const newTask: Task ={
		id: uuidV4(),
		title: input.value,
		completed: false,
		createdAt: new Date(),
	}

	// Adds new task to new array
	tasks.push(newTask)
       
	addListItem(newTask)
	input.value = ""
})
// The function needs to know the type that task is and you could go through like this and tell it what it needs within the 'object'
// or you could take advantage of that fact that you can create your own type
// function addListItem(task: {id: string, title: string, completed: boolean, createdAt: Date})
function addListItem(task: Task){
	//creates elements to be injected into HTML
	const item = document.createElement("li")
	const label = document.createElement("label")
	const checkbox = document.createElement("input")
	//changes completed boolean of task if checkbox is checked
	checkbox.addEventListener("change", () => {
		task.completed = checkbox.checked
		saveTasks()
	})
	checkbox.type = "checkbox"
	checkbox.checked = task.completed	//if task is completed then the box is checked

	label.append(checkbox, task.title) 	//this puts the checkbox & task titke in a label element together
	item.append(label)	//this puts that label into a list element 
	list?.append(item)	//this puts that list element into the list that we accessed earlier with the querySelector
}

function saveTasks() {
	localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem("TASKS")
	if(taskJSON == null) return []
	return JSON.parse(taskJSON)
}
