import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { useState, useEffect } from 'react'
import menu_lateral from './menu_lateral';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getpedidos } from './requisicao'
import { getclientes } from './requisicao'
import menu from '../img/menu.png'

export default function Pedidos() {
    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [rows, setrows] = useState([]);
    const [qtd, setqtd] = useState([{}]);
    const [ausent, setausent] = useState([{}]);
    const [client, setclient] = useState([]);
    const [atualiza, setatualiza] = useState(true);
    const [atualiza2, setatualiza2] = useState(true);
    const [menuon, setmenuon] = useState(false)


    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());


    useEffect(() => {
        let resposta = getclientes()
        resposta.then((res) => {

            console.log(res.data)
            setclient(res.data)
            let ver = res.data.map((ref, index) => {
                return ({ id: index + 1, Cliente: ref.name, Pedidos: "carregando", Ausentes: "carregando", Data: dataFormatada })

            });
            setrows(ver);
            setatualiza2(!atualiza2)
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os clientes!!"))
    }, []);

    useEffect(() => {
        let quant = []
        let ausentee = []
        setqtd([])
        let pesquisado = getpedidos("data", dataFormatada);

        pesquisado.then((ref) => {
            console.log(quant)
            console.log(ref.data)
            for (let i = 0; i < client.length; i++) {
                let qt = Number(0)
                let red = ref.data.filter(ref => ref.cliente == client[i].name)
                console.log(client[i].name)
                console.log(ref.data)
                console.log(ref.data.filter(ref => ref.cliente == client[i].name))
                console.log(ref.data.filter(ref => ref.status == "ok" && ref.cliente == client[i].name).length)
               console.log(ref.data[0].qtd) 
               var total = red.reduce(getTotal, 0);
               function getTotal(total, item) {
                return total + item.qtd 
               }
              console.log(total)
              console.log(qt)

                ausentee.push(
                    {
                        cliente: client[i].name,
                        qtd: ref.data.filter(ref => ref.status == "ausente" && ref.cliente == client[i].name).length
                    }
                )
                quant.push({
                    cliente: client[i].name,
                    qtd: total
                })
            }
            console.log(quant)
            let ver = client.map((ref, index) => {

                return ({ id: index + 1, Cliente: ref.name, Pedidos: quant.filter((res) => res.cliente == ref.name)[0].qtd, Ausentes: ausentee.filter((res) => res.cliente == ref.name)[0].qtd, Data: dataFormatada })

            });
            setrows(ver);

            atualizaa()

        })

        pesquisado.catch((ref) => console.log(ref))
    }, [dataFormatada, atualiza2]);

    function atualizaa() {
        console.log(qtd)


        setatualiza(!atualiza)

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 40, },
        { field: 'Cliente', headerName: 'Cliente', width: 250 },
        { field: 'Pedidos', headerName: 'Total de pedidos', width: 260, },
        { field: 'Ausentes', headerName: 'Total de ausentes', width: 150 },
        { field: 'Data', headerName: 'Data', width: 150 },

    ];

    return (<div className="sistema">
        <div className="header">
            <img className='logo_inicio' alt='' src={logo} />
        </div>
        <div className='fundo_inicio'>
            {menuon == true ? menu_lateral(setmenuon) : <button onClick={() => setmenuon(true)} className='menuon'><img alt='menu' className='menuon1' src={menu} /></button>}
            <div className="inicio">
                <div className='forma'>
                    <h1 className='titulo'>Informações dos pedidos</h1>

                    <div className='listapedidos'>
                        <span className='selectionDate'>Data:<DatePicker

                            selected={selectedDate}
                            onChange={(date) => { setStartDate(date) }}
                            className="selectcalendar"
                            id="dateselect"
                            placeholderText={dataFormatada} />
                        </span>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={7}
                            rowsPerPageOptions={[5]}
                            checkboxSelection={false}
                            disableMultipleSelection={true}
                            sx={{
                                margin: "10",
                                color: 'black', background: "rgba(173,216,230,0.80)", borderColor: 'grey',
                                '& .MuiDataGrid-cell:hover': {
                                    color: 'primary.main',
                                }
                            }}

                        />
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}