import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import './Problemas.css';
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

import { notification } from 'antd';

export const AgregarProblema = () => {

    const { register, handleSubmit, reset } = useForm();

    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');


    const alerta = () => {

        notification.success({
            message: '¡Éxito!',
            description: 'Problema creado Exitosamente!',
            duration: 3
        });

    };

    const onSubmitProblema = handleSubmit(async (data) => {

        try {

            const transformedData = {
                ...data,
                activo: data.activo === 'true',
                resuelto: data.resuelto === 'true'
            }

            console.log(transformedData)

            await axios.post('https://localhost:7106/api/bdtblistaproblema/post', transformedData);

            alerta();

            reset();

        } catch (error) {

            notification.error({
                message: 'Error al Crear Problema',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    });

    useEffect(() => {

        if (showToast) {

            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }

    }, [showToast]);

    return (
        <>
            <div className='container-fluid mb-3'>
                <h4>Agregar Problema</h4>
                <form className='mt-4' onSubmit={onSubmitProblema}>
                    <div className="row g-3">
                        <div className="col-sm-3">
                            <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                            <input
                                type="text"
                                className="form-control"
                                {...register('numExpediente', { required: true, maxLength: 20 })}
                            />
                        </div>

                        <div className="col-sm-9">
                            <label htmlFor="expediente" className="form-label">Nombre del Problema</label>
                            <input
                                type="text"
                                className="form-control"
                                title="Insertar Identificacion"
                                {...register('nombreProblema', { required: true })}
                            />
                        </div>

                        <div className='d-flex justify-content-between flex-wrap'>
                            <div className="col-sm-2 col-12 mt-3">
                                <label htmlFor="PrimerN" className="form-label">Numero de Nota*</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                    {...register('numeroNota', { required: true, maxLength: 30 })}
                                />
                            </div>

                            <div className="col-sm-2 col-12 mt-3">
                                <label htmlFor="nacimiento" className="form-label">Fecha*</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    name='fecha'
                                    id='fecha'
                                    {...register('fecha', { required: true })}
                                />
                            </div>

                            <div className="col-sm-2 mt-3">
                                <label htmlFor="sexo" className="form-label">Activo*</label>
                                <div className="d-flex align-items-center justify-content-center gap-4 form-control">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="true"
                                            id="true"
                                            {...register("activo", { required: true })}
                                        />
                                        <label className="form-check-label" htmlFor="activo">Si</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="false"
                                            id="false"
                                            {...register("activo", { required: true })}
                                        />
                                        <label className="form-check-label" htmlFor="activo">No</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-2 mt-3">
                                <label htmlFor="sexo" className="form-label">Resuelto*</label>
                                <div className="d-flex align-items-center justify-content-center gap-4 form-control">
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="true"
                                            id="true"
                                            {...register("resuelto", { required: true })}
                                        />
                                        <label className="form-check-label" htmlFor="resuelto">Si</label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value="false"
                                            id="false"
                                            {...register("resuelto", { required: true })}
                                        />
                                        <label className="form-check-label" htmlFor="resuelto">No</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                        <button className="btn btn-primary btn-save me-md-2" type="submit" >Guardar</button>
                        <button type="reset" className="btn btn-danger">Cancelar</button>
                    </div>

                </form>
            </div>
            <Toast isOpen={showToast} className="position-fixed top-0 end-0 m-3">
                <ToastHeader toggle={() => setShowToast(false)}>Notificación</ToastHeader>
                <ToastBody>{toastBody}</ToastBody>
            </Toast>
        </>
    )
}
