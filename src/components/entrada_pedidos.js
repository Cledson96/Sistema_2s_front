
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
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { deletepedido } from './requisicao'
import { red } from '@mui/material/colors'



export default function Entrada_pedidos() {
    let nome = localStorage.getItem("nome_logado");

    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());

    const [carregando, setcarregando] = useState(true);
    const [boys, setboys] = useState([]);
    const [client, setclient] = useState([]);
    const [cadastrar, setcadastrar] = useState({});
    const [login, setlogin] = useState();
    const [clientee, setclientee] = useState();
    const [motoboy, setmotoboy] = useState();
    const [pesquisar, setpesquisar] = useState({ motoboy: "" });
    const [rows, setrows] = useState([])
    const [pedidosfil, setpedidosfil] = useState()
    const [atualiza, setatualiza] = useState(true)
    const [atualiza2, setatualiza2] = useState(true)

    useEffect(() => {
        if (motoboy) {
            let pesquisado = getpedidos("motoboy", motoboy);

            pesquisado.then((ref) => {
                setpedidosfil(ref.data);
                setatualiza(!atualiza)

            })
            pesquisado.catch((ref) => console.log(ref))
        }

    }, [motoboy, startDate, atualiza2]);
    console.log(pedidosfil)
    console.log(motoboy)

    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {
            setboys(res.data)
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))
    }, [carregando]);

    useEffect(() => {
        let resposta = getclientes()
        resposta.then((res) => {
            setclient(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os clientes!!"))
    }, [carregando]);

    let teste
    let ver

    useEffect(() => {
        if (pedidosfil) {
            teste = pedidosfil.filter(ref => ref.data === dataFormatada)

        }
        if (teste) {
            ver = teste.map((ref, index) => {
                return ({ id: index, Motoboy: ref.motoboy, Pedido: ref.pedido, Cliente: ref.cliente, Data: ref.data, login: ref.login, status: ref.status })

            });
            setrows(ver)
        }

    }, [atualiza]);

    function handleForm({ value, name }) {

        setcadastrar({

            data: dataFormatada,
            login,
            cliente: clientee,
            name: nome,
            motoboy,
            pedido: value

        });
    };

    function handleForma({ value }) {
        setrows(teste);
        console.log(teste)
        console.log(rows)
        setpesquisar({
            ...pesquisar,
            pedido: value
        }

        );
    };


    function autoriza() {


        let cadastrare = { ...cadastrar, cliente: clientee, motoboy }
        console.log(cadastrare)
        let resposta = postCadastro_pedidos(cadastrare);

        resposta.then((ref) => {

            alert("Cadastro realizado com sucesso")
            setatualiza2(!atualiza2)
            setcadastrar(({

                data: dataFormatada,
                login,
                cliente: clientee,
                name: nome,
                motoboy,
                pedido: ""

            }))

        })
        resposta.catch((ref) => { alert(ref.response.data) })

    }

    const columns: GridColDef[] = [
        {
            field: 'id', headerName: 'ID', width: 40, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        {
            field: 'Motoboy', headerName: 'Motoboy', width: 130, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
        },
        { field: 'Pedido', headerName: 'Pedido', width: 230 },
        { field: 'Cliente', headerName: 'Cliente', width: 130 },
        { field: 'Data', headerName: 'Data', width: 110 },
        { field: 'login', headerName: 'login', width: 110 },
        { field: 'status', headerName: 'status', width: 110 }

    ];
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
                        <div className='ajuste'>
                            <span className='selection'>Motoboy:</span> <select onChange={(e) => { setmotoboy(e.target.value); handleForma({ name: e.target.name, value: e.target.value }) }} className='select' id="motoboys">
                                <option ></option>pesquisa()
                                <option value="Integrado">Entrada 2S</option>
                                {boys ? boys.map((ref, index) => {
                                    return (
                                        <option key={index} value={ref.name}>{ref.name}</option>
                                    )

                                }) : ""}

                            </select>
                            <span className='selection'>Login utilizado:</span> <input onChange={(e) => setlogin(e.target.value)} className='select_login'></input>

                        </div>

                        <div className='ajuste'>
                            <span className='arruma'> <span className='selectionDate'>Data: <DatePicker
                                selected={selectedDate}
                                onChange={(date) => { setStartDate(date) }}
                                className="selectcalendar"
                                id="dateselect"
                                placeholderText={dataFormatada} />
                            </span>
                                <span className='selection'>Cliente:</span> <select onChange={(e) => { setclientee(e.target.value); console.log(e.target.value) }} className='select' id="motoboys">
                                    <option  > </option>
                                    <option value="Integrado" > 2S</option>
                                    {client ? client.map((ref, index) => {
                                        return (
                                            <option key={index} value={ref.name}>{ref.name}</option>
                                        )

                                    }) : ""}

                                </select>
                            </span>
                        </div>
                        <div className='ajuste'>
                            <span className='selection'>Código pedido:</span> <input value={cadastrar.pedido ? cadastrar.pedido : ""} onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    autoriza()

                                }
                            }} name="pedido" className='select_pedido' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>
                        </div>

                        <div className='listapedidos'>
                            {pedidosfil ? <div style={{ height: 400, width: '100%' }}>
                                <DataGrid
                                    rows={rows ? rows : []}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    components={{
                                        ColumnMenu: red,
                                    }}
                                    componentsProps={{
                                        columnMenu: { background: 'red', counter: rows.length },
                                    }}
                                />
                            </div> : <></>}


                            {/* <Table >

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
                                    {tpedidos ? tpedidos.filter(ref => ref.motoboy === motoboy && ref.data === dataFormatada).map((ref, index) => {
                                        if (ref.status === "ausente") {
                                            return (
                                                <tr className='ausente'>
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

                            </Table> */}

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}