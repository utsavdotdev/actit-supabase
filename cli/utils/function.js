import fs from "fs";
import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
  multiselect,
} from "@clack/prompts";
import color from "picocolors";
import chalk from "chalk";
import { setTimeout as sleep } from "node:timers/promises";

const tasksFile = "tasks.json";
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

  await sleep(1000);

  s.stop("Task added successfully");

  outro("You're all set!");
};

export const listTasks = (showTime) => {
  console.log();
  if (tasks.length === 0) {
    console.log(chalk.yellow.bold("No tasks found."));
  } else {
    console.log(chalk.blue.bold("List of tasks:"));
    tasks.forEach((task, index) => {
      const status = task.completed
        ? chalk.green.bold("[✔]")
        : chalk.red.bold("[ ]");
      let taskInfo = `${index + 1}. ${status} ${task.task}`;
      if (showTime) {
        taskInfo += chalk.gray(` (Created: ${task.created}`);
        if (task.completed) {
          taskInfo += chalk.gray(`, Done: ${task.done})`);
        } else {
          taskInfo += chalk.gray(")");
        }
      }
      console.log(taskInfo);
    });
  }
};

export const completeTask = async () => {
  console.log();
  intro(color.inverse("actit done"));
  if (tasks.length === 0) {
    outro("No tasks found.");
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

  await sleep(1000);

  s.stop("Task completed");

  outro("You're all set!");
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

  await sleep(1000);

  s.stop("Task deleted");

  outro("You're all set!");
};
