import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Input, Space } from 'antd';
import { FileSearchOutlined } from '@ant-design/icons';
import { Spinner } from 'react-bootstrap';

import { baseURL } from '../../api/apiURL';

export const Bitacoras = () => {
    
    const [bitacoras, setBitacoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchBitacoras();
    }, []);

    const fetchBitacoras = async () => {
        try {
            const response = await axios.get(`${baseURL}/bdtbitacora/listar`);
            console.log(response.data);
            setBitacoras(response.data);
        } catch (error) {
            setErrors(error.response ? error.response.data : 'Error al cargar los datos');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredBitacoras = bitacoras.filter(bitacora => 
        bitacora.usuario && bitacora.usuario.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            title: 'Usuario',
            dataIndex: 'usuario',
            key: 'usuario',
            render: (usuario) => <a>{usuario}</a>,
        },
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora',
            render: (hora) => hora.substring(0, 8), // Limitar a 8 caracteres
        },
        {
            title: 'Información',
            dataIndex: 'informacion',
            key: 'informacion',
        },
        {
            title: 'Detalles',
            dataIndex: 'detalles',
            key: 'detalles',
            onCell: () => ({
                style: { 
                    wordWrap: 'break-word', 
                    whiteSpace: 'pre-wrap', 
                    maxWidth: 300 
                },
            }),
        },
    ];

    if (loading) {
        return (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status" />
            </div>
        );
    }

    return (
        <div className="container">
            <div className='d-flex align-items-start justify-content-between'>
                <h4>Bitacoras del Sistema</h4>
            </div>
            
            {errors && <p className="text-danger">{errors}</p>}

            <Input
                placeholder="Buscar por Usuario"
                value={searchTerm}
                onChange={handleSearch}
                className="mb-3"
            />

            <Table
                responsive={true}
                pagination={{ pageSize: 7 }}
                className='custom-table'
                columns={columns}
                dataSource={filteredBitacoras} // Usar todos los registros que coinciden
                rowKey="id" 
                onRow={(record) => ({
                    onClick: () => handleRowClick(record.id),
                })}
            />
        </div>
    );
};

//Codigo anterior en caso de error del nuevo
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Table, Button, Input, Space } from 'antd';
// import { FileSearchOutlined } from '@ant-design/icons';
// import { Spinner } from 'react-bootstrap';

// import { baseURL } from '../../api/apiURL';

// export const Bitacoras = () => {
    
//     const [bitacoras, setBitacoras] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [errors, setErrors] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         fetchBitacoras();
//     }, []);

//     const fetchBitacoras = async () => {

//         try {
//             const response = await axios.get(`${baseURL}/bdtbitacora/listar`);
//             console.log(response.data)
//             setBitacoras(response.data);
//         } catch (error) {
//             setErrors(error.response ? error.response.data : 'Error al cargar los datos');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSearch = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const columns = [
//         {
//             title: 'Usuario',
//             dataIndex: 'usuario',
//             key: 'usuario',
//             render: (usuario) => <a>{usuario}</a>,
//         },
//         {
//             title: 'Fecha',
//             dataIndex: 'fecha',
//             key: 'fecha',
//         },
//         {
//             title: 'Hora',
//             dataIndex: 'hora',
//             key: 'hora',
//             render: (hora) => hora.substring(0, 8), // Limitar a 8 caracteres
//         },
//         {
//             title: 'Información',
//             dataIndex: 'informacion',
//             key: 'informacion',
//         },
//         {
//             title: 'Detalles',
//             dataIndex: 'detalles',
//             key: 'detalles',
//             onCell: () => ({
//                 style: { 
//                     wordWrap: 'break-word', 
//                     whiteSpace: 'pre-wrap', 
//                     maxWidth: 300 
//                 },
//             }),
//         },
//     ];

//     if (loading) {
//         return (
//             <div className="d-flex justify-content-center">
//                 <Spinner animation="border" role="status" />
//             </div>
//         );
//     }

//     return (
//         <div className="container">
//             <div className='d-flex align-items-start justify-content-between'>
//                 <h4>Bitacoras del Sistema</h4>
//             </div>
            
//             {errors && <p className="text-danger">{errors}</p>}

//             <Input
//                 placeholder="Buscar por Usuario"
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 className="mb-3"
//             />

//             <Table
//                 responsive={true}
//                 pagination={{ pageSize: 7 }}
//                 className='custom-table'
//                 columns={columns}
//                 dataSource={bitacoras}
//                 rowKey="id" 
//                 onRow={(record) => ({
//                     onClick: () => handleRowClick(record.id),
//                 })}
//             />
//         </div>
//     );
// };