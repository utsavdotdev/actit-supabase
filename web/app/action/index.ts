"use server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/utils/supabase/server";

export const readTodos = async () => {
  noStore();
  const supabase = await createClient();
  return await supabase.from("todos").select("*");
};

export const createTodo = async (task: string) => {
  const supabase = await createClient();
  const newTask = {
    task: task,
    createdAt: new Date().toLocaleString(),
  };
  const { data, error } = await supabase.from("todos").insert(newTask).single();
  revalidatePath("/workspace");
  return JSON.stringify(data);
};

export const updateTask = async (id: number, task: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .update({ task: task })
    .eq("id", id);
  revalidatePath("/workspace");
  if (error) {
    return false;
  }
  return JSON.stringify(data);
};

export const updateTodoById = async (id: number, completed: boolean) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .update({ completed: completed, doneAt: new Date().toLocaleString() })
    .eq("id", id);
  revalidatePath("/workspace");
  if (error) {
    return false;
  }
  return JSON.stringify(data);
};

export const deleteTodoById = async (id: number) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("todos").delete().eq("id", id);
  revalidatePath("/workspace");
  if (error) {
    return false;
  }
  return JSON.stringify(data);
};
