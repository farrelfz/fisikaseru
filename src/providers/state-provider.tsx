"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { hydrateStores } from "@/store/registry";

interface StateProviderProps {
  children: ReactNode;
}

export function StateProvider({ children }: StateProviderProps) {
  useEffect(() => {
    hydrateStores();
  }, []);

  return <>{children}</>;
}
