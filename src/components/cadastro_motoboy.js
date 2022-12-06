import './style.css'
import { postCadastro_motoboy } from './requisicao'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import logo from '../img/motoboy-curitiba-logotipo.png'

export default function Cadastro() {
    const [cadastrar, setcadastrar] = useState({});
    const [carregando, setcarregando] = useState([]);
       const navigate = useNavigate();


    function handleForm({ value, name }) {
        setcadastrar({
            ...cadastrar,
            [name]: value,
        });
    };
   
    function autoriza() {
        setcarregando(["referencia"])
        let resposta = postCadastro_motoboy(cadastrar);
        
        resposta.then((ref) => {

            navigate('/inicio')
        })
        resposta.catch((ref) => { alert(ref.response.data)})

    }
    return (
        <div className='fundo'>

            <img className='logo_img' alt='' src={logo} />

            <input name="name" type="text" placeholder='Nome completo' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="celular_principal" type="number" placeholder='Celular principal' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="telefone_recado" type="number" placeholder='Telefone de recado' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="endereco" type="string" placeholder='Endereço' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />  
            <input name="cpf" type="number" placeholder='CPF' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />   
            <input name="cnpj" type="number" placeholder='MEI(CNPJ)' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />    
                 
            <button onClick={autoriza} className='Entrar'>Cadastrar </button>

            <Link className='link' to={'/inicio'}><button className='voltar'>Voltar</button></Link>
        </div>

    )
}