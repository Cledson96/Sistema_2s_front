import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { Link } from 'react-router-dom'
import { getmotoboys } from './requisicao'
import { useEffect, useState } from 'react';
import menu_lateral from './menu_lateral';


export default function Inicio({ setdados }) {
    const [carregando, setcarregando] = useState([]);
    const [boys, setboys] = useState([])
   

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
                {menu_lateral()}              
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