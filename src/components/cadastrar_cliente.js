import './style.css'
import { postCadastro_cliente } from './requisicao'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import logo from '../img/motoboy-curitiba-logotipo.png'

export default function Cadastrar_cliente() {
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
        let resposta = postCadastro_cliente(cadastrar);

        resposta.then((ref) => {

            navigate('/inicio')
        })
        resposta.catch((ref) => { alert(ref.response.data) })

    }
    return (
        <div className='fundo'>

            <img className='logo_img' alt='' src={logo} />

            <input name="name" type="text" placeholder='Nome cliente' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="celular" type="number" placeholder='Celular' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="telefone" type="number" placeholder='Telefone' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
           
            <button onClick={autoriza} className='Entrar'>Cadastrar </button>

            <Link className='link' to={'/inicio'}><button className='voltar'>Voltar</button></Link>
        </div>

    )
}