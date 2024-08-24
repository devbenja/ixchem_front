import './Buscar.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, message, notification, Button } from 'antd';
import { Modal } from 'react-bootstrap';
import { FilePdfOutlined } from '@ant-design/icons'

import { Image, Page, Text, View, Document, StyleSheet, BlobProvider, PDFDownloadLink } from '@react-pdf/renderer';

import { baseURL } from '../../../api/apiURL';
import { useAuth } from '../../../context/AuthContext';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    headerAnt: {
        fontSize: 15,
        marginBottom: 20,
        fontStyle: 'bold'
    },
    section: {
        marginBottom: 20,
        fontSize: 12,
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    twoValues: {
        flexDirection: 'row',
        marginBottom: 5,
        gap: 10
    },
    value: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        width: '50%',
        marginBottom: 5,
    },
    logito: {
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
});


const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <View style={styles.logito}>
                    <Image style={styles.logo} src="/logo.png" />
                    <View style={styles.titleContainer}>
                        <Text style={styles.mainTitle}>HISTORIA CLINICA</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Centro de mujeres IXCHEM:</Text>
                        <Text style={styles.value}>{data.centro}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha:</Text>
                        <Text style={styles.value}>{data.fechA_INGRESO}</Text>
                    </View>
                </View>

                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nombre:</Text>
                        <Text style={styles.value}>{data.primeR_NOMBRE} {data.segundO_NOMBRE} {data.primeR_APELLIDO} {data.segundO_APELLIDO}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Edad:</Text>
                        <Text style={styles.value}>{data.edad}</Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Motivo de Consulta:</Text>
                    <Text style={styles.value}>{data.moT_VISITA}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.headerAnt}>ANTECEDENTES FAMILIARES PATOLOGICOS</Text>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ca de Mama:</Text>
                        <Text style={styles.value}>{data.cA_MAMA ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Parentesco Ca de Mama:</Text>
                        <Text style={styles.value}>{data.caM_PARENTESCO}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ca de CU:</Text>
                        <Text style={styles.value}>{data.cA_CU ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Parentesco Ca Cu:</Text>
                        <Text style={styles.value}>{data.cacU_PARENTESCO}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ca de Colon:</Text>
                        <Text style={styles.value}>{data.cA_COLON ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Parentesco Ca Co:</Text>
                        <Text style={styles.value}>{data.cacO_PARENTESCO}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.headerAnt}>ANTECEDENTES PERSONALES</Text>

                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Menstruación:</Text>
                        <Text style={styles.value}>{data.menstruacion}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Vida Sexual:</Text>
                        <Text style={styles.value}>{data.vidA_SEXUAL}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Compañeros Sexuales:</Text>
                        <Text style={styles.value}>{data.comP_SEXUALES}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>MAC:</Text>
                        <Text style={styles.value}>{data.mac}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Historial de Embarazo:</Text>
                        <Text style={styles.value}>{data.hisT_EMBARAZO ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Gestas:</Text>
                        <Text style={styles.value}>{data.gestas}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Partos:</Text>
                        <Text style={styles.value}>{data.partos}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Abortos:</Text>
                        <Text style={styles.value}>{data.abortos}</Text>
                    </View>
                </View>

                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cesáreas:</Text>
                        <Text style={styles.value}>{data.cesarea}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>FUM:</Text>
                        <Text style={styles.value}>{data.fum}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>SA:</Text>
                        <Text style={styles.value}>{data.sa}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Lactancia:</Text>
                        <Text style={styles.value}>{data.lactancia ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Embarazo:</Text>
                        <Text style={styles.value}>{data.embarazo ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Mamografía:</Text>
                        <Text style={styles.value}>{data.mamografia ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>PAP:</Text>
                        <Text style={styles.value}>{data.pap ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>PAP Alterado:</Text>
                        <Text style={styles.value}>{data.paP_ALTERADO ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Historial de PAP:</Text>
                        <Text style={styles.value}>{data.hisT_PAP}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Menopausia:</Text>
                        <Text style={styles.value}>{data.menopausia}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Reemplazo Hormonal:</Text>
                        <Text style={styles.value}>{data.reemP_HORMONAL ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fuma:</Text>
                        <Text style={styles.value}>{data.fuma ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cigarros por Día:</Text>
                        <Text style={styles.value}>{data.cigarroS_DIA}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Estado de Pareja:</Text>
                        <Text style={styles.value}>{data.estadO_PAREJA ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fecha de Nacimiento del Hijo:</Text>
                        <Text style={styles.value}>{data.feC_NAC_HIJO}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Crioterapia:</Text>
                        <Text style={styles.value}>{data.crioterapia ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>TermocuagulaciÓn:</Text>
                        <Text style={styles.value}>{data.thermocuagulacion ? 'Sí' : 'No'}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Biopsia:</Text>
                        <Text style={styles.value}>{data.biopasis ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.headerAnt}>ANTECEDENTES PATOLOGICOS PERSONALES</Text>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Fibrodenoma:</Text>
                        <Text style={styles.value}>{data.fibrodenoma ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ca de Mama Izq:</Text>
                        <Text style={styles.value}>{data.caM_IZQ ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Ca de Mama Der:</Text>
                        <Text style={styles.value}>{data.caM_DER ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>+Ca Cervico Uterino:</Text>
                        <Text style={styles.value}>{data.cacerut ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Útero:</Text>
                        <Text style={styles.value}>{data.matriz ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Extirpacion:</Text>
                        <Text style={styles.value}>{data.extirpacion ? 'Sí' : 'No'}</Text>
                    </View>
                </View>

                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>ITS:</Text>
                        <Text style={styles.value}>{data.its}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>VIH:</Text>
                        <Text style={styles.value}>{data.vih ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Violencia Intrafamiliar:</Text>
                        <Text style={styles.value}>{data.vif ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Diabetes:</Text>
                        <Text style={styles.value}>{data.diabetes ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cardiopatia:</Text>
                        <Text style={styles.value}>{data.cardiopatia ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Hipertension:</Text>
                        <Text style={styles.value}>{data.hipertension ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Hepatopatias:</Text>
                        <Text style={styles.value}>{data.hepatopatias ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Nefropatia:</Text>
                        <Text style={styles.value}>{data.nefropatia ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Cirugias:</Text>
                        <Text style={styles.value}>{data.cirugias ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Anemia:</Text>
                        <Text style={styles.value}>{data.anemia ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                <View style={styles.twoValues}>

                </View>
                <View style={styles.twoValues}>
                    <View style={styles.row}>
                        <Text style={styles.label}>Alergia a Medicamentos:</Text>
                        <Text style={styles.value}>{data.alergiA_MED ? 'Sí' : 'No'}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Alergia Alimentos:</Text>
                        <Text style={styles.value}>{data.alergiA_ALI ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
)

export const BuscarHistoria = () => {

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

    const { user } = useAuth();

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [paciente, setPaciente] = useState('');
    const [antecedentesPersonales, setAntPersonales] = useState('');
    const [antPatPer, setAntPatPer] = useState('');
    const [antPatFam, setAntPatFam] = useState('');
    const [info, setInfo] = useState('');
    const [data, setData] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [firstLastName, setFirstLastName] = useState('');


    const navigate = useNavigate();

    const handleSearchSubmit = async (event) => {

        event.preventDefault();

        let unidosData;

        try {

            if (searchType === 'opcion_expediente') {

                unidosData = await axios.get(`${baseURL}/bdtpaciente/buscarpornumexpedienteunidos`, {
                    params: { NUM_EXPEDIENTE: searchValue }
                });


            } else if (searchType === 'opcion_cedula') {

                // unidosData = await axios.get(`${baseURL}/bdtpaciente/buscarpornumexpedienteunidos`, {
                //     params: { cedula: searchValue }
                // });

            } else if (searchType === 'opcion_nombre') {

                unidosData = await axios.get(`${baseURL}/bdtpaciente/buscarpacientesunidosnombre`, {
                    params: {
                        PRIMER_NOMBRE: firstName,
                        PRIMER_APELLIDO: firstLastName,
                    }
                });

            }

            setData(unidosData.data[0]);

            console.log(unidosData.data[0]);


        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }
    };

    const columns1 = [
        { title: 'Fecha de ingreso', dataIndex: 'fechA_INGRESO', key: 'fechA_INGRESO' },
        { title: 'Centro de mujeres IXCHEN', dataIndex: 'centro', key: 'centro' },
        { title: 'Usuaria', dataIndex: 'usuaria', key: 'usuaria' },
    ];

    const columns2 = [
        { title: 'Primer nombre', dataIndex: 'primeR_NOMBRE', key: 'primeR_NOMBRE' },
        { title: 'Segundo nombre', dataIndex: 'segundO_NOMBRE', key: 'segundO_NOMBRE' },
        { title: 'Primer apellido', dataIndex: 'primeR_APELLIDO', key: 'primeR_APELLIDO' },
        { title: 'Segundo apellido', dataIndex: 'segundO_APELLIDO', key: 'segundO_APELLIDO' },
        { title: 'Cédula', dataIndex: 'cedula', key: 'cedula' },
        { title: 'Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
        { title: 'Fecha de Nac.', dataIndex: 'fechA_NAC', key: 'fechA_NAC' },
        { title: 'Edad', dataIndex: 'edad', key: 'edad' },
        { title: 'Sexo', dataIndex: 'sexo', key: 'sexo' },
    ];

    const columns3 = [
        { title: 'Escolaridad', dataIndex: 'escolaridad', key: 'escolaridad' },
        { title: 'Profesión/Oficio', dataIndex: 'profesion', key: 'profesion' },
        { title: 'Dirección', dataIndex: 'direccion', key: 'direccion' },
        { title: 'Departamento', dataIndex: 'nombre', key: 'nombre' },
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
        { title: 'Inicio Vida Sexual', dataIndex: 'vidA_SEXUAL', key: 'vidA_SEXUAL' },
        { title: 'Compañeros Sexuales', dataIndex: 'comP_SEXUALES', key: 'comP_SEXUALES' },
        { title: 'MAC', dataIndex: 'mac', key: 'mac' },
        {
            title: '¿Has estado embarazada?', dataIndex: 'hisT_EMBARAZO', key: 'hisT_EMBARAZO', render: (hisT_EMBARAZO) => {
                if (hisT_EMBARAZO === null || hisT_EMBARAZO === undefined) {
                    return '';
                }
                return hisT_EMBARAZO ? 'Sí' : 'No';
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
        {
            title: '¿Mamografía al día?', dataIndex: 'mamografia', key: 'mamografia', render: (mamografia) => {
                if (mamografia === null || mamografia === undefined) {
                    return '';
                }
                return mamografia ? 'Sí' : 'No';
            }
        },
    ]

    const colum3AntPer = [

        {
            title: '¿PAP al día?', dataIndex: 'pap', key: 'pap', render: (pap) => {
                if (pap === null || pap === undefined) {
                    return '';
                }
                return pap ? 'Sí' : 'No';
            }
        },
        {
            title: '¿PAP Alterado', dataIndex: 'paP_ALTERADO', key: 'paP_ALTERADO', render: (paP_ALTERADO) => {
                if (paP_ALTERADO === null || paP_ALTERADO === undefined) {
                    return '';
                }
                return paP_ALTERADO ? 'Sí' : 'No';
            }
        },
        { title: 'Ultimo Pap', dataIndex: 'hisT_PAP', key: 'hisT_PAP' },
        { title: 'Edad de Menopausia', dataIndex: 'menopausia', key: 'menopausia' },
        {
            title: '¿Terapia Reemplazo Hormonal?', dataIndex: 'reemP_HORMONAL', key: 'reemP_HORMONAL', render: (reemP_HORMONAL) => {
                if (reemP_HORMONAL === null || reemP_HORMONAL === undefined) {
                    return '';
                }
                return reemP_HORMONAL ? 'Sí' : 'No';
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
        { title: 'Cigarros por Dia', dataIndex: 'cigarroS_DIA', key: 'cigarroS_DIA' },
    ]

    const colum4AntPer = [

        {
            title: '¿Actualmente está sola o acompañada?', dataIndex: 'estadO_PAREJA', key: 'estadO_PAREJA', render: (estadO_PAREJA) => {
                if (estadO_PAREJA === null || estadO_PAREJA === undefined) {
                    return '';
                }
                return estadO_PAREJA ? 'Acompañada' : 'Sola';
            }
        },
        { title: 'Fecha Nac. último hijo', dataIndex: 'feC_NAC_HIJO', key: 'feC_NAC_HIJO' },
        {
            title: 'Crioterapia', dataIndex: 'crioterapia', key: 'crioterapia', render: (crioterapia) => {
                if (crioterapia === null || crioterapia === undefined) {
                    return '';
                }
                return crioterapia ? 'Sí' : 'No';
            }
        },
        {
            title: 'Termocuagulación', dataIndex: 'thermocuagulacion', key: 'thermocuagulacion', render: (thermocuagulacion) => {
                if (thermocuagulacion === null || thermocuagulacion === undefined) {
                    return '';
                }
                return thermocuagulacion ? 'Sí' : 'No';
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
        { title: 'Nº. Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
    ]

    // Columnas Ant Pat Personales

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
            title: 'CAM Izq', dataIndex: 'caM_IZQ', key: 'caM_IZQ', render: (caM_IZQ) => {
                if (caM_IZQ === null || caM_IZQ === undefined) {
                    return '';
                }
                return caM_IZQ ? 'Sí' : 'No';
            }
        },
        {
            title: 'CAM Der', dataIndex: 'caM_DER', key: 'caM_DER', render: (caM_DER) => {
                if (caM_DER === null || caM_DER === undefined) {
                    return '';
                }
                return caM_DER ? 'Sí' : 'No';
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
            title: 'Útero', dataIndex: 'matriz', key: 'matriz', render: (matriz) => {
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
            title: 'Violencia Intrafamiliar', dataIndex: 'vif', key: 'vif', render: (vif) => {
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
            title: 'Alergia a medicamentos', dataIndex: 'alergiA_MED', key: 'alergiA_MED', render: (alergiA_MED) => {
                if (alergiA_MED === null || alergiA_MED === undefined) {
                    return '';
                }
                return alergiA_MED ? 'Sí' : 'No';
            }
        },
        {
            title: 'Alergia alimentaria', dataIndex: 'alergiA_ALI', key: 'alergiA_ALI', render: (alergiA_ALI) => {
                if (alergiA_ALI === null || alergiA_ALI === undefined) {
                    return '';
                }
                return alergiA_ALI ? 'Sí' : 'No';
            }
        },
        { title: 'Número de expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
    ]

    // Columnas Ant Pat Familiares

    const columns1AntPatFam = [
        {
            title: 'CA Mama',
            dataIndex: 'cA_MAMA',
            key: 'cA_MAMA',
            render: (cA_MAMA) => (cA_MAMA === null || cA_MAMA === undefined ? '' : cA_MAMA ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'caM_PARENTESCO', key: 'caM_PARENTESCO' },
        {
            title: 'CA Cuello Uterino',
            dataIndex: 'cA_CU',
            key: 'cA_CU',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'cacU_PARENTESCO', key: 'cacU_PARENTESCO' },
    ];

    const columns2AntPatFam = [
        {
            title: 'CA Colon',
            dataIndex: 'cA_COLON',
            key: 'cA_COLON',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'cacO_PARENTESCO', key: 'cacO_PARENTESCO' },
        {
            title: 'CA Ovario',
            dataIndex: 'cA_OVARIO',
            key: 'cA_OVARIO',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'caovA_PARENTESCO', key: 'caovA_PARENTESCO' },
    ];

    const columns3AntPatFam = [
        {
            title: 'Hipertensión',
            dataIndex: 'hipertensionf',
            key: 'hipertensionf',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'hipertensioN_PARENTESCO', key: 'hipertensioN_PARENTESCO' },
        {
            title: 'Hepatitis',
            dataIndex: 'hepatitis',
            key: 'hepatitis',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'hepatitiS_PARENTESCO', key: 'hepatitiS_PARENTESCO' },
    ];

    const columns4AntPatFam = [
        {
            title: 'Diabetes',
            dataIndex: 'diabetesf',
            key: 'diabetesf',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'diabeteS_PARENTESCO', key: 'diabeteS_PARENTESCO' },
        {
            title: 'Enfermedades Cardiacas',
            dataIndex: 'enF_CARDIACAS',
            key: 'enF_CARDIACAS',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'enfcaR_PARENTESCO', key: 'enfcaR_PARENTESCO' },
        {
            title: 'Enfermedades Renales',
            dataIndex: 'enF_RENALES',
            key: 'enF_RENALES',
            render: (value) => (value === null || value === undefined ? '' : value ? 'Sí' : 'No'),
        },
        { title: 'Parentesco', dataIndex: 'enfreN_PARENTESCO', key: 'enfreN_PARENTESCO' },
        { title: 'Número de Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
    ];

    const columns1Informacion = [
        { title: 'Motivo de Visita', dataIndex: 'moT_VISITA', key: 'moT_VISITA' },
        { title: 'Número de Expediente', dataIndex: 'nuM_EXPEDIENTE', key: 'nuM_EXPEDIENTE' },
    ];

    const columns2Informacion = [
        { title: 'Nota Médica', dataIndex: 'notA_MEDICA', key: 'notA_MEDICA' },
    ]

    const handleEditPaciente = () => {

        if (data) {
            navigate(`/editar-paciente/${data.nuM_EXPEDIENTE}`);
        } else {
            message.warning('No hay Datos Para Editar');
        }

    };

    const handleEditAntPersonales = () => {

        if (data) {
            navigate(`/editar-antecedentes-personales/${data.nuM_EXPEDIENTE}`);
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    const handleEditAntPatPer = () => {

        if (data) {
            navigate(`/editar-antecedentes-patologicos-personales/${data.nuM_EXPEDIENTE}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    const handleEditAntPatFam = () => {

        if (data) {
            navigate(`/editar-antecedentes-patologicos-familiares/${data.nuM_EXPEDIENTE}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    const handleEditInformacion = () => {

        if (data) {
            navigate(`/editar-informacion/${data.nuM_EXPEDIENTE}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }


    return (
        <>
            <div className='container-fluid'>
                <h4>Buscar Historia Clinica</h4>
            </div>
            <form onSubmit={handleSearchSubmit} className="container-fluid mt-3 mb-3">
                <div className="row g-3">
                    <div className="col-sm-3">
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion...</option>
                            <option value="opcion_expediente">Número de expediente</option>
                            <option value="opcion_cedula">Cédula de identidad</option>
                            <option value="opcion_nombre">Nombre</option>
                        </select>
                    </div>

                    <div className="col-sm-9 d-flex">
                        <div className="input-group" role="search">
                            {
                                searchType === 'opcion_nombre' ? (
                                    <div className="d-flex gap-2">
                                        <div className="d-flex align-items-center justify-content-center">
                                            <label>Primer Nombre</label>
                                            <input className="form-control" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center">
                                            <label>Primer Apellido</label>
                                            <input className="form-control" type="text" value={firstLastName} onChange={(e) => setFirstLastName(e.target.value)} />
                                        </div>
                                        <button className="btn btn-success" type="submit">Buscar</button>
                                    </div>
                                ) : (
                                    <>
                                        <input
                                            className="form-control me-2"
                                            maxLength="80"
                                            type="search"
                                            aria-label="Search"
                                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                        />
                                        <button className="btn btn-success" type="submit">Buscar</button>
                                    </>


                                )
                            }


                        </div>
                    </div>
                </div>
            </form>
            <div className="container-fluid" >
                <div className='d-flex align-items-center justify-content-between'>
                    <ul className="nav nav-tabs" id="tab-search-list" role="tablist">
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
                            <a className="nav-link text-secondary" id="informacion-tab" data-bs-toggle="tab" role="tab" href="#informacion" aria-controls="Informacion" aria-selected="false">Información</a>
                        </li>
                    </ul>
                    <BlobProvider document={<MyDocument data={data} />}>
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
                            <PDFDownloadLink
                                document={<MyDocument data={data} />}
                                fileName="historia_clinica.pdf"
                            >
                                {({ loading }) => (loading ? 'Generando PDF...' : <Button><FilePdfOutlined style={{ fontSize: '20px', color: 'red' }} />Exportar</Button>)}
                            </PDFDownloadLink>
                        )
                    }


                </div>


                <div className="tab-content" id="tab-search-content">
                    <div className="tab-pane fade show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
                        <Table className='mt-3 custom-table' columns={columns1} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns2} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns3} dataSource={[data]} pagination={false} />
                        <Table className='mt-3 custom-table' columns={columns4} dataSource={[data]} pagination={false} />

                        {
                            user && (user.codRol === 1 || user.codRol === 2) && (
                                <div className='container mt-4 d-flex justify-content-end gap-2'>
                                    <button onClick={handleEditPaciente} className='btn btn-warning'>Editar</button>
                                </div>
                            )
                        }

                    </div>
                    <div className="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum1AntPer} dataSource={[data]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum2AntPer} dataSource={[data]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum3AntPer} dataSource={[data]} pagination={false} />
                        <Table rowKey="codAntper" className='custom-table mt-3' columns={colum4AntPer} dataSource={[data]} pagination={false} />

                        {
                            user && (user.codRol === 1 || user.codRol === 2) && (
                                <div className='container mt-4 d-flex justify-content-end gap-2'>
                                    <button onClick={handleEditAntPersonales} className='btn btn-warning'>Editar</button>
                                </div>
                            )
                        }

                    </div>

                    <div className="tab-pane fade" id="APP" role="tabpanel" aria-labelledby="APP-tab">
                        <Table className='mt-3 custom-table' columns={columns1AntPatPer} dataSource={[data]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns2AntPatPer} dataSource={[data]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns3AntPatPer} dataSource={[data]} pagination={false} rowKey="codAntparper" />
                        <Table className='mt-3 custom-table' columns={columns4AntPatPer} dataSource={[data]} pagination={false} rowKey="codAntparper" />

                        {
                            user && (user.codRol === 1 || user.codRol === 2) && (
                                <div className='container mt-4 d-flex justify-content-end gap-2'>
                                    <button onClick={handleEditAntPatPer} className='btn btn-warning'>Editar</button>
                                </div>
                            )
                        }

                    </div>
                    <div className="tab-pane fade" id="APF" role="tabpanel" aria-labelledby="APF-tab">
                        <Table className='custom-table mt-3' columns={columns1AntPatFam} dataSource={[data]} pagination={false} />
                        <Table className='custom-table mt-3' columns={columns2AntPatFam} dataSource={[data]} pagination={false} />
                        <Table className='custom-table mt-3' columns={columns3AntPatFam} dataSource={[data]} pagination={false} />
                        <Table className='custom-table mt-3' columns={columns4AntPatFam} dataSource={[data]} pagination={false} />

                        {
                            user && (user.codRol === 1 || user.codRol === 2) && (
                                <div className='container mt-4 d-flex justify-content-end gap-2'>
                                    <button onClick={handleEditAntPatFam} className='btn btn-warning'>Editar</button>
                                </div>
                            )
                        }

                    </div>

                    <div className="tab-pane fade" id="informacion" role="tabpanel" aria-labelledby="informacion-tab">
                        <Table className='custom-table mt-3' columns={columns1Informacion} dataSource={[data]} pagination={false} />
                        <Table className='custom-table mt-3' columns={columns2Informacion} dataSource={[data]} pagination={false} />

                        {
                            user && (user.codRol === 1 || user.codRol === 2) && (
                                <div className='container mt-4 d-flex justify-content-end gap-2'>
                                    <button onClick={handleEditInformacion} className='btn btn-warning'>Editar</button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
