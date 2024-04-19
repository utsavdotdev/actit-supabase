import fs from "fs";
import {
  intro,
  outro,
  spinner,
  isCancel,
  cancel,
  text,
  multiselect,
  note,
} from "@clack/prompts";
import color from "picocolors";
import { getPhrase } from "../utils/phares.js";
import { setTimeout as sleep } from "node:timers/promises";

const tasksFile = "tasks.json";
const words = getPhrase();
let tasks = [];

export const loadTasks = () => {
  try {
    const data = fs.readFileSync(tasksFile);
    tasks = JSON.parse(data);
  } catch (err) {
    tasks = [];
    saveTasks();
  }
};

export const saveTasks = () => {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
};

export const addTask = async () => {
  console.log();
  intro(color.inverse("actit add"));
  const taskDescription = await text({
    message: "Enter the your next task",
    placeholder: "Task description",
  });

  if (isCancel(taskDescription)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }
  const newTask = {
    task: taskDescription,
    completed: false,
    created: new Date().toLocaleString(),
    done: null,
  };

  tasks.push(newTask);
  saveTasks();

  const s = spinner();
  s.start("Adding task");

  await sleep(500);

  s.stop("Task added successfully");

  outro(words);
};

export const listTasks = (showTime) => {
  console.log();
  if (tasks.length === 0) {
    console.log(color.yellow(color.bold("No tasks found.")));
  } else {
    intro(color.inverse("actit list"));
    let tasksList = [];
    tasks.forEach((task, index) => {
      const status = task.completed
        ? color.green(color.bold("[✔]"))
        : color.red(color.bold("[ ]"));
      let taskInfo = `${index + 1}. ${status} ${task.task}`;
      if (showTime) {
        taskInfo += color.gray(` (Created: ${task.created}`);
        if (task.completed) {
          taskInfo += color.gray(`, Done: ${task.done})`);
        } else {
          taskInfo += color.gray(")");
        }
      }
      tasksList.push(taskInfo);
    });
    note(tasksList.join("\n"), "Todos", {
      dim: false,
    });
    outro(words);
  }
};

export const completeTask = async () => {
  console.log();
  intro(color.inverse("actit done"));
  if (tasks.length === 0) {
    outro("No tasks found.");
    return;
  }
  //if there are no tasks to complete show a message
  if (tasks.filter((task) => !task.completed).length === 0) {
    outro("Wow! You've completed all your tasks. Great job!");
    return;
  }
  const task = await multiselect({
    message: "Select a task to mark as done",
    options: tasks
      .filter((task) => !task.completed)
      .map((task, index) => ({ label: task.task, value: index })),
  });

  if (isCancel(task)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  if (task.length === 0) {
    outro("No task selected.");
    return;
  }

  task.forEach((index) => {
    tasks[index].completed = true;
    tasks[index].done = new Date().toLocaleString();
  });

  saveTasks();

  const s = spinner();
  s.start(`Marking ${task.length} task as completed`);

  await sleep(500);

  s.stop("Task completed");

  outro(words);
};

export const deleteTask = async () => {
  console.log();
  intro(color.inverse("actit delete"));
  if (tasks.length === 0) {
    outro("No tasks found.");
    return;
  }
  const task = await multiselect({
    message: "Select a task to delete",
    options: tasks.map((task, index) => ({
      label: task.task,
      value: index,
    })),
  });

  if (isCancel(task)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  if (task.length === 0) {
    outro("No task selected.");
    return;
  }

  task.forEach((index) => {
    tasks.splice(index, 1);
  });
  saveTasks();

  const s = spinner();
  s.start(`Deleting ${task.length} task `);

  await sleep(500);

  s.stop("Task deleted");

  outro(words);
};

export const login = async () => {
  console.log();
  intro(color.inverse("actit login"));
  const apiKey = await text({
    message: "Enter the your Api key",
    placeholder: "ctodo-api-key",
  });

  if (isCancel(apiKey)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  const res = await fetch(`http://localhost:3000/api/auth/${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status === 404) {
    cancel("Invalid API key");
    return process.exit(0);
  }

  const user = await res.json();
  fs.writeFileSync("user.json", JSON.stringify(user, null, 2));

  outro("Happy tasking!");
};
