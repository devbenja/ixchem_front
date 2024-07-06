import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { ArrowLeftOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Table, Button, Input, Space  } from "antd";

import { baseURL } from "../../api/apiURL";


export const Unidos = () => {

    // id es el nuM_EXPEDIENTE
    const { id } = useParams();
    const navigate = useNavigate();

    const [unidosExp, setUnidosExp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetchUnidosExp();

    }, []);

    const fetchUnidosExp = async () => {

        try {

            const response = await axios.get(`${baseURL}/bdtbclasificaionriesgo/buscarpornumexpedienteclasificacionriesgo`, {
                params: { NUM_EXPEDIENTE: id }
            });

            const dataWithUniqueKey = response.data.map((item, index) => ({ 
                ...item, 
                uniqueKey: `${item.coD_HOJARIESGO}-${index}` 
            }));

            setUnidosExp(dataWithUniqueKey);

            console.log(dataWithUniqueKey);

        } catch (error) {

            setError(error.response ? error.response.data : 'Error fetching data');

        } finally {

            setLoading(false);

        }

    };

    const column = [
        {
            title: 'Numero de Expediente',
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
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space align="center" size="middle">
                    <Button icon={<FileSearchOutlined />} />
                </Space>
            ),
            align: 'center',
        },
    ]

    const handleBack = () => {
        navigate('/buscar-historia-clinica-general');
    }

    const handleUnidoIndividual = (coD_HOJARIESGO) => {
        navigate(`/unido/${coD_HOJARIESGO}`)
    }

    return (
        <div className="container-fluid">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <h4>Clasificación de Riesgo del Expediente: {id}</h4>
                <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
            </div>
            <Table 
                className="custom-table mt-4"
                columns={column} 
                dataSource={unidosExp} 
                pagination={{ pageSize: 7 }} 
                rowKey="uniqueKey"
                onRow={(record) => ({
                    onClick: () => handleUnidoIndividual(record.coD_HOJARIESGO),
                })}
            />
        </div>
    )
}
