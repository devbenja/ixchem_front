import { useState, useEffect } from "react";
import axios from "axios";
import { notification } from "antd";
import { useParams } from "react-router-dom";

export const EditarUsuario = () => {

    const { codAdmin } = useParams();

    const [formData, setFormData] = useState({
        codAdmin: 0,
        nombre: "",
        apellido: "",
        correo: "",
        contraseña: "",
        codRol: 0
    });


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

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`https://localhost:7106/api/bdtbusuario/listarporid/${codAdmin}`);

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codAdmin]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            console.log(formData)

            await axios.put(`https://localhost:7106/api/bdtbusuario/actualizar/${formData.codAdmin}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Usuario Editado con éxito`,
                duration: 3
            });
            
        } catch (error) {
            
            notification.error({
                message: '¡Error!',
                description: error.response?.data?.message || 'Ocurrió un error inesperado',
                duration: 3
            });

        }

    };

    return (
        <div className="container-fluid">
            <h4>Editar Usuario</h4>
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
                        <label className="form-label">Correo</label>
                        <input type="email" name="correo" value={formData.correo} onChange={handleChange} className="form-control" />
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
                            <option value={2}>Normal</option>
                        </select>
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