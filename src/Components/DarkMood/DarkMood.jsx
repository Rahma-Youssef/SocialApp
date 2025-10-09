import { Icon } from "@iconify-icon/react";
import { useState, useEffect } from "react";


function DarkMood() {
  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
    localStorage.setItem("theme", !darkMode ? "dark" : "light");
  }


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="flex items-center justify-center  transition-colors duration-300">
      <button
        onClick={toggleDarkMode}
        className="w-[40px] h-[40px] rounded-full flex items-center justify-center dark:text-gray-900 cursor-pointer transition-all duration-500"
      >
        {darkMode ? <Icon icon="line-md:sunny-filled-loop" width="34" height="34" style={{ color: " #fce000" }} />: <Icon icon="line-md:moon-alt-loop" width="30" height="30" />}
      </button>
    </div>
  );
}

export default DarkMood;
