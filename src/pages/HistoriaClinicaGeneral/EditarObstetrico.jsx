import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification, Button } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useParams, useNavigate } from 'react-router-dom';

import { baseURL } from '../../api/apiURL';

export const EditarObstetrico = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [obstetrico, setObstetrico] = useState({
        codHojariesgo: 0,
        muerteFetal: false,
        antAbortos: false,
        peso250: false,
        peso450: false,
        internada: false,
        cirugiasPrevias: false,
        numExpediente: "",
        telefono: ""
    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtbantecedentesobstetrico/buscarporcodhojariesgo`, {
                    params: { codHojariesgo: id }
                });

                console.log(response.data);

                setObstetrico(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const handleChangeObs = (e) => {
        const { name, value, type, checked } = e.target;
        setObstetrico({
            ...obstetrico,
            [name]: type === 'checkbox' ? checked : value
        });
    };
    const handleRadioChangeObs = (e) => {
        const { name, value } = e.target;
        setObstetrico({
            ...obstetrico,
            [name]: value === 'true'
        });
    };

    const handleSubmitObs = async (e) => {

        e.preventDefault();

        try {

            console.log(obstetrico);

            await axios.put(`${baseURL}/bdtbantecedentesobstetrico/actualizar/${obstetrico.codHojariesgo}`, obstetrico);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Obstetrico Editado con Exito`,
                duration: 3
            });

            setTimeout(() => {
                navigate(`/obstetricos/${obstetrico.numExpediente}`);
            }, 1000);

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: error,
                duration: 3
            });

        }

    }

    const handleBack = () => {
        navigate(`/obstetricos/${obstetrico.numExpediente}`);
    }

    return (
        <div className="container-fluid">
            <div className='container-fluid d-flex align-items-center justify-content-between'>
                <h4>Editar Antecedente Obstetrico</h4>
                <Button style={{ backgroundColor: 'red', color: 'white'}} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            
            <form className='mt-4' onSubmit={handleSubmitObs}>
                <div className="row mb-3">
                    
                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={obstetrico.numExpediente} onChange={handleChangeObs} className="form-control" />
                    </div>
                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Telefono</label>
                        <input type="number" name="telefono" value={obstetrico.telefono} onChange={handleChangeObs} className="form-control" />
                    </div>

                    <div className="col-sm-3 mt-3">
                        <label className="form-label">¿Abortos?</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="antAbortos" value="true" checked={obstetrico.antAbortos === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="antAbortos" value="false" checked={obstetrico.antAbortos === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3 mt-3">
                        <label className="form-label">Peso 250</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="peso250" value="true" checked={obstetrico.peso250 === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="peso250" value="false" checked={obstetrico.peso250 === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">

                    <div className="col-sm-3">
                        <label className="form-label">Peso 450</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="peso450" value="true" checked={obstetrico.peso450 === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="peso450" value="false" checked={obstetrico.peso450 === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Internada</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="internada" value="true" checked={obstetrico.internada === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="internada" value="false" checked={obstetrico.internada === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label className="form-label">Cirugias Previas</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cirugiasPrevias" value="true" checked={obstetrico.cirugiasPrevias === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="cirugiasPrevias" value="false" checked={obstetrico.cirugiasPrevias === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-3">
                        <label className="form-label">Muerte Fetal</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="muerteFetal" value="true" checked={obstetrico.muerteFetal === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="muerteFetal" value="false" checked={obstetrico.muerteFetal === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type='button' onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
