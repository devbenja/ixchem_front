import './Login.css';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaExclamationCircle, FaHospitalUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { notification, Modal } from 'antd';

const images = [
    "./logo.png",
    "./Logo-Anfam-Ixchen.png"
];

export const Login = () => {
    const [backgroundImage, setBackgroundImage] = useState(images[0]);
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let imageIndex = 0;
        const intervalId = setInterval(() => {
            imageIndex = (imageIndex + 1) % images.length;
            setBackgroundImage(images[imageIndex]);
        }, 8000);

        return () => clearInterval(intervalId);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleCentroChange = (event) => {
        const selectedCentro = event.target.value;
        localStorage.setItem('selectedCentro', selectedCentro);
    };    

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const isValidLength = password.length >= 6;

        return hasUpperCase && hasNumbers && hasSpecialChar && isValidLength;
    };

    const showContinue = (user) => {
        const selectedCentro = localStorage.getItem('selectedCentro') || 'Centro no seleccionado'; // Obtiene el centro seleccionado o muestra un mensaje si no se seleccionó ninguno
    
        Modal.info({
            centered: true,
            title: `¡Bienvenido al sistema IXCHEN ${selectedCentro}!`,
            content: `🎉 Hola, ${user.nombre} Nos alegra verte de nuevo 🎉`,
            okText: 'Gracias',
            onOk() {
                // Lógica para finalizar o cerrar el modal si es necesario
            },
            icon: null, 
            className: 'custom-confirm',
            style: {
                textAlign: 'center' 
            }
        });
    };    
    
    const onSubmit = handleSubmit(async (data) => {
        try {
            const user = await login(data);
    
            if (user) {
                const isPasswordValid = validatePassword(data.contraseña);
                localStorage.setItem('passwordValid', JSON.stringify(isPasswordValid));
    
                if (!isPasswordValid) {
                    notification({
                        message: '🔒 Actualización Necesaria',
                        description: 'Debes actualizar tu contraseña para utilizar todas las funcionalidades del sistema',
                        duration: 10
                    });
                    navigate('/cambiar-contraseña');
                } else {
                    navigate('/home');
                    notification.success({
                        message: '¡Inicio de Sesión Exitoso!',
                        description: `Bienvenido al sistema, ${user.nombre}!`,
                        duration: 5,
                        style: {
                            backgroundColor: '#f0f2f5', 
                            borderRadius: '10px',
                            padding: '20px',
                            fontSize: '16px'
                        }
                    });
                    showContinue(user);
                }
            }
    
        } catch (error) {
            console.log(error);
        }
    });
    

    return (
        <div className="container card-container d-flex justify-content-center align-items-center login-container" style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className="card card-login d-flex flex-column">
                <div className="card-header text-center">
                    <h4 className="mb-0">IXCHEN</h4>
                </div>

                <div className="card-body border">
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="correo" className='form-label'>Código MINSA</label>
                            <div className="input-group">
                                <span className="input-group-text input-icon"><FaUser /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Ingrese su código MINSA"
                                    {...register('correo', { required: true })}
                                />
                            </div>
                        </div>
                        
                        <div className="mb-3">
                            <label htmlFor="contrasena" className='form-label'>Contraseña</label>
                            <div className="input-group">
                                <span className="input-group-text input-icon"><FaLock /></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    {...register('contraseña', { required: true })}
                                />
                                <button
                                    type="button"
                                    className="btn-outline-secondary"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash color="red" /> : <FaEye color="green" />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="centros" className="form-label">Seleccione el Centro</label>
                            <div className="input-group">
                                <span className="input-group-text input-icon"><FaHospitalUser style={{ fontSize: '1.6rem' }} /></span>
                                <select defaultValue="Menú de selección" className="form-select" id="centro" onChange={handleCentroChange} required>
                                    <option value="">Centro IXCHEN</option>
                                    <option value="Managua">Managua</option>
                                    <option value="Ciudad Sandino">Ciudad Sandino</option>
                                    <option value="Estelí">Estelí</option>
                                    <option value="Granada">Granada</option>
                                    <option value="León">León</option>
                                    <option value="Masaya">Masaya</option>
                                    <option value="Tipitapa">Tipitapa</option>
                                    <option value="Villa Libertad">Villa Libertad</option>
                                    <option value="Matagalpa">Matagalpa</option>
                                </select>
                            </div>
                        </div>

                        {loginErrors && (
                            loginErrors.map(err => (
                                <p key={err} style={{ color: 'red', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaExclamationCircle style={{ marginRight: '8px', color: 'red', fontSize: '16px' }} /> {/* Icono de advertencia */}
                                    {err}
                                </p>
                            ))
                        )}

                        <button className="btn w-100" style={{ backgroundColor: '#572364', color: '#fff' }}>Iniciar Sesion</button>

                    </form>
                </div>
            </div>
        </div>
    );
}

//Codigo actualizado
// import './Login.css';
// import { useAuth } from '../../context/AuthContext';
// import { useState, useEffect } from 'react';
// import { FaEye, FaEyeSlash, FaUser, FaLock, FaExclamationCircle, FaHome } from 'react-icons/fa'; // Importa FaHome
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { notification } from 'antd';

// const images = [
//     "./logo.png",
//     "./Logo-Anfam-Ixchen.png"
// ];

// export const Login = () => {
//     const [backgroundImage, setBackgroundImage] = useState(images[0]);
//     const [showPassword, setShowPassword] = useState(false);
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const { login, errors: loginErrors } = useAuth();
//     const navigate = useNavigate();

//     useEffect(() => {
//         let imageIndex = 0;
//         const intervalId = setInterval(() => {
//             imageIndex = (imageIndex + 1) % images.length;
//             setBackgroundImage(images[imageIndex]);
//         }, 8000);

//         return () => clearInterval(intervalId);
//     }, []);

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleCentroChange = (event) => {
//         const selectedCentro = event.target.value;
//         localStorage.setItem('selectedCentro', selectedCentro);
//     };    

//     const validatePassword = (password) => {
//         const hasUpperCase = /[A-Z]/.test(password);
//         const hasNumbers = /[0-9].*[0-9].*[0-9]/.test(password);
//         const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//         const isValidLength = password.length >= 6;

//         return hasUpperCase && hasNumbers && hasSpecialChar && isValidLength;
//     };

//     const onSubmit = handleSubmit(async (data) => {
//         try {
//             const user = await login(data);

//             if (user) {
//                 const isPasswordValid = validatePassword(data.contraseña);
//                 localStorage.setItem('passwordValid', JSON.stringify(isPasswordValid));

//                 if (!isPasswordValid) {
//                     notification.warning({
//                         message: 'Actualización Necesaria',
//                         description: 'Debes actualizar tu contraseña para que puedas utilizar las funcionalidades del sistema',
//                         duration: 10
//                     });
//                     navigate('/cambiar-contraseña');
//                 } else {
//                     navigate('/home');
//                     notification.success({
//                         message: '¡Inicio de Sesión Exitoso!',
//                         description: `Bienvenido ${user.nombre}`,
//                         duration: 3
//                     });
//                 }
//             }

//         } catch (error) {
//             console.log(error);
//         }
//     });

//     return (
//         <div className="container card-container d-flex justify-content-center align-items-center login-container" style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
//             <div className="card card-login d-flex flex-column">
//                 <div className="card-header text-center">
//                     <h4 className="mb-0">IXCHEN</h4>
//                 </div>

//                 <div className="card-body border">
        
//                     <form onSubmit={onSubmit}>
//                         <div className="form-group mb-3">
//                             <label htmlFor="correo" className='form-label'>Código MINSA</label>
//                             <div className="input-group">
//                                 <span className="input-group-text input-icon"><FaUser /></span>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     placeholder="Ingrese su código MINSA"
//                                     {...register('correo', { required: true })}
//                                 />
//                             </div>
//                         </div>
                        
//                         <div className="mb-3">
//                             <label htmlFor="contrasena" className='form-label'>Contraseña</label>
//                             <div className="input-group">
//                                 <span className="input-group-text input-icon"><FaLock /></span>
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     className="form-control"
//                                     placeholder="Ingrese su contraseña"
//                                     {...register('contraseña', { required: true })}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="btn-outline-secondary"
//                                     onClick={togglePasswordVisibility}
//                                 >
//                                     {showPassword ? <FaEyeSlash color="red" /> : <FaEye color="green" />}
//                                 </button>
//                             </div>
//                         </div>

//                         <div className="mb-3">
//                             <label htmlFor="centros" className="form-label">Seleccione el Centro</label>
//                             <div className="input-group">
//                                 <span className="input-group-text input-icon"><FaHome /></span> {/* Ícono de casa */}
//                                 <select defaultValue="Menú de selección" className="form-select" id="centro" onChange={handleCentroChange} required>
//                                     <option value="">Menú de selección</option>
//                                     <option value="Managua">Managua</option>
//                                     <option value="Ciudad Sandino">Ciudad Sandino</option>
//                                     <option value="Villa Libertad">Villa Libertad</option>
//                                     <option value="Tipitapa">Tipitapa</option>
//                                     <option value="Masaya">Masaya</option>
//                                     <option value="Granada">Granada</option>
//                                     <option value="Matagalpa">Matagalpa</option>
//                                     <option value="Estelí">Estelí</option>
//                                     <option value="León">León</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {loginErrors && (
//                             loginErrors.map(err => (
//                                 <p key={err} style={{ color: 'red', textAlign: 'center', fontSize: '15px', fontWeight: 'bold', margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                     <FaExclamationCircle style={{ marginRight: '8px', color: 'red', fontSize: '16px' }} /> {/* Icono de advertencia */}
//                                     {err}
//                                 </p>
//                             ))
//                         )}

//                         <button className="btn w-100" style={{ backgroundColor: '#572364', color: '#fff' }}>Iniciar Sesion</button>

//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }