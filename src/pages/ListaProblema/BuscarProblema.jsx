import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined, FilePdfOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const BuscarProblema = () => {
    const [problemas, setProblemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProblemas();
    }, []);

    const fetchProblemas = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtblistaproblema/listar`);
            setProblemas(response.data);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleRowClick = (numExpediente) => {
        navigate(`/problemas/${numExpediente}`);
    };

    const filteredProblemas = problemas
        .filter(problema => problema.numExpediente && problema.numExpediente.includes(searchTerm))
        .reduce((acc, problema) => {
            if (!acc.find(p => p.numExpediente === problema.numExpediente)) {
                acc.push(problema);
            }
            return acc;
        }, []);

    const columns = [
        {
            title: 'Nombre del Problema',
            dataIndex: 'nombreProblema',
            key: 'nombreProblema',
        },
        {
            title: 'Número de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
            render: (numExpediente) => <a>{numExpediente}</a>
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined />} />
                </Space>
            ),
            align: 'center',
        },
    ];

    if (loading) return (
        <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status" />
        </div>
    );


    return (
        <div className="container">
            <div className='d-flex align-items-start justify-content-between'>
                <h4>Buscar Problemas</h4>
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
                pagination={{ pageSize: 7 }}
                className='custom-table'
                columns={columns}
                dataSource={filteredProblemas}
                rowKey="codProblemas"
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.numExpediente),
                })}
            />
        </div>
    );
};
