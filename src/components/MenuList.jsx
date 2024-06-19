import { Menu } from 'antd';
import { HomeOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, LineChartOutlined, OrderedListOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

export const MenuList = () => {

  return (
    <Menu theme='dark' mode="inline" className='menu-bar'>
      <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/home">Home</Link></Menu.Item>

      <Menu.SubMenu className='sub-menu' key="historia" icon={<UsergroupAddOutlined />} title="Historia Clinica">
        <Menu.Item key="add" icon={<PlusOutlined />}>
          <Link to="/agregar-historia-clinica">Agregar</Link>
        </Menu.Item>
        <Menu.Item key="search" icon={<SearchOutlined />}>
          <Link to="/buscar-historia-clinica">Buscar</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu className='sub-menu' key="lista-problemas" title="Problemas" icon={<OrderedListOutlined />}>
        <Menu.Item key="agregar-problema" icon={<PlusOutlined />}>
          <Link to="/agregar-problema">Agregar</Link>
        </Menu.Item>
        <Menu.Item key="buscar-problema" icon={<SearchOutlined />}>
          <Link to="/buscar-problema">Buscar</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.SubMenu key="nota-sub" title="Nota Evolución" icon={<LineChartOutlined />}>
        <Menu.Item key="nota" icon={<PlusOutlined />}><Link to="/notas-evolucion">Agregar</Link></Menu.Item>
      </Menu.SubMenu>


      <Menu.Item key="doctores" icon={<HomeOutlined />}><Link to="/doctores">Doctores</Link></Menu.Item>
    </Menu>
  )
}
