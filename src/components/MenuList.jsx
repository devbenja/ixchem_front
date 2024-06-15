import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, EditOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

export const MenuList = () => {
  return (
    <Menu theme='dark' mode="inline" className='menu-bar'>
        <Menu.Item key="home" icon={<HomeOutlined/>}><Link to="/home">Home</Link></Menu.Item>
        <Menu.SubMenu key="historia" icon={<UsergroupAddOutlined/>} title="Historia Clinica">
            <Menu.Item key="add" icon={<PlusOutlined/>}>
                <Link to="/agregar-historia-clinica">Agregar</Link>
            </Menu.Item>
            <Menu.Item key="search" icon={<SearchOutlined/>}>
                <Link to="/buscar-historia-clinica">Buscar</Link>
            </Menu.Item>
            <Menu.Item key="update" icon={<EditOutlined/>}>Actualizar</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="nota" icon={<HomeOutlined/>}><Link to="/notas-evolucion">Nota Evolución</Link></Menu.Item>
        <Menu.Item key="lista" icon={<HomeOutlined/>}><Link to="/lista-problemas">Lista Problemas</Link></Menu.Item>
        <Menu.Item key="doctores" icon={<HomeOutlined/>}><Link to="/doctores">Doctores</Link></Menu.Item>
    </Menu>
  )
}
 