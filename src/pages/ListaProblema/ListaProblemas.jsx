import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Form } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const ListaProblemas = () => {
    const [problemas, setProblemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editProblema, setEditProblema] = useState(null);

    const [formValues, setFormValues] = useState({});

    const handleFormChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const user = JSON.parse(localStorage.getItem('user'));

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

    const createProblema = async (problema) => {
        try {

            console.log(problema);

            const convertedData = {
                ...problema,
                activo: problema.activo === 'true',
                resuelto: problema.resuelto === 'true',
                numeroNota: Number(problema.numeroNota)
            }

            const response = await axios.post(`${baseURL}/bdtblistaproblema/post`, convertedData);

            console.log(response.data)

            setProblemas([...problemas, response.data]);
            setModalVisible(false);

        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error creating data');
        }
    };

    const updateProblema = async (id, updatedProblema) => {
        try {

            const convertedData = {
                ...updatedProblema,
                activo: updatedProblema.activo === 'true',
                resuelto: updatedProblema.resuelto === 'true'
            }

            const response = await axios.put(`${baseURL}/bdtblistaproblema/actualizar/${id}`, convertedData);
            
            console.log(response)

            setProblemas(problemas.map(p => (p.codProblemas === id ? response.data : p)));
            setEditProblema(null);
            setModalVisible(false);
            
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error updating data');
        }
    };

    const deleteProblema = async (id) => {
        try {
            await axios.delete(`${baseURL}/bdtblistaproblema/eliminar/${id}`);
            setProblemas(problemas.filter(p => p.codProblemas !== id));
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error deleting data');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (problema) => {
        setEditProblema(problema);
        setFormValues(problema);
        setModalVisible(true);
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        if (editProblema) {
            const updatedProblema = { ...editProblema, ...formValues };
            updateProblema(editProblema.codProblemas, updatedProblema);
        } else {
            createProblema(formValues);
        }
    };

    const filteredProblemas = problemas.filter(problema =>
        problema.numExpediente && problema.numExpediente.includes(searchTerm)
    );


    const columns = [
        {
            title: 'Número de Nota',
            dataIndex: 'numeroNota',
            key: 'numeroNota',
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Nombre del Problema',
            dataIndex: 'nombreProblema',
            key: 'nombreProblema',
        },
        {
            title: 'Activo',
            dataIndex: 'activo',
            key: 'activo',
            render: (activo) => (activo ? 'Sí' : 'No'),
        },
        {
            title: 'Resuelto',
            dataIndex: 'resuelto',
            key: 'resuelto',
            render: (resuelto) => (resuelto ? 'Sí' : 'No'),
        },
        {
            title: 'Número de Expediente',
            dataIndex: 'numExpediente',
            key: 'numExpediente',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />

                    
                    <Button style={{ variant:'outlined', color: 'red' }} icon={<DeleteOutlined />} onClick={() => deleteProblema(record.codProblemas)} />
                </Space>
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className='d-flex align-items-center justify-content-between'>
                <h4>Lista de Problemas</h4>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                    className="mb-3"
                >
                    Crear Problema
                </Button>
            </div>
            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por número de expediente"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table
                columns={columns}
                dataSource={filteredProblemas}
                rowKey="codProblemas"
            />

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editProblema ? "Editar Problema" : "Crear Problema"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="numeroNota">
                            <Form.Label>Número de Nota</Form.Label>
                            <Form.Control type="text" name="numeroNota" defaultValue={editProblema ? editProblema.numeroNota : ''} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group className='mt-2' controlId="fecha">
                            <Form.Label>Fecha</Form.Label>
                            <Form.Control type="date" name="fecha" defaultValue={editProblema ? editProblema.fecha : ''} onChange={handleFormChange} required />
                        </Form.Group>
                        <Form.Group className='mt-2' controlId="nombreProblema">
                            <Form.Label>Nombre del Problema</Form.Label>
                            <Form.Control type="text" name="nombreProblema" defaultValue={editProblema ? editProblema.nombreProblema : ''} onChange={handleFormChange} required />
                        </Form.Group>
                        <div className='d-flex align-items-center justify-content-between mt-2'>
                            <Form.Group controlId="activo">
                                <Form.Label>Activo</Form.Label>
                                <div className='d-flex gap-2'>
                                    <Form.Check type="radio" name="activo" value="true" label="Sí" defaultChecked={editProblema ? editProblema.activo : false} onChange={handleFormChange} required />
                                    <Form.Check type="radio" name="activo" value="false" label="No" defaultChecked={editProblema ? !editProblema.activo : true} onChange={handleFormChange} required />
                                </div>
                            </Form.Group>
                            <Form.Group controlId="resuelto">
                                <Form.Label>Resuelto</Form.Label>
                                <div className='d-flex gap-2'>
                                    <Form.Check type="radio" name="resuelto" value="true" label="Sí" defaultChecked={editProblema ? editProblema.resuelto : false} onChange={handleFormChange} required />
                                    <Form.Check type="radio" name="resuelto" value="false" label="No" defaultChecked={editProblema ? !editProblema.resuelto : true} onChange={handleFormChange} required />
                                </div>
                            </Form.Group>
                        </div>
                        <Form.Group className='mt-2' controlId="numExpediente">
                            <Form.Label>Número de Expediente</Form.Label>
                            <Form.Control type="text" name="numExpediente" defaultValue={editProblema ? editProblema.numExpediente : ''} onChange={handleFormChange} required />
                        </Form.Group>

                        <div className='d-flex gap-2 mt-3'>
                            <button type='submit' className='btn btn-success'>{editProblema ? "Actualizar" : "Crear"}</button>
                            <button className='btn btn-danger'>cancelar</button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>

        </div>
    );
};
