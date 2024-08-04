"use client";

import { IconHexagonLetterY } from "@tabler/icons-react";
import { IconMenu2 } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import { Link } from "react-scroll";
import { useState ,useEffect} from "react";
const links = ["About", "Skills", "Projects", "Connect"];
function Header() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => {};
  }, []);

  return (
    <header
      className={`${loading && "hidden"} bg-bgColor shadow-black shadow-md text-textColor w-full  fixed top-0  z-[100] md:h-[15vh] h-[10vh] flex justify-between items-center px-5 md:px-8`}
    >
      <div>
        <IconHexagonLetterY size={60} color="#64FFDA" stroke={1.25} />
      </div>

      <nav className={`md:flex gap-5 hidden font-mono`}>
        {links.map((el, index) => (
          <Link
            key={index}
            to={el}
            spy={true}
            smooth={true}
            offset={(-15 * window.innerHeight) / 100} // Adjusting offset for the fixed header height
            duration={500}
            className="cursor-pointer text-lg md:text-xl"
          >
            <span className="text-primaryColor">0{index + 1}. </span>
            <span className=" transition-colors duration-500 ease-in-out hover:text-white">
              {el}
            </span>
          </Link>
        ))}
      </nav>
      <div
        className="md:hidden block z-50"
        onClick={() => setOpen((open) => !open)}
      >
        {!open ? (
          <IconMenu2 stroke={2} size={40} />
        ) : (
          <IconX stroke={2} size={40} />
        )}
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-bgColor  transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out md:hidden`}
      >
        <div
          className={`flex flex-col items-center   h-full justify-center gap-y-10 font-mono ${
            open ? "shadow-primaryColor shadow-xl" : ""
          }`}
        >
          {links.map((el, index) => (
            // <a
            //   key={index}
            //   href={`#${el}`}
            //   className="text-lg mb-4 text-textColor"
            //   onClick={() => setOpen(false)}
            // >
            <Link
              key={index}
              to={el}
              spy={true}
              smooth={true}
              offset={(-12 * window.innerHeight) / 100} // Adjusting offset for the fixed header height
              duration={500}
              className="cursor-pointer text-lg mb-4 text-textColor"
              onClick={() => setOpen(false)}
            >
              <p className="text-primaryColor text-center">0{index + 1}. </p>
              <p className="transition-colors duration-500 ease-in-out hover:text-white text-center">
                {el}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
