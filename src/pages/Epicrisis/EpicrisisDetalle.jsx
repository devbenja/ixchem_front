import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { EditOutlined, FilePdfOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

import { baseURL } from '../../api/apiURL';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    logo: {
        width: 100,
        height: 100,
    },
    titleContainer: {
        marginLeft: 100,
        paddingTop: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 30,
        paddingLeft: 30,
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        marginRight: 5,
    },
    valueContainer: {
        border: '1 solid black',
        padding: 8,
        fontSize: 12,
    },
    image: {
        width: '100%',
        height: 'auto',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    value: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '50%',
        marginBottom: 5,
        fontSize: 12,
    },
    valueLarge: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '100%',
        marginBottom: 5,
        fontSize: 12,
        marginLeft: 20,
    },
    twoValues: {
        flexDirection: 'row',
        marginBottom: 10
    },
    rowDoctor: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    textDoctor: {
        borderBottom: '1pt solid black',
        textAlign: 'center',
        fontSize: 14,
        width: '200px'
    },
    labelDoctor: {
        fontSize: 12,
        textAlign: 'center'
    }
});

const MyDocument = ({ formData }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src="/logo.png" />
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>EPICRISIS</Text>
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Nombre y Apellido de la Usuaria:</Text>
                <Text style={styles.value}>{formData.primeR_NOMBRE} {formData.primeR_APELLIDO}</Text>
            </View>
            <View style={styles.twoValues}>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>{formData.fecha}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>hora:</Text>
                    <Text style={styles.value}>{formData.hora}</Text>
                </View>
            </View>
            <View style={styles.twoValues}>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha Ingreso:</Text>
                    <Text style={styles.value}>{formData.fechA_INGRESO}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha Egreso:</Text>
                    <Text style={styles.value}>{formData.fechA_EGRESO}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Diagnóstico o problema de ingreso:</Text>
                <View style={styles.valueContainer}>
                    <Text>{formData.diaG_INGRESO}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Diagnóstico o problema de egreso:</Text>
                <View style={styles.valueContainer}>
                    <Text>{formData.diaG_EGRESO}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Resultado de exámenes que fundamentaron el diagnóstico:</Text>
                <View style={styles.valueContainer}>
                    <Text>{formData.resultado}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Tratamiento recibido:</Text>
                <View style={styles.valueContainer}>
                    <Text>{formData.tratamiento}</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>Diagnósticos diferenciales descartados:</Text>
                <View style={styles.valueContainer}>
                    <Text>{formData.descartes}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Complicaciones:</Text>
                <Text style={styles.valueLarge}>{formData.complicaciones}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Recomendaciones:</Text>
                <Text style={styles.valueLarge}>{formData.recomendaciones}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Datos relevantes:</Text>
                <Text style={styles.valueLarge}>{formData.datoS_RELEVANTES}</Text>
            </View>


            <View style={styles.rowDoctor}>
                <Text style={styles.textDoctor}>{formData.primeR_NOMBRED} {formData.primeR_APELLIDOD}</Text>
                <Text style={styles.labelDoctor}>Médico Tratante</Text>
            </View>

        </Page>
    </Document>
);


export const EpicrisisDetalle = () => {

    const { codEpicrisis } = useParams();
    const [formData, setFormData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbepicrisis/buscarunidoporcodigoepicrisis`, {
                    params: { CodEpicrisis: codEpicrisis }
                });

                console.log(response.data);

                setFormData(response.data[0]);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codEpicrisis]);

    const columPaciente = [
        {
            title: 'Primer Nombre Paciente',
            dataIndex: 'primeR_NOMBRE',
            key: 'primeR_NOMBRE',
        },
        {
            title: 'Primer Apellido Paciente',
            dataIndex: 'primeR_APELLIDO',
            key: 'primeR_APELLIDO',
        },
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
    ]

    const column1 = [
        {
            title: 'Fecha Ingreso',
            dataIndex: 'fechA_INGRESO',
            key: 'fechA_INGRESO',
        },
        {
            title: 'Fecha Egreso',
            dataIndex: 'fechA_EGRESO',
            key: 'fechA_EGRESO',
        },
        {
            title: 'No. Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
        },
        {
            title: 'Codigo MINSA',
            dataIndex: 'coD_DOCTOR',
            key: 'coD_DOCTOR',
        },
    ]

    const column2 = [
        {
            title: 'Diagnostico Ingreso',
            dataIndex: 'diaG_INGRESO',
            key: 'diaG_INGRESO',
        },
        {
            title: 'Tratamiento',
            dataIndex: 'tratamiento',
            key: 'tratamiento',
        },
    ]

    const column3 = [
        {
            title: 'Resultado',
            dataIndex: 'resultado',
            key: 'resultado',
        },
        {
            title: 'Complicaciones',
            dataIndex: 'complicaciones',
            key: 'complicaciones',
        },
    ]

    const column4 = [
        {
            title: 'Descartes',
            dataIndex: 'descartes',
            key: 'descartes',
        },
        {
            title: 'Diagnostico Egreso',
            dataIndex: 'diaG_EGRESO',
            key: 'diaG_EGRESO',
        },
    ]

    const column5 = [
        {
            title: 'Recomendaciones',
            dataIndex: 'recomendaciones',
            key: 'recomendaciones',
        },
        {
            title: 'Datos Relevantes',
            dataIndex: 'datoS_RELEVANTES',
            key: 'datoS_RELEVANTES',
        },
    ]

    const columnaDoctor = [
        {
            title: 'Primer Nombre Doctor',
            dataIndex: 'primeR_NOMBRED',
            key: 'primeR_NOMBRED',
        },
        {
            title: 'Primer Apellido Doctor',
            dataIndex: 'primeR_APELLIDOD',
            key: 'primeR_APELLIDOD',
        },
        {
            title: 'Codigo MINSA',
            dataIndex: 'coD_DOCTOR',
            key: 'coD_DOCTOR',
        },
    ]

    const handleBack = () => {
        navigate(`/epicrisis/${formData.nuM_EXPEDIENTE}`)
    }

    const handleEdit = () => {
        navigate(`/editar-epicrisis/${formData.coD_EPICRISIS}`);
    };

    return (
        <div className="container-fluid">
            <div className='container-fluid d-flex justify-content-between'>
                <h4 className='mb-4'>Epicrisis</h4>

                <div className='gap-2 d-flex'>
                    <Button onClick={handleEdit}>
                        <EditOutlined style={{ fontSize: '20px', color: 'blue' }} />Editar
                    </Button>

                    <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="problemas.pdf">
                        {({ loading }) =>
                            loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar a PDF</Button>
                        }
                    </PDFDownloadLink>

                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
                </div>
            </div>

            <div className='container-fluid'>
                <Table className='custom-table' dataSource={[formData]} columns={columPaciente} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={column1} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={column2} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={column3} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={column4} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={column5} pagination={false} />
                <Table className='custom-table mt-3' dataSource={[formData]} columns={columnaDoctor} pagination={false} />
            </div>
        </div>
    )
}
