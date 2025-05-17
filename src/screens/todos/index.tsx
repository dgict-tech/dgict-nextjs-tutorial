// import React from "react";
// import { TodoItem } from "@/components/todo/todo-item";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// function index() {

//   return (
//     <div className="  flex items-center ">
//       <div className="m-auto w-[600px]  ">
//         <p className="mb-10 w-full text-center font-bold mt-20 text-4xl">
//           TODO LIST{" "}
//         </p>
//         <div className="flex flex-col gap-4">
//           <TodoItem />
//           <TodoItem />
//           <TodoItem />
//           <TodoItem />
//         </div>
//         <div className=" flex gap-4 mt-10">
//           <Input />
//           <Button variant="destructive">Button</Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default index;

"use client";

import React, { useState } from "react";
import { TodoItem } from "@/components/todo/todo-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  

  return (
    <div className="flex items-center">
      <div className="m-auto w-[600px]">
        <p className="mb-10 w-full text-center font-bold mt-20 text-4xl">
          TODO LIST
        </p>

        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleComplete(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </div>

        <div className="flex gap-4 mt-10">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <Button variant="default" onClick={addTodo}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TodoPage;
