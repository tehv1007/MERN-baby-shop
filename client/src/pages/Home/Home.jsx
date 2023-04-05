import Banner from "./Components/Banner";
import Brand from "./Components/Brand";
import Delivery from "./Components/Delivery";
import Hero from "./Components/Hero";
import TopRatedProducts from "./Components/TopRatedProducts";

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
