import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const BuscarUsuario = () => {

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtbusuario/listar`);

            setUsuarios(response.data);
            console.log(response.data)
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Apellido',
            dataIndex: 'apellido',
            key: 'apellido',
        },
        {
            title: 'Código MINSA',
            dataIndex: 'correo',
            key: 'correo',
        },
        {
            title: 'Rol',
            dataIndex: 'codRol',
            key: 'codRol',
            render: (codRol) => {
                if (codRol === 1) {
                    return 'Administrador';
                } else if (codRol === 2) {
                    return 'Doctor';
                } else if (codRol === 3) {
                    return 'Director';
                }
            }
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            render: (estado) => (
                estado ? 'Habilitado' : 'Inhabilitado'
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined onClick={() => handleEdit(record.codAdmin)} />} />
                    <Button style={{ variant:'outlined', color: 'red' }} icon={<DeleteOutlined onClick={() => showDeleteConfirm(record.codAdmin)}/> }/>
                </Space>
            ),
            align: 'center',
        },
    ];

    const deleteUsuario = async (id) => {

        try {

            await axios.delete(`${baseURL}/bdtbusuario/eliminar/${id}`);

            notification.success({
                message: '¡Éxito!',
                description: `Usuario Eliminado`,
                duration: 3
            });

            setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.codAdmin !== id));

        } catch (error) {

            setErrors(error.response ? error.response.data : 'Error al Eliminar Datos');

            notification.error({
                message: 'Error',
                description: 'Hubo un error al eliminar el usuario.',
                duration: 3,
            });

        }

    };

    const showDeleteConfirm = (id) => {
        Modal.confirm({
            centered: true,
            title: '¿Está seguro que desea eliminar este Usuario?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                deleteUsuario(id);
            },
            onCancel() {
                console.log('Cancelado');
            },
            className: 'custom-confirm'
        });
    };

    const handleEdit = (id) => {
        navigate(`/editar-usuario/${id}`);
    };


    // Posible uso 
    // const filteredUsuarios = usuarios
    //     .filter(usuario => usuario.nombre && usuario.nombre.includes(searchTerm))

    //      Reduce el uso de los usuarios con un push, primero que entra primero que se muestra
    //     .reduce((acc, usuario) => {
    //         if (!acc.find(u => u.nombre === usuario.nombre)) {
    //             acc.push(usuario);
    //         }
    //         return acc;
    //     }, []);

    const filteredUsuarios = usuarios
    .filter(usuario => usuario.nombre && usuario.nombre.includes(searchTerm))

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    // style={{ backgroundColor: 'white' }}
    
    return (
        <div className="container-fluid">
            <h4>Buscar Usuario</h4>

            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table className='custom-table' columns={columns} dataSource={filteredUsuarios} rowKey="codAdmin" />
        </div>
    )
}
