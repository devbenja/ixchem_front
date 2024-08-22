import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Table, Button, Space, Modal, notification } from 'antd';
import { FileSearchOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useAuth } from '../../context/AuthContext';
import { baseURL } from '../../api/apiURL';


export const Embarazos = () => {

	const { id } = useParams();
	const [embarazos, setEmbarazos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const { user } = useAuth();

	useEffect(() => {
		fetchEmbarazo();
	}, []);

	const fetchEmbarazo = async () => {

		try {

			const response = await axios.get(`${baseURL}/bdtbembarazoactual/listar/${id}`);

			setEmbarazos(response.data);

			console.log(response.data)

		} catch (error) {

			setError(error.response ? error.response.data : 'Error fetching data');

		} finally {

			setLoading(false);

		}

	};

	const columnEmbarazos = [
		{
			title: 'Numero de Expediente',
			dataIndex: 'numExpediente',
			key: 'numExpediente',
		},
		{
			title: 'Diagnostico Embarazo',
			dataIndex: 'diagnostico',
			key: 'diagnostico',
			render: (diagnostico) => {
				if (diagnostico === null || diagnostico === undefined) {
					return '';
				}
				return diagnostico ? 'Sí' : 'No';
			}
		},
		{
			title: 'Acciones',
			key: 'acciones',
			render: (text, record) => (
				<Space align="center" size="middle">
					<Button icon={<FileSearchOutlined onClick={() => handleRowClickEmbarazo(record.codEmbarazo)} />} />

					{
						user && user.codRol === 1 && (
							<>
								<Button icon={<EditOutlined />} onClick={(e) => { e.stopPropagation(); handleEdit(record.codEmbarazo); }} />

								<Button icon={<DeleteOutlined onClick={(e) => { e.stopPropagation(); showDeleteConfirm(record.codEmbarazo); }} />} />
							</>
						)
					}
				</Space>
			),
			align: 'center',
		},
	]

	const handleEdit = (codEmbarazo) => {
		navigate(`/editar-embarazo/${codEmbarazo}`);
	};

	const handleRowClickEmbarazo = (codEmbarazo) => {
		navigate(`/embarazo/${codEmbarazo}`);
	}

	const deleteEmbarazo = async (id) => {

		try {

			await axios.delete(`${baseURL}/bdtbembarazoactual/eliminar/${id}`);

			notification.success({
				message: '¡Éxito!',
				description: `Embarazo Actual Eliminado`,
				duration: 3
			});

			setEmbarazos(prevEmb => prevEmb.filter(u => u.codEmbarazo !== id));

		} catch (error) {

			setError(error.response ? error.response.data : 'Error al Eliminar Datos');

		}

	};

	const showDeleteConfirm = (id) => {
		Modal.confirm({
			centered: true,
			title: '¿Está seguro que desea eliminar este Dato?',
			icon: <ExclamationCircleOutlined />,
			content: 'Esta acción no se puede deshacer.',
			okText: 'Sí',
			okType: 'danger',
			cancelText: 'No',
			onOk() {
				deleteEmbarazo(id);
			},
			onCancel() {
				console.log('Cancelado');
			},
		});
	};

	const handleBack = () => {
		navigate('/buscar-historia-clinica-general');
	}

	return (
		<div className='container-fluid'>
			<div className="container-fluid d-flex justify-content-between align-items-center">
				<h4>Embarazo Actual del Expediente: {id}</h4>
				<Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
			</div>
			<Table
				columns={columnEmbarazos}
				rowKey="codEmbarazo"
				dataSource={embarazos}
				className='mt-3 custom-table'
				onRow={(record) => ({
					onClick: () => handleRowClickEmbarazo(record.codEmbarazo),
				})}
			/>
		</div>
	)
}
