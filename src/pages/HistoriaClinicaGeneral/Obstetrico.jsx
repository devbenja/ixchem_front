import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Table } from "antd";
import { useParams } from 'react-router-dom';

import { baseURL } from '../../api/apiURL';


export const Obstetrico = () => {

    const { id } = useParams();
    const [formData, setFormData] = useState({});

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbantecedentesobstetrico/buscarporcodhojariesgo`, {
                    params: { codHojariesgo: id }
                });

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const columns1 = [
        { title: 'No. Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
        { title: 'Telefono', dataIndex: 'telefono', key: 'telefono' },
        {
            title: 'Abortos', dataIndex: 'antAbortos', key: 'antAbortos', render: (antAbortos) => {
                if (antAbortos === null || antAbortos === undefined) {
                    return '';
                }
                return antAbortos ? 'Sí' : 'No';
            }
        },
        {
            title: 'Cirugias Previas', dataIndex: 'cirugiasPrevias', key: 'cirugiasPrevias', render: (cirugiasPrevias) => {
                if (cirugiasPrevias === null || cirugiasPrevias === undefined) {
                    return '';
                }
                return cirugiasPrevias ? 'Sí' : 'No';
            }
        },
        
    ]

    const columns2 = [
        {
            title: 'Internada', dataIndex: 'internada', key: 'internada', render: (internada) => {
                if (internada === null || internada === undefined) {
                    return '';
                }
                return internada ? 'Sí' : 'No';
            }
        },
        {
            title: 'Muerte Fetal', dataIndex: 'muerteFetal', key: 'muerteFetal', render: (muerteFetal) => {
                if (muerteFetal === null || muerteFetal === undefined) {
                    return '';
                }
                return muerteFetal ? 'Sí' : 'No';
            }
        },
        {
            title: 'Peso 250', dataIndex: 'peso250', key: 'peso250', render: (peso250) => {
                if (peso250 === null || peso250 === undefined) {
                    return '';
                }
                return peso250 ? 'Sí' : 'No';
            }
        },
        {
            title: 'Peso 450', dataIndex: 'peso450', key: 'peso450', render: (peso450) => {
                if (peso450 === null || peso450 === undefined) {
                    return '';
                }
                return peso450 ? 'Sí' : 'No';
            }
        },
    ]

  return (
    <div className='container-fluid'>
        <h4>Antecedente Obstetrico</h4>
        <Table columns={columns1}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
        <Table columns={columns2}  dataSource={[formData]} className='custom-table mt-4' pagination={false}/>
    </div>
  )
}
