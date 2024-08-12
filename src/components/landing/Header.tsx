import { useState, useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useNavigate } from "react-router-dom";
import sits from "../../assets/images/sits.png";
import { Button } from "../ui/button";

const Header = () => {
  const [show, setShow] = useState(false);
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  const reveal = () => setShow(!show);

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <>
      <nav className="fixed top-0 z-20 w-full mx-auto bg-white shadow-sm " ref={parent}>
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={sits} className="size-12" alt="Flowbite Logo"></img>
          </a>
          <div className="flex gap-4 space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleLoginClick}
              className="transition hover:scale-105 hover:text-primary"
            >
              Iniciar Sesión
            </button>
            <Button onClick={handleRegisterClick} className="transition hover:scale-105 hover:bg-yellow-500">Registrarse</Button>
            {/* Boton responsive */}
            <button
              onClick={reveal}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center justify-center w-10 h-10 p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 mt-4 -mr-32 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#home"
                  className="block px-3 py-2 text-white rounded md:bg-transparent md:text-yellow-500 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Novedades
                </a>
              </li>
              <li>
                <a
                  href="#us"
                  className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>
        {show && (
          <div className="pb-5 dropdown-content">
            <ul>
              <li>
                <a
                  href="#home"
                  className="block px-3 py-2 mx-5 rounded-md hover:bg-gray-200"
                  aria-current="page"
                >
                  Inicio
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="#news"
                  className="block px-3 py-2 mx-5 rounded-md hover:bg-gray-200"
                  aria-current="page"
                >
                  Novedades
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="#home"
                  className="block px-3 py-2 mx-5 rounded-md hover:bg-gray-200"
                  aria-current="page"
                >
                  Nosotros
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;
