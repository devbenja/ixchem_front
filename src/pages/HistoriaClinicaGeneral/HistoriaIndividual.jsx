import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Table } from "antd";
import { useParams } from 'react-router-dom';


export const HistoriaIndividual = () => {

    const { codHistoriaClinica } = useParams();
    const [formData, setFormData] = useState({});

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`https://localhost:7106/api/bdtbhistoriaclinicageneral/buscarporcodhistoriaclinica`, {
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
        { title: 'Codigo Doctor', dataIndex: 'codDoctor', key: 'codDoctor' },
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

  return (
    <div className='container-fluid'>
        <h4>Historia Clinica General</h4>
        <Table columns={columns1}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
        <Table columns={columns2}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
    </div>
  )
}
