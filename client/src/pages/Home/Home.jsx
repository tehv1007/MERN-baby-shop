import { getUser } from "../../services/authService";
import Banner from "./Banner";
import Brand from "./Brand";
import Delivery from "./Delivery";
import Hero from "./Hero";
import TopratedProducts from "./TopProducts/TopRatedProducts";

const Home = () => {
  return (
    <>
      <Banner />
      <Delivery />
      <TopratedProducts />
      <Hero />
      <Brand />
    </>
  );
};
export default Home;
