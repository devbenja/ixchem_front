import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from "antd";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';


import { baseURL } from '../../api/apiURL';


export const Obstetrico = () => {

    const { id } = useParams();
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

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

    const handleBack = () => {
        navigate(`/obstetricos/${formData.numExpediente}`);
    }

    return (
        <div className='container-fluid'>
            <div className='container-fluid d-flex align-items-center justify-content-between'>
                <h4>Antecedente Obstetrico</h4>
                {/* <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button> */}
                <Button style={{ variant:'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            <Table columns={columns1} dataSource={[formData]} className='custom-table mt-4' pagination={false} />
            <Table columns={columns2} dataSource={[formData]} className='custom-table mt-4' pagination={false} />
        </div>
    )
}
