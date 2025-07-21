import { BrowserRouter } from "react-router-dom"
import { Navbar } from "./components/ui/navbar"
import { AppRoutes } from "./router/AppRoutes"
import { Footer } from "./components/ui/footer"
import { AuthProvider } from "./context/auth/AuthProvider"
import { Toaster } from "sonner"

function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          className: "border shadow-md",
        }}
      />

      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
