import './style.css'
import { postCadastro_motoboy } from './requisicao'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import menu_lateral from './menu_lateral';
import logo from '../img/motoboy-curitiba-logotipo.png'
import menu from '../img/menu.png'

export default function Cadastro() {
    const [cadastrar, setcadastrar] = useState({});
    const [carregando, setcarregando] = useState([]);
    const [menuon, setmenuon] = useState(false)
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
            alert("Cadastro realizado com sucesso")
            navigate('/inicio')
        })
        resposta.catch((ref) => { alert(ref.response.data) })

    }
    return (
        <div className='sistema'>
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                {menuon == true ? menu_lateral(setmenuon) : <button onClick={() => setmenuon(true)} className='menuon'><img alt='menu' className='menuon1' src={menu} /></button>}
                <div className="inicio">
                    <div className='forma cadastro'>
                        <h1 className='titulos'> Cadastro de Motoboys</h1>
                        <span>
                            <input name="name" type="text" placeholder='Nome' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                            <input name="email" type="email" placeholder='E-mail' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                        </span>
                        <span>
                            <input name="celular_principal" type="number" placeholder='Celular principal' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                            <input name="telefone_recado" type="number" placeholder='Telefone de recado' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                        </span>
                        <input className='endereco' name="endereco" type="string" placeholder='Endereço' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                        <span>
                            <input name="cpf" type="number" placeholder='CPF' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                            <input name="cnpj" type="number" placeholder='MEI(CNPJ)' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })} />
                        </span>

                        <button onClick={autoriza} className='Entrar'>Cadastrar </button>
                        <Link className='link' to={'/inicio'}><button className='voltar'>Voltar</button></Link>
                    </div>

                </div>

            </div>
        </div>


    )
}