import './Buscar.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, message, notification } from 'antd';

export const BuscarHistoria = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState('');
    const [antecedentesPersonales, setAntPersonales] = useState('');
    const [antPatPer, setAntPatPer] = useState('');


    const navigate = useNavigate();

    const handleSearchSubmit = async (event) => {

        event.preventDefault();

        let response;
        let antPerData;
        let antPatPerData;

        try {

            if (searchType === 'opcion_expediente') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarpornumexpediente', {
                    params: { NumExpediente: searchValue }
                });

                antPerData = await axios.get('https://localhost:7106/api/bdtbantecedentespersonale/buscarporexpediente', {
                    params: { NumExpediente: searchValue }
                });

                antPatPerData = await axios.get('https://localhost:7106/api/bdtbaantecedentepatper/buscarporexpediente', {
                    params: { NumExpediente: searchValue }
                });


            } else if (searchType === 'opcion_cedula') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarporcedula', {
                    params: { cedula: searchValue }
                });

            }

            setData(response.data);
            setAntPersonales(antPerData.data)
            setAntPatPer(antPatPerData.data);

        } catch (error) {
            
            notification.error({
                message: '¡Error!',
                description: `${error.response.data.message}`,
                duration: 3
            });
            
        }
    };

    const columns1 = [
        { title: 'Fecha de ingreso', dataIndex: 'fechaIngreso', key: 'fechaIngreso' },
        { title: 'Centro de mujeres IXCHEN', dataIndex: 'centro', key: 'centro' },
        { title: 'Usuaria', dataIndex: 'usuaria', key: 'usuaria' },
    ];

    const columns2 = [
        { title: 'Primer nombre', dataIndex: 'primerNombre', key: 'primerNombre' },
        { title: 'Segundo nombre', dataIndex: 'segundoNombre', key: 'segundoNombre' },
        { title: 'Primer apellido', dataIndex: 'primerApellido', key: 'primerApellido' },
        { title: 'Segundo apellido', dataIndex: 'segundoApellido', key: 'segundoApellido' },
        { title: 'Cédula', dataIndex: 'cedula', key: 'cedula' },
        { title: 'Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
        { title: 'Fecha de Nac.', dataIndex: 'fechaNac', key: 'fechaNac' },
        { title: 'Edad', dataIndex: 'edad', key: 'edad' },
        { title: 'Sexo', dataIndex: 'sexo', key: 'sexo' },
    ];

    const columns3 = [
        { title: 'Escolaridad', dataIndex: 'escolaridad', key: 'escolaridad' },
        { title: 'Profesión/Oficio', dataIndex: 'profesion', key: 'profesion' },
        { title: 'Dirección', dataIndex: 'direccion', key: 'direccion' },
        { title: 'Departamento', dataIndex: 'codDepartamento', key: 'codDepartamento' },
    ];

    const columns4 = [
        { title: 'Presión', dataIndex: 'presion', key: 'presion' },
        { title: 'Temperatura (°C)', dataIndex: 'temperatura', key: 'temperatura' },
        { title: 'Peso (Kg)', dataIndex: 'peso', key: 'peso' },
        { title: 'Talla (Mtrs)', dataIndex: 'talla', key: 'talla' },
        { title: 'IMC', dataIndex: 'imc', key: 'imc' },
    ];

    const colum1AntPer = [
        { title: 'Primera Menstruación', dataIndex: 'menstruacion', key: 'menstruacion' },
        { title: 'Inicio Vida Sexual', dataIndex: 'vidaSexual', key: 'vidaSexual' },
        { title: 'Compañeros Sexuales', dataIndex: 'compSexuales', key: 'compSexuales' },
        { title: 'Compañeros Sexuales', dataIndex: 'compSexuales', key: 'compSexuales' },
        { title: 'MAC', dataIndex: 'mac', key: 'mac' },
        {
            title: '¿Has estado embarazada?', dataIndex: 'histEmbarazo', key: 'histEmbarazo', render: (histEmbarazo) => {
                if (histEmbarazo === null || histEmbarazo === undefined) {
                    return '';
                }
                return histEmbarazo ? 'Sí' : 'No';
            }
        },
        { title: 'Gestas', dataIndex: 'gestas', key: 'gestas' },
    ]

    const colum2AntPer = [
        { title: 'Partos', dataIndex: 'partos', key: 'partos' },
        { title: 'Abortos', dataIndex: 'abortos', key: 'abortos' },
        { title: 'cesarea', dataIndex: 'cesarea', key: 'cesarea' },
        { title: 'FUM', dataIndex: 'fum', key: 'fum' },
        { title: 'SA', dataIndex: 'sa', key: 'sa' },
        {
            title: '¿Lactancia Materna?', dataIndex: 'lactancia', key: 'lactancia', render: (lactancia) => {
                if (lactancia === null || lactancia === undefined) {
                    return '';
                }
                return lactancia ? 'Sí' : 'No';
            }
        },
        {
            title: '¿Esta Embarazada?', dataIndex: 'embarazo', key: 'embarazo', render: (embarazo) => {
                if (embarazo === null || embarazo === undefined) {
                    return '';
                }
                return embarazo ? 'Sí' : 'No';
            }
        },
    ]

    const colum3AntPer = [
        {
            title: '¿Mamografía al día?', dataIndex: 'mamografia', key: 'mamografia', render: (mamografia) => {
                if (mamografia === null || mamografia === undefined) {
                    return '';
                }
                return mamografia ? 'Sí' : 'No';
            }
        },
        {
            title: '¿PAP al día?', dataIndex: 'pap', key: 'pap', render: (pap) => {
                if (pap === null || pap === undefined) {
                    return '';
                }
                return pap ? 'Sí' : 'No';
            }
        },
        {
            title: '¿PAP Alterado', dataIndex: 'papAlterado', key: 'papAlterado', render: (papAlterado) => {
                if (papAlterado === null || papAlterado === undefined) {
                    return '';
                }
                return papAlterado ? 'Sí' : 'No';
            }
        },
        { title: 'Ultimo Pap', dataIndex: 'histPap', key: 'histPap' },
        { title: 'Edad de Menopausia', dataIndex: 'menopausia', key: 'menopausia' },
        {
            title: '¿Terapia Reemplazo Hormonal?', dataIndex: 'reempHormonal', key: 'reempHormonal', render: (reempHormonal) => {
                if (reempHormonal === null || reempHormonal === undefined) {
                    return '';
                }
                return reempHormonal ? 'Sí' : 'No';
            }
        },
        {
            title: '¿Fuma?', dataIndex: 'fuma', key: 'fuma', render: (fuma) => {
                if (fuma === null || fuma === undefined) {
                    return '';
                }
                return fuma ? 'Sí' : 'No';
            }
        },
    ]

    const colum4AntPer = [
        { title: 'Cigarros por Dia', dataIndex: 'cigarrosDia', key: 'cigarrosDia' },
        { title: 'Abortos', dataIndex: 'abortos', key: 'abortos' },
        {
            title: '¿Actualmente está sola o acompañada?', dataIndex: 'estadoPareja', key: 'estadoPareja', render: (estadoPareja) => {
                if (estadoPareja === null || estadoPareja === undefined) {
                    return '';
                }
                return estadoPareja ? 'Sola' : 'Acompañada';
            }
        },
        { title: 'Fecha Nac. último hijo', dataIndex: 'fecNacHijo', key: 'fecNacHijo' },
        {
            title: 'Crioterapia', dataIndex: 'crioterapia', key: 'crioterapia', render: (crioterapia) => {
                if (crioterapia === null || crioterapia === undefined) {
                    return '';
                }
                return crioterapia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Biopsias por colposcopia', dataIndex: 'biopasis', key: 'biopasis', render: (biopasis) => {
                if (biopasis === null || biopasis === undefined) {
                    return '';
                }
                return biopasis ? 'Sí' : 'No';
            }
        },
        { title: 'Nº. Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
    ]

    // Columnas de Ant Patologicos Personales

    const columns1AntPatPer = [
        {
            title: 'Fibrodenoma', dataIndex: 'fibrodenoma', key: 'fibrodenoma', render: (fibrodenoma) => {
                if (fibrodenoma === null || fibrodenoma === undefined) {
                    return '';
                }
                return fibrodenoma ? 'Sí' : 'No';
            }
        },
        {
            title: 'CAM Izq', dataIndex: 'camIzq', key: 'camIzq', render: (camIzq) => {
                if (camIzq === null || camIzq === undefined) {
                    return '';
                }
                return camIzq ? 'Sí' : 'No';
            }
        },
        {
            title: 'CAM Der', dataIndex: 'camDer', key: 'camDer', render: (camDer) => {
                if (camDer === null || camDer === undefined) {
                    return '';
                }
                return camDer ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cácer uterino', dataIndex: 'cacerut', key: 'cacerut', render: (cacerut) => {
                if (cacerut === null || cacerut === undefined) {
                    return '';
                }
                return cacerut ? 'Sí' : 'No';
            }
        },
    ]

    const columns2AntPatPer = [
        {
            title: 'Matriz', dataIndex: 'matriz', key: 'matriz', render: (matriz) => {
                if (matriz === null || matriz === undefined) {
                    return '';
                }
                return matriz ? 'Sí' : 'No';
            }
        },
        {
            title: 'Extirpación', dataIndex: 'extirpacion', key: 'extirpacion', render: (extirpacion) => {
                if (extirpacion === null || extirpacion === undefined) {
                    return '';
                }
                return extirpacion ? 'Sí' : 'No';
            }
        },
        { title: 'ITS', dataIndex: 'its', key: 'its' },
        {
            title: 'VIH', dataIndex: 'vih', key: 'vih', render: (vih) => {
                if (vih === null || vih === undefined) {
                    return '';
                }
                return vih ? 'Sí' : 'No';
            }
        },
        {
            title: 'VIF', dataIndex: 'vif', key: 'vif', render: (vif) => {
                if (vif === null || vif === undefined) {
                    return '';
                }
                return vif ? 'Sí' : 'No';
            }
        },
    ]

    const columns3AntPatPer = [
        {
            title: 'Diabetes', dataIndex: 'diabetes', key: 'diabetes', render: (diabetes) => {
                if (diabetes === null || diabetes === undefined) {
                    return '';
                }
                return diabetes ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cardiopatía', dataIndex: 'cardiopatia', key: 'cardiopatia', render: (cardiopatia) => {
                if (cardiopatia === null || cardiopatia === undefined) {
                    return '';
                }
                return cardiopatia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Hipertensión', dataIndex: 'hipertension', key: 'hipertension', render: (hipertension) => {
                if (hipertension === null || hipertension === undefined) {
                    return '';
                }
                return hipertension ? 'Sí' : 'No';
            }
        },
        {
            title: 'Hepatopatías', dataIndex: 'hepatopatias', key: 'hepatopatias', render: (hepatopatias) => {
                if (hepatopatias === null || hepatopatias === undefined) {
                    return '';
                }
                return hepatopatias ? 'Sí' : 'No';
            }
        },
        {
            title: 'Nefropatía', dataIndex: 'nefropatia', key: 'nefropatia', render: (nefropatia) => {
                if (nefropatia === null || nefropatia === undefined) {
                    return '';
                }
                return nefropatia ? 'Sí' : 'No';
            }
        },
    ]

    const columns4AntPatPer = [
        {
            title: 'Cirugías', dataIndex: 'cirugias', key: 'cirugias', render: (cirugias) => {
                if (cirugias === null || cirugias === undefined) {
                    return '';
                }
                return cirugias ? 'Sí' : 'No';
            }
        },
        {
            title: 'Anemia', dataIndex: 'anemia', key: 'anemia', render: (anemia) => {
                if (anemia === null || anemia === undefined) {
                    return '';
                }
                return anemia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Alergia a medicamentos', dataIndex: 'alergiaMed', key: 'alergiaMed', render: (alergiaMed) => {
                if (alergiaMed === null || alergiaMed === undefined) {
                    return '';
                }
                return alergiaMed ? 'Sí' : 'No';
            }
        },
        {
            title: 'Alergia alimentaria', dataIndex: 'alergiaAli', key: 'alergiaAli', render: (alergiaAli) => {
                if (alergiaAli === null || alergiaAli === undefined) {
                    return '';
                }
                return alergiaAli ? 'Sí' : 'No';
            }
        },
        { title: 'Número de expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
    ]

    const handleEditPaciente = () => {

        if (data) {
            navigate(`/editar-paciente/${data.numExpediente}`);
        } else {
            message.warning('No hay Datos Para Editar');
        }

    };

    const handleEditAntPersonales = () => {

        if (antecedentesPersonales) {
            navigate(`/editar-antecedentes-personales/${antecedentesPersonales.numExpediente}`);
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    const handleEditAntPatPer = () => {

        if (antPatPer) {
            navigate(`/editar-antecedentes-patologicos-personales/${antPatPer.numExpediente}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    return (
        <>
            <div className='container-fluid'>
                <h4>Buscar Historia Clinica</h4>
            </div>
            <form onSubmit={handleSearchSubmit} className="container mt-3 p-3">
                <div className="row g-3">
                    <div className="col-sm-3">
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion...</option>
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
            <div className="container-fluid" >
                <div className='d-flex'>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true">Datos Generales</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false">A. Personales</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false">A. Patológicos Personales</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="APF-tab" data-bs-toggle="tab" role="tab" href="#APF" aria-controls="APF" aria-selected="false">A. Patológicos Familiares</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="informacion" data-bs-toggle="tab" role="tab" href="#informacion" aria-controls="Informacion" aria-selected="false">Información</a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
                        <Table className='custom-table mt-3' columns={columns1} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns2} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns3} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns4} dataSource={[data]} pagination={false} />

                        <div className='container mt-4 d-flex justify-content-end gap-2'>
                            <button onClick={handleEditPaciente} className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Exportar a PDF</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum1AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum2AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum3AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum4AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <div className='container mt-4 d-flex justify-content-end gap-2'>
                            <button onClick={handleEditAntPersonales} className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Exportar a PDF</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="APP" role="tabpanel" aria-labelledby="APP-tab">
                        <Table className='mt-3 custom-table' columns={columns1AntPatPer} dataSource={[antPatPer]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns2AntPatPer} dataSource={[antPatPer]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns3AntPatPer} dataSource={[antPatPer]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns4AntPatPer} dataSource={[antPatPer]} pagination={false} rowKey="codAntparper" />
                        <div className='container mt-4 d-flex justify-content-end gap-2'>
                            <button onClick={handleEditAntPatPer} className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Exportar a PDF</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
