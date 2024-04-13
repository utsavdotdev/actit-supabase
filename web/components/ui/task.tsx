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

const Task = ({ data, setTodos, toast }: any) => {
  const { title, completed } = data;
  const [newTask, setNewTask] = React.useState<string>("");
  const mark = () => {
    setTodos((prev: any) =>
      prev.map((todo: any) => {
        if (todo.id === data.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const updateTodo = (id: number, title: string) => {
    if (!title) {
      toast({
        title: "Notification",
        description: "Task is empty",
      });
      return;
    }
    setTodos((prev: any) =>
      prev.map((todo: any) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: title,
          };
        }
        return todo;
      })
    );
    toast({
      title: "Notification",
      description: "Task updated successfully",
    });
  };
  const deleteTodo = (id: number) => {
    setTodos((prev: any) => prev.filter((todo: any) => todo.id !== id));
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
            {title}
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
                    onClick={() => updateTodo(data.id, newTask)}
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
              onClick={() => deleteTodo(data.id)}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Task;
