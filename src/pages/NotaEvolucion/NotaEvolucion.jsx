import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const NotaEvolucion = () => {

    const { codNota } = useParams();
    const [formData, setFormData] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await axios.get(`https://localhost:7106/api/bdtbnotaevolucion/buscarporcodigo/${codNota}`);

                console.log(response.data);

                setFormData(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [codNota]);

    const column1 = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha',
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora',
        },
        {
            title: 'Nota de Evolución',
            dataIndex: 'notaEvolucion1',
            key: 'notaEvolucion1',
        },
        {
            title: 'Planes',
            dataIndex: 'planes',
            key: 'planes',
        },
    ]

    const handleEdit = () => {
        navigate(`/editar-nota/${formData.codNota}`);
    };


    return (
        <div className="container-fluid">
            <div className='d-flex justify-content-between'>
                <h4 className='mb-4'>Nota de Evolución</h4>
                <Button>
                    <EditOutlined onClick={handleEdit}/>
                </Button>
            </div>
            <Table className='custom-table' dataSource={[formData]} columns={column1} />
        </div>
    );
};
