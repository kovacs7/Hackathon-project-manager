import Faqs from "../components/Home/Faqs";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import NavBar from "../components/NavBar/NavBar";
import { useEffect } from "react";
import useAccountData from "../store/authStore";
import Menu from "../components/Dashboard/Menu";

const Home = () => {
  const { data, getAccountData } = useAccountData();
  useEffect(() => {
    getAccountData();
  }, [getAccountData]);
  return (
    <>
      {data ? (
        <>
          {console.log(data)}
          <Menu />
        </>
      ) : (
        <>
          <NavBar />
          <Hero />
          <Features />
          <Faqs />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
