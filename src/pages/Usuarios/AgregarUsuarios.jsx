import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

import { baseURL } from "../../api/apiURL";

import { useNavigate } from "react-router-dom";

export const AgregarUsuarios = () => {

    const [formData, setFormData] = useState({
        codAdmin: 0,
        nombre: "",
        apellido: "",
        correo: "",
        contraseña: "",
        codRol: 2,
        estado: true // Valor por defecto true
    });

    const navigate = useNavigate();


    const handleChange = (e) => {

        const { name, value } = e.target;
        let finalValue;

        if (name === 'codRol') {
            finalValue = Number(value);
        } else {
            finalValue = value;
        }

        setFormData({
            ...formData,
            [name]: finalValue
        });

    };

    const handleBack = () => {
        navigate('/buscar-usuario');
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            await axios.post(`${baseURL}/bdtbusuario/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Usuario Creado con Exito`,
                duration: 3
            });

            setFormData({
                codAdmin: 0,
                nombre: "",
                apellido: "",
                correo: "",
                contraseña: "",
                codRol: 2,
                estado: true // Valor por defecto true
            });

            setTimeout(() => {
                navigate('/buscar-usuario');
            }, 1000);

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: error,
                duration: 3
            });

        }
    }

    return (
        <div className="container-fluid">
            <h4>Crear Usuario</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Nombre</label>
                        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Apellido</label>
                        <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Código MINSA</label>
                        <input type="text" name="correo" value={formData.correo} onChange={handleChange} className="form-control" />
                    </div>

                </div>

                <div className="row mb-3">

                    <div className="col-sm-4 sm-mt-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" name="contraseña" value={formData.contraseña} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="col-sm-4 sm-mt-3">
                        <label className="form-label">Rol</label>
                        <select name="codRol" value={formData.codRol} onChange={handleChange} className="form-select">
                            <option value={1}>Administrador</option>
                            <option value={2}>Doctor</option>
                            <option value={3}>Director</option>
                        </select>
                    </div>

                </div>
                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="button" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}