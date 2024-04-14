"use client";

import React from "react";
import { TypeAnimation } from "react-type-animation";
import { DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Terminal = () => {
  return (
    <>
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
    </>
  );
};

export default Terminal;
