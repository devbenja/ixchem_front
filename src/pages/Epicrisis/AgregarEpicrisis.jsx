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

    const [errors, setErrors] = useState({});

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

    //Primer codigo zzz
    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
        
    //     setFormData({
    //         ...formData,
    //         [name]: type === 'checkbox' ? checked : value
    //     });
    //     setErrors((prevErrors) => ({
    //         ...prevErrors,
    //         [name]: undefined
    //     }));
    // };

    //Posible uso de codigo en caso que el otro falle
    // const handleChange = (e) => {
    //     const { name, value } = e.target;

    //     // Si estamos en el campo de hora
    //     if (name === 'hora') {
    //         let formattedValue = value.replace(/\D/g, ''); // Eliminar todo excepto números osea horas y minutos
    //         if (formattedValue.length >= 3) {
    //             formattedValue = `${formattedValue.slice(0, 2)}:${formattedValue.slice(2, 4)}`;
    //         }

    //         // Validar que la hora no sea mayor a 23 y los minutos no excedan 59
    //         const [hours, minutes] = formattedValue.split(':');
    //         if (hours > 23 || minutes > 59) {
    //             setErrors(prevErrors => ({
    //                 ...prevErrors,
    //                 hora: "Ingrese una hora válida (HH:mm)"
    //             }));
    //         } else {
    //             setErrors(prevErrors => ({
    //                 ...prevErrors,
    //                 hora: undefined
    //             }));
    //         }

    //         setFormData(prevData => ({
    //             ...prevData,
    //             [name]: formattedValue
    //         }));

    //     } else {
    //         setFormData({
    //             ...formData,
    //             [name]: value
    //         });
    //         setErrors(prevErrors => ({
    //             ...prevErrors,
    //             [name]: undefined
    //         }));
    //     }
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
    
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
            setFormData({
                ...formData,
                [name]: value
            });
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: undefined
            }));
        }
    };    

    const validateForm = () => {
        const newErrors = {};
        if (!formData.numExpediente.trim()) {
            newErrors.numExpediente = "El número de expediente es obligatorio";
        }
        if (!formData.fecha.trim()) {
            newErrors.fecha = "La fecha es obligatoria";
        }
        if (!formData.hora.trim()) {
            newErrors.hora = "La hora es obligatoria";
        }
        if (!formData.fechaIngreso.trim()) {
            newErrors.fechaIngreso = "La fecha de ingreso es obligatoria";
        }
        if (!formData.fechaEgreso.trim()) {
            newErrors.fechaEgreso = "La fecha de egreso es obligatoria";
        }
        if (!formData.diagIngreso.trim()) {
            newErrors.diagIngreso = "El diagnostico de ingreso es obligatorio";
        }
        if (!formData.diagEgreso.trim()) {
            newErrors.diagEgreso = "El diagnostico de egreso es obligatorio";
        }
        if (!formData.resultado.trim()) {
            newErrors.resultado = "El resultado es obligatorio";
        }
        if (!formData.tratamiento.trim()) {
            newErrors.tratamiento = "El tratamiento es obligatorio";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            notification.error({
                message: '¡Error!',
                description: 'Por favor complete todos los campos obligatorios.',
                duration: 3
            });
            return;
        }

        try {
            console.log(formData);
            await axios.post(`${baseURL}/bdtbepicrisis/post`, formData);
            notification.success({
                message: '¡Éxito!',
                description: `Epicrisis Creada con Éxito`,
                duration: 3
            });
            // Limpiar los campos del formulario después de guardar exitosamente
            setFormData({
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
            });

        } catch (error) {
            notification.error({
                message: '¡Error!',
                //description: 'Error al crear la epicrisis.',
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
                handleSubmit();
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
            handleSubmit();
        }
    };

    const handleBack = () => {
        //navigate('/home')
        setFormData({
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
        });
    };

    return (
        <div className="container-fluid">
            <h4>Agregar Epicrisis</h4>
            <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Número de expediente<span style={{ color: 'red' }}> * </span></label>
                        <input 
                            type="text" 
                            name="numExpediente" 
                            value={formData.numExpediente} 
                            onChange={handleChange} 
                            className={`form-control ${errors.numExpediente ? 'is-invalid' : ''}`} 
                        />
                        {errors.numExpediente && <div className="invalid-feedback">{errors.numExpediente}</div>}
                    </div>
                    <div className="col">
                        <label className="form-label">Código MINSA</label>
                        <input 
                            type="text" 
                            name="codDoctor" 
                            value={formData.codDoctor}
                            onChange={handleChange} 
                            className="form-control" 
                            readOnly
                        />
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha</label>
                        <input 
                            type="date" 
                            name="fecha" 
                            value={formData.fecha} 
                            onChange={handleChange} 
                            //className="form-control" 
                            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
                        />
                        {errors.fecha && <div className="invalid-feedback">{errors.fecha}</div>}
                    </div>
                </div>

                <div className="row mb-3">
                    {/* <div className="col sm-mt-3">
                        <label className="form-label">Hora<span style={{ color: 'red' }}> * </span></label>
                        <input 
                            type="text" 
                            name="hora" 
                            value={formData.hora} 
                            onChange={handleChange} 
                            //className="form-control" 
                            className={`form-control ${errors.hora ? 'is-invalid' : ''}`}
                        />
                        {errors.hora && <div className="invalid-feedback">{errors.hora}</div>}
                    </div> */}

                    <div className="col sm-mt-3">
                        <label className="form-label">Hora<span style={{ color: 'red' }}> * </span></label>
                        <input 
                            type="text" 
                            name="hora" 
                            value={formData.hora} 
                            onChange={handleChange} 
                            className={`form-control ${errors.hora ? 'is-invalid' : ''}`}
                        />
                        {errors.hora && <div className="invalid-feedback">{errors.hora}</div>}
                    </div>

                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Ingreso<span style={{ color: 'red' }}> * </span></label>
                        <input 
                            type="date" 
                            name="fechaIngreso" 
                            value={formData.fechaIngreso} 
                            onChange={handleChange} 
                            className={`form-control ${errors.fechaIngreso ? 'is-invalid' : ''}`} 
                        />
                        {errors.fechaIngreso && <div className="invalid-feedback">{errors.fechaIngreso}</div>}
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Egreso<span style={{ color: 'red' }}> * </span></label>
                        <input 
                            type="date" 
                            name="fechaEgreso" 
                            value={formData.fechaEgreso} 
                            onChange={handleChange} 
                            className={`form-control ${errors.fechaEgreso ? 'is-invalid' : ''}`} 
                        />
                        {errors.fechaEgreso && <div className="invalid-feedback">{errors.fechaEgreso}</div>}
                    </div>
                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnóstico Ingreso<span style={{ color: 'red' }}> * </span></label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="diagIngreso" 
                        value={formData.diagIngreso} 
                        onChange={handleChange} 
                        //className="form-control" 
                        className={`form-control ${errors.diagIngreso ? 'is-invalid' : ''}`} 
                    />
                    {errors.diagIngreso && <div className="invalid-feedback">{errors.diagIngreso}</div>}
                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnóstico Egreso<span style={{ color: 'red' }}> * </span></label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="diagEgreso" 
                        value={formData.diagEgreso} 
                        onChange={handleChange} 
                        //className="form-control" 
                        className={`form-control ${errors.diagEgreso ? 'is-invalid' : ''}`} 
                    />
                    {errors.diagEgreso && <div className="invalid-feedback">{errors.diagEgreso}</div>}
                </div>

                <div className="col mt-3">
                    <label className="form-label">Resultado<span style={{ color: 'red' }}> * </span></label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="resultado" 
                        value={formData.resultado} 
                        onChange={handleChange} 
                        //className="form-control" 
                        className={`form-control ${errors.resultado ? 'is-invalid' : ''}`} 
                    />
                    {errors.resultado && <div className="invalid-feedback">{errors.resultado}</div>}
                </div>

                <div className="col mt-3">
                    <label className="form-label">Tratamiento<span style={{ color: 'red' }}> * </span></label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="tratamiento" 
                        value={formData.tratamiento} 
                        onChange={handleChange} 
                        //className="form-control" 
                        className={`form-control ${errors.tratamiento ? 'is-invalid' : ''}`} 
                    />
                        {errors.tratamiento && <div className="invalid-feedback">{errors.tratamiento}</div>}
                </div>

                <div className="col mt-3">
                    <label className="form-label">Descartes</label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="descartes" 
                        value={formData.descartes} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Complicaciones</label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="complicaciones" 
                        value={formData.complicaciones} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Recomendaciones</label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="recomendaciones" 
                        value={formData.recomendaciones} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Datos Relevantes</label>
                    <textarea 
                        rows="3" 
                        type="text" 
                        name="datosRelevantes" 
                        value={formData.datosRelevantes} 
                        onChange={handleChange} 
                        className="form-control" 
                    />
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button onClick={handleSave} type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification } from "antd";
// import { baseURL } from '../../api/apiURL.js';

// import { Modal } from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';

// import { useAuth } from "../../context/AuthContext.jsx";
// import { useNavigate } from "react-router-dom";

// export const AgregarEpicrisis = () => {

//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codEpicrisis: 0,
//         fecha: "",
//         hora: "",
//         fechaIngreso: "",
//         fechaEgreso: "",
//         diagIngreso: "",
//         diagEgreso: "",
//         resultado: "",
//         tratamiento: "",
//         descartes: "",
//         complicaciones: "",
//         recomendaciones: "",
//         datosRelevantes: "",
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

//     const [doctors, setDoctors] = useState([]);

//     useEffect(() => {
//         const fetchDoctors = async () => {
//             try {
//                 const response = await axios.get(`${baseURL}/bdtdoctor/listar`);
//                 setDoctors(response.data);
//             } catch (error) {
//                 console.error("Error fetching doctors: ", error);
//                 notification.error({
//                     message: '¡Error!',
//                     description: 'Error al cargar la lista de doctores',
//                     duration: 3
//                 });
//             }
//         };

//         fetchDoctors();

//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async () => {

//         try {

//             console.log(formData);

//             await axios.post(`${baseURL}/bdtbepicrisis/post`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Epicrisis Creada con Exito`,
//                 duration: 3
//             });

//         } catch (error) {

//             notification.error({
//                 message: '¡Error!',
//                 description: error,
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
//                 handleSubmit();
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
//             handleSubmit();
//         }
//     };

//     const handleBack = () => {
//         navigate('/home')
//     };

//     return (
//         <div className="container-fluid">
//             <h4>Agregar Epicrisis</h4>
//             <form className='mt-4' onSubmit={(e) => e.preventDefault()}>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <label className="form-label">Número de expediente<span style={{color: 'red'}}> * </span></label>
//                         <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Codigo MINSA</label>
//                         <input 
//                             type="text" 
//                             name="codDoctor" 
//                             value={formData.codDoctor}
//                             onChange={handleChange} 
//                             className="form-control" 
//                             readOnly
//                         />
//                     </div>
//                     {/* <div className="col sm-mt-3">
//                         <label htmlFor="codDoctor" className="form-label">Codigo Doctor*</label>
//                         <select
//                             className="form-control"
//                             name="codDoctor"
//                             onChange={handleChange}
//                             value={formData.codDoctor}
//                         >
//                             <option value="">Seleccione un Doctor</option>
//                             {doctors.map(doctor => (
//                                 <option key={doctor.codDoctor} value={doctor.codDoctor}>
//                                     {doctor.primerNombred} {doctor.primerApellidod}
//                                 </option>
//                             ))}
//                         </select>
//                     </div> */}
//                     <div className="col sm-mt-3">
//                         <label className="form-label">Fecha</label>
//                         <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
//                     </div>

//                 </div>

//                 <div className="row mb-3">

//                     <div className="col sm-mt-3">
//                         <label className="form-label">Hora</label>
//                         <input type="text" name="hora" value={formData.hora} onChange={handleChange} className="form-control" />
//                     </div>

//                     <div className="col sm-mt-3">
//                         <label className="form-label">Fecha Ingreso<span style={{color: 'red'}}> * </span></label>
//                         <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col sm-mt-3">
//                         <label className="form-label">Fecha Egreso<span style={{color: 'red'}}> * </span></label>
//                         <input type="date" name="fechaEgreso" value={formData.fechaEgreso} onChange={handleChange} className="form-control" />
//                     </div>

//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Diagnostico Ingreso</label>
//                     <textarea rows="3" type="text" name="diagIngreso" value={formData.diagIngreso} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Diagnostico Egreso</label>
//                     <textarea rows="3" type="text" name="diagEgreso" value={formData.diagEgreso} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Resultado</label>
//                     <textarea rows="3" type="text" name="resultado" value={formData.resultado} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Tratamiento</label>
//                     <textarea rows="3" type="text" name="tratamiento" value={formData.tratamiento} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Descartes</label>
//                     <textarea rows="3" type="text" name="descartes" value={formData.descartes} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Complicaciones</label>
//                     <textarea rows="3" type="text" name="complicaciones" value={formData.complicaciones} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Recomendaciones</label>
//                     <textarea rows="3" type="text" name="recomendaciones" value={formData.recomendaciones} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className="col mt-3">
//                     <label className="form-label">Datos Relevantes</label>
//                     <textarea rows="3" type="text" name="datosRelevantes" value={formData.datosRelevantes} onChange={handleChange} className="form-control" />
//                 </div>

//                 <div className='mt-4 d-flex gap-2'>
//                     <button onClick={handleSave} type="submit" className="btn btn-primary">Guardar</button>
//                     <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
