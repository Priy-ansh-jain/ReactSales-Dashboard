
import { FaSignOutAlt } from "react-icons/fa"; // Import icons
import { CiSettings } from "react-icons/ci";

import { useStateContext } from "../../context/ContextProvider.jsx";

const UserProfile = () => {
  const { setIsClicked } = useStateContext(); // Access context to manage dropdown state

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing tokens, redirecting, etc.)
    console.log("Logging out...");
    // You can add your logout functionality here
    setIsClicked({ userProfile: false }); // Close dropdown after logout
  };

  const handleEditProfile = () => {
    // Logic for editing the profile (e.g., redirecting to edit page)
    console.log("Editing profile...");
    setIsClicked({ userProfile: false }); // Close dropdown after edit
    // You can add your navigation logic here
  };

  return (
    <div className="flex items-center justify-center  shadow-md rounded-lg ">

      {/* Edit Profile Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-light-gray transition duration-200 mt-2"
      >
        <CiSettings className="text-black-600 font-bold" />
        <span>Setting</span>
      </button>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-light-gray transition duration-200 mt-2"
      >
        <FaSignOutAlt className="text-red-600" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default UserProfile;
