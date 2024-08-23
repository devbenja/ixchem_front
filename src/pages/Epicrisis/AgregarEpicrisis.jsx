import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { baseURL } from '../../api/apiURL.js';

import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const AgregarEpicrisis = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codEpicrisis: 0,
        fecha: "",
        hora: "",
        fechaIngreso: "",
        fechaEgreso: "",
        diagIngreso: "",
        diagEgreso: "",
        resultado: "",
        tratamiento: "",
        descartes: "",
        complicaciones: "",
        recomendaciones: "",
        datosRelevantes: "",
        numExpediente: "",
        codDoctor: ""
    });

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                codDoctor: user.correo
            }));
        }
    }, [user]);

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${baseURL}/bdtdoctor/listar`);
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors: ", error);
                notification.error({
                    message: '¡Error!',
                    description: 'Error al cargar la lista de doctores',
                    duration: 3
                });
            }
        };

        fetchDoctors();

    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async () => {

        try {

            console.log(formData);

            await axios.post(`${baseURL}/bdtbepicrisis/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Epicrisis Creada con Exito`,
                duration: 3
            });

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: error,
                duration: 3
            });

        }
    };

    const showSaveConfirm = () => {

        Modal.confirm({
            centered: true,
            title: '¿Está seguro de Guardar permanentemente?',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleSubmit();
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    const handleSave = () => {

        if (user.codRol === 2) {
            showSaveConfirm();
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        navigate('/home')
    };

    return (
        <div className="container-fluid">
            <h4>Agregar Epicrisis</h4>
            <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Codigo MINSA</label>
                        <input 
                            type="text" 
                            name="codDoctor" 
                            value={formData.codDoctor}
                            onChange={handleChange} 
                            className="form-control" 
                            readOnly
                        />
                    </div>
                    {/* <div className="col sm-mt-3">
                        <label htmlFor="codDoctor" className="form-label">Codigo Doctor*</label>
                        <select
                            className="form-control"
                            name="codDoctor"
                            onChange={handleChange}
                            value={formData.codDoctor}
                        >
                            <option value="">Seleccione un Doctor</option>
                            {doctors.map(doctor => (
                                <option key={doctor.codDoctor} value={doctor.codDoctor}>
                                    {doctor.primerNombred} {doctor.primerApellidod}
                                </option>
                            ))}
                        </select>
                    </div> */}
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha </label>
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
                    </div>

                </div>

                <div className="row mb-3">

                    <div className="col sm-mt-3">
                        <label className="form-label">Hora</label>
                        <input type="text" name="hora" value={formData.hora} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Ingreso</label>
                        <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Egreso</label>
                        <input type="date" name="fechaEgreso" value={formData.fechaEgreso} onChange={handleChange} className="form-control" />
                    </div>

                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnostico Ingreso</label>
                    <textarea rows="3" type="text" name="diagIngreso" value={formData.diagIngreso} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnostico Egreso</label>
                    <textarea rows="3" type="text" name="diagEgreso" value={formData.diagEgreso} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Resultado</label>
                    <textarea rows="3" type="text" name="resultado" value={formData.resultado} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Tratamiento</label>
                    <textarea rows="3" type="text" name="tratamiento" value={formData.tratamiento} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Descartes</label>
                    <textarea rows="3" type="text" name="descartes" value={formData.descartes} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Complicaciones</label>
                    <textarea rows="3" type="text" name="complicaciones" value={formData.complicaciones} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Recomendaciones</label>
                    <textarea rows="3" type="text" name="recomendaciones" value={formData.recomendaciones} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Datos Relevantes</label>
                    <textarea rows="3" type="text" name="datosRelevantes" value={formData.datosRelevantes} onChange={handleChange} className="form-control" />
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button onClick={handleSave} type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
