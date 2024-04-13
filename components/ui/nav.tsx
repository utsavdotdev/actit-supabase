import React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

const nav = () => {
  return (
    <>
      <div className="w-full flex justify-center items-center p-4">
        <div className="w-full sm:w-4/5 rounded-lg h-16 border-[2px] flex items-center justify-between px-4 py-2">
          <div className="h-full flex justify-center items-center">
            <p className="text-3xl text-text font-semibold font-pops">
              C<span className="text-highlight">Todo</span>
            </p>
          </div>
          <div className="h-full flex justify-center items-center gap-5">
            <ModeToggle />
            <Button size={"sm"}>
              <Mail className="mr-2 h-4 w-4" /> Login with Gmail
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default nav;
