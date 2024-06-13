import './Login.css';
import { useAuth } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, errors: loginErrors } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit(async (data) => {

        try {

            const user = await login(data);

            if (user) {
                navigate('/');
            }
            
        } catch (error) {
            console.log(error);
        }

    });

    return (
        <div className="container card-container d-flex justify-content-center align-items-center login-container" style={{ height: '100vh' }}>
            <div className="card card-login" style={{ borderRadius: '10px' }}>
                <div className="card-header text-center">
                    <h4 className="mb-0">IXCHEN</h4>
                </div>
                {
                    loginErrors && (
                        loginErrors.map(err => (
                            <p key={err} className="text-red-500 text-center">{err}</p>
                        ))
                    )
                }
                <div className="card-body border">
                    <form onSubmit={onSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="correo" className='form-label'>Correo</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Ingrese su correo"
                                {...register('correo', { required: true })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contrasena" className='form-label'>Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Ingrese su contraseña"
                                {...register('contraseña', { required: true })}
                            />
                        </div>

                        <button className="btn w-100" style={{ backgroundColor: '#572364', color: '#fff' }}>Iniciar Sesion</button>

                    </form>
                </div>
            </div>
        </div>
    )
}
