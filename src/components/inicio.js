import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { Link } from 'react-router-dom'
import { getmotoboys } from './requisicao'
import { useEffect, useState } from 'react';


export default function Inicio({ setdados }) {
    const [carregando, setcarregando] = useState([]);
    const [boys, setboys] = useState([])
    let nome = localStorage.getItem("nome_logado");

    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {
            setboys(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))
    }, carregando);

    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                <div className='menu_lateral'>
                    <h1 className='logado'> Logado: {nome}</h1>
                    <ul>
                        <Link className="link" to={'/inicio'}> <li> Tela inicial</li></Link>
                        <Link className="link" to={'/cadastro'}><li> Cadastrar usuario</li></Link>
                        <Link className="link" to={'/cadastro_motoboy'}> <li> Cadastrar motoboy</li></Link>
                        <li> Entrada pedidos </li>
                        <li> Informações pedidos </li>
                        <li>Informações motoboys</li>
                        <li className='sair'> sair</li>
                    </ul>
                </div>
                <div className="inicio">
                    <Link className="link" to={'/motoboys'}>
                        <div className="motoboys">
                            <h1 className="card">Motoboys cadastrados:</h1>
                            <h2 className="qtd" >{boys.length ? boys.length : "0"}</h2>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}