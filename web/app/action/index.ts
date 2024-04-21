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

export const checkApi = async (key: string) => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("api_key", key)
    .single();
  if (data === null) {
    return 404;
  }
  return JSON.stringify(data);
};

export const syncTasks = async (body: any) => {
  const supabase = await createClient();
  const { user, tasks } = body;
  const { data: todos, error }: any = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.user_id);
  if (error) {
    return false;
  }

  if (todos.length === 0) {
    const newTasksWithFields = tasks.map((task: any) => {
      return {
        task: task.task,
        createdAt: task.createdAt,
        completed: task.completed,
        doneAt: task.doneAt,
        user_id: user.user_id,
      };
    });

    newTasksWithFields.forEach(async (task: any) => {
      await supabase.from("todos").insert(task);
    });

    const { data: newTodos, error: newError }: any = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", user.user_id);

    if (newError) {
      return false;
    }

    return JSON.stringify(newTodos);
  }

  //delete the repeated task
  let newTasks:any = [];
  
  newTasks = tasks.filter((task: any) => {
    let repeated = false;
    todos.forEach((todo: any) => {
      if (task.task === todo.task) {
        repeated = true;
      }
    });
    if (!repeated) {
      return task;
    }
  });

  console.log(newTasks)
   if (newTasks.length === 0) {
    return 202;
  }

  const newTasksWithFields = newTasks.map((task: any) => {
    return {
      task: task.task,
      createdAt: task.createdAt,
      completed: task.completed,
      doneAt: task.doneAt,
      user_id: user.user_id,
    };
  });

  newTasksWithFields.forEach(async (task: any) => {
    await supabase.from("todos").insert(task);
  });

  const { data: newTodos, error: newError }: any = await supabase
    .from("todos")
    .select("*")
    .eq("user_id", user.user_id);

  if (newError) {
    return false;
  }

  const resBody = {
    tasks: newTodos,
    syncCount: newTasks.length,
  };

  return JSON.stringify(resBody);
};

export const updateSync = async (key: string) => {
  const supabase = await createClient();
  const time = new Date().toLocaleString();
  console.log(time);
  const { data, error } = await supabase
    .from("users")
    .update({ cli: true, syncAt: time })
    .eq("api_key", key);

  //return the updated user
  const { data: user_data } = await supabase
    .from("users")
    .select("*")
    .eq("api_key", key)
    .single();

  if (error) {
    return false;
  }
  return JSON.stringify(user_data);
};
