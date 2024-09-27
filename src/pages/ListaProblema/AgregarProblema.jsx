import { useState } from 'react';
import { useForm } from 'react-hook-form'; // Importación de react-hook-form para manejar formularios
import axios from 'axios';
import './Problemas.css';
import { notification } from 'antd';
import { baseURL } from '../../api/apiURL.js';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/AuthContext.jsx';

export const AgregarProblema = () => {
    // useForm ahora también maneja formState para acceder a los errores de validación
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user } = useAuth();
    const navigate = useNavigate();

    const alerta = () => {
        notification.success({
            message: '¡Éxito!',
            description: 'Problema creado Exitosamente!',
            duration: 3
        });
    };

    const onSubmitProblema = handleSubmit(async (data) => {
        // Validación adicional para el número de nota
        if (data.numeroNota < 1) {
            notification.error({
                message: 'Error en el número de nota',
                description: 'El número de nota no puede ser menor a 1',
                duration: 3
            });
            return;
        }

        try {
            const transformedData = {
                ...data,
                activo: data.activo === 'true',
                resuelto: data.resuelto === 'true'
            };

            await axios.post(`${baseURL}/bdtblistaproblema/post`, transformedData);
            alerta();
            showContinue();

        } catch (error) {
            notification.error({
                message: 'Error al Crear Problema',
                description: `${error.response.data.message}`,
                duration: 3
            });
        }
    });

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
                onSubmitProblema(); // Llama al envío del formulario si el usuario confirma 
                showContinue();
            },
            onCancel() {
                console.log('Cancelado');
            },
            className: 'custom-confirm'
        });
    };

    const showContinue = () => {
        Modal.confirm({
            centered: true,
            title: '¡Atención!',
            content: '¿Desea seguir agregando con el mismo número de expediente?',
            okText: 'Continuar reporte',
            cancelText: 'Finalizar reporte',
            onOk() {
                // Limpia todos los campos excepto el número de expediente
            },
            onCancel() {
                reset(); // Resetea el formulario después de enviar los datos exitosamente
            },
            okButtonProps: {
                style: {
                    backgroundColor: '#faad14', // Color mostaza
                    color: 'white',
                    borderColor: '#faad14',
                    display: 'inline-block',
                    marginRight: '25px',
                }
            },
            cancelButtonProps: {
                style: {
                    backgroundColor: 'green',
                    color: 'white',
                    borderColor: 'green',
                    display: 'inline-block',
                }
            },
            icon: null, // Asegura que no se utilice ningún icono
            className: 'custom-confirm',
            style: {
                textAlign: 'center' // Centra los botones dentro del modal
            }
        });                
    };

    const handleBack = () => {
        //navigate('/home')
        reset(); // Resetea el formulario después de enviar los datos exitosamente
    };

    const handleSave = () => {
        if (user.codRol === 2) {
            showSaveConfirm();
        } else {
            onSubmitProblema();
        }
    };

    return (
        <div className='container-fluid mb-3'>
            <h4>Agregar Problema</h4>
            <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="text"
                            // Clase is-invalid se agrega si hay un error en este campo, esto aplica estilos de error
                            className={`form-control ${errors.numExpediente ? 'is-invalid' : ''}`}
                            {...register('numExpediente', { required: true, maxLength: 20 })} // Registro de validaciones en el campo
                        />
                        {/* Muestra un mensaje de error si el campo está vacío o no cumple con la validación */}
                        {errors.numExpediente && <div className="invalid-feedback">Campo requerido</div>}
                    </div>

                    <div className="col-sm-9">
                        <label htmlFor="expediente" className="form-label">Nombre del Problema</label>
                        <input
                            type="text"
                            className={`form-control ${errors.nombreProblema ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            title="Insertar Identificacion"
                            {...register('nombreProblema', { required: true })} // Registro de validación en el campo
                        />
                        {/* Muestra un mensaje de error si el campo no está completo */}
                        {errors.nombreProblema && <div className="invalid-feedback">Campo requerido</div>}
                    </div>

                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="PrimerN" className="form-label">Numero de Nota<span style={{ color: 'red' }}> *</span></label>
                            <input
                                type="number"
                                min="1"
                                className={`form-control ${errors.numeroNota ? 'is-invalid' : ''}`} // Aplicación de clase de error
                                title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                {...register('numeroNota', { required: true, maxLength: 30 })} // Registro de validación en el campo
                            />
                            {/* Muestra un mensaje de error si el campo no está completo */}
                            {errors.numeroNota && <div className="invalid-feedback">Campo requerido</div>}
                        </div>

                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="nacimiento" className="form-label">Fecha<span style={{ color: 'red' }}> *</span></label>
                            <input
                                type="date"
                                className={`form-control ${errors.fecha ? 'is-invalid' : ''}`} // Aplicación de clase de error
                                name='fecha'
                                id='fecha'
                                {...register('fecha', { required: true })} // Registro de validación en el campo
                            />
                            {/* Muestra un mensaje de error si el campo no está completo */}
                            {errors.fecha && <div className="invalid-feedback">Campo requerido</div>}
                        </div>

                        <div className="col-sm-2 mt-3">
                            <label htmlFor="sexo" className="form-label">Activo<span style={{ color: 'red' }}> *</span></label>
                            <div className={`d-flex align-items-center justify-content-center gap-4 form-control ${errors.activo ? 'is-invalid' : ''}`}>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="true"
                                        id="true"
                                        {...register("activo", { required: true })} // Registro de validación en el campo
                                    />
                                    <label className="form-check-label" htmlFor="activo">Si</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="false"
                                        id="false"
                                        {...register("activo", { required: true })} // Registro de validación en el campo
                                    />
                                    <label className="form-check-label" htmlFor="activo">No</label>
                                </div>
                            </div>
                            {/* Muestra un mensaje de error si no se ha seleccionado una opción */}
                            {errors.activo && <div className="invalid-feedback">Campo requerido</div>}
                        </div>

                        <div className="col-sm-2 mt-3">
                            <label htmlFor="sexo" className="form-label">Resuelto<span style={{ color: 'red' }}> *</span></label>
                            <div className={`d-flex align-items-center justify-content-center gap-4 form-control ${errors.resuelto ? 'is-invalid' : ''}`}>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="true"
                                        id="true"
                                        {...register("resuelto", { required: true })} // Registro de validación en el campo
                                    />
                                    <label className="form-check-label" htmlFor="resuelto">Si</label>
                                </div>
                                <div className="form-check">
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        value="false"
                                        id="false"
                                        {...register("resuelto", { required: true })} // Registro de validación en el campo
                                    />
                                    <label className="form-check-label" htmlFor="resuelto">No</label>
                                </div>
                            </div>
                            {/* Muestra un mensaje de error si no se ha seleccionado una opción */}
                            {errors.resuelto && <div className="invalid-feedback">Campo requerido</div>}
                        </div>
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

//Codigo actualizado
// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import './Problemas.css';


// import { notification } from 'antd';
// import { baseURL } from '../../api/apiURL.js';

// import { useNavigate } from 'react-router-dom';

// import { Modal } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { useAuth } from '../../context/AuthContext.jsx';

// export const AgregarProblema = () => {

//     const { register, handleSubmit, reset } = useForm();
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const alerta = () => {

//         notification.success({
//             message: '¡Éxito!',
//             description: 'Problema creado Exitosamente!',
//             duration: 3
//         });

//     };

//     const onSubmitProblema = handleSubmit(async (data) => {

//         // Validación adicional para el número de nota
//         if (data.numeroNota < 1) {
//             notification.error({
//                 message: 'Error en el número de nota',
//                 description: 'El número de nota no puede ser menor a 1',
//                 duration: 3
//             });
//             return; // Detiene la ejecución si la nota es menor a 0
//         }

//         try {

//             const transformedData = {
//                 ...data,
//                 activo: data.activo === 'true',
//                 resuelto: data.resuelto === 'true'
//             }

//             console.log(transformedData)

//             await axios.post(`${baseURL}/bdtblistaproblema/post`, transformedData);

//             alerta();

//             reset();

//         } catch (error) {

//             notification.error({
//                 message: 'Error al Crear Problema',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });

//         }

//     });

//     const showSaveConfirm = () => {

//         Modal.confirm({
//             centered: true,
//             title: '¿Está seguro de Guardar permanentemente?',
//             icon: <ExclamationCircleOutlined />,
//             content: 'Esta acción no se puede deshacer.',
//             okText: 'Sí',
//             okType: 'primary',
//             cancelText: 'No',
//             onOk() {
//                 onSubmitProblema();
//             },
//             onCancel() {
//                 console.log('Cancelado');
//             },
//             className: 'custom-confirm'
//         });
//     };

//     const handleBack = () => {
//         navigate('/home')
//     };

//     const handleSave = () => {
//         if (user.codRol === 2) {
//             showSaveConfirm();
//         } else {
//             onSubmitProblema();
//         }
//     };

//     return (
//         <>
//             <div className='container-fluid mb-3'>
//                 <h4>Agregar Problema</h4>
//                 <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
//                     <div className="row g-3">
//                         <div className="col-sm-3">
//                             <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 {...register('numExpediente', { required: true, maxLength: 20 })}
//                             />
//                         </div>

//                         <div className="col-sm-9">
//                             <label htmlFor="expediente" className="form-label">Nombre del Problema</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 title="Insertar Identificacion"
//                                 {...register('nombreProblema', { required: true })}
//                             />
//                         </div>

//                         <div className='d-flex justify-content-between flex-wrap'>
//                             <div className="col-sm-2 col-12 mt-3">
//                                 <label htmlFor="PrimerN" className="form-label">Numero de Nota<span style={{color: 'red'}}> * </span></label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     className="form-control"
//                                     title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                     {...register('numeroNota', { required: true, maxLength: 30 })}
//                                 />
//                             </div>

//                             <div className="col-sm-2 col-12 mt-3">
//                                 <label htmlFor="nacimiento" className="form-label">Fecha<span style={{color: 'red'}}> * </span></label>
//                                 <input
//                                     type="date"
//                                     className="form-control"
//                                     name='fecha'
//                                     id='fecha'
//                                     {...register('fecha', { required: true })}
//                                 />
//                             </div>

//                             <div className="col-sm-2 mt-3">
//                                 <label htmlFor="sexo" className="form-label">Activo<span style={{color: 'red'}}> * </span></label>
//                                 <div className="d-flex align-items-center justify-content-center gap-4 form-control">
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             value="true"
//                                             id="true"
//                                             {...register("activo", { required: true })}
//                                         />
//                                         <label className="form-check-label" htmlFor="activo">Si</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             value="false"
//                                             id="false"
//                                             {...register("activo", { required: true })}
//                                         />
//                                         <label className="form-check-label" htmlFor="activo">No</label>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-sm-2 mt-3">
//                                 <label htmlFor="sexo" className="form-label">Resuelto<span style={{color: 'red'}}> * </span></label>
//                                 <div className="d-flex align-items-center justify-content-center gap-4 form-control">
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             value="true"
//                                             id="true"
//                                             {...register("resuelto", { required: true })}
//                                         />
//                                         <label className="form-check-label" htmlFor="resuelto">Si</label>
//                                     </div>
//                                     <div className="form-check">
//                                         <input
//                                             type="radio"
//                                             className="form-check-input"
//                                             value="false"
//                                             id="false"
//                                             {...register("resuelto", { required: true })}
//                                         />
//                                         <label className="form-check-label" htmlFor="resuelto">No</label>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
//                         <button className="btn btn-primary btn-save me-md-2" onClick={handleSave} type="submit">Guardar</button>
//                         <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                     </div>

//                 </form>
//             </div>
     
//         </>
//     )
// }
