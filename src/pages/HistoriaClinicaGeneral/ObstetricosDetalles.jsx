import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Table, Button, Space, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/AuthContext';
import { baseURL } from '../../api/apiURL';


export const ObstetricosDetalles = () => {

    const { numExpediente } = useParams();
    const [obstetricos, setObstetricos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        fetchOb();
    }, []);

    const fetchOb = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbantecedentesobstetrico/buscarpornumexpediente`, {
                params: { numExpediente: numExpediente }
            });

            setObstetricos(response.data);

            console.log(response.data)

        } catch (error) {

            setError(error.response ? error.response.data : 'Error fetching data');

        } finally {

            setLoading(false);

        }

    };

    const columns = [
        {
            title: 'Número de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
            render: (numExpediente) => <a>{numExpediente}</a>,
        },
        {
            title: 'Telefono',
            dataIndex: 'telefono',
            key: 'telefono',
        },

        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<FileSearchOutlined />} onClick={() => handleRowClick(record.codHojariesgo)} />

                    {
                        user && user.codRol === 1 && (
                            <>
                                <Button icon={<EditOutlined />} onClick={() => handleEdit(record.codHojariesgo)} />
                                <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.codHojariesgo)} />
                            </>
                        )
                    }

                </Space>
            ),
            align: 'center',
        },
    ];

    const handleEdit = (codHojariesgo) => {
        navigate(`/editar-obstetrico/${codHojariesgo}`);
    };

    const handleRowClick = (codHojariesgo) => {
        navigate(`/obstetrico/${codHojariesgo}`);
    };

    const deleteObs = async (id) => {

        try {

            await axios.delete(`${baseURL}/bdtbantecedentesobstetrico/eliminar/${id}`);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Obstetrico Eliminado`,
                duration: 3
            });

            setObstetricos(prevObs => prevObs.filter(u => u.codHojariesgo !== id));

        } catch (error) {

            setError(error.response ? error.response.data : 'Error al Eliminar Datos');

        }

    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar este Antecedente?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                deleteObs(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
            className: 'custom-confirm'
        });
    };

    const handleBack = () => {
        navigate('/buscar-historia-clinica-general');
    }

    if (loading) return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );

    return (
        <div className="container-fluid">
            <div className='container-fluid d-flex align-items-center justify-content-between'>
                <h4>Antecedentes Obstetricos del Expediente: {numExpediente}</h4>
                {/* <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button> */}
                <Button style={{ variant:'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            <Table
                responsive={true}
                pagination={{ pageSize: 7 }}
                className='custom-table mt-4'
                columns={columns}
                dataSource={obstetricos}
                rowKey="codHojariesgo"
            />
        </div>
    )
}