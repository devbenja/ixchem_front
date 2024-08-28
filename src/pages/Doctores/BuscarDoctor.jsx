import { useState, useEffect } from "react";
import axios from "axios";
import { notification, Table, message, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/apiURL";
import { EditOutlined } from '@ant-design/icons';

export const BuscarDoctor = () => {

	const [searchType, setSearchType] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [firstName, setFirstName] = useState('');
	const [firstLastName, setFirstLastName] = useState('');

	const [data, setData] = useState([]);

	const navigate = useNavigate();

	// Fetch all doctors when the component mounts
	useEffect(() => {
		const fetchAllDoctors = async () => {
			try {
				const response = await axios.get(`${baseURL}/bdtdoctor/listar`);
				setData(response.data);
			} catch (error) {
				notification.error({
					message: '¡Error!',
					description: 'No se pudieron cargar los doctores',
					duration: 3
				});
			}
		};

		fetchAllDoctors();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			if (!searchType) {
				notification.warning({
					message: '¡Atención!',
					description: 'Por favor, seleccione una opción',
					duration: 3
				});
				return;
			}

			let response;

			if (searchType === 'Codigo') {
				response = await axios.get(`${baseURL}/bdtdoctor/buscarporcoddoctor`, {
					params: { CodDoctor: searchValue }
				});

				setData([response.data]);

			} else if (searchType === 'Nombre') {
				response = await axios.get(`${baseURL}/bdtdoctor/buscarpornombre`, {
					params: { PrimerNombred: firstName, PrimerApellidod: firstLastName }
				});

				setData(response.data);
			}

			console.log(response.data);

		} catch (error) {
			notification.error({
				message: '¡Error!',
				description: 'No se encuentra el doctor',
				duration: 3
			});
		}
	};

	const columns = [
		{
			title: 'Codigo MINSA',
			dataIndex: 'codDoctor',
			key: 'codDoctor',
		},
		{
			title: 'Primer Nombre',
			dataIndex: 'primerNombred',
			key: 'primerNombred',
		},
		{
			title: 'Segundo Nombre',
			dataIndex: 'segundoNombre',
			key: 'segundoNombre',
		},
		{
			title: 'Primer Apellido',
			dataIndex: 'primerApellidod',
			key: 'primerApellidod',
		},
		{
			title: 'Segundo Apellido',
			dataIndex: 'segundoApellido',
			key: 'segundoApellido',
		},
		{
			title: 'Acciones',
			key: 'actions',
			render: (record) => (
				<Space size="middle">
                    <Button icon={<EditOutlined onClick={() => handleEditDoctor(record.codDoctor)} />} />
                </Space>
			), 
			align: 'center'
		}
	];

	const handleEditDoctor = (codDoctor) => {
		if (data) {
			navigate(`/editar-doctor/${codDoctor}`)
		} else {
			message.warning('No hay Datos Para Editar');
		}
	}

	return (
		<div className="container-fluid">
			<div className="container-fluid">
				<h4>Buscar Doctor</h4>
			</div>
			<form onSubmit={handleSubmit} className="container-fluid mt-3">
				<div className="container-fluid d-flex gap-2">
					<div className="col-12 col-sm-6 col-md-3">
						<select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
							<option value="">Seleccionar Opcion</option>
							<option value="Codigo">Codigo MINSA</option>
							<option value="Nombre">Nombre</option>
						</select>
					</div>
					<div className="col-12 col-sm-6 col-md-9 d-flex">
						<div className="input-group" role="search">
							{searchType === 'Nombre' ? (
								<div className="d-flex gap-2">
									<div className="d-flex align-items-center justify-content-center">
										<input 
											className="form-control" 
											type="text" value={firstName} 
											onChange={(e) => setFirstName(e.target.value)}
											placeholder="Primer Nombre"
										/>
									</div>
									<div className="d-flex align-items-center justify-content-center">
										<input 
											className="form-control" 
											type="text" value={firstLastName} 
											onChange={(e) => setFirstLastName(e.target.value)} 
											placeholder="Primer Apellido"
										/>
									</div>
								</div>
							) : (
								<input
									className="form-control"
									maxLength="80"
									type="search"
									aria-label="Search"
									value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
									placeholder="Codigo MINSA"
								/>
							)}
							<button className="btn btn-success" type="submit">Buscar</button>
						</div>
					</div>
				</div>
			</form>
			<div className="container-fluid">
				<Table className="custom-table mt-4" rowKey="codDoctor" columns={columns} dataSource={data} pagination={false} />
			</div>
		</div>
	)
}

//Codigo original de respaldo en caso de error del nuevo codigo
// import { useState } from "react";
// import axios from "axios";
// import { notification, Table, message, Button, Space } from "antd";
// import { useNavigate } from "react-router-dom";
// import { baseURL } from "../../api/apiURL";
// import { EditOutlined } from '@ant-design/icons';

// export const BuscarDoctor = () => {

// 	const [searchType, setSearchType] = useState('');
// 	const [searchValue, setSearchValue] = useState('');
// 	const [firstName, setFirstName] = useState('');
// 	const [firstLastName, setFirstLastName] = useState('');

// 	const [data, setData] = useState([]);

// 	const navigate = useNavigate();

// 	const handleSubmit = async (e) => {

// 		e.preventDefault();

// 		let response;

// 		try {
// 			if (!searchType) {
// 				notification.warning({
// 					message: '¡Atención!',
// 					description: 'Por favor, seleccione una opción',
// 					duration: 3
// 				});
// 				return; // Salir de la función si no hay selección
// 			}
		
// 			let response;
		
// 			if (searchType === 'Codigo') {
// 				response = await axios.get(`${baseURL}/bdtdoctor/buscarporcoddoctor`, {
// 					params: { CodDoctor: searchValue }
// 				});
		
// 				setData([response.data]);
		
// 			} else if (searchType === 'Nombre') {
// 				response = await axios.get(`${baseURL}/bdtdoctor/buscarpornombre`, {
// 					params: { PrimerNombred: firstName, PrimerApellidod: firstLastName }
// 				});
		
// 				setData(response.data);
// 			}
		
// 			console.log(response.data);
		
// 		} catch (error) {
// 			notification.error({
// 				message: '¡Error!',
// 				description: 'No se encuentra el doctor',
// 				duration: 3
// 			});
// 		}

// 	};

// 	const columns = [
// 		{
// 			title: 'Codigo MINSA',
// 			dataIndex: 'codDoctor',
// 			key: 'codDoctor',
// 		},
// 		{
// 			title: 'Primer Nombre',
// 			dataIndex: 'primerNombred',
// 			key: 'primerNombred',
// 		},
// 		{
// 			title: 'Segundo Nombre',
// 			dataIndex: 'segundoNombre',
// 			key: 'segundoNombre',
// 		},
// 		{
// 			title: 'Primer Apellido',
// 			dataIndex: 'primerApellidod',
// 			key: 'primerApellidod',
// 		},
// 		{
// 			title: 'Segundo Apellido',
// 			dataIndex: 'segundoApellido',
// 			key: 'segundoApellido',
// 		},
// 		{
// 			title: 'Acciones',
// 			key: 'actions',
// 			render: (record) => (
// 				<Space size="middle">
//                     <Button icon={<EditOutlined onClick={() => handleEditDoctor(record.codDoctor)} />} />
//                 </Space>
// 			), 
// 			align: 'center'
// 		}
// 	];

// 	const columns2 = [
// 		{
// 			title: 'Segundo Apellido',
// 			dataIndex: 'segundoApellido',
// 			key: 'segundoApellido',
// 		},
// 		{
// 			title: 'Cedula',
// 			dataIndex: 'cedula',
// 			key: 'cedula',
// 		},
// 		{
// 			title: 'Clinica',
// 			dataIndex: 'clinica',
// 			key: 'clinica',
// 		},

// 	];

// 	const handleEditDoctor = (codDoctor) => {

// 		console.log(data)

// 		if (data) {
// 			navigate(`/editar-doctor/${codDoctor}`)
// 		} else {
// 			message.warning('No hay Datos Para Editar');
// 		}

// 	}

// 	return (
// 		<div className="container-fluid">
// 			<div className="container-fluid">
// 				<h4>Buscar Doctor</h4>
// 			</div>
// 			<form onSubmit={handleSubmit} className="container-fluid mt-3">
// 				<div className="container-fluid d-flex gap-2">
// 					<div className="col-12 col-sm-6 col-md-3">
// 						<select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
// 							<option value="">Seleccionar Opcion</option>
// 							<option value="Codigo">Codigo MINSA</option>
// 							<option value="Nombre">Nombre</option>
// 						</select>
// 					</div>
// 					<div className="col-12 col-sm-6 col-md-9 d-flex">
// 						<div className="input-group" role="search">
// 							{searchType === 'Nombre' ? (
// 								<div className="d-flex gap-2">
// 									<div className="d-flex align-items-center justify-content-center">
// 										{/* <label>Primer Nombre</label> */}
// 										<input 
// 											className="form-control" 
// 											type="text" value={firstName} 
// 											onChange={(e) => setFirstName(e.target.value)}
// 											placeholder="Primer Nombre"
// 										/>
// 									</div>
// 									<div className="d-flex align-items-center justify-content-center">
// 										{/* <label>Primer Apellido</label> */}
// 										<input 
// 											className="form-control" 
// 											type="text" value={firstLastName} 
// 											onChange={(e) => setFirstLastName(e.target.value)} 
// 											placeholder="Primer Apellido"
// 										/>
// 									</div>
// 								</div>
// 							) : (
// 								<input
// 									className="form-control"
// 									maxLength="80"
// 									type="search"
// 									aria-label="Search"
// 									value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
// 									placeholder="Codigo MINSA"
// 								/>
// 							)}

// 							<button className="btn btn-success" type="submit">Buscar</button>
// 						</div>
// 					</div>
// 				</div>
// 			</form>
// 			<div className="container-fluid">
// 				<Table className="custom-table mt-4" rowKey="codDoctor" columns={columns} dataSource={data} pagination={false} />
// 			</div>
// 			{/* <div className='container-fluid d-grid gap-2 d-md-flex justify-content-md-end mt-5'>
// 				<button onClick={handleEditDoctor} type="submit" className="btn btn-warning">Editar</button>
// 			</div> */}

// 		</div>
		
// 	)
// }