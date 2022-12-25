
import './style.css'
import logo from '../img/motoboy-curitiba-logotipo.png'
import { getmotoboys } from './requisicao'
import { useState, useEffect } from 'react'
import menu_lateral from './menu_lateral';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import menu from '../img/menu.png'

export default function Motoboy() {

    const [rows, setrows] = useState([])
    const [menuon, setmenuon] = useState(false)

    useEffect(() => {
        let ver
        let resposta = getmotoboys()
        resposta.then((res) => {
            ver = res.data.map((ref, index) => {
                return ({ id: index + 1, Nome: ref.name, Email: ref.email, Celular: ref.celular_principal, Telefone: ref.telefone_recado, Endereço: ref.endereco, CPF: ref.cpf, CNPJ: ref.mei })

            });
            setrows(ver)
        });
        resposta.catch(() => alert("Tivemos um problema para atualizar os motoboys!!"))

    }, [rows]);

    
        const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 40, },
        { field: 'Nome', headerName: 'Nome', width: 150 },
        { field: 'Email', headerName: 'Email', width: 150, },
        { field: 'Celular', headerName: 'Celular Principal', width: 150 },
        { field: 'Telefone', headerName: 'Telefone de recado', width: 150 },
        { field: 'Endereço', headerName: 'Endereço', width: 250 },
        { field: 'CPF', headerName: 'CPF', width: 120 },
        { field: 'CNPJ', headerName: 'CNPJ', width: 160 },

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
                        <h1 className='titulo'>Motoboys cadastrados</h1>

                        <div className='listapedidos'>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={7}
                                rowsPerPageOptions={[5]}
                                checkboxSelection={false}
                                disableMultipleSelection={true}
                                sx={{
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