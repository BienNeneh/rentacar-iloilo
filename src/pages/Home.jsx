// src/pages/Home.jsx

import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import Hero from "../components/home/Hero";
import SearchBar from "../components/home/SearchBar";
import FeaturedCars from "../components/home/FeaturedCars";
import PopularLocations from "../components/home/PopularLocations";
import WhyChooseUs from "../components/home/WhyChooseUs";
import BecomeHost from "../components/home/BecomeHost";
import Testimonials from "../components/home/Testimonials";
import FAQ from "../components/home/FAQ";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <DashboardNavbar />
      <Hero />
      <SearchBar />
      <FeaturedCars />
      <PopularLocations />
      <WhyChooseUs />
      <BecomeHost />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;