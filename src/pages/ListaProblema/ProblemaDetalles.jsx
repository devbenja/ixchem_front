import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Problemas.css'

import { Table, Space, Button, message, Modal as AntModal } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, FilePdfOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Form, Col, Spinner, Modal } from 'react-bootstrap';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image, BlobProvider } from '@react-pdf/renderer';

import { useAuth } from '../../context/AuthContext';
import { baseURL } from '../../api/apiURL';


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
        marginBottom: 30
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
        margin: 'auto',
        flexDirection: 'row',
    },
    tableColFecha: {
        width: '20%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableColNumero: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableColNombre: {
        width: '40%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableColCondiciones: {
        width: '30%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        flexDirection: 'column',
        textAlign: 'center'
    },
    tableColActivoResuelto: {
        width: '30%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        flexDirection: 'row',

    },
    tableCell: {
        margin: 5,
        fontSize: 10,
    },
    headerRow: {
        backgroundColor: '#E4E4E4',
    },
    subHeader: {
        flexDirection: 'column',
    },
});

const MyDocument = ({ problemas }) => (
    <Document>
        <Page style={styles.page}>
            <View style={styles.header}>
                <Image style={styles.logo} src="/logo.png" />
                <View style={styles.titleContainer}>
                    <Text style={styles.mainTitle}>CENTRO DE MUJERES IXCHEN</Text>
                    <Text style={styles.subTitle}>LISTA DE PROBLEMAS</Text>
                </View>
            </View>
            <View style={styles.table}>
                <View style={[styles.tableRow, styles.headerRow]}>
                    <View style={styles.tableColFecha}>
                        <Text style={styles.tableCell}>Fecha de registro</Text>
                    </View>
                    <View style={styles.tableColNumero}>
                        <Text style={styles.tableCell}>Nº</Text>
                    </View>
                    <View style={styles.tableColNombre}>
                        <Text style={styles.tableCell}>Nombre del Problema</Text>
                    </View>
                    <View style={styles.tableColCondiciones}>
                        <Text style={styles.tableCell}>Condiciones</Text>
                        <View style={styles.tableRow}>
                            <View style={{ width: '50%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 1 }}>
                                <Text style={styles.tableCell}>Activo</Text>
                            </View>
                            <View style={{ width: '50%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 1 }}>
                                <Text style={styles.tableCell}>Resuelto</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {problemas.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <View style={styles.tableColFecha}>
                            <Text style={styles.tableCell}>{item.fecha}</Text>
                        </View>
                        <View style={styles.tableColNumero}>
                            <Text style={styles.tableCell}>{item.numerO_NOTA}</Text>
                        </View>
                        <View style={styles.tableColNombre}>
                            <Text style={styles.tableCell}>{item.nombrE_PROBLEMA}</Text>
                        </View>
                        <View style={styles.tableColActivoResuelto}>
                            <View style={{ width: '50%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }}>
                                <Text style={styles.tableCell}>{item.activo ? 'Sí' : 'No'}</Text>
                            </View>
                            <View style={{ width: '50%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 }}>
                                <Text style={styles.tableCell}>{item.resuelto ? 'Sí' : 'No'}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export const ProblemaDetalles = () => {

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

    const { numExpediente } = useParams();
    const navigate = useNavigate();

    const [problemas, setProblemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    const { user } = useAuth();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [currentProblem, setCurrentProblem] = useState({
        numerO_NOTA: '',
        fecha: '',
        nombrE_PROBLEMA: '',
        activo: false,
        resuelto: false,
    });

    useEffect(() => {
        fetchProblemas();
    }, []);

    const fetchProblemas = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtblistaproblema/buscarpornumexpediente`, {
                params: { NUM_EXPEDIENTE: numExpediente }
            });

            console.log(response.data)

            const data = Array.isArray(response.data) ? response.data : [response.data];
            setProblemas(data);

        } catch (error) {

            setErrors(error.response ? error.response.data : 'Error fetching data');

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = (record) => {
        setCurrentProblem(record);
        setIsModalVisible(true);
    };

    const handleOk = async () => {

        try {

            const updateData = {
                numeroNota: currentProblem.numerO_NOTA,
                nombreProblema: currentProblem.nombrE_PROBLEMA,
                activo: currentProblem.activo,
                resuelto: currentProblem.resuelto,
                fecha: currentProblem.fecha,
                numExpediente: currentProblem.nuM_EXPEDIENTE,
                codProblemas: currentProblem.coD_PROBLEMAS
            }

            await axios.put(`${baseURL}/bdtblistaproblema/actualizar/${currentProblem.coD_PROBLEMAS}`, updateData);

            message.success('Problema actualizado exitosamente');

            fetchProblemas();

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error actualizando los datos');
        }

        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const deleteProblema = async (id) => {

        try {

            await axios.delete(`${baseURL}/bdtblistaproblema/eliminar/${id}`);

            message.success('Problema Eliminado Exitosamente');

            setProblemas(problemas.filter(p => p.coD_PROBLEMAS !== id));

        } catch (error) {

            setErrors(error.response ? error.response.data : 'Error deleting data');

        }

    };

    const showDeleteConfirm = (id) => {
        AntModal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar este problema?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                deleteProblema(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
            className: 'custom-confirm'
        });
    };

    const columns = [
        {
            title: 'Fecha de registro',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Nº',
            dataIndex: 'numerO_NOTA',
            key: 'numerO_NOTA',
        },
        {
            title: 'Nombre del Problema',
            dataIndex: 'nombrE_PROBLEMA',
            key: 'nombrE_PROBLEMA',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (activo) => (activo ? 'Sí' : 'No'),
        },
        {
            title: 'Resuelto',
            dataIndex: 'resuelto',
            key: 'resuelto',
            render: (resuelto) => (resuelto ? 'Sí' : 'No'),
        },

        ...(user && (user.codRol === 1 ) ? [{
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.coD_PROBLEMAS)} />
                </Space>
            ),
            align: 'center'
        }] : [])

    ];


    const handleBack = () => {
        navigate('/buscar-problema');
    }

    if (loading) return (
        <div className="d-flex loading justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );

    return (
        <div className="container-fluid">

            <div className='d-flex align-items-start justify-content-between'>
                <h4 className='mb-4'>Problemas Asociados al Expediente: {numExpediente}</h4>
                <div className='d-flex align-items-center gap-3'>
                    <BlobProvider document={<MyDocument problemas={problemas} />}>
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

                    {
                        user && (user.codRol === 1 || user.codRol === 3) && (
                            <PDFDownloadLink document={<MyDocument problemas={problemas} />} fileName="lista_de_problemas.pdf">
                                {({ loading }) =>
                                    loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar a PDF</Button>
                                }
                            </PDFDownloadLink>
                        )
                    }


                    <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
                </div>
            </div>

            {errors && <p className="text-danger">{errors}</p>}

            <Table
                columns={columns}
                dataSource={problemas}
                rowKey="coD_PROBLEMAS"
                className='custom-table'
                responsive={true}
                pagination={{ pageSize: 7 }}
            />

            <Modal show={isModalVisible} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Problema</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group as={Col} controlId="formNumeroNota">
                            <Form.Label>Número de Nota</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el número de nota" value={currentProblem.numerO_NOTA} onChange={(e) => setCurrentProblem({ ...currentProblem, numerO_NOTA: e.target.value })} />
                        </Form.Group>

                        <Form.Group className='mt-2' as={Col} controlId="formFecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" placeholder="Ingrese la fecha" value={currentProblem.fecha} onChange={(e) => setCurrentProblem({ ...currentProblem, fecha: e.target.value })} />
                        </Form.Group>

                        <Form.Group className='mt-2' as={Col} controlId="formNombreProblema">
                            <Form.Label>Nombre del Problema</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el nombre del problema" value={currentProblem.nombrE_PROBLEMA} onChange={(e) => setCurrentProblem({ ...currentProblem, nombrE_PROBLEMA: e.target.value })} />
                        </Form.Group>

                        <div className='mt-3 d-flex align-items-center justify-content-between'>
                            <Form.Group controlId="formActivo">
                                <Form.Label>Activo</Form.Label>
                                <Form.Check type="checkbox" label="Activo" checked={currentProblem.activo} onChange={(e) => setCurrentProblem({ ...currentProblem, activo: e.target.checked })} />
                            </Form.Group>

                            <Form.Group controlId="formResuelto">
                                <Form.Label>Resuelto</Form.Label>
                                <Form.Check type="checkbox" label="Resuelto" checked={currentProblem.resuelto} onChange={(e) => setCurrentProblem({ ...currentProblem, resuelto: e.target.checked })} />
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button danger onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button type='primary' onClick={handleOk}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
