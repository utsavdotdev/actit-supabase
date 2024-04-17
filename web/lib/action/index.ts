"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export default async function readUserSession() {
  noStore();
  const supabase = await createClient();
  return supabase.auth.getSession();
}
