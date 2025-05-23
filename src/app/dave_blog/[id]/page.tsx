import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const TodoDetails = dynamic(() => import("@/dave_screens/blog/todoDetails"));
const Todo = () => {
  return <TodoDetails />;
};

export default Todo;
