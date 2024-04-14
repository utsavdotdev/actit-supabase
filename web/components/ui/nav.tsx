"use client";

import React, { useState, useEffect } from "react";
import { Github, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { createClient } from "@/utils/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { redirect } from "next/navigation";
import { toast } from "./use-toast";

const nav = ({ session }: any) => {
  const supabase = createClient();
  const [user, setUser] = useState({} as any);
  const loginWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user?.user_metadata);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.reload();
  };

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
            {!session ? (
              <>
                <Button size={"sm"} onClick={loginWithGithub}>
                  <Github className="mr-2 h-4 w-4" /> Login with Github
                </Button>
              </>
            ) : (
              <>
                <div className="flex gap-2 items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Image
                          src={user?.avatar_url}
                          alt="avatar"
                          width={30}
                          height={30}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{user?.full_name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <Button
                    size={"sm"}
                    onClick={logout}
                    variant={"outline"}
                    className="border-none rounded-full p-2"
                  >
                    <LogOut className="h-5 w-5" strokeWidth={"1.25px"} />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default nav;
