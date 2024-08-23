import { useState } from "react";
import axios from "axios";
import { notification, Table, message, Button, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/apiURL";
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons';

export const BuscarPorCentro = () => {

    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.get(`${baseURL}/bdtpaciente/buscarpacienteunidoscentro`, {
                params: { CENTRO: searchValue }
            })

            setData(response.data)

            console.log(response.data)

        } catch (error) {

            notification.error({
                message: '¡Error!',
                description: `${error.message}`,
                duration: 3
            });

        }

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
            title: 'Centro',
            dataIndex: 'centro',
            key: 'centro',
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (record) => (
                <Space size="middle">
                    <Button icon={<FileSearchOutlined onClick={() => handleEditDoctor(record.nuM_EXPEDIENTE)} />} />
                </Space>
            ),
            align: 'center'
        }
    ];

    const handleEditDoctor = (nuM_EXPEDIENTE) => {

        console.log(data)

        if (data) {
            navigate(`/historia-centro/${nuM_EXPEDIENTE}`)
        } else {
            message.warning('No hay Datos Para Editar');
        }

    }

    return (
        <div className="container-fluid">
            <div className="container-fluid">
                <h4>Buscar Pacientes por Centro</h4>
            </div>
            <form onSubmit={handleSubmit} className="container-fluid mt-3">
                <div className="col-12">
                    <div className="input-group" role="search">
                        <Input
                            className="form-control"
                            maxLength="80"
                            type="search"
                            aria-label="Search"
                            value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                            placeholder="Nombre del centro"
                        />
                        <button className="btn btn-success" type="submit">Buscar</button>
                    </div>
                </div>
            </form>
            <div className="container-fluid">
                <Table className="custom-table mt-4" rowKey="nuM_EXPEDIENTE" columns={columns} dataSource={data} pagination={false} />
            </div>
        </div>
    )
}
