"use client";
import React from "react";
import { useToast } from "@/components/ui/use-toast";
import Console from "@/components/ui/console";
import AddAndDisplay from "@/components/ui/addAndDisplay";

const page = () => {
  const [todos, setTodos] = React.useState<any[]>([]);
  const [task, setTask] = React.useState<string>("");

  const { toast } = useToast();

  const submit = (e: any) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        title: task,
        completed: false,
      },
    ]);
    setTask("");
    toast({
      title: "Notification",
      description: "Task added successfully",
    });
  };



  return (
    <>
      <div className="min-h-[calc(100vh-96px)] w-full flex items-center py-8 gap-5 flex-col">
        <div className="w-1/3 h-fit flex flex-col gap-8">
          <div className="border-2 rounded-3xl flex justify-around items-center px-5 py-7 gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-4xl font-pops antialiased font-bold">
                Todo Done
              </p>
              <p className="text-xl font-pops antialiased font-normal px-1">
                Keep it up
              </p>
               <Console />
            </div>
            <div className="bg-highlight rounded-full w-40 h-40 flex justify-center items-center">
              <p className="text-6xl font-pops antialiased font-bold dark:text-neutral-800">
                {todos.filter((todo) => todo.completed).length}/
                {todos.length === null ? 0 : todos.length}
              </p>
            </div>
          </div>
          <AddAndDisplay
            submit={submit}
            setTask={setTask}
            task={task}
            todos={todos}
            setTodos={setTodos}
            toast={toast}
          />
        </div>
      </div>
    </>
  );
};

export default page;
