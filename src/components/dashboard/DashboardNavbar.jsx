import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

import { FaBars } from "react-icons/fa";

import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNavigation from "./navbar/DesktopNavigation";
import NotificationBell from "./navbar/NotificationBell";
import UserMenu from "./navbar/UserMenu";
import MobileDrawer from "./navbar/MobileDrawer";

function DashboardNavbar() {
  const navigate = useNavigate();

  const {
    user,
    userProfile,
    displayName,
  } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await signOut(auth);

      setMenuOpen(false);

      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);

      alert("Failed to logout.");
    }
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <nav
        className="
          sticky
          top-0
          z-50
          backdrop-blur-xl
          bg-white/85
          border-b
          border-orange-100
          shadow-lg
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            lg:px-8
            py-4
            flex
            justify-between
            items-center
          "
        >

          {/* =========================
              LOGO
          ========================= */}

          <NavbarLogo />


          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}

          <div className="hidden lg:flex items-center gap-12">

            <DesktopNavigation user={user} />


            {/* =========================
                DESKTOP RIGHT SIDE
            ========================= */}

            <div className="relative flex items-center gap-5">

              {user ? (
                <>
                  {/* Notifications */}

                  <NotificationBell user={user} />


                  {/* User */}

                  <UserMenu
                    displayName={displayName}
                    handleLogout={handleLogout}
                  />
                </>
              ) : (
                <>
                  {/* Sign In */}

                  <Link
                    to="/login"
                    className="
                      font-semibold
                      hover:text-orange-500
                      transition
                    "
                  >
                    Sign In
                  </Link>


                  {/* Get Started */}

                  <Link
                    to="/register"
                    className="
                      bg-orange-500
                      hover:bg-orange-600
                      text-white
                      px-5
                      py-3
                      rounded-full
                      font-semibold
                      transition
                    "
                  >
                    Get Started
                  </Link>
                </>
              )}

            </div>

          </div>


          {/* =========================
              MOBILE ACTIONS
          ========================= */}

          <div
            className="
              lg:hidden
              flex
              items-center
              gap-2
            "
          >

            {/* Mobile Notification */}

            {user && (
              <NotificationBell user={user} />
            )}


            {/* Mobile Menu */}

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="
                w-11
                h-11
                rounded-full
                bg-orange-50
                flex
                items-center
                justify-center
                text-orange-500
                hover:bg-orange-100
                transition
              "
            >
              <FaBars />
            </button>

          </div>

        </div>
      </nav>


      {/* =========================
          MOBILE DRAWER
      ========================= */}

      <MobileDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        user={user}
        userProfile={userProfile}
        handleLogout={handleLogout}
      />
    </>
  );
}

export default DashboardNavbar;