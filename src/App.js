import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Inicio from "./components/inicio";
import Cadastro from "./components/cadastro";
import { useState } from 'react';
import '../src/reset.css'

export default function App() {
  const [dados, setdados] = useState([]);
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login setdados={setdados} />} />
          <Route path='/inicio' element={<Inicio setdados={setdados} />} />
          <Route path='/cadastro' element={<Cadastro />} /> 
        
        </Routes>

      </BrowserRouter>
    </>
  );
}