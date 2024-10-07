import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import avatar from "../../data/avatar.jpg";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaTimes } from "react-icons/fa"; // Import the close icon
import { links } from "../../data/dummy.jsx";
import { useStateContext } from "../../context/ContextProvider.jsx";
import UserProfile from "./UserProfile";
import { useRef, useEffect } from "react";

const Sidebar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    screenSize,
    handleClick,
  } = useStateContext();

  const dropdownRef = useRef(null); // Reference for the dropdown

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-2 pl-4 py-2 rounded-lg text-md m-1";
  const normalLink =
    "flex items-center gap-2 pl-4 py-2 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-1 transition-all duration-100";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClicked({ ...isClicked, userProfile: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClicked]);

  return (
    <div className="ml-3 h-screen md:over md:hover:overflow-auto overflow-hidden flex flex-col justify-between">
      {activeMenu && (
        <>
          {/* Header Section */}
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex tracking-tight font-bold dark:text-white text-blue-800"
            >
              <SiShopware /> <span className="text-blue-800">CataLog</span>
            </Link>
          </div>

          {/* Links Section */}
          <div className="mt-5 mb-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-[#2e2d2e] m-2 font-semibold uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`${link.name}`}
                    key={link.name}
                    onClick={handleCloseSidebar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Profile Section */}
      <div className="relative mt-4 mb-6 flex items-center gap-2 cursor-pointer p-2 hover:bg-light-gray rounded-lg" onClick={() => handleClick("userProfile")}>
        <img className="rounded-full w-8 h-8" src={avatar} alt="profile" />
        <div className="flex items-center">
          <p>
            <span className="text-gray-400 text-14">Hi,</span>
            <span className="text-gray-400 text-14 font-bold ml-1 ">
              Priyansh
            </span>
          </p>
          <span><MdKeyboardArrowDown /></span>
        </div>

        {/* UserProfile Dropdown */}
        {isClicked.userProfile && (
          <div ref={dropdownRef} className="absolute right-0 -top-20 bg-gray-200 shadow-lg p-4 rounded-lg z-50 w-full pb-2">
            <UserProfile />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
