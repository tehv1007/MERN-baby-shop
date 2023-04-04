import { getUser } from "../../services/authService";
import Banner from "./Banner";
import Brand from "./Brand";
import Delivery from "./Delivery";
import Hero from "./Hero";
import TopRatedProducts from "./TopProducts/TopRatedProducts";

const Home = ({ user }) => {
  return (
    <>
      <Banner />
      <Delivery />
      <TopRatedProducts user={user} />
      <Hero />
      <Brand />
    </>
  );
};
export default Home;
