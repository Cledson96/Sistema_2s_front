
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
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { deletepedido } from './requisicao'
import menu from '../img/menu.png'

export default function Entrada_pedidos() {
    let nome = localStorage.getItem("nome_logado");

    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());
    const [boys, setboys] = useState([]);
    const [client, setclient] = useState([]);
    const [cadastrar, setcadastrar] = useState({});
    const [login, setlogin] = useState();
    const [clientee, setclientee] = useState();
    const [motoboy, setmotoboy] = useState();
    const [pesquisar, setpesquisar] = useState({ motoboy: "" });
    const [rows, setrows] = useState([]);
    const [pedidosfil, setpedidosfil] = useState();
    const [atualiza, setatualiza] = useState(true);
    const [atualiza2, setatualiza2] = useState(true);
    const [selectionModel, setSelectionModel] = useState([]);
    const [deletar, setdeletar] = useState([]);
    const [menuon, setmenuon] = useState(false);
    const [arquivo, setarquivo] = useState("not");
    const [qtd, setqtd] = useState(1);

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


    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {
            setboys(res.data)
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))
    }, []);

    useEffect(() => {
        let resposta = getclientes()
        resposta.then((res) => {
            setclient(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os clientes!!"))
    }, []);

    let teste;
    let ver;

    useEffect(() => {
        if (pedidosfil) {

            teste = pedidosfil.filter((ref) => { let format = new Date(ref.data); let proc = (format.getDate()) + "/" + ((format.getMonth() + 1)) + "/" + format.getFullYear(); return proc === dataFormatada })
        }
        if (teste) {

            ver = teste.map((ref, index) => {
                let format = new Date(ref.data); let proc = (format.getDate()) + "/" + ((format.getMonth() + 1)) + "/" + format.getFullYear();
                return ({ id: index + 1, Motoboy: ref.motoboy, Pedido: ref.pedido, Cliente: ref.cliente, Data: proc, login: ref.login, status: ref.status, ide: ref._id, img: ref.img, qtd: ref.qtd })

            });
            setrows(ver)

        }

    }, [atualiza]);

    function handleForm({ value, name }) {

        setcadastrar({

            data: startDate.getTime(),
            login,
            cliente: clientee,
            name: nome,
            motoboy,
            pedido: value,
            img: arquivo,
            qtd

        });
    };




    function handleForma({ value }) {
        setrows(teste);

        setpesquisar({
            ...pesquisar,
            pedido: value
        }

        );
    };


    function autoriza() {

        var dataAtual = new Date();
        var horas = dataAtual.getHours();
        var minutos = dataAtual.getMinutes();

        let cadastrare = { ...cadastrar, cliente: clientee, motoboy, ausente: 0 }


        let resposta = postCadastro_pedidos(cadastrare);

        resposta.then((ref) => {
            setarquivo("not");
            setqtd(1)
            setcadastrar(({

                data: startDate.getTime(),
                login,
                cliente: clientee,
                name: nome,
                motoboy,
                pedido: "",
                img: "",
                qtd: ""

            }))
            setatualiza2(!atualiza2)
        })
        resposta.catch((ref) => { alert(ref.response.data) })

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 40, },
        { field: 'Motoboy', headerName: 'Motoboy', width: 150 },
        { field: 'Pedido', headerName: 'Pedido', width: 260, },
        { field: 'Cliente', headerName: 'Cliente', width: 150 },
        { field: 'Data', headerName: 'Data', width: 110 },
        { field: 'login', headerName: 'login', width: 150 },
        { field: 'status', headerName: 'status', width: 110 },
        {
            field: 'img',
            headerName: 'img',
            width: 90,
            sortable: false,
            disableClickEventBubbling: true,

            renderCell: (params) => {
                const onClick = (e) => {
                    const currentRow = params.row;
                    console.log(params.row)
                    return alert(JSON.stringify(currentRow, null, 4));
                };
                return (

                    <a target="_blank" width="70" height="38" href={params.row.img == "not" ? "#" : params.row.img}>{params.row.img == "not" ? "N??o possui" : "Abrir img"}</a>

                );
            },
        },
        { field: 'qtd', headerName: 'qtd', width: 90 },


    ];


    function array(id) {
        setdeletar([])

        let prepara = []
        for (let i = 0; i < id.length; i++) {
            prepara.push(rows[[id[i] - 1]])
        }
        setdeletar(prepara)

    }
    function deletavarios() {

        let excluir = deletar.map((ref) => { return { id: ref.ide } })

        let apagou = deletepedido(excluir);
        apagou.then(setatualiza2(!atualiza2))

    }

    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
                {menuon == true ? menu_lateral(setmenuon) : <button onClick={() => setmenuon(true)} className='menuon'><img alt='menu' className='menuon1' src={menu} /></button>}
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
                            <span className='arruma'>

                                <span className='selection'>Cliente:</span>
                                <select onChange={(e) => { setclientee(e.target.value) }} className='select' id="motoboys">
                                    <option  > </option>
                                    <option value="Integrado" > 2S</option>
                                    {client ? client.map((ref, index) => {
                                        return (
                                            <option key={index} value={ref.name}>{ref.name}</option>
                                        )

                                    }) : ""}

                                </select>

                                <span className='selectionDate'>Data: <DatePicker
                                    selected={startDate}
                                    onChange={(date) => { setStartDate(date); console.log(date.getTime()) }}
                                    className="selectcalendar"
                                    id="dateselect"
                                    placeholderText={dataFormatada} />
                                </span>
                            </span>

                        </div>
                        <div className='ajuste'>
                            <span className='selection'>IMG:</span>  <input value={arquivo == "not" ? "" : arquivo} onChange={(e) => {
                                if (e.target.value == "") {
                                    setarquivo("not")
                                } else {
                                    setarquivo(e.target.value)
                                }
                            }} className='select'></input>
                            {arquivo == "not" ? <div></div> : <><span className='selection'>QTD PEDIDOS:</span>  <input value={qtd} onChange={(e) => setqtd(e.target.value)} className='select_login'></input></>}
                        </div>
                        <div className='ajuste'>
                            <span className='selection'>C??digo pedido:</span> <input value={cadastrar.pedido ? cadastrar.pedido : ""} onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    autoriza()

                                }
                            }} name="pedido" className='select_pedido' onChange={(e) => handleForm({ name: e.target.name, value: e.target.value, })}></input>
                            <button className='cadastrar' onClick={() => { autoriza() }}> Cadastrar </button>
                            <button className='apagar' onClick={() => {
                                let nomes = deletar.map((ref) => { return ref.pedido })
                                const confirmBox = window.confirm(
                                    `Tem certeza que deseja excluir os pedidos selecionados?  ?`
                                )
                                if (confirmBox === true) {
                                    deletavarios(nomes)
                                }

                            }}> Deletar </button>
                        </div>

                        <div className='listapedidos'>
                            {pedidosfil ? <div style={{ height: "100%", width: '100%' }}>
                                <DataGrid
                                    rows={rows ? rows : []}
                                    columns={columns}
                                    pageSize={7}
                                    rowsPerPageOptions={[5]}
                                    checkboxSelection
                                    sx={{
                                        color: 'black', background: "rgba(173,216,230,0.80)", borderColor: 'grey',
                                        '& .MuiDataGrid-cell:hover': {
                                            color: 'primary.main',
                                        }
                                    }}
                                    onSelectionModelChange={(ids) => {
                                        array(ids)
                                        setSelectionModel(ids);
                                    }}

                                />
                            </div> : <></>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}