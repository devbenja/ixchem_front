import { useState, useEffect } from "react";
import { notification } from 'antd';
import axios from 'axios';

import { baseURL } from "../../api/apiURL";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

export const AgregarNota = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        numeroNota: "",
        fecha: "",
        hora: "",
        presion: "",
        temperatura: "",
        talla: "",
        peso: "",
        frecCardiaca: "",
        frecResp: "",
        notaEvolucion1: "",
        planes: "",
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

    const handleChange = (e) => {

        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' && value !== "" ? Number(value) : value
        });

    };

    const handleSubmitNota = async () => {

        try {
            console.log(formData);
            await axios.post(`${baseURL}/bdtbnotaevolucion/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Nota de Evolucion creada con éxito`,
                duration: 3
            });

            setFormData({
                numeroNota: "",
                fecha: "",
                hora: "",
                presion: "",
                temperatura: "",
                talla: "",
                peso: "",
                frecCardiaca: "",
                frecResp: "",
                notaEvolucion1: "",
                planes: "",
                numExpediente: "",
                codDoctor: user ? user.correo : ""
            });


        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: error.response?.data?.message || 'Ocurrió un error inesperado',
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
            okType: 'primary',
            cancelText: 'No',
            onOk() {
                handleSubmitNota();
            },
            onCancel() {
                console.log('Cancelado');
            },
            className: 'custom-confirm'
        });
    };

    const handleSave = () => {

        if (user.codRol === 2) {
            showSaveConfirm();
        } else {
            handleSubmitNota();
        }
    };


    const handleBack = () => {
        navigate('/home')
    };

    return (
        <div className="container-fluid">
            <h4>Agregar Nota de Evolución</h4>
            <form onSubmit={(e) => e.preventDefault()} className='mt-4'>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="segundoNombre" className="form-label">Fecha*</label>
                        <input
                            type="date"
                            className="form-control"
                            name="fecha"
                            onChange={handleChange}
                            value={formData.fecha}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoNombre" className="form-label">Hora*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="hora"
                            onChange={handleChange}
                            value={formData.hora}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="primerNombre" className="form-label">Numero Expediente*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="numExpediente"
                            onChange={handleChange}
                            value={formData.numExpediente}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoNombre" className="form-label">Codigo MINSA*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="codDoctor"
                            onChange={handleChange}
                            value={formData.codDoctor}
                            readOnly
                        />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="primerApellido" className="form-label">Talla*</label>
                        <input
                            type="number"
                            className="form-control"
                            name="talla"
                            onChange={handleChange}
                            value={formData.talla}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Peso*</label>
                        <input
                            type="number"
                            className="form-control"
                            name="peso"
                            onChange={handleChange}
                            value={formData.peso}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Temperatura*</label>
                        <input
                            type="number"
                            className="form-control"
                            name="temperatura"
                            onChange={handleChange}
                            value={formData.temperatura}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Presion*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="presion"
                            onChange={handleChange}
                            value={formData.presion}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">No. Nota</label>
                        <input
                            type="number"
                            className="form-control"
                            name="numeroNota"
                            onChange={handleChange}
                            value={formData.numeroNota}
                        />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Frecuencia Cardiaca</label>
                        <input
                            type="number"
                            className="form-control"
                            name="frecCardiaca"
                            value={formData.frecCardiaca}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Frecuencia Respiratoria</label>
                        <input
                            type="number"
                            className="form-control"
                            name="frecResp"
                            value={formData.frecResp}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-sm-12">
                        <label htmlFor="notaEvolucion" className="form-label">Nota de Evolución</label>
                        <textarea
                            className="form-control"
                            rows="10"
                            id="notaEvolucion1"
                            name='notaEvolucion1'
                            value={formData.notaEvolucion1}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className="col-sm-12">
                        <label htmlFor="planes" className="form-label">Planes</label>
                        <textarea
                            className="form-control"
                            rows="5"
                            id="planes"
                            name='planes'
                            value={formData.planes}
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>

                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                    <button className="btn btn-primary btn-save me-md-2" onClick={handleSave} type="submit">Guardar</button>
                    <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
};
