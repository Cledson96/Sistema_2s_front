import './style.css'
import { Link, useNavigate } from 'react-router-dom'
import { postLogin } from './requisicao'
import { useState } from 'react';

export default function Login({ setdados }) {
    const [login, setlogin] = useState({});
    const [carregando, setcarregando] = useState([]);
    const navigate = useNavigate();


    function handleForm({ value, name }) {
        setlogin({
            ...login,
            [name]: value,
        });
    };
    function autoriza() {
        setcarregando(["referencia"])
        let resposta = postLogin(login);
        resposta.then((ref) => {
            setdados(ref.data)
            localStorage.setItem("token", ref.data.token);
            localStorage.setItem("nome", ref.data.name);
            navigate('/registros')
        })
        resposta.catch(() => { setcarregando([])})

    }
    return (
        <div className='fundo'>
            <h1 className='h1'>2S Logistica</h1>
            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <input name="password" type="password" placeholder='Senha' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
            <button onClick={autoriza} className='Entrar'>Entrar</button>
          
        </div>

    )
}