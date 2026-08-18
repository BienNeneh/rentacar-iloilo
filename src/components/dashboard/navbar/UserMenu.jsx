import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function UserMenu({ displayName, handleLogout }) {
  const firstName =
    displayName?.trim()?.split(" ")[0] || "User";

  return (
    <>
      {/* User Profile */}
      <div className="flex items-center gap-3 bg-orange-50 rounded-full px-4 py-2">

        <FaUserCircle className="text-5xl text-orange-500" />

        <div>
          <h2 className="font-semibold leading-none text-[#3A2A27]">
            {firstName}
          </h2>

          <p className="text-sm text-gray-500">
            Member
          </p>
        </div>

      </div>

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="
          bg-orange-500
          hover:bg-orange-600
          text-white
          rounded-full
          px-5
          py-3
          font-semibold
          flex
          items-center
          gap-2
          transition
        "
      >
        <FaSignOutAlt />
        Logout
      </button>
    </>
  );
}

export default UserMenu;