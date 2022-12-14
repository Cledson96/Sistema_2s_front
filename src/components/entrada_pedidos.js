import { Link } from 'react-router-dom'
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { getmotoboys } from './requisicao'
import { getclientes } from './requisicao'
import { getpedidos } from './requisicao'
import { postCadastro_pedidos } from './requisicao'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import menu_lateral from './menu_lateral';
import Table from 'react-bootstrap/Table'


export default function Entrada_pedidos() {
    let nome = localStorage.getItem("nome_logado");




    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());

    const [carregando, setcarregando] = useState([]);
    const [boys, setboys] = useState([]);
    const [client, setclient] = useState([]);
    const [cadastrar, setcadastrar] = useState({});
    const [login, setlogin] = useState();
    const [clientee, setclientee] = useState();
    const [motoboy, setmotoboy] = useState();
    const [pedid, setpedid] = useState();
    const [tpedidos, settpedidos] = useState([])
    const [tpedidosfiltro, settpedidosfiltro] = useState([])


    function ativa() {
        console.log("ativei")
       
        let resposta = getpedidos()
        resposta.then((res) => {
            settpedidos(res.data)
            settpedidosfiltro(res.data.filter(ref => ref.motoboy === motoboy && ref.data === dataFormatada))
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os pedidos!!"))
            ;
    }
    useEffect(() => {
        console.log(tpedidos)
        let resposta = getpedidos()
        resposta.then((res) => {
            settpedidos(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os pedidos!!"))
    }, setcarregando);



    function handleForm({ value, name }) {
        setcadastrar({

            data: dataFormatada,
            login,
            cliente: clientee,
            name: nome,
            motoboy,
            pedido: value

        });
        console.log(cadastrar)


    };
    function autoriza() {
        setcarregando(["referencia"])


        let resposta = postCadastro_pedidos(cadastrar);
      
        resposta.then((ref) => {

            ativa()
            alert("Cadastro realizado com sucesso")
            settpedidosfiltro(tpedidos.filter(ref => ref.motoboy === motoboy && ref.data === dataFormatada))

        })
        resposta.catch((ref) => { alert(ref.response.data) ;  settpedidosfiltro(tpedidos.filter(ref => ref.motoboy === motoboy && ref.data === dataFormatada))})

    }
    


    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {
            setboys(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))
    }, carregando);
    useEffect(() => {
        let resposta = getclientes()
        resposta.then((res) => {
            setclient(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os clientes!!"))
    }, carregando);



    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                {menu_lateral()}
                <div className="inicio">
                    <div className='forma'>
                        <h1 className='forma_titulo'>Entrada de pedidos</h1>
                        <span className='selection'>Motoboy:</span> <select onChange= {(e) => {setmotoboy(e.target.value); settpedidosfiltro(tpedidos.filter(ref => ref.motoboy === e.target.value && ref.data === dataFormatada))} }className='select' id="motoboys">
                            <option ></option>
                            <option value="Integrado">Entrada 2S</option>
                            {boys ? boys.map((ref, index) => {
                                return (
                                    <option key={index} value={ref.name}>{ref.name}</option>
                                )

                            }) : ""}

                        </select>
                        <span className='selection'>Login utilizado:</span> <input onChange={(e) => setlogin(e.target.value)} className='select_login'></input>
                        <br />
                        <br />
                        <span className='arruma'> <span className='selectionDate'>Data: <DatePicker
                            selected={selectedDate}
                            onChange={(date) => {setStartDate(date); ativa()}}
                            className="selectcalendar"
                            id="dateselect"
                            placeholderText={dataFormatada} />
                        </span>
                            <span className='selection'>Cliente:</span> <select onChange={(e) => {setclientee(e.target.value);}} className='select' id="motoboys">
                                <option    > </option>
                                <option value="Integrado"  > 2S</option>
                                {client ? client.map((ref, index) => {
                                    return (
                                        <option key={index} value={ref.name}>{ref.name}</option>
                                    )

                                }) : ""}

                            </select>
                        </span>
                        <span className='selection'>Código pedido:</span> <input onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                autoriza()

                            }
                        }} name="pedido" className='select_pedido' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>
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
                                    {tpedidosfiltro.map((ref, index) => {

                                        ;
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
                                                            alert("exclui!!!")
                                                        }else{
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
                                                            alert("exclui!!!")
                                                        }else{
                                                            alert("não cancelei")
                                                        }
                                                    }} className='excluir'>X</button>
                                                </tr>
                                            )

                                        }

                                    })}


                                </tbody>

                            </Table>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}