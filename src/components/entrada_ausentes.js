
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { getmotoboys } from './requisicao'
import { getclientes } from './requisicao'
import { getpedidos } from './requisicao'
import { putpedido } from './requisicao'
import { useEffect, useState } from 'react'

import "react-datepicker/dist/react-datepicker.css";
import menu_lateral from './menu_lateral';
import Table from 'react-bootstrap/Table'

import { deletepedido } from './requisicao'



export default function Entrada_ausentes() {
    let nome = localStorage.getItem("nome_logado");

    const [carregando, setcarregando] = useState(true);

    const [pesquisar, setpesquisar] = useState();

    const [tpedidos, settpedidos] = useState();
    const [pedidosfiltro, setpedidosfiltro] = useState();

    useEffect(() => {
        console.log("entrei")
        let resposta = getpedidos()
        resposta.then((res) => {
            settpedidos(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os pedidos!!"))
    }, [carregando]);



    function handleForm({ value }) {
        setpesquisar(
            value
        );


    };
    function pesquisa() {
        let pesquisado = getpedidos(pesquisar);
        console.log(pesquisar)
        pesquisado.then((ref) => {
            setpedidosfiltro(ref.data);
            console.log(ref.data)
        })
        console.log(tpedidos)

        pesquisado.catch((ref) => console.log(ref))
    }
    function autoriza() {


        let resposta = putpedido(pesquisar);


        resposta.then((ref) => {

            alert("Ausente cadastrado com sucesso")
            setcarregando(!carregando)

        })
        resposta.catch((ref) => { alert(ref.response.data) })


    }

    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                {menu_lateral()}
                <div className="inicio">
                    <div className='forma'>
                        <h1 className='forma_ausente'>Entrada de ausentes</h1>



                        <div className='ajuste'>
                            <span className='selection'>Código pedido:</span> <input onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    autoriza()

                                }
                            }} name="pedido" className='select_pedido' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>
                            <button className='pesquisa' onClick={() => pesquisa()}>Pesquisar</button>
                        </div>

                        <div className='listapedidos'>
                            <Table >

                                <thead >
                                    <tr className='pedidostopo'>
                                        <th>#</th>
                                        <th>Motoboy</th>
                                        <th>Pedido</th>
                                        <th>Cliente</th>
                                        <th>Data</th>
                                        <th>login</th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {pedidosfiltro ? pedidosfiltro.map((ref, index) => {

                                        if (index % 2 == 0) {
                                            return (
                                                <tr className='par'>
                                                    <td className='pedidostab'>{index + 1}</td>
                                                    <td className='pedidostab'>{ref.motoboy}</td>
                                                    <td className='pedidostab'>{ref.pedido}</td>
                                                    <td className='pedidostab'>{ref.cliente}</td>
                                                    <td className='pedidostab'>{ref.data}</td>
                                                    <td className='pedidostab'>{ref.login}</td>
                                                    <button onClick={() => {
                                                        const confirmBox = window.confirm(
                                                            `Tem certeza que deseja excluir o pedido ${ref.pedido} ?`
                                                        )
                                                        if (confirmBox === true) {
                                                            deletepedido(ref.pedido);
                                                            setcarregando(!carregando)
                                                        } else {
                                                            alert("não cancelei")
                                                        }
                                                    }} className='excluir'>X</button>
                                                </tr>
                                            )
                                        } else {
                                            return (
                                                <tr className='impar'>
                                                    <td className='pedidostab'>{index + 1}</td>
                                                    <td className='pedidostab'>{ref.motoboy}</td>
                                                    <td className='pedidostab'>{ref.pedido}</td>
                                                    <td className='pedidostab'>{ref.cliente}</td>
                                                    <td className='pedidostab'>{ref.data}</td>
                                                    <td className='pedidostab'>{ref.login}</td>
                                                    <button onClick={() => {
                                                        const confirmBox = window.confirm(
                                                            `Tem certeza que deseja excluir o pedido ${ref.pedido} ?`
                                                        )
                                                        if (confirmBox === true) {
                                                            deletepedido(ref.pedido);
                                                            setcarregando(!carregando)
                                                        } else {
                                                            alert("não cancelei")
                                                        }
                                                    }} className='excluir'>X</button>
                                                </tr>
                                            )

                                        }

                                    }) : <></>}


                                </tbody>

                            </Table>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}