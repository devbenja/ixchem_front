import { useState, useEffect } from "react";
import axios from "axios";
import { notification, Table, message, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/apiURL";
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';

export const BuscarPorCentro = () => {

    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtpaciente/listarpacienteunido`);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: "No hay pacientes a listar",
                duration: 3
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${baseURL}/bdtpaciente/buscarpacienteunidoscentro`, {
                params: { CENTRO: searchValue }
            });

            setData(response.data);

            console.log(response.data);

        } catch (error) {
            notification.error({
                message: '¡Error!',
                description: "No existe ningún paciente registrado en este centro",
                duration: 3
            });
        }
    };

    const handleClear = () => {
        setSearchValue('');  // Limpiar el valor del input
        fetchData();  // Mostrar todos los registros
    };

    const columns = [
        {
            title: 'No. Expediente',
            dataIndex: 'nuM_EXPEDIENTE',
            key: 'nuM_EXPEDIENTE',
        },
        {
            title: 'Primer Nombre',
            dataIndex: 'primeR_NOMBRE',
            key: 'primeR_NOMBRE',
        },
        {
            title: 'Primer Apellido',
            dataIndex: 'primeR_APELLIDO',
            key: 'primeR_APELLIDO',
        },
        {
            title: 'Segundo Apellido',
            dataIndex: 'segundO_APELLIDO',
            key: 'segundO_APELLIDO',
        },
        {
            title: 'Identificación',
            dataIndex: 'cedula',
            key: 'cedula',
        },
        {
            title: 'Centro',
            dataIndex: 'centro',
            key: 'centro',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (record) => (
                <Space size="middle">
                    <Button 
                        icon={<FileSearchOutlined />} 
                        onClick={() => handleEditDoctor(record.nuM_EXPEDIENTE)} 
                    />
                </Space>
            ),
            align: 'center'
        }
    ];

    const handleEditDoctor = (nuM_EXPEDIENTE) => {
        console.log(data);

        if (data) {
            navigate(`/historia-centro/${nuM_EXPEDIENTE}`);
        } else {
            message.warning('No hay Datos Para Editar');
        }
    };

    const filteredPacientes = data
        .filter(dataList => dataList.nuM_EXPEDIENTE && dataList.nuM_EXPEDIENTE.includes(searchValue))
        .reduce((acc, dataList) => {
            if (!acc.find(p => p.nuM_EXPEDIENTE === dataList.nuM_EXPEDIENTE)) {
                acc.push(dataList);
            }
            return acc;
    }, []);

    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <h4>Buscar Pacientes por Centro</h4>
            </div>

            <form onSubmit={handleSubmit} className="container-fluid mt-3">
                <div className="col-12">
                    <div className="input-group" role="search">
                        <select
                            className="form-select"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            aria-label="Search"
                        >
                            <option value="">Seleccione el nombre del centro</option>
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

                        <button className="btn btn-success" type="submit">Buscar</button>
                        
                        <button 
                            type="button" 
                            className="btn btn-primary ms-2" 
                            onClick={handleClear}
                        >
                            Limpiar
                        </button>
                    </div>
                </div>
            </form>
            
            <div className="container-fluid">
                <Table 
                    pagination={{ pageSize: 10 }}
                    className="custom-table mt-4" 
                    rowKey="nuM_EXPEDIENTE" 
                    columns={columns} 
                    dataSource={filteredPacientes} 
                />
            </div>
        </div>
    );
}

// Respaldo en caso que el codigo nuevo falle #2
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { notification, Table, message, Button, Space, Input } from "antd";
// import { useNavigate } from "react-router-dom";
// import { baseURL } from "../../../api/apiURL";
// import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';

// export const BuscarPorCentro = () => {

//     const [searchValue, setSearchValue] = useState('');
//     const [data, setData] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get(`${baseURL}/bdtpaciente/listarpacienteunido`);
//             setData(response.data);
//             console.log(response.data);
//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: "No hay pacientes a listar",
//                 duration: 3
//             });
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.get(`${baseURL}/bdtpaciente/buscarpacienteunidoscentro`, {
//                 params: { CENTRO: searchValue }
//             });

//             setData(response.data);

//             console.log(response.data);

//         } catch (error) {
//             notification.error({
//                 message: '¡Error!',
//                 description: "No existe ningún paciente registrado en este centro",
//                 duration: 3
//             });
            
//             //POSIBLE USO AUN NO ESTOY SEGURO
//             // setSearchValue('');  // Limpiar el valor del input 
//             // fetchData();  // Mostrar todos los registros
//         }
//     };

//     const handleClear = () => {
//         setSearchValue('');  // Limpiar el valor del input
//         fetchData();  // Mostrar todos los registros
//     };

//     const columns = [
//         {
//             title: 'No. Expediente',
//             dataIndex: 'nuM_EXPEDIENTE',
//             key: 'nuM_EXPEDIENTE',
//         },
//         {
//             title: 'Primer Nombre',
//             dataIndex: 'primeR_NOMBRE',
//             key: 'primeR_NOMBRE',
//         },
//         {
//             title: 'Primer Apellido',
//             dataIndex: 'primeR_APELLIDO',
//             key: 'primeR_APELLIDO',
//         },
//         {
//             title: 'Segundo Apellido',
//             dataIndex: 'segundO_APELLIDO',
//             key: 'segundO_APELLIDO',
//         },
//         {
//             title: 'Identificación',
//             dataIndex: 'cedula',
//             key: 'cedula',
//         },
//         {
//             title: 'Centro',
//             dataIndex: 'centro',
//             key: 'centro',
//         },
//         {
//             title: 'Acciones',
//             key: 'actions',
//             render: (record) => (
//                 <Space size="middle">
//                     <Button icon={<FileSearchOutlined onClick={() => handleEditDoctor(record.nuM_EXPEDIENTE)} />} />
//                 </Space>
//             ),
//             align: 'center'
//         }
//     ];

//     const handleEditDoctor = (nuM_EXPEDIENTE) => {
//         console.log(data);

//         if (data) {
//             navigate(`/historia-centro/${nuM_EXPEDIENTE}`);
//         } else {
//             message.warning('No hay Datos Para Editar');
//         }
//     };

//     return (
//         <div className="container-fluid">

//             <div className="container-fluid">
//                 <h4>Buscar Pacientes por Centro</h4>
//             </div>

//             <form onSubmit={handleSubmit} className="container-fluid mt-3">
//                 <div className="col-12">
//                     <div className="input-group" role="search">
//                         <select
//                             className="form-select"
//                             value={searchValue}
//                             onChange={(e) => setSearchValue(e.target.value)}
//                             aria-label="Search"
//                         >
//                             <option value="">Seleccione el nombre del centro</option>
//                             <option value="Managua">Managua</option>
//                             <option value="Ciudad Sandino">Ciudad Sandino</option>
//                             <option value="Villa Libertad">Villa Libertad</option>
//                             <option value="Tipitapa">Tipitapa</option>
//                             <option value="Masaya">Masaya</option>
//                             <option value="Granada">Granada</option>
//                             <option value="Matagalpa">Matagalpa</option>
//                             <option value="Estelí">Estelí</option>
//                             <option value="León">León</option>
//                         </select>

//                         <button className="btn btn-success" type="submit">Buscar</button>
                        
//                         <button 
//                             type="button" 
//                             className="btn btn-primary ms-2" 
//                             onClick={handleClear}
//                         >
//                             Limpiar
//                         </button>


//                     </div>
//                 </div>
//             </form>
            
//             <div className="container-fluid">
//                 <Table 
//                     responsive={true}
//                     // pagination={{ pageSize: 10 }}
//                     pagination={false}
//                     className="custom-table mt-4" 
//                     rowKey="nuM_EXPEDIENTE" 
//                     columns={columns} 
//                     dataSource={data} 
//                 />
//             </div>
//         </div>
//     );
// }