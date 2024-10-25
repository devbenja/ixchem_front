import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';
import { baseURL } from '../../api/apiURL';


export const BuscarHCGeneral = () => {

    const [hcgeneral, setHCGeneral] = useState([]);
    const [obstetrico, setObstetrico] = useState([]);
    const [unidos, setUnidos] = useState([]);
    const [embarazos, setEmbarazos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTermHC, setSearchTermHC] = useState('');
    const [searchTermObs, setSearchTernObs] = useState('');
    const [searchTermUn, setSearchTermUn] = useState('');
    const [searchTermEmb, setSearchTermEmb] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCGeneral();
        fetchObstetrico();
        fetchUnidos();
        fetchEmbarazo();
    }, []);


    const handleSearch = (event) => {
        setSearchTermHC(event.target.value);
    };

    const handleSearchOb = (event) => {
        setSearchTernObs(event.target.value);
    }

    const handleSearchUn = (event) => {
        setSearchTermUn(event.target.value);
    }

    const handleSearchEmb = (event) => {
        setSearchTermEmb(event.target.value);
    }

    const fetchUnidos = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbclasificaionriesgo/listarclasificacionderiesgos`);

            setUnidos(response.data);

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }

    };

    const fetchCGeneral = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbhistoriaclinicageneral/listar`);

            setHCGeneral(response.data);

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }

    };

    const fetchObstetrico = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbantecedentesobstetrico/listar`);

            setObstetrico(response.data);

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }

    };

    const fetchEmbarazo = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbembarazoactual/listar`);

            setEmbarazos(response.data);

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
            title: 'Código MINSA',
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
            title: 'Telefono',
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

    const columnUnidos = [
        {
            title: 'Numero de Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
        },
        {
            title: 'Primer Nombre',
            dataIndex: 'primeR_NOMBRE',
            key: 'primeR_NOMBRE',
        },
        {
            title: 'Primer Apellido',
            dataIndex: 'primeR_APELLIDO',
            key: 'primeR_APELLIDO',
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

    const columnEmbarazos = [
        {
            title: 'numExpediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
        },
        {
            title: 'Diagnostico Embarazo',
            dataIndex: 'diagnostico',
            key: 'diagnostico',
            render: (diagnostico) => {
                if (diagnostico === null || diagnostico === undefined) {
                    return '';
                }
                return diagnostico ? 'Sí' : 'No';
            }
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

    const handleRowClickUnidos = (nuM_EXPEDIENTE) => {
        navigate(`/unidos/${nuM_EXPEDIENTE}`);
    };

    const handleRowClickEmbarazos = (numExpediente) => {
        navigate(`/embarazos/${numExpediente}`);
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

    const filteredUnidos = unidos
        .filter(unido => unido.nuM_EXPEDIENTE && unido.nuM_EXPEDIENTE.includes(searchTermUn))
        .reduce((acc, unido) => {
            if (!acc.find(n => n.nuM_EXPEDIENTE === unido.nuM_EXPEDIENTE)) {
                acc.push(unido);
            }
            return acc;
        }, []);


    const filteredEmbarazos = embarazos
        .filter(emb => emb.numExpediente && emb.numExpediente.includes(searchTermEmb))
        .reduce((acc, emb) => {
            if (!acc.find(n => n.numExpediente === emb.numExpediente)) {
                acc.push(emb);
            }
            return acc;
        }, []);


    if (loading) return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );

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
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="Info-tab" data-bs-toggle="tab" role="tab" href="#INF" aria-controls="INF" aria-selected="false">Información Unida</a>
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
                        {errors && <p className="text-danger">{errors}</p>}

                        <Input
                            placeholder="Buscar por número de expediente"
                            value={searchTermEmb}
                            onChange={handleSearchEmb}
                            className="mt-3"
                        />

                        <Table
                            columns={columnEmbarazos}
                            rowKey="codEmbarazo"
                            dataSource={filteredEmbarazos}
                            className='mt-3 custom-table'
                            onRow={(record) => ({
                                onClick: () => handleRowClickEmbarazos(record.numExpediente),
                            })}
                        />
                    </div>
                    <div className="tab-pane fade" id="INF" role="tabpanel" aria-labelledby="Info-tab">
                        {errors && <p className="text-danger">{errors}</p>}

                        <Input
                            placeholder="Buscar por número de expediente"
                            value={searchTermUn}
                            onChange={handleSearchUn}
                            className="mt-3"
                        />

                        <Table
                            columns={columnUnidos}
                            rowKey="coD_HOJARIESGO"
                            dataSource={filteredUnidos}
                            className='mt-3 custom-table'
                            onRow={(record) => ({
                                onClick: () => handleRowClickUnidos(record.nuM_EXPEDIENTE),
                            })}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
