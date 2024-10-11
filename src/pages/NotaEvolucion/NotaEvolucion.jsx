import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { EditOutlined, FilePdfOutlined, ArrowLeftOutlined, PrinterOutlined, RollbackOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, BlobProvider } from '@react-pdf/renderer';
import { Modal } from 'react-bootstrap';
import { baseURL } from '../../api/apiURL';

import { useAuth } from '../../context/AuthContext';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFF',
        padding: 20,
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
        marginLeft: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    subTitle: {
        fontSize: 12,
        marginTop: 5,
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tableCol: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        flexShrink: 1,
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        wordWrap: 'break-word',
    },
    tableColFecha: {
        width: '20%',
    },
    tableColNumero: {
        width: '40%',
    },
    tableColNombre: {
        width: '40%',
    },
    tableCell: {
        fontSize: 10,
        height: 'auto',
    },
    headerRow: {
        backgroundColor: '#E4E4E4',
    },
    subHeader: {
        flexDirection: 'column',
    },
});

const MyDocument = ({ formData }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src="/logo.png" />
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>CENTRO DE MUJERES IXCHEN</Text>
                    <Text style={styles.subTitle}>NOTA DE EVOLUCION Y TRATAMIENTO</Text>
                </View>
            </View>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.headerRow]}>
                    <View style={[styles.tableCol, styles.tableColFecha]}>
                        <Text style={styles.tableCell}>Fecha y Hora</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableColNumero]}>
                        <Text style={styles.tableCell}>Problemas y Evolución</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableColNombre]}>
                        <Text style={styles.tableCell}>Planes</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={[styles.tableCol, styles.tableColFecha]}>
                        <Text style={styles.tableCell}>{formData.fecha} {formData.hora}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableColNumero]}>
                        <Text style={styles.tableCell}>{formData.notaEvolucion1}</Text>
                    </View>
                    <View style={[styles.tableCol, styles.tableColNombre]}>
                        <Text style={styles.tableCell}>{formData.planes}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export const NotaEvolucion = () => {

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

    const { codNota } = useParams();
    const [formData, setFormData] = useState('');
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbnotaevolucion/buscarporcodigo/${codNota}`);

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codNota]);

    const column1 = [
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
            title: 'Nota de Evolución',
            dataIndex: 'notaEvolucion1',
            key: 'notaEvolucion1',
        },
        {
            title: 'Planes',
            dataIndex: 'planes',
            key: 'planes',
        },
    ]

    const handleEdit = () => {
        navigate(`/editar-nota/${formData.codNota}`);
    };

    const handleBack = () => {
        navigate(`/notas-de-evolucion/${formData.numExpediente}`)
    }

    return (
        <div className="container-fluid">
            <div className='d-flex justify-content-between'>

                <h4 className='mb-4'>Nota de Evolución</h4>

                <div className='gap-2 d-flex'>

                    {
                        user && (user.codRol === 1 ) && (
                            <Button onClick={handleEdit}>
                                <EditOutlined style={{ fontSize: '20px', color: 'green' }} /> Editar
                            </Button>
                        )
                    }

                    {
                        user && (user.codRol === 2) && (
                            <BlobProvider document={<MyDocument formData={formData} />}>
                                {({ url }) => (
                                    <>
                                        <Button onClick={() => handlePreview(url)}>
                                            <FilePdfOutlined style={{ fontSize: '20px', color: 'blue' }} /> Visualizar PDF
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
                                )}
                            </BlobProvider>
                        )
                    }
                   

                    {
                        user && (user.codRol === 1 || user.codRol === 3) && (
                            <BlobProvider document={<MyDocument formData={formData} />}>
                                {({ url, blob }) => (
                                    <>
                                    {/* Botón para previsualizar el PDF en un modal */}
                                    <Button onClick={() => handlePreview(url)}>
                                        <FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} /> Imprimir PDF
                                    </Button>

                                    {/* Modal para la previsualización */}
                                    <Modal
                                        show={visible}
                                        title="Previsualización del PDF"
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
                                    <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="Nota de Evolución.pdf">
                                            {({ loading }) =>
                                                loading ? 'Cargando documento...' : (
                                                    <Button style={{ color: 'red', border: '1px solid red' }}> {/* Estilos añadidos aquí */}
                                                        <FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />
                                                        Descargar PDF
                                                    </Button>
                                                )
                                            }
                                    </PDFDownloadLink>
                            
                                    <Button style={{ color: 'green', border: '1px solid green' }} onClick={handleClose}>
                                            <RollbackOutlined style={{ fontSize: '20px', color: 'green' }} /> 
                                            Cerrar
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                    </>
                                )}
                            </BlobProvider>
                        )
                    }

                    {/* <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button> */}
                    <Button style={{ variant:'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
                </div>
            </div>
            <Table className='custom-table' dataSource={[formData]} columns={column1} />
        </div>
    );
};
