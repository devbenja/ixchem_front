import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Table, Button, Space, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/AuthContext';
import { baseURL } from '../../api/apiURL';


export const HistoriasCG = () => {

    const { numExpediente } = useParams();
    const [hcgeneral, setHCGeneral] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const { user } = useAuth();

    useEffect(() => {
        fetchhcGeneral();
    }, []);

    const fetchhcGeneral = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbhistoriaclinicageneral/buscarpornumexpediente`, {
                params: { NUM_EXPEDIENTE: numExpediente }
            });

            setHCGeneral(response.data);

            console.log(response.data)

        } catch (error) {

            setError(error.response ? error.response.data : 'Error fetching data');

        } finally {

            setLoading(false);

        }

    };

    const columnHCG = [
        {
            title: 'Numero de Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
        },
        {
            title: 'Código MINSA',
            dataIndex: 'coD_DOCTOR',
            key: 'coD_DOCTOR',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined onClick={() => handleRowClickHCGeneral(record.coD_HISTORIA_CLINICA)} />} />
                    <Button icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); handleEdit(record.coD_HISTORIA_CLINICA); }} />

                    {user && user.codRol === 1 && (
                        <Button icon={<DeleteOutlined onClick={(e) => { e.stopPropagation(); showDeleteConfirm(record.coD_HISTORIA_CLINICA); }} />} />
                    )}
                </Space>
            ),
            align: 'center',
        },
    ]

    const handleEdit = (coD_HISTORIA_CLINICA) => {
        navigate(`/editar-historia-clinica-general/${coD_HISTORIA_CLINICA}`);
    };

    const handleRowClickHCGeneral = (coD_HISTORIA_CLINICA) => {
        navigate(`/historia/${coD_HISTORIA_CLINICA}`);
    }

    const deletehcGeneral = async (id) => {

        try {

            await axios.delete(`${baseURL}/bdtbhistoriaclinicageneral/eliminar/${id}`);

            notification.success({
                message: '¡Éxito!',
                description: `Historia Clinica General Eliminada`,
                duration: 3
            });

            setHCGeneral(prevHC => prevHC.filter(u => u.coD_HISTORIA_CLINICA !== id));

        } catch (error) {

            setError(error.response ? error.response.data : 'Error al Eliminar Datos');

        }

    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar esta Historia?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deletehcGeneral(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleBack = () => {
        navigate('/buscar-historia-clinica-general');
    }

    return (
        <div className='container-fluid'>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h3>Historias Clinicas Generales del Expediente: {numExpediente}</h3>
                <div className='d-flex gap-2'>

                </div>
                <Button style={{ backgroundColor: 'red', color: 'white'}} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            <Table
                columns={columnHCG}
                rowKey="coD_HISTORIA_CLINICA"
                dataSource={hcgeneral}
                className='mt-3 custom-table'
                onRow={(record) => ({
                    onClick: () => handleRowClickHCGeneral(record.coD_HISTORIA_CLINICA),
                })}
            />
        </div>
    )
}
