import './Login.css';
import { useAuth } from '../../context/AuthContext';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { notification } from 'antd';

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
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = handleSubmit(async (data) => {

        try {

            const user = await login(data);

            console.log(user)

            if (user) {
                navigate('/home');

                notification.success({
                    message: '¡Inicio de Sesión Exitoso!',
                    description: `Bienvenido ${user.nombre}`,
                    duration: 3
                });
            }

        } catch (error) {
            console.log(error);
        }

    });

    return (
        <div className="container card-container d-flex justify-content-center align-items-center login-container" style={{ height: '100vh', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <div className="card card-login" style={{ borderRadius: '10px' }}>
                <div className="card-header text-center">
                    <h4 className="mb-0">IXCHEN</h4>
                </div>

                <div className="card-body border">
                    {
                        loginErrors && (
                            loginErrors.map(err => (
                                <p key={err} className="text-red-500 text-center">{err}</p>
                            ))
                        )
                    }
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="correo" className='form-label'>Código MINSA</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su código MINSA"
                                {...register('correo', { required: true })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contrasena" className='form-label'>Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Ingrese su contraseña"
                                    {...register('contraseña', { required: true })}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <button className="btn w-100" style={{ backgroundColor: '#572364', color: '#fff' }}>Iniciar Sesion</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
