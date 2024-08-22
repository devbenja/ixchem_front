import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../../../api/apiURL';

export const EditarInformacion = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codInfo: 0,
        motVisita: "",
        notaMedica: "",
        numExpediente: ""
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`${baseURL}/bdtbinformacion/buscarporexpediente`, {
                    params: { NumExpediente: id }
                });

                setFormData(response.data);

                console.log(response.data)

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

            console.log(formData)

            await axios.put(`${baseURL}/bdtbinformacion/actualizar/${formData.codInfo}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Informacion del Expediente ${formData.numExpediente} Editada`,
                duration: 3
            });

            setTimeout(() => {
                navigate('/buscar-historia-clinica');
            }, 1000);

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    };

    const handleBack = () => {
        navigate('/buscar-historia-clinica');
    }

    return (
        <div className='container-fluid'>
            <h4>Editar Información</h4>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div>
                    <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.numExpediente}
                        title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                        readOnly
                    />
                </div>
                <div className="mt-3">
                    <label className="form-label" htmlFor="motivo_visita">Motivo de la visita*</label>
                    <textarea
                        type="text"
                        className="form-control"
                        rows="10"
                        id="motVisita"
                        name='motVisita'
                        value={formData.motVisita}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>

                <div className="mt-3">
                    <label htmlFor="nota_med" className="form-label">Nota Médica</label>
                    <textarea
                        className="form-control"
                        rows="10"
                        id="notaMedica"
                        name='notaMedica'
                        value={formData.notaMedica}
                        onChange={handleChange}
                    >
                    </textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
                    <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                    <button type="reset" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
