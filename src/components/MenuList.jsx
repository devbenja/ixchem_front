import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, CodeOutlined, OrderedListOutlined, 
         FileDoneOutlined, WarningOutlined, HistoryOutlined, SignatureOutlined, BookOutlined, FundViewOutlined } 
from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export const MenuList = () => {
    const { user } = useAuth();
    const [menuDisabled, setMenuDisabled] = useState(false);
    const [openKeys, setOpenKeys] = useState([]);

    useEffect(() => {
        const passwordValid = JSON.parse(localStorage.getItem('passwordValid'));
        setMenuDisabled(!passwordValid);
    }, []);

    const menuStyle = {
        maxHeight: 'calc(100vh - 50px)',
        overflowY: 'auto',
    };

    const linkStyle = {
        textDecoration: 'none',
    };

    const homeMenuItemStyle = {
        marginTop: '20px', // Ajusta este valor para controlar el espacio superior
    };

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []); // Solo mantiene abierto el último submenú
    };

    return (
        <Menu 
            theme='dark' 
            mode="inline" 
            className='menu-bar' 
            style={menuStyle} 
            disabled={menuDisabled} 
            openKeys={openKeys} 
            onOpenChange={onOpenChange}
        >
            <Menu.Item key="home" icon={<HomeOutlined />} style={homeMenuItemStyle}>
                <Link to="/home" style={linkStyle}>Home</Link>
            </Menu.Item>

            <Menu.SubMenu className='sub-menu' key="historia" icon={<HistoryOutlined />} title="Historia Clinica">
                {
                    user && (user.codRol === 1 || user.codRol === 2 || user.codRol === 4) && (
                        <Menu.Item key="add" icon={<PlusOutlined />}>
                            <Link to="/agregar-historia-clinica" style={linkStyle}>Agregar</Link>
                        </Menu.Item>
                    )
                }
                <Menu.Item key="search" icon={<SearchOutlined />}>
                    <Link to="/buscar-historia-clinica" style={linkStyle}>Buscar</Link>
                </Menu.Item>
                <Menu.Item key="search-centro" icon={<BookOutlined />}>
                    <Link to="/buscar-por-centro" style={linkStyle}>Pacientes Centros</Link>
                </Menu.Item>
            </Menu.SubMenu>

            {user && (user.codRol === 1 || user.codRol === 2 || user.codRol === 3) && (
                <Menu.SubMenu className='sub-menu' key="lista-problemas" title="Problemas" icon={<OrderedListOutlined />}>
                    {
                        user && (user.codRol === 1 || user.codRol === 2) && (
                            <Menu.Item key="agregar-problema" icon={<PlusOutlined />}>
                                <Link to="/agregar-problema" style={linkStyle}>Agregar</Link>
                            </Menu.Item>
                        )
                    }
                    
                    <Menu.Item key="buscar-problema" icon={<SearchOutlined />}>
                        <Link to="/buscar-problema" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}
            
            {user && (user.codRol === 1 || user.codRol === 2 || user.codRol === 3) && (
                <Menu.SubMenu key="nota-sub" title="Nota Evolución" icon={<FundViewOutlined />}>
                    {
                        user && (user.codRol === 1 || user.codRol === 2) && (
                            <Menu.Item key="nota" icon={<PlusOutlined />}>
                                <Link to="/agregar-nota-evolucion" style={linkStyle}>Agregar</Link>
                            </Menu.Item>
                        )
                    }
                    <Menu.Item key="nota-search" icon={<SearchOutlined />}>
                        <Link to="/buscar-nota-evolucion" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}

            {user && (user.codRol === 1 || user.codRol === 2 || user.codRol === 3) && (
                <Menu.SubMenu key="epi-sub" title="Epicrisis" icon={<FileDoneOutlined />}>
                    {
                        user && (user.codRol === 1 || user.codRol === 2) && (
                            <Menu.Item key="epi-add" icon={<PlusOutlined />}>
                                <Link to="/agregar-epicrisis" style={linkStyle}>Agregar</Link>
                            </Menu.Item>
                        )
                    }
                    <Menu.Item key="epi-search" icon={<SearchOutlined />}>
                        <Link to="/buscar-epicrisis" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}

            {user && (user.codRol === 1 || user.codRol === 2 || user.codRol === 3) && (
                <Menu.SubMenu key="hist-sub" title="Clfn. Riesgo" icon={<WarningOutlined />}>
                    {
                        user && (user.codRol === 1 || user.codRol === 2) && (
                            <Menu.Item key="hist-add" icon={<PlusOutlined />}>
                                <Link to="/agregar-historia-clinica-general" style={linkStyle}>Agregar</Link>
                            </Menu.Item>
                        )
                    }
                    <Menu.Item key="hist-search" icon={<SearchOutlined />}>
                        <Link to="/buscar-historia-clinica-general" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}

            {user && user.codRol === 1 && (
                <Menu.SubMenu key="doc-sub" title="Doctores" icon={<UserOutlined />}>
                    <Menu.Item key="doctores-add" icon={<PlusOutlined />}>
                        <Link to="/agregar-doctor" style={linkStyle}>Agregar</Link>
                    </Menu.Item>
                    <Menu.Item key="doctores-search" icon={<SearchOutlined />}>
                        <Link to="/buscar-doctor" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}

            {user && user.codRol === 1 && (
                <Menu.SubMenu key="users-sub" title="Usuarios" icon={<UsergroupAddOutlined />}>
                    <Menu.Item key="user-add" icon={<PlusOutlined />}>
                        <Link to="/agregar-usuarios" style={linkStyle}>Agregar</Link>
                    </Menu.Item>
                    <Menu.Item key="user-search" icon={<SearchOutlined />}>
                        <Link to="/buscar-usuario" style={linkStyle}>Buscar</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            )}

            <Menu.Item key="change_pass" icon={<SignatureOutlined />}>
                <Link to="/cambiar-contraseña" style={linkStyle}>Contraseña</Link>
            </Menu.Item>

            {user && user.codRol === 1 && (
                <Menu.Item key="bitacoras" icon={<CodeOutlined />}>
                    <Link to="/bitacoras" style={linkStyle}>Bitacoras</Link>
                </Menu.Item>
            )}
        </Menu>
    );
};

// import { Menu } from 'antd';
// import { HomeOutlined, UserOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, CodeOutlined, OrderedListOutlined, 
//          FileDoneOutlined, WarningOutlined, HistoryOutlined, SignatureOutlined, BookOutlined, FundViewOutlined } 
// from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useEffect, useState } from 'react';

// export const MenuList = () => {
//     const { user } = useAuth();
//     const [menuDisabled, setMenuDisabled] = useState(false);

//     useEffect(() => {
//         const passwordValid = JSON.parse(localStorage.getItem('passwordValid'));
//         setMenuDisabled(!passwordValid);
//     }, []);

//     const menuStyle = {
//         maxHeight: 'calc(100vh - 50px)',
//         overflowY: 'auto',
//     };

//     const linkStyle = {
//         textDecoration: 'none',
//     };

//     const homeMenuItemStyle = {
//         marginTop: '20px', // Ajusta este valor para controlar el espacio superior
//     };

//     return (
//         <Menu theme='dark' mode="inline" className='menu-bar' style={menuStyle} disabled={menuDisabled}>
//             <Menu.Item key="home" icon={<HomeOutlined />} style={homeMenuItemStyle}>
//                 <Link to="/home" style={linkStyle}>Home</Link>
//             </Menu.Item>

//             <Menu.SubMenu className='sub-menu' key="historia" icon={<HistoryOutlined />} title="Historia Clinica">
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-historia-clinica" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="search" icon={<SearchOutlined />}>
//                     <Link to="/buscar-historia-clinica" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//                 <Menu.Item key="search-centro" icon={<BookOutlined />}>
//                     <Link to="/buscar-por-centro" style={linkStyle}>Pacientes Centros</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu className='sub-menu' key="lista-problemas" title="Problemas" icon={<OrderedListOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="agregar-problema" icon={<PlusOutlined />}>
//                             <Link to="/agregar-problema" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="buscar-problema" icon={<SearchOutlined />}>
//                     <Link to="/buscar-problema" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="nota-sub" title="Nota Evolución" icon={<FundViewOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="nota" icon={<PlusOutlined />}>
//                             <Link to="/agregar-nota-evolucion" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="nota-search" icon={<SearchOutlined />}>
//                     <Link to="/buscar-nota-evolucion" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="epi-sub" title="Epicrisis" icon={<FileDoneOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="epi-add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-epicrisis" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="epi-search" icon={<SearchOutlined />}>
//                     <Link to="/buscar-epicrisis" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="hist-sub" title="Clfn. Riesgo" icon={<WarningOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="hist-add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-historia-clinica-general" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="hist-search" icon={<SearchOutlined />}>
//                     <Link to="/buscar-historia-clinica-general" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>
            
//             {user && user.codRol === 1 && (
//                 <Menu.SubMenu key="doc-sub" title="Doctores" icon={<UserOutlined />}>
//                     <Menu.Item key="doctores-add" icon={<PlusOutlined />}>
//                         <Link to="/agregar-doctor" style={linkStyle}>Agregar</Link>
//                     </Menu.Item>
//                     <Menu.Item key="doctores-search" icon={<SearchOutlined />}>
//                         <Link to="/buscar-doctor" style={linkStyle}>Buscar</Link>
//                     </Menu.Item>
//                 </Menu.SubMenu>
//             )}

//             {user && user.codRol === 1 && (
//                 <Menu.SubMenu key="users-sub" title="Usuarios" icon={<UsergroupAddOutlined />}>
//                     <Menu.Item key="user-add" icon={<PlusOutlined />}>
//                         <Link to="/agregar-usuarios" style={linkStyle}>Agregar</Link>
//                     </Menu.Item>
//                     <Menu.Item key="user-search" icon={<SearchOutlined />}>
//                         <Link to="/buscar-usuario" style={linkStyle}>Buscar</Link>
//                     </Menu.Item>
//                 </Menu.SubMenu>
//             )}

//             <Menu.Item key="change_pass" icon={<SignatureOutlined />}>
//                 <Link to="/cambiar-contraseña" style={linkStyle}>Contraseña</Link>
//             </Menu.Item>

//             {user && user.codRol === 1 && (
//                 <Menu.Item key="bitacoras" icon={<CodeOutlined />}>
//                     <Link to="/bitacoras" style={linkStyle}>Bitacoras</Link>
//                 </Menu.Item>
//             )}
//         </Menu>
//     );
// };

//Ultima actualizacion
// import { Menu } from 'antd';
// import { HomeOutlined, UserOutlined, UsergroupAddOutlined, PlusOutlined, SearchOutlined, CodeOutlined, OrderedListOutlined, 
//          FileDoneOutlined, WarningOutlined, HistoryOutlined, SignatureOutlined, BookOutlined, FundViewOutlined } 
// from '@ant-design/icons';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { useEffect, useState } from 'react';

// export const MenuList = () => {
//     const { user } = useAuth();
//     const [menuDisabled, setMenuDisabled] = useState(false);

//     useEffect(() => {
//         const passwordValid = JSON.parse(localStorage.getItem('passwordValid'));
//         setMenuDisabled(!passwordValid);
//     }, []);

//     const menuStyle = {
//         maxHeight: 'calc(100vh - 50px)',
//         overflowY: 'auto',
//     };

//     const linkStyle = {
//         textDecoration: 'none',
//     };

//     return (
//         <Menu theme='dark' mode="inline" className='menu-bar' style={menuStyle} disabled={menuDisabled}>
//             <Menu.Item key="home" icon={<HomeOutlined />}><Link to="/home" style={linkStyle}>Home</Link></Menu.Item>

//             <Menu.SubMenu className='sub-menu' key="historia" icon={<HistoryOutlined />} title="Historia Clinica">
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-historia-clinica" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="search" icon={<SearchOutlined />}>
//                     <Link to="/buscar-historia-clinica" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//                 <Menu.Item key="search-centro" icon={<BookOutlined />}>
//                     <Link to="/buscar-por-centro" style={linkStyle}>Pacientes Centros</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu className='sub-menu' key="lista-problemas" title="Problemas" icon={<OrderedListOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="agregar-problema" icon={<PlusOutlined />}>
//                             <Link to="/agregar-problema" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="buscar-problema" icon={<SearchOutlined />}>
//                     <Link to="/buscar-problema" style={linkStyle}>Buscar</Link>
//                 </Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="nota-sub" title="Nota Evolución" icon={<FundViewOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="nota" icon={<PlusOutlined />}>
//                             <Link to="/agregar-nota-evolucion" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="nota-search" icon={<SearchOutlined />}><Link to="/buscar-nota-evolucion" style={linkStyle}>Buscar</Link></Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="epi-sub" title="Epicrisis" icon={<FileDoneOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="epi-add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-epicrisis" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="epi-search" icon={<SearchOutlined />}><Link to="/buscar-epicrisis" style={linkStyle}>Buscar</Link></Menu.Item>
//             </Menu.SubMenu>

//             <Menu.SubMenu key="hist-sub" title="Clfn. Riesgo" icon={<WarningOutlined />}>
//                 {
//                     user && (user.codRol === 1 || user.codRol === 2) && (
//                         <Menu.Item key="hist-add" icon={<PlusOutlined />}>
//                             <Link to="/agregar-historia-clinica-general" style={linkStyle}>Agregar</Link>
//                         </Menu.Item>
//                     )
//                 }
//                 <Menu.Item key="hist-search" icon={<SearchOutlined />}><Link to="/buscar-historia-clinica-general" style={linkStyle}>Buscar</Link></Menu.Item>
//             </Menu.SubMenu>
            
//             {user && user.codRol === 1 && (
//                 <Menu.SubMenu key="doc-sub" title="Doctores" icon={<UserOutlined />}>
//                     <Menu.Item key="doctores-add" icon={<PlusOutlined />}><Link to="/agregar-doctor" style={linkStyle}>Agregar</Link></Menu.Item>
//                     <Menu.Item key="doctores-search" icon={<SearchOutlined />}><Link to="/buscar-doctor" style={linkStyle}>Buscar</Link></Menu.Item>
//                 </Menu.SubMenu>
//             )}

//             {user && user.codRol === 1 && (
//                 <Menu.SubMenu key="users-sub" title="Usuarios" icon={<UsergroupAddOutlined />}>
//                     <Menu.Item key="user-add" icon={<PlusOutlined />}><Link to="/agregar-usuarios" style={linkStyle}>Agregar</Link></Menu.Item>
//                     <Menu.Item key="user-search" icon={<SearchOutlined />}><Link to="/buscar-usuario" style={linkStyle}>Buscar</Link></Menu.Item>
//                 </Menu.SubMenu>
//             )}

//             <Menu.Item key="change_pass" icon={<SignatureOutlined />}><Link to="/cambiar-contraseña" style={linkStyle}>Contraseña</Link></Menu.Item>

//             {user && user.codRol === 1 && (
//                 <Menu.Item key="bitacoras" icon={<CodeOutlined />}><Link to="/bitacoras" style={linkStyle}>Bitacoras</Link></Menu.Item>
//             )}
//         </Menu>
//     );
// };
