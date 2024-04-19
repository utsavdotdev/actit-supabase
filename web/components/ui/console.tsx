import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, Copy } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { saveApiKey, getApiKey } from "@/app/action";
import { toast } from "./use-toast";
const Console = () => {
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    fetchKey();
  }, []);

  const fetchKey = async () => {
    try{
      const key = await getApiKey();
      if(!key){
        return;
      }
      setKey(key);
    }
    catch(error){
      console.log(error);
    }
  }


  const onGenerate = async () => {
    try {
      const key = uuidv4();
      const res = await saveApiKey(key);
      if (!res) {
        throw Error;
      }
      setKey(key);
      toast({
        title: "Notification",
        description: "Api Key generated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Notification",
        description: "Failed to generate Api Key",
      });
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="font-pops text-base flex gap-1 my-3"
            size="default"
          >
            Connect Console
            <ChevronRight className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Api Key</DialogTitle>
            <DialogDescription>
              Anyone who has this Api Key will be able to login in console
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Api Key
              </Label>
              <Input id="link" defaultValue={key} readOnly />
            </div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="default" onClick={onGenerate}>
              Generate
            </Button>
            <DialogClose className="flex gap-2">
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Console;
