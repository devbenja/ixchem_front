import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { EditOutlined, FilePdfOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

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

    const { codNota } = useParams();
    const [formData, setFormData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`https://localhost:7106/api/bdtbnotaevolucion/buscarporcodigo/${codNota}`);

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


    return (
        <div className="container-fluid">
            <div className='d-flex justify-content-between'>
                <h4 className='mb-4'>Nota de Evolución</h4>

                <div className='gap-2 d-flex'>
                    <Button>
                        <EditOutlined style={{ fontSize: '20px', color: 'blue' }} onClick={handleEdit} />
                    </Button>

                    <PDFDownloadLink document={<MyDocument formData={formData} />} fileName="problemas.pdf">
                        {({ loading }) =>
                            loading ? 'Cargando documento...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} /></Button>
                        }
                    </PDFDownloadLink>
                </div>
            </div>
            <Table className='custom-table' dataSource={[formData]} columns={column1} />
        </div>
    );
};
