import { Link } from 'react-router-dom'
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { getmotoboys } from './requisicao'
import { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import menu_lateral from './menu_lateral';

export default function Entrada_pedidos() {

    const [selectedDate, setselectedDate] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    let dataFormatada = ((startDate.getDate()) + "/" + ((startDate.getMonth() + 1)) + "/" + startDate.getFullYear());
    console.log(dataFormatada)
    let nome = localStorage.getItem("nome_logado");
    const [carregando, setcarregando] = useState([]);
    const [boys, setboys] = useState([]);
    useEffect(() => {
        let resposta = getmotoboys()
        resposta.then((res) => {
            setboys(res.data)

        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))
    }, carregando);
    console.log(boys)

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
                        <span className='selection'>Motoboy:</span> <select className='select' id="motoboys">
                            <option value="Integrado">Entrada 2S</option>
                            {boys ? boys.map((ref, index) => {
                                return (
                                    <option key={index} value={ref.email}>{ref.name}</option>
                                )

                            }) : ""}

                        </select>
                        <span className='selection'>Login utilizado:</span> <input className='select_login'></input>
                        <br />
                        <br />
                        <span className='arruma'> <span className='selectionDate'>Data: <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setStartDate(date)}
                            className="selectcalendar"
                            id="dateselect"
                            placeholderText={dataFormatada} />
                        </span>
                        <span className='selection'>Cliente:</span> <select className='select' id="motoboys">
                            <option value="Integrado">Entrada 2S</option>
                            {boys ? boys.map((ref, index) => {
                                return (
                                    <option key={index} value={ref.email}>{ref.name}</option>
                                )

                            }) : ""}

                        </select>
                        </span>

                    </div>

                </div>
            </div>
        </div>
    )
}