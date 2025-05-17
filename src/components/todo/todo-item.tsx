// "use client";

// import { Checkbox } from "@/components/ui/checkbox";

// export function TodoItem() {
//   return (
//     <div className="flex p-6 bg-amber-100 items-center space-x-2">
//       <Checkbox id="terms" />
//       <label
//         htmlFor="terms"
//         className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//       >
//       Learn nextjs app routing
//       </label>
//     </div>
//   );
// }

// components/todo/todo-item.tsx

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex justify-between items-center p-6 bg-amber-100 rounded">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`todo-${todo.id}`}
          checked={todo.completed}
          onCheckedChange={onToggle}
        />
        <label
          htmlFor={`todo-${todo.id}`}
          className={`text-md font-medium leading-none ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
        >
          <Link href={`/todos/${todo.id}`}>{todo.text}</Link>
        </label>
      </div>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700">
        ✕
      </button>
    </div>
  );
}
