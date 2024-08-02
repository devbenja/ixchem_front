import { useState } from "react";
import { notification } from 'antd';
import axios from 'axios';
import { baseURL } from "../../api/apiURL";

export const AgregarDoctor = () => {
    const [formData, setFormData] = useState({
        codDoctor: '',
        primerNombred: '',
        segundoNombre: '',
        primerApellidod: '',
        segundoApellido: '',
        cedula: '',
        clinica: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmitCreateDoctor = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            await axios.post(`${baseURL}/bdtdoctor/post`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Doctor ${formData.primerNombred} agregado con éxito`,
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
            <h4>Agregar Doctor</h4>
            <form onSubmit={handleSubmitCreateDoctor} className='mt-4'>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="primerNombre" className="form-label">Primer Nombre*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="primerNombred"
                            onChange={handleChange}
                            value={formData.primerNombred}
                        />
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
                        <label htmlFor="primerApellido" className="form-label">Primer Apellido*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="primerApellidod"
                            onChange={handleChange}
                            value={formData.primerApellidod}
                        />
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
                            <label htmlFor="codDoctor" className="form-label">Codigo MINSA</label>
                            <input
                                type="text"
                                className="form-control"
                                name="codDoctor"
                                onChange={handleChange}
                                value={formData.codDoctor}
                            />
                        </div>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="cedula" className="form-label">Cedula</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cedula"
                                onChange={handleChange}
                                value={formData.cedula}
                            />
                        </div>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="clinica" className="form-label">Clinica</label>
                            <input
                                type="text"
                                className="form-control"
                                name="clinica"
                                onChange={handleChange}
                                value={formData.clinica}
                            />
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                    <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                    <button type="reset" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
};
