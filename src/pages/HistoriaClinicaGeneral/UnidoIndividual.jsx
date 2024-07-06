import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from "antd";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

import { baseURL } from '../../api/apiURL';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0
    },
    title: {
        fontSize: 13,
        fontWeight: 'bold',
        padding: 3
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row"
    },
    tableColIndex: {
        width: "8%", // Ancho de la columna de índices
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColDescription: {
        width: "82%", // Ancho de la columna de descripción
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'left'
    },
    tableColYesNo: {
        width: "10%", // Ancho de la columna de Sí/No
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10
    },
    tableCellDesc: {
        marginTop: 5,
        fontSize: 10,
        paddingLeft: 3
    },
    twoValues: {
        flexDirection: 'row',
        marginBottom: 10,
        gap: 6
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
        marginRight: 5,
    },
    value: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '50%',
        marginBottom: 5,
        fontSize: 12,
    },
    valueFullName: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '70%',
        marginBottom: 5,
        fontSize: 12,
        paddingLeft: 10
    },
    valueExp: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '40%',
        marginBottom: 5,
        fontSize: 12,
    },
    textHeader: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 40
    },
    textWar: {
        fontSize: 12,
        marginTop: 20,
        marginBottom: 20
    },
    footer: {
        marginTop: 40
    }
});

const MyDocument = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.textHeader}>FORMULARIO DE CLASIFICACIÓN DEL RIESGO, CRITERIOS PARA CLASIFICAR EL RIESGO EN ATENCIÓN PRENATAL, NORMATIVA 011 TERCERA EDICIÓN.</Text>
            <View style={styles.twoValues}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre y Apellidos</Text>
                    <Text style={styles.valueFullName}>{data.primeR_NOMBRE} {data.segundO_NOMBRE} {data.primeR_APELLIDO} {data.segundO_APELLIDO
                    }</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>No. Expediente:</Text>
                    <Text style={styles.valueExp}>{data.nuM_EXPEDIENTE}</Text>
                </View>
            </View>

            <View style={styles.twoValues}>
                <View style={styles.row}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.valueFullName}>{data.direccion}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Telefono:</Text>
                    <Text style={styles.valueExp}>{data.telefono}</Text>
                </View>
            </View>
            {/*Obstetricos*/}
            <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.title}>Antecedente Obstétrico</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    {/* Fila de ejemplo con índice */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>1</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Muerte fetal o muerte neonatal previas (28SG - 7 días de vida)</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.muertE_FETAL ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>2</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Antecedentes de 3 o más abortos espontáneos consecutivos</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.anT_ABORTOS ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>3</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 2500g</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.pesO_250 ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>4</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 4500g</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.pesO_450 ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>5</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>¿Estuvo internada por hipertensión arterial o preeclampsia/eclampsia en el último embarazo?</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.internada ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>6</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Cirugías previas en el tracto reproductivo</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.cirugiaS_PREVIAS ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/*Actual*/}
            <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.title}>Embarazo Actual</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>7</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Diagnóstico</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.diagnostico ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>8</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Menor de 20 años de edad</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.menoR20 ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>9</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Más de 35 años de edad</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.mayordE35 ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>10</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Isoinmunización RH negativa en el embarazo actual</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.isoinmunizacion ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>11</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Sangrado Vaginal</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.sangradov ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>12</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Masa Pélvica</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.masA_PELVICA ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>13</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Presión Arterial</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.presioN_ARTERIAL ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/*HCG*/}
            <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.title}>Historia Clinica General</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>14</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Diabetes Mellitus insulino dependiente</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.diabeteS_MELLITUS ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>15</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Nefropatia</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.nefropatia ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>16</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Cardiopatia</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.cardiopatia ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>17</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Consumo de drogas (incluido consumo excesivo de alcohol) tabaquismo</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.consumO_DROGAS ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}>18</Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Cualquier enfermedad o afección médica severa/obesidad (indice mayor de 30), especifique.</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.cualquieR_OTRO ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <Text style={styles.textWar}>Una respuesta en cualquiera de las preguntas anteriores (es decir una cruz en cualquier casilla amarilla renombrada Si) significa que la embarazada se debe clasificar cómo Atención Prenatal de Alto Riesgo.</Text>

            <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableColDescription}>
                            <Text style={styles.tableCellDesc}>Es Elegible para Atención prenatal de Alto Riesgo?</Text>
                        </View>
                        <View style={styles.tableColYesNo}>
                            <Text style={styles.tableCell}>{data.altO_RIESGO ? 'Sí' : 'No'}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <Text style={styles.textWar}>Si la respuesta es NO, será atendida en Atención de Bajo Riesgo.</Text>

            <View style={styles.footer}>
                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.valueExp}>{data.fecha}</Text>
                </View>
            </View>

        </Page>
    </Document>
);

export const UnidoIndividual = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbclasificaionriesgo/buscarporcodigoclasificacionriesgo`, {
                    params: { COD_HOJARIESGO: id }
                });

                console.log(response.data[0]);

                setFormData(response.data[0]);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const columns1 = [
        { title: 'No. Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
        { title: 'Codigo Doctor', dataIndex: 'coD_DOCTOR', key: 'coD_DOCTOR' },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
        { title: 'Primer Nombre', dataIndex: 'primeR_NOMBRE', key: 'primeR_NOMBRE' },
        { title: 'Segundo Nombre', dataIndex: 'segundO_NOMBRE', key: 'segundO_NOMBRE' },
        { title: 'Primer Apellido', dataIndex: 'primeR_APELLIDO', key: 'primeR_APELLIDO' },
        { title: 'Segundo Apellido', dataIndex: 'segundO_APELLIDO', key: 'segundO_APELLIDO' },
    ]

    const columns2 = [
        {
            title: 'Muerte Fetal', dataIndex: 'muertE_FETAL', key: 'muertE_FETAL', render: (muertE_FETAL) => {
                if (muertE_FETAL === null || muertE_FETAL === undefined) {
                    return '';
                }
                return muertE_FETAL ? 'Sí' : 'No';
            }
        },
        {
            title: 'Peso 250', dataIndex: 'pesO_250', key: 'pesO_250', render: (pesO_250) => {
                if (pesO_250 === null || pesO_250 === undefined) {
                    return '';
                }
                return pesO_250 ? 'Sí' : 'No';
            }
        },
        {
            title: 'Peso 450', dataIndex: 'pesO_450', key: 'pesO_450', render: (pesO_450) => {
                if (pesO_450 === null || pesO_450 === undefined) {
                    return '';
                }
                return pesO_450 ? 'Sí' : 'No';
            }
        },
        {
            title: 'Internada', dataIndex: 'internada', key: 'internada', render: (internada) => {
                if (internada === null || internada === undefined) {
                    return '';
                }
                return internada ? 'Sí' : 'No';
            }
        },
        {
            title: 'Antecedente Abortos', dataIndex: 'anT_ABORTOS', key: 'anT_ABORTOS', render: (anT_ABORTOS) => {
                if (anT_ABORTOS === null || anT_ABORTOS === undefined) {
                    return '';
                }
                return anT_ABORTOS ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cirugias Previas', dataIndex: 'cirugiaS_PREVIAS', key: 'cirugiaS_PREVIAS', render: (cirugiaS_PREVIAS) => {
                if (cirugiaS_PREVIAS === null || cirugiaS_PREVIAS === undefined) {
                    return '';
                }
                return cirugiaS_PREVIAS ? 'Sí' : 'No';
            }
        },
        {
            title: 'Diagnostico', dataIndex: 'diagnostico', key: 'diagnostico', render: (diagnostico) => {
                if (diagnostico === null || diagnostico === undefined) {
                    return '';
                }
                return diagnostico ? 'Sí' : 'No';
            }
        },
    ]

    const columns3 = [
        {
            title: 'Menor de 20', dataIndex: 'menoR20', key: 'menoR20', render: (menoR20) => {
                if (menoR20 === null || menoR20 === undefined) {
                    return '';
                }
                return menoR20 ? 'Sí' : 'No';
            }
        },
        {
            title: 'Mayor de 35', dataIndex: 'mayordE35', key: 'mayordE35', render: (mayordE35) => {
                if (mayordE35 === null || mayordE35 === undefined) {
                    return '';
                }
                return mayordE35 ? 'Sí' : 'No';
            }
        },
        {
            title: 'Iso Inmunización', dataIndex: 'isoinmunizacion', key: 'isoinmunizacion', render: (isoinmunizacion) => {
                if (isoinmunizacion === null || isoinmunizacion === undefined) {
                    return '';
                }
                return isoinmunizacion ? 'Sí' : 'No';
            }
        },
        {
            title: 'Sangrado Vaginal', dataIndex: 'sangradov', key: 'sangradov', render: (sangradov) => {
                if (sangradov === null || sangradov === undefined) {
                    return '';
                }
                return sangradov ? 'Sí' : 'No';
            }
        },
        {
            title: 'Masa Pelvica', dataIndex: 'masA_PELVICA', key: 'masA_PELVICA', render: (masA_PELVICA) => {
                if (masA_PELVICA === null || masA_PELVICA === undefined) {
                    return '';
                }
                return masA_PELVICA ? 'Sí' : 'No';
            }
        },
        {
            title: 'Presión Arterial', dataIndex: 'presioN_ARTERIAL', key: 'presioN_ARTERIAL', render: (presioN_ARTERIAL) => {
                if (presioN_ARTERIAL === null || presioN_ARTERIAL === undefined) {
                    return '';
                }
                return presioN_ARTERIAL ? 'Sí' : 'No';
            }
        },
    ]

    const columns4 = [
        {
            title: 'Diabetes Mellitus', dataIndex: 'diabeteS_MELLITUS', key: 'diabeteS_MELLITUS', render: (diabeteS_MELLITUS) => {
                if (diabeteS_MELLITUS === null || diabeteS_MELLITUS === undefined) {
                    return '';
                }
                return diabeteS_MELLITUS ? 'Sí' : 'No';
            }
        },
        {
            title: 'Nefropatia', dataIndex: 'nefropatia', key: 'nefropatia', render: (nefropatia) => {
                if (nefropatia === null || nefropatia === undefined) {
                    return '';
                }
                return nefropatia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cardiopatia', dataIndex: 'cardiopatia', key: 'cardiopatia', render: (cardiopatia) => {
                if (cardiopatia === null || cardiopatia === undefined) {
                    return '';
                }
                return cardiopatia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Consumo Drogas', dataIndex: 'consumO_DROGAS', key: 'consumO_DROGAS', render: (consumO_DROGAS) => {
                if (consumO_DROGAS === null || consumO_DROGAS === undefined) {
                    return '';
                }
                return consumO_DROGAS ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cualquier Otro', dataIndex: 'cualquieR_OTRO', key: 'cualquieR_OTRO', render: (cualquieR_OTRO) => {
                if (cualquieR_OTRO === null || cualquieR_OTRO === undefined) {
                    return '';
                }
                return cualquieR_OTRO ? 'Sí' : 'No';
            }
        },
    ]

    const columns5 = [
        {
            title: 'Alto Riesgo', dataIndex: 'altO_RIESGO', key: 'altO_RIESGO', render: (altO_RIESGO) => {
                if (altO_RIESGO === null || altO_RIESGO === undefined) {
                    return '';
                }
                return altO_RIESGO ? 'Sí' : 'No';
            }
        },
        { title: 'Primer Nombre Doctor', dataIndex: 'primeR_NOMBRED', key: 'primeR_NOMBRED' },
        { title: 'Primer Apellido Doctor', dataIndex: 'primeR_APELLIDOD', key: 'primeR_APELLIDOD' },
        { title: 'Código Doctor', dataIndex: 'coD_DOCTOR', key: 'coD_DOCTOR' },
    ]

    const handleBack = () => {
        navigate(`/unidos/${formData.nuM_EXPEDIENTE}`);
    }

    return (
        <div className="container-fluid">
            <div className='container-fluid d-flex align-items-center justify-content-between'>
                <h4>Clasificación de Riesgo</h4>
                <div className='d-flex gap-2'>
                    <PDFDownloadLink document={<MyDocument data={formData} />} fileName="clasificacio_de_riesgo.pdf">
                        {({ loading }) =>
                            loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar a PDF</Button>
                        }
                    </PDFDownloadLink>
                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
                </div>
            </div>

            <Table columns={columns1} dataSource={[formData]} className='container-fluid custom-table mt-4' pagination={false} />
            <Table columns={columns2} dataSource={[formData]} className='container-fluid custom-table mt-4' pagination={false} />
            <Table columns={columns3} dataSource={[formData]} className='container-fluid custom-table mt-4' pagination={false} />
            <Table columns={columns4} dataSource={[formData]} className='container-fluid custom-table mt-4' pagination={false} />
            <Table columns={columns5} dataSource={[formData]} className='container-fluid custom-table mt-4' pagination={false} />
        </div>
    )
}
