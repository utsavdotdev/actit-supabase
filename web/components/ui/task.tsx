"use client";
import React from "react";
import { Copy, SquarePen, Check, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "./input";
import { Label } from "./label";
import { updateTask, updateTodoById, deleteTodoById } from "@/app/action";

const Task = ({ data, setTodos, toast,trigger,setTrigger }: any) => {
  const { task, completed, user_id, id } = data;

  const [newTask, setNewTask] = React.useState<string>("");
  const mark = async () => {
    try { 
      const res = await updateTodoById(id, !completed);
      if (!res) {
        throw Error;
      }
      setTrigger(!trigger);
      toast({
        title: "Notification",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Notification",
        description: "Failed to mark todo",
      });
    }
  };

  const updateTodo = async (task: string) => {
    if (!task) {
      toast({
        title: "Notification",
        description: "Task is empty",
      });
      return;
    }

    try {
      const res = await updateTask(id, task);
      if (!res) {
        throw Error;
      }
      setTrigger(!trigger);
      toast({
        title: "Notification",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Notification",
        description: "Failed to update todo",
      });
    }
  };
  const deleteTodo = async (task_id: number) => {
    try {
      const res = await deleteTodoById(task_id);
      if (!res) {
        throw Error;
      }
      setTrigger(!trigger);
      toast({
        title: "Notification",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Notification",
        description: "Failed to delete todo",
      });
    }
  };
  return (
    <>
      <div className="w-full h-14 border-2 rounded-lg flex items-center justify-between px-4">
        <div className="flex items-center gap-3 w-2/3 px-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={
                    completed
                      ? "rounded-full h-6 w-6 bg-green-500 shrink-0 cursor-pointer"
                      : "rounded-full h-6 w-6 border-[2px] border-highlight shrink-0 cursor-pointer"
                  }
                  onClick={mark}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{completed ? "Unmark" : "Mark"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p
            className={
              completed
                ? "truncate overflow-hidden text-pretty text-xl font-medium dark:text-neutral-200 line-through"
                : "truncate overflow-hidden text-pretty text-xl font-medium dark:text-neutral-200"
            }
          >
            {task}
          </p>
        </div>
        <div className="flex items-center gap-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                size="icon"
                className="border-none rounded-full"
              >
                <SquarePen className="h-6 w-6" strokeWidth={"1.25px"} />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Task</DialogTitle>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Task
                  </Label>
                  <Input
                    id="task"
                    placeholder="Enter your updated task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    onClick={() => updateTodo(newTask)}
                  >
                    Update
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant={"outline"}
            size="icon"
            className="border-none rounded-full"
          >
            <Trash
              className="h-6 w-6"
              strokeWidth={"1.25px"}
              onClick={() => deleteTodo(id)}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Task;
