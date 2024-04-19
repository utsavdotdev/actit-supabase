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

export const saveApiKey = async (key: string) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: user_data } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user?.id)
    .single();

  if (user_data) {
    const { data, error } = await supabase
      .from("users")
      .update({ api_key: key })
      .eq("user_id", user?.id);
    if (error) {
      return false;
    }
    return JSON.stringify(data);
  }

  const { data, error } = await supabase
    .from("users")
    .insert({ api_key: key, user_id: user?.id })
    .single();
  if (error) {
    return false;
  }
  return JSON.stringify(data);
};

export const getApiKey = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data } = await supabase
    .from("users")
    .select("api_key")
    .eq("user_id", user?.id)
    .single();
  if (data === null) {
    return false;
  }
  return data?.api_key;
};

export const consoleLogin = async (key: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("api_key", key)
    .single();
  console.log(data);
  if (data === null) {
    return 404;
  }
  const { data: res, error } = await supabase
    .from("users")
    .update({ cli: true })
    .eq("api_key", key);
  if (error) {
    return 500;
  }

  const { data: user_data } = await supabase
    .from("users")
    .select("*")
    .eq("api_key", key)
    .single();

  return JSON.stringify(user_data);
};
