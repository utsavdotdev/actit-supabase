"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Play, Check, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
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
          <div className="hidden sm:block w-1/2 h-96 bg-zinc-900 rounded-lg">
            <div className="flex items-center gap-2 p-5 cursor-pointer">
              <span className="w-4 h-4 bg-yellow-600 rounded-full hover:bg-yellow-700"></span>
              <span className="w-4 h-4 bg-green-400 rounded-full hover:bg-green-600"></span>
              <span className="w-4 h-4 bg-red-600 rounded-full hover:bg-red-700"></span>
            </div>
            <div className="flex gap-2 items-center px-4 py-2">
              <DollarSign className="h-5 w-5" color="white" />
              <TypeAnimation
                sequence={[
                  "ctodo login",
                  1000,
                  "ctodo add Buy Groceries",
                  1000,
                  "ctodo list",
                  1000,
                  "ctodo list -t",
                  1000,
                  "ctodo delete 1",
                  1000,
                  "ctodo done 1",
                  1000,
                  "ctodo sync",
                  1000,
                  "ctodo logout",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{
                  fontSize: "20px",
                  fontFamily: "Fira Code",
                  color: "white",
                }}
                repeat={Infinity}
              />
            </div>
            <div className="flex flex-col gap-2 px-4 py-2">
              <Skeleton className="w-1/2 h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
              <Skeleton className="w-4/5 h-[20px] rounded-full" />
              <Skeleton className="w-3/4 h-[20px] rounded-full" />
              <Skeleton className="w-1/2 h-[20px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
