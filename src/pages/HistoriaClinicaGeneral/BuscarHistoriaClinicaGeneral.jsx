import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Table, message } from "antd";
import axios from "axios";

import { baseURL } from "../../api/apiURL";

export const BuscarHistoriaClinicaGeneral = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstLastName, setFirstLastName] = useState('');

    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        let response;

        try {

            if (searchType === 'num_expediente') {

                response = await axios.get(`${baseURL}/bdtbhistoriaclinicageneral/buscarpornumexpediente`, {
                    params: { NUM_EXPEDIENTE: searchValue }
                })

            } else if (searchType === 'nombre') {

                response = await axios.get(`${baseURL}/bdtbhistoriaclinicageneral/Buscarpormanombrepaciente`, {
                    params: { PRIMER_NOMBRE: firstName, PRIMER_APELLIDO: firstLastName }
                })

            }

            setData(response.data);

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.message}`,
                duration: 3
            });

        }

    };

    const columnsPaciente = [
        { title: 'Número de Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
        { title: 'Primer Nombre', dataIndex: 'primeR_NOMBRE', key: 'primeR_NOMBRE' },
        { title: 'Primer Apellido', dataIndex: 'primeR_APELLIDO', key: 'primeR_APELLIDO' },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        }
    ];

    const columnsDoctor = [
        { title: 'Código del Doctor', dataIndex: 'coD_DOCTOR', key: 'coD_DOCTOR' },
        { title: 'Primer Nombre del Doctor', dataIndex: 'primeR_NOMBRED', key: 'primeR_NOMBRED' },
        { title: 'Primer Apellido del Doctor', dataIndex: 'primeR_APELLIDOD', key: 'primeR_APELLIDOD' }
    ];

    const columnsClinica = [
        { title: 'Código Historia Clínica', dataIndex: 'coD_HISTORIA_CLINICA', key: 'coD_HISTORIA_CLINICA' },
        {
            title: 'Diabetes Mellitus',
            dataIndex: 'diabeteS_MELLITUS',
            key: 'diabeteS_MELLITUS',
            render: (text) => text ? 'Sí' : 'No'
        },
        {
            title: 'Nefropatía',
            dataIndex: 'nefropatia',
            key: 'nefropatia',
            render: (text) => text ? 'Sí' : 'No'
        },
        {
            title: 'Cardiopatía',
            dataIndex: 'cardiopatia',
            key: 'cardiopatia',
            render: (text) => text ? 'Sí' : 'No'
        }
    ];

    const columnsAdicional = [
        {
            title: 'Consumo de Drogas',
            dataIndex: 'consumO_DROGAS',
            key: 'consumO_DROGAS',
            render: (text) => text ? 'Sí' : 'No'
        },
        {
            title: 'Cualquier Otro',
            dataIndex: 'cualquieR_OTRO',
            key: 'cualquieR_OTRO',
            render: (text) => text ? 'Sí' : 'No'
        },
        {
            title: 'Alto Riesgo',
            dataIndex: 'altO_RIESGO',
            key: 'altO_RIESGO',
            render: (text) => text ? 'Sí' : 'No'
        }
    ];

    const handleEditHCGeneral = () => {

        if (data && data.length > 0 && data[0] && data[0].nuM_EXPEDIENTE) {
            navigate(`/editar-historia-clinica-general/${data[0].nuM_EXPEDIENTE}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    return (
        <div className="container-fluid">
            <h4>Buscar Historia Clinica General</h4>
            <form onSubmit={handleSubmit} className="container mt-3 p-3">
                <div className="row g-3">
                    <div className="col-sm-3">
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion</option>
                            <option value="num_expediente">Numero Expediente</option>
                            <option value="nombre">Nombre</option>
                        </select>
                    </div>
                    <div className="col-sm-9 d-flex">
                        <div className="input-group" role="search">
                            {searchType === 'nombre' ? (
                                <div className="d-flex gap-2">
                                    <div className="d-flex align-items-center justify-content-center">
                                        <label>Primer Nombre</label>
                                        <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                        <label>Primer Apellido</label>
                                        <input className="form-control" type="text" value={firstLastName} onChange={(e) => setFirstLastName(e.target.value)} />
                                    </div>
                                </div>
                            ) : (
                                <input
                                    className="form-control me-2"
                                    maxLength="80"
                                    type="search"
                                    aria-label="Search"
                                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                />
                            )}

                            <button className="btn btn-success" type="submit">Buscar</button>
                        </div>
                    </div>
                </div>
            </form>
            <Table className='custom-table mt-3' columns={columnsPaciente} dataSource={data} pagination={false} />
            <Table className='custom-table mt-3' columns={columnsDoctor} dataSource={data} pagination={false} />
            <Table className='custom-table mt-3' columns={columnsClinica} dataSource={data} pagination={false} />
            <Table className='custom-table mt-3' columns={columnsAdicional} dataSource={data} pagination={false} />
            <div className='d-grid gap-2 d-md-flex justify-content-md-end mt-5'>
                <button onClick={handleEditHCGeneral} type="submit" className="btn btn-warning">Editar</button>
            </div>
        </div>
    )
}
