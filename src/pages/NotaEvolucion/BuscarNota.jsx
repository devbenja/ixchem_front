import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const BuscarNota = () => {
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtbnotaevolucion/listar`);
            
            setNotas(response.data);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (numExpediente) => {
        navigate(`/notas-de-evolucion/${numExpediente}`);
    };

    const filteredNotas = notas
        .filter(nota => nota.numExpediente && nota.numExpediente.includes(searchTerm))
        .reduce((acc, nota) => {
            if (!acc.find(n => n.numExpediente === nota.numExpediente)) {
                acc.push(nota);
            }
            return acc;
        }, []);

    const columns = [
        {
            title: 'Número de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
            render: (numExpediente) => <a>{numExpediente}</a>,
        },
        {
            title: 'Código de Nota',
            dataIndex: 'codNota',
            key: 'codNota',
        },
        {
            title: 'Código de Doctor',
            dataIndex: 'codDoctor',
            key: 'codDoctor',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined />} onClick={() => handleRowClick(record.codNota)} />
                </Space>
            ),
            align: 'center',
        },
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <div className="container">
            <div className='d-flex align-items-start justify-content-between'>
                <h4>Buscar Notas de Evolución</h4>
            </div>
            
            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por número de expediente"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table
                responsive={true}
                pagination={{ pageSize: 7 }}
                className='custom-table'
                columns={columns}
                dataSource={filteredNotas}
                rowKey="codNota" 
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.numExpediente),
                })}
            />
        </div>
    );
};


// import { useState } from "react";
// import { notification } from "antd";
// import axios from "axios";
// import { Table } from "antd";

// export const BuscarNota = () => {

//     const [searchType, setSearchType] = useState('');
//     const [searchValue, setSearchValue] = useState('');
//     const [data, setData] = useState([]);


//     const handleSearchSubmit = async (event) => {

//         event.preventDefault();

//         let response;

//         try {

//             console.log(searchValue)

//             if (searchType === 'opcion_expediente') {

//                 response = await axios.get('https://localhost:7106/api/bdtbnotaevolucion/buscarpornumexpediente', {
//                     params: { NUM_EXPEDIENTE: searchValue }
//                 });

//             } else if (searchType === 'opcion_cedula') {

//                 response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarporcedula', {
//                     params: { cedula: searchValue }
//                 });

//             }

//             setData(response.data);
//             console.log(response.data)

//         } catch (error) {

//             notification.error({
//                 message: '¡Error!',
//                 description: `${error}`,
//                 duration: 3
//             });

//         }
//     };

//     const column1Nota = [
//         {
//             title: 'Fecha',
//             dataIndex: 'fecha',
//             key: 'fecha',
//         },
//         {
//             title: 'Hora',
//             dataIndex: 'hora',
//             key: 'hora',
//         },

//         {
//             title: 'Número de Expediente',
//             dataIndex: 'nuM_EXPEDIENTE',
//             key: 'numExpediente',
//         },
//         {
//             title: 'Código Doctor',
//             dataIndex: 'coD_DOCTOR',
//             key: 'codDoctor',
//         },
//         {
//             title: 'Número de Nota',
//             dataIndex: 'numerO_NOTA',
//             key: 'numeroNota',
//         },
        
//     ];

//     const columns = [
        
//         {
//             title: 'Frecuencia Cardíaca',
//             dataIndex: 'freC_CARDIACA',
//             key: 'frecuenciaCardiaca',
//         },
//         {
//             title: 'Frecuencia Respiratoria',
//             dataIndex: 'freC_RESP',
//             key: 'frecuenciaRespiratoria',
//         },
        
//         {
//             title: 'IMC',
//             dataIndex: 'imc',
//             key: 'imc',
//         },
        
//         {
//             title: 'Peso',
//             dataIndex: 'peso',
//             key: 'peso',
//         },
        
//         {
//             title: 'Presión',
//             dataIndex: 'presion',
//             key: 'presion',
//         },
        
//         {
//             title: 'Talla',
//             dataIndex: 'talla',
//             key: 'talla',
//         },
//         {
//             title: 'Temperatura',
//             dataIndex: 'temperatura',
//             key: 'temperatura',
//         },
//     ];

//     const columnNotaEv = [
//         {
//             title: 'Nota de Evolución',
//             dataIndex: 'notA_EVOLUCION',
//             key: 'notaEvolucion',
//         },
//     ];

//     const columnPlanes = [
//         {
//             title: 'Planes',
//             dataIndex: 'planes',
//             key: 'planes',
//         },
//     ]

//     const columnNombres = [
//         {
//             title: 'Primer Apellido',
//             dataIndex: 'primeR_APELLIDO',
//             key: 'primerApellido',
//         },
//         {
//             title: 'Primer Apellido (D)',
//             dataIndex: 'primeR_APELLIDOD',
//             key: 'primerApellidoD',
//         },
//         {
//             title: 'Primer Nombre',
//             dataIndex: 'primeR_NOMBRE',
//             key: 'primerNombre',
//         },
//         {
//             title: 'Primer Nombre (D)',
//             dataIndex: 'primeR_NOMBRED',
//             key: 'primerNombreD',
//         },
//     ]

//     return (
//         <div className="container-fluid">
//             <h4>Buscar Nota de Evolución</h4>
//             <form onSubmit={handleSearchSubmit} className="container mt-3 p-3">
//                 <div className="row g-3">
//                     <div className="col-sm-3">
//                         <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
//                             <option value="">Seleccionar Opcion</option>
//                             <option value="opcion_expediente">Número de expediente</option>
//                             <option value="opcion_cedula">Cédula de identidad</option>
//                         </select>
//                     </div>
//                     <div className="col-sm-9 d-flex">
//                         <div className="input-group" role="search">
//                             <input
//                                 className="form-control me-2"
//                                 maxLength="80"
//                                 type="search"
//                                 aria-label="Search"
//                                 value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
//                             />
//                             <button className="btn btn-success" type="submit">Buscar</button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//             <Table className="custom-table mt-3" columns={column1Nota} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
//             <Table className="custom-table mt-3" columns={columns} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
//             <Table className="custom-table mt-3" columns={columnNotaEv} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
//             <Table className="custom-table mt-3" columns={columnPlanes} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
//         </div>
//     )
// }
