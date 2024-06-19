import './Buscar.css';

import { useState } from 'react';
import axios from 'axios';

import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { FilePdfOutlined } from '@ant-design/icons';
import { Table } from 'antd';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
    },
    header: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1 solid black',
        marginLeft: '10px',
        width: '300px',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.header}>HISTORIA CLINICA</Text>
            <View style={styles.section}>
                <Text style={styles.label}>CENTRO DE MUJERES IXCHEN</Text>
                <Text style={styles.value}>Fecha: {data && data.fechaIngreso}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Nombre y Apellidos:</Text>
                <Text style={styles.value}>{data && `${data.primerNombre} ${data.segundoNombre} ${data.primerApellido} ${data.segundoApellido}`}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Cédula:</Text>
                <Text style={styles.value}>{data && data.cedula}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Número de expediente:</Text>
                <Text style={styles.value}>{data && data.numExpediente}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Edad:</Text>
                <Text style={styles.value}>{data && data.edad}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Sexo:</Text>
                <Text style={styles.value}>{data && data.sexo}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Escolaridad:</Text>
                <Text style={styles.value}>{data && data.escolaridad}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Profesión/Oficio:</Text>
                <Text style={styles.value}>{data && data.profesion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Dirección:</Text>
                <Text style={styles.value}>{data && data.direccion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Departamento:</Text>
                <Text style={styles.value}>{data && data.codDepartamento}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Presión:</Text>
                <Text style={styles.value}>{data && data.presion}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Temperatura (°C):</Text>
                <Text style={styles.value}>{data && data.temperatura}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Peso (Kg):</Text>
                <Text style={styles.value}>{data && data.peso}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Talla (Mtrs):</Text>
                <Text style={styles.value}>{data && data.talla}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>IMC:</Text>
                <Text style={styles.value}>{data && data.imc}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Fecha del registro:</Text>
                <Text style={styles.value}>{data && data.fechaIngreso}</Text>
            </View>
        </Page>
    </Document>
);

export const BuscarHistoria = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState('');
    const [antecedentesPersonales, setAntPersonales] = useState('');


    const handleSearchSubmit = async (event) => {

        event.preventDefault();

        let response;
        let antPerData;

        try {

            if (searchType === 'opcion_expediente') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarpornumexpediente', {
                    params: { NumExpediente: searchValue }
                });

                antPerData = await axios.get('https://localhost:7106/api/bdtbantecedentespersonale/buscarporexpediente', {
                    params: { NumExpediente: searchValue }
                });

            } else if (searchType === 'opcion_cedula') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarporcedula', {
                    params: { cedula: searchValue }
                });

            }
            console.log(response.data);
            console.log(antPerData.data)
            setData(response.data);
            setAntPersonales(antPerData.data);
        } catch (error) {
            console.error(error);
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
        { title: '¿Has estado embarazada?', dataIndex: 'histEmbarazo', key: 'histEmbarazo', render: (histEmbarazo) => (histEmbarazo ? 'Sí' : 'No'), },
        { title: 'Gestas', dataIndex: 'gestas', key: 'gestas' },
    ]

    const colum2AntPer = [
        { title: 'Partos', dataIndex: 'partos', key: 'partos' },
        { title: 'Abortos', dataIndex: 'abortos', key: 'abortos' },
        { title: 'cesarea', dataIndex: 'cesarea', key: 'cesarea' },
        { title: 'FUM', dataIndex: 'fum', key: 'fum' },
        { title: 'SA', dataIndex: 'sa', key: 'sa' },
        { title: '¿Lactancia Materna?', dataIndex: 'lactancia', key: 'lactancia', render: (lactancia) => (lactancia ? 'Sí' : 'No') },
        { title: '¿Esta Embarazada?', dataIndex: 'embarazo', key: 'embarazo', render: (embarazo) => (embarazo ? 'Sí' : 'No') },
    ]

    const colum3AntPer = [
        { title: '¿Mamografía al día?', dataIndex: 'mamografia', key: 'mamografia', render: (mamografia) => (mamografia ? 'Sí' : 'No') },
        { title: '¿PAP al día?', dataIndex: 'pap', key: 'pap', render: (pap) => (pap ? 'Sí' : 'No') },
        { title: '¿PAP Alterado', dataIndex: 'papAlterado', key: 'papAlterado', render: (papAlterado) => (papAlterado ? 'Sí' : 'No') },
        { title: 'Ultimo Pap', dataIndex: 'histPap', key: 'histPap' },
        { title: 'Edad de Menopausia', dataIndex: 'menopausia', key: 'menopausia' },
        { title: '¿Terapia Reemplazo Hormonal?', dataIndex: 'reempHormonal', key: 'reempHormonal', render: (reempHormonal) => (reempHormonal ? 'Sí' : 'No') },
        { title: '¿Fuma?', dataIndex: 'fuma', key: 'fuma', render: (fuma) => (fuma ? 'Sí' : 'No') },
    ]

    const colum4AntPer = [
        { title: 'Cigarros por Dia', dataIndex: 'cigarrosDia', key: 'cigarrosDia' },
        { title: '¿Actualmente está sola o acompañada?', dataIndex: 'abortos', key: 'abortos' },
        { title: '¿Actualmente está sola o acompañada?', dataIndex: 'estadoPareja', key: 'estadoPareja', render: (estadoPareja) => (estadoPareja ? 'Acompañada' : 'Sola') },
        { title: 'Fecha Nac. último hijo', dataIndex: 'fecNacHijo', key: 'fecNacHijo' },
        { title: 'Crioterapia', dataIndex: 'crioterapia', key: 'crioterapia', render: (crioterapia) => (crioterapia ? 'Sí' : 'No') },
        { title: 'Biopsias por colposcopia', dataIndex: 'biopasis', key: 'biopasis', render: (biopasis) => (biopasis ? 'Sí' : 'No') },
        { title: 'Nº. Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
    ]

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
                            <a className="nav-link text-secondary" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false">Antecedentes Personales</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false">Antecedentes Patológicos Personales</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className="nav-link text-secondary" id="APF-tab" data-bs-toggle="tab" role="tab" href="#APF" aria-controls="APF" aria-selected="false">Antecedentes Patológicos Familiares</a>
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
                        <div className='container mt-4 d-flex gap-2'>
                            <button className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Exportar a PDF</button>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum1AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum2AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum3AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum4AntPer} dataSource={[antecedentesPersonales]} pagination={false} />
                        <div className='container mt-4 d-flex gap-2'>
                            <button className='btn btn-warning'>Editar</button>
                            <button className='btn btn-danger'>Exportar a PDF</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
