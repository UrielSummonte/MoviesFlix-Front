import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useProfile } from "../contexts/ProfileContext"; 

const Layout = () => {
  const { activeProfile } = useProfile(); 
  

  // No renderizamos el Navbar si no hay un perfil activo
  if (!activeProfile) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Outlet /> {/* Renderizamos solo el contenido sin Navbar ni Footer */}
        </main>
      </div>
    );
  }

  // Si hay un perfil activo, mostramos el Navbar y el Footer
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

export default Layout;
