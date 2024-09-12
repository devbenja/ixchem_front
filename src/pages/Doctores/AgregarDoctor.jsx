import { useState } from "react";
import { notification } from 'antd';
import axios from 'axios';
import { baseURL } from "../../api/apiURL";
import { useNavigate } from "react-router-dom";

export const AgregarDoctor = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codDoctor: '',
        primerNombred: '',
        segundoNombre: '',
        primerApellidod: '',
        segundoApellido: '',
        cedula: '',
        clinica: '',  // Cambiado a select de combobox
        estado: true
    });

    const [errors, setErrors] = useState({});

    const handleCedulaValidation = (valor) => {
        valor = valor.replace(/[^0-9A-Za-z]/g, ""); // Eliminar caracteres que no sean números o letras
        if (valor.length > 3) valor = valor.slice(0, 3) + "-" + valor.slice(3);
        if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
        if (valor.length > 15) {
            let letra = valor.slice(15, 16).toUpperCase(); // Convertir la letra a mayúscula
            if (/[^A-Z]/.test(letra)) { // Verificar si es una letra del abecedario
                letra = ""; // Si no es válida, eliminarla
            }
            valor = valor.slice(0, 15) + letra;
        }
        if (valor.length > 16) valor = valor.slice(0, 16); // Limitar a 16 caracteres
        return valor;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        let newValue = value;
        if (name === "cedula") {
            newValue = handleCedulaValidation(value); // Validar la cédula
        }

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : newValue
        });
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: undefined
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.codDoctor.trim()) {
            newErrors.codDoctor = "El código MINSA es obligatorio";
        }
        if (!formData.primerNombred.trim()) {
            newErrors.primerNombred = "El primer nombre es obligatorio";
        }
        if (!formData.primerApellidod.trim()) {
            newErrors.primerApellidod = "El primer apellido es obligatorio";
        }
        if (!formData.cedula.trim()) {
            newErrors.cedula = "La cédula es obligatoria";
        }
        if (!formData.clinica.trim()) {
            newErrors.clinica = "La clínica es obligatoria";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmitCreateDoctor = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            notification.error({
                message: '¡Error!',
                description: 'Por favor complete todos los campos obligatorios.',
                duration: 3
            });
            return;
        }

        try {
            await axios.post(`${baseURL}/bdtdoctor/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Doctor ${formData.primerNombred} agregado con éxito`,
                duration: 3
            });

            setFormData({
                codDoctor: '',
                primerNombred: '',
                segundoNombre: '',
                primerApellidod: '',
                segundoApellido: '',
                cedula: '',
                clinica: '',
                estado: true
            });

        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: `${error.response.data.message}`,
                duration: 3
            });
        }
    };

    const handleBack = () => {
        navigate('/home');
    };

    return (
        <div className="container-fluid">
            <h4>Agregar Doctor</h4>
            <form onSubmit={handleSubmitCreateDoctor} className='mt-4'>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="primerNombre" className="form-label">Primer Nombre<span style={{color: 'red'}}> * </span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.primerNombred ? 'is-invalid' : ''}`}
                            name="primerNombred"
                            onChange={handleChange}
                            value={formData.primerNombred}
                        />
                        {errors.primerNombred && <div className="invalid-feedback">{errors.primerNombred}</div>}
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="segundoNombre"
                            onChange={handleChange}
                            value={formData.segundoNombre}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="primerApellido" className="form-label">Primer Apellido<span style={{color: 'red'}}> * </span></label>
                        <input
                            type="text"
                            className={`form-control ${errors.primerApellidod ? 'is-invalid' : ''}`}
                            name="primerApellidod"
                            onChange={handleChange}
                            value={formData.primerApellidod}
                        />
                        {errors.primerApellidod && <div className="invalid-feedback">{errors.primerApellidod}</div>}
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            name="segundoApellido"
                            onChange={handleChange}
                            value={formData.segundoApellido}
                        />
                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="codDoctor" className="form-label">Codigo MINSA<span style={{color: 'red'}}> * </span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.codDoctor ? 'is-invalid' : ''}`}
                                name="codDoctor"
                                onChange={handleChange}
                                value={formData.codDoctor}
                            />
                            {errors.codDoctor && <div className="invalid-feedback">{errors.codDoctor}</div>}
                        </div>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="cedula" className="form-label">Cedula<span style={{color: 'red'}}> * </span></label>
                            <input
                                type="text"
                                className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
                                name="cedula"
                                onChange={handleChange}
                                value={formData.cedula}
                            />
                            {errors.cedula && <div className="invalid-feedback">{errors.cedula}</div>}
                        </div>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="clinica" className="form-label">Clínica<span style={{color: 'red'}}> * </span></label>
                            <select
                                className={`form-select ${errors.clinica ? 'is-invalid' : ''}`}
                                name="clinica"
                                onChange={handleChange}
                                value={formData.clinica}
                            >
                                <option value="">Menú de selección</option>
                                <option value="Managua">Managua</option>
                                <option value="Ciudad Sandino">Ciudad Sandino</option>
                                <option value="Villa Libertad">Villa Libertad</option>
                                <option value="Tipitapa">Tipitapa</option>
                                <option value="Masaya">Masaya</option>
                                <option value="Granada">Granada</option>
                                <option value="Matagalpa">Matagalpa</option>
                                <option value="Estelí">Estelí</option>
                                <option value="León">León</option>
                            </select>
                            {errors.clinica && <div className="invalid-feedback">{errors.clinica}</div>}
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                    <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                    <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

//Ultima actualización del codigo
// import { useState } from "react";
// import { notification } from 'antd';
// import axios from 'axios';
// import { baseURL } from "../../api/apiURL";
// import { useNavigate } from "react-router-dom";

// export const AgregarDoctor = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codDoctor: '',
//         primerNombred: '',
//         segundoNombre: '',
//         primerApellidod: '',
//         segundoApellido: '',
//         cedula: '',
//         clinica: '',  // Cambiado a select de combobox
//         estado: true
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: undefined
//         }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.codDoctor.trim()) {
//             newErrors.codDoctor = "El código MINSA es obligatorio";
//         }
//         if (!formData.primerNombred.trim()) {
//             newErrors.primerNombred = "El primer nombre es obligatorio";
//         }
//         if (!formData.primerApellidod.trim()) {
//             newErrors.primerApellidod = "El primer apellido es obligatorio";
//         }
//         if (!formData.cedula.trim()) {
//             newErrors.cedula = "La cédula es obligatoria";
//         }
//         if (!formData.clinica.trim()) {
//             newErrors.clinica = "La clínica es obligatoria";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmitCreateDoctor = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Por favor complete todos los campos obligatorios.',
//                 duration: 3
//             });
//             return;
//         }

//         try {
//             await axios.post(`${baseURL}/bdtdoctor/post`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Doctor ${formData.primerNombred} agregado con éxito`,
//                 duration: 3
//             });

//             setFormData({
//                 codDoctor: '',
//                 primerNombred: '',
//                 segundoNombre: '',
//                 primerApellidod: '',
//                 segundoApellido: '',
//                 cedula: '',
//                 clinica: '',
//                 estado: true
//             });

//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });
//         }
//     };

//     const handleBack = () => {
//         navigate('/home')
//     }

//     return (
//         <div className="container-fluid">
//             <h4>Agregar Doctor</h4>
//             <form onSubmit={handleSubmitCreateDoctor} className='mt-4'>
//                 <div className="row g-3">
//                     <div className="col-sm-3">
//                         <label htmlFor="primerNombre" className="form-label">Primer Nombre<span style={{color: 'red'}}> * </span></label>
//                         <input
//                             type="text"
//                             className={`form-control ${errors.primerNombred ? 'is-invalid' : ''}`}
//                             name="primerNombred"
//                             onChange={handleChange}
//                             value={formData.primerNombred}
//                         />
//                         {errors.primerNombred && <div className="invalid-feedback">{errors.primerNombred}</div>}
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoNombre"
//                             onChange={handleChange}
//                             value={formData.segundoNombre}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="primerApellido" className="form-label">Primer Apellido<span style={{color: 'red'}}> * </span></label>
//                         <input
//                             type="text"
//                             className={`form-control ${errors.primerApellidod ? 'is-invalid' : ''}`}
//                             name="primerApellidod"
//                             onChange={handleChange}
//                             value={formData.primerApellidod}
//                         />
//                         {errors.primerApellidod && <div className="invalid-feedback">{errors.primerApellidod}</div>}
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoApellido"
//                             onChange={handleChange}
//                             value={formData.segundoApellido}
//                         />
//                     </div>
//                     <div className='d-flex justify-content-between flex-wrap'>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="codDoctor" className="form-label">Codigo MINSA<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.codDoctor ? 'is-invalid' : ''}`}
//                                 name="codDoctor"
//                                 onChange={handleChange}
//                                 value={formData.codDoctor}
//                             />
//                             {errors.codDoctor && <div className="invalid-feedback">{errors.codDoctor}</div>}
//                         </div>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="cedula" className="form-label">Cedula<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
//                                 name="cedula"
//                                 onChange={handleChange}
//                                 value={formData.cedula}
//                             />
//                             {errors.cedula && <div className="invalid-feedback">{errors.cedula}</div>}
//                         </div>
//                         <div className="col-sm-2 col-12 mt-3">
//                             {/* Reemplazo del input por un combobox */}
//                             <label htmlFor="clinica" className="form-label">Clínica<span style={{color: 'red'}}> * </span></label>
//                             <select
//                                 className={`form-select ${errors.clinica ? 'is-invalid' : ''}`}
//                                 name="clinica"
//                                 onChange={handleChange}
//                                 value={formData.clinica}
//                             >
//                                 <option value="">Menú de selección</option>
//                                 <option value="Managua">Managua</option>
//                                 <option value="Ciudad Sandino">Ciudad Sandino</option>
//                                 <option value="Villa Libertad">Villa Libertad</option>
//                                 <option value="Tipitapa">Tipitapa</option>
//                                 <option value="Masaya">Masaya</option>
//                                 <option value="Granada">Granada</option>
//                                 <option value="Matagalpa">Matagalpa</option>
//                                 <option value="Estelí">Estelí</option>
//                                 <option value="León">León</option>
//                             </select>
//                             {errors.clinica && <div className="invalid-feedback">{errors.clinica}</div>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
//                     <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
//                     <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// import { useState } from "react";
// import { notification } from 'antd';
// import axios from 'axios';
// import { baseURL } from "../../api/apiURL";
// import { useNavigate } from "react-router-dom";

// export const AgregarDoctor = () => {

//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codDoctor: '',
//         primerNombred: '',
//         segundoNombre: '',
//         primerApellidod: '',
//         segundoApellido: '',
//         cedula: '',
//         clinica: '',
//         estado: true
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//         setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: undefined
//         }));
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         if (!formData.codDoctor.trim()) {
//             newErrors.codDoctor = "El código MINSA es obligatorio";
//         }
//         if (!formData.primerNombred.trim()) {
//             newErrors.primerNombred = "El primer nombre es obligatorio";
//         }
//         if (!formData.primerApellidod.trim()) {
//             newErrors.primerApellidod = "El primer apellido es obligatorio";
//         }
//         if (!formData.cedula.trim()) {
//             newErrors.cedula = "La cédula es obligatoria";
//         }
//         if (!formData.clinica.trim()) {
//             newErrors.clinica = "La clínica es obligatoria";
//         }
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmitCreateDoctor = async (e) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Por favor complete todos los campos obligatorios.',
//                 duration: 3
//             });
//             return;
//         }

//         try {
//             await axios.post(`${baseURL}/bdtdoctor/post`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Doctor ${formData.primerNombred} agregado con éxito`,
//                 duration: 3
//             });

//             setFormData({
//                 codDoctor: '',
//                 primerNombred: '',
//                 segundoNombre: '',
//                 primerApellidod: '',
//                 segundoApellido: '',
//                 cedula: '',
//                 clinica: ''
//             });

//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 //description: error.response?.data?.message || 'Ocurrió un error inesperado',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });
//         }
//     };

//     const handleBack = () => {
//         navigate('/home')
//     }

//     return (
//         <div className="container-fluid">
//             <h4>Agregar Doctor</h4>
//             <form onSubmit={handleSubmitCreateDoctor} className='mt-4'>
//                 <div className="row g-3">
//                     <div className="col-sm-3">
//                         <label htmlFor="primerNombre" className="form-label">Primer Nombre<span style={{color: 'red'}}> * </span></label>
//                         <input
//                             type="text"
//                             className={`form-control ${errors.primerNombred ? 'is-invalid' : ''}`}
//                             name="primerNombred"
//                             onChange={handleChange}
//                             value={formData.primerNombred}
//                         />
//                         {errors.primerNombred && <div className="invalid-feedback">{errors.primerNombred}</div>}
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoNombre"
//                             onChange={handleChange}
//                             value={formData.segundoNombre}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="primerApellido" className="form-label">Primer Apellido<span style={{color: 'red'}}> * </span></label>
//                         <input
//                             type="text"
//                             className={`form-control ${errors.primerApellidod ? 'is-invalid' : ''}`}
//                             name="primerApellidod"
//                             onChange={handleChange}
//                             value={formData.primerApellidod}
//                         />
//                         {errors.primerApellidod && <div className="invalid-feedback">{errors.primerApellidod}</div>}
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoApellido"
//                             onChange={handleChange}
//                             value={formData.segundoApellido}
//                         />
//                     </div>
//                     <div className='d-flex justify-content-between flex-wrap'>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="codDoctor" className="form-label">Codigo MINSA<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.codDoctor ? 'is-invalid' : ''}`}
//                                 name="codDoctor"
//                                 onChange={handleChange}
//                                 value={formData.codDoctor}
//                             />
//                             {errors.codDoctor && <div className="invalid-feedback">{errors.codDoctor}</div>}
//                         </div>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="cedula" className="form-label">Cedula<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.cedula ? 'is-invalid' : ''}`}
//                                 name="cedula"
//                                 onChange={handleChange}
//                                 value={formData.cedula}
//                             />
//                             {errors.cedula && <div className="invalid-feedback">{errors.cedula}</div>}
//                         </div>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="clinica" className="form-label">Clinica<span style={{color: 'red'}}> * </span></label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.clinica ? 'is-invalid' : ''}`}
//                                 name="clinica"
//                                 onChange={handleChange}
//                                 value={formData.clinica}
//                             />
//                             {errors.clinica && <div className="invalid-feedback">{errors.clinica}</div>}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
//                     <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
//                     <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     );
// };