import { useState } from "react";
import { notification } from "antd";
import axios from "axios";
import { Table } from "antd";

export const BuscarNota = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);


    const handleSearchSubmit = async (event) => {

        event.preventDefault();

        let response;

        try {

            console.log(searchValue)

            if (searchType === 'opcion_expediente') {

                response = await axios.get('https://localhost:7106/api/bdtbnotaevolucion/buscarpornumexpediente', {
                    params: { NUM_EXPEDIENTE: searchValue }
                });

            } else if (searchType === 'opcion_cedula') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarporcedula', {
                    params: { cedula: searchValue }
                });

            }

            setData(response.data);
            console.log(response.data)

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error}`,
                duration: 3
            });

        }
    };

    const column1Nota = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora',
        },

        {
            title: 'Número de Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'numExpediente',
        },
        {
            title: 'Código Doctor',
            dataIndex: 'coD_DOCTOR',
            key: 'codDoctor',
        },
        {
            title: 'Número de Nota',
            dataIndex: 'numerO_NOTA',
            key: 'numeroNota',
        },
        
    ];

    const columns = [
        
        {
            title: 'Frecuencia Cardíaca',
            dataIndex: 'freC_CARDIACA',
            key: 'frecuenciaCardiaca',
        },
        {
            title: 'Frecuencia Respiratoria',
            dataIndex: 'freC_RESP',
            key: 'frecuenciaRespiratoria',
        },
        
        {
            title: 'IMC',
            dataIndex: 'imc',
            key: 'imc',
        },
        
        {
            title: 'Peso',
            dataIndex: 'peso',
            key: 'peso',
        },
        
        {
            title: 'Presión',
            dataIndex: 'presion',
            key: 'presion',
        },
        
        {
            title: 'Talla',
            dataIndex: 'talla',
            key: 'talla',
        },
        {
            title: 'Temperatura',
            dataIndex: 'temperatura',
            key: 'temperatura',
        },
    ];

    const columnNotaEv = [
        {
            title: 'Nota de Evolución',
            dataIndex: 'notA_EVOLUCION',
            key: 'notaEvolucion',
        },
    ];

    const columnPlanes = [
        {
            title: 'Planes',
            dataIndex: 'planes',
            key: 'planes',
        },
    ]

    const columnNombres = [
        {
            title: 'Primer Apellido',
            dataIndex: 'primeR_APELLIDO',
            key: 'primerApellido',
        },
        {
            title: 'Primer Apellido (D)',
            dataIndex: 'primeR_APELLIDOD',
            key: 'primerApellidoD',
        },
        {
            title: 'Primer Nombre',
            dataIndex: 'primeR_NOMBRE',
            key: 'primerNombre',
        },
        {
            title: 'Primer Nombre (D)',
            dataIndex: 'primeR_NOMBRED',
            key: 'primerNombreD',
        },
    ]

    return (
        <div className="container-fluid">
            <h4>Buscar Nota de Evolución</h4>
            <form onSubmit={handleSearchSubmit} className="container mt-3 p-3">
                <div className="row g-3">
                    <div className="col-sm-3">
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion</option>
                            <option value="opcion_expediente">Número de expediente</option>
                            <option value="opcion_cedula">Cédula de identidad</option>
                        </select>
                    </div>
                    <div className="col-sm-9 d-flex">
                        <div className="input-group" role="search">
                            <input
                                className="form-control me-2"
                                maxLength="80"
                                type="search"
                                aria-label="Search"
                                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">Buscar</button>
                        </div>
                    </div>
                </div>
            </form>
            <Table className="custom-table mt-3" columns={column1Nota} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
            <Table className="custom-table mt-3" columns={columns} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
            <Table className="custom-table mt-3" columns={columnNotaEv} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
            <Table className="custom-table mt-3" columns={columnPlanes} dataSource={data} rowKey="coD_DOCTOR" pagination={false}/>
        </div>
    )
}
