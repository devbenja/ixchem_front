import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from "antd";

import { useParams } from 'react-router-dom';

import { baseURL } from '../../api/apiURL';

export const EditarEmbarazo = () => {

    const { id } = useParams();

    const [actual, setActual] = useState({
        codEmbarazo: 0,
        diagnostico: false,
        menor20: false,
        mayorde35: false,
        isoinmunizacion: false,
        sangradov: false,
        masaPelvica: false,
        presionArterial: false,
        numExpediente: ""
    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbembarazoactual/listarporcodigo/${id}`);

                console.log(response.data);

                setActual(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const handleChangeActual = (e) => {
        const { name, value, type, checked } = e.target;
        setActual({
            ...actual,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRadioChangeActual = (e) => {
        const { name, value } = e.target;
        setActual({
            ...actual,
            [name]: value === 'true'
        });
    };

    const handleSubmitActual = async (e) => {

        e.preventDefault();

        try {

            console.log(actual);

            await axios.put(`${baseURL}/bdtbembarazoactual/actualizar/${actual.codEmbarazo}`, actual);

            notification.success({
                message: '¡Éxito!',
                description: `Embarazo Actual Editado con Exito`,
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
        <div className='container-fluid'>
            <h4>Editar Embarazo Actual</h4>
            <form className='mt-4' onSubmit={handleSubmitActual}>
                <div className="row mb-3">
                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={actual.numExpediente} onChange={handleChangeActual} className="form-control" />
                    </div>

                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Diagnostico</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diagnostico" value="true" checked={actual.diagnostico === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="diagnostico" value="false" checked={actual.diagnostico === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Menor de 20</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="menor20" value="true" checked={actual.menor20 === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="menor20" value="false" checked={actual.menor20 === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Mayor de 35</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="mayorde35" value="true" checked={actual.mayorde35 === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="mayorde35" value="false" checked={actual.mayorde35 === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">

                    <div className="col-sm-3">
                        <label className="form-label">Inmunizacion</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="isoinmunizacion" value="true" checked={actual.isoinmunizacion === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="isoinmunizacion" value="false" checked={actual.isoinmunizacion === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Sangrado Vaginal</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="sangradov" value="true" checked={actual.sangradov === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="sangradov" value="false" checked={actual.sangradov === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label className="form-label">Masa Pelvica</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="masaPelvica" value="true" checked={actual.masaPelvica === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="masaPelvica" value="false" checked={actual.masaPelvica === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label className="form-label">Presión Arterial</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="presionArterial" value="true" checked={actual.presionArterial === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="presionArterial" value="false" checked={actual.presionArterial === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
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
