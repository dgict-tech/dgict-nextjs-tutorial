import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const Blogpage = dynamic(() => import("@/dave_screens/blog"));
const Todo = () => {
  return <Blogpage />;
};

export default Todo;
