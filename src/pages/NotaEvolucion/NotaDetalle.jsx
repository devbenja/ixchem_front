import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Table, Button, Space, Popconfirm, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';


export const NotaDetalle = () => {

    const { numExpediente } = useParams();
    const [nota, setNota] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    

    useEffect(() => {
        fetchNota();
    }, []);

    const fetchNota = async () => {

        try {

            const response = await axios.get(`https://localhost:7106/api/bdtbnotaevolucion/buscarpornumexpediente`, {
                params: { NUM_EXPEDIENTE: numExpediente }
            });

            setNota(response.data);

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
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
            render: (numExpediente) => <a>{numExpediente}</a>,
        },
        {
            title: 'No. de Nota',
            dataIndex: 'numerO_NOTA',
            key: 'numerO_NOTA',
        },
        {
            title: 'Código de Doctor',
            dataIndex: 'coD_DOCTOR',
            key: 'coD_DOCTOR',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<FileSearchOutlined />} onClick={() => handleRowClick(record.coD_NOTA)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record.coD_NOTA)} />
                    <Button icon={<DeleteOutlined />} onClick={() => showDeleteConfirm(record.coD_NOTA)} />
                </Space>
            ),
            align: 'center',
        },
    ];

    const handleEdit = (coD_NOTA) => {
        navigate(`/editar-nota/${coD_NOTA}`);
    };

    const handleRowClick = (coD_NOTA) => {
        navigate(`/nota/${coD_NOTA}`);
    };

    const deleteNota = async (id) => {

        try {

            await axios.delete(`https://localhost:7106/api/bdtbnotaevolucion/eliminar/${id}`);

            notification.success({
                message: '¡Éxito!',
                description: `Nota de Evolucion Eliminada`,
                duration: 3
            });

            setNota(nota.filter(p => p.coD_NOTA !== id));

        } catch (error) {

            setError(error.response ? error.response.data : 'Error al Eliminar Datos');

        }

    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar esta Nota?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteNota(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    if (loading) return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );

    return (
        <div className="container-fluid">
            <h4 className='mb-4'>Notas de Evolución del Expediente: {numExpediente}</h4>
            <Table
                responsive={true}
                pagination={{ pageSize: 7 }}
                className='custom-table'
                columns={columns}
                dataSource={nota}
                rowKey="coD_NOTA" 
            />
        </div>
    )
}
