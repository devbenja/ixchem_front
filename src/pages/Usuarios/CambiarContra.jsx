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
        nuevaContraseña: ""
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

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            console.log(formData)

            await axios.put(`${baseURL}/bdtbusuario/actualizarcontraseña/${user.codAdmin}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Contraseña Cambiada correctamente`,
                duration: 3
            });

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
                </div>
                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="reset" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
