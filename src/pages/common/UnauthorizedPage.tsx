export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-purple-700 mt-6">
        403 - Unauthorized
      </h1>
      <p className="mb-6 text-center text-lg text-gray-700">
        Sorry, you do not have permission to view this page.
      </p>
    </div>
  );
}
