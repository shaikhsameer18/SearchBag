"use client";
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import Banner from "@/components/Banner";
import FeaturedProduct from "@/components/FeaturedProduct";

const Home = () => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 bg-transparent">
      <div className="space-y-5 md:space-y-12">
        <HeaderSlider />
        <HomeProducts />
        <Banner />
      </div>
    </div>
  );
};

export default Home;
