import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from "antd";
import { useParams } from 'react-router-dom';

export const EditHistoriaClinicaGeneral = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        nuM_EXPEDIENTE: "",
        primeR_NOMBRE: "",
        primeR_APELLIDO: "",
        coD_DOCTOR: "",
        primeR_NOMBRED: "",
        primeR_APELLIDOD: "",
        coD_HISTORIA_CLINICA: 0,
        diabeteS_MELLITUS: false,
        nefropatia: false,
        cardiopatia: false,
        consumO_DROGAS: false,
        cualquieR_OTRO: false,
        altO_RIESGO: false,
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

                const response = await axios.get(`https://localhost:7106/api/bdtbhistoriaclinicageneral/buscarpornumexpediente`, {
                    params: { NUM_EXPEDIENTE: id }
                });

                console.log(response.data);

                setFormData(response.data[0]);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const newData = {
                numExpediente: formData.nuM_EXPEDIENTE,
                codDoctor: formData.coD_DOCTOR,
                fecha: formData.fecha,
                altoRiesgo: formData.altO_RIESGO,
                cualquierOtro: formData.cualquieR_OTRO,
                consumoDrogas: formData.consumO_DROGAS,
                cardiopatia: formData.cardiopatia,
                nefropatia: formData.nefropatia,
                diabetesMellitus: formData.diabeteS_MELLITUS,
                codHistoriaClinica: formData.coD_HISTORIA_CLINICA
            }

            await axios.put(`https://localhost:7106/api/bdtbhistoriaclinicageneral/actualizar/${newData.codHistoriaClinica}`, newData);

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
                        <input type="text" name="nuM_EXPEDIENTE" value={formData.nuM_EXPEDIENTE} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Codigo Doctor</label>
                        <input type="text" name="coD_DOCTOR" value={formData.coD_DOCTOR} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Fecha</label>
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Diabetes Mellitus</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diabeteS_MELLITUS" value="true" checked={formData.diabeteS_MELLITUS === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diabeteS_MELLITUS" value="false" checked={formData.diabeteS_MELLITUS === false} onChange={handleRadioChange} className="form-check-input" />
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
                                <input type="radio" name="consumO_DROGAS" value="true" checked={formData.consumO_DROGAS === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="consumO_DROGAS" value="false" checked={formData.consumO_DROGAS === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <label className="form-label">Cualquier Otro</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cualquieR_OTRO" value="true" checked={formData.cualquieR_OTRO === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cualquieR_OTRO" value="false" checked={formData.cualquieR_OTRO === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-sm-2">
                    <label className="form-label">Alto Riesgo</label>
                    <div className='d-flex align-items-center justify-content-center form-control'>
                        <div className="form-check form-check-inline">
                            <input type="radio" name="altO_RIESGO" value="true" checked={formData.altO_RIESGO === true} onChange={handleRadioChange} className="form-check-input" />
                            <label className="form-check-label">Sí</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input type="radio" name="altO_RIESGO" value="false" checked={formData.altO_RIESGO === false} onChange={handleRadioChange} className="form-check-input" />
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
