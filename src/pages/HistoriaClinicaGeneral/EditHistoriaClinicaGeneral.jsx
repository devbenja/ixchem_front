import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from "antd";
import { useParams } from 'react-router-dom';

export const EditHistoriaClinicaGeneral = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        numExpediente: "",
        codDoctor: "",
        codHistoriaClinica: 0,
        diabetesMellitus: false,
        nefropatia: false,
        cardiopatia: false,
        consumoDrogas: false,
        cualquierOtro: false,
        altoRiesgo: false,
        fecha: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === 'true'
        });
    };


    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`https://localhost:7106/api/bdtbhistoriaclinicageneral/buscarporcodhistoriaclinica`, {
                    params: { CodHistoriaClinica: id }
                });

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            console.log(formData)

            await axios.put(`https://localhost:7106/api/bdtbhistoriaclinicageneral/actualizar/${formData.codHistoriaClinica}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Historua Clinica General Editada con Exito`,
                duration: 3
            });

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: error,
                duration: 3
            });

        }

    }

    return (
        <div className="container-fluid">
            <h4>Editar Historia Clinica General</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-3">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Codigo Doctor</label>
                        <input type="text" name="codDoctor" value={formData.codDoctor} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Fecha</label>
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Diabetes Mellitus</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diabetesMellitus" value="true" checked={formData.diabetesMellitus === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diabetesMellitus" value="false" checked={formData.diabetesMellitus === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Nefropatia</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="nefropatia" value="true" checked={formData.nefropatia === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="nefropatia" value="false" checked={formData.nefropatia === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Cardiopatia</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cardiopatia" value="true" checked={formData.cardiopatia === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cardiopatia" value="false" checked={formData.cardiopatia === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">¿Consume Drogas?</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="consumoDrogas" value="true" checked={formData.consumoDrogas === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="consumoDrogas" value="false" checked={formData.consumoDrogas === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <label className="form-label">Cualquier Otro</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cualquierOtro" value="true" checked={formData.cualquierOtro === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cualquierOtro" value="false" checked={formData.cualquierOtro === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-2">
                    <label className="form-label">Alto Riesgo</label>
                    <div className='d-flex align-items-center justify-content-center form-control'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name="altoRiesgo" value="true" checked={formData.altoRiesgo === true} onChange={handleRadioChange} className="form-check-input" />
                            <label className="form-check-label">Sí</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name="altoRiesgo" value="false" checked={formData.altoRiesgo === false} onChange={handleRadioChange} className="form-check-input" />
                            <label className="form-check-label">No</label>
                        </div>
                    </div>
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="submit" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
