import { useState, useEffect } from 'react';
import axios from 'axios';
import { notification } from "antd";

import { baseURL } from '../../api/apiURL.js';

export const AgregarHistoriaClinicaGeneral = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [firstName, setFirstName] = useState('');
    const [firstLastName, setFirstLastName] = useState('');

    const [data, setData] = useState({
        primeR_NOMBRE: '',
        segundO_NOMBRE: '',
        primeR_APELLIDO: '',
        segundO_APELLIDO: '',
        nuM_EXPEDIENTE: '',
        direccion: ''
    });

    const [formData, setFormData] = useState({
        codHistoriaClinica: 0,
        diabetesMellitus: false,
        nefropatia: false,
        cardiopatia: false,
        consumoDrogas: false,
        cualquierOtro: false,
        altoRiesgo: false,
        fecha: "",
        numExpediente: '',
        codDoctor: "",
        ciclO_CONTROL: 0
    });

    const [obstetrico, setObstetrico] = useState({
        codHojariesgo: 0,
        muerteFetal: false,
        antAbortos: false,
        peso250: false,
        peso450: false,
        internada: false,
        cirugiasPrevias: false,
        numExpediente: "",
        telefono: ""
    });

    const [actual, setActual] = useState({
        codEmbarazo: 0,
        diagnostico: false,
        menor20: false,
        mayorde35: false,
        isoinmunizacion: false,
        sangradov: false,
        masaPelvica: false,
        presionArterial: false,
        numExpediente: ""
    });

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${baseURL}/bdtdoctor/listar`);
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors: ", error);
                notification.error({
                    message: '¡Error!',
                    description: 'Error al cargar la lista de doctores',
                    duration: 3
                });
            }
        };

        fetchDoctors();

    }, []);

    const handleSubmitSearch = async (e) => {

        e.preventDefault();

        let response;

        try {

            if (searchType === 'num_expediente') {
                console.log(searchValue)

                response = await axios.get(`${baseURL}/bdtpaciente/buscarpornumexpedienteunidos`, {
                    params: { NUM_EXPEDIENTE: searchValue }
                })

            } else if (searchType === 'nombre') {

                console.log(firstName)

                response = await axios.get(`${baseURL}/bdtpaciente/Buscarpacienteunidosnombre`, {
                    params: { PRIMER_NOMBRE: firstName, PRIMER_APELLIDO: firstLastName }
                })

            }

            const result = response.data[0];
            setData(result);

            console.log(result)
            setFormData(prevFormData => ({
                ...prevFormData,
                numExpediente: result.nuM_EXPEDIENTE
            }));

            setObstetrico(prevObstetrico => ({
                ...prevObstetrico,
                numExpediente: result.nuM_EXPEDIENTE
            }));

            setActual(prevActual => ({
                ...prevActual,
                numExpediente: result.nuM_EXPEDIENTE
            }));

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.response?.data ?? 'Error desconocido'}`,
                duration: 3
            });

        }

    };

    const handleChangeObs = (e) => {
        const { name, value, type, checked } = e.target;
        setObstetrico({
            ...obstetrico,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleChangeActual = (e) => {
        const { name, value, type, checked } = e.target;
        setActual({
            ...actual,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleRadioChangeObs = (e) => {
        const { name, value } = e.target;
        setObstetrico({
            ...obstetrico,
            [name]: value === 'true'
        });
    };

    const handleRadioChangeActual = (e) => {
        const { name, value } = e.target;
        setActual({
            ...actual,
            [name]: value === 'true'
        });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value === 'true'
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            console.log(formData);

            const convertedData = {
                ...formData,
                ciclO_CONTROL: Number(formData.ciclO_CONTROL),
            }

            console.log(convertedData)

            await axios.post(`${baseURL}/bdtbhistoriaclinicageneral/post`, convertedData);

            notification.success({
                message: '¡Éxito!',
                description: `Historia Clinica General Creada con Exito`,
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

    const handleSubmitObs = async (e) => {

        e.preventDefault();

        try {

            console.log(obstetrico);

            await axios.post(`${baseURL}/bdtbantecedentesobstetrico/post`, obstetrico);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Obstetrico Creado con Exito`,
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

    const handleSubmitActual = async (e) => {

        e.preventDefault();

        try {

            console.log(actual);

            await axios.post(`${baseURL}/bdtbembarazoactual/post`, actual);

            notification.success({
                message: '¡Éxito!',
                description: `Embarazo Actual Creado con Exito`,
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
        <div className='container-fluid'>
            <div className="container-fluid">
                <h4 className='mb-2'>Agregar Clasificación de Riesgo</h4>
            </div>
            <form onSubmit={handleSubmitSearch} className="container-fluid mt-4 mb-3">
                <div className="row">
                    <div className="col-sm-3">
                        <select
                            className="form-select"
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion</option>
                            <option value="num_expediente">Numero Expediente</option>
                            <option value="nombre">Nombre</option>
                        </select>
                    </div>
                    <div className="col-sm-9">
                        <div className="input-group gap-2" role="search">
                            {searchType === 'nombre' ? (
                                <div className="row d-flex flex-wrap w-75">
                                    <div className="col d-flex align-items-center justify-content-center">

                                        <input
                                            className="form-control"
                                            type="search" value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            aria-label="Search"
                                            placeholder='Primer Nombre'
                                        />
                                    </div>
                                    <div className="col d-flex align-items-center justify-content-center">

                                        <input
                                            className="form-control"
                                            type="search" value={firstLastName}
                                            onChange={(e) => setFirstLastName(e.target.value)}
                                            aria-label="Search"
                                            placeholder='Primer Apellido'
                                        />
                                    </div>
                                </div>
                            ) : (
                                <input
                                    className="form-control"
                                    maxLength="80"
                                    type="search"
                                    aria-label="Search"
                                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                                    placeholder='Numero de expediente'
                                />
                            )}

                            <button className="btn btn-success" type="submit">Buscar</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className='container-fluid'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="HCG-tab" data-bs-toggle="tab" data-bs-target="#HCG" role="tab" aria-controls="HCG" aria-selected="true">Historia Clinica General</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="AO-tab" data-bs-toggle="tab" role="tab" data-bs-target="#AO" aria-controls="AO" aria-selected="false">A. Obstetrico</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="EA-tab" data-bs-toggle="tab" role="tab" data-bs-target="#EA" aria-controls="EA" aria-selected="false">Embarazo Actual</a>
                    </li>
                </ul>

                <div className="tab-content" id="hcgtab">
                    <div className="tab-pane show active" id="HCG" role="tabpanel" aria-labelledby="HCG-tab">
                        <form className='mt-4' onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Nombre</label>
                                    <input type="text" name="primeR_NOMBRE" value={data.primeR_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Nombre</label>
                                    <input type="text" name="segundO_NOMBRE" value={data.segundO_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Apellido</label>
                                    <input type="text" name="primeR_APELLIDO" value={data.primeR_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Apellido</label>
                                    <input type="text" name="segundO_APELLIDO" value={data.segundO_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Número de expediente</label>
                                    <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                                </div>
                                {/* <div className="col-sm-3 mt-3">
                                    <label className="form-label">Codigo Doctor</label>
                                    <input type="text" name="codDoctor" value={formData.codDoctor} onChange={handleChange} className="form-control" />
                                </div> */}
                                <div className="col-sm-3 mt-3">
                                    <label htmlFor="codDoctor" className="form-label">Codigo Doctor*</label>
                                    <select
                                        className="form-control"
                                        name="codDoctor"
                                        onChange={handleChange}
                                        value={formData.codDoctor}
                                    >
                                        <option value="">Seleccione un Doctor</option>
                                        {doctors.map(doctor => (
                                            <option key={doctor.codDoctor} value={doctor.codDoctor}>
                                                {doctor.primerNombred} {doctor.primerApellidod}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Fecha</label>
                                    <input type="date" name="fecha" value={formData.fecha} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col mt-3">
                                    <label className="form-label">Diabetes Mellitus</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="diabetesMellitus" value="true" checked={formData.diabetesMellitus === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="diabetesMellitus" value="false" checked={formData.diabetesMellitus === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-sm-2">
                                    <label className="form-label">Nefropatia</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="nefropatia" value="true" checked={formData.nefropatia === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="nefropatia" value="false" checked={formData.nefropatia === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <label className="form-label">Cardiopatia</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cardiopatia" value="true" checked={formData.cardiopatia === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cardiopatia" value="false" checked={formData.cardiopatia === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">¿Consume Drogas?</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="consumoDrogas" value="true" checked={formData.consumoDrogas === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="consumoDrogas" value="false" checked={formData.consumoDrogas === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-2">
                                    <label className="form-label">Cualquier Otro</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cualquierOtro" value="true" checked={formData.cualquierOtro === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cualquierOtro" value="false" checked={formData.cualquierOtro === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <label className="form-label">Alto Riesgo</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="altoRiesgo" value="true" checked={formData.altoRiesgo === true} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="altoRiesgo" value="false" checked={formData.altoRiesgo === false} onChange={handleRadioChange} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="col-sm-2">
                                <label htmlFor="ciclo" className="form-label">Ciclo de Control</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name='ciclO_CONTROL'
                                    value={formData.ciclO_CONTROL}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='mt-4 d-flex gap-2'>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="submit" className="btn btn-danger">Cancelar</button>
                            </div>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="AO" role="tabpanel" aria-labelledby="AO-tab">
                        <form className='mt-4' onSubmit={handleSubmitObs}>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Nombre</label>
                                    <input type="text" name="primeR_NOMBRE" value={data.primeR_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Nombre</label>
                                    <input type="text" name="segundO_NOMBRE" value={data.segundO_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Apellido</label>
                                    <input type="text" name="primeR_APELLIDO" value={data.primeR_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Apellido</label>
                                    <input type="text" name="segundO_APELLIDO" value={data.segundO_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Número de expediente</label>
                                    <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Telefono</label>
                                    <input type="number" name="telefono" value={obstetrico.telefono} onChange={handleChangeObs} className="form-control" />
                                </div>

                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">¿Abortos?</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="antAbortos" value="true" checked={obstetrico.antAbortos === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="antAbortos" value="false" checked={obstetrico.antAbortos === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Peso 250</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="peso250" value="true" checked={obstetrico.peso250 === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="peso250" value="false" checked={obstetrico.peso250 === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-sm-3">
                                    <label className="form-label">Peso 450</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="peso450" value="true" checked={obstetrico.peso450 === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="peso450" value="false" checked={obstetrico.peso450 === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Internada</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="internada" value="true" checked={obstetrico.internada === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="internada" value="false" checked={obstetrico.internada === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <label className="form-label">Cirugias Previas</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cirugiasPrevias" value="true" checked={obstetrico.cirugiasPrevias === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="cirugiasPrevias" value="false" checked={obstetrico.cirugiasPrevias === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <label className="form-label">Muerte Fetal</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="muerteFetal" value="true" checked={obstetrico.muerteFetal === true} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="muerteFetal" value="false" checked={obstetrico.muerteFetal === false} onChange={handleRadioChangeObs} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 d-flex gap-2'>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="submit" className="btn btn-danger">Cancelar</button>
                            </div>
                        </form>
                    </div>

                    <div className="tab-pane fade" id="EA" role="tabpanel" aria-labelledby="EA-tab">
                        <form className='mt-4' onSubmit={handleSubmitActual}>
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Nombre</label>
                                    <input type="text" name="primeR_NOMBRE" value={data.primeR_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Nombre</label>
                                    <input type="text" name="segundO_NOMBRE" value={data.segundO_NOMBRE} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Primer Apellido</label>
                                    <input type="text" name="primeR_APELLIDO" value={data.primeR_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Segundo Apellido</label>
                                    <input type="text" name="segundO_APELLIDO" value={data.segundO_APELLIDO} onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Número de expediente</label>
                                    <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                                </div>

                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Diagnostico</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="diagnostico" value="true" checked={actual.diagnostico === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="diagnostico" value="false" checked={actual.diagnostico === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Menor de 20</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="menor20" value="true" checked={actual.menor20 === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="menor20" value="false" checked={actual.menor20 === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3 mt-3">
                                    <label className="form-label">Mayor de 35</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="mayorde35" value="true" checked={actual.mayorde35 === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="mayorde35" value="false" checked={actual.mayorde35 === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mb-3">

                                <div className="col-sm-3">
                                    <label className="form-label">Inmunizacion</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="isoinmunizacion" value="true" checked={actual.isoinmunizacion === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="isoinmunizacion" value="false" checked={actual.isoinmunizacion === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <label className="form-label">Sangrado Vaginal</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="sangradov" value="true" checked={actual.sangradov === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="sangradov" value="false" checked={actual.sangradov === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <label className="form-label">Masa Pelvica</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="masaPelvica" value="true" checked={actual.masaPelvica === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="masaPelvica" value="false" checked={actual.masaPelvica === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-3">
                                    <label className="form-label">Presión Arterial</label>
                                    <div className='d-flex align-items-center justify-content-center form-control'>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="presionArterial" value="true" checked={actual.presionArterial === true} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">Sí</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" name="presionArterial" value="false" checked={actual.presionArterial === false} onChange={handleRadioChangeActual} className="form-check-input" />
                                            <label className="form-check-label">No</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mt-4 d-flex gap-2'>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                                <button type="submit" className="btn btn-danger">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
