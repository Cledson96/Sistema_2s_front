import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'


export default function Inicio({ setdados }) {
    let nome = localStorage.getItem("nome_logado");
    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                <div className='menu_lateral'>
                    <h1 className='logado'> Logado: {nome}</h1>
                </div>
            </div>
        </div>
    )
}