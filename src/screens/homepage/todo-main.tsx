import React from "react";
import { TodoItem } from "@/components/todo/todo-item";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function index() {
  return (
    <div className="  flex items-center ">
      <div className="m-auto w-[600px]  ">
        <p className="mb-10 w-full text-center font-bold mt-20 text-4xl">
          TODO LIST{" "}
        </p>
        <div className="flex flex-col gap-4">
          <TodoItem />
          <TodoItem />
          <TodoItem />
          <TodoItem />
        </div>
        <div className=" flex gap-4 mt-10">
          <Input />
          <Button variant="destructive">Button</Button>
        </div>
      </div>
    </div>
  );
}

export default index;
