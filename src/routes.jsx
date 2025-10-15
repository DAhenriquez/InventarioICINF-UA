import Agregar from "./pages/Agregar";
import Componentes from "./pages/Componentes";
import Componentes_eliminados from "./pages/Componentes_eliminados";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Prestar from "./pages/Prestar";
import Usuarios from "./pages/Usuarios";
import Prestamos from "./pages/Prestamos";


const routes = [
  { path: "/", 
    element: <Login />,},
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/home/componentes",
    element: <Componentes />,
  },
  {
    path: "/home/usuarios",
    element: <Usuarios/>,
  },
  {
    path: "/home/eliminados",
    element:<Componentes_eliminados/>
  },
  {
    path:"/home/prestar",
    element: <Prestar/>
  },
  {
    path: "/home/devolver",
    element: <Prestamos/>
  },
  {
    path: "/home/anadir",
    element: <Agregar/>
  }

];

export default routes;