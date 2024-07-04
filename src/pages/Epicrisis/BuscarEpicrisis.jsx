import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const BuscarEpicrisis = () => {
    const [epicrisis, setEpicrisis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProblemas();
    }, []);

    const fetchProblemas = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbepicrisis/listar`);
            console.log(response.data)
            setEpicrisis(response.data);

        } catch (error) {

            setErrors(error.response ? error.response.data : 'Error al Obtener los Datos');

        } finally {

            setLoading(false);

        }

    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (numExpediente) => {
        navigate(`/epicrisis/${numExpediente}`);
    };

    const filteredEpicrisis = epicrisis
        .filter(epicrisi => epicrisi.numExpediente && epicrisi.numExpediente.includes(searchTerm))
        .reduce((acc, epicrisi) => {
            if (!acc.find(e => e.numExpediente === epicrisi.numExpediente)) {
                acc.push(epicrisi);
            }
            return acc;
        }, []);

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'No. de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
            render: (numExpediente) => <a>{numExpediente}</a>
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined />} />
                </Space>
            ),
            align: 'center',
        },
    ];

    if (loading) return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );


    return (
        <div className="container">
            <div className='d-flex align-items-start justify-content-between'>
                <h4>Buscar Epicrisis</h4>
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
                dataSource={filteredEpicrisis}
                rowKey="codEpicrisis"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.numExpediente),
                })}
            />
        </div>
    );
};



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { notification, Table, message } from "antd";
// import axios from "axios";

// export const BuscarEpicrisis = () => {

//   const [searchType, setSearchType] = useState('');
//   const [searchValue, setSearchValue] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [firstLastName, setFirstLastName] = useState('');

//   const [data, setData] = useState([0]);

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     let response;

//     try {

//       if (searchType === 'num_expediente') {

//         response = await axios.get('https://localhost:7106/api/bdtbepicrisis/buscarpornumexpediente', {
//           params: { NUM_EXPEDIENTE: searchValue }
//         })

//       } else if (searchType === 'nombre') {

//         response = await axios.get('https://localhost:7106/api/bdtbepicrisis/Buscarpormanombrepaciente', {
//           params: { PRIMER_NOMBRE: firstName, PRIMER_APELLIDO: firstLastName }
//         })

//       }

//       setData(response.data);
//       console.log(response.data);

//     } catch (error) {

//       notification.error({
//         message: '¡Error!',
//         description: `${error.message}`,
//         duration: 3
//       });

//     }

//   };

//   const patientColumns = [
//     {
//       title: 'No. Expediente',
//       dataIndex: 'nuM_EXPEDIENTE',
//       key: 'nuM_EXPEDIENTE',
//     },
//     {
//       title: 'Primer Nombre Paciente',
//       dataIndex: 'primeR_NOMBRE',
//       key: 'primeR_NOMBRE',
//     },
//     {
//       title: 'Primer Apellido Paciente',
//       dataIndex: 'primeR_APELLIDO',
//       key: 'primeR_APELLIDO',
//     },
//     {
//       title: 'Fecha',
//       dataIndex: 'fecha',
//       key: 'fecha',
//     },
//     {
//       title: 'Hora',
//       dataIndex: 'hora',
//       key: 'hora',
//     },
//     {
//       title: 'Fecha de Ingreso',
//       dataIndex: 'fechA_INGRESO',
//       key: 'fechA_INGRESO',
//     },
//     {
//       title: 'Fecha de Egreso',
//       dataIndex: 'fechA_EGRESO',
//       key: 'fechA_EGRESO',
//     },
//   ];

//   const doctorColumns = [
//     {
//       title: 'Código Doctor',
//       dataIndex: 'coD_DOCTOR',
//       key: 'coD_DOCTOR',
//     },
//     {
//       title: 'Nombre del Doctor',
//       dataIndex: 'primeR_NOMBRED',
//       key: 'primeR_NOMBRED',
//     },
//     {
//       title: 'Apellido del Doctor',
//       dataIndex: 'primeR_APELLIDOD',
//       key: 'primeR_APELLIDOD',
//     },
//   ];

//   const diagnosticoColumns = [
//     {
//       title: 'Diagnóstico de Ingreso',
//       dataIndex: 'diaG_INGRESO',
//       key: 'diaG_INGRESO',
//     },
//     {
//       title: 'Diagnóstico de Egreso',
//       dataIndex: 'diaG_EGRESO',
//       key: 'diaG_EGRESO',
//     }
//   ];

//   const resultadoTratColumns = [
//     {
//       title: 'Resultado',
//       dataIndex: 'resultado',
//       key: 'resultado',
//     },
//     {
//       title: 'Tratamiento',
//       dataIndex: 'tratamiento',
//       key: 'tratamiento',
//     },
//   ];

//   const descarteCompColumns = [
//     {
//       title: 'Descartes',
//       dataIndex: 'descartes',
//       key: 'descartes',
//     },
//     {
//       title: 'Complicaciones',
//       dataIndex: 'complicaciones',
//       key: 'complicaciones',
//     },
//   ];

//   const recomenDatosRelColumn = [
//     {
//       title: 'Recomendaciones',
//       dataIndex: 'recomendaciones',
//       key: 'recomendaciones',
//     },
//     {
//       title: 'Datos Relevantes',
//       dataIndex: 'datoS_RELEVANTES',
//       key: 'datoS_RELEVANTES',
//     },
//   ];

//   const handleEditEpicrisis = () => {

//     console.log(data[0].nuM_EXPEDIENTE)

//     if (data && data.length > 0 && data[0] && data[0].nuM_EXPEDIENTE) {
//       navigate(`/editar-epicrisis/${data[0].nuM_EXPEDIENTE}`)
//     } else {
//       message.warning('No hay Datos Para Editar');
//     }

//   }

//   return (
//     <div className='container-fluid'>
//       <h4>Buscar Epicrisis</h4>
//       <form onSubmit={handleSubmit} className="container mt-3 p-3">
//         <div className="row g-3">
//           <div className="col-sm-3">
//             <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
//               <option value="">Seleccionar Opcion</option>
//               <option value="num_expediente">Numero Expediente</option>
//               <option value="nombre">Nombre</option>
//             </select>
//           </div>
//           <div className="col-sm-9 d-flex">
//             <div className="input-group" role="search">
//               {searchType === 'nombre' ? (
//                 <div className="d-flex gap-2">
//                   <div className="d-flex align-items-center justify-content-center">
//                     <label>Primer Nombre</label>
//                     <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center">
//                     <label>Primer Apellido</label>
//                     <input className="form-control" type="text" value={firstLastName} onChange={(e) => setFirstLastName(e.target.value)} />
//                   </div>
//                 </div>
//               ) : (
//                 <input
//                   className="form-control me-2"
//                   maxLength="80"
//                   type="search"
//                   aria-label="Search"
//                   value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
//                 />
//               )}

//               <button className="btn btn-success" type="submit">Buscar</button>
//             </div>
//           </div>
//         </div>
//       </form>
//       <Table className="custom-table mt-3" columns={patientColumns} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <Table className="custom-table mt-3" columns={doctorColumns} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <Table className="custom-table mt-3" columns={diagnosticoColumns} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <Table className="custom-table mt-3" columns={resultadoTratColumns} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <Table className="custom-table mt-3" columns={descarteCompColumns} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <Table className="custom-table mt-3" columns={recomenDatosRelColumn} dataSource={data} rowKey="coD_EPICRISIS" pagination={false} />
//       <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-5'>
//         <button onClick={handleEditEpicrisis} type="submit" className="btn btn-warning">Editar</button>
//       </div>
//     </div>
//   )
// }
