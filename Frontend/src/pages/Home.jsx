import Faqs from "../components/Home/Faqs";
import Features from "../components/Home/Features";
import Footer from "../components/Home/Footer";
import Hero from "../components/Home/Hero";
import NavBar from "../components/NavBar/NavBar";
import { useEffect } from "react";
import useAccountData from "../store/authStore";
import Project from "../components/Dashboard/Project";

const Home = () => {
  const { data, getAccountData } = useAccountData();
  useEffect(() => {
    getAccountData();
  }, [getAccountData]);
  return (
    <>
      {data ? (
        <>
          <NavBar />
          <Project />
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
