"use client";

import { useState } from "react";
import Image from "next/image";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-center">
      <form className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-black mb-4 text-left">
          Register to CheerCircle
        </h1>

        {/* Name Input */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <UserIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              id="name"
              placeholder="e.g. mastergamingAXL"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-seven focus:border-yellow-seven"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Email address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <EnvelopeIcon className="h-5 w-5" />
            </span>
            <input
              type="email"
              id="email"
              placeholder="e.g juan@gmail.com"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-seven focus:border-yellow-seven"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <LockClosedIcon className="h-5 w-5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="minimum 8 characters"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-seven focus:border-yellow-seven"
            />

            {/* Eye Icon */}
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 cursor-pointer"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </span>
          </div>
        </div>

        {/* Remember Me Toggle */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 text-black-five border-gray-300 rounded focus:ring-yellow-seven"
          />
          <label
            htmlFor="rememberMe"
            className="ml-2 text-sm text-gray-700 select-none"
          >
            Remember Me
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          className="w-full py-2 bg-yellow-five text-black font-semibold rounded-lg hover:bg-yellow-six transition duration-300 mb-4"
        >
          Register
        </button>

        {/* Already Have an Account? */}
        <p className="text-left text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <div className="flex items-center justify-center">
          <button className="w-full justify-center px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
            <Image
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              width={26}
              height={30}
              loading="lazy"
              alt="google logo"
            />
            <span>Sign in with Google</span>
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} CheerCircle, All rights reserved.
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
