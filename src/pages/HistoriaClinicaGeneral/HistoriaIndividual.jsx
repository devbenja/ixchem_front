import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table } from "antd";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { baseURL } from '../../api/apiURL';

export const HistoriaIndividual = () => {

    const { codHistoriaClinica } = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbhistoriaclinicageneral/buscarporcodhistoriaclinica`, {
                    params: { CodHistoriaClinica: codHistoriaClinica }
                });

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codHistoriaClinica]);

    const columns1 = [
        { title: 'No. Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
        { title: 'Codigo MINSA', dataIndex: 'codDoctor', key: 'codDoctor' },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
        {
            title: 'Consumo de Drogas', dataIndex: 'consumoDrogas', key: 'consumoDrogas', render: (consumoDrogas) => {
                if (consumoDrogas === null || consumoDrogas === undefined) {
                    return '';
                }
                return consumoDrogas ? 'Sí' : 'No';
            }
        },
        {
            title: 'Diabetes Mellitus', dataIndex: 'diabetesMellitus', key: 'diabetesMellitus', render: (diabetesMellitus) => {
                if (diabetesMellitus === null || diabetesMellitus === undefined) {
                    return '';
                }
                return diabetesMellitus ? 'Sí' : 'No';
            }
        },
        
    ]

    const columns2 = [
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
            title: 'Alto Riesgo', dataIndex: 'altoRiesgo', key: 'altoRiesgo', render: (altoRiesgo) => {
                if (altoRiesgo === null || altoRiesgo === undefined) {
                    return '';
                }
                return altoRiesgo ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cualquier Otro', dataIndex: 'cualquierOtro', key: 'cualquierOtro', render: (cualquierOtro) => {
                if (cualquierOtro === null || cualquierOtro === undefined) {
                    return '';
                }
                return cualquierOtro ? 'Sí' : 'No';
            }
        },
    ]

    const handleBack = () => {
        navigate(`/historias-generales/${formData.numExpediente}`);
    }

  return (
    <div className='container-fluid'>
        <div className='container-fluid d-flex align-items-center justify-content-between'>
            <h4>Historia Clinica General</h4>
            <Button style={{ backgroundColor: 'red', color: 'white'}} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
        </div>
        <Table columns={columns1}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
        <Table columns={columns2}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
    </div>
  )
}
