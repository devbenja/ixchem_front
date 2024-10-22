import { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useForm } from "react-hook-form";

import { notification } from 'antd';

import { baseURL } from '../../../api/apiURL.js';

export const AgregarHistoria = () => {

    //const { register: registerPaciente, handleSubmit: handleSubmitPaciente, reset } = useForm();
    const { register: registerPaciente, handleSubmit: handleSubmitPaciente, setValue: setValuePaciente, watch: watchPaciente, reset } = useForm();
    const { register: registerAntecPer, handleSubmit: handleSubmitAntPer, setValue, watch, reset: resetAntecPer } = useForm();
    const { register: registerAntecPerPat, handleSubmit: handleSubmitAntPerPat, setValue: setValueAntPer, reset: resetAntPerPat } = useForm();
    const { register: registerAntecPatFam, handleSubmit: handleSubmitAntecPatFam, setValue: setValueAntPatFam, reset: resetAntPatFam } = useForm();
    const { register: registerInformacion, handleSubmit: handleSubmitInformacion, setValue: setValueInfo, reset:  resetInfo } = useForm();

    const [numExp, setNumExp] = useState('');

    const refPaciente = useRef(null);
    const refAntPer = useRef(null);
    const refAntPerPat = useRef(null);
    const refAntPatFam = useRef(null);
    const refInfo = useRef(null);

    const [isHerited, setIsHerited] = useState(false);
    const fuma = watch('fuma'); // Obtenemos el valor actual de "fuma"

    const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    
    const [tipoIdentificacion, setTipoIdentificacion] = useState("");
    const [identificacion, setIdentificacion] = useState("");

    // Manejar el cambio de tipo de identificación
    const handleTipoIdentificacionChange = (e) => {
        
        // Uso viejo del codigo
        // setTipoIdentificacion(e.target.value);
        // setIdentificacion("");

        const tipo = e.target.value;
        setTipoIdentificacion(tipo);

        // Si el tipo de identificación es "Fecha de Nacimiento", actualiza automáticamente
        if (tipo === "categoria1") {
            const fechaNacimiento = watchPaciente('fechaNac');
            if (fechaNacimiento) {
                const [year, month, day] = fechaNacimiento.split("-");
                const formattedDate = `${day}-${month}-${year}`;
                setIdentificacion(formattedDate); // Actualiza visualmente
                setValuePaciente('cedula', formattedDate); // Almacena el valor en el campo de texto
            }
        } else {
            setIdentificacion(""); // Limpia el campo si se selecciona otro tipo
            setValuePaciente('cedula', ""); // Limpia el valor en el formulario
        }
    };

    // useEffect para observar cambios en la fecha de nacimiento si el tipo de identificación es "Fecha de Nacimiento"
    useEffect(() => {
        // Si el tipo de identificación es "Fecha de Nacimiento", actualiza el campo de identificación
        if (tipoIdentificacion === "categoria1") {
            const fechaNacimiento = watchPaciente('fechaNac'); // Obtenemos la fecha de nacimiento
            if (fechaNacimiento) {
                const [year, month, day] = fechaNacimiento.split("-");
                const formattedDate = `${day}-${month}-${year}`;
                setIdentificacion(formattedDate); // Actualizar el campo de identificación
                setValuePaciente('cedula', formattedDate); // Almacena el valor actualizado en el campo de texto
            }
        }
    }, [watchPaciente('fechaNac'), tipoIdentificacion]); // Escuchar cambios en la fecha de nacimiento y el tipo de identificación

    const handleIdentificacionChange = (e) => {

        if (!tipoIdentificacion) {
            // Notificación si no se ha seleccionado el tipo de identificación
            notification.error({
                message: "Error",
                description: "Debe seleccionar un tipo de identificación antes de llenar el campo 'Identificación'.",
                duration: 3,
            });
            return;
        }

        let valor = e.target.value;   

        if (tipoIdentificacion === "categoria1") {
            valor = valor.replace(/[^0-9]/g, ""); // Eliminar cualquier carácter no numérico
            // Validar día (primer dos dígitos)
            const dia = parseInt(valor.slice(0, 2), 10);
            if (dia > 31 ) {
                valor = ""; // Restablecer si el día no está en el rango permitido
            } else {
                // Validar mes (siguientes dos dígitos)
                const mes = parseInt(valor.slice(2, 4), 10);
                if (mes > 12 ) {
                    valor = valor.slice(0, 2); // Mantener solo el día si el mes no es válido
                } else {
                    // Validar año (últimos cuatro dígitos)
                    const anio = valor.slice(4, 8);
                    if (anio === "0000") {
                        valor = valor.slice(0, 4); // Mantener solo el día y mes si el año no es válido
                    } else {
                        // Insertar guiones en las posiciones 3 y 5
                        if (valor.length > 2) valor = valor.slice(0, 2) + "-" + valor.slice(2);
                        if (valor.length > 5) valor = valor.slice(0, 5) + "-" + valor.slice(5);
                        if (valor.length > 10) valor = valor.slice(0, 10); // Limitar la longitud a 10 caracteres (dd-mm-yyyy)
                    }
                }
            }
        } else if (tipoIdentificacion === "categoria2") {
            valor = valor.replace(/[^0-9A-Za-z]/g, ""); // Eliminar caracteres que no sean números o letras
            if (valor.length > 3) valor = valor.slice(0, 3) + "-" + valor.slice(3);
            if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
            if (valor.length > 15) {
                let letra = valor.slice(15, 16).toUpperCase(); // Obtener y convertir la letra a mayúscula
                if (/[^A-Z]/.test(letra)) { // Verificar si no es una letra del abecedario
                    letra = ""; // Si no es válida, eliminarla
                }
                valor = valor.slice(0, 15) + letra; // Insertar la letra validada
            }
            if (valor.length > 16) valor = valor.slice(0, 16); // Limitar la longitud a 16 caracteres
        } else if (tipoIdentificacion === "categoria3") {
            // Limitar la longitud a 30 caracteres no estamos seguros de cuántos tiene el pasaporte INVESTIGAR
            valor = valor.slice(0, 30);
        }     

        // if (tipoIdentificacion === "categoria1") {
        //     // Insertar guiones en las posiciones 3 y 5
        //     valor = valor.replace(/[^0-9]/g, ""); // La función me permite eliminar cualquier caracter no numerico
        //     if (valor.length > 2) valor = valor.slice(0, 2) + "-" + valor.slice(2);
        //     if (valor.length > 5) valor = valor.slice(0, 5) + "-" + valor.slice(5);
        //     if (valor.length > 10) valor = valor.slice(0, 10); // Limitar la longitud a 10 caracteres (dd-mm-yyyy)
        // } else if (tipoIdentificacion === "categoria2") {
        //     // Insertar guiones en las posiciones 4 y 11 y permitir una letra en la posición 16
        //     valor = valor.replace(/[^0-9A-Za-z]/g, ""); // Eliminar caracteres que no sean números o letras
        //     if (valor.length > 3) valor = valor.slice(0, 3) + "-" + valor.slice(3);
        //     if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
        //     if (valor.length > 15) {
        //         let letra = valor.slice(15, 16).toUpperCase(); // Obtengo y convierto la letra a mayúscula
        //         if (/[^A-Z]/.test(letra)) { // Verificar si no es una letra del abecedario
        //             letra = ""; // Si no es válida, eliminarla
        //         }
        //         valor = valor.slice(0, 15) + letra; // Insertar la letra validada
        //     }
        //     if (valor.length > 16) valor = valor.slice(0, 16); // Limitar la longitud a 16 caracteres
        // } else if (tipoIdentificacion === "categoria3") {
        //     // Limitar la longitud a 30 caracteres no estamos seguros de cuantos tiene el pasaporte INVESTIGAR
        //     valor = valor.slice(0, 30);
        // }

        setIdentificacion(valor);
    };

    //POST PACIENTE - DATOS PERSONALES
    const onSubmitPaciente = handleSubmitPaciente(async (data) => {

        if (!tipoIdentificacion) {
            // Notificación si no se ha seleccionado el tipo de identificación
            notification.error({
                message: "Error",
                description: "Debe seleccionar un tipo de identificación antes de llenar el campo 'Identificación'.",
                duration: 3,
            });
            return;
        }

        setIsSelectDisabled(true);
 
        try {
            const response = await axios.post(`${baseURL}/bdtpaciente/post`, data);
            const dataWithAge = {
                ...data,
                EDAD: 0
            };
            notification.success({
                message: '¡Éxito!',
                description: `Paciente ${response.data.primerNombre} creado!`,
                duration: 3
            });
            setNumExp(response.data.numExpediente);
            setIsHerited(true); // Marcar que el valor ha sido heredado
            reset();
            setTipoIdentificacion(''); // Limpia el tipo de identificación
            setIdentificacion(''); // Limpia el valor del campo de identificación
            if (refAntPer.current) {
                const tab = new window.bootstrap.Tab(refAntPer.current);
                tab.show();
            }
        } catch (error) {
            console.log(error);
            // Manejo del error y validación específica
            if (error.response && error.response.data && error.response.data.message) {
                notification.error({
                    message: 'Error al Crear Paciente',
                    description: error.response.data.message,
                    duration: 3
                });
            } else {
                notification.error({
                    message: 'Error al Crear Paciente',
                    description: 'El usuario con ese numero de expediente ya esta registrado, ingresar uno diferente',
                    duration: 3
                });
            }
        }
 
    });
    
    // POST ANTECEDENTES PERSONALES
    const onSubmitAntPersonales = handleSubmitAntPer(async (data) => {

        setIsSelectDisabled(true);

        try {

            const transformedData = {
                ...data,
                histEmbarazo: data.histEmbarazo === 'true',
                lactancia: data.lactancia === 'true',
                embarazo: data.embarazo === 'true',
                mamografia: data.mamografia === 'true',
                pap: data.pap === 'true',
                papAlterado: data.papAlterado === 'true',
                reempHormonal: data.reempHormonal === 'true',
                fuma: data.fuma === 'true',
                estadoPareja: data.estadoPareja === 'true',
                crioterapia: data.crioterapia === 'true',
                thermocuagulacion: data.thermocuagulacion === 'true',
                biopasis: data.biopasis === 'true',
                menstruacion: Number(data.menstruacion),
                vidaSexual: Number(data.vidaSexual),
                compSexuales: Number(data.compSexuales),
                gestas: Number(data.gestas),
                partos: Number(data.partos),
                abortos: Number(data.abortos),
                cesarea: Number(data.cesarea),
                sa: Number(data.sa),
                histPap: Number(data.histPap),
                menopausia: Number(data.menopausia),
                //cigarrosDia: Number(data.cigarrosDia),
                cigarrosDia: data.fuma === 'true' ? Number(data.cigarrosDia) : 0, // Usar 0 si no fuma
            };

            const response = await axios.post(`${baseURL}/bdtbantecedentespersonale/post`, transformedData);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Personal creado exitosamente!`,
                duration: 3
            });

            resetAntecPer();

            if (refAntPerPat.current) {
                const tab = new window.bootstrap.Tab(refAntPerPat.current);
                tab.show();
            }

        } catch (error) {

            notification.error({
                message: 'Error al Crear Antecedente',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    });

    // POST ANTECEDENTES PERSONALES PATERNALES
    const onSubmitAntPersonalesPat = handleSubmitAntPerPat(async (data) => {

        setIsSelectDisabled(true);

        try {

            const transformedData = {
                ...data,
                alergiaAli: data.alergiaAli === 'true',
                alergiaMed: data.alergiaMed === 'true',
                anemia: data.anemia === 'true',
                cacerut: data.cacerut === 'true',
                camDer: data.camDer === 'true',
                camIzq: data.camIzq === 'true',
                cardiopatia: data.cardiopatia === 'true',
                cirugias: data.cirugias === 'true',
                diabetes: data.diabetes === 'true',
                extirpacion: data.extirpacion === 'true',
                fibrodenoma: data.fibrodenoma === 'true',
                hepatopatias: data.hepatopatias === 'true',
                hipertension: data.hipertension === 'true',
                matriz: data.matriz === 'true',
                nefropatia: data.nefropatia === 'true',
                vif: data.vif === 'true',
                vih: data.vih === 'true',
            }

            console.log(transformedData);

            const response = await axios.post(`${baseURL}/bdtbaantecedentepatper/post`, transformedData)

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Paterno Personal creado!`,
                duration: 3
            });

            resetAntPerPat();

            if (refAntPatFam.current) {
                const tab = new window.bootstrap.Tab(refAntPatFam.current);
                tab.show();
            }

        } catch (error) {

            notification.error({
                message: 'Error al Crear Antecedente',
                description: `${error.response.data.message}`,
                duration: 3
            });
        }
    });

    // POST ANTECEDENTES PATOLOGICOS FAMILIARES
    const onSubmitAntPatFam = handleSubmitAntecPatFam(async (data) => {

        setIsSelectDisabled(true);

        try {

            console.log(data);

            const transformedData = {
                ...data,
                caColon: data.caColon === 'true',
                caCu: data.caCu === 'true',
                caMama: data.caMama === 'true',
                caOvario: data.caOvario === 'true',
                diabetes: data.diabetes === 'true',
                enfCardiacas: data.enfCardiacas === 'true',
                enfRenales: data.enfRenales === 'true',
                hepatitis: data.hepatitis === 'true',
                hipertension: data.hipertension === 'true',
            }

            console.log(transformedData);

            await axios.post(`${baseURL}/bdtbantecedentepatfam/post`, transformedData);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedente Patologico Fam creado!`,
                duration: 3
            });

            resetAntPatFam();

            if (refInfo.current) {
                const tab = new window.bootstrap.Tab(refInfo.current);
                tab.show();
            }

        } catch (error) {

            notification.error({
                message: 'Error al Crear Antecedente',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    });

    // POST INFORMACION
    const onSubmitInformacion = handleSubmitInformacion(async (data) => {

        setIsSelectDisabled(true);

        try {

            console.log(data);

            await axios.post(`${baseURL}/bdtbinformacion/post`, data);

            notification.success({
                message: '¡Éxito!',
                description: `Información creada!`,
                duration: 3
            });

            resetInfo(); //Reset de toda la información
            setNumExp(''); //Reset especificamente el ultimo campo de texto
            setIsHerited(false); //Reset del estado de herencia del valor

            if (refPaciente.current) {
                const tab = new window.bootstrap.Tab(refPaciente.current);
                tab.show();
            }

        } catch (error) {

            notification.error({
                message: 'Error al Crear Informacion',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    });


    // OBTIENE EL DATO NUMEXPEDIENTE DE DATOS PERSONALES PARA USARLO
    // EN ANTECEDENTES PERSONALES
    useEffect(() => {
        setValue('numExpediente', numExp);
    }, [numExp, setValue]);

    useEffect(() => {
        setValueAntPer('numExpediente', numExp);
    }, [numExp, setValueAntPer]);

    useEffect(() => {
        setValueAntPatFam('numExpediente', numExp);
    }, [numExp, setValueAntPatFam]);

    useEffect(() => {
        setValueInfo('numExpediente', numExp);
    }, [numExp, setValueInfo]);

    return (
        <>
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h4>Agregar Historia Clinica</h4>
                    <div className="d-flex gap-3">
                        <p className="text-body-secondary text-smaller">Los datos con asterisco (<span style={{color: 'red'}}> * </span>) son obligatorios,</p>
                        <p className="text-body-secondary text-smaller">A. = Antecedentes </p>
                    </div>
                </div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true" ref={refPaciente}>Paciente</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false" ref={refAntPer}>A. Personales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false" ref={refAntPerPat}>A. Patológicos Personales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="APF-tab" data-bs-toggle="tab" role="tab" href="#APF" aria-controls="APF" aria-selected="false" ref={refAntPatFam}>A. Patológicos Familiares</a>
                    </li>                   
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="Motivo-tab" data-bs-toggle="tab" role="tab" href="#Motivo" aria-controls="Motivo" aria-selected="false" ref={refInfo}>Información</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    {/*Datos Generales - Paciente*/}
                    <div className="tab-pane show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitPaciente}>
                                <div className="row g-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span> 
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerPaciente('numExpediente', { required: true, maxLength: 20 })}
                                            onChange={(e) => {
                                                setIsHerited(false); // Permite editar si se cambia manualmente
                                            }}
                                        />
                                    </div>

                                    {/* <div className="col-sm-2">
                                        <label htmlFor="PrimerN" className="form-label">Primer nombre<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('primerNombre', { required: "El primer nombre es obligatorio", maxLength: 30 })}
                                        />
                                    </div> */}

                                    <div className="col-sm-2">
                                        <label htmlFor="PrimerN" className="form-label">Primer nombre<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
                                            {...registerPaciente('primerNombre', { required: "El primer nombre es obligatorio", maxLength: 30 })}
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
                                        <label htmlFor="P_apellido" className="form-label">Primer apellido<span style={{color: 'red'}}> * </span>
                                        </label>
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
                                        <label htmlFor="sexo" className="form-label">Sexo<span style={{color: 'red'}}> * </span>
                                        </label>
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

                                    <div className="col-sm-2">
                                        <label htmlFor="nacimiento" className="form-label">Fecha de nacimiento<span style={{color: 'red'}}> * </span> 
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            title="Fecha de nacimiento"
                                            id="fechaNac"
                                            {...registerPaciente('fechaNac', { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cedula" className="form-label">Tipo de Identificación <span style={{color: 'red'}}> * </span> </label>
                                        <select className="form-select" value={tipoIdentificacion} onChange={handleTipoIdentificacionChange}>
                                            <option value="">Seleccionar...</option>
                                            <option value="categoria1">Fecha de Nacimiento</option>
                                            <option value="categoria2">Cedula de Identificación</option>
                                            <option value="categoria3">Pasaporte</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Identificación<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            title="Selecciona el tipo de identificación para llenar este campo"
                                            value={identificacion}
                                            {...registerPaciente('cedula', { required: true, maxLength: 20 })}
                                            onChange={handleIdentificacionChange} // Me permite hacer el cambio y la validación
                                            disabled={tipoIdentificacion === "categoria1" || !tipoIdentificacion} // Deshabilitar si no se ha seleccionado el tipo de identificación
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="escolaridad" className="form-label">Escolaridad<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <select defaultValue="Menu de Selección" className="form-select" id="escolaridad" {...registerPaciente("escolaridad", { required: true })}>
                                            <option value="">Menu de Selección</option>
                                            <option value="Primaria completa">Primaria completa</option>
                                            <option value="Primaria incompleta">Primaria incompleta</option>
                                            <option value="Bachiller">Bachiller</option>
                                            <option value="Secundaria incompleta">Secundaria incompleta</option>
                                            <option value="Técnico superior">Técnico superior</option>
                                            <option value="Universitario">Universitario</option>
                                            <option value="Otros">Otros</option>
                                        </select>

                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="profesion" className="form-label">Profesión<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <select defaultValue="Menu de Selección" className="form-select" id="profesion" {...registerPaciente("profesion", { required: true })}>
                                            <option value="">Menu de Selección</option>
                                            <option value="Estudiante">Estudiante</option>
                                            <option value="Administrador(a)">Adminitrador(a)</option>
                                            <option value="Ama de casa">Ama de casa</option>
                                            <option value="Arquitecto(a)">Arquitecto(a)</option>
                                            <option value="Cocinero(a)">Cocinero(a)</option>
                                            <option value="Contador(a)">Contador(a)</option>
                                            <option value="Docente">Docente</option>
                                            <option value="Doctor(a)">Doctor(a)</option>
                                            <option value="Enfermero(a)">Enfermero(a)</option>
                                            <option value="Ingeniero(a)">Ingeniero(a)</option>
                                            <option value="Licenciado(a)">Licenciado(a)</option>
                                            <option value="Oficinista">Oficinista</option>
                                            <option value="Operaria">Operaria</option>
                                            <option value="Recepcionista">Recepcionista</option>
                                            <option value="Secretario(a)">Secretario(a)</option>
                                            <option value="Sector informal">Sector informal</option>
                                            <option value="Sector informal">Sector formal</option>
                                            <option value="Otros">Otros</option>
                                        </select>

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
                                        <label htmlFor="departamento" className="form-label">Departamento<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <select defaultValue="Managua" className="form-select" id="departamento" {...registerPaciente("codDepartamento", { required: true })}>
                                            <option value="">Menú de selección</option>
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

                                    <div className="col-sm-1">
                                        <label htmlFor="presion" className="form-label">
                                            Presión<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="presion"
                                            placeholder="mm/Hg"
                                            {...registerPaciente("presion", { required: true })}
                                            onKeyPress={(e) => {
                                                const charCode = e.charCode;

                                                if (!(charCode >= 48 && charCode <= 57) && charCode !== 47) {
                                                    e.preventDefault(); // Evita que se ingresen otros caracteres
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* <div className="col-sm-1">
                                        <label htmlFor="presion" className="form-label">Presión<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="presion"
                                            placeholder="mm/Hg"
                                            {...registerPaciente("presion", { required: true })}
                                        />
                                    </div> */}

                                    <div className="col-sm-1">
                                        <label htmlFor="temperatura" className="form-label">Temperatura<span style={{color: 'red'}}>* </span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            id="temperatura"
                                            step="0.01"
                                            placeholder="°C"
                                            {...registerPaciente("temperatura", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="peso" className="form-label">Peso<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            id="peso"
                                            step="0.01"
                                            placeholder="Kg"
                                            {...registerPaciente("peso", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="talla" className="form-label">Talla<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
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
                                        <label htmlFor="fechaIngreso" className="form-label">Fecha de ingreso<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="fechaIngreso"
                                            {...registerPaciente("fechaIngreso", { required: true })}
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="centros" className="form-label">Centro de Mujeres IXCHEN<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <select defaultValue="Menú de selección" className="form-select" id="centro" {...registerPaciente("centro", { required: true })}>
                                            <option value="">Menú de selección</option>
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

                                    <div className="col-sm-3">
                                        <label htmlFor="usuaria" className="form-label">Usuaria(o)<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="d-flex align-items-center justify-content-center gap-4 border form-control">
                                            <div className="form-check">
                                                <input
                                                    id="nueva"
                                                    value="Nueva"
                                                    type="radio"
                                                    className="form-check-input"
                                                    {...registerPaciente('usuaria', { required: true })}
                                                />
                                                <label className="form-check-label" htmlFor="nueva">Nueva(o)</label>
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

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <button className="btn btn-success btn-save me-md-2" type="submit" >Guardar</button>
                                    <button type="reset" className="btn btn-danger">Cancelar</button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/*Antecedentes Personales*/}
                    <div className="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitAntPersonales}>
                                <div className="row g-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={numExp}
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerAntecPer('numExpediente')}
                                            //readOnly
                                            readOnly={isHerited} // Solo es de solo lectura si se ha heredado
                                            onChange={(e) => {
                                                if (!isHerited) {
                                                    setNumExp(e.target.value); // Permite editar si no se ha heredado
                                                }
                                            }}
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

                                        <select defaultValue="Menú de selección" className="form-select" id="MAC" {...registerAntecPer('mac')}>
                                            <option value="No planifica">Menú de selección</option>
                                            
                                            <option value="No planifica">No planifica</option>
                                            <option value="Condón">Condón</option>
                                            <option value="DIU - Nuevo">DIU - Nuevo</option>
                                            <option value="DIU - Subsecuente">DIU - Subsecuente</option>
                                            <option value="Gestageno oral - Nuevo">Gestageno oral - Nuevo</option>
                                            <option value="Gestageno oral - Subsecuente">Gestageno oral - Subsecuente</option>
                                            <option value="Implante C/P - Nuevo">Implante C/P - Nuevo</option>
                                            <option value="Implante C/P - Subsecuente">Implante C/P - Subsecuente</option>
                                            <option value="Implante L/P - Nuevo">Implante L/P - Nuevo</option>
                                            <option value="Implante L/P - Subsecuente">Implante L/P - Subsecuente</option>
                                            <option value="Inyec. Mensual - Nuevo">Inyec. Mensual - Nuevo</option>
                                            <option value="Inyec. Mensual - Subsecuente">Inyec. Mensual - Subsecuente</option>
                                            <option value="Inyec. Trimes. - Nuevo">Inyec. Trimes. - Nuevo</option>
                                            <option value="Inyec. Trimes. - Subsecuente">Inyec. Trimes. - Subsecuente</option>
                                            <option value="MINILAP">MINILAP</option>
                                            <option value="Parche">Parche</option>
                                            <option value="Otros">Otros</option>
                                        </select>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="embarazada" className="form-label">¿Has estado embarazada?<span style={{color: 'red'}}>* </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="si"
                                                value="true"
                                                name="embarazada"
                                                type="radio"
                                                className="form-check-input"
                                                {...registerAntecPer('histEmbarazo', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="no"
                                                name="embarazada"
                                                value="false"
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
                                        <label htmlFor="FUM" className="form-label">FUM</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="FUM"
                                            {...registerAntecPer('fum')}
                                        />
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="SA" className="form-label">SA</label>
                                        <input
                                            className="form-control"
                                            type="number"
                                            title="Este campo es de sólo lectura"
                                            {...registerAntecPer('sa')}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="lactancia" className="form-label">Lactancia materna<span style={{color: 'red'}}> * </span> 
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="lac_si"
                                                name="lactancia"
                                                type="radio"
                                                value={true}
                                                className="form-check-input"
                                                {...registerAntecPer('lactancia', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="lac_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="lac_no"
                                                name="lactancia"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('lactancia', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="lac_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="esta_emb" className="form-label">¿Está embarazada?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="emb_si"
                                                name="esta_emb"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('embarazo', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="emb_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="emb_no"
                                                name="esta_emb"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('embarazo', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="emb_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="mamografia" className="form-label">¿Mamografía al día?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="mamografia_si"
                                                name="mamografia"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('mamografia', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="mamografia_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="mamografia_no"
                                                name="mamografia"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('mamografia', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="mamografia_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="pap_dia" className="form-label">¿PAP al día?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="pap_si"
                                                name="pap_dia"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('pap', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="pap_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="pap_no"
                                                name="pap_dia"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('pap', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="pap_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="pap_alterado" className="form-label">¿PAP alterado?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="pap_alt_si"
                                                name="pap_alterado"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('papAlterado', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="pap_alt_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="pap_alt_no"
                                                name="pap_alterado"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('papAlterado', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="pap_alt_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-1">
                                        <label htmlFor="ult_pap" className="form-label">Último PAP</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            id="ult_pap"
                                            placeholder="Meses"
                                            {...registerAntecPer('histPap')}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="menopausia" className="form-label">Edad de Menopausia</label>
                                        <input
                                            type="number"
                                            min="40"
                                            className="form-control"
                                            id="menopausia" placeholder="Años"
                                            {...registerAntecPer('menopausia')}
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="TRH" className="form-label">¿Terapia Reemplazo Hormonal?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="TRH_si"
                                                name="TRH"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('reempHormonal', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="TRH_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="TRH_no"
                                                name="TRH"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('reempHormonal', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="TRH_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="fuma" className="form-label">¿Fuma?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="fuma_si"
                                                name="fuma"
                                                type="radio"
                                                className="form-check-input"
                                                //value={true}
                                                value="true"
                                                {...registerAntecPer('fuma', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="fuma_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="fuma_no"
                                                name="fuma"
                                                type="radio"
                                                className="form-check-input"
                                                //value={false}
                                                value="false"
                                                {...registerAntecPer('fuma', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="fuma_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cigarros" className="form-label">Cantidad de cigarros por día</label>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            id="cigarros"
                                            disabled={fuma !== 'true'} // Habilitar solo si "fuma" es verdadero
                                            {...registerAntecPer('cigarrosDia')}
                                            defaultValue={0} // Valor por defecto 0 
                                        />
                                    </div>

                                    <div className="col-sm-3">
                                        <label htmlFor="compania" className="form-label">¿Actualmente está sola o acompañada?<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <div className="form-check">
                                            <input
                                                id="sola"
                                                name="compania"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('estadoPareja', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="sola">Sola(o)</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="acompaniada"
                                                name="compania"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('estadoPareja', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="acompaniada">Acompañada(o)</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="F_hijo" className="form-label">Fecha Nac. último hijo</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="F_hijo"
                                            {...registerAntecPer('fecNacHijo')}
                                        />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="crioterapia" className="form-label">Crioterapia</label>
                                        <div className="form-check">
                                            <input
                                                id="si"
                                                name="crioterapia"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('crioterapia')}
                                            />
                                            <label className="form-check-label" htmlFor="crioterapia">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="no"
                                                name="crioterapia"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('crioterapia')}
                                            />
                                            <label className="form-check-label" htmlFor="crioterapia">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="thermocuagulacion" className="form-label">Termocuagulación</label>
                                        <div className="form-check">
                                            <input
                                                id="si"
                                                name="thermocuagulacion"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('thermocuagulacion')}
                                            />
                                            <label className="form-check-label" htmlFor="thermocuagulacion">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="no"
                                                name="thermocuagulacion"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('thermocuagulacion')}
                                            />
                                            <label className="form-check-label" htmlFor="thermocuagulacion">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="biopasis" className="form-label">Biopsias por colposcopia<span style={{color: 'red'}}> * </span></label>
                                        <div className="form-check">
                                            <input
                                                id="si"
                                                name="biopasis"
                                                type="radio"
                                                className="form-check-input"
                                                value={true}
                                                {...registerAntecPer('biopasis', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="biopasis">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                id="no"
                                                name="biopasis"
                                                type="radio"
                                                className="form-check-input"
                                                value={false}
                                                {...registerAntecPer('biopasis', { required: true })}
                                            />
                                            <label className="form-check-label" htmlFor="biopasis">No</label>
                                        </div>
                                    </div>

                                </div>
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                    <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
                                    {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
                                </div>
                            </form>
                        </div>

                    </div>

                    {/*Antecedentes Personales Paternales*/}
                    <div className="tab-pane fade" id="APP" role="tabpanel" aria-labelledby="APP-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitAntPersonalesPat}>
                                <div className="row g-4">
                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={numExp}
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerAntecPerPat('numExpediente')}
                                            //readOnly
                                            readOnly={isHerited} // Solo es de solo lectura si se ha heredado
                                            onChange={(e) => {
                                                if (!isHerited) {
                                                    setNumExp(e.target.value); // Permite editar si no se ha heredado
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-sm-2">
                                        <label htmlFor="fibroadenoma" className="form-label">Fibroadenoma<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('fibrodenoma', { required: true })} id="fibro_si" name="fibrodenoma" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="fibro_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('fibrodenoma', { required: true })} id="fibro_no" name="fibrodenoma" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="fibro_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_mama_izq" className="form-label">Ca Mama Izq<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('camIzq', { required: true })} id="Ca_mama_izq_si" name="camIzq" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_mama_izq_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('camIzq', { required: true })} id="Ca_mama_izq_no" name="camIzq" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_mama_izq_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_mama_der" className="form-label">Ca Mama Der<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('camDer', { required: true })} id="Ca_mama_der_si" name="camDer" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_mama_der_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('camDer', { required: true })} id="Ca_mama_der_no" name="camDer" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_mama_der_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_cervico_uterino" className="form-label">Ca Cervico Uterino<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('cacerut', { required: true })} id="Ca_cervico_uterino_si" name="cacerut" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_cervico_uterino_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('cacerut', { required: true })} id="Ca_cervico_uterino_no" name="cacerut" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="Ca_cervico_uterino_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="matriz" className="form-label">¿Conserva su Útero?</label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('matriz', { required: true })} id="matriz_si" name="matriz" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="matriz_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('matriz', { required: true })} id="matriz_no" name="matriz" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="matriz_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="extirpacion" className="form-label">Extirpación Qx Ovario<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('extirpacion', { required: true })} id="extirpacion_si" name="extirpacion" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="extirpacion_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('extirpacion', { required: true })} id="extirpacion_no" name="extirpacion" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="extirpacion_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="ITS" className="form-label">ITS</label>

                                        <select {...registerAntecPerPat('its', { required: true })} defaultValue={"Ninguna"} className="form-select" id="its">
                                            <option value="">Menú de selección</option>
                                            <option value="Ninguna">Ninguna</option>
                                            <option value="Clamidia">Clamidia</option>
                                            <option value="Condilomas">Condilomas</option>
                                            <option value="Garnerela Vaginal">Garnerela Vaginal</option>
                                            <option value="Gonorrea">Gonorrea</option>
                                            <option value="Herpes">Herpes</option>
                                            <option value="Monilias">Monilias</option>
                                            <option value="VIH-SIDA">VIH-SIDA</option>
                                            <option value="Sifilis">Sifilis</option>
                                            <option value="Tricomonas">Tricomonas</option>
                                            <option value="Otras">Otras</option>
                                        </select>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="VIH" className="form-label">VIH<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('vih', { required: true })} id="VIH_si" name="vih" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="VIH_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('vih', { required: true })} id="VIH_no" name="vih" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="VIH_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="VIF" className="form-label">Violencia Intrafamiliar</label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('vif', { required: true })} id="VIF_si" name="vif" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="VIF_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('vif', { required: true })} id="VIF_no" name="vif" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="VIF_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="diabetes" className="form-label">Diabetes<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('diabetes', { required: true })} id="diabetes_si" name="diabetes" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="diabetes_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('diabetes', { required: true })} id="diabetes_no" name="diabetes" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="diabetes_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cardiopatia" className="form-label">Cardiopatía<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('cardiopatia', { required: true })} id="cardiopatia_si" name="cardiopatia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="cardiopatia_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('cardiopatia', { required: true })} id="cardiopatia_no" name="cardiopatia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="cardiopatia_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="hipertension" className="form-label">Hipertensión<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('hipertension', { required: true })} id="hipertension_si" name="hipertension" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="hipertension_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('hipertension', { required: true })} id="hipertension_no" name="hipertension" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="hipertension_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="hepatopatias" className="form-label">Hepatopatías<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('hepatopatias', { required: true })} id="hepatopatias_si" name="hepatopatias" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="hepatopatias_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('hepatopatias', { required: true })} id="hepatopatias_no" name="hepatopatias" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="hepatopatias_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="nefropatias" className="form-label">Nefropatías<span style={{color: 'red'}}> * </span> 
                                        </label>
                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('nefropatia', { required: true })} id="nefropatias_si" name="nefropatia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="nefropatias_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('nefropatia', { required: true })} id="nefropatias_no" name="nefropatia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="nefropatias_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="cirugias" className="form-label">Cirugías<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('cirugias', { required: true })} id="cirugias_si" name="cirugias" type="radio" className="form-check-input" />
                                                <label className="form-check-label" htmlFor="cirugias_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('cirugias', { required: true })} id="cirugias_no" name="cirugias" type="radio" className="form-check-input" />
                                                <label className="form-check-label" htmlFor="cirugias_no">No</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="anemia" className="form-label">Anemia<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('anemia', { required: true })} id="anemia_si" name="anemia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="anemia_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('anemia', { required: true })} id="anemia_no" name="anemia" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="anemia_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="alergia_medi" className="form-label">Alergia Medicamentos</label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('alergiaMed', { required: true })} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="alergia_medi_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('alergiaMed', { required: true })} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="alergia_medi_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="alergia_ali" className="form-label">Alergia Alimentos<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                                            <div className="form-check">
                                                <input value={true} {...registerAntecPerPat('alergiaAli', { required: true })} id="alergia_ali_si" name="alergiaAli" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="alergia_ali_si">Si</label>
                                            </div>
                                            <div className="form-check">
                                                <input value={false} {...registerAntecPerPat('alergiaAli', { required: true })} id="alergia_ali_no" name="alergiaAli" type="radio" className="form-check-input" required />
                                                <label className="form-check-label" htmlFor="alergia_ali_no">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div className="col-sm-12">
                                        <label htmlFor="Observaciones" className="form-label">Observaciones</label>
                                        <input type="text" maxLength="140" className="form-control" id="Observaciones" />
                                    </div> */}

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                        <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
                                        {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
                                        {/* Botón para marcar todos como 'Sí' */}
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor: '#0039fa', /* Azul */
                                                color: 'white',
                                                fontWeight: 'bold',
                                                border: '2px solid #092faf', /* Azul más oscuro */
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#092faf'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0039fa'}
                                            onClick={() => {
                                                setValueAntPer('fibrodenoma', 'true');
                                                setValueAntPer('camIzq', 'true');
                                                setValueAntPer('camDer', 'true');
                                                setValueAntPer('cacerut', 'true');
                                                setValueAntPer('matriz', 'true');
                                                setValueAntPer('extirpacion', 'true');
                                                setValueAntPer('vih', 'true');
                                                setValueAntPer('vif', 'true');
                                                setValueAntPer('diabetes', 'true');
                                                setValueAntPer('fibrodenoma', 'true');
                                                setValueAntPer('camIzq', 'true');
                                                setValueAntPer('camDer', 'true');
                                                setValueAntPer('cacerut', 'true');
                                                setValueAntPer('matriz', 'true');
                                                setValueAntPer('extirpacion', 'true');
                                                setValueAntPer('vih', 'true');
                                                setValueAntPer('vif', 'true');
                                                setValueAntPer('diabetes', 'true');
                                                setValueAntPer('cardiopatia', 'true');
                                                setValueAntPer('hipertension', 'true');
                                                setValueAntPer('hepatopatias', 'true');
                                                setValueAntPer('nefropatia', 'true');
                                                setValueAntPer('cirugias', 'true');
                                                setValueAntPer('anemia', 'true');
                                                setValueAntPer('alergiaMed', 'true');
                                                setValueAntPer('alergiaAli', 'true');
                                            }}
                                            >
                                            Marcar Todos Sí
                                        </button>
                                            {/* Botón para marcar todos como 'No' */}
                                            <button
                                            type="button"
                                            style={{
                                                backgroundColor: '#dc3545', /* Rojo */
                                                color: 'white',
                                                fontWeight: 'bold',
                                                border: '2px solid #c82333', /* Rojo más oscuro */
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                            onClick={() => {
                                                setValueAntPer('fibrodenoma', 'false');
                                                setValueAntPer('camIzq', 'false');
                                                setValueAntPer('camDer', 'false');
                                                setValueAntPer('cacerut', 'false');
                                                setValueAntPer('matriz', 'false');
                                                setValueAntPer('extirpacion', 'false');
                                                setValueAntPer('vih', 'false');
                                                setValueAntPer('vif', 'false');
                                                setValueAntPer('diabetes', 'false');
                                                setValueAntPer('cardiopatia', 'false');
                                                setValueAntPer('hipertension', 'false');
                                                setValueAntPer('hepatopatias', 'false');
                                                setValueAntPer('nefropatia', 'false');
                                                setValueAntPer('cirugias', 'false');
                                                setValueAntPer('anemia', 'false');
                                                setValueAntPer('alergiaMed', 'false');
                                                setValueAntPer('alergiaAli', 'false');
                                            }}
                                            >
                                            Marcar Todos No
                                        </button>
                                    </div>

                                    
                                </div>
                            </form>
                        </div>
                    </div>
                    {/*Antecedentes Patologicos Familiares*/}
                    <div className="tab-pane fade" id="APF" role="tabpanel" aria-labelledby="APF-tab">
                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitAntPatFam}>
                                <div className="row g-3">
                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_de_Mama" className="form-label">Ca de Mama<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('caMama', { required: true })} id="Ca_de_Mama_si" name="caMama" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_de_Mama_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('caMama', { required: true })} id="Ca_de_Mama_no" name="caMama" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_de_Mama_no">No</label>
                                        </div>
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_ca_mama" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('camParentesco')} name="camParentesco" type="text" maxLength="20" className="form-control" id="parentesco_ca_mama" />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_de_colon" className="form-label">Ca de Colon<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('caColon', { required: true })} id="Ca_de_colon_si" name="caColon" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_de_colon_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('caColon', { required: true })} id="Ca_de_colon_no" name="caColon" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_de_colon_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_CA_Colon" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('cacoParentesco')} name="cacoParentesco" type="text" maxLength="20" className="form-control" id="parentesco_CA_Colon" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="APF_diabetes" className="form-label">Diabetes<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('diabetes', { required: true })} id="diabet_si" name="diabetes" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="diabet_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('diabetes', { required: true })} id="diabet_no" name="diabetes" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="diabet_no">No</label>
                                        </div>

                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_diabetes" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('diabetesParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_diabetes" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_CU" className="form-label">Ca de CU<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('caCu', { required: true })} id="Ca_CU_si" name="caCu" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_CU_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('caCu', { required: true })} id="Ca_CU_no" name="caCu" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_CU_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_Ca_CU" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('cacuParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Ca_CU" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="APF_hipertension" className="form-label">Hipertensión<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('hipertension', { required: true })} id="APF_hipertension_si" name="hipertension" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="APF_hipertension_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('hipertension', { required: true })} id="APF_hipertension_no" name="hipertension" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="APF_hipertension_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_hipert" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('hipertensionParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_hipert" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="Enf_card" className="form-label">Enf. Cardíacas<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('enfCardiacas', { required: true })} id="Enf_card_si" name="enfCardiacas" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Enf_card_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('enfCardiacas', { required: true })} id="Enf_card_no" name="enfCardiacas" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Enf_card_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_enf_card" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('enfcarParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_enf_card" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="Ca_ovario" className="form-label">Ca de Ovario<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('caOvario', { required: true })} id="Ca_ovario_si" name="caOvario" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_ovario_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('caOvario', { required: true })} id="Ca_ovario_no" name="caOvario" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Ca_ovario_no">No</label>
                                        </div>

                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_Ca_ovario" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('caovaParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Ca_ovario" />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="Hepatitis" className="form-label">Hepatitis<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('hepatitis', { required: true })} id="Hepatitis_si" name="hepatitis" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Hepatitis_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('hepatitis', { required: true })} id="Hepatitis_no" name="hepatitis" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Hepatitis_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_Hepatitis" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('hepatitisParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Hepatitis" />
                                    </div>


                                    <div className="col-sm-2">
                                        <label htmlFor="Enf_ren" className="form-label">Enf. Renales<span style={{color: 'red'}}> * </span>
                                        </label>

                                        <div className="form-check">
                                            <input value={true} {...registerAntecPatFam('enfRenales', { required: true })} id="Enf_ren_si" name="enfRenales" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Enf_ren_si">Si</label>
                                        </div>
                                        <div className="form-check">
                                            <input value={false} {...registerAntecPatFam('enfRenales', { required: true })} id="Enf_ren_no" name="enfRenales" type="radio" className="form-check-input" required />
                                            <label className="form-check-label" htmlFor="Enf_ren_no">No</label>
                                        </div>

                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="parentesco_Enf_ren" className="form-label">Parentesco</label>
                                        <input {...registerAntecPatFam('enfrenParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Enf_ren" />
                                    </div>

                                    <div className="col-sm-2">
                                        <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="numExpediente"
                                            value={numExp}
                                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                            {...registerAntecPatFam('numExpediente')}
                                            //readOnly
                                            readOnly={isHerited} // Solo es de solo lectura si se ha heredado
                                            onChange={(e) => {
                                                if (!isHerited) {
                                                    setNumExp(e.target.value); // Permite editar si no se ha heredado
                                                }
                                            }}
                                        />
                                    </div>


                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                        {/* <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button> */}
                                        <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
                                        <button
                                            type="button"
                                            style={{
                                                backgroundColor: '#0039fa', /* Azul */
                                                color: 'white',
                                                fontWeight: 'bold',
                                                border: '2px solid #092faf', /* Azul más oscuro */
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#092faf'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0039fa'}
                                            onClick={() => {
                                                setValueAntPatFam('caMama', 'true');
                                                setValueAntPatFam('caColon', 'true');
                                                setValueAntPatFam('diabetes', 'true');
                                                setValueAntPatFam('caCu', 'true');
                                                setValueAntPatFam('hipertension', 'true');
                                                setValueAntPatFam('enfCardiacas', 'true');
                                                setValueAntPatFam('caOvario', 'true');
                                                setValueAntPatFam('hepatitis', 'true');
                                                setValueAntPatFam('enfRenales', 'true');
                                            }}
                                            >
                                            Marcar Todos Sí
                                        </button>
                                            {/* Botón para marcar todos como 'No' */}
                                            <button
                                            type="button"
                                            style={{
                                                backgroundColor: '#dc3545', /* Rojo */
                                                color: 'white',
                                                fontWeight: 'bold',
                                                border: '2px solid #c82333', /* Rojo más oscuro */
                                                padding: '10px 20px',
                                                borderRadius: '5px',
                                                transition: 'background-color 0.3s ease'
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
                                            onClick={() => {
                                                setValueAntPatFam('caMama', 'false');
                                                setValueAntPatFam('caColon', 'false');
                                                setValueAntPatFam('diabetes', 'false');
                                                setValueAntPatFam('caCu', 'false');
                                                setValueAntPatFam('hipertension', 'false');
                                                setValueAntPatFam('enfCardiacas', 'false');
                                                setValueAntPatFam('caOvario', 'false');
                                                setValueAntPatFam('hepatitis', 'false');
                                                setValueAntPatFam('enfRenales', 'false');
                                            }}
                                            >
                                            Marcar Todos No
                                        </button>
                                        {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                    {/*Antecedente Obstetrico*/}
                    <div className="tab-pane fade" id="AO" role="tabpanel" aria-labelledby="AO-tab">

                    </div>
                    {/*Informacion*/}
                    <div className="tab-pane fade" id="Motivo" role="tabpanel" aria-labelledby="Motivo-tab">

                        <div className="container-fluid mt-3">
                            <form onSubmit={onSubmitInformacion}>
                                <div>
                                    <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={numExp}
                                        title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                                        {...registerInformacion('numExpediente')}
                                        //readOnly
                                        readOnly={isHerited} // Solo es de solo lectura si se ha heredado
                                            onChange={(e) => {
                                                if (!isHerited) {
                                                    setNumExp(e.target.value); // Permite editar si no se ha heredado
                                                }
                                            }}
                                    />
                                </div>

                                {/* <div className="mt-3">
                                    <label className="form-label" htmlFor="motivo_visita">
                                        Motivo de la visita<span style={{color: 'red'}}> * </span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="10"
                                        id="motivo_visita"
                                        {...registerInformacion('motVisita', { 
                                            required: true,
                                            onBlur: (e) => {
                                                if (!e.target.value.trim()) {
                                                    e.target.value = 'N/A'; // Establece 'N/A' si está vacío
                                                }
                                            }
                                        })}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="nota_med" className="form-label">Nota Médica</label>
                                    <textarea
                                        className="form-control"
                                        rows="10"
                                        id="nota_med"
                                        {...registerInformacion('notaMedica', { 
                                            required: true,
                                            onBlur: (e) => {
                                                if (!e.target.value.trim()) {
                                                    e.target.value = 'N/A'; // Establece 'N/A' si está vacío
                                                }
                                            }
                                        })}
                                    />
                                </div> */}

                                <div className="mt-3">
                                    <label className="form-label" htmlFor="motivo_visita">Motivo de la visita<span style={{color: 'red'}}> * </span>
                                    </label>
                                    <textarea
                                        className="form-control"
                                        rows="10"
                                        id="motivo_visita"

                                        {...registerInformacion('motVisita', { required: true })}
                                    >
                                    </textarea>
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="nota_med" className="form-label">Nota Médica</label>
                                    <textarea
                                        className="form-control"
                                        rows="10"
                                        id="nota_med"
                                        {...registerInformacion('notaMedica', { required: true })}
                                    >
                                    </textarea>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
                                    <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
                                    {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// import { useState, useEffect, useRef } from "react";

// import axios from "axios";
// import { useForm } from "react-hook-form";

// import { notification } from 'antd';

// import { baseURL } from '../../../api/apiURL.js';

// export const AgregarHistoria = () => {

//     //const { register: registerPaciente, handleSubmit: handleSubmitPaciente, reset } = useForm();
//     const { register: registerPaciente, handleSubmit: handleSubmitPaciente, setValue: setValuePaciente, watch: watchPaciente, reset } = useForm();
//     const { register: registerAntecPer, handleSubmit: handleSubmitAntPer, setValue, watch, reset: resetAntecPer } = useForm();
//     const { register: registerAntecPerPat, handleSubmit: handleSubmitAntPerPat, setValue: setValueAntPer, reset: resetAntPerPat } = useForm();
//     const { register: registerAntecPatFam, handleSubmit: handleSubmitAntecPatFam, setValue: setValueAntPatFam, reset: resetAntPatFam } = useForm();
//     const { register: registerInformacion, handleSubmit: handleSubmitInformacion, setValue: setValueInfo, reset:  resetInfo } = useForm();

//     const [numExp, setNumExp] = useState('');

//     const refPaciente = useRef(null);
//     const refAntPer = useRef(null);
//     const refAntPerPat = useRef(null);
//     const refAntPatFam = useRef(null);
//     const refInfo = useRef(null);

//     const [isHerited, setIsHerited] = useState(false);
//     const fuma = watch('fuma'); // Obtenemos el valor actual de "fuma"

//     const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    
//     const [tipoIdentificacion, setTipoIdentificacion] = useState("");
//     const [identificacion, setIdentificacion] = useState("");

//     // Manejar el cambio de tipo de identificación
//     const handleTipoIdentificacionChange = (e) => {
        
//         // Uso viejo del codigo
//         // setTipoIdentificacion(e.target.value);
//         // setIdentificacion("");

//         const tipo = e.target.value;
//         setTipoIdentificacion(tipo);

//         // Si el tipo de identificación es "Fecha de Nacimiento", actualiza automáticamente
//         if (tipo === "categoria1") {
//             const fechaNacimiento = watchPaciente('fechaNac');
//             if (fechaNacimiento) {
//                 const [year, month, day] = fechaNacimiento.split("-");
//                 const formattedDate = `${day}-${month}-${year}`;
//                 setIdentificacion(formattedDate); // Actualiza visualmente
//                 setValuePaciente('cedula', formattedDate); // Almacena el valor en el campo de texto
//             }
//         } else {
//             setIdentificacion(""); // Limpia el campo si se selecciona otro tipo
//             setValuePaciente('cedula', ""); // Limpia el valor en el formulario
//         }
//     };

//     // useEffect para observar cambios en la fecha de nacimiento si el tipo de identificación es "Fecha de Nacimiento"
//     useEffect(() => {
//         // Si el tipo de identificación es "Fecha de Nacimiento", actualiza el campo de identificación
//         if (tipoIdentificacion === "categoria1") {
//             const fechaNacimiento = watchPaciente('fechaNac'); // Obtenemos la fecha de nacimiento
//             if (fechaNacimiento) {
//                 const [year, month, day] = fechaNacimiento.split("-");
//                 const formattedDate = `${day}-${month}-${year}`;
//                 setIdentificacion(formattedDate); // Actualizar el campo de identificación
//                 setValuePaciente('cedula', formattedDate); // Almacena el valor actualizado en el campo de texto
//             }
//         }
//     }, [watchPaciente('fechaNac'), tipoIdentificacion]); // Escuchar cambios en la fecha de nacimiento y el tipo de identificación

//     const handleIdentificacionChange = (e) => {

//         if (!tipoIdentificacion) {
//             // Notificación si no se ha seleccionado el tipo de identificación
//             notification.error({
//                 message: "Error",
//                 description: "Debe seleccionar un tipo de identificación antes de llenar el campo 'Identificación'.",
//                 duration: 3,
//             });
//             return;
//         }

//         let valor = e.target.value;   

//         if (tipoIdentificacion === "categoria1") {
//             valor = valor.replace(/[^0-9]/g, ""); // Eliminar cualquier carácter no numérico
//             // Validar día (primer dos dígitos)
//             const dia = parseInt(valor.slice(0, 2), 10);
//             if (dia > 31 ) {
//                 valor = ""; // Restablecer si el día no está en el rango permitido
//             } else {
//                 // Validar mes (siguientes dos dígitos)
//                 const mes = parseInt(valor.slice(2, 4), 10);
//                 if (mes > 12 ) {
//                     valor = valor.slice(0, 2); // Mantener solo el día si el mes no es válido
//                 } else {
//                     // Validar año (últimos cuatro dígitos)
//                     const anio = valor.slice(4, 8);
//                     if (anio === "0000") {
//                         valor = valor.slice(0, 4); // Mantener solo el día y mes si el año no es válido
//                     } else {
//                         // Insertar guiones en las posiciones 3 y 5
//                         if (valor.length > 2) valor = valor.slice(0, 2) + "-" + valor.slice(2);
//                         if (valor.length > 5) valor = valor.slice(0, 5) + "-" + valor.slice(5);
//                         if (valor.length > 10) valor = valor.slice(0, 10); // Limitar la longitud a 10 caracteres (dd-mm-yyyy)
//                     }
//                 }
//             }
//         } else if (tipoIdentificacion === "categoria2") {
//             valor = valor.replace(/[^0-9A-Za-z]/g, ""); // Eliminar caracteres que no sean números o letras
//             if (valor.length > 3) valor = valor.slice(0, 3) + "-" + valor.slice(3);
//             if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
//             if (valor.length > 15) {
//                 let letra = valor.slice(15, 16).toUpperCase(); // Obtener y convertir la letra a mayúscula
//                 if (/[^A-Z]/.test(letra)) { // Verificar si no es una letra del abecedario
//                     letra = ""; // Si no es válida, eliminarla
//                 }
//                 valor = valor.slice(0, 15) + letra; // Insertar la letra validada
//             }
//             if (valor.length > 16) valor = valor.slice(0, 16); // Limitar la longitud a 16 caracteres
//         } else if (tipoIdentificacion === "categoria3") {
//             // Limitar la longitud a 30 caracteres no estamos seguros de cuántos tiene el pasaporte INVESTIGAR
//             valor = valor.slice(0, 30);
//         }     

//         setIdentificacion(valor);
//     };

//     //POST PACIENTE - DATOS PERSONALES

//     const onSubmitPaciente = handleSubmitPaciente(async (data) => {
//         if (!tipoIdentificacion) {
//             // Notificación si no se ha seleccionado el tipo de identificación
//             notification.error({
//                 message: "Error",
//                 description: "Debe seleccionar un tipo de identificación antes de llenar el campo 'Identificación'.",
//                 duration: 3,
//             });
//             return;
//         }
    
//         setIsSelectDisabled(true);
    
//         try {
//             const response = await axios.post(`${baseURL}/bdtpaciente/post`, data);
//             const dataWithAge = {
//                 ...data,
//                 EDAD: 0
//             };
    
//             // Notificación de éxito
//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Paciente ${response.data.primerNombre} creado!`,
//                 duration: 3
//             });
    
//             // Guardar el número de expediente y marcar valor heredado
//             setNumExp(response.data.numExpediente);
//             setIsHerited(true); // Marcar que el valor ha sido heredado
//             // reset(); // Limpia el formulario
//             // setTipoIdentificacion(''); // Limpia el tipo de identificación
//             // setIdentificacion(''); // Limpia el campo de identificación
    
//             if (refAntPer.current) {
//                 const tab = new window.bootstrap.Tab(refAntPer.current);
//                 tab.show();
//             }
    
//             // Mostrar el botón de editar después de crear al paciente
//             setShowEditButton(true); // Estado para mostrar el botón de editar
    
//         } catch (error) {
//             console.log(error);
//             // Manejo del error y validación específica
//             if (error.response && error.response.data && error.response.data.message) {
//                 notification.error({
//                     message: 'Error al Crear Paciente',
//                     description: error.response.data.message,
//                     duration: 3
//                 });
//             } else {
//                 notification.error({
//                     message: 'Error al Crear Paciente',
//                     description: 'El usuario con ese número de expediente ya está registrado, ingresar uno diferente',
//                     duration: 3
//                 });
//             }
//         }
//     });

//     // Estado para controlar la visibilidad del botón de editar
//     const [showEditButton, setShowEditButton] = useState(false);

//     // const onSubmitPaciente = handleSubmitPaciente(async (data) => {

//     //     if (!tipoIdentificacion) {
//     //         // Notificación si no se ha seleccionado el tipo de identificación
//     //         notification.error({
//     //             message: "Error",
//     //             description: "Debe seleccionar un tipo de identificación antes de llenar el campo 'Identificación'.",
//     //             duration: 3,
//     //         });
//     //         return;
//     //     }

//     //     setIsSelectDisabled(true);
 
//     //     try {
//     //         const response = await axios.post(`${baseURL}/bdtpaciente/post`, data);
//     //         const dataWithAge = {
//     //             ...data,
//     //             EDAD: 0
//     //         };
//     //         notification.success({
//     //             message: '¡Éxito!',
//     //             description: `Paciente ${response.data.primerNombre} creado!`,
//     //             duration: 3
//     //         });
//     //         setNumExp(response.data.numExpediente);
//     //         setIsHerited(true); // Marcar que el valor ha sido heredado
//     //         reset();
//     //         setTipoIdentificacion(''); // Limpia el tipo de identificación
//     //         setIdentificacion(''); // Limpia el valor del campo de identificación
//     //         if (refAntPer.current) {
//     //             const tab = new window.bootstrap.Tab(refAntPer.current);
//     //             tab.show();
//     //         }
//     //     } catch (error) {
//     //         console.log(error);
//     //         // Manejo del error y validación específica
//     //         if (error.response && error.response.data && error.response.data.message) {
//     //             notification.error({
//     //                 message: 'Error al Crear Paciente',
//     //                 description: error.response.data.message,
//     //                 duration: 3
//     //             });
//     //         } else {
//     //             notification.error({
//     //                 message: 'Error al Crear Paciente',
//     //                 description: 'El usuario con ese numero de expediente ya esta registrado, ingresar uno diferente',
//     //                 duration: 3
//     //             });
//     //         }
//     //     }
 
//     // });
    
//     // POST ANTECEDENTES PERSONALES
//     const onSubmitAntPersonales = handleSubmitAntPer(async (data) => {

//         setIsSelectDisabled(true);

//         try {

//             const transformedData = {
//                 ...data,
//                 histEmbarazo: data.histEmbarazo === 'true',
//                 lactancia: data.lactancia === 'true',
//                 embarazo: data.embarazo === 'true',
//                 mamografia: data.mamografia === 'true',
//                 pap: data.pap === 'true',
//                 papAlterado: data.papAlterado === 'true',
//                 reempHormonal: data.reempHormonal === 'true',
//                 fuma: data.fuma === 'true',
//                 estadoPareja: data.estadoPareja === 'true',
//                 crioterapia: data.crioterapia === 'true',
//                 thermocuagulacion: data.thermocuagulacion === 'true',
//                 biopasis: data.biopasis === 'true',
//                 menstruacion: Number(data.menstruacion),
//                 vidaSexual: Number(data.vidaSexual),
//                 compSexuales: Number(data.compSexuales),
//                 gestas: Number(data.gestas),
//                 partos: Number(data.partos),
//                 abortos: Number(data.abortos),
//                 cesarea: Number(data.cesarea),
//                 sa: Number(data.sa),
//                 histPap: Number(data.histPap),
//                 menopausia: Number(data.menopausia),
//                 //cigarrosDia: Number(data.cigarrosDia),
//                 cigarrosDia: data.fuma === 'true' ? Number(data.cigarrosDia) : 0, // Usar 0 si no fuma
//             };

//             const response = await axios.post(`${baseURL}/bdtbantecedentespersonale/post`, transformedData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Antecedente Personal creado exitosamente!`,
//                 duration: 3
//             });

//             resetAntecPer();

//             if (refAntPerPat.current) {
//                 const tab = new window.bootstrap.Tab(refAntPerPat.current);
//                 tab.show();
//             }

//         } catch (error) {

//             notification.error({
//                 message: 'Error al Crear Antecedente',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });

//         }

//     });

//     // POST ANTECEDENTES PERSONALES PATERNALES
//     const onSubmitAntPersonalesPat = handleSubmitAntPerPat(async (data) => {

//         setIsSelectDisabled(true);

//         try {

//             const transformedData = {
//                 ...data,
//                 alergiaAli: data.alergiaAli === 'true',
//                 alergiaMed: data.alergiaMed === 'true',
//                 anemia: data.anemia === 'true',
//                 cacerut: data.cacerut === 'true',
//                 camDer: data.camDer === 'true',
//                 camIzq: data.camIzq === 'true',
//                 cardiopatia: data.cardiopatia === 'true',
//                 cirugias: data.cirugias === 'true',
//                 diabetes: data.diabetes === 'true',
//                 extirpacion: data.extirpacion === 'true',
//                 fibrodenoma: data.fibrodenoma === 'true',
//                 hepatopatias: data.hepatopatias === 'true',
//                 hipertension: data.hipertension === 'true',
//                 matriz: data.matriz === 'true',
//                 nefropatia: data.nefropatia === 'true',
//                 vif: data.vif === 'true',
//                 vih: data.vih === 'true',
//             }

//             console.log(transformedData);

//             const response = await axios.post(`${baseURL}/bdtbaantecedentepatper/post`, transformedData)

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Antecedente Paterno Personal creado!`,
//                 duration: 3
//             });

//             resetAntPerPat();

//             if (refAntPatFam.current) {
//                 const tab = new window.bootstrap.Tab(refAntPatFam.current);
//                 tab.show();
//             }

//         } catch (error) {

//             notification.error({
//                 message: 'Error al Crear Antecedente',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });
//         }
//     });

//     // POST ANTECEDENTES PATOLOGICOS FAMILIARES
//     const onSubmitAntPatFam = handleSubmitAntecPatFam(async (data) => {

//         setIsSelectDisabled(true);

//         try {

//             console.log(data);

//             const transformedData = {
//                 ...data,
//                 caColon: data.caColon === 'true',
//                 caCu: data.caCu === 'true',
//                 caMama: data.caMama === 'true',
//                 caOvario: data.caOvario === 'true',
//                 diabetes: data.diabetes === 'true',
//                 enfCardiacas: data.enfCardiacas === 'true',
//                 enfRenales: data.enfRenales === 'true',
//                 hepatitis: data.hepatitis === 'true',
//                 hipertension: data.hipertension === 'true',
//             }

//             console.log(transformedData);

//             await axios.post(`${baseURL}/bdtbantecedentepatfam/post`, transformedData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Antecedente Patologico Fam creado!`,
//                 duration: 3
//             });

//             resetAntPatFam();

//             if (refInfo.current) {
//                 const tab = new window.bootstrap.Tab(refInfo.current);
//                 tab.show();
//             }

//         } catch (error) {

//             notification.error({
//                 message: 'Error al Crear Antecedente',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });

//         }

//     });

//     // POST INFORMACION
//     const onSubmitInformacion = handleSubmitInformacion(async (data) => {

//         setIsSelectDisabled(true);

//         try {

//             console.log(data);

//             await axios.post(`${baseURL}/bdtbinformacion/post`, data);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Información creada!`,
//                 duration: 3
//             });

//             resetInfo(); //Reset de toda la información
//             setNumExp(''); //Reset especificamente el ultimo campo de texto
//             setIsHerited(false); //Reset del estado de herencia del valor

//             if (refPaciente.current) {
//                 const tab = new window.bootstrap.Tab(refPaciente.current);
//                 tab.show();
//             }

//         } catch (error) {

//             notification.error({
//                 message: 'Error al Crear Informacion',
//                 description: `${error.response.data.message}`,
//                 duration: 3
//             });

//         }

//     });


//     // OBTIENE EL DATO NUMEXPEDIENTE DE DATOS PERSONALES PARA USARLO
//     // EN ANTECEDENTES PERSONALES
//     useEffect(() => {
//         setValue('numExpediente', numExp);
//     }, [numExp, setValue]);

//     useEffect(() => {
//         setValueAntPer('numExpediente', numExp);
//     }, [numExp, setValueAntPer]);

//     useEffect(() => {
//         setValueAntPatFam('numExpediente', numExp);
//     }, [numExp, setValueAntPatFam]);

//     useEffect(() => {
//         setValueInfo('numExpediente', numExp);
//     }, [numExp, setValueInfo]);

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="d-flex align-items-center justify-content-between mb-2">
//                     <h4>Agregar Historia Clinica</h4>
//                     <div className="d-flex gap-3">
//                         <p className="text-body-secondary text-smaller">Los datos con asterisco (<span style={{color: 'red'}}> * </span>) son obligatorios,</p>
//                         <p className="text-body-secondary text-smaller">A. = Antecedentes </p>
//                     </div>
//                 </div>
//                 <ul className="nav nav-tabs" id="myTab" role="tablist">
//                     <li className="nav-item" role="presentation">
//                         <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true" ref={refPaciente}>Paciente</a>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <a className="nav-link" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false" ref={refAntPer}>A. Personales</a>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <a className="nav-link" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false" ref={refAntPerPat}>A. Patológicos Personales</a>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                         <a className="nav-link" id="APF-tab" data-bs-toggle="tab" role="tab" href="#APF" aria-controls="APF" aria-selected="false" ref={refAntPatFam}>A. Patológicos Familiares</a>
//                     </li>                   
//                     <li className="nav-item" role="presentation">
//                         <a className="nav-link" id="Motivo-tab" data-bs-toggle="tab" role="tab" href="#Motivo" aria-controls="Motivo" aria-selected="false" ref={refInfo}>Información</a>
//                     </li>
//                 </ul>
//                 <div className="tab-content" id="myTabContent">
//                     {/*Datos Generales - Paciente*/}
//                     <div className="tab-pane show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
//                         <div className="container-fluid mt-3">
//                             <form onSubmit={onSubmitPaciente}>
//                                 <div className="row g-3">
//                                     <div className="col-sm-2">
//                                         <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span> 
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
//                                             {...registerPaciente('numExpediente', { required: true, maxLength: 20 })}
//                                             onChange={(e) => {
//                                                 setIsHerited(false); // Permite editar si se cambia manualmente
//                                             }}
//                                         />
//                                     </div>

//                                     {/* <div className="col-sm-2">
//                                         <label htmlFor="PrimerN" className="form-label">Primer nombre<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                             {...registerPaciente('primerNombre', { required: "El primer nombre es obligatorio", maxLength: 30 })}
//                                         />
//                                     </div> */}

//                                     <div className="col-sm-2">
//                                         <label htmlFor="PrimerN" className="form-label">Primer nombre<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                             {...registerPaciente('primerNombre', { required: "El primer nombre es obligatorio", maxLength: 30 })}
//                                         />
//                                     </div>
//                                     <div className="col-sm-2">
//                                         <label htmlFor="SegundoN" className="form-label">Segundo nombre</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El nombre debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                             {...registerPaciente('segundoNombre', { maxLength: 30 })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="P_apellido" className="form-label">Primer apellido<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El apellido debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                             {...registerPaciente('primerApellido', { required: true, maxLength: 30 })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="S_apellido" className="form-label">Segundo apellido</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="El apellido debe ir escrito como aparezca en la cédula o la partida de nacimiento"
//                                             {...registerPaciente('segundoApellido', { required: true, maxLength: 30 })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="sexo" className="form-label">Sexo<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="d-flex align-items-center justify-content-center gap-4 form-control">
//                                             <div className="form-check">
//                                                 <input
//                                                     type="radio"
//                                                     className="form-check-input"
//                                                     value="Femenino"
//                                                     id="femenino"
//                                                     {...registerPaciente("sexo", { required: true })}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="femenino">F</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input
//                                                     type="radio"
//                                                     className="form-check-input"
//                                                     value="Masculino"
//                                                     id="masculino"
//                                                     {...registerPaciente("sexo", { required: true })}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="masculino">M</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="nacimiento" className="form-label">Fecha de nacimiento<span style={{color: 'red'}}> * </span> 
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             title="Fecha de nacimiento"
//                                             id="fechaNac"
//                                             {...registerPaciente('fechaNac', { required: true })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="cedula" className="form-label">Tipo de Identificación <span style={{color: 'red'}}> * </span> </label>
//                                         <select className="form-select" value={tipoIdentificacion} onChange={handleTipoIdentificacionChange}>
//                                             <option value="">Seleccionar...</option>
//                                             <option value="categoria1">Fecha de Nacimiento</option>
//                                             <option value="categoria2">Cedula de Identificación</option>
//                                             <option value="categoria3">Pasaporte</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="expediente" className="form-label">Identificación<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             title="Selecciona el tipo de identificación para llenar este campo"
//                                             value={identificacion}
//                                             {...registerPaciente('cedula', { required: true, maxLength: 20 })}
//                                             onChange={handleIdentificacionChange} // Me permite hacer el cambio y la validación
//                                             disabled={tipoIdentificacion === "categoria1" || !tipoIdentificacion} // Deshabilitar si no se ha seleccionado el tipo de identificación
//                                         />
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="escolaridad" className="form-label">Escolaridad<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <select defaultValue="Menu de Selección" className="form-select" id="escolaridad" {...registerPaciente("escolaridad", { required: true })}>
//                                             <option value="">Menu de Selección</option>
//                                             <option value="Primaria completa">Primaria completa</option>
//                                             <option value="Primaria incompleta">Primaria incompleta</option>
//                                             <option value="Bachiller">Bachiller</option>
//                                             <option value="Secundaria incompleta">Secundaria incompleta</option>
//                                             <option value="Técnico superior">Técnico superior</option>
//                                             <option value="Universitario">Universitario</option>
//                                             <option value="Otros">Otros</option>
//                                         </select>

//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="profesion" className="form-label">Profesión<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <select defaultValue="Menu de Selección" className="form-select" id="profesion" {...registerPaciente("profesion", { required: true })}>
//                                             <option value="">Menu de Selección</option>
//                                             <option value="Estudiante">Estudiante</option>
//                                             <option value="Administrador(a)">Adminitrador(a)</option>
//                                             <option value="Ama de casa">Ama de casa</option>
//                                             <option value="Arquitecto(a)">Arquitecto(a)</option>
//                                             <option value="Cocinero(a)">Cocinero(a)</option>
//                                             <option value="Contador(a)">Contador(a)</option>
//                                             <option value="Docente">Docente</option>
//                                             <option value="Doctor(a)">Doctor(a)</option>
//                                             <option value="Enfermero(a)">Enfermero(a)</option>
//                                             <option value="Ingeniero(a)">Ingeniero(a)</option>
//                                             <option value="Licenciado(a)">Licenciado(a)</option>
//                                             <option value="Oficinista">Oficinista</option>
//                                             <option value="Operaria">Operaria</option>
//                                             <option value="Recepcionista">Recepcionista</option>
//                                             <option value="Secretario(a)">Secretario(a)</option>
//                                             <option value="Sector informal">Sector informal</option>
//                                             <option value="Sector informal">Sector formal</option>
//                                             <option value="Otros">Otros</option>
//                                         </select>

//                                     </div>

//                                     <div className="col-sm-7">
//                                         <label htmlFor="direccion" className="form-label">Dirección</label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="direccion"
//                                             {...registerPaciente('direccion')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="departamento" className="form-label">Departamento<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <select defaultValue="Managua" className="form-select" id="departamento" {...registerPaciente("codDepartamento", { required: true })}>
//                                             <option value="">Menú de selección</option>
//                                             <option value="1">Chinandega</option>
//                                             <option value="2">Leon</option>
//                                             <option value="3">Managua</option>
//                                             <option value="4">Masaya</option>
//                                             <option value="5">Carazo</option>
//                                             <option value="6">Granada</option>
//                                             <option value="7">Rivas</option>
//                                             <option value="8">Rio San Juan</option>
//                                             <option value="9">Madriz</option>
//                                             <option value="10">Nueva Segovia</option>
//                                             <option value="11">Jinotega</option>
//                                             <option value="12">Esteli</option>
//                                             <option value="13">Matagalpa</option>
//                                             <option value="14">Boaco</option>
//                                             <option value="15">Chontales</option>
//                                             <option value="16">RAAN</option>
//                                             <option value="17">RAAS</option>
//                                         </select>

//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="presion" className="form-label">
//                                             Presión<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="presion"
//                                             placeholder="mm/Hg"
//                                             {...registerPaciente("presion", { required: true })}
//                                             onKeyPress={(e) => {
//                                                 const charCode = e.charCode;

//                                                 if (!(charCode >= 48 && charCode <= 57) && charCode !== 47) {
//                                                     e.preventDefault(); // Evita que se ingresen otros caracteres
//                                                 }
//                                             }}
//                                         />
//                                     </div>

//                                     {/* <div className="col-sm-1">
//                                         <label htmlFor="presion" className="form-label">Presión<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             id="presion"
//                                             placeholder="mm/Hg"
//                                             {...registerPaciente("presion", { required: true })}
//                                         />
//                                     </div> */}

//                                     <div className="col-sm-1">
//                                         <label htmlFor="temperatura" className="form-label">Temperatura<span style={{color: 'red'}}>* </span>
//                                         </label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="temperatura"
//                                             step="0.01"
//                                             placeholder="°C"
//                                             {...registerPaciente("temperatura", { required: true })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="peso" className="form-label">Peso<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="peso"
//                                             step="0.01"
//                                             placeholder="Kg"
//                                             {...registerPaciente("peso", { required: true })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="talla" className="form-label">Talla<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="talla"
//                                             step="0.01"
//                                             placeholder="Mtrs"
//                                             {...registerPaciente("talla", { required: true })}
//                                         />
//                                     </div>

//                                     {/* <div className="col-sm-1">
//                                         <label htmlFor="IMC" className="form-label">IMC</label>
//                                         <input className="form-control" type="text" maxLength="5" title="Este campo es de sólo lectura" / />
//                                     </div> */}

//                                     <div className="col-sm-2">
//                                         <label htmlFor="fechaIngreso" className="form-label">Fecha de ingreso<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="fechaIngreso"
//                                             {...registerPaciente("fechaIngreso", { required: true })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="centros" className="form-label">Centro de Mujeres IXCHEN<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <select defaultValue="Menú de selección" className="form-select" id="centro" {...registerPaciente("centro", { required: true })}>
//                                             <option value="">Menú de selección</option>
//                                             <option value="Managua">Managua</option>
//                                             <option value="Ciudad Sandino">Ciudad Sandino</option>
//                                             <option value="Villa Libertad">Villa Libertad</option>
//                                             <option value="Tipitapa">Tipitapa</option>
//                                             <option value="Masaya">Masaya</option>
//                                             <option value="Granada">Granada</option>
//                                             <option value="Matagalpa">Matagalpa</option>
//                                             <option value="Estelí">Estelí</option>
//                                             <option value="León">León</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="usuaria" className="form-label">Usuaria(o)<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="d-flex align-items-center justify-content-center gap-4 border form-control">
//                                             <div className="form-check">
//                                                 <input
//                                                     id="nueva"
//                                                     value="Nueva"
//                                                     type="radio"
//                                                     className="form-check-input"
//                                                     {...registerPaciente('usuaria', { required: true })}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="nueva">Nueva(o)</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input
//                                                     id="subsecuente"
//                                                     value="Subsecuente"
//                                                     type="radio"
//                                                     className="form-check-input"
//                                                     {...registerPaciente('usuaria', { required: true })}
//                                                 />
//                                                 <label className="form-check-label" htmlFor="subsecuente">Subsecuente</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                 </div>

//                                 <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
//                                     <button className="btn btn-success btn-save me-md-2" type="submit" >Guardar</button>
//                                     <button type="reset" className="btn btn-danger">Cancelar</button>
//                                     {showEditButton && (
//                                         <button 
//                                             onClick={() => (`/editar-paciente/`)}
//                                             className="btn btn-primary"
//                                         >
//                                             Editar Paciente
//                                         </button>
//                                     )}
//                                 </div>

//                             </form>
//                         </div>
//                     </div>

//                     {/*Antecedentes Personales*/}
//                     <div className="tab-pane fade" id="AP" role="tabpanel" aria-labelledby="AP-tab">
//                         <div className="container-fluid mt-3">
//                             <form onSubmit={onSubmitAntPersonales}>
//                                 <div className="row g-3">
//                                     <div className="col-sm-2">
//                                         <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={numExp}
//                                             title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
//                                             {...registerAntecPer('numExpediente')}
//                                             //readOnly
//                                             readOnly={isHerited} // Solo es de solo lectura si se ha heredado
//                                             onChange={(e) => {
//                                                 if (!isHerited) {
//                                                     setNumExp(e.target.value); // Permite editar si no se ha heredado
//                                                 }
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="col-sm-2">
//                                         <label htmlFor="p_menstruacion" className="form-label">Primera menstruación</label>
//                                         <input
//                                             type="number"
//                                             min="8"
//                                             className="form-control"
//                                             id="p_menstruacion"
//                                             placeholder="PM en años"
//                                             {...registerAntecPer('menstruacion')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="vidasexual" className="form-label">Inicio vida sexual</label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="vidasexual"
//                                             placeholder="IVS en años"
//                                             {...registerAntecPer('vidaSexual')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Compa_S" className="form-label">Compañeros sexuales</label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             className="form-control"
//                                             id="Compa_S"
//                                             {...registerAntecPer('compSexuales')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="MAC" className="form-label">MAC</label>

//                                         <select defaultValue="Menú de selección" className="form-select" id="MAC" {...registerAntecPer('mac')}>
//                                             <option value="No planifica">Menú de selección</option>
                                            
//                                             <option value="No planifica">No planifica</option>
//                                             <option value="Condón">Condón</option>
//                                             <option value="DIU - Nuevo">DIU - Nuevo</option>
//                                             <option value="DIU - Subsecuente">DIU - Subsecuente</option>
//                                             <option value="Gestageno oral - Nuevo">Gestageno oral - Nuevo</option>
//                                             <option value="Gestageno oral - Subsecuente">Gestageno oral - Subsecuente</option>
//                                             <option value="Implante C/P - Nuevo">Implante C/P - Nuevo</option>
//                                             <option value="Implante C/P - Subsecuente">Implante C/P - Subsecuente</option>
//                                             <option value="Implante L/P - Nuevo">Implante L/P - Nuevo</option>
//                                             <option value="Implante L/P - Subsecuente">Implante L/P - Subsecuente</option>
//                                             <option value="Inyec. Mensual - Nuevo">Inyec. Mensual - Nuevo</option>
//                                             <option value="Inyec. Mensual - Subsecuente">Inyec. Mensual - Subsecuente</option>
//                                             <option value="Inyec. Trimes. - Nuevo">Inyec. Trimes. - Nuevo</option>
//                                             <option value="Inyec. Trimes. - Subsecuente">Inyec. Trimes. - Subsecuente</option>
//                                             <option value="MINILAP">MINILAP</option>
//                                             <option value="Parche">Parche</option>
//                                             <option value="Otros">Otros</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="embarazada" className="form-label">¿Has estado embarazada?<span style={{color: 'red'}}>* </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="si"
//                                                 value="true"
//                                                 name="embarazada"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 {...registerAntecPer('histEmbarazo', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="no"
//                                                 name="embarazada"
//                                                 value="false"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 {...registerAntecPer('histEmbarazo')}
//                                             />
//                                             <label className="form-check-label" htmlFor="no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="gestas" className="form-label">Gestas</label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="50"
//                                             className="form-control"
//                                             id="gestas"
//                                             {...registerAntecPer('gestas')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="partos" className="form-label">Partos</label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="50"
//                                             className="form-control"
//                                             id="partos"
//                                             {...registerAntecPer('partos')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="abortos" className="form-label">Abortos</label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="50"
//                                             className="form-control"
//                                             id="abortos"
//                                             {...registerAntecPer('abortos')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="cesarea" className="form-label">Cesárea</label>
//                                         <input
//                                             type="number"
//                                             min="0"
//                                             max="50"
//                                             className="form-control"
//                                             id="cesarea"
//                                             {...registerAntecPer('cesarea')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="FUM" className="form-label">FUM<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="FUM"
//                                             {...registerAntecPer('fum', { required: true })}
//                                         />
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="SA" className="form-label">SA</label>
//                                         <input
//                                             className="form-control"
//                                             type="number"
//                                             title="Este campo es de sólo lectura"
//                                             {...registerAntecPer('sa')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="lactancia" className="form-label">Lactancia materna<span style={{color: 'red'}}> * </span> 
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="lac_si"
//                                                 name="lactancia"
//                                                 type="radio"
//                                                 value={true}
//                                                 className="form-check-input"
//                                                 {...registerAntecPer('lactancia', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="lac_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="lac_no"
//                                                 name="lactancia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('lactancia', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="lac_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="esta_emb" className="form-label">¿Está embarazada?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="emb_si"
//                                                 name="esta_emb"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('embarazo', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="emb_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="emb_no"
//                                                 name="esta_emb"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('embarazo', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="emb_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="mamografia" className="form-label">¿Mamografía al día?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="mamografia_si"
//                                                 name="mamografia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('mamografia', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="mamografia_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="mamografia_no"
//                                                 name="mamografia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('mamografia', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="mamografia_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="pap_dia" className="form-label">¿PAP al día?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="pap_si"
//                                                 name="pap_dia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('pap', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="pap_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="pap_no"
//                                                 name="pap_dia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('pap', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="pap_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="pap_alterado" className="form-label">¿PAP alterado?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="pap_alt_si"
//                                                 name="pap_alterado"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('papAlterado', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="pap_alt_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="pap_alt_no"
//                                                 name="pap_alterado"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('papAlterado', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="pap_alt_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-1">
//                                         <label htmlFor="ult_pap" className="form-label">Último PAP</label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="ult_pap"
//                                             placeholder="Meses"
//                                             {...registerAntecPer('histPap')}
//                                         />
//                                     </div>
//                                     <div className="col-sm-2">
//                                         <label htmlFor="menopausia" className="form-label">Edad de Menopausia</label>
//                                         <input
//                                             type="number"
//                                             min="40"
//                                             className="form-control"
//                                             id="menopausia" placeholder="Años"
//                                             {...registerAntecPer('menopausia')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="TRH" className="form-label">¿Terapia Reemplazo Hormonal?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="TRH_si"
//                                                 name="TRH"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('reempHormonal', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="TRH_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="TRH_no"
//                                                 name="TRH"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('reempHormonal', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="TRH_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="fuma" className="form-label">¿Fuma?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="fuma_si"
//                                                 name="fuma"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 //value={true}
//                                                 value="true"
//                                                 {...registerAntecPer('fuma', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="fuma_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="fuma_no"
//                                                 name="fuma"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 //value={false}
//                                                 value="false"
//                                                 {...registerAntecPer('fuma', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="fuma_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="cigarros" className="form-label">Cantidad de cigarros por día</label>
//                                         <input
//                                             type="number"
//                                             min="1"
//                                             className="form-control"
//                                             id="cigarros"
//                                             disabled={fuma !== 'true'} // Habilitar solo si "fuma" es verdadero
//                                             {...registerAntecPer('cigarrosDia')}
//                                             defaultValue={0} // Valor por defecto 0 
//                                         />
//                                     </div>

//                                     <div className="col-sm-3">
//                                         <label htmlFor="compania" className="form-label">¿Actualmente está sola o acompañada?<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="sola"
//                                                 name="compania"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('estadoPareja', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="sola">Sola(o)</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="acompaniada"
//                                                 name="compania"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('estadoPareja', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="acompaniada">Acompañada(o)</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="F_hijo" className="form-label">Fecha Nac. último hijo</label>
//                                         <input
//                                             type="date"
//                                             className="form-control"
//                                             id="F_hijo"
//                                             {...registerAntecPer('fecNacHijo')}
//                                         />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="crioterapia" className="form-label">Crioterapia</label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="si"
//                                                 name="crioterapia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('crioterapia')}
//                                             />
//                                             <label className="form-check-label" htmlFor="crioterapia">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="no"
//                                                 name="crioterapia"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('crioterapia')}
//                                             />
//                                             <label className="form-check-label" htmlFor="crioterapia">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="thermocuagulacion" className="form-label">Termocuagulación</label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="si"
//                                                 name="thermocuagulacion"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('thermocuagulacion')}
//                                             />
//                                             <label className="form-check-label" htmlFor="thermocuagulacion">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="no"
//                                                 name="thermocuagulacion"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('thermocuagulacion')}
//                                             />
//                                             <label className="form-check-label" htmlFor="thermocuagulacion">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="biopasis" className="form-label">Biopsias por colposcopia<span style={{color: 'red'}}> * </span></label>
//                                         <div className="form-check">
//                                             <input
//                                                 id="si"
//                                                 name="biopasis"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={true}
//                                                 {...registerAntecPer('biopasis', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="biopasis">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input
//                                                 id="no"
//                                                 name="biopasis"
//                                                 type="radio"
//                                                 className="form-check-input"
//                                                 value={false}
//                                                 {...registerAntecPer('biopasis', { required: true })}
//                                             />
//                                             <label className="form-check-label" htmlFor="biopasis">No</label>
//                                         </div>
//                                     </div>

//                                 </div>
//                                 <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
//                                     <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
//                                     {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
//                                 </div>
//                             </form>
//                         </div>

//                     </div>

//                     {/*Antecedentes Personales Paternales*/}
//                     <div className="tab-pane fade" id="APP" role="tabpanel" aria-labelledby="APP-tab">
//                         <div className="container-fluid mt-3">
//                             <form onSubmit={onSubmitAntPersonalesPat}>
//                                 <div className="row g-4">
//                                     <div className="col-sm-2">
//                                         <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             value={numExp}
//                                             title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
//                                             {...registerAntecPerPat('numExpediente')}
//                                             //readOnly
//                                             readOnly={isHerited} // Solo es de solo lectura si se ha heredado
//                                             onChange={(e) => {
//                                                 if (!isHerited) {
//                                                     setNumExp(e.target.value); // Permite editar si no se ha heredado
//                                                 }
//                                             }}
//                                         />
//                                     </div>
//                                     <div className="col-sm-2">
//                                         <label htmlFor="fibroadenoma" className="form-label">Fibroadenoma<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('fibrodenoma', { required: true })} id="fibro_si" name="fibrodenoma" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="fibro_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('fibrodenoma', { required: true })} id="fibro_no" name="fibrodenoma" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="fibro_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_mama_izq" className="form-label">Ca Mama Izq<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('camIzq', { required: true })} id="Ca_mama_izq_si" name="camIzq" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_mama_izq_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('camIzq', { required: true })} id="Ca_mama_izq_no" name="camIzq" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_mama_izq_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_mama_der" className="form-label">Ca Mama Der<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('camDer', { required: true })} id="Ca_mama_der_si" name="camDer" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_mama_der_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('camDer', { required: true })} id="Ca_mama_der_no" name="camDer" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_mama_der_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_cervico_uterino" className="form-label">Ca Cervico Uterino<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('cacerut', { required: true })} id="Ca_cervico_uterino_si" name="cacerut" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_cervico_uterino_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('cacerut', { required: true })} id="Ca_cervico_uterino_no" name="cacerut" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="Ca_cervico_uterino_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="matriz" className="form-label">¿Conserva su Útero?</label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('matriz', { required: true })} id="matriz_si" name="matriz" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="matriz_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('matriz', { required: true })} id="matriz_no" name="matriz" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="matriz_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="extirpacion" className="form-label">Extirpación Qx Ovario<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('extirpacion', { required: true })} id="extirpacion_si" name="extirpacion" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="extirpacion_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('extirpacion', { required: true })} id="extirpacion_no" name="extirpacion" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="extirpacion_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="ITS" className="form-label">ITS</label>

//                                         <select {...registerAntecPerPat('its', { required: true })} defaultValue={"Ninguna"} className="form-select" id="its">
//                                             <option value="">Menú de selección</option>
//                                             <option value="Ninguna">Ninguna</option>
//                                             <option value="Clamidia">Clamidia</option>
//                                             <option value="Condilomas">Condilomas</option>
//                                             <option value="Garnerela Vaginal">Garnerela Vaginal</option>
//                                             <option value="Gonorrea">Gonorrea</option>
//                                             <option value="Herpes">Herpes</option>
//                                             <option value="Monilias">Monilias</option>
//                                             <option value="VIH-SIDA">VIH-SIDA</option>
//                                             <option value="Sifilis">Sifilis</option>
//                                             <option value="Tricomonas">Tricomonas</option>
//                                             <option value="Otras">Otras</option>
//                                         </select>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="VIH" className="form-label">VIH<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('vih', { required: true })} id="VIH_si" name="vih" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="VIH_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('vih', { required: true })} id="VIH_no" name="vih" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="VIH_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="VIF" className="form-label">Violencia Intrafamiliar</label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('vif', { required: true })} id="VIF_si" name="vif" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="VIF_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('vif', { required: true })} id="VIF_no" name="vif" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="VIF_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="diabetes" className="form-label">Diabetes<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('diabetes', { required: true })} id="diabetes_si" name="diabetes" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="diabetes_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('diabetes', { required: true })} id="diabetes_no" name="diabetes" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="diabetes_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="cardiopatia" className="form-label">Cardiopatía<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('cardiopatia', { required: true })} id="cardiopatia_si" name="cardiopatia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="cardiopatia_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('cardiopatia', { required: true })} id="cardiopatia_no" name="cardiopatia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="cardiopatia_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="hipertension" className="form-label">Hipertensión<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('hipertension', { required: true })} id="hipertension_si" name="hipertension" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="hipertension_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('hipertension', { required: true })} id="hipertension_no" name="hipertension" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="hipertension_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="hepatopatias" className="form-label">Hepatopatías<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('hepatopatias', { required: true })} id="hepatopatias_si" name="hepatopatias" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="hepatopatias_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('hepatopatias', { required: true })} id="hepatopatias_no" name="hepatopatias" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="hepatopatias_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="nefropatias" className="form-label">Nefropatías<span style={{color: 'red'}}> * </span> 
//                                         </label>
//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('nefropatia', { required: true })} id="nefropatias_si" name="nefropatia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="nefropatias_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('nefropatia', { required: true })} id="nefropatias_no" name="nefropatia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="nefropatias_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="cirugias" className="form-label">Cirugías<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('cirugias', { required: true })} id="cirugias_si" name="cirugias" type="radio" className="form-check-input" />
//                                                 <label className="form-check-label" htmlFor="cirugias_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('cirugias', { required: true })} id="cirugias_no" name="cirugias" type="radio" className="form-check-input" />
//                                                 <label className="form-check-label" htmlFor="cirugias_no">No</label>
//                                             </div>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="anemia" className="form-label">Anemia<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('anemia', { required: true })} id="anemia_si" name="anemia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="anemia_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('anemia', { required: true })} id="anemia_no" name="anemia" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="anemia_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="alergia_medi" className="form-label">Alergia Medicamentos</label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('alergiaMed', { required: true })} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="alergia_medi_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('alergiaMed', { required: true })} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="alergia_medi_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="alergia_ali" className="form-label">Alergia Alimentos<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="d-flex align-items-center justify-content-center gap-3 form-control">
//                                             <div className="form-check">
//                                                 <input value={true} {...registerAntecPerPat('alergiaAli', { required: true })} id="alergia_ali_si" name="alergiaAli" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="alergia_ali_si">Si</label>
//                                             </div>
//                                             <div className="form-check">
//                                                 <input value={false} {...registerAntecPerPat('alergiaAli', { required: true })} id="alergia_ali_no" name="alergiaAli" type="radio" className="form-check-input" required />
//                                                 <label className="form-check-label" htmlFor="alergia_ali_no">No</label>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* <div className="col-sm-12">
//                                         <label htmlFor="Observaciones" className="form-label">Observaciones</label>
//                                         <input type="text" maxLength="140" className="form-control" id="Observaciones" />
//                                     </div> */}

//                                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
//                                         <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
//                                         {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
//                                         {/* Botón para marcar todos como 'Sí' */}
//                                         <button
//                                             type="button"
//                                             style={{
//                                                 backgroundColor: '#0039fa', /* Azul */
//                                                 color: 'white',
//                                                 fontWeight: 'bold',
//                                                 border: '2px solid #092faf', /* Azul más oscuro */
//                                                 padding: '10px 20px',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}
//                                             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#092faf'}
//                                             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0039fa'}
//                                             onClick={() => {
//                                                 setValueAntPer('fibrodenoma', 'true');
//                                                 setValueAntPer('camIzq', 'true');
//                                                 setValueAntPer('camDer', 'true');
//                                                 setValueAntPer('cacerut', 'true');
//                                                 setValueAntPer('matriz', 'true');
//                                                 setValueAntPer('extirpacion', 'true');
//                                                 setValueAntPer('vih', 'true');
//                                                 setValueAntPer('vif', 'true');
//                                                 setValueAntPer('diabetes', 'true');
//                                                 setValueAntPer('fibrodenoma', 'true');
//                                                 setValueAntPer('camIzq', 'true');
//                                                 setValueAntPer('camDer', 'true');
//                                                 setValueAntPer('cacerut', 'true');
//                                                 setValueAntPer('matriz', 'true');
//                                                 setValueAntPer('extirpacion', 'true');
//                                                 setValueAntPer('vih', 'true');
//                                                 setValueAntPer('vif', 'true');
//                                                 setValueAntPer('diabetes', 'true');
//                                                 setValueAntPer('cardiopatia', 'true');
//                                                 setValueAntPer('hipertension', 'true');
//                                                 setValueAntPer('hepatopatias', 'true');
//                                                 setValueAntPer('nefropatia', 'true');
//                                                 setValueAntPer('cirugias', 'true');
//                                                 setValueAntPer('anemia', 'true');
//                                                 setValueAntPer('alergiaMed', 'true');
//                                                 setValueAntPer('alergiaAli', 'true');
//                                             }}
//                                             >
//                                             Marcar Todos Sí
//                                         </button>
//                                             {/* Botón para marcar todos como 'No' */}
//                                             <button
//                                             type="button"
//                                             style={{
//                                                 backgroundColor: '#dc3545', /* Rojo */
//                                                 color: 'white',
//                                                 fontWeight: 'bold',
//                                                 border: '2px solid #c82333', /* Rojo más oscuro */
//                                                 padding: '10px 20px',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}
//                                             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
//                                             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
//                                             onClick={() => {
//                                                 setValueAntPer('fibrodenoma', 'false');
//                                                 setValueAntPer('camIzq', 'false');
//                                                 setValueAntPer('camDer', 'false');
//                                                 setValueAntPer('cacerut', 'false');
//                                                 setValueAntPer('matriz', 'false');
//                                                 setValueAntPer('extirpacion', 'false');
//                                                 setValueAntPer('vih', 'false');
//                                                 setValueAntPer('vif', 'false');
//                                                 setValueAntPer('diabetes', 'false');
//                                                 setValueAntPer('cardiopatia', 'false');
//                                                 setValueAntPer('hipertension', 'false');
//                                                 setValueAntPer('hepatopatias', 'false');
//                                                 setValueAntPer('nefropatia', 'false');
//                                                 setValueAntPer('cirugias', 'false');
//                                                 setValueAntPer('anemia', 'false');
//                                                 setValueAntPer('alergiaMed', 'false');
//                                                 setValueAntPer('alergiaAli', 'false');
//                                             }}
//                                             >
//                                             Marcar Todos No
//                                         </button>
//                                     </div>

                                    
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     {/*Antecedentes Patologicos Familiares*/}
//                     <div className="tab-pane fade" id="APF" role="tabpanel" aria-labelledby="APF-tab">
//                         <div className="container-fluid mt-3">
//                             <form onSubmit={onSubmitAntPatFam}>
//                                 <div className="row g-3">
//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_de_Mama" className="form-label">Ca de Mama<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('caMama', { required: true })} id="Ca_de_Mama_si" name="caMama" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_de_Mama_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('caMama', { required: true })} id="Ca_de_Mama_no" name="caMama" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_de_Mama_no">No</label>
//                                         </div>
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_ca_mama" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('camParentesco')} name="camParentesco" type="text" maxLength="20" className="form-control" id="parentesco_ca_mama" />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_de_colon" className="form-label">Ca de Colon<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('caColon', { required: true })} id="Ca_de_colon_si" name="caColon" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_de_colon_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('caColon', { required: true })} id="Ca_de_colon_no" name="caColon" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_de_colon_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_CA_Colon" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('cacoParentesco')} name="cacoParentesco" type="text" maxLength="20" className="form-control" id="parentesco_CA_Colon" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="APF_diabetes" className="form-label">Diabetes<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('diabetes', { required: true })} id="diabet_si" name="diabetes" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="diabet_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('diabetes', { required: true })} id="diabet_no" name="diabetes" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="diabet_no">No</label>
//                                         </div>

//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_diabetes" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('diabetesParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_diabetes" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_CU" className="form-label">Ca de CU<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('caCu', { required: true })} id="Ca_CU_si" name="caCu" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_CU_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('caCu', { required: true })} id="Ca_CU_no" name="caCu" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_CU_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_Ca_CU" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('cacuParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Ca_CU" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="APF_hipertension" className="form-label">Hipertensión<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('hipertension', { required: true })} id="APF_hipertension_si" name="hipertension" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="APF_hipertension_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('hipertension', { required: true })} id="APF_hipertension_no" name="hipertension" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="APF_hipertension_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_hipert" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('hipertensionParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_hipert" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="Enf_card" className="form-label">Enf. Cardíacas<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('enfCardiacas', { required: true })} id="Enf_card_si" name="enfCardiacas" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Enf_card_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('enfCardiacas', { required: true })} id="Enf_card_no" name="enfCardiacas" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Enf_card_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_enf_card" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('enfcarParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_enf_card" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="Ca_ovario" className="form-label">Ca de Ovario<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('caOvario', { required: true })} id="Ca_ovario_si" name="caOvario" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_ovario_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('caOvario', { required: true })} id="Ca_ovario_no" name="caOvario" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Ca_ovario_no">No</label>
//                                         </div>

//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_Ca_ovario" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('caovaParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Ca_ovario" />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="Hepatitis" className="form-label">Hepatitis<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('hepatitis', { required: true })} id="Hepatitis_si" name="hepatitis" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Hepatitis_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('hepatitis', { required: true })} id="Hepatitis_no" name="hepatitis" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Hepatitis_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_Hepatitis" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('hepatitisParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Hepatitis" />
//                                     </div>


//                                     <div className="col-sm-2">
//                                         <label htmlFor="Enf_ren" className="form-label">Enf. Renales<span style={{color: 'red'}}> * </span>
//                                         </label>

//                                         <div className="form-check">
//                                             <input value={true} {...registerAntecPatFam('enfRenales', { required: true })} id="Enf_ren_si" name="enfRenales" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Enf_ren_si">Si</label>
//                                         </div>
//                                         <div className="form-check">
//                                             <input value={false} {...registerAntecPatFam('enfRenales', { required: true })} id="Enf_ren_no" name="enfRenales" type="radio" className="form-check-input" required />
//                                             <label className="form-check-label" htmlFor="Enf_ren_no">No</label>
//                                         </div>

//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="parentesco_Enf_ren" className="form-label">Parentesco</label>
//                                         <input {...registerAntecPatFam('enfrenParentesco')} type="text" maxLength="20" className="form-control" id="parentesco_Enf_ren" />
//                                     </div>

//                                     <div className="col-sm-2">
//                                         <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
//                                         </label>
//                                         <input
//                                             type="text"
//                                             className="form-control"
//                                             name="numExpediente"
//                                             value={numExp}
//                                             title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
//                                             {...registerAntecPatFam('numExpediente')}
//                                             //readOnly
//                                             readOnly={isHerited} // Solo es de solo lectura si se ha heredado
//                                             onChange={(e) => {
//                                                 if (!isHerited) {
//                                                     setNumExp(e.target.value); // Permite editar si no se ha heredado
//                                                 }
//                                             }}
//                                         />
//                                     </div>


//                                     <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
//                                         {/* <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button> */}
//                                         <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
//                                         <button
//                                             type="button"
//                                             style={{
//                                                 backgroundColor: '#0039fa', /* Azul */
//                                                 color: 'white',
//                                                 fontWeight: 'bold',
//                                                 border: '2px solid #092faf', /* Azul más oscuro */
//                                                 padding: '10px 20px',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}
//                                             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#092faf'}
//                                             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0039fa'}
//                                             onClick={() => {
//                                                 setValueAntPatFam('caMama', 'true');
//                                                 setValueAntPatFam('caColon', 'true');
//                                                 setValueAntPatFam('diabetes', 'true');
//                                                 setValueAntPatFam('caCu', 'true');
//                                                 setValueAntPatFam('hipertension', 'true');
//                                                 setValueAntPatFam('enfCardiacas', 'true');
//                                                 setValueAntPatFam('caOvario', 'true');
//                                                 setValueAntPatFam('hepatitis', 'true');
//                                                 setValueAntPatFam('enfRenales', 'true');
//                                             }}
//                                             >
//                                             Marcar Todos Sí
//                                         </button>
//                                             {/* Botón para marcar todos como 'No' */}
//                                             <button
//                                             type="button"
//                                             style={{
//                                                 backgroundColor: '#dc3545', /* Rojo */
//                                                 color: 'white',
//                                                 fontWeight: 'bold',
//                                                 border: '2px solid #c82333', /* Rojo más oscuro */
//                                                 padding: '10px 20px',
//                                                 borderRadius: '5px',
//                                                 transition: 'background-color 0.3s ease'
//                                             }}
//                                             onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c82333'}
//                                             onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc3545'}
//                                             onClick={() => {
//                                                 setValueAntPatFam('caMama', 'false');
//                                                 setValueAntPatFam('caColon', 'false');
//                                                 setValueAntPatFam('diabetes', 'false');
//                                                 setValueAntPatFam('caCu', 'false');
//                                                 setValueAntPatFam('hipertension', 'false');
//                                                 setValueAntPatFam('enfCardiacas', 'false');
//                                                 setValueAntPatFam('caOvario', 'false');
//                                                 setValueAntPatFam('hepatitis', 'false');
//                                                 setValueAntPatFam('enfRenales', 'false');
//                                             }}
//                                             >
//                                             Marcar Todos No
//                                         </button>
//                                         {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
//                                     </div>


//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                     {/*Antecedente Obstetrico*/}
//                     <div className="tab-pane fade" id="AO" role="tabpanel" aria-labelledby="AO-tab">

//                     </div>
//                     {/*Informacion*/}
//                     <div className="tab-pane fade" id="Motivo" role="tabpanel" aria-labelledby="Motivo-tab">

//                         <div className="container-fluid mt-3">
//                             <form onSubmit={onSubmitInformacion}>
//                                 <div>
//                                     <label htmlFor="expediente" className="form-label">Núm. Expediente<span style={{color: 'red'}}> * </span>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         value={numExp}
//                                         title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
//                                         {...registerInformacion('numExpediente')}
//                                         //readOnly
//                                         readOnly={isHerited} // Solo es de solo lectura si se ha heredado
//                                             onChange={(e) => {
//                                                 if (!isHerited) {
//                                                     setNumExp(e.target.value); // Permite editar si no se ha heredado
//                                                 }
//                                             }}
//                                     />
//                                 </div>

//                                 {/* <div className="mt-3">
//                                     <label className="form-label" htmlFor="motivo_visita">
//                                         Motivo de la visita<span style={{color: 'red'}}> * </span>
//                                     </label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="10"
//                                         id="motivo_visita"
//                                         {...registerInformacion('motVisita', { 
//                                             required: true,
//                                             onBlur: (e) => {
//                                                 if (!e.target.value.trim()) {
//                                                     e.target.value = 'N/A'; // Establece 'N/A' si está vacío
//                                                 }
//                                             }
//                                         })}
//                                     />
//                                 </div>

//                                 <div className="mt-3">
//                                     <label htmlFor="nota_med" className="form-label">Nota Médica</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="10"
//                                         id="nota_med"
//                                         {...registerInformacion('notaMedica', { 
//                                             required: true,
//                                             onBlur: (e) => {
//                                                 if (!e.target.value.trim()) {
//                                                     e.target.value = 'N/A'; // Establece 'N/A' si está vacío
//                                                 }
//                                             }
//                                         })}
//                                     />
//                                 </div> */}

//                                 <div className="mt-3">
//                                     <label className="form-label" htmlFor="motivo_visita">Motivo de la visita<span style={{color: 'red'}}> * </span>
//                                     </label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="10"
//                                         id="motivo_visita"

//                                         {...registerInformacion('motVisita', { required: true })}
//                                     >
//                                     </textarea>
//                                 </div>

//                                 <div className="mt-3">
//                                     <label htmlFor="nota_med" className="form-label">Nota Médica</label>
//                                     <textarea
//                                         className="form-control"
//                                         rows="10"
//                                         id="nota_med"
//                                         {...registerInformacion('notaMedica', { required: true })}
//                                     >
//                                     </textarea>
//                                 </div>

//                                 <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
//                                     <button className="btn btn-success btn-save me-md-2" type="submit">Guardar</button>
//                                     {/* <button type="reset" className="btn btn-danger">Cancelar</button> */}
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
