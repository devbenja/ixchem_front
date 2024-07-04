import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../../../api/apiURL';

export const EditarAntPatPersonales = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codAntparper: 0,
        fibrodenoma: false,
        camIzq: false,
        camDer: false,
        cacerut: false,
        matriz: false,
        extirpacion: false,
        its: '',
        vih: false,
        vif: false,
        diabetes: false,
        cardiopatia: false,
        hipertension: false,
        hepatopatias: false,
        nefropatia: false,
        cirugias: false,
        anemia: false,
        alergiaMed: false,
        alergiaAli: false,
        numExpediente: ''
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`${baseURL}/bdtbaantecedentepatper/buscarporexpediente`, {
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

            await axios.put(`${baseURL}/bdtbaantecedentepatper/actualizar/${formData.codAntparper}`, formData);
            
            notification.success({
                message: '¡Éxito!',
                description: `Antecedentes Patologicos Personales del Expediente ${formData.numExpediente} Editados`,
                duration: 3
            });

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.response.data.message}`,
                duration: 3
            });

        }

    };


    const handleEditCancel = () => {
        navigate('/buscar-historia-clinica');
    }

    return (
        <div className='container-fluid'>
            <h4>Editar Antecedente Patologico Personal</h4>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="row g-4">
                    <div className="col-sm-2">
                        <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.numExpediente} onChange={handleChange}
                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                            readOnly
                        />
                    </div>
                    <div className="col-sm-2">
                        <label htmlFor="fibroadenoma" className="form-label">Fibroadenoma*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.fibrodenoma === true} onChange={handleRadioChange} id="fibro_si" name="fibrodenoma" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="fibro_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.fibrodenoma === false} onChange={handleRadioChange} id="fibro_no" name="fibrodenoma" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="fibro_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="Ca_mama_izq" className="form-label">Ca Mama Izq*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.camIzq === true} onChange={handleRadioChange} id="Ca_mama_izq_si" name="camIzq" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_mama_izq_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.camIzq === false} onChange={handleRadioChange} id="Ca_mama_izq_no" name="camIzq" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_mama_izq_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="Ca_mama_der" className="form-label">Ca Mama Der*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.camDer === true} onChange={handleRadioChange} id="Ca_mama_der_si" name="camDer" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_mama_der_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.camDer === false} onChange={handleRadioChange} id="Ca_mama_der_no" name="camDer" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_mama_der_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="Ca_cervico_uterino" className="form-label">Ca Cervico Uterino*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.cacerut === true} onChange={handleRadioChange} id="Ca_cervico_uterino_si" name="cacerut" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_cervico_uterino_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.cacerut === false} onChange={handleRadioChange} id="Ca_cervico_uterino_no" name="cacerut" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="Ca_cervico_uterino_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="matriz" className="form-label">¿Conserva matriz?*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.matriz === true} onChange={handleRadioChange} id="matriz_si" name="matriz" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="matriz_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.matriz === false} onChange={handleRadioChange} id="matriz_no" name="matriz" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="matriz_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="extirpacion" className="form-label">Extirpación Qx Ovario*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.extirpacion === true} onChange={handleRadioChange} id="extirpacion_si" name="extirpacion" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="extirpacion_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.extirpacion === false} onChange={handleRadioChange} id="extirpacion_no" name="extirpacion" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="extirpacion_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="ITS" className="form-label">ITS</label>

                        <select name='its' value={formData.its} onChange={handleChange} className="form-select" id="its">
                            <option value="">{formData.its}</option>
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
                        <label htmlFor="VIH" className="form-label">VIH*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.vih === true} onChange={handleRadioChange} id="VIH_si" name="vih" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="VIH_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.vih === false} onChange={handleRadioChange} id="VIH_no" name="vih" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="VIH_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="VIF" className="form-label">VIF*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.vif === true} onChange={handleRadioChange} id="VIF_si" name="vif" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="VIF_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.vif === false} onChange={handleRadioChange} id="VIF_no" name="vif" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="VIF_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="diabetes" className="form-label">Diabetes*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.diabetes === true} onChange={handleRadioChange} id="diabetes_si" name="diabetes" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="diabetes_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.diabetes === false} onChange={handleRadioChange} id="diabetes_no" name="diabetes" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="diabetes_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="cardiopatia" className="form-label">Cardiopatía*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.cardiopatia === true} onChange={handleRadioChange} id="cardiopatia_si" name="cardiopatia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="cardiopatia_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.cardiopatia === false} onChange={handleRadioChange} id="cardiopatia_no" name="cardiopatia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="cardiopatia_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="hipertension" className="form-label">Hipertensión*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.hipertension === true} id="hipertension_si" name="hipertension" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="hipertension_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.hipertension === false} id="hipertension_no" name="hipertension" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="hipertension_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="hepatopatias" className="form-label">Hepatopatías*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.hepatopatias === true} id="hepatopatias_si" name="hepatopatias" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="hepatopatias_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.hepatopatias === false} id="hepatopatias_no" name="hepatopatias" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="hepatopatias_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="nefropatias" className="form-label">Nefropatías*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.nefropatia === true} id="nefropatias_si" name="nefropatia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="nefropatias_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.nefropatia === false} id="nefropatias_no" name="nefropatia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="nefropatias_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-3">
                        <label htmlFor="cirugias" className="form-label">Cirugías*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.cirugias === true} id="cirugias_si" name="cirugias" type="radio" className="form-check-input" />
                                <label className="form-check-label" htmlFor="cirugias_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.cirugias === false} id="cirugias_no" name="cirugias" type="radio" className="form-check-input" />
                                <label className="form-check-label" htmlFor="cirugias_no">No</label>
                            </div>
                        </div>

                    </div>


                    <div className="col-sm-3">
                        <label htmlFor="alergia_medi" className="form-label">Alergia a medicamentos*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.alergiaMed === true} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="alergia_medi_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.alergiaMed === false} id="alergia_medi_si" name="alergiaMed" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="alergia_medi_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="anemia" className="form-label">Anemia*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.anemia === true} id="anemia_si" name="anemia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="anemia_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.anemia === false} id="anemia_no" name="anemia" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="anemia_no">No</label>
                            </div>
                        </div>
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="alergia_ali" className="form-label">Alergia a alimentos*</label>

                        <div className="d-flex align-items-center justify-content-center gap-3 form-control">
                            <div className="form-check">
                                <input value="true" checked={formData.alergiaAli === true} id="alergia_ali_si" name="alergiaAli" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="alergia_ali_si">Si</label>
                            </div>
                            <div className="form-check">
                                <input value="false" checked={formData.alergiaAli === false} id="alergia_ali_no" name="alergiaAli" type="radio" className="form-check-input" required />
                                <label className="form-check-label" htmlFor="alergia_ali_no">No</label>
                            </div>
                        </div>
                    </div>

                    <div className="d-grid gap-2 d-md-flex justify-content-md-star mt-5">
                        <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                        <button onClick={handleEditCancel} type="reset" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
