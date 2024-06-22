import { useState } from "react";
import axios from "axios";
import { notification } from "antd";

export const AgregarEpicrisis = () => {

    const [formData, setFormData] = useState({
        codEpicrisis: 0,
        fecha: "",
        hora: "",
        fechaIngreso: "",
        fechaEgreso: "",
        diagIngreso: "",
        diagEgreso: "",
        resultado: "",
        tratamiento: "",
        descartes: "",
        complicaciones: "",
        recomendaciones: "",
        datosRelevantes: "",
        numExpediente: "",
        codDoctor: ""
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            console.log(formData);

            await axios.post('https://localhost:7106/api/bdtbepicrisis/post', formData);

            notification.success({
                message: '¡Éxito!',
                description: `Epicrisis Creada con Exito`,
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
            <h4>Agregar Epicrisis</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Codigo Doctor</label>
                        <input type="text" name="codDoctor" value={formData.codDoctor} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha </label>
                        <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
                    </div>
                    
                </div>

                <div className="row mb-3">

                <div className="col sm-mt-3">
                        <label className="form-label">Hora</label>
                        <input type="text" name="hora" value={formData.hora} onChange={handleChange} className="form-control" />
                    </div>

                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Ingreso</label>
                        <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col sm-mt-3">
                        <label className="form-label">Fecha Egreso</label>
                        <input type="date" name="fechaEgreso" value={formData.fechaEgreso} onChange={handleChange} className="form-control" />
                    </div>

                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnostico Ingreso</label>
                    <textarea rows="3" type="text" name="diagIngreso" value={formData.diagIngreso} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Diagnostico Egreso</label>
                    <textarea rows="3" type="text" name="diagEgreso" value={formData.diagEgreso} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Resultado</label>
                    <textarea rows="3" type="text" name="resultado" value={formData.resultado} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Tratamiento</label>
                    <textarea rows="3" type="text" name="tratamiento" value={formData.tratamiento} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Descartes</label>
                    <textarea rows="3" type="text" name="descartes" value={formData.descartes} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Complicaciones</label>
                    <textarea rows="3" type="text" name="complicaciones" value={formData.complicaciones} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Recomendaciones</label>
                    <textarea rows="3" type="text" name="recomendaciones" value={formData.recomendaciones} onChange={handleChange} className="form-control" />
                </div>

                <div className="col mt-3">
                    <label className="form-label">Datos Relevantes</label>
                    <textarea rows="3" type="text" name="datosRelevantes" value={formData.datosRelevantes} onChange={handleChange} className="form-control" />
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="reset" className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
