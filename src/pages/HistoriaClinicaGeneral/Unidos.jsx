import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import { ArrowLeftOutlined, FileSearchOutlined, FilePdfOutlined, PrinterOutlined, RollbackOutlined, DownloadOutlined } from '@ant-design/icons';
import { Table, Button, Input, Space } from "antd";
import { Modal } from "react-bootstrap";

import { baseURL } from "../../api/apiURL";
import { useAuth } from "../../context/AuthContext";


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
        width: "5%", // Ancho de la columna de índices
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    tableColDescription: {
        width: "75%", // Ancho de la columna de descripción
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        textAlign: 'left'
    },
    tableColYesNo: {
        width: "5%", // Ancho de la columna de Sí/No
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

const MyDocument = ({ data }) => {

    if (!data || data.length === 0) {
        return (
            <Document>
                <Page style={styles.page}>
                    <Text>No hay datos disponibles</Text>
                </Page>
            </Document>
        );
    }

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.textHeader}>FORMULARIO DE CLASIFICACIÓN DEL RIESGO, CRITERIOS PARA CLASIFICAR EL RIESGO EN ATENCIÓN PRENATAL, NORMATIVA 011 TERCERA EDICIÓN.</Text>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nombre y Apellidos</Text>
                        <Text style={styles.valueFullName}>{data[0].primeR_NOMBRE} {data[0].segundO_NOMBRE} {data[0].primeR_APELLIDO} {data[0].segundO_APELLIDO
                        }</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>No. Expediente:</Text>
                        <Text style={styles.valueExp}> {data[0].nuM_EXPEDIENTE.split('-').slice(0, 2).join('-')}</Text>
                    </View>
                    {/* <View style={styles.row}>
                        <Text style={styles.label}>No. Expediente:</Text>
                        <Text style={styles.valueExp}>{data[0].nuM_EXPEDIENTE}</Text>
                    </View> */}
                </View>

                {/* <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Dirección:</Text>
                        <Text style={styles.valueFullName}>{data[0].direccion}</Text>
                    </View>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>Telefono:</Text>
                        <Text style={styles.valueExp}>{data[0].telefono}</Text>
                    </View>
                </View> */}

                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Dirección:</Text>
                        <Text style={styles.valueFullName}>{data[0].direccion}</Text>
                    </View>
                    
                    <View style={[styles.row, { marginRight: -130 }]}>
                    <Text style={styles.label}>Telf:</Text>
                    <Text style={styles.valueExp}>{data[0].telefono}</Text>
                </View>

                </View>

                <View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColIndex}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        
                        <View style={styles.tableColDescription}>
                            <Text style={styles.title}>Antecedente Obstétrico</Text>
                        </View>
                        {
                            // Generamos 4 columnas con los valores 1CPN, 2CPN, 3CPN, 4CPN
                            Array.from({ length: 4 }).map((_, index) => (
                                <View style={styles.tableColYesNo} key={index}>
                                    <Text style={styles.tableCell}>
                                        {/* Se usa index + 1 para mostrar el número correspondiente */}
                                        {`${index + 1}CPN`}
                                    </Text>
                                </View>
                                ))
                            }
                        </View>
                    </View>
                    
                    {/* Agrega los datos por array dependiendo del contol que ingresa  */}
                    {/* <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.title}>Antecedente Obstétrico</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? data[index].nuM_CITA : ""}CPN
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View> */}

                    <View style={styles.table}>
                        {/* Fila de ejemplo con índice */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>1</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Muerte fetal o muerte neonatal previas (28SG - 7 días de vida)</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].muertE_FETAL ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>2</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Antecedentes de 3 o más abortos espontáneos consecutivos</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].anT_ABORTOS ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>3</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 2500g</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].pesO_250 ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>4</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 4500g</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].pesO_450 ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>5</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>¿Estuvo internada por hipertensión arterial o preeclampsia/eclampsia en el último embarazo?</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].internada ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>6</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Cirugías previas en el tracto reproductivo</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].cirugiaS_PREVIAS ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
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
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>7</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Diagnóstico o sospecha de embarazo múltiple</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].diagnostico ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>8</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Menor de 20 años de edad</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].menoR20 ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>9</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Más de 35 años de edad</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].mayordE35 ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>10</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Isoinmunización RH negativa en el embarazo actual o en embarazos anteriores</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].isoinmunizacion ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>11</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Sangrado Vaginal</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].sangradov ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>12</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Masa Pélvica</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].masA_PELVICA ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>13</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Presión Arterial Diastólica de 90mmHg o más durante el registro de datos</Text>
                            </View>
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].presioN_ARTERIAL ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

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
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}></Text>
                                    </View>
                                ))
                            }
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
                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].diabeteS_MELLITUS ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>15</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Nefropatia</Text>
                            </View>

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].nefropatia ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>16</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Cardiopatia</Text>
                            </View>

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].cardiopatia ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>17</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Consumo de drogas (incluido consumo excesivo de alcohol) tabaquismo</Text>
                            </View>

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].consumO_DROGAS ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColIndex}>
                                <Text style={styles.tableCell}>18</Text>
                            </View>
                            <View style={styles.tableColDescription}>
                                <Text style={styles.tableCellDesc}>Cualquier enfermedad o afección médica severa/obesidad (indice mayor de 30), por favor especifique.</Text>
                            </View>

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].cualquieR_OTRO ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

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

                            {
                                Array.from({ length: 4 }).map((_, index) => (
                                    <View style={styles.tableColYesNo} key={index}>
                                        <Text style={styles.tableCell}>
                                            {data[index] ? (data[index].altO_RIESGO ? 'Sí' : 'No') : ''}
                                        </Text>
                                    </View>
                                ))
                            }

                        </View>
                    </View>
                </View>

                <Text style={styles.textWar}>Si la respuesta es NO, será atendida en Atención de Bajo Riesgo.</Text>

                <View style={styles.footer}>
                    <View style={styles.twoValues}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Fecha:</Text>
                            <Text style={styles.valueExp}>{data[0].fecha}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Nombre:</Text>
                            <Text style={styles.value}>{data[0].primeR_NOMBRED} {data[0].primeR_APELLIDOD}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Firma:</Text>
                            <Text style={styles.valueExp}></Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )

}

const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize));
    }
    return result;
};


export const Unidos = () => {

    const [visible, setVisible] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    const handlePreview = (url) => {
        setPreviewUrl(url + '#toolbar=0');
        setVisible(true);
    };

    const handleClose = () => {
        setVisible(false);
        setPreviewUrl('');
    };


    // id es el nuM_EXPEDIENTE
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [unidosExp, setUnidosExp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetchUnidosExp();

    }, []);

    const fetchUnidosExp = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtbclasificaionriesgo/buscarpornumexpedienteclasificacionriesgo`, {
                params: { NUM_EXPEDIENTE: id }
            });
    
            const dataWithUniqueKey = response.data.map((item, index) => ({
                ...item,
                uniqueKey: `${item.coD_HOJARIESGO}-${index}`
            }));
    
            setUnidosExp(dataWithUniqueKey);
            console.log(dataWithUniqueKey);
        } catch (error) {
            setError(error.response ? error.response.data : 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    // Dividimos los datos en grupos de 4
    const chunkedData = chunkArray(unidosExp, 4);

    const column = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
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

    const handleBack = () => {
        navigate('/buscar-historia-clinica-general');
    }

    const handleUnidoIndividual = (coD_HOJARIESGO) => {
        navigate(`/unido/${coD_HOJARIESGO}`)
    }

return (
    <div className="container-fluid">
        <div className="container-fluid d-flex justify-content-between align-items-center">
            <h4>Clasificación de Riesgo: {id}</h4>
            <div className="d-flex gap-2">
                
            {
                    user && (user.codRol === 2) && (
                        chunkedData.map((chunk, index) => (
                            <BlobProvider key={index} document={<MyDocument data={chunk} />}>
                                {({ url }) => (
                                        <>
                                            <Button onClick={() => handlePreview(url)}>
                                                <FilePdfOutlined style={{ fontSize: '20px', color: 'blue' }} /> Visualizar PDF {index + 1}
                                            </Button>
                                            <Modal
                                                show={visible}
                                                title="Previsualización del PDF"
                                                footer={null}
                                                size='xl'
                                                onHide={handleClose}
                                                centered
                                            >
                                                <iframe
                                                    src={previewUrl}
                                                    style={{ width: '100%', height: '80vh' }}
                                                ></iframe>
            
                                                <Modal.Footer>
                                                    <Button danger key="close" onClick={handleClose}>
                                                        Cerrar
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </>
                                )   }
                            </BlobProvider>
                        ))
                    )
                }

                {
                    user && (user.codRol === 1 || user.codRol === 3) && chunkedData.map((chunk, index) => (
                        <BlobProvider document={<MyDocument data={chunk} />}>
                            {({ url, blob }) => (
                                <>
                                    {/* Botón para previsualizar el PDF en un modal */}
                                    <Button onClick={() => handlePreview(url)}>
                                        <FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} /> Imprimir PDF {index + 1}
                                    </Button>
                                    {/* Modal para la previsualización */}
                                    <Modal
                                        show={visible}
                                        title="Imprimir PDF"
                                        footer={null}
                                        size='xl'
                                        onHide={handleClose}
                                        centered
                                    >
                                        <iframe
                                        // Añade el uso para mostrar la barra de herramientas de PDF
                                        src={previewUrl}
                                        id="pdf-frame"
                                        style={{ width: '100%', height: '80vh' }}
                                        ></iframe>

                                        {/* BOTON DE IMPRIMIR */}
                                        {/* Añadimos un botón personalizado para imprimir el PDF */}
                                        <Modal.Footer>
                                            <Button
                                                style={{ color: 'blue', border: '1px solid blue' }} // Aplica color al texto y al borde
                                                onClick={() => {
                                                    const iframe = document.getElementById('pdf-frame');
                                                    if (iframe) {
                                                        iframe.contentWindow.focus();
                                                        iframe.contentWindow.print();
                                                    }
                                                }}
                                            >
                                                <PrinterOutlined style={{ fontSize: '20px', color: 'blue' }} /> {/* El icono también es azul */}
                                                Imprimir PDF
                                            </Button>

                                            {/* BOTON DE DESCARGAR */}
                                            <PDFDownloadLink key={index} document={<MyDocument data={chunk} />} fileName={`Clasificación de Riesgo ${index + 1}.pdf`}>
                                                    {({ loading }) =>
                                                        loading ? 'Cargando documento...' : (
                                                            <Button style={{ color: 'green', border: '1px solid green' }}> {/* Estilos añadidos aquí */}
                                                                <DownloadOutlined style={{ fontSize: '20px', color: 'green' }} />
                                                                Descargar PDF
                                                            </Button>
                                                        )
                                                    }
                                            </PDFDownloadLink>
                            
                                            <Button style={{ color: 'red', border: '1px solid red' }} onClick={handleClose}>
                                                <RollbackOutlined style={{ fontSize: '20px', color: 'red' }} /> 
                                                Cerrar
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </>
                            )}
                        </BlobProvider>

                        // Uso anterior
                        //     <PDFDownloadLink key={index} document={<MyDocument data={chunk} />} fileName={`Clasificación de Riesgo ${index + 1}.pdf`}>
                        //         {({ loading }) =>
                        //             loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar a PDF {index + 1}</Button>
                        //         }
                        //     </PDFDownloadLink>
                    ))
                }

                <Button style={{ variant: 'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
        </div>
        <Table
            className="custom-table mt-4"
            columns={column}
            dataSource={unidosExp}
            pagination={{ pageSize: 20 }}
            rowKey="uniqueKey"
            onRow={(record) => ({
                onClick: () => handleUnidoIndividual(record.coD_HOJARIESGO),
            })}
        />
    </div>
)

}

//Codigo de uso anterior correcto 09-10-2024
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

// import { ArrowLeftOutlined, FileSearchOutlined, FilePdfOutlined } from '@ant-design/icons';
// import { Table, Button, Input, Space } from "antd";
// import { Modal } from "react-bootstrap";

// import { baseURL } from "../../api/apiURL";
// import { useAuth } from "../../context/AuthContext";

// const styles = StyleSheet.create({
//     page: {
//         padding: 30,
//     },
//     section: {
//         margin: 10,
//         padding: 10,
//     },
//     table: {
//         display: "table",
//         width: "auto",
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderRightWidth: 0,
//         borderBottomWidth: 0
//     },
//     title: {
//         fontSize: 13,
//         fontWeight: 'bold',
//         padding: 3
//     },
//     tableRow: {
//         margin: "auto",
//         flexDirection: "row"
//     },
//     tableColIndex: {
//         width: "5%", // Ancho de la columna de índices
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderTopWidth: 0
//     },
//     tableColDescription: {
//         width: "75%", // Ancho de la columna de descripción
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderTopWidth: 0,
//         textAlign: 'left'
//     },
//     tableColYesNo: {
//         width: "5%", // Ancho de la columna de Sí/No
//         borderStyle: "solid",
//         borderWidth: 1,
//         borderLeftWidth: 0,
//         borderTopWidth: 0
//     },
//     tableCell: {
//         margin: "auto",
//         marginTop: 5,
//         fontSize: 10
//     },
//     tableCellDesc: {
//         marginTop: 5,
//         fontSize: 10,
//         paddingLeft: 3
//     },
//     twoValues: {
//         flexDirection: 'row',
//         marginBottom: 10,
//         gap: 6
//     },
//     row: {
//         flexDirection: 'row',
//         marginBottom: 10,
//     },
//     label: {
//         fontSize: 12,
//         marginBottom: 4,
//         marginRight: 5,
//     },
//     value: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//         width: '50%',
//         marginBottom: 5,
//         fontSize: 12,
//     },
//     valueFullName: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//         width: '70%',
//         marginBottom: 5,
//         fontSize: 12,
//         paddingLeft: 10
//     },
//     valueExp: {
//         borderBottomWidth: 1,
//         borderBottomColor: '#000',
//         width: '40%',
//         marginBottom: 5,
//         fontSize: 12,
//     },
//     textHeader: {
//         fontSize: 10,
//         textAlign: 'center',
//         marginBottom: 40
//     },
//     textWar: {
//         fontSize: 12,
//         marginTop: 20,
//         marginBottom: 20
//     },
//     footer: {
//         marginTop: 40
//     }
// });

// const MyDocument = ({ data }) => {

//     if (!data || data.length === 0) {
//         return (
//             <Document>
//                 <Page style={styles.page}>
//                     <Text>No hay datos disponibles</Text>
//                 </Page>
//             </Document>
//         );
//     }

//     return (
//         <Document>
//             <Page style={styles.page}>
//                 <Text style={styles.textHeader}>FORMULARIO DE CLASIFICACIÓN DEL RIESGO, CRITERIOS PARA CLASIFICAR EL RIESGO EN ATENCIÓN PRENATAL, NORMATIVA 011 TERCERA EDICIÓN.</Text>
//                 <View style={styles.twoValues}>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>Nombre y Apellidos</Text>
//                         <Text style={styles.valueFullName}>{data[0].primeR_NOMBRE} {data[0].segundO_NOMBRE} {data[0].primeR_APELLIDO} {data[0].segundO_APELLIDO
//                         }</Text>
//                     </View>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>No. Expediente:</Text>
//                         <Text style={styles.valueExp}>{data[0].nuM_EXPEDIENTE}</Text>
//                     </View>
//                 </View>

//                 <View style={styles.twoValues}>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>Dirección:</Text>
//                         <Text style={styles.valueFullName}>{data[0].direccion}</Text>
//                     </View>
//                     <View style={styles.row}>
//                         <Text style={styles.label}>Telefono:</Text>
//                         <Text style={styles.valueExp}>{data[0].telefono}</Text>
//                     </View>
//                 </View>

//                 <View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}></Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.title}>Antecedente Obstétrico</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? data[index].nuM_CITA : ""}CPN
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.table}>
//                         {/* Fila de ejemplo con índice */}
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>1</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Muerte fetal o muerte neonatal previas (28SG - 7 días de vida)</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].muertE_FETAL ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>2</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Antecedentes de 3 o más abortos espontáneos consecutivos</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].anT_ABORTOS ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>3</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 2500g</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].pesO_250 ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>4</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Peso al nacer del último bebé menor de 4500g</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].pesO_450 ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>5</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>¿Estuvo internada por hipertensión arterial o preeclampsia/eclampsia en el último embarazo?</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].internada ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>6</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Cirugías previas en el tracto reproductivo</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].cirugiaS_PREVIAS ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                     </View>
//                 </View>
//                 {/*Actual*/}
//                 <View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}></Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.title}>Embarazo Actual</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}></Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>7</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Diagnóstico</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].diagnostico ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>8</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Menor de 20 años de edad</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].menoR20 ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>9</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Más de 35 años de edad</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].mayordE35 ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>10</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Isoinmunización RH negativa en el embarazo actual</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].isoinmunizacion ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>11</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Sangrado Vaginal</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].sangradov ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>12</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Masa Pélvica</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].masA_PELVICA ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>13</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Presión Arterial</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].presioN_ARTERIAL ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                     </View>
//                 </View>
//                 {/*HCG*/}
//                 <View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}></Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.title}>Historia Clinica General</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}></Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>14</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Diabetes Mellitus insulino dependiente</Text>
//                             </View>
//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].diabeteS_MELLITUS ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }
//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>15</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Nefropatia</Text>
//                             </View>

//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].nefropatia ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>16</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Cardiopatia</Text>
//                             </View>

//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].cardiopatia ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>17</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Consumo de drogas (incluido consumo excesivo de alcohol) tabaquismo</Text>
//                             </View>

//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].consumO_DROGAS ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}>18</Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Cualquier enfermedad o afección médica severa/obesidad (indice mayor de 30), especifique.</Text>
//                             </View>

//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].cualquieR_OTRO ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                     </View>
//                 </View>

//                 <Text style={styles.textWar}>Una respuesta en cualquiera de las preguntas anteriores (es decir una cruz en cualquier casilla amarilla renombrada Si) significa que la embarazada se debe clasificar cómo Atención Prenatal de Alto Riesgo.</Text>

//                 <View>
//                     <View style={styles.table}>
//                         <View style={styles.tableRow}>
//                             <View style={styles.tableColIndex}>
//                                 <Text style={styles.tableCell}></Text>
//                             </View>
//                             <View style={styles.tableColDescription}>
//                                 <Text style={styles.tableCellDesc}>Es Elegible para Atención prenatal de Alto Riesgo?</Text>
//                             </View>

//                             {
//                                 Array.from({ length: 4 }).map((_, index) => (
//                                     <View style={styles.tableColYesNo} key={index}>
//                                         <Text style={styles.tableCell}>
//                                             {data[index] ? (data[index].altO_RIESGO ? 'Sí' : 'No') : ''}
//                                         </Text>
//                                     </View>
//                                 ))
//                             }

//                         </View>
//                     </View>
//                 </View>

//                 <Text style={styles.textWar}>Si la respuesta es NO, será atendida en Atención de Bajo Riesgo.</Text>

//                 <View style={styles.footer}>
//                     <View style={styles.twoValues}>
//                         <View style={styles.row}>
//                             <Text style={styles.label}>Fecha:</Text>
//                             <Text style={styles.valueExp}>{data[0].fecha}</Text>
//                         </View>
//                         <View style={styles.row}>
//                             <Text style={styles.label}>Nombre:</Text>
//                             <Text style={styles.value}>{data[0].primeR_NOMBRED} {data[0].primeR_APELLIDOD}</Text>
//                         </View>
//                         <View style={styles.row}>
//                             <Text style={styles.label}>Firma:</Text>
//                             <Text style={styles.valueExp}></Text>
//                         </View>
//                     </View>
//                 </View>
//             </Page>
//         </Document>
//     )

// }


// export const Unidos = () => {

//     const [visible, setVisible] = useState(false);
//     const [previewUrl, setPreviewUrl] = useState('');

//     const handlePreview = (url) => {
//         setPreviewUrl(url + '#toolbar=0');
//         setVisible(true);
//     };

//     const handleClose = () => {
//         setVisible(false);
//         setPreviewUrl('');
//     };


//     // id es el nuM_EXPEDIENTE
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     const [unidosExp, setUnidosExp] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {

//         fetchUnidosExp();

//     }, []);

//     const fetchUnidosExp = async () => {

//         try {

//             const response = await axios.get(`${baseURL}/bdtbclasificaionriesgo/buscarpornumexpedienteclasificacionriesgo`, {
//                 params: { NUM_EXPEDIENTE: id }
//             });

//             const dataWithUniqueKey = response.data.map((item, index) => ({
//                 ...item,
//                 uniqueKey: `${item.coD_HOJARIESGO}-${index}`
//             }));

//             setUnidosExp(dataWithUniqueKey);

//             console.log(dataWithUniqueKey);

//         } catch (error) {

//             setError(error.response ? error.response.data : 'Error fetching data');

//         } finally {

//             setLoading(false);

//         }

//     };

//     const column = [
//         {
//             title: 'Fecha',
//             dataIndex: 'fecha',
//             key: 'fecha',
//         },
//         {
//             title: 'Numero de Expediente',
//             dataIndex: 'nuM_EXPEDIENTE',
//             key: 'nuM_EXPEDIENTE',
//         },
//         {
//             title: 'Primer Nombre',
//             dataIndex: 'primeR_NOMBRE',
//             key: 'primeR_NOMBRE',
//         },
//         {
//             title: 'Primer Apellido',
//             dataIndex: 'primeR_APELLIDO',
//             key: 'primeR_APELLIDO',
//         },
//         {
//             title: 'Acciones',
//             key: 'acciones',
//             render: (text, record) => (
//                 <Space align="center" size="middle">
//                     <Button icon={<FileSearchOutlined />} />
//                 </Space>
//             ),
//             align: 'center',
//         },
//     ]

//     const handleBack = () => {
//         navigate('/buscar-historia-clinica-general');
//     }

//     const handleUnidoIndividual = (coD_HOJARIESGO) => {
//         navigate(`/unido/${coD_HOJARIESGO}`)
//     }

//     return (
//         <div className="container-fluid">
//             <div className="container-fluid d-flex justify-content-between align-items-center">
//                 <h4>Clasificación de Riesgo del Expediente: {id}</h4>
//                 <div className="d-flex gap-2">

//                     <BlobProvider document={<MyDocument data={unidosExp} />}>
//                         {({ url }) => (
//                             <>
//                                 <Button onClick={() => handlePreview(url)}>
//                                     <FilePdfOutlined style={{ fontSize: '20px', color: 'blue' }} /> Visualizar PDF
//                                 </Button>
//                                 <Modal
//                                     show={visible}
//                                     title="Previsualización del PDF"
//                                     footer={null}
//                                     size='xl'
//                                     onHide={handleClose}
//                                     centered
//                                 >
//                                     <iframe
//                                         src={previewUrl}
//                                         style={{ width: '100%', height: '80vh' }}
//                                     ></iframe>

//                                     <Modal.Footer>
//                                         <Button danger key="close" onClick={handleClose}>
//                                             Cerrar
//                                         </Button>
//                                     </Modal.Footer>
//                                 </Modal>
//                             </>
//                         )}
//                     </BlobProvider>

//                     {
//                         user && (user.codRol === 1 || user.codRol === 3) && (
//                             <PDFDownloadLink document={<MyDocument data={unidosExp} />} fileName="Clasificación de Riesgo.pdf">
//                                 {({ loading }) =>
//                                     loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar a PDF</Button>
//                                 }
//                             </PDFDownloadLink>
//                         )
//                     }

//                     {/* <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button> */}
//                     <Button style={{ variant:'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
//                 </div>
//             </div>
//             <Table
//                 className="custom-table mt-4"
//                 columns={column}
//                 dataSource={unidosExp}
//                 pagination={{ pageSize: 7 }}
//                 rowKey="uniqueKey"
//                 onRow={(record) => ({
//                     onClick: () => handleUnidoIndividual(record.coD_HOJARIESGO),
//                 })}
//             />
//         </div>
//     )
// }
