import { Link } from 'react-router-dom'
export default function menu_lateral() {
    let nome = localStorage.getItem("nome_logado");
    return (
        <div className='menu_lateral'>
            <h1 className='logado'> Logado: {nome ? nome : ""}</h1>
            <ul>
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