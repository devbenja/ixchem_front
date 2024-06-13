import { Route, Routes } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

import { AgregarHistoria } from "./pages/HistoriaClinica/Agregar/AgregarHistoria";
import { BuscarHistoria } from "./pages/HistoriaClinica/Buscar/BuscarHistoria";

export const App = () => {

  return (
    <>
      <Routes>
       <Route path="/" element={<Home/>}/> 
       <Route path="/login" element={<Login/>}/> 
       <Route path="/agregar-historia-clinica" element={<AgregarHistoria/>}/>
       <Route path="/buscar-historia-clinica" element={<BuscarHistoria/>}/>
      </Routes>
    </>
  )
}


