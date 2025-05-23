import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const Homepage = dynamic(() => import("@/screens/homepage"));
const Home = () => {
  return <Homepage />;
};

export default Home;
