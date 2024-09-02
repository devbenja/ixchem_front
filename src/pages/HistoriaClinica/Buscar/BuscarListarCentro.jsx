import { useState, useEffect } from "react";
import axios from "axios";
import { notification, Table, message, Button, Space, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../api/apiURL";

export const TablaEditable = () => {
    const [dataSource, setDataSource] = useState([
        { key: '1', columna1: '', columna2: '', columna3: '' },
        { key: '2', columna1: '', columna2: '', columna3: '' },
        { key: '3', columna1: '', columna2: '', columna3: '' },
        { key: '4', columna1: '', columna2: '', columna3: '' },
        { key: '5', columna1: '', columna2: '', columna3: '' },
        { key: '6', columna1: '', columna2: '', columna3: '' },
    ]);

    const navigate = useNavigate();

    const handleInputChange = (e, key, column) => {
        const newData = dataSource.map(row => {
            if (row.key === key) {
                return { ...row, [column]: e.target.value };
            }
            return row;
        });
        setDataSource(newData);
    };

    const columns = [
        {
            title: 'Columna 1',
            dataIndex: 'columna1',
            key: 'columna1',
            render: (text, record) => (
                <Input value={text} onChange={(e) => handleInputChange(e, record.key, 'columna1')} />
            )
        },
        {
            title: 'Columna 2',
            dataIndex: 'columna2',
            key: 'columna2',
            render: (text, record) => (
                <Input value={text} onChange={(e) => handleInputChange(e, record.key, 'columna2')} />
            )
        },
        {
            title: 'Columna 3',
            dataIndex: 'columna3',
            key: 'columna3',
            render: (text, record) => (
                <Input value={text} onChange={(e) => handleInputChange(e, record.key, 'columna3')} />
            )
        },
    ];

    const handleSubmit = () => {
        console.log('Datos guardados:', dataSource);
        // Aquí puedes procesar los datos o navegar a otra vista
        navigate('/otra-vista'); // Cambia '/otra-vista' por la ruta que necesites
    };

    return (
        <div className="container-fluid">
            <h4>Tabla Editable</h4>
            <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
            <Space className="mt-3">
                <Button type="primary" onClick={handleSubmit}>Guardar y Continuar</Button>
            </Space>
        </div>
    );
};