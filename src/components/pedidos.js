import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { useState, useEffect } from 'react'
import menu_lateral from './menu_lateral';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getpedidos } from './requisicao'
import { getclientes } from './requisicao'
import { getmotoboys } from './requisicao'
import menu from '../img/menu.png'
import { Chart } from 'react-google-charts'

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
    const hoje = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());
    const [totalhoje, settotalhoje] = useState(0)
    const [totalausente, settotalausente] = useState(0)
    const [totalcliente, settotalcliente] = useState(0)
    const [motoboys, setmotoboys] = useState()
    const [options, setOptions] = useState({
        title: 'Pedidos por clientes',
        is3D: true,
        backgroundColor: {
            fill: 'none'
        }
    })

    const [options2, setOptions2] = useState({
        title: 'Ausentes por clientes',
        is3D: true,
        backgroundColor: {
            fill: 'none'
        }
    })

    const [data, setData] = useState()
    const [data2, setData2] = useState()
    const [dataold, setDataold] = useState()
    const [datanew, setDatanew] = useState()
    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());

    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {


            setmotoboys(res.data)

            setatualiza2(!atualiza2)
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os clientes!!"))
    }, []);


    useEffect(() => {
        let resposta = getclientes()
        resposta.then((res) => {

            let re = [
                ['cliente', 'Quantidade']
            ]
            res.data.map(
                (ref) => {
                    console.log(re)
                    re.push([ref.name, 0])
                }
            )
            setData(re)
            settotalcliente(res.data.length)
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
        let pesquisado = getpedidos("data", startDate.getTime());
       

        pesquisado.then((ref) => {
            console.log(ref.data)
            let reva = [
                ['motoboy', 'Quantidade']
            ]

            let reva2 = [
                ['motoboy', 'Ausentes']
            ]
            console.log(motoboys)
            var valorInicial = 0;
            var valorInicial2 = 0;
            var soma = ref.data.reduce(function (valorInicial, valorAtual) {
                let sumi = Number(valorAtual.qtd)
                return valorInicial + sumi;
            }, valorInicial)

            var soma2 = ref.data.reduce(function (valorInicial2, valorAtual2) {
                let sumi2 = Number(valorAtual2.ausente)

                return valorInicial2 + sumi2;
            }, valorInicial2)

            let re2 = [
                ['cliente', 'Quantidade']
            ]

            let re3 = [
                ['cliente', 'Quantidade']
            ]
            settotalausente(soma2)
            settotalhoje(soma)
            console.log(ref.data)
            for (let ii = 0; ii < motoboys.length; ii++) {
                let qt1 = Number(0)
                let reda = ref.data.filter(ref => ref.motoboy == motoboys[ii].name)
                console.log(reda)
                console.log(motoboys[ii].name)
                var total1 = reda.reduce(getTotal1, 0);
                function getTotal1(total1, item1) {
                    return total1 + Number(item1.qtd)
                }
                var totalaus1 = reda.reduce(getTotala1, 0);
                function getTotala1(totalaus1, item2) {
                    return totalaus1 + item2.ausente
                }
                console.log(total1)
                console.log(totalaus1)
                reva.push([motoboys[ii].name, total1])
                reva2.push([motoboys[ii].name, totalaus1])
                setDataold(reva2)
                setDatanew(reva)
                console.log(reva)

            }
            for (let i = 0; i < client.length; i++) {

                let qt = Number(0)
                let red = ref.data.filter(ref => ref.cliente == client[i].name)

                var total = red.reduce(getTotal, 0);
                function getTotal(total, item) {
                    return total + Number(item.qtd)
                }

                var totalaus = red.reduce(getTotala, 0);
                function getTotala(totalaus, item) {
                    return totalaus + item.ausente
                }

                re2.push([client[i].name, total])
                re3.push([client[i].name, totalaus])

                setData(re2)
                ausentee.push(
                    {
                        cliente: client[i].name,
                        qtd: totalaus
                    }
                )
                setData2(re3)
                quant.push({
                    cliente: client[i].name,
                    qtd: total
                })

            }

            let ver = client.map((ref, index) => {

                return ({ id: index + 1, Cliente: ref.name, Pedidos: quant.filter((res) => res.cliente == ref.name)[0].qtd, Ausentes: ausentee.filter((res) => res.cliente == ref.name)[0].qtd, Data: dataFormatada })

            });
            setrows(ver);

            atualizaa()

        })
        console.log(datanew)
        console.log(dataold)

        pesquisado.catch((ref) => console.log(ref))
    }, [dataFormatada, atualiza2]);

    function atualizaa() {

        setatualiza(!atualiza)

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 40, },
        { field: 'Cliente', headerName: 'Cliente', width: 250 },
        { field: 'Pedidos', headerName: 'Total de pedidos', width: 260, },
        { field: 'Ausentes', headerName: 'Total de ausentes', width: 150 },
        { field: 'Data', headerName: 'Data', width: 150 },

    ];

    const diffdata = {
        old: dataold,
        new: datanew,
    };

    return (<div className="sistema">
        <div className="header">
            <img className='logo_inicio' alt='' src={logo} />
        </div>
        <div className='fundo_inicio'>
            {menuon == true ? menu_lateral(setmenuon) : <button onClick={() => setmenuon(true)} className='menuon'><img alt='menu' className='menuon1' src={menu} /></button>}
            <div className="inicio">
                <div className='forma'>
                    <div className='carda'>
                        <div className='dash'> <h1 className='dash_text'>Pedidos total de {dataFormatada}</h1> <h1 className='dash_numb'>{totalhoje}</h1></div>
                        <div className='dash dois'><h1 className='dash_text'>Pedidos ausentes {dataFormatada}</h1> <h1 className='dash_numb2'>{totalausente}</h1></div>
                        <div className='dash'><h1 className='dash_text'>Clientes cadastrados </h1> <h1 className='dash_numb2'>{totalcliente}</h1></div>
                        <div className='dash'></div>
                    </div>

                    <div className='listapedidos'>
                        <span className='selectionDate'>Data:<DatePicker

                            selected={selectedDate}
                            onChange={(date) => { setStartDate(date) }}
                            className="selectcalendar"
                            id="dateselect"
                            placeholderText={dataFormatada} />
                        </span>
                        <div className='arruma'>
                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                data={data}
                                options={options}
                              
                            />

                            <Chart
                                width={'500px'}
                                height={'300px'}
                                chartType="PieChart"
                                data={data2}
                                options={options2}
                               
                            />
                            <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="300px"
                                diffdata={diffdata}
                                options={options}
                              
                            />
                        </div>

                        {/* <DataGrid
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

                        /> */}
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}