import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, CodeOutlined, LineChartOutlined, 
	    OrderedListOutlined, FileDoneOutlined, WarningOutlined, HistoryOutlined, SignatureOutlined, BookOutlined, FundViewOutlined } 
from '@ant-design/icons';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export const MenuList = () => {

	const { user } = useAuth();

	console.log(user)

	const menuStyle = {
		maxHeight: 'calc(100vh - 50px)',
		overflowY: 'auto'
	};

	return (
		<Menu theme='dark' mode="inline" className='menu-bar' style={menuStyle}>
			<Menu.Item key="home" icon={<HomeOutlined />}><Link to="/home">Home</Link></Menu.Item>

			<Menu.SubMenu className='sub-menu' key="historia" icon={<HistoryOutlined />} title="Historia Clinica">

				{
					user && (user.codRol === 1 || user.codRol === 2) && (
						<Menu.Item key="add" icon={<PlusOutlined />}>
							<Link to="/agregar-historia-clinica">Agregar</Link>
						</Menu.Item>
					)
				}

				<Menu.Item key="search" icon={<SearchOutlined />}>
					<Link to="/buscar-historia-clinica">Buscar</Link>
				</Menu.Item>

				<Menu.Item key="search-centro" icon={<BookOutlined />}>
					<Link to="/buscar-por-centro">Pacientes Centros</Link>
				</Menu.Item>
			</Menu.SubMenu>

			<Menu.SubMenu className='sub-menu' key="lista-problemas" title="Problemas" icon={<OrderedListOutlined />}>
				{
					user && (user.codRol === 1 || user.codRol === 2) && (
						<Menu.Item key="agregar-problema" icon={<PlusOutlined />}>
							<Link to="/agregar-problema">Agregar</Link>
						</Menu.Item>
					)
				}
				<Menu.Item key="buscar-problema" icon={<SearchOutlined />}>
					<Link to="/buscar-problema">Buscar</Link>
				</Menu.Item>
			</Menu.SubMenu>

			<Menu.SubMenu key="nota-sub" title="Nota Evolución" icon={<FundViewOutlined />}>
				{
					user && (user.codRol === 1 || user.codRol === 2) && (
						<Menu.Item key="nota" icon={<PlusOutlined />}>
							<Link to="/agregar-nota-evolucion">Agregar</Link>
						</Menu.Item>
					)
				}
				<Menu.Item key="nota-search" icon={<SearchOutlined />}><Link to="/buscar-nota-evolucion">Buscar</Link></Menu.Item>
			</Menu.SubMenu>

			<Menu.SubMenu key="epi-sub" title="Epicrisis" icon={<FileDoneOutlined />}>
				{
					user && (user.codRol === 1 || user.codRol === 2) && (
						<Menu.Item key="epi-add" icon={<PlusOutlined />}>
							<Link to="/agregar-epicrisis">Agregar</Link>
						</Menu.Item>
					)
				}

				<Menu.Item key="epi-search" icon={<SearchOutlined />}><Link to="/buscar-epicrisis">Buscar</Link></Menu.Item>
			</Menu.SubMenu>

			<Menu.SubMenu key="hist-sub" title="Clfn. Riesgo" icon={<WarningOutlined />}>

				{
					user && (user.codRol === 1 || user.codRol === 2) && (
						<Menu.Item key="hist-add" icon={<PlusOutlined />}>
							<Link to="/agregar-historia-clinica-general">Agregar</Link>
						</Menu.Item>
					)
				}

				<Menu.Item key="hist-search" icon={<SearchOutlined />}><Link to="/buscar-historia-clinica-general">Buscar</Link></Menu.Item>
			</Menu.SubMenu>
			
			{user && user.codRol === 1 && (

				<Menu.SubMenu key="doc-sub" title="Doctores" icon={<UserOutlined />}>
					<Menu.Item key="doctores-add" icon={<PlusOutlined />}><Link to="/agregar-doctor">Agregar</Link></Menu.Item>
					<Menu.Item key="doctores-search" icon={<SearchOutlined />}><Link to="/buscar-doctor">Buscar</Link></Menu.Item>
				</Menu.SubMenu>

			)}
			{user && user.codRol === 1 && (

				<Menu.SubMenu key="users-sub" title="Usuarios" icon={<UsergroupAddOutlined />}>
					<Menu.Item key="user-add" icon={<PlusOutlined />}><Link to="/agregar-usuarios">Agregar</Link></Menu.Item>
					<Menu.Item key="user-search" icon={<SearchOutlined />}><Link to="/buscar-usuario">Buscar</Link></Menu.Item>
				</Menu.SubMenu>

			)}

			<Menu.Item key="change_pass" icon={<SignatureOutlined />}><Link to="/cambiar-contraseña">Contraseña</Link></Menu.Item>

			{user && user.codRol === 1 && (
				<Menu.Item key="bitacoras" icon={<CodeOutlined />}><Link to="/bitacoras">Bitacoras</Link></Menu.Item>
			)}

		</Menu>
	)
}
