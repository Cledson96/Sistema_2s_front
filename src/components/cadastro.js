import './style.css'
import { postCadastro } from './requisicao'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import logo from '../img/motoboy-curitiba-logotipo.png'

export default function Cadastro() {
    const [cadastrar, setcadastrar] = useState({});
    const [carregando, setcarregando] = useState([]);
    const [confirmasenha, setconfirmasenha] = useState([]);
    const navigate = useNavigate();


    function handleForm({ value, name }) {
        setcadastrar({
            ...cadastrar,
            [name]: value,
        });
    };
    function senhac({ value, name }) {
        setconfirmasenha({
            ...confirmasenha,
            [name]: value,
        });

    }
    function autoriza() {
        setcarregando(["referencia"])
        let resposta = postCadastro(cadastrar);
        if (cadastrar.password != confirmasenha.passwordconfirm) {
            return alert("As senhas precisam ser iguais!!")
        }
        resposta.then((ref) => {

            navigate('/inicio')
        })
        resposta.catch((ref) => { alert(ref.response.data)})

    }
    return (
        <div className='fundo'>

            <img className='logo_img' alt='' src={logo} />

            <input name="name" type="text" placeholder='Nome' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="password" type="password" placeholder='Senha' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="passwordconfirm" type="password" placeholder='Confirme a senha' onChange={(e) => senhac({ name: e.target.name, value: e.target.value, })} />
            <button onClick={autoriza} className='Entrar'>Cadastrar</button>

            <Link className='link' to={'/inicio'}><button className='voltar'>Voltar</button></Link>
        </div>

    )
}