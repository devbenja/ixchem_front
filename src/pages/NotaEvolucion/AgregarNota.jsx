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

    const [errors, setErrors] = useState({}); // Estado para manejar errores de validación

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                codDoctor: user.correo
            }));
        }
    }, [user]);

    //Logica anterior zzz
    // const handleChange = (e) => {
    //     const { name, value, type } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: type === 'number' && value !== "" ? Number(value) : value
    //     });
    // };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
    
        // Si estamos en el campo de hora
        if (name === 'hora') {
            let formattedValue = value.replace(/\D/g, ''); // Eliminar todo excepto números
    
            if (formattedValue.length >= 3) {
                formattedValue = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2, 4)}`;
            }
    
            // Solo aplicar validación si hay una hora con el formato correcto
            if (formattedValue.length === 5) {
                const [hours, minutes] = formattedValue.split(':');
                const hourInt = parseInt(hours, 10);
                const minutesInt = parseInt(minutes, 10);
    
                // Validar horas y minutos
                if (hourInt > 23 || minutesInt > 59) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        hora: "Ingrese una hora válida (HH:mm)"
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        hora: undefined
                    }));
    
                    // Lógica para agregar AM/PM
                    let period = "AM";
                    let hourFormatted = hourInt;
    
                    if (hourInt >= 12) {
                        period = "PM";
                        if (hourInt > 12) {
                            hourFormatted = hourInt - 12; // Convertir a formato 12 horas
                        }
                    } else if (hourInt === 0) {
                        hourFormatted = 12; // 12 AM
                    }
    
                    // Actualizar el valor con AM/PM
                    formattedValue = `${String(hourFormatted).padStart(2, '0')}:${minutes} ${period}`;
                }
            }
    
            setFormData((prevData) => ({
                ...prevData,
                [name]: formattedValue // Guardar el valor formateado
            }));
    
        } else {
            // Manejo de otros campos
            setFormData({
                ...formData,
                [name]: type === 'number' && value !== "" ? Number(value) : value
            });
    
            // Limpiar errores para otros campos
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: undefined
            }));
        }
    };    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fecha) newErrors.fecha = "La fecha es un campo requerido.";
        if (!formData.hora) newErrors.hora = "La hora es un campo requerido.";
        if (!formData.numExpediente) newErrors.numExpediente = "El número de expediente es un campo requerido.";
        if (!formData.codDoctor) newErrors.codDoctor = "El código MINSA es un campo requerido.";
        if (!formData.talla) newErrors.talla = "La talla es un campo requerido.";
        if (!formData.peso) newErrors.peso = "El peso es un campo requerido.";
        if (!formData.temperatura) newErrors.temperatura = "La temperatura es un campo requerido.";
        if (!formData.presion) newErrors.presion = "La presión es un campo requerido.";
        if (!formData.numeroNota) newErrors.nota = "El número de nota es un campo requerido.";
        if (!formData.frecCardiaca) newErrors.frecCardiaca = "La frecuencia cardiaca es un campo requerido.";
        if (!formData.frecResp) newErrors.frecResp = "La frecuencia respiratoria es un campo requerido.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Si no hay errores, devuelve true
    };

    const handleSubmitNota = async () => {
        
        if (!validateForm()) {
            notification.error({
                message: '¡Error!',
                description: 'Por favor, completa todos los campos requeridos.',
                duration: 3
            });
            return;
        }

        try {
            console.log(formData);
            await axios.post(`${baseURL}/bdtbnotaevolucion/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Nota de Evolución creada con éxito`,
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

            setErrors({}); // Resetea los errores después de guardar

        } catch (error) {
            notification.error({
                message: '¡Error!',
                //description: error.response?.data?.message || 'Ocurrió un error inesperado',
                description: `${error.response.data.message}`,
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
        //navigate('/home')
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
    };

    return (
        <div className="container-fluid">
            <h4>Agregar Nota de Evolución</h4>
            <form onSubmit={(e) => e.preventDefault()} className='mt-4'>
                <div className="row g-3">
                <div className="col-sm-3">
                        <label htmlFor="numExpediente" className="form-label">Numero Expediente<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.numExpediente ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="numExpediente"
                            onChange={handleChange}
                            value={formData.numExpediente}
                        />
                        {errors.numExpediente && <div className="invalid-feedback">{errors.numExpediente}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="numeroNota" className="form-label">No. Nota<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.nota ? 'is-invalid' : ''}`}
                            //className="form-control"
                            name="numeroNota"
                            onChange={handleChange}
                            value={formData.numeroNota}
                        />
                        {errors.nota && <div className="invalid-feedback">{errors.nota}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="fecha" className="form-label">Fecha<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="date"
                            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="fecha"
                            onChange={handleChange}
                            value={formData.fecha}
                        />
                        {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>} {/* Mensaje de error */}
                    </div>
                    
                    <div className="col-sm-3">
                        <label htmlFor="hora" className="form-label">Hora<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.hora ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="hora"
                            onChange={handleChange}
                            value={formData.hora}
                        />
                        {errors.hora && <div className="invalid-feedback">{errors.hora}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="codDoctor" className="form-label">Codigo MINSA<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.codDoctor ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="codDoctor"
                            onChange={handleChange}
                            value={formData.codDoctor}
                            readOnly
                        />
                        {errors.codDoctor && <div className="invalid-feedback">{errors.codDoctor}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="talla" className="form-label">Talla<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.talla ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="talla"
                            onChange={handleChange}
                            value={formData.talla}
                        />
                        {errors.talla && <div className="invalid-feedback">{errors.talla}</div>} {/* Mensaje de error */}
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="peso" className="form-label">Peso<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.peso ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="peso"
                            onChange={handleChange}
                            value={formData.peso}
                        />
                        {errors.peso && <div className="invalid-feedback">{errors.peso}</div>} {/* Mensaje de error */}
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="temperatura" className="form-label">Temperatura<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.temperatura ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="temperatura"
                            onChange={handleChange}
                            value={formData.temperatura}
                        />
                        {errors.temperatura && <div className="invalid-feedback">{errors.temperatura}</div>} {/* Mensaje de error */}
                    </div>
                    
                    <div className="col-sm-3">
                        <label htmlFor="presion" className="form-label">Presion<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            className={`form-control ${errors.presion ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="presion"
                            onChange={handleChange}
                            value={formData.presion}
                        />
                        {errors.presion && <div className="invalid-feedback">{errors.presion}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="frecCardiaca" className="form-label">Frecuencia Cardiaca<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            //className="form-control"
                            className={`form-control ${errors.frecCardiaca ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="frecCardiaca"
                            value={formData.frecCardiaca}
                            onChange={handleChange}
                        />
                        {errors.frecCardiaca && <div className="invalid-feedback">{errors.frecCardiaca}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-3">
                        <label htmlFor="frecResp" className="form-label">Frecuencia Respiratoria<span style={{ color: 'red' }}> *</span></label>
                        <input
                            type="number"
                            min="1"
                            //className="form-control"
                            className={`form-control ${errors.frecResp ? 'is-invalid' : ''}`} // Aplicación de clase de error
                            name="frecResp"
                            value={formData.frecResp}
                            onChange={handleChange}
                        />
                        {errors.frecResp && <div className="invalid-feedback">{errors.frecResp}</div>} {/* Mensaje de error */}
                    </div>

                    <div className="col-sm-12">
                        <label htmlFor="notaEvolucion1" className="form-label">Nota de Evolución</label>
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

//Codigo actualizado anterior
// import { useState, useEffect } from "react";
// import { notification } from 'antd';
// import axios from 'axios';

// import { baseURL } from "../../api/apiURL";
// import { Modal } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from "react-router-dom";

// export const AgregarNota = () => {

//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         numeroNota: "",
//         fecha: "",
//         hora: "",
//         presion: "",
//         temperatura: "",
//         talla: "",
//         peso: "",
//         frecCardiaca: "",
//         frecResp: "",
//         notaEvolucion1: "",
//         planes: "",
//         numExpediente: "",
//         codDoctor: ""
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 codDoctor: user.correo
//             }));
//         }
//     }, [user]);

//     const handleChange = (e) => {

//         const { name, value, type } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'number' && value !== "" ? Number(value) : value
//         });

//     };

//     const handleSubmitNota = async () => {

//         try {
//             console.log(formData);
//             await axios.post(`${baseURL}/bdtbnotaevolucion/post`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Nota de Evolucion creada con éxito`,
//                 duration: 3
//             });

//             setFormData({
//                 numeroNota: "",
//                 fecha: "",
//                 hora: "",
//                 presion: "",
//                 temperatura: "",
//                 talla: "",
//                 peso: "",
//                 frecCardiaca: "",
//                 frecResp: "",
//                 notaEvolucion1: "",
//                 planes: "",
//                 numExpediente: "",
//                 codDoctor: user ? user.correo : ""
//             });


//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: error.response?.data?.message || 'Ocurrió un error inesperado',
//                 duration: 3
//             });
//         }
//     };

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
//                 handleSubmitNota();
//             },
//             onCancel() {
//                 console.log('Cancelado');
//             },
//             className: 'custom-confirm'
//         });
//     };

//     const handleSave = () => {

//         if (user.codRol === 2) {
//             showSaveConfirm();
//         } else {
//             handleSubmitNota();
//         }
//     };


//     const handleBack = () => {
//         navigate('/home')
//     };

//     return (
//         <div className="container-fluid">
//             <h4>Agregar Nota de Evolución</h4>
//             <form onSubmit={(e) => e.preventDefault()} className='mt-4'>
//                 <div className="row g-3">
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Fecha*</label>
//                         <input
//                             type="date"
//                             className="form-control"
//                             name="fecha"
//                             onChange={handleChange}
//                             value={formData.fecha}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Hora*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="hora"
//                             onChange={handleChange}
//                             value={formData.hora}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="primerNombre" className="form-label">Numero Expediente*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="numExpediente"
//                             onChange={handleChange}
//                             value={formData.numExpediente}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Codigo MINSA*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="codDoctor"
//                             onChange={handleChange}
//                             value={formData.codDoctor}
//                             readOnly
//                         />
//                     </div>

//                     <div className="col-sm-3">
//                         <label htmlFor="primerApellido" className="form-label">Talla*</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="talla"
//                             onChange={handleChange}
//                             value={formData.talla}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Peso*</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="peso"
//                             onChange={handleChange}
//                             value={formData.peso}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Temperatura*</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="temperatura"
//                             onChange={handleChange}
//                             value={formData.temperatura}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Presion*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="presion"
//                             onChange={handleChange}
//                             value={formData.presion}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">No. Nota</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="numeroNota"
//                             onChange={handleChange}
//                             value={formData.numeroNota}
//                         />
//                     </div>

//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Frecuencia Cardiaca</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="frecCardiaca"
//                             value={formData.frecCardiaca}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Frecuencia Respiratoria</label>
//                         <input
//                             type="number"
//                             min="1"
//                             className="form-control"
//                             name="frecResp"
//                             value={formData.frecResp}
//                             onChange={handleChange}
//                         />
//                     </div>

//                     <div className="col-sm-12">
//                         <label htmlFor="notaEvolucion" className="form-label">Nota de Evolución</label>
//                         <textarea
//                             className="form-control"
//                             rows="10"
//                             id="notaEvolucion1"
//                             name='notaEvolucion1'
//                             value={formData.notaEvolucion1}
//                             onChange={handleChange}
//                         >
//                         </textarea>
//                     </div>
//                     <div className="col-sm-12">
//                         <label htmlFor="planes" className="form-label">Planes</label>
//                         <textarea
//                             className="form-control"
//                             rows="5"
//                             id="planes"
//                             name='planes'
//                             value={formData.planes}
//                             onChange={handleChange}
//                         >
//                         </textarea>
//                     </div>

//                 </div>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
//                     <button className="btn btn-primary btn-save me-md-2" onClick={handleSave} type="submit">Guardar</button>
//                     <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     );
// };
