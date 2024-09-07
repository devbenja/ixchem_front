import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/apiURL";
import { useAuth } from "../../context/AuthContext";
import { EyeOutlined, EyeInvisibleOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'; // Nuevos íconos

export const CambiarContra = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codAdmin: 0,
        contraseñaActual: "",
        nuevaContraseña: "",
        confirmarContraseña: ""
    });

    const [showPassword, setShowPassword] = useState({
        actual: false,
        nueva: false,
        confirmar: false,
    });

    const [showInstructions, setShowInstructions] = useState(true); // Estado para mostrar/ocultar las instrucciones

    useEffect(() => {
        if (user) {
            setFormData((prevData) => ({
                ...prevData,
                codAdmin: user.codAdmin
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword((prevState) => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 8;
        const isValidLengthPlus = password.length <= 16;

        let errorMessage = '';

        if (!hasUpperCase) {
            errorMessage += 'La contraseña debe contener al menos una letra mayúscula. ';
        }
        if (!hasNumbers) {
            errorMessage += 'La contraseña debe contener al menos tres números. ';
        }
        if (!hasSpecialChar) {
            errorMessage += 'La contraseña debe contener al menos un símbolo especial. Por ejemplo: !¡ # $ & - ¿? ';
        }
        if (!isValidLength) {
            errorMessage += 'La contraseña debe tener al menos 8 caracteres. ';
        }
        if (!isValidLengthPlus) {
            errorMessage += 'La contraseña debe tener menos 16 caracteres. ';
        }

        return errorMessage;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errorMessage = validatePassword(formData.nuevaContraseña);

        if (errorMessage) {
            notification.info({
                message: '¡Atención!',
                description: errorMessage,
                duration: 5
            });
            return;
        }

        if (formData.nuevaContraseña !== formData.confirmarContraseña) {
            notification.error({
                message: '¡Error!',
                description: 'Las nuevas contraseñas no coinciden',
                duration: 3
            });
            return;
        }

        if (formData.contraseñaActual === formData.confirmarContraseña) {
            notification.error({
                message: '¡Error!',
                description: 'La nueva contraseña no puede ser igual a la contraseña actual',
                duration: 3
            });
            return;
        }

        try {
            await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: 'Contraseña actualizada correctamente',
                duration: 3
            });

            notification.info({
                message: 'Información',
                description: 'Se cerrará sesión para reiniciar el sistema',
                duration: 5
            });

            setFormData({
                codAdmin: user.codAdmin,
                contraseñaActual: "",
                nuevaContraseña: "",
                confirmarContraseña: ""
            });

            setTimeout(() => {
                logout();
                navigate('/');
            }, 7000); 

        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: 'Contraseña actual incorrecta',
                duration: 3
            });
        }
    };

    const handleClearFields = () => {
        setFormData((prevData) => ({
            ...prevData,
            nuevaContraseña: "",
            confirmarContraseña: ""
        }));
    };

    const preventCopyPaste = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container-fluid">
            <h4>Cambiar Contraseña</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Contraseña Actual</label>
                        <div className="input-group">
                            <input 
                                type={showPassword.actual ? "text" : "password"} 
                                name="contraseñaActual" 
                                value={formData.contraseñaActual} 
                                onChange={handleChange} 
                                className="form-control" 
                            />
                            <span className="input-group-text" onClick={() => togglePasswordVisibility('actual')}>
                                {showPassword.actual ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Contraseña Nueva</label>
                        <div className="input-group">
                            <input 
                                type={showPassword.nueva ? "text" : "password"} 
                                name="nuevaContraseña" 
                                value={formData.nuevaContraseña} 
                                onChange={handleChange} 
                                className="form-control" 
                                onCopy={preventCopyPaste}
                                onPaste={preventCopyPaste}
                            />
                            <span className="input-group-text" onClick={() => togglePasswordVisibility('nueva')}>
                                {showPassword.nueva ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                        {/* Botón para minimizar/maximizar instrucciones */}
                        <button 
                            type="button" 
                            className="btn btn-outline-primary mt-2 d-flex align-items-center gap-2" 
                            onClick={toggleInstructions}
                            style={{ borderRadius: '20px' }} // Estilo adicional para un botón más redondeado
                        >
                            {showInstructions ? "Ocultar Requisitos" : "Mostrar Requisitos"}
                            {showInstructions ? <UpOutlined /> : <DownOutlined />}
                        </button>
                        {/* Cuadro de indicaciones sobre la contraseña */}
                        {showInstructions && (
                            <div className="alert alert-info mt-2">
                                La contraseña debe cumplir con los siguientes criterios:
                                <ul>
                                    <li>Al menos una letra mayúscula</li>
                                    <li>Al menos tres números</li>
                                    <li>Al menos un símbolo especial (por ejemplo: !¡ # $ & - ¿?)</li>
                                    <li>Mínimo 8 caracteres de longitud</li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="col">
                        <label className="form-label">Confirmar Contraseña Nueva</label>
                        <div className="input-group">
                            <input 
                                type={showPassword.confirmar ? "text" : "password"} 
                                name="confirmarContraseña" 
                                value={formData.confirmarContraseña} 
                                onChange={handleChange} 
                                className="form-control" 
                                onCopy={preventCopyPaste}
                                onPaste={preventCopyPaste}
                            />
                            <span className="input-group-text" onClick={() => togglePasswordVisibility('confirmar')}>
                                {showPassword.confirmar ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            </span>
                        </div>
                    </div>
                </div>
                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar Contraseña</button>
                    <button type="button" onClick={handleClearFields} className="btn btn-danger">Limpiar Campos</button>
                </div>
            </form>
        </div>
    );
};


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification } from "antd";
// import { useNavigate } from "react-router-dom";
// import { baseURL } from "../../api/apiURL";
// import { useAuth } from "../../context/AuthContext";
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'; 

// export const CambiarContra = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codAdmin: 0,
//         contraseñaActual: "",
//         nuevaContraseña: "",
//         confirmarContraseña: ""
//     });

//     const [showPassword, setShowPassword] = useState({
//         actual: false,
//         nueva: false,
//         confirmar: false,
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 codAdmin: user.codAdmin
//             }));
//         }
//     }, [user]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const togglePasswordVisibility = (field) => {
//         setShowPassword((prevState) => ({
//             ...prevState,
//             [field]: !prevState[field]
//         }));
//     };

//     const validatePassword = (password) => {
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
//         const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//         const isValidLength = password.length >= 8;

//         let errorMessage = '';

//         if (!hasUpperCase) {
//             errorMessage += 'La contraseña debe contener al menos una letra mayúscula. ';
//         }
//         if (!hasNumbers) {
//             errorMessage += 'La contraseña debe contener al menos tres números. ';
//         }
//         if (!hasSpecialChar) {
//             errorMessage += 'La contraseña debe contener al menos un símbolo especial. Por ejemplo: !¡ # $ & - ¿?';
//         }
//         if (!isValidLength) {
//             errorMessage += 'La contraseña debe tener al menos 8 caracteres. ';
//         }

//         return errorMessage;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const errorMessage = validatePassword(formData.nuevaContraseña);

//         if (errorMessage) {
//             notification.info({
//                 message: '¡Atención!',
//                 description: errorMessage,
//                 duration: 5
//             });
//             return;
//         }

//         if (formData.nuevaContraseña !== formData.confirmarContraseña) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Las nuevas contraseñas no coinciden',
//                 duration: 3
//             });
//             return;
//         }

//         try {
//             await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: 'Contraseña actualizada correctamente',
//                 duration: 3
//             });

//             notification.info({
//                 message: 'Información',
//                 description: 'Se cerrará sesión para reiniciar el sistema',
//                 duration: 5
//             });

//             setFormData({
//                 codAdmin: user.codAdmin,
//                 contraseñaActual: "",
//                 nuevaContraseña: "",
//                 confirmarContraseña: ""
//             });

//             setTimeout(() => {
//                 logout();
//                 navigate('/');
//             }, 7000); 

//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Contraseña actual incorrecta',
//                 duration: 3
//             });
//         }
//     };

//     const handleClearFields = () => {
//         setFormData((prevData) => ({
//             ...prevData,
//             nuevaContraseña: "",
//             confirmarContraseña: ""
//         }));
//     };

//     const preventCopyPaste = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <div className="container-fluid">
//             <h4>Cambiar Contraseña</h4>
//             <form className='mt-4' onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <label className="form-label">Contraseña Actual</label>
//                         <div className="input-group">
//                             <input 
//                                 type={showPassword.actual ? "text" : "password"} 
//                                 name="contraseñaActual" 
//                                 value={formData.contraseñaActual} 
//                                 onChange={handleChange} 
//                                 className="form-control" 
//                             />
//                             <span className="input-group-text" onClick={() => togglePasswordVisibility('actual')}>
//                                 {showPassword.actual ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//                             </span>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Contraseña Nueva</label>
//                         <div className="input-group">
//                             <input 
//                                 type={showPassword.nueva ? "text" : "password"} 
//                                 name="nuevaContraseña" 
//                                 value={formData.nuevaContraseña} 
//                                 onChange={handleChange} 
//                                 className="form-control" 
//                                 onCopy={preventCopyPaste}
//                                 onPaste={preventCopyPaste}
//                             />
//                             <span className="input-group-text" onClick={() => togglePasswordVisibility('nueva')}>
//                                 {showPassword.nueva ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//                             </span>
//                         </div>
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Confirmar Contraseña Nueva</label>
//                         <div className="input-group">
//                             <input 
//                                 type={showPassword.confirmar ? "text" : "password"} 
//                                 name="confirmarContraseña" 
//                                 value={formData.confirmarContraseña} 
//                                 onChange={handleChange} 
//                                 className="form-control" 
//                                 onCopy={preventCopyPaste}
//                                 onPaste={preventCopyPaste}
//                             />
//                             <span className="input-group-text" onClick={() => togglePasswordVisibility('confirmar')}>
//                                 {showPassword.confirmar ? <EyeInvisibleOutlined /> : <EyeOutlined />}
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className='mt-4 d-flex gap-2'>
//                     <button type="submit" className="btn btn-primary">Guardar Contraseña</button>
//                     <button type="button" onClick={handleClearFields} className="btn btn-danger">Limpiar Campos</button>
//                 </div>
//             </form>
//         </div>
//     );
// };

//Ultimo codigo
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification } from "antd";
// import { useNavigate } from "react-router-dom";

// import { baseURL } from "../../api/apiURL";
// import { useAuth } from "../../context/AuthContext";

// export const CambiarContra = () => {
//     const { user, logout } = useAuth();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codAdmin: 0,
//         contraseñaActual: "",
//         nuevaContraseña: "",
//         confirmarContraseña: ""
//     });

//     useEffect(() => {
//         if (user) {
//             setFormData((prevData) => ({
//                 ...prevData,
//                 codAdmin: user.codAdmin
//             }));
//         }
//     }, [user]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const validatePassword = (password) => {
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
//         const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//         const isValidLength = password.length >= 8;

//         let errorMessage = '';

//         if (!hasUpperCase) {
//             errorMessage += 'La contraseña debe contener al menos una letra mayúscula. ';
//         }
//         if (!hasNumbers) {
//             errorMessage += 'La contraseña debe contener al menos tres números. ';
//         }
//         if (!hasSpecialChar) {
//             errorMessage += 'La contraseña debe contener al menos un símbolo especial. Por ejemplo: !¡ # $ & - ¿?';
//         }
//         if (!isValidLength) {
//             errorMessage += 'La contraseña debe tener al menos 8 caracteres. ';
//         }

//         return errorMessage;
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const errorMessage = validatePassword(formData.nuevaContraseña);

//         if (errorMessage) {
//             notification.info({
//                 message: '¡Atención!',
//                 description: errorMessage,
//                 duration: 5
//             });
//             return;
//         }

//         if (formData.nuevaContraseña !== formData.confirmarContraseña) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Las nuevas contraseñas no coinciden',
//                 duration: 3
//             });
//             return;
//         }

//         try {
//             await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: 'Contraseña actualizada correctamente',
//                 duration: 3
//             });

//             notification.info({
//                 message: 'Información',
//                 description: 'Se cerrará sesión para reiniciar el sistema',
//                 duration: 5
//             });

//             // Limpiar los campos después de una actualización exitosa
//             setFormData({
//                 codAdmin: user.codAdmin,
//                 contraseñaActual: "",
//                 nuevaContraseña: "",
//                 confirmarContraseña: ""
//             });

//             // Esperar unos segundos antes de cerrar sesión
//             setTimeout(() => {
//                 logout();
//                 navigate('/');
//             }, 7000); // Esperar 7 segundos (7000 ms) antes de redirigir

//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Contraseña actual incorrecta',
//                 duration: 3
//             });
//         }
//     };

//     const handleClearFields = () => {
//         setFormData((prevData) => ({
//             ...prevData,
//             nuevaContraseña: "",
//             confirmarContraseña: ""
//         }));
//     };

//     const preventCopyPaste = (e) => {
//         e.preventDefault();
//     };

//     return (
//         <div className="container-fluid">
//             <h4>Cambiar Contraseña</h4>
//             <form className='mt-4' onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <label className="form-label">Contraseña Actual</label>
//                         <input 
//                         type="text" 
//                         name="contraseñaActual" 
//                         value={formData.contraseñaActual} 
//                         onChange={handleChange} 
//                         className="form-control" 
//                         />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Contraseña Nueva</label>
//                         <input 
//                             type="password" 
//                             name="nuevaContraseña" 
//                             value={formData.nuevaContraseña} 
//                             onChange={handleChange} 
//                             className="form-control" 
//                             onCopy={preventCopyPaste}
//                             onPaste={preventCopyPaste}
//                         />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Confirmar Contraseña Nueva</label>
//                         <input 
//                             type="password" 
//                             name="confirmarContraseña" 
//                             value={formData.confirmarContraseña} 
//                             onChange={handleChange} 
//                             className="form-control" 
//                             onCopy={preventCopyPaste}
//                             onPaste={preventCopyPaste}
//                         />
//                     </div>
//                 </div>
//                 <div className='mt-4 d-flex gap-2'>
//                     <button type="submit" className="btn btn-primary">Guardar Contraseña</button>
//                     <button type="button" onClick={handleClearFields} className="btn btn-danger">Limpiar Campos</button>
//                 </div>
//             </form>
//         </div>
//     );
// }