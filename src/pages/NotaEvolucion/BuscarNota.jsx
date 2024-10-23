import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const BuscarNota = () => {
    
    const [notas, setNotas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchNotas();
    }, []);

    const fetchNotas = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtbnotaevolucion/listar`);
            console.log(response.data)
            setNotas(response.data);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (nuM_EXPEDIENTE) => {
        navigate(`/notas-de-evolucion/${nuM_EXPEDIENTE}`);
    };

    const filteredNotas = notas
        .filter(nota => nota.nuM_EXPEDIENTE && nota.nuM_EXPEDIENTE.includes(searchTerm))
        .reduce((acc, nota) => {
            if (!acc.find(n => n.nuM_EXPEDIENTE === nota.nuM_EXPEDIENTE)) {
                acc.push(nota);
            }
            return acc;
        }, []);

    const columns = [
        {
            title: 'Número de Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
            render: (nuM_EXPEDIENTE) => <a>{nuM_EXPEDIENTE}</a>,
        },
        {
            title: 'Nombre del Paciente',
            dataIndex: 'primeR_NOMBRE',
            key: 'primeR_NOMBRE',
            render: (text, record) => (
                <div>{record.primeR_NOMBRE} {record.primeR_APELLIDO}</div>
            ),
        },
        // {
        //     title: 'Código de Nota',
        //     dataIndex: 'coD_NOTA',
        //     key: 'coD_NOTA',
        // },
        // {
        //     title: 'Código de Doctor',
        //     dataIndex: 'coD_DOCTOR',
        //     key: 'coD_DOCTOR',
        // },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined />} onClick={() => handleRowClick(record.nuM_EXPEDIENTE)} />
                </Space>
            ),
            align: 'center',
        },
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <div className="container">
            <div className='d-flex align-items-start justify-content-between'>
                <h4>Buscar Notas de Evolución</h4>
            </div>
            
            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por número de expediente"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table
                responsive={true}
                pagination={{ pageSize: 10 }}
                className='custom-table'
                columns={columns}
                dataSource={filteredNotas}
                rowKey="coD_NOTA" 
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.nuM_EXPEDIENTE),
                })}
            />
        </div>
    );
};


