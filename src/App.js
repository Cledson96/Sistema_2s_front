import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Inicio from "./components/inicio";
import Cadastro from "./components/cadastro";
import Cadastro_motoboy from "./components/cadastro_motoboy";
import Entrada_pedidos from "./components/entrada_pedidos";
import Entrada_ausentes from "./components/entrada_ausentes";
import Motoboy from "./components/motoboy";
import { useState } from 'react';
import '../src/reset.css'
import Cadastrar_cliente from "./components/cadastrar_cliente";



export default function App() {
  const [dados, setdados] = useState([]);
  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Login setdados={setdados} />} />
          <Route path='/inicio' element={<Inicio setdados={setdados} />} />
          <Route path='/cadastro' element={<Cadastro />} /> 
          <Route path='/cadastro_motoboy' element={<Cadastro_motoboy />} /> 
          <Route path='/motoboys' element={<Motoboy />} /> 
          <Route path='/entrada_pedidos' element={<Entrada_pedidos />} /> 
          <Route path='/cadastrar_cliente' element={<Cadastrar_cliente />} /> 
          <Route path='/entrada_ausente' element={<Entrada_ausentes />} /> 
        
        </Routes>

      </BrowserRouter>
    </>
  );
}