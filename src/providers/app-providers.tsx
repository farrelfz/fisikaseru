import type { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { SupabaseProvider } from "./supabase-provider";
import { StateProvider } from "./state-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <SupabaseProvider>
        <StateProvider>{children}</StateProvider>
      </SupabaseProvider>
    </ThemeProvider>
  );
}
