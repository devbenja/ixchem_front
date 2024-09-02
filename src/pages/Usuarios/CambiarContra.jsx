import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";

import { baseURL } from "../../api/apiURL";
import { useAuth } from "../../context/AuthContext";

export const CambiarContra = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        codAdmin: 0,
        contraseñaActual: "",
        nuevaContraseña: "",
        confirmarContraseña: ""
    });

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

    //Validación para los caracteres que deben tener las contraseñas ojito
    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 6;

        let errorMessage = '';

        if (!hasUpperCase) {
            errorMessage += 'La contraseña debe contener al menos una letra mayúscula. ';
        }
        if (!hasNumbers) {
            errorMessage += 'La contraseña debe contener al menos tres números. ';
        }
        if (!hasSpecialChar) {
            errorMessage += 'La contraseña debe contener al menos un símbolo especial. Por ejemplo: ! # $ & -';
        }
        if (!isValidLength) {
            errorMessage += 'La contraseña debe tener al menos 6 caracteres. ';
        }

        return errorMessage;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const errorMessage = validatePassword(formData.nuevaContraseña);

        //Ojito esta es la validación de la contraseña, es un aviso, no un error por eso el .info
        if (errorMessage) {
            notification.info({
                message: '¡Atención!',
                description: errorMessage,
                duration: 5
            });
            return;
        }

        //Validación en caso que el usuario se equivoque en las contraseñas 
        if (formData.nuevaContraseña !== formData.confirmarContraseña) {
            notification.error({
                message: '¡Error!',
                description: 'Las nuevas contraseñas no coinciden',
                duration: 3
            });
            return;
        }

        try {
            console.log(formData);

            await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: 'Contraseña actualizada correctamente',
                duration: 3
            });

            // Limpiar los campos después de una actualización exitosa
            setFormData({
                codAdmin: user.codAdmin,
                contraseñaActual: "",
                nuevaContraseña: "",
                confirmarContraseña: ""
            });
        
        //Validación en caso que la contraseña actual sea erronea 
        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: 'Contraseña actual incorrecta',
                duration: 3
            });
        }
    };

    return (
        <div className="container-fluid">
            <h4>Cambiar Contraseña</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Contraseña Actual</label>
                        <input type="text" name="contraseñaActual" value={formData.contraseñaActual} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Contraseña Nueva</label>
                        <input type="password" name="nuevaContraseña" value={formData.nuevaContraseña} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Confirmar Contraseña Nueva</label>
                        <input type="password" name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} className="form-control" />
                    </div>
                </div>
                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="reset" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
}



// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification } from "antd";

// import { baseURL } from "../../api/apiURL";
// import { useAuth } from "../../context/AuthContext";

// export const CambiarContra = () => {

//     const { user } = useAuth();

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

//     const handleSubmit = async (event) => {

//         event.preventDefault();

//         if (formData.nuevaContraseña !== formData.confirmarContraseña) {
//             notification.error({
//                 message: '¡Error!',
//                 description: 'Las nuevas contraseñas no coinciden',
//                 duration: 3
//             });
//             return;
//         }

//         try {

//             console.log(formData)

//             await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: 'Contraseña actualizada correctamente',
//                 duration: 3
//             });

//             // Limpiar los campos después de una actualización exitosa
//             setFormData({
//                 codAdmin: user.codAdmin,
//                 contraseñaActual: "",
//                 nuevaContraseña: "",
//                 confirmarContraseña: ""
//             });

//         } catch (error) {

//             notification.error({
//                 message: '¡Error!',
//                 description: 'Contraseña actual incorrecta',
//                 duration: 3
//             });

//         }
//     };

//     return (
//         <div className="container-fluid">
//             <h4>Cambiar Contraseña</h4>
//             <form className='mt-4' onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <label className="form-label">Contraseña Actual</label>
//                         <input type="text" name="contraseñaActual" value={formData.contraseñaActual} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Contraseña Nueva</label>
//                         <input type="password" name="nuevaContraseña" value={formData.nuevaContraseña} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Confirmar Contraseña Nueva</label>
//                         <input type="password" name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} className="form-control" />
//                     </div>
//                 </div>
//                 <div className='mt-4 d-flex gap-2'>
//                     <button type="submit" className="btn btn-primary">Guardar</button>
//                     <button type="reset" className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     )
// }


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification } from "antd";

// import { baseURL } from "../../api/apiURL";
// import { useAuth } from "../../context/AuthContext";

// export const CambiarContra = () => {

//     const { user } = useAuth();

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

//     const handleSubmit = async (event) => {

//         event.preventDefault();

//         try {

//             console.log(formData)

//             await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Contraseña Cambiada correctamente`,
//                 duration: 3
//             });

//         } catch (error) {

//             notification.error({
//                 message: '¡Error!',
//                 description: error,
//                 duration: 3
//             });

//         }
//     }
//     return (
//         <div className="container-fluid">
//             <h4>Cambiar Contraseña</h4>
//             <form className='mt-4' onSubmit={handleSubmit}>
//                 <div className="row mb-3">
//                     <div className="col">
//                         <label className="form-label">Contraseña Actual</label>
//                         <input type="text" name="contraseñaActual" value={formData.contraseñaActual} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Contraseña Nueva</label>
//                         <input type="password" name="nuevaContraseña" value={formData.nuevaContraseña} onChange={handleChange} className="form-control" />
//                     </div>
//                     <div className="col">
//                         <label className="form-label">Confirmar Contraseña Nueva</label>
//                         <input type="password" name="confirmarContraseña" value={formData.confirmarContraseña} onChange={handleChange} className="form-control" />
//                     </div>
//                 </div>
//                 <div className='mt-4 d-flex gap-2'>
//                     <button type="submit" className="btn btn-primary">Guardar</button>
//                     <button type="reset" className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
