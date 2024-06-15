import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Input, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Form } from 'react-bootstrap';

export const Doctores = () => {
    const [doctores, setDoctores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editDoctor, setEditDoctor] = useState(null);
    const [formValues, setFormValues] = useState({});

    useEffect(() => {
        fetchDoctores();
    }, []);

    const fetchDoctores = async () => {
        try {
            const response = await axios.get('https://localhost:7106/api/bdtdoctor/listar');
            setDoctores(response.data);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const createDoctor = async (doctor) => {
        try {

            doctor.edad = Number(doctor.edad);

            const response = await axios.post('https://localhost:7106/api/bdtdoctor/post', doctor);

            setDoctores([...doctores, response.data]);
            setModalVisible(false);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error creating data');
        }
    };

    const updateDoctor = async (id, updatedDoctor) => {
        try {
            const response = await axios.put(`https://localhost:7106/api/bdtdoctor/actualizar/${id}`, updatedDoctor);
            setDoctores(doctores.map(d => (d.codDoctor === id ? response.data : d)));
            setEditDoctor(null);
            setModalVisible(false);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error updating data');
        }
    };

    const deleteDoctor = async (id) => {
        try {
            await axios.delete(`https://localhost:7106/api/bdtdoctor/eliminar/${id}`);
            setDoctores(doctores.filter(d => d.codDoctor !== id));
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error deleting data');
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (doctor) => {
        setEditDoctor(doctor);
        setFormValues(doctor);
        setModalVisible(true);
    };

    const handleFormChange = (event) => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (editDoctor) {
            const updatedDoctor = { ...editDoctor, ...formValues };
            updateDoctor(editDoctor.codDoctor, updatedDoctor);
        } else {
            createDoctor(formValues);
        }
    };

    const filteredDoctores = doctores.filter(doctor =>
        doctor.codDoctor.includes(searchTerm)
    );

    const columns = [
        {
            title: 'Código del Doctor',
            dataIndex: 'codDoctor',
            key: 'codDoctor',
        },
        {
            title: 'Primer Nombre',
            dataIndex: 'primerNombre',
            key: 'primerNombre',
        },
        {
            title: 'Segundo Nombre',
            dataIndex: 'segundoNombre',
            key: 'segundoNombre',
        },
        {
            title: 'Primer Apellido',
            dataIndex: 'primerApellido',
            key: 'primerApellido',
        },
        {
            title: 'Segundo Apellido',
            dataIndex: 'segundoApellido',
            key: 'segundoApellido',
        },
        {
            title: 'Edad',
            dataIndex: 'edad',
            key: 'edad',
        },
        {
            title: 'Correo',
            dataIndex: 'correo',
            key: 'correo',
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
        },
        {
            title: 'Teléfono 2',
            dataIndex: 'telefono2',
            key: 'telefono2',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} onClick={() => deleteDoctor(record.codDoctor)} />
                </Space>
            ),
        },
    ];

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container">
            <div className='d-flex align-items-center justify-content-between'>
                <h4>Lista de Doctores</h4>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setModalVisible(true)}
                    className="mb-3"
                >
                    Crear Doctor
                </Button>
            </div>
            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por código de doctor"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table
                columns={columns}
                dataSource={filteredDoctores}
                rowKey="codDoctor"
            />

            <Modal show={modalVisible} onHide={() => setModalVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editDoctor ? "Editar Doctor" : "Crear Doctor"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="codDoctor">
                            <Form.Label>Código del Doctor</Form.Label>
                            <Form.Control type="text" name="codDoctor" defaultValue={editDoctor ? editDoctor.codDoctor : ''} onChange={handleFormChange} />
                        </Form.Group>
                        <div className='d-flex align-items-center gap-2'>
                            <Form.Group controlId="primerNombre">
                                <Form.Label>Primer Nombre</Form.Label>
                                <Form.Control type="text" name="primerNombre" defaultValue={editDoctor ? editDoctor.primerNombre : ''} onChange={handleFormChange} />
                            </Form.Group>
                            <Form.Group controlId="segundoNombre">
                                <Form.Label>Segundo Nombre</Form.Label>
                                <Form.Control type="text" name="segundoNombre" defaultValue={editDoctor ? editDoctor.segundoNombre : ''} onChange={handleFormChange} />
                            </Form.Group>
                        </div>
                        <div className='d-flex align-items-center gap-2'>
                            <Form.Group controlId="primerApellido">
                                <Form.Label>Primer Apellido</Form.Label>
                                <Form.Control type="text" name="primerApellido" defaultValue={editDoctor ? editDoctor.primerApellido : ''} onChange={handleFormChange} />
                            </Form.Group>
                            <Form.Group controlId="segundoApellido">
                                <Form.Label>Segundo Apellido</Form.Label>
                                <Form.Control type="text" name="segundoApellido" defaultValue={editDoctor ? editDoctor.segundoApellido : ''} onChange={handleFormChange} />
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center gap-2'>
                            <Form.Group controlId="edad">
                                <Form.Label>Edad</Form.Label>
                                <Form.Control type="number" name="edad" defaultValue={editDoctor ? editDoctor.edad : ''} onChange={handleFormChange} />
                            </Form.Group>
                            <Form.Group controlId="correo">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" name="correo" defaultValue={editDoctor ? editDoctor.correo : ''} onChange={handleFormChange} />
                            </Form.Group>
                        </div>

                        <div className='d-flex align-items-center gap-2'>
                            <Form.Group controlId="telefono">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control type="tel" name="telefono" defaultValue={editDoctor ? editDoctor.telefono : ''} onChange={handleFormChange} />
                            </Form.Group>
                            <Form.Group controlId="telefono2">
                                <Form.Label>Teléfono 2</Form.Label>
                                <Form.Control type="tel" name="telefono2" defaultValue={editDoctor ? editDoctor.telefono2 : ''} onChange={handleFormChange} />
                            </Form.Group>
                        </div>

                        <div className='mt-3 d-flex align-items-end gap-2'>
                            <button className='btn btn-success'>{editDoctor ? "Actualizar" : "Crear"}</button>
                            <button className='btn btn-danger'>Cancelar</button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};
