import { Link } from 'react-router-dom'
import voltar from "../img/voltar.png"

export default function menu_lateral(setmenuon) {
    let nome = localStorage.getItem("nome_logado");
    return (
        <div className='menu_lateral'>
            <button onClick={() => setmenuon(false)} className='volte'><img className='volte1' alt='voltar' src={voltar} /></button>
            <ul>
                <li> </li>
                <li> </li>
                <Link className="link" to={'/inicio'}> <li> Tela inicial</li></Link>
                <Link className="link" to={'/cadastro'}><li> Cadastrar usuario</li></Link>
                <Link className="link" to={'/cadastro_motoboy'}> <li> Cadastrar motoboy</li></Link>
                <Link className="link" to={'/cadastrar_cliente'}> <li> Cadastrar cliente</li></Link>
                <Link className="link" to={'/motoboys'}> <li> Motoboys cadastrados</li></Link>
                <Link className="link" to={'/entrada_pedidos'}> <li> Entrada pedidos</li></Link>
                <Link className="link" to={'/entrada_ausente'}> <li> Entrada ausente</li></Link>
                <Link className="link" to={'/pedidos'}> <li> Informações pedidos</li></Link>
                <li>Informações motoboys</li>
                <li className='sair'> sair</li>
            </ul>
        </div>
    )

}