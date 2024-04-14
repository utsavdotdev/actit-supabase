
import React from "react";
import { Play, Check } from "lucide-react";
import readUserSession from "@/lib/action";
import { redirect } from "next/navigation";
import Terminal from "@/components/ui/Terminal";

export default async function Home() {
  const { data } = await readUserSession();
  if (data.session) {
    redirect("/workspace");
  }
  return (
    <>
      <div className="min-h-[calc(100vh-96px)] w-full flex justify-center items-center">
        <div className="w-4/5 h-fit flex justify-between items-center p-4 gap-16">
          <div className="w-3/2 sm:w-1/2 h-96 flex flex-col gap-14 justify-center">
            <div className="text-4xl sm-text-3xl font-fira antialiased font-medium leading-snug tracking-tight">
              Your{" "}
              <span className="underline decoration-highlight decoration-[2px] decoration-wavy">
                Cross-platform
              </span>{" "}
              todo app with{" "}
              <span className="underline decoration-sky-400 decoration-[2px] decoration-wavy">
                Cli-support
              </span>{" "}
              which
            </div>
            <div className="flex justify-evenly items-center gap-2">
              <ul className="text-xl sm:text-2xl font-fira text-balance gap-2 flex flex-col border-2 rounded-xl px-6 py-4 list-none cursor-pointer">
                <li className="flex items-center gap-2">
                  <Check color="lightgreen" className="h-7 w-7" />
                  Create
                  <br />
                </li>
                <li className="flex items-center gap-2">
                  <Check color="lightgreen" className="h-7 w-7" />
                  List
                  <br />
                </li>
                <li className="flex items-center gap-2">
                  <Check color="lightgreen" className="h-7 w-7" />
                  Update
                  <br />
                </li>
                <li className="flex items-center gap-2">
                  <Check color="lightgreen" className="h-7 w-7" />
                  Delete
                  <br />
                </li>
                <li className="flex items-center gap-2">
                  <Check color="lightgreen" className="h-7 w-7" />
                  Sync
                  <br />
                </li>
              </ul>
              <Play className="h-7 w-7" />
              <div className="border-2 rounded-xl font-fira text-2xl sm:text-3xl px-6 py-3 font-medium cursor-pointer">
                Tasks
              </div>
            </div>
          </div>
          <Terminal/>
        </div>
      </div>
    </>
  );
}
