"use client";

import { motion } from "framer-motion";
import RegisterForm from "../../components/forms/RegisterForm";


const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow grid place-items-center relative overflow-hidden">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <RegisterForm />
        </motion.div>
      </main>
    </div>
  );
};

export default RegisterPage;
