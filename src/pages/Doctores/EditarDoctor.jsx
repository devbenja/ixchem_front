import { useState, useEffect } from "react";
import { notification, Switch } from "antd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { baseURL } from "../../api/apiURL";

export const EditarDoctor = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        codDoctor: '',
        primerNombred: '',
        segundoNombre: '',
        primerApellidod: '',
        segundoApellido: '',
        cedula: '',
        clinica: '',
        estado: true
    });

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(`${baseURL}/bdtdoctor/buscarporcoddoctor`, {
                    params: { CodDoctor: id }
                });

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [id]);

    const handleBack = () => {
        navigate('/buscar-doctor');
    }

    const handleCedulaValidation = (valor) => {
        valor = valor.replace(/[^0-9A-Za-z]/g, ""); // Eliminar caracteres que no sean números o letras
        if (valor.length > 3) valor = valor.slice(0, 3) + "-" + valor.slice(3);
        if (valor.length > 10) valor = valor.slice(0, 10) + "-" + valor.slice(10);
        if (valor.length > 15) {
            let letra = valor.slice(15, 16).toUpperCase(); // Convertir la letra a mayúscula
            if (/[^A-Z]/.test(letra)) { // Verificar si es una letra del abecedario
                letra = ""; // Si no es válida, eliminarla
            }
            valor = valor.slice(0, 15) + letra;
        }
        if (valor.length > 16) valor = valor.slice(0, 16); // Limitar a 16 caracteres
        return valor;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Si el campo que se modifica es 'cedula', aplicamos la validación
        if (name === 'cedula') {
            setFormData({
                ...formData,
                [name]: handleCedulaValidation(value) // Validar la cédula antes de actualizar el estado
            });
        } else {
            setFormData({
                ...formData,
                [name]: type === 'checkbox' ? checked : value
            });
        }
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
            console.log(formData);

            await axios.put(`${baseURL}/bdtdoctor/actualizar/${id}`, formData);

            notification.success({
                message: '¡Éxito!',
                description: `Doctor Editado`,
                duration: 3
            });

            setTimeout(() => {
                navigate('/buscar-doctor');
            }, 1000);

        } catch (error) {
            notification.error({
                message: 'Error!',
                description: `${error}`,
                duration: 3
            });
        }
    };

    return (
        <div className='container-fluid'>
            <h4>Editar Doctor</h4>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="row g-3">
                    <div className="col-sm-3">
                        <label htmlFor="primerNombre" className="form-label">Primer Nombre*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="primerNombred"
                            onChange={handleChange}
                            value={formData.primerNombred}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="segundoNombre"
                            onChange={handleChange}
                            value={formData.segundoNombre}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="primerApellido" className="form-label">Primer Apellido*</label>
                        <input
                            type="text"
                            className="form-control"
                            name="primerApellidod"
                            onChange={handleChange}
                            value={formData.primerApellidod}
                        />
                    </div>
                    <div className="col-sm-3">
                        <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            name="segundoApellido"
                            onChange={handleChange}
                            value={formData.segundoApellido}
                        />
                    </div>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="codDoctor" className="form-label">Codigo MINSA</label>
                            <input
                                type="text"
                                className="form-control"
                                name="codDoctor"
                                onChange={handleChange}
                                value={formData.codDoctor}
                            />
                        </div>
                        
                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="cedula" className="form-label">Cedula</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cedula"
                                onChange={handleChange} // Aplicar validación aquí
                                value={formData.cedula}
                            />
                        </div>

                        <div className="col-sm-2 col-12 mt-3">
                            <label htmlFor="clinica" className="form-label">Clínica<span style={{color: 'red'}}> * </span></label>
                            <select
                                className="form-control"
                                name="clinica"
                                onChange={handleChange}
                                value={formData.clinica}
                            >
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

                        <div className="col-sm-2 col-12 mt-3">
                            <div className="d-flex flex-column">
                                <label className="form-label">Estado</label>
                                <Switch
                                    checked={formData.estado}
                                    onChange={handleSwitchChange}
                                    checkedChildren="Habilitado"
                                    unCheckedChildren="Inhabilitado"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                    <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
                    <button type="reset" onClick={handleBack} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

//Codigo correcto anterior previo al nuevo cambio (Se puede usar en caso de error)
// import { useState, useEffect } from "react";
// import { notification, Switch } from "antd";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { baseURL } from "../../api/apiURL";

// export const EditarDoctor = () => {

//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         codDoctor: '',
//         primerNombred: '',
//         segundoNombre: '',
//         primerApellidod: '',
//         segundoApellido: '',
//         cedula: '',
//         clinica: '',
//         estado: true
//     });

//     useEffect(() => {

//         const fetchData = async () => {

//             try {

//                 const response = await axios.get(`${baseURL}/bdtdoctor/buscarporcoddoctor`, {
//                     params: { CodDoctor: id }
//                 });

//                 console.log(response.data);

//                 setFormData(response.data);

//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchData();

//     }, [id]);

//     const handleBack = () => {
//         navigate('/buscar-doctor')
//     }


//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSwitchChange = (checked) => {
//         setFormData({
//             ...formData,
//             estado: checked,
//         });
//     };


//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {

//             console.log(formData)

//             await axios.put(`${baseURL}/bdtdoctor/actualizar/${id}`, formData);

//             notification.success({
//                 message: '¡Éxito!',
//                 description: `Doctor Editado`,
//                 duration: 3
//             });

//             setTimeout(() => {
//                 navigate('/buscar-doctor');
//             }, 1000);

//         } catch (error) {

//             notification.error({
//                 message: 'Error!',
//                 description: `${error}`,
//                 duration: 3
//             });

//         }

//     };


//     return (
//         <div className='container-fluid'>
//             <h4>Editar Doctor</h4>
//             <form onSubmit={handleSubmit} className='mt-4'>
//                 <div className="row g-3">
//                     <div className="col-sm-3">
//                         <label htmlFor="primerNombre" className="form-label">Primer Nombre*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="primerNombred"
//                             onChange={handleChange}
//                             value={formData.primerNombred}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoNombre" className="form-label">Segundo Nombre</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoNombre"
//                             onChange={handleChange}
//                             value={formData.segundoNombre}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="primerApellido" className="form-label">Primer Apellido*</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="primerApellidod"
//                             onChange={handleChange}
//                             value={formData.primerApellidod}
//                         />
//                     </div>
//                     <div className="col-sm-3">
//                         <label htmlFor="segundoApellido" className="form-label">Segundo Apellido</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             name="segundoApellido"
//                             onChange={handleChange}
//                             value={formData.segundoApellido}
//                         />
//                     </div>
//                     <div className='d-flex justify-content-between flex-wrap'>
//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="codDoctor" className="form-label">Codigo MINSA</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="codDoctor"
//                                 onChange={handleChange}
//                                 value={formData.codDoctor}
//                             />
//                         </div>

//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="cedula" className="form-label">Cedula</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="cedula"
//                                 onChange={handleChange}
//                                 value={formData.cedula}
//                             />
//                         </div>

//                         <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="clinica" className="form-label">Clínica<span style={{color: 'red'}}> * </span></label>
//                             <select
//                                 className="form-control"
//                                 name="clinica"
//                                 onChange={handleChange}
//                                 value={formData.clinica}
//                             >
//                                 <option value="">Menú de selección</option>
//                                 <option value="Managua">Managua</option>
//                                 <option value="Ciudad Sandino">Ciudad Sandino</option>
//                                 <option value="Villa Libertad">Villa Libertad</option>
//                                 <option value="Tipitapa">Tipitapa</option>
//                                 <option value="Masaya">Masaya</option>
//                                 <option value="Granada">Granada</option>
//                                 <option value="Matagalpa">Matagalpa</option>
//                                 <option value="Estelí">Estelí</option>
//                                 <option value="León">León</option>
//                             </select>
//                         </div>

//                         {/* <div className="col-sm-2 col-12 mt-3">
//                             <label htmlFor="clinica" className="form-label">Clinica</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 name="clinica"
//                                 onChange={handleChange}
//                                 value={formData.clinica}
//                             />
//                         </div> */}

//                         <div className="col-sm-2 col-12 mt-3">
//                             <div className="d-flex flex-column">
//                                 <label className="form-label">Estado</label>
//                                 <Switch
//                                     checked={formData.estado}
//                                     onChange={handleSwitchChange}
//                                     checkedChildren="Habilitado"
//                                     unCheckedChildren="Inhabilitado"
//                                 />

//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
//                     <button className="btn btn-primary btn-save me-md-2" type="submit">Guardar</button>
//                     <button type="reset" onClick={handleBack} className="btn btn-danger">Cancelar</button>
//                 </div>
//             </form>
//         </div>
//     )
// }
