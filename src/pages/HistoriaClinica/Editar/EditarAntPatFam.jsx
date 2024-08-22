import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';

import { baseURL } from '../../../api/apiURL';

export const EditarAntPatFam = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codAntpatfam: 0,
        caMama: false,
        camParentesco: "",
        caCu: false,
        cacuParentesco: "",
        caColon: false,
        cacoParentesco: "",
        caOvario: false,
        caovaParentesco: "",
        hipertensionf: false,
        hipertensionParentesco: "",
        hepatitis: false,
        hepatitisParentesco: "",
        diabetesf: false,
        diabetesParentesco: "",
        enfCardiacas: false,
        enfcarParentesco: "",
        enfRenales: false,
        enfrenParentesco: "",
        numExpediente: ""
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`${baseURL}/bdtbantecedentepatfam/buscarporexpediente`, {
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

            console.log(formData)

            await axios.put(`${baseURL}/bdtbantecedentepatfam/actualizar/${formData.codAntpatfam}`, formData);
            
            notification.success({
                message: '¡Éxito!',
                description: `Antecedentes Patologicos Personales del Expediente ${formData.numExpediente} Editados`,
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
        <div className="container-fluid">
            <h4>Editar Antecedente Patologico Familiar</h4>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="row g-3">
                    <div className="col-sm-2">
                        <label htmlFor="Ca_de_Mama" className="form-label">Ca de Mama*</label>

                        <div className="form-check">
                            <input value="true" id="Ca_de_Mama_si" name="caMama" checked={formData.caMama === true} onChange={handleRadioChange}  type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_de_Mama_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Ca_de_Mama_no" name="caMama" checked={formData.caMama === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_de_Mama_no">No</label>
                        </div>
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_ca_mama" className="form-label">Parentesco</label>
                        <input value={formData.camParentesco} onChange={handleChange} name="camParentesco" type="text" maxLength="20" className="form-control" id="parentesco_ca_mama" />
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="Ca_de_colon" className="form-label">Ca de Colon*</label>

                        <div className="form-check">
                            <input value="true" id="Ca_de_colon_si" name="caColon" checked={formData.caColon === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_de_colon_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Ca_de_colon_no" name="caColon" checked={formData.caColon === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_de_colon_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_CA_Colon" className="form-label">Parentesco</label>
                        <input name="cacoParentesco" value={formData.cacoParentesco} onChange={handleChange} type="text" maxLength="20" className="form-control" id="parentesco_CA_Colon" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="APF_diabetes" className="form-label">Diabetes*</label>

                        <div className="form-check">
                            <input value="true" id="diabet_si" name="diabetesf" checked={formData.diabetesf === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="diabet_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="diabet_no" name="diabetesf" checked={formData.diabetesf === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="diabet_no">No</label>
                        </div>

                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="parentesco_diabetes" className="form-label">Parentesco</label>
                        <input type="text" maxLength="20" value={formData.diabetesParentesco} onChange={handleChange} className="form-control" id="parentesco_diabetes" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="Ca_CU" className="form-label">Ca de CU*</label>

                        <div className="form-check">
                            <input value="true" id="Ca_CU_si" name="caCu" checked={formData.caCu === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_CU_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Ca_CU_no" name="caCu" checked={formData.caCu === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_CU_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_Ca_CU" className="form-label">Parentesco</label>
                        <input type="text" value={formData.cacuParentesco} maxLength="20" className="form-control" id="parentesco_Ca_CU" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="APF_hipertension" className="form-label">Hipertensión*</label>

                        <div className="form-check">
                            <input value="true" id="APF_hipertension_si" name="hipertensionf" checked={formData.hipertensionf === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="APF_hipertension_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="APF_hipertension_no" name="hipertensionf" checked={formData.hipertensionf === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="APF_hipertension_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_hipert" className="form-label">Parentesco</label>
                        <input type="text" maxLength="20" value={formData.hipertensionParentesco} onChange={handleChange} className="form-control" id="parentesco_hipert" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="Enf_card" className="form-label">Enf. Cardíacas*</label>

                        <div className="form-check">
                            <input value="true" id="Enf_card_si" name="enfCardiacas" checked={formData.enfCardiacas === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Enf_card_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Enf_card_no" name="enfCardiacas" checked={formData.enfCardiacas === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Enf_card_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_enf_card" className="form-label">Parentesco</label>
                        <input type="text" value={formData.enfcarParentesco} onChange={handleChange} maxLength="20" className="form-control" id="parentesco_enf_card" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="Ca_ovario" className="form-label">Ca de Ovario*</label>

                        <div className="form-check">
                            <input value="true" id="Ca_ovario_si" name="caOvario" checked={formData.caOvario === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_ovario_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Ca_ovario_no" name="caOvario" checked={formData.caOvario === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Ca_ovario_no">No</label>
                        </div>

                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="parentesco_Ca_ovario" className="form-label">Parentesco</label>
                        <input type="text" value={formData.caovaParentesco} onChange={handleChange} maxLength="20" className="form-control" id="parentesco_Ca_ovario" />
                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="Hepatitis" className="form-label">Hepatitis*</label>

                        <div className="form-check">
                            <input value="true" id="Hepatitis_si" name="hepatitis" checked={formData.hepatitis === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Hepatitis_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Hepatitis_no" name="hepatitis" checked={formData.hepatitis === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Hepatitis_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_Hepatitis" className="form-label">Parentesco</label>
                        <input type="text" value={formData.hepatitisParentesco} maxLength="20" className="form-control" id="parentesco_Hepatitis" />
                    </div>


                    <div className="col-sm-2">
                        <label htmlFor="Enf_ren" className="form-label">Enf. Renales*</label>

                        <div className="form-check">
                            <input value="true" id="Enf_ren_si" name="enfRenales" checked={formData.enfRenales === true} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Enf_ren_si">Si</label>
                        </div>
                        <div className="form-check">
                            <input value="false" id="Enf_ren_no" name="enfRenales" checked={formData.enfRenales === false} onChange={handleRadioChange} type="radio" className="form-check-input" required />
                            <label className="form-check-label" htmlFor="Enf_ren_no">No</label>
                        </div>

                    </div>

                    <div className="col-sm-2">
                        <label htmlFor="parentesco_Enf_ren" className="form-label">Parentesco</label>
                        <input type="text" value={formData.enfrenParentesco} onChange={handleChange} maxLength="20" className="form-control" id="parentesco_Enf_ren" />
                    </div> 

                    <div className="col-sm-2">
                        <label htmlFor="expediente" className="form-label">Núm. Expediente*</label>
                        <input
                            type="text"
                            className="form-control"
                            value={formData.numExpediente}
                            title="El Núm. Expediente debe tener 5 números, un guión (-) y el año al final"
                            onChange={handleChange}
                        />
                    </div>


                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-5">
                        <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                        <button type="reset" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                    </div>


                </div>
            </form>
        </div>
    )
}
