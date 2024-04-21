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
import axios, { all } from "axios";

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
    createdAt: new Date().toLocaleString(),
    doneAt: null,
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
      const status = task.completedAt
        ? color.green(color.bold("[✔]"))
        : color.red(color.bold("[ ]"));
      let taskInfo = `${index + 1}. ${status} ${task.task}`;
      if (showTime) {
        taskInfo += color.gray(` (Created: ${task.createdAt}`);
        if (task.completedAt) {
          taskInfo += color.gray(`, Done: ${task.doneAt})`);
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
  if (tasks.filter((task) => !task.completedAt).length === 0) {
    outro("Wow! You've completed all your tasks. Great job!");
    return;
  }
  const task = await multiselect({
    message: "Select a task to mark as done",
    options: tasks
      .filter((task) => !task.completedAt)
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
    tasks[index].completedAt = true;
    tasks[index].doneAt = new Date().toLocaleString();
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
  try {
    const userFile = fs.readFileSync("user.json");
    if (userFile.byteLength !== 0) {
      outro("You are already logged in");
      return;
    }
  } catch (err) {
    //do nothing
  }
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
  const userData = JSON.stringify(user, null, 2);
  fs.writeFileSync("user.json", userData);

  //show the login message
  note("Login Successfull", "Success");

  outro("Happy tasking!");
};

export const syncTodo = async () => {
  console.log();
  intro(color.inverse("actit sync"));
  const userFile = fs.readFileSync("user.json");
  const taskFile = fs.readFileSync("tasks.json");

  if (userFile.byteLength === 0) {
    cancel("You are not logged in");
    return;
  }
  if (taskFile.byteLength === 0) {
    cancel("No tasks found.");
    return;
  }
  const user = JSON.parse(fs.readFileSync("user.json"));
  const tasks = JSON.parse(fs.readFileSync("tasks.json"));

  const body = {
    user: user,
    tasks: tasks,
  };
  const res = await axios(`http://localhost:3000/api/todo/${user.api_key}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });

  if (res.status === 404) {
    cancel("Invalid API key");
    return process.exit(0);
  }

  if (res.status === 500) {
    cancel("Internal server error");
    return process.exit(0);
  }

  if (res.status === 202) {
    note(`No Task to sync with server`, "Message");
    outro("Happy tasking!");
    return;
  }

  const { usr, allTasks } = res.data;
  const parsedTasks = JSON.parse(allTasks);
  const count = parsedTasks.syncCount;
  fs.writeFileSync("user.json", "");
  fs.writeFileSync("tasks.json", "");
  fs.writeFileSync("user.json", usr);
  fs.writeFileSync("tasks.json", JSON.stringify(parsedTasks.tasks, null, 2));
  note(`Synced ${count} tasks with the server`, "Message");
  outro("Happy tasking!");
};
