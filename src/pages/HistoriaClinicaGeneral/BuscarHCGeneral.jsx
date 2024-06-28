import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';
import { event } from 'jquery';

export const BuscarHCGeneral = () => {

    const [hcgeneral, setHCGeneral] = useState([]);
    const [obstetrico, setObstetrico] = useState([]);

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTermHC, setSearchTermHC] = useState('');
    const [searchTermObs, setSearchTernObs] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        fetchCGeneral();
        fetchObstetrico();
    }, []);

    
    const handleSearch = (event) => {
        setSearchTermHC(event.target.value);
    };

    const handleSearchOb = (event) => {
        setSearchTernObs(event.target.value);
    }

    const fetchCGeneral = async () => {

        try {

            const response = await axios.get('https://localhost:7106/api/bdtbhistoriaclinicageneral/listar');

            setHCGeneral(response.data);

            console.log(response.data)

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }

    };

    const fetchObstetrico = async () => {

        try {

            const response = await axios.get('https://localhost:7106/api/bdtbantecedentesobstetrico/listar');

            setObstetrico(response.data);

            console.log(response.data)

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }

    };

    const columnHCG = [
        {
            title: 'Numero de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
        },
        {
            title: 'Código de Doctor',
            dataIndex: 'codDoctor',
            key: 'codDoctor',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
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
    ]

    const columnObstetrico = [
        {
            title: 'Numero de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
        },
        {
            title: 'Código de Doctor',
            dataIndex: 'telefono',
            key: 'telefono',
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
    ]

    const handleRowClickHCGeneral = (numExpediente) => {
        navigate(`/historias-generales/${numExpediente}`);
    };

    const handleRowClickObs = (numExpediente) => {
        navigate(`/obstetricos/${numExpediente}`);
    };



    const filteredObstetricos = obstetrico
        .filter(obs => obs.numExpediente && obs.numExpediente.includes(searchTermObs))
        .reduce((acc, obs) => {
            if (!acc.find(n => n.numExpediente === obs.numExpediente)) {
                acc.push(obs);
            }
            return acc;
        }, []);

    const filteredhcGeneral = hcgeneral
        .filter(hc => hc.numExpediente && hc.numExpediente.includes(searchTermHC))
        .reduce((acc, hc) => {
            if (!acc.find(n => n.numExpediente === hc.numExpediente)) {
                acc.push(hc);
            }
            return acc;
        }, []);

    return (
        <div className="container-fluid">

            <div className="container-fluid">
                <h4>Buscar Clasificación de Riesgo</h4>
            </div>

            <div className="container-fluid mt-3" >
                <div className='d-flex align-items-center justify-content-between'>
                    <ul className="nav nav-tabs" id="tab-search-list" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true">Historia Clinica General</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false">Antecedentes Obstetricos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false">Embarazo Actual</a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content" id="tab-search-content">
                    <div className="tab-pane fade show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">

                        {errors && <p className="text-danger">{errors}</p>}

                        <Input
                            placeholder="Buscar por número de expediente"
                            value={searchTermHC}
                            onChange={handleSearch}
                            className="mt-3"
                        />

                        <Table
                            columns={columnHCG}
                            rowKey="codHistoriaClinica"
                            dataSource={filteredhcGeneral}
                            className='mt-3 custom-table'
                            onRow={(record) => ({
                                onClick: () => handleRowClickHCGeneral(record.numExpediente),
                            })}
                        />
                    </div>
                    <div className="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        {errors && <p className="text-danger">{errors}</p>}

                        <Input
                            placeholder="Buscar por número de expediente"
                            value={searchTermObs}
                            onChange={handleSearchOb}
                            className="mt-3"
                        />

                        <Table
                            columns={columnObstetrico}
                            rowKey="codHojariesgo"
                            dataSource={filteredObstetricos}
                            className='mt-3 custom-table'
                            onRow={(record) => ({
                                onClick: () => handleRowClickObs(record.numExpediente),
                            })}
                        />
                    </div>
                    <div className="tab-pane fade" id="APP" role="tabpanel" aria-labelledby="APP-tab">

                    </div>

                </div>
            </div>
        </div>
    );
};
