export const Register = () => {
  return (
    <div className="flex justify-center items-center min-h-screen mt-4 px-4">
      <div className="w-full max-w-2xl bg-gray-100 rounded-lg p-8 shadow-lg">
        <h4 className="text-center text-2xl font-semibold mb-8">
          Welcome to <span className="text-purple-700">Eventify</span>
        </h4>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block mb-1 font-medium text-sm">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block mb-1 font-medium text-sm">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium text-sm">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block mb-1 font-medium text-sm">
                Role
              </label>
              <select
                id="role"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose...</option>
                <option value="0">Public User</option>
                <option value="1">Admin</option>
              </select>
            </div>

            <div>
              <label htmlFor="number" className="block mb-1 font-medium text-sm">
                Contact Number
              </label>
              <input
                id="number"
                type="text"
                placeholder="0771234567"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-medium text-sm">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <hr className="border-t my-6" />

          <button
            type="submit"
            className="w-full py-3 bg-purple-700 text-white rounded-md font-medium hover:bg-purple-800 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}
