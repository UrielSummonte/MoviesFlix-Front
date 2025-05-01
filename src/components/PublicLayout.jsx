import { Outlet } from "react-router-dom";
import PublicNavbar from "./PublicNavbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useProfile } from "../contexts/ProfileContext"; // Asegúrate de importar el contexto de perfil

const PublicLayout = () => {
  const { activeProfile } = useProfile(); // Obtener el perfil activo

  if (!activeProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <PublicNavbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
