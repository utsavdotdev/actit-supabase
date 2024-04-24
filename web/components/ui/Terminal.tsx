"use client";
import React, { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { Copy, DollarSign, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "./button";

const Terminal = () => {
  const [copy, setCopy] = useState(false);
  const cmd = "npm i -g actit-cli";
  const onCopy = () => {
    navigator.clipboard.writeText(cmd);
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };
  return (
    <>
      <div className="hidden sm:flex flex-col gap-2 w-1/2">
        <div className="w-full h-96 bg-zinc-900 rounded-lg">
          <div className="flex items-center gap-2 p-5 cursor-pointer">
            <span className="w-4 h-4 bg-yellow-600 rounded-full hover:bg-yellow-700"></span>
            <span className="w-4 h-4 bg-green-400 rounded-full hover:bg-green-600"></span>
            <span className="w-4 h-4 bg-red-600 rounded-full hover:bg-red-700"></span>
          </div>
          <div className="flex gap-2 items-center px-4 py-2">
            <DollarSign className="h-5 w-5" color="white" />
            <TypeAnimation
              sequence={[
                "actit login",
                1000,
                "actit add",
                1000,
                "actit list",
                1000,
                "actit list -t",
                1000,
                "actit delete",
                1000,
                "actit done",
                1000,
                "actit sync",
                1000,
                "actit logout",
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
        <code className="bg-zinc-900 px-4 py-2 rounded-md flex items-center justify-between">
          <p className="text-white font-fira text-base">{cmd}</p>
          <Button variant="outline" size="sm" className="px-3" onClick={onCopy}>
            {copy ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </code>
      </div>
    </>
  );
};

export default Terminal;
