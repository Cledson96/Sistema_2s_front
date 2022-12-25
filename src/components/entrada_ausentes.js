
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { getpedidos } from './requisicao'
import { putpedido } from './requisicao'
import { useState, useEffect } from 'react'
import "react-datepicker/dist/react-datepicker.css";
import menu_lateral from './menu_lateral';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import menu from '../img/menu.png'  

export default function Entrada_ausentes() {


    const [carregando, setcarregando] = useState(true);
    const [pesquisar, setpesquisar] = useState({ pedido: "" });
    const [pedidosfiltro, setpedidosfiltro] = useState();
    const [rows, setrows] = useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [atualiza, setatualiza] = useState(true);
    const [menuon, setmenuon] = useState(false);


    function handleForm({ value }) {
        setpesquisar({
            ...pesquisar,
            pedido: value
        }

        );

    };

    function pesquisa() {
        let pesquisado = getpedidos("pedido", pesquisar.pedido);
        pesquisado.then((ref) => {
            setpedidosfiltro(ref.data);
            setatualiza(!atualiza)
        })
        pesquisado.catch((ref) => console.log(ref))

    }

    useEffect(() => {
        let ver
        if (pedidosfiltro) {
            ver = pedidosfiltro.map((ref, index) => {
                return ({ id: index + 1, Motoboy: ref.motoboy, Pedido: ref.pedido, Cliente: ref.cliente, Data: ref.data, login: ref.login, status: ref.status, ide: ref._id })

            });
            setrows(ver)
        }

    }, [atualiza,pedidosfiltro]);

    function autoriza() {

        let resposta = putpedido(pedidosfiltro ? pedidosfiltro[selectionModel - 1]._id : "");


        resposta.then((ref) => {

            alert("Ausente cadastrado com sucesso")
            pesquisa()
            setcarregando(!carregando)

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

    ];

    return (
        <div className="sistema">
            <div className="header">
                <img className='logo_inicio' alt='' src={logo} />
            </div>
            <div className='fundo_inicio'>
            {menuon == true ? menu_lateral(setmenuon) : <button onClick={() => setmenuon(true)} className='menuon'><img alt='menu' className='menuon1' src={menu} /></button>}
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
                            <button className='ausente' onClick={() => {
                                if (selectionModel.length > 1) {
                                    alert("Tem que selecionar somente um pedido!!")
                                } else if (selectionModel.length !== 1) {
                                    alert("Obrigatório selecionar um pedido!!")
                                } else {
                                    autoriza()
                                }
                            }}>Ausente</button>
                        </div>

                        <div className='listapedidos'>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={7}
                                rowsPerPageOptions={[5]}
                                checkboxSelection={true}
                                disableMultipleSelection={true}
                                sx={{
                                    color: 'black', background: "rgba(173,216,230,0.80)", borderColor: 'grey',
                                    '& .MuiDataGrid-cell:hover': {
                                        color: 'primary.main',
                                    }
                                }}
                                onSelectionModelChange={(ids) => {
                                    setSelectionModel(ids);


                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}