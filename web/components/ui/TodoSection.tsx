"use client";
import React, { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import AddAndDisplay from "@/components/ui/addAndDisplay";
import Console from "@/components/ui/console";
import { createTodo, readTodos } from "@/app/action";

const TodoSection = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [task, setTask] = useState<string>("");
  const [trigger,setTrigger] = useState<boolean>(false);

  const { toast } = useToast();

  useEffect(() => {
    fetchTodos();
  }, [trigger]);

  const fetchTodos = async () => {
    try {
      const { data } = await readTodos();
      if (data) {
        setTodos(data);
      }
    } catch (error) {
      toast({
        title: "Notification",
        description: "Failed to fetch todos",
      });
    }
  };
  const submit = async (e: any) => {
    try {
      e.preventDefault();
      const res = await createTodo(task);
      if (res) {
        setTask("");
        setTrigger(!trigger);
        toast({
          title: "Notification",
          description: "Task added successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Notification",
        description: "Failed to add task",
      });
    }
  };

  return (
    <>
      <div className="border-2 rounded-3xl flex justify-around items-center px-5 py-7 gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-4xl font-pops antialiased font-bold">Todo Done</p>
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
        trigger={trigger}
        setTrigger={setTrigger}
      />
    </>
  );
};

export default TodoSection;
