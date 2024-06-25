import Logo from "../../assets/Logo.svg";
import { useEffect } from "react";
import useAccountData from "../../store/authStore";

const NavBar = () => {
  const { data, getAccountData } = useAccountData();
  useEffect(() => {
    getAccountData();
  }, [getAccountData]);
  return (
    <>
      <header className="px-4 pb-4 pt-6 text-gray-800" id="nav">
        <div className="container flex justify-between h-16 mx-auto rounded-lg bg-indigo-400 p-6">
          <a
            rel="noopener noreferrer"
            href="/"
            aria-label="Back to homepage"
            className="flex items-center p-2 gap-2"
          >
            <img src={Logo} className="h-8 w-8" />
            <p className="text-white tracking-tighter font-semibold text-lg lg:block hidden">
              Aspire.
            </p>
          </a>
          <div className="relative flex items-center">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                title="Search"
                className="p-1 focus:outline-none focus:ring"
              >
                <svg
                  fill="#6366f1"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 dark:text-gray-800"
                >
                  <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="Search"
              placeholder="Search..."
              className="w-32 py-2 px-2 pl-10 text-sm rounded-md sm:w-auto dark:text-gray-800 focus:dark:bg-gray-100 placeholder:text-center placeholder:text-indigo-500 border border-indigo-500 outline-none"
            />
          </div>

          <div className="flex items-center md:space-x-4">
            {data ? (
              <p className="text-gray-50 text-md md:block hidden font-headerFonts">
                Hi, {data.name} ! <span className="text-2xl">👋</span>
              </p>
            ) : (
              <>
                <a
                  href="/login"
                  type="button"
                  className="hidden px-4 py-1 rounded lg:block bg-white text-indigo-500
              active:bg-indigo-500 active:text-white tracking-tighter"
                >
                  Log in
                </a>
                <a
                  href="/signup"
                  type="button"
                  className="hidden px-4 py-1 rounded lg:block bg-white text-indigo-500
              active:bg-indigo-500 active:text-white tracking-tighter"
                >
                  Register
                </a>
              </>
            )}
            {/* hamburger menu - mobile view */}
            <button title="Open menu" type="button" className="p-4 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
