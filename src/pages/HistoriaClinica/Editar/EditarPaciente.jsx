import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { notification, Switch } from 'antd';

import { baseURL } from '../../../api/apiURL';


export const EditarPaciente = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        numExpediente: '',
        primerNombre: '',
        segundoNombre: '',
        primerApellido: '',
        segundoApellido: '',
        cedula: '',
        fechaNac: '',
        edad: 0,
        escolaridad: '',
        profesion: '',
        sexo: '',
        direccion: '',
        codDepartamento: 0,
        presion: '',
        temperatura: 0,
        peso: 0,
        talla: 0,
        imc: 0,
        fechaIngreso: '',
        centro: '',
        usuaria: '',
        estado: false
    });

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`${baseURL}/bdtpaciente/buscarpornumexpediente`, {
                    params: { NumExpediente: id }
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

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });

    };

    const handleSwitchChange = (checked) => {
        setFormData({
            ...formData,
            estado: checked,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {


            await axios.put(`${baseURL}/bdtpaciente/actualizar/${id}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Paciente con No. Expediente ${formData.numExpediente} Editado`,
                duration: 3
            });

            setTimeout(() => {
                navigate('/buscar-historia-clinica');
            }, 1000);

        } catch (error) {

            notification.error({
                message: 'Error!',
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
            <h4>Editar Datos Generales Paciente</h4>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className='row'>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">No. de expediente</label>
                            <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">Primer nombre</label>
                            <input type="text" name="primerNombre" value={formData.primerNombre} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">Segundo nombre</label>
                            <input type="text" name="segundoNombre" value={formData.segundoNombre} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">Primer apellido</label>
                            <input type="text" name="primerApellido" value={formData.primerApellido} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">Segundo apellido</label>
                            <input type="text" name="segundoApellido" value={formData.segundoApellido} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className='col-sm-2'>
                        <div className="mb-3">
                            <label className="form-label">Cédula</label>
                            <input type="text" name="cedula" value={formData.cedula} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className='col-sm-3'>
                        <div className="mb-3">
                            <label className="form-label">Fecha de Nacimiento</label>
                            <input type="date" name="fechaNac" value={formData.fechaNac} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Edad</label>
                            <input type="number" name="edad" value={formData.edad} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            {/* <label className="form-label">Escolaridad</label>
                            <input type="text" name="escolaridad" value={formData.escolaridad} onChange={handleChange} className="form-control" /> */}

                            <label htmlFor="escolaridad" className="form-label">Escolaridad*</label>
                            <select defaultValue="Bachiller" className="form-select" name="escolaridad" value={formData.escolaridad} onChange={handleChange}>
                                <option value="">{formData.escolaridad}</option>
                                <option value="Bachiller">Bachiller</option>
                                <option value="Primaria completa">Primaria completa</option>
                                <option value="Primaria incompleta">Primaria incompleta</option>
                                <option value="Secundaria incompleta">Secundaria incompleta</option>
                                <option value="Técnico superior">Técnico superior</option>
                                <option value="Universitario">Universitario</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            {/* <label className="form-label">Profesión/Oficio</label>
                            <input type="text" name="profesion" value={formData.profesion} onChange={handleChange} className="form-control" /> */}

                            <label htmlFor="profesion" className="form-label">Profesión*</label>
                            <select defaultValue="Ama de casa" className="form-select" name="profesion" value={formData.profesion} onChange={handleChange}>
                                <option value="">{formData.profesion}</option>
                                <option value="Ama de casa">Ama de casa</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Oficinista">Oficinista</option>
                                <option value="Operaria">Operaria</option>
                                <option value="Sector informal">Sector informal</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="mb-3">
                            <label className="form-label">Sexo</label>
                            <select name="sexo" value={formData.sexo} onChange={handleChange} className="form-select">
                                <option value="">{formData.sexo}</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                            </select>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Departamento</label>
                            {/* <input type="number" name="codDepartamento" value={formData.codDepartamento} onChange={handleChange} className="form-control" /> */}

                            <select defaultValue="3" className="form-select" name="codDepartamento" value={formData.codDepartamento} onChange={handleChange}>
                                <option value="">{formData.codDepartamento}</option>
                                <option value="1">Chinandega</option>
                                <option value="2">Leon</option>
                                <option value="3">Managua</option>
                                <option value="4">Masaya</option>
                                <option value="5">Carazo</option>
                                <option value="6">Granada</option>
                                <option value="7">Rivas</option>
                                <option value="8">Rio San Juan</option>
                                <option value="9">Madriz</option>
                                <option value="10">Nueva Segovia</option>
                                <option value="11">Jinotega</option>
                                <option value="12">Esteli</option>
                                <option value="13">Matagalpa</option>
                                <option value="14">Boaco</option>
                                <option value="15">Chontales</option>
                                <option value="16">RAAN</option>
                                <option value="17">RAAS</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Presión</label>
                            <input type="text" name="presion" value={formData.presion} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Temperatura (°C)</label>
                            <input type="number" name="temperatura" value={formData.temperatura} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="mb-3">
                            <label className="form-label">Peso (Kg)</label>
                            <input type="number" name="peso" value={formData.peso} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="mb-3">
                            <label className="form-label">Talla (Mtrs)</label>
                            <input type="number" name="talla" value={formData.talla} onChange={handleChange} className="form-control" />
                        </div>
                    </div>

                </div>

                <div className='row justify-content-between'>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">IMC</label>
                            <input type="number" name="imc" value={formData.imc} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Fecha de ingreso</label>
                            <input type="date" name="fechaIngreso" value={formData.fechaIngreso} onChange={handleChange} className="form-control" />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="mb-3">
                            {/* <label className="form-label">Centro de mujeres IXCHEN</label>
                            <input type="text" name="centro" value={formData.centro} onChange={handleChange} className="form-control" /> */}

                            <select defaultValue="Managua" className="form-select" name="centro" value={formData.centro} onChange={handleChange}>
                                <option value="">{formData.centro}</option>
                                <option value="Managua">Managua</option>
                                <option value="Ciudad Sandino">Ciudad Sandino</option>
                                <option value="Villa Libertad">Villa Libertad</option>
                                <option value="Tipitapa">Tipitapa</option>
                                <option value="Masaya">Masaya</option>
                                <option value="Granada">Granada</option>
                                <option value="Matagalpa">Matagalpa</option>
                                <option value="Estelí">Estelí</option>
                                <option value="León">León</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="mb-3">
                            <label className="form-label">Usuaria</label>
                            <select name="usuaria" value={formData.usuaria} onChange={handleChange} className="form-select">
                                <option value="">{formData.usuaria}</option>
                                <option value="Usuaria">Usuaria</option>
                                <option value="Subsecuente">Subsecuente</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="d-flex flex-column">
                            <label className="form-label">Estado</label>
                            <Switch
                                checked={formData.estado}
                                onChange={handleSwitchChange}
                                checkedChildren="Habilitado"
                                unCheckedChildren="Inhabilitado"
                            />
                            {/* <select name="estado" value={formData.estado} onChange={handleChange} className="form-select">
                                <option value="">{formData.estado ? 'Habilitado' : 'Inhabilitado'}</option>
                                <option value={true}>Habilitar</option>
                                <option value={false}>Inhabilitar</option>
                            </select> */}
                        </div>
                    </div>
                </div>
                <div className='d-grid gap-2 d-md-flex justify-content-md-start mt-5'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="submit" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
