import { v4 as uuidV4 } from "uuid";

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");

type Task = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: Date;
};

const loadTasks = (): Task[] => {
    const response = localStorage.getItem("TASKS");
    if (!response) return [];

    return JSON.parse(response);
};

const addListItem = (task: Task) => {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.checked = task.completed;

    checkbox.addEventListener("click", e => {
        task.completed = checkbox.checked;
        saveTasks();
    });

    label.append(checkbox, task.title);
    item.append(label);

    list?.append(item);
};

const tasks: Task[] = loadTasks();
// inital page load
tasks.forEach(task => addListItem(task));

const saveTasks = () => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
};

form?.addEventListener("submit", e => {
    e.preventDefault();

    if (input?.value === "" || !input?.value) return;

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    };

    addListItem(newTask);

    tasks.push(newTask);

    // update local storage
    saveTasks();

    input.value = "";
});
