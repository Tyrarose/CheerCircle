"use client";

import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";

const Thankyou = () => {
  return (
    <div className="flex flex-col min-h-screen bg-blue-eight">
      <Header />

      <main className="flex flex-grow items-center justify-center">
        <section className="gap-8 items-center text-center">
          thank you
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Thankyou;
