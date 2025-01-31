"use client";

import React, { useState } from "react";
import Image from "next/image";

const Header: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="shadow-md">
      <div className="w-full flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/android-chrome-512x512.png"
            alt="CheerCircle Logo"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
          <h1 className="text-2xl font-bold text-gray-800">CheerCircle</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-800">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="sm:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-800"
          >
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 sm:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            {/* Close Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="flex flex-col items-start gap-4 p-4">
            <li>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block text-gray-600 hover:text-gray-800"
                onClick={toggleSidebar}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for Sidebar */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-25 sm:hidden"
        ></div>
      )}
    </header>
  );
};

export default Header;
