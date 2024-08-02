import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Table, Button, Space, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/AuthContext';
import { baseURL } from '../../api/apiURL';

export const ListaEpicrisis = () => {

    const { numExpediente } = useParams();

    const [epicrisis, setEpicrisis] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { user } = useAuth();


    useEffect(() => {
        fetchEpicrisis();
    }, []);

    const fetchEpicrisis = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbepicrisis/buscarpornumexpediente`, {
                params: { NUM_EXPEDIENTE: numExpediente }
            });

            setEpicrisis(response.data);

            console.log(response.data)

        } catch (error) {

            setError(error.response ? error.response.data : 'Error fetching data');

        } finally {

            setLoading(false);

        }

    };

    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Nombre del Paciente',
            dataIndex: 'primeR_NOMBRE',
            key: 'primeR_NOMBRE',
            render: (text, record) => (
                <div>{record.primeR_NOMBRE} {record.primeR_APELLIDO}</div>
            ),
        },
        {
            title: 'Número de Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
            render: (nuM_EXPEDIENTE) => <a>{nuM_EXPEDIENTE}</a>,
        },
        {
            title: 'Código MINSA',
            dataIndex: 'coD_DOCTOR',
            key: 'coD_DOCTOR',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<FileSearchOutlined />} onClick={() => handleRowClick(record.coD_EPICRISIS)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record.coD_EPICRISIS)} />

                    {user && user.codRol === 1 && (
                        <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.coD_EPICRISIS)} />
                    )}
                </Space>
            ),
            align: 'center',
        },
    ];

    const handleEdit = (coD_EPICRISIS) => {
        navigate(`/editar-epicrisis/${coD_EPICRISIS}`);
    };

    const handleRowClick = (coD_EPICRISIS) => {
        navigate(`/epicrisis-detalle/${coD_EPICRISIS}`);
    };

    const deleteEpicrisis = async (id) => {

        try {

            await axios.delete(`${baseURL}/bdtbepicrisis/eliminar/${id}`);

            notification.success({
                message: '¡Éxito!',
                description: `Epicrisis Eliminada`,
                duration: 3
            });

            setEpicrisis(epicrisis.filter(e => e.coD_EPICRISIS !== id));

        } catch (error) {

            setError(error.response ? error.response.data : 'Error al Eliminar Datos');

        }

    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar esta Epicrisis?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteEpicrisis(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleBack = () => {
        navigate('/buscar-epicrisis')
    }

    return (
        <div className="container-fluid">
            <div className='d-flex justify-content-between align-intems-center mb-4'>
                <h4>Epicrisis del Expediente: {numExpediente}</h4>
                <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            <Table
                responsive={true}
                pagination={{ pageSize: 7 }}
                className='custom-table'
                columns={columns}
                dataSource={epicrisis}
                rowKey="coD_EPICRISIS"
            />
        </div>
    )
}
