export const Login = () => {
  return (
    <div className="flex justify-center mt-12">
      <div className="w-full max-w-md bg-gray-100 rounded-lg p-8 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold">Login</h1>
        </div>

        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2 accent-purple-600" />
            <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
          </div>

          <div className="text-center mb-4">
            <button
              type="button"
              className="w-full bg-purple-700 text-white py-2 rounded-md hover:bg-purple-800 transition"
            >
              Log in
            </button>
          </div>

          <div className="text-center text-sm">
            Not a member?{" "}
            <a href="/register" className="text-purple-700 hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
