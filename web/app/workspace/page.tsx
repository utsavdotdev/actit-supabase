import React from "react";
import readUserSession from "@/lib/action";
import { redirect } from "next/navigation";
import TodoSection from "@/components/ui/TodoSection";

export default async function Page() {

  const { data } = await readUserSession();
  if (!data.session) {
    redirect("/");
  }


  return (
    <>
      <div className="min-h-[calc(100vh-96px)] w-full flex items-center py-8 gap-5 flex-col">
        <div className="w-1/3 h-fit flex flex-col gap-8">
         <TodoSection />
        </div>
      </div>
    </>
  );
};

