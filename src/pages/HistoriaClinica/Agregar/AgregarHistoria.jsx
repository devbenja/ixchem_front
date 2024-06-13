import { useState, useEffect } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";
import { Toast, ToastBody, ToastHeader } from 'reactstrap';

export const AgregarHistoria = () => {

    const { register: registerPaciente, handleSubmit: handleSubmitPaciente, formState: { errors: errorsPaciente }, reset } = useForm();
    const { register: registerAntecPer, handleSubmit: handleSubmitAntPer, formState: { errors: errorsAntPer }, reset: resetAntPer, setValue } = useForm();
    const [showToast, setShowToast] = useState(false);
    const [toastBody, setToastBody] = useState('');
    const [numExp, setNumExp] = useState('');

    const onSubmitPaciente = handleSubmitPaciente(async (data) => {
        try {

            const response = await axios.post('https://localhost:7106/api/bdtpaciente/post', data);

            setToastBody(`Paciente ${response.data.primerNombre} creado!`);
            setShowToast(true);

            setNumExp(response.data.numExpediente);

            reset();

        } catch (error) {

            setToastBody(`Error al crear el paciente: ${error}`);
            setShowToast(true);

        }
    });

    const onSubmitAntPersonales = handleSubmitAntPer(async (data) => {

        try {

            console.log(data);
            // const response = await axios.post('https://localhost:7106/api/bdtantecedentespersonales/post', data);

            // console.log(response.data);

            // setToastBody('Antecedente creado exitosamente!');
            // setShowToast(true);

        } catch (error) {

            setToastBody(`Error al crear Antecedente: ${error}`);
            setShowToast(true);

        }

    });

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showToast]);

    useEffect(() => {
        setValue('numExpediente', numExp);
      }, [numExp, setValue]);
    

    return (
        <>
            <div className="container-fluid mt-3">
                <p className="text-body-secondary text-small">Los datos con asterisco (*) son obligatorios</p>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true">Datos Generales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false">Antecedentes Personales</a>
                    </li>
                </ul>

                <div className="tab-content" id="myTabContent">
                    {/*Datos Generales - Paciente*/}
                    <div className="tab-pane fade show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitPaciente}>
                                <div className="row g-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerPaciente('numExpediente', { required: true, maxLength: 20 })}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="PrimerN" className="form-label">Primer nombre*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('primerNombre', { required: true, maxLength: 30 })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="SegundoN" className="form-label">Segundo nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('segundoNombre', { maxLength: 30 })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="P_apellido" className="form-label">Primer apellido*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El apellido debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('primerApellido', { required: true, maxLength: 30 })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="S_apellido" className="form-label">Segundo apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El apellido debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('segundoApellido', { required: true, maxLength: 30 })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cedula" className="form-label">Tipo de Identificación</label>
                                        <select className="form-select">
                                            <option value="">Seleccionar...</option>
                                            <option value="categoria1">Fecha de Nacimiento</option>
                                            <option value="categoria2">Cedula de Identificación</option>
                                            <option value="categoria3">Pasaporte</option>
                                        </select>
                                    </div>

                                    <div className="row g-3"></div>
                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Identificación</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="Insertar Identificacion"
                                            {...registerPaciente('cedula', { required: true, maxLength: 20 })}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="nacimiento" className="form-label">Fecha de nacimiento*</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaNac"
                                            {...registerPaciente('fechaNac', { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="edad" className="form-label">Edad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="Insertar Identificacion"
                                            {...registerPaciente('edad', { maxLength: 2 })}
                                        />
                                    </div>

                                    {/* <div className="col-sm-1">
                                        <label htmlFor="telefono" className="form-label">Teléfono*</label>
                                        <input type="text" maxLength="8" className="form-control" id="telefono" title="El número telefónico debe tener 8 digitos " required / />
                                    </div> */}

                                    <div className="col-sm-3">
                                        <label htmlFor="escolaridad" className="form-label">Escolaridad*</label>
                                        <select defaultValue="Bachiller" className="form-select" id="escolaridad" {...registerPaciente("escolaridad", { required: true })}>
                                            <option value="Bachiller">Menu de Selección</option>
                                            <option value="Bachiller">Bachiller</option>
                                            <option value="Primaria completa">Primaria completa</option>
                                            <option value="Primaria incompleta">Primaria incompleta</option>
                                            <option value="Secundaria incompleta">Secundaria incompleta</option>
                                            <option value="Técnico superior">Técnico superior</option>
                                            <option value="Universitario">Universitario</option>
                                        </select>

                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="profesion" className="form-label">Profesión*</label>
                                        <select defaultValue="Ama de casa" className="form-select" id="profesion" {...registerPaciente("profesion", { required: true })}>
                                            <option value="">Menu de Selección</option>
                                            <option value="1">Ama de casa</option>
                                            <option value="2">Estudiante</option>
                                            <option value="3">Oficinista</option>
                                            <option value="4">Operaria</option>
                                            <option value="5">Sector informal</option>
                                        </select>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="sexo" className="form-label">Sexo*</label>
                                        <div className="d-flex align-items-center justify-content-center gap-4 form-control">
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value="Femenino"
                                                    id="femenino"
                                                    {...registerPaciente("sexo", { required: true })}
                                                />
                                                <label className="form-check-label" htmlFor="femenino">F</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    type="radio"
                                                    className="form-check-input"
                                                    value="Masculino"
                                                    id="masculino"
                                                    {...registerPaciente("sexo", { required: true })}
                                                />
                                                <label className="form-check-label" htmlFor="masculino">M</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-7">
                                        <label htmlFor="direccion" className="form-label">Dirección</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="direccion"
                                            {...registerPaciente('direccion')}
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="departamento" className="form-label">Departamento*</label>
                                        <select defaultValue="Managua" className="form-select" id="departamento" {...registerPaciente("codDepartamento", { required: true })}>
                                            <option value="">Menú de selección</option>
                                            <option value="1">Chinandega</option>
                                            <option value="2">Leon</option>
                                            <option value="3">Managua</option>
                                            <option value="4">Masaya</option>
                                            <option value="5">Carazo</option>
                                            <option value="6">Granada</option>
                                            <option value="7">RIVAS</option>
                                            <option value="8">RIO SAN JUAN</option>
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

                                    <div className="col-sm-1">
                                        <label htmlFor="presion" className="form-label">Presión*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="presion"
                                            {...registerPaciente("presion", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="temperatura" className="form-label">Temperatura*</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            id="temperatura"
                                            step="0.01"
                                            placeholder="°C"
                                            {...registerPaciente("temperatura", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="peso" className="form-label">Peso*</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            id="peso"
                                            step="0.01"
                                            placeholder="Kg"
                                            {...registerPaciente("peso", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="talla" className="form-label">Talla*</label>
                                        <input
                                            type="number"
                                            min="0"
                                            className="form-control"
                                            id="talla"
                                            step="0.01"
                                            placeholder="Mtrs"
                                            {...registerPaciente("talla", { required: true })}
                                        />
                                    </div>

                                    {/* <div className="col-sm-1">
                                        <label htmlFor="IMC" className="form-label">IMC</label>
                                        <input className="form-control" type="text" maxLength="5" title="Este campo es de sólo lectura" / />
                                    </div> */}

                                    <div className="col-sm-2">
                                        <label htmlFor="fechaIngreso" className="form-label">Fecha de ingreso*</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaIngreso"
                                            {...registerPaciente("fechaIngreso", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="centros" className="form-label">Centro de Mujeres IXCHEN*</label>
                                        <select defaultValue="Managua" className="form-select" id="centro" {...registerPaciente("centro", { required: true })}>
                                            <option value="">Menú de selección</option>
                                            <option value="1">Managua</option>
                                            <option value="2">Ciudad Sandino</option>
                                            <option value="3">Villa Libertad</option>
                                            <option value="4">Tipitapa</option>
                                            <option value="5">Masaya</option>
                                            <option value="6">Granada</option>
                                            <option value="7">Matagalpa</option>
                                            <option value="8">Estelí</option>
                                            <option value="9">León</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="usuaria" className="form-label">Usuaria*</label>
                                        <div className="d-flex align-items-center justify-content-center gap-4 border form-control">
                                            <div className="form-check">
                                                <input
                                                    id="nueva"
                                                    value="Nueva"
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...registerPaciente('usuaria', { required: true })}
                                                />
                                                <label className="form-check-label" htmlFor="nueva">Nueva</label>
                                            </div>
                                            <div className="form-check">
                                                <input
                                                    id="subsecuente"
                                                    value="Subsecuente"
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...registerPaciente('usuaria', { required: true })}
                                                />
                                                <label className="form-check-label" htmlFor="subsecuente">Subsecuente</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                    <button className="btn btn-success btn-save me-md-2" type="submit" >Guardar</button>
                                    <button type="reset" className="btn btn-danger">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/*Antecedentes Personaels*/}
                    <div className="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitAntPersonales}>
                                <div className="row g-3">
                                <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={numExp} 
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerAntecPer('numExpediente', { required: true})}
                                            readOnly
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="p_menstruacion" className="form-label">Primera menstruación</label>
                                        <input 
                                            type="number" 
                                            min="8" 
                                            className="form-control" 
                                            id="p_menstruacion" 
                                            placeholder="PM en años"
                                            {...registerAntecPer('menstruacion')} 
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="vidasexual" className="form-label">Inicio vida sexual</label>
                                        <input 
                                            type="number" 
                                            min="1" 
                                            className="form-control" 
                                            id="vidasexual" 
                                            placeholder="IVS en años" 
                                            {...registerAntecPer('vidaSexual')}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Compa_S" className="form-label">Compañeros sexuales</label>
                                        <input 
                                            type="number"  
                                            min="0" 
                                            className="form-control" 
                                            id="Compa_S" 
                                            {...registerAntecPer('compSexuales')}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="MAC" className="form-label">MAC</label>

                                        <select defaultValue="Condón" className="form-select" id="MAC" {...registerAntecPer('mac')}>
                                            <option selected>Menú de selección</option>
                                            <option value="1">Condón</option>
                                            <option value="2">DIU - Nuevo</option>
                                            <option value="3">DIU - Subsecuente</option>
                                            <option value="4">Gestageno oral - Nuevo</option>
                                            <option value="5">Gestageno oral - Subsecuente</option>
                                            <option value="6">Implante C/P - Nuevo</option>
                                            <option value="7">Implante C/P - Subsecuente</option>
                                            <option value="8">Implante L/P - Nuevo</option>
                                            <option value="9">Implante L/P - Subsecuente</option>
                                            <option value="10">Inyec. Mensual - Nuevo</option>
                                            <option value="11">Inyec. Mensual - Subsecuente</option>
                                            <option value="12">Inyec. Trimes. - Nuevo</option>
                                            <option value="13">Inyec. Trimes. - Subsecuente</option>
                                            <option value="14">MINILAP</option>
                                            <option value="15">No planifica</option>
                                            <option value="16">Parche</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="embarazada" className="form-label">¿Has estado embarazada?*</label>
                                        <div className="form-check">
                                            <input 
                                                id="si" 
                                                value={true}
                                                name="embarazada" 
                                                type="radio" 
                                                className="form-check-input" 
                                                {...registerAntecPer('histEmbarazo', { required: true})}
                                            />
                                            <label className="form-check-label" htmlFor="si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                id="no" 
                                                name="embarazada" 
                                                value={false}
                                                type="radio" 
                                                className="form-check-input" 
                                                {...registerAntecPer('histEmbarazo')}
                                            />
                                            <label className="form-check-label" htmlFor="no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="gestas" className="form-label">Gestas</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="50" 
                                            className="form-control" 
                                            id="gestas" 
                                            {...registerAntecPer('gestas')}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="partos" className="form-label">Partos</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="50" 
                                            className="form-control" 
                                            id="partos" 
                                            {...registerAntecPer('partos')}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="abortos" className="form-label">Abortos</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="50" 
                                            className="form-control" 
                                            id="abortos" 
                                            {...registerAntecPer('abortos')}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="cesarea" className="form-label">Cesárea</label>
                                        <input 
                                            type="number" 
                                            min="0" 
                                            max="50" 
                                            className="form-control" 
                                            id="cesarea" 
                                            {...registerAntecPer('cesarea')}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="FUM" className="form-label">FUM*</label>
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            id="FUM" 
                                            {...registerAntecPer('fum', { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="SA" className="form-label">SA</label>
                                        <input 
                                            className="form-control" 
                                            type="text" 
                                            title="Este campo es de sólo lectura"
                                            {...registerAntecPer('sa')}
                                            />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="lactancia" className="form-label">Lactancia materna*</label>

                                        <div className="form-check">
                                            <input 
                                                id="lac_si" name="lactancia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="lac_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="lac_no" name="lactancia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="lac_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="esta_emb" className="form-label">¿Está embarazada?*</label>
                                        <div className="form-check">
                                            <input id="emb_si" name="esta_emb" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="emb_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="emb_no" name="esta_emb" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="emb_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="mamografia" className="form-label">¿Mamografía al día?*</label>
                                        <div className="form-check">
                                            <input id="mamografia_si" name="mamografia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="mamografia_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="mamografia_no" name="mamografia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="mamografia_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="pap_dia" className="form-label">¿PAP al día?*</label>
                                        <div className="form-check">
                                            <input id="pap_si" name="pap_dia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="pap_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="pap_no" name="pap_dia" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="pap_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="pap_alterado" className="form-label">¿PAP alterado?*</label>
                                        <div className="form-check">
                                            <input id="pap_alt_si" name="pap_alterado" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="pap_alt_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="pap_alt_no" name="pap_alterado" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="pap_alt_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="ult_pap" className="form-label">Último PAP</label>
                                        <input type="number" min="1" className="form-control" id="ult_pap" placeholder="Meses" />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="menopausia" className="form-label">Edad de Menopausia</label>
                                        <input type="number" min="40" className="form-control" id="menopausia" placeholder="Años" />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="TRH" className="form-label">¿Terapia Reemplazo Hormonal?*</label>
                                        <div className="form-check">
                                            <input id="TRH_si" name="TRH" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="TRH_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="TRH_no" name="TRH" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="TRH_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="fuma" className="form-label">¿Fuma?*</label>
                                        <div className="form-check">
                                            <input id="fuma_si" name="fuma" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="fuma_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="fuma_no" name="fuma" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="fuma_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cigarros" className="form-label">Cantidad de cigarros por día</label>
                                        <input type="number" min="1" className="form-control" id="cigarros" />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="compania" className="form-label">¿Actualmente está sola o acompañada?*</label>
                                        <div className="form-check">
                                            <input id="sola" name="compania" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="sola">Sola</label>
                                        </div>
                                        <div className="form-check">
                                            <input id="acompaniada" name="compania" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="acompaniada">Acompañada</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="F_hijo" className="form-label">Fecha Nac. último hijo</label>
                                        <input type="date" className="form-control" id="F_hijo" />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="crioterapia" className="form-label">Crioterapia</label>
                                        <input type="text" maxLength="15" className="form-control" id="crioterapia" />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Biopsias" className="form-label">Biopsias por colposcopia</label>
                                        <input type="text" maxLength="15" className="form-control" id="Biopsias" />
                                    </div>

                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                    <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                                    <button type="reset" className="btn btn-danger">Cancelar</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <Toast isOpen={showToast} className="position-fixed top-0 end-0 m-3">
                    <ToastHeader toggle={() => setShowToast(false)}>Notificación</ToastHeader>
                    <ToastBody>{toastBody}</ToastBody>
                </Toast>
            </div>
        </>
    )
}
