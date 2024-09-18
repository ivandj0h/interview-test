"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FiSun, FiMoon, FiImage } from "react-icons/fi";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Cek local storage untuk tema yang sudah dipilih
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.classList.add(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-8 flex justify-between items-center">
      {/* Title with Icon */}
      <Link href="/" legacyBehavior>
        <a className="flex items-center text-gray-900 dark:text-white">
          <FiImage className="mr-2 text-gray-900 dark:text-white" />
          Image Upload
        </a>
      </Link>

      {/* Right Section with Buttons */}
      <div className="flex items-center">
        {/* Theme Switch */}
        <button
          onClick={toggleTheme}
          className="flex items-center text-gray-900 dark:text-white rounded-full p-2 transition-all mr-2"
        >
          {theme === "light" ? (
            <FiMoon className="ml-2 text-gray-700 dark:text-white" />
          ) : (
            <FiSun className="ml-2 text-gray-700 dark:text-white" />
          )}
          {theme === "light" ? "Switch to Dark" : "Switch to Light"}
        </button>

        {/* View All Photos Button */}
        <Link href="/photos" legacyBehavior>
          <a className=" text-gray-900 dark:text-white rounded-full p-2 transition-all">
            View All Photos
          </a>
        </Link>
      </div>
    </nav>
  );
}
