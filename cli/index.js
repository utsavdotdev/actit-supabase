import { program } from "commander";
import {
  loadTasks,
  addTask,
  listTasks,
  completeTask,
  deleteTask,
} from "./utils/function.js";

loadTasks();

program
  .command("add")
  .description("Add a new task")
  .action(() => {
    addTask();
  });

program
  .command("list")
  .description("List all tasks")
  .option("-t, --time", "Show time information")
  .action((cmd) => {
    listTasks(cmd.time);
  });

program
  .command("done")
  .description("Mark a task as completed")
  .action(() => {
    completeTask();
  });

program
  .command("delete")
  .description("Delete a task")
  .action(() => {
    deleteTask();
  });

program.parse(process.argv);
