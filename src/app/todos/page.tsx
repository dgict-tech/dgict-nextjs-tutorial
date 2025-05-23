import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const TodoHomepage = dynamic(() => import("@/screens/todos"));
const Todo = () => {
  return <TodoHomepage />;
};

export default Todo;
