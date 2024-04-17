import React from "react";
import { Input } from "./input";
import { Button } from "./button";
import { Plus } from "lucide-react";
import Task from "./task";

const AddAndDisplay = ({
  submit,
  setTask,
  task,
  todos,
  setTodos,
  toast,
  trigger,
  setTrigger
}: any) => {

  //sort the complted task to the bottom
  todos.sort((a: any, b: any) => {
    if (a.completed === b.completed) {
      return 0;
    }
    if (a.completed) {
      return 1;
    }
    return -1;
  });
  
  return (
    <>
      <form onSubmit={submit}>
        <div className="flex items-center gap-8 h-12">
          <Input
            type="text"
            placeholder="Write your next task"
            className="h-full rounded-xl font-pops text-base placeholder:font-pops antialiased font-normal text-base px-5 w-full"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <Button
            type="submit"
            className="rounded-full w-16 h-12 p-0 bg-highlight hover:"
          >
            <Plus className="h-7 w-7" />
          </Button>
        </div>
      </form>
      <div className="flex flex-col gap-4">
        {todos.map((todo: [], index:number) => (
          <Task
            key={index}
            data={todo}
            setTodos={setTodos}
            toast={toast}
            trigger={trigger}
            setTrigger={setTrigger}
          />
        ))}
      </div>
    </>
  );
};

export default AddAndDisplay;
