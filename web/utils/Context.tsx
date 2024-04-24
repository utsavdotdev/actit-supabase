"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

const AppContext = createContext<any>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [user, setUser] = useState({} as any);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user?.user_metadata);
  };
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
