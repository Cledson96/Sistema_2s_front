import { Link } from 'react-router-dom'
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import Table from 'react-bootstrap/Table'
import { getmotoboys } from './requisicao'
import { useEffect, useState } from 'react';
import menu_lateral from './menu_lateral';




export default function Motoboy() {
    let nome = localStorage.getItem("nome_logado");
    const [carregando, setcarregando] = useState([]);
    const [boys, setboys] = useState([])
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
                <div className="lista_motoboys">
                    <div className='tabela'>

                        <Table >

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Celular Principal</th>
                                    <th>Telefone de recado</th>
                                    <th>Endereço</th>
                                    <th>CPF</th>
                                    <th>CNPJ</th>
                                </tr>
                            </thead>
                            <br></br>
                            <tbody>
                                {boys.map((ref, index) => {
                                    if (index % 2 == 0) {
                                        return (
                                            <tr className='par'>
                                                <td>{index + 1}</td>
                                                <td>{ref.name}</td>
                                                <td>{ref.email}</td>
                                                <td>{ref.celular_principal}</td>
                                                <td>{ref.telefone_recado}</td>
                                                <td>{ref.endereco}</td>
                                                <td>{ref.cpf}</td>
                                                <td>{ref.mei}</td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr className='impar'>
                                                <td>{index + 1}</td>
                                                <td>{ref.name}</td>
                                                <td>{ref.email}</td>
                                                <td>{ref.celular_principal}</td>
                                                <td>{ref.telefone_recado}</td>
                                                <td>{ref.endereco}</td>
                                                <td>{ref.cpf}</td>
                                                <td>{ref.mei}</td>
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
    )
}