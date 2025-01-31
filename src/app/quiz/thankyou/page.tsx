"use client";

import { useState, useEffect } from "react";

import Header from "../../../components/organisms/Header";
import Footer from "../../../components/organisms/Footer";

const Thankyou = () => {
  
  return (
    <div className="bg-blue-eight">
      <Header />
      <div className="items-center justify-items-center p-8 pb-20 w-full">
        <main className="gap-8 row-start-2 items-center">
          thank you
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Thankyou;
