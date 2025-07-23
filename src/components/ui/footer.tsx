import { useAuth } from "@/context/auth/AuthProvider";

export const Footer = () => {
  const { user } = useAuth()
  const year = new Date().getFullYear();

  if (!user) {
    return null
  }

  return (
    <footer className="bg-gray-900 text-gray-400 text-sm py-8 mt-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left */}
        <p className="text-center md:text-left">
          © {year} Eventify. Built with 💜 by{" "}
          <a href="https://www.linkedin.com/in/wathila-karunathilake-5027b8296/" className="hover:text-white underline">Wathila Karunathilake</a>
        </p>

        {/* Center - Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-white"><i className="bi bi-twitter" /></a>
          <a href="#" className="hover:text-white"><i className="bi bi-github" /></a>
          <a href="#" className="hover:text-white"><i className="bi bi-discord" /></a>
        </div>
      </div>
    </footer>
  );
};
