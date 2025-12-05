import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const open = item.id === openId;
        return (
          <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
            >
              <span>{item.title}</span>
              <span className={cn("text-xs", open ? "text-[#4FC3F7]" : "text-white/50")}>{open ? "−" : "+"}</span>
            </button>
            {open ? <div className="border-t border-white/10 px-4 py-3 text-sm text-white/70">{item.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
