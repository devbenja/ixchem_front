import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { notification } from 'antd';

import { baseURL } from '../../../api/apiURL';

export const EditarAntPersonales = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        codAntper: 0,
        menstruacion: 0,
        vidaSexual: 0,
        compSexuales: 0,
        mac: '',
        histEmbarazo: false,
        gestas: 0,
        partos: 0,
        abortos: 0,
        cesarea: 0,
        fum: '',
        sa: 0,
        lactancia: false,
        embarazo: false,
        mamografia: false,
        pap: false,
        papAlterado: false,
        histPap: 0,
        menopausia: 0,
        reempHormonal: false,
        fuma: false,
        cigarrosDia: 0,
        estadoPareja: false,
        fecNacHijo: '',
        crioterapia: false,
        biopasis: false,
        numExpediente: '',
        thermocuagulacion: false
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`${baseURL}/bdtbantecedentespersonale/buscarporexpediente`, {
                    params: { NumExpediente: id }
                });

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

            console.log(formData)

            await axios.put(`${baseURL}/bdtbantecedentespersonale/actualizar/${formData.codAntper}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Antecedentes Personales del Expediente ${formData.numExpediente} Editados`,
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
            <h4>Editar Antecedentes Personales</h4>
            <form className='mt-4' onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-2">
                        <label className="form-label">Menstruación</label>
                        <input type="number" name="menstruacion" value={formData.menstruacion} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Vida sexual</label>
                        <input type="number" name="vidaSexual" value={formData.vidaSexual} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Compañeros sexuales</label>
                        <input type="number" name="compSexuales" value={formData.compSexuales} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        {/* <label className="form-label">Métodos anticonceptivos (MAC)</label>
                        <input type="text" name="mac" value={formData.mac} onChange={handleChange} className="form-control" /> */}
                        <label className="form-label">Métodos anticonceptivos (MAC)</label>
                        <select name="mac" value={formData.mac} onChange={handleChange} className="form-select">
                            <option value="">{formData.mac}</option>
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
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Historia de embarazo</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="histEmbarazo" value="true" checked={formData.histEmbarazo === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="histEmbarazo" value="false" checked={formData.histEmbarazo === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Gestas</label>
                        <input type="number" name="gestas" value={formData.gestas} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Partos</label>
                        <input type="number" name="partos" value={formData.partos} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Abortos</label>
                        <input type="number" name="abortos" value={formData.abortos} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Cesáreas</label>
                        <input type="number" name="cesarea" value={formData.cesarea} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">FUM</label>
                        <input type="date" name="fum" value={formData.fum} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">SA</label>
                        <input type="number" name="sa" value={formData.sa} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Lactancia</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="lactancia" value="true" checked={formData.lactancia === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="lactancia" value="false" checked={formData.lactancia === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Embarazo</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="embarazo" value="true" checked={formData.embarazo === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="embarazo" value="false" checked={formData.embarazo === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Mamografía</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="mamografia" value="true" checked={formData.mamografia === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="mamografia" value="false" checked={formData.mamografia === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Papanicolaou (PAP)</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="pap" value="true" checked={formData.pap === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="pap" value="false" checked={formData.pap === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">PAP alterado</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="papAlterado" value="true" checked={formData.papAlterado === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="papAlterado" value="false" checked={formData.papAlterado === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Historial de PAP</label>
                        <input type="number" name="histPap" value={formData.histPap} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Menopausia</label>
                        <input type="number" name="menopausia" value={formData.menopausia} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Reemplazo hormonal</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="reempHormonal" value="true" checked={formData.reempHormonal === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="reempHormonal" value="false" checked={formData.reempHormonal === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Fuma</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="fuma" value="true" checked={formData.fuma === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="fuma" value="false" checked={formData.fuma === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label">Cigarros al día</label>
                        <input type="number" name="cigarrosDia" value={formData.cigarrosDia} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Estado de pareja</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="estadoPareja" value="true" checked={formData.estadoPareja === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="estadoPareja" value="false" checked={formData.estadoPareja === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <label className="form-label">Fecha Nac. Ultimo hijo</label>
                        <input type="date" name="fecNacHijo" value={formData.fecNacHijo} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col">
                        <label className="form-label">Crioterapia</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="crioterapia" value="true" checked={formData.crioterapia === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="crioterapia" value="false" checked={formData.crioterapia === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-2">
                        <label className="form-label">Termocuagulación</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="thermocuagulacion" value="true" checked={formData.thermocuagulacion === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="thermocuagulacion" value="false" checked={formData.thermocuagulacion === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <label className="form-label">Biopsias</label>
                        <div className='d-flex align-items-center justify-content-center form-control'>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="biopasis" value="true" checked={formData.biopasis === true} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">Sí</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input type="radio" name="biopasis" value="false" checked={formData.biopasis === false} onChange={handleRadioChange} className="form-check-input" />
                                <label className="form-check-label">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <label className="form-label">Número de expediente</label>
                        <input type="text" name="numExpediente" value={formData.numExpediente} onChange={handleChange} className="form-control" />
                    </div>
                </div>

                <div className='mt-4 d-flex gap-2'>
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <button type="cancel" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    )
}
