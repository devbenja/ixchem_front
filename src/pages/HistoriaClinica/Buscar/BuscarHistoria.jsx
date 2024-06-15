import './Buscar.css';

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const BuscarHistoria = () => {

    const [searchType, setSearchType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState('');

    const handleSearchSubmit = async (event) => {

        event.preventDefault(event);

        let response;

        try {

            if (searchType === 'opcion_expediente') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarpornumexpediente', {
                    params: { NumExpediente: searchValue }
                });
                 
            } else if (searchType === 'opcion_cedula') {

                response = await axios.get('https://localhost:7106/api/bdtpaciente/buscarporcedula', {
                    params: { cedula: searchValue }
                });

            }

            setData(response.data);
            
        } catch (error) {
            console.error(error);
        }

    };

    console.log(data)

    return (
        <>
            <div className='container-fluid'>
                <h4>Buscar Historia Clinica</h4>
            </div>
            <form onSubmit={handleSearchSubmit} className="container mt-3 p-3">
                <div className="row g-3">
                    <div className="col-sm-3">
                        <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value="">Seleccionar Opcion...</option>
                            <option value="opcion_expediente">Número de expediente</option>
                            <option value="opcion_cedula">Cédula de identidad</option>
                        </select>
                    </div>

                    <div className="col-sm-9 d-flex">
                        <div className="input-group" role="search">
                            <input 
                                className="form-control me-2" 
                                maxLength="80" 
                                type="search" 
                                aria-label="Search" 
                                value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className="btn btn-success" type="submit">Buscar</button>
                        </div>
                    </div>
                </div>
            </form>

            <div className="container-fluid mt-3" >
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="DG-tab" data-bs-toggle="tab" href="#DG" role="tab" aria-controls="DG" aria-selected="true">Datos Generales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link text-secondary" id="AP-tab" data-bs-toggle="tab" role="tab" href="#AP" aria-controls="AP" aria-selected="false">Antecedentes Personales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link text-secondary" id="APP-tab" data-bs-toggle="tab" role="tab" href="#APP" aria-controls="APP" aria-selected="false">Antecedentes Patológicos Personales</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link text-secondary" id="APF-tab" data-bs-toggle="tab" role="tab" href="#APF" aria-controls="APF" aria-selected="false">Antecedentes Patológicos Familiares</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link text-secondary" id="Motivo-tab" data-bs-toggle="tab" role="tab" href="#Motivo" aria-controls="Motivo" aria-selected="false">Motivo de la visita</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link text-secondary" id="Nota-tab" data-bs-toggle="tab" role="tab" href="#Nota" aria-controls="Nota" aria-selected="false">Nota Médica</a>
                    </li>

                </ul>

                <div className="tab-content mt-19" id="myTabContent">

                    {/*Search Datos Generales*/}
                    <div className="tab-pane fade show active" id="DG" role="tabpanel" aria-labelledby="DG-tab">
                        <div className="container-fluid mt-3">

                            <div className="table-responsive">
                                <table className="bg-formTable th, td">

                                    <thead className="table-info bg-table">
                                        <tr>
                                            <th scope="col">Fecha de ingreso</th>
                                            <th scope="col">Centro de mujeres IXCHEN</th>
                                            <th scope="col">Usuaria</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td scope="row">{ data && data.fechaIngreso }</td>
                                            <td>{ data && data.centro }</td>
                                            <td>{ data && data.usuaria }</td>

                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="container-fluid mt-3">
                            <div className="table-responsive">
                                <table className="bg-formTable th, td">

                                    <thead className="table-info bg-table">
                                        <tr>
                                            <th scope="col">Primer nombre</th>
                                            <th scope="col">Segundo nombre</th>
                                            <th scope="col">Primer apellido</th>
                                            <th scope="col">Segundo apellido</th>
                                            <th scope="col">Cédula</th>
                                            <th scope="col">Expediente</th>
                                            <th scope="col">Fecha de Nac.</th>
                                            <th scope="col">Edad</th>
                                            <th scope="col">Sexo</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td scope="row">{ data && data.primerNombre }</td>
                                            <td>{ data && data.segundoNombre }</td>
                                            <td>{ data && data.primerApellido }</td>
                                            <td>{ data && data.segundoApellido }</td>
                                            <td>{ data && data.cedula }</td>
                                            <td>{ data && data.numExpediente }</td>
                                            <td>{ data && data.fechaNac }</td>
                                            <td>{ data && data.edad }</td>
                                            <td>{ data && data.sexo }</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="container-fluid mt-3">

                            <div className="table-responsive">
                                <table className="bg-formTable th, td">

                                    <thead className="table-info bg-table">
                                        <tr>
                                            <th scope="col">Escolaridad</th>
                                            <th scope="col">Profesión/Oficio</th>
                                            <th scope="col">Dirección</th>
                                            <th scope="col">Departamento</th>


                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>{ data && data.escolaridad }</td>
                                            <td>{ data && data.profesion }</td>
                                            <td>{ data && data.direccion }</td>
                                            <td>{ data && data.codDepartamento }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>

                        <div className="container-fluid mt-3 mb-4">

                            <div className="table-responsive">
                                <table className="bg-formTable th, td">

                                    <thead className="table-info bg-table">
                                        <tr>
                                            <th scope="col">Presión</th>
                                            <th scope="col">Temperatura (°C)</th>
                                            <th scope="col">Peso (Kg)</th>
                                            <th scope="col">Talla (Mtrs)</th>
                                            <th scope="col">IMC</th>
                                            <th scope="col">Fecha del registro</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td scope="row">{ data && data.presion }</td>
                                            <td>{ data && data.temperatura }</td>
                                            <td>{ data && data.peso }</td>
                                            <td>{ data && data.talla }</td>
                                            <td>{ data && data.imc }</td>
                                            <td>{ data && data.fechaIngreso }</td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>

                    {/*Search Antecedentes personales*/}
                    
                </div>
            </div>
        </>
    )
}
