import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm px-4 w-full">
      <div className="flex items-center justify-between h-16 max-w-screen-xl mx-auto">
        <Link to="/home" className="text-xl text-purple-700 font-bold">
          Event<span className="text-gray-800 font-semibold">ify</span>
        </Link>

        {/* <div className="flex items-center gap-6 ml-10">
          <Link to="/customer/home" className="text-black hover:text-purple-700 text-sm font-medium">
            <i className="bi bi-house mr-1" /> Home
          </Link>
          <Link to="/customer/buy-now" className="text-black hover:text-purple-700 text-sm font-medium">
            <i className="bi bi-bag mr-1" /> Buy Tickets
          </Link>
          <Link to="/customer/ticket-history" className="text-black hover:text-purple-700 text-sm font-medium">
            <i className="bi bi-ticket mr-1" /> History
          </Link>
          <Link to="/customer/about-us" className="text-black hover:text-purple-700 text-sm font-medium">
            <i className="bi bi-person mr-1" /> About Us
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-right font-medium leading-tight">
            <div>eg</div>
            <div className="text-xs text-purple-700 font-medium">
              geg
            </div>
          </div>
          <Button
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            Log out
          </Button>
        </div> */}

        <div className="flex items-center gap-2">
            <Link to="/login">
                <Button
                    variant="outline"
                    className="border-purple-700 text-purple-700 hover:bg-purple-50 cursor-pointer"
                >
                    Login
                </Button>
            </Link>
            <Link to="/register">
                <Button className="bg-purple-700 hover:bg-purple-800 text-white cursor-pointer">
                    Register
                </Button>
            </Link>
            </div>
      </div>
    </nav>
  )
}
