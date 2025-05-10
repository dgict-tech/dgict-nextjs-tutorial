"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function TodoItem() {
  return (
    <div className="flex p-6 bg-amber-100 items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
      Learn nextjs app routing
      </label>
    </div>
  );
}
