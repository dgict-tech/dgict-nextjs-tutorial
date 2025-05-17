import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const TodoDetails = dynamic(() => import("@/screens/todos/todoDetails"));
const Todo = () => {
  return <TodoDetails />;
};

export default Todo;
