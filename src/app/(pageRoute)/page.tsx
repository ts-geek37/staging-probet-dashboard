import { getHome } from "@/api/home";
import Home from "@/modules/home/Home";

const HomePage = async () => {
  const response = await getHome();
  if (!response?.data) return null;

  return <Home initialHome={response} />;
};

export default HomePage;
