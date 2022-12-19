import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { postLogin } from './requisicao'
import { useState } from 'react';
import logo from '../img/motoboy-curitiba-logotipo.png'
import gif from '../img/carregando.gif'

export default function Login({ setdados }) {
    const [login, setlogin] = useState({});
    const [carregando, setcarregando] = useState(true);
    const navigate = useNavigate();
    


    function handleForm({ value, name }) {
        setlogin({
            ...login,
            [name]: value,
        });
    };
    function autoriza() {
        setcarregando(false)
        let resposta = postLogin(login);
        resposta.then((ref) => {
            setdados(ref.data)
            localStorage.setItem("token", ref.data.token);
            localStorage.setItem("nome_logado", ref.data.name);
            navigate('/inicio')
        })
        resposta.catch((ref) => { setcarregando(true) ; alert(ref.response.data) })

    }
    return (
        <div className='fundo'>
            <img className='logo_img' alt='' src={logo}/>
            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="password" type="password" placeholder='Senha' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <button onClick={autoriza} className='Entrar'>{carregando === true ? "Entrar" : <img className='gif' alt='gif' src={gif}/>}</button>
          
        </div>

    )
}