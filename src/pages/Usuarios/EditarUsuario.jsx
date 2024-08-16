import { useState, useEffect } from "react";
import axios from "axios";
import { notification, Button, Modal as AntModal } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { baseURL } from "../../api/apiURL";

export const EditarUsuario = () => {

    const { codAdmin } = useParams();
    const navigate = useNavigate();

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

                const response = await axios.get(`${baseURL}/bdtbusuario/listarporid/${codAdmin}`);

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codAdmin]);

    const handleSubmit = async () => {

        try {

            console.log(formData)

            await axios.put(`${baseURL}/bdtbusuario/actualizar/${formData.codAdmin}`, formData);

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

    const handleBack = () => {
        navigate('/buscar-usuario');
    }

    const showDeleteConfirm = () => {

        AntModal.confirm({
            centered: true,
            title: '¿Está seguro de editar este usuario permanentemente? No podrá volver a Editarlo',
            icon: <ExclamationCircleOutlined />,
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleSubmit();
            },
            onCancel() {
                console.log('Cancelado');
            },
        });
    };

    return (
        <div className="container-fluid">
            <div className="container-fluid d-flex align-items-center justify-content-between">
                <h4>Editar Usuario</h4>
                <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            
            <form className='container-fluid mt-4' onSubmit={(e) => e.preventDefault()}>
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
                            <option value={3}>Director</option>
                        </select>
                    </div>

                </div>
                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" onClick={showDeleteConfirm} className="btn btn-primary">Guardar</button>
                    <button type="reset" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}