import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth/AuthProvider";
import {
  Ticket,
  ShoppingBag,
  UserRoundPlus,
  LogOut,
  CalendarPlus,
  Calendar,
  Menu,
  X,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutUser = async () => {
    logout();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navLinkClass = (path: string) =>
    `text-sm font-medium flex items-center gap-1 ${
      isActive(path)
        ? "text-purple-900 font-semibold"
        : "text-black hover:text-purple-700"
    }`;

  const renderLinks = () => {
    if (!user) return null;

    return hasRole("PUBLICUSER") ? (
      <>
        <Link to="/user/home" className={navLinkClass("/user/home")}>
          <Home className="w-4 h-4" /> Home
        </Link>
        <Link to="/user/events" className={navLinkClass("/user/events")}>
          <ShoppingBag className="w-4 h-4" /> Events
        </Link>
        <Link
          to="/user/registrations"
          className={navLinkClass("/user/registrations")}
        >
          <Ticket className="w-4 h-4" /> Registrations
        </Link>
        <Link to="/user/calendar" className={navLinkClass("/user/calendar")}>
          <Calendar className="w-4 h-4" /> Calendar
        </Link>
      </>
    ) : (
      <>
        <Link
          to="/admin/dashboard"
          className={navLinkClass("/admin/dashboard")}
        >
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </Link>
        <Link to="/admin/events" className={navLinkClass("/admin/events")}>
          <ShoppingBag className="w-4 h-4" /> Your Events
        </Link>
        <Link
          to="/admin/add-event"
          className={navLinkClass("/admin/add-event")}
        >
          <CalendarPlus className="w-4 h-4" /> Add Event
        </Link>
      </>
    );
  };

  return (
    <nav className="fixed top-0 left-0 z-50 bg-white shadow-sm px-4 w-full">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto">
        <Link to="/" className="text-xl text-purple-700 font-bold">
          Event<span className="text-gray-800 font-semibold">ify</span>
        </Link>

        <button
          className="md:hidden text-purple-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden md:flex items-center gap-6 ml-10">
          {renderLinks()}
        </div>

        {user ? (
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm text-right font-medium leading-tight">
              <div>{user.name}</div>
              <div className="text-xs text-purple-700 font-medium">
                {user.role.toLocaleString() === "PUBLICUSER" ? "USER" : "ADMIN"}
              </div>
            </div>
            <Button
              className="cursor-pointer bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1"
              onClick={logoutUser}
            >
              <LogOut className="w-4 h-4" /> Log out
            </Button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-purple-700 text-purple-700 hover:bg-purple-50 cursor-pointer"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer flex items-center gap-1">
                <UserRoundPlus className="w-4 h-4" /> Register
              </Button>
            </Link>
          </div>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden mt-2 px-4 pb-4 space-y-2">
          <div className="flex flex-col gap-2">{renderLinks()}</div>

          {user ? (
            <div className="mt-4 flex flex-col gap-2">
              <div className="text-sm">
                <div>{user.name}</div>
                <div className="text-xs text-purple-700 font-medium">
                  {user.role.toLocaleString() === "PUBLICUSER"
                    ? "USER"
                    : "ADMIN"}
                </div>
              </div>
              <Button
                className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1 justify-center"
                onClick={logoutUser}
              >
                <LogOut className="w-4 h-4" /> Log out
              </Button>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-2">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-purple-700 text-purple-700 hover:bg-purple-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white flex items-center gap-1 justify-center">
                  <UserRoundPlus className="w-4 h-4" /> Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
