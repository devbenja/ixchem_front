import { useState, useEffect } from "react";
import { notification } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseURL } from "../../api/apiURL";

export const EditarDoctor = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        codDoctor: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        cedula: '',
        clinica: ''
    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtdoctor/buscarporcoddoctor`, {
                    params: { CodDoctor: id }
                });

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await axios.put(`${baseURL}/bdtdoctor/actualizar/${id}`, formData);
            
            notification.success({
                message: '¡Éxito!',
                description: `Doctor Editado`,
                duration: 3
            });

        } catch (error) {

            notification.error({
                message: 'Error!',
                description: `${error}`,
                duration: 3
            });

        }
    };

    
    
    return (
        <div className='container-fluid'>
            <h4>Editar Doctor</h4>
            <form onSubmit={handleSubmit}  className='mt-4'>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="primerNombre" className="form-label">Primer Nombre*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="primerNombre"
                            onChange={handleChange}
                            value={formData.primerNombre}
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
                            name="primerApellido"
                            onChange={handleChange}
                            value={formData.primerApellido}
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
                                type="number"
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
    )
}
