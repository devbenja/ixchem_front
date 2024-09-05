import { useState } from "react";
import { useEffect } from "react"; // Importamos useEffect para gestionar el intervalo de cambio
import { Route, Routes, useLocation } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

import { AgregarHistoria } from "./pages/HistoriaClinica/Agregar/AgregarHistoria";
import { BuscarHistoria } from "./pages/HistoriaClinica/Buscar/BuscarHistoria";
import { Logo } from "./components/Logo";
import { MenuList } from "./components/MenuList";

import { Layout, Button, Modal, theme } from "antd";  // Importa Modal
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";
import { NotaEvolucion } from "./pages/NotaEvolucion/NotaEvolucion";
import { Doctores } from "./pages/Doctores/Doctores";
import { AgregarProblema } from "./pages/ListaProblema/AgregarProblema";
import { BuscarProblema } from "./pages/ListaProblema/BuscarProblema";
import { ProblemaDetalles } from "./pages/ListaProblema/ProblemaDetalles";
import { EditarPaciente } from "./pages/HistoriaClinica/Editar/EditarPaciente";
import { EditarAntPersonales } from "./pages/HistoriaClinica/Editar/EditarAntPersonales";
import { EditarAntPatPersonales } from "./pages/HistoriaClinica/Editar/EditarAntPatPersonales";
import { EditarAntPatFam } from "./pages/HistoriaClinica/Editar/EditarAntPatFam";
import { EditarInformacion } from "./pages/HistoriaClinica/Editar/EditarInformacion";
import { AgregarDoctor } from "./pages/Doctores/AgregarDoctor";
import { AgregarNota } from "./pages/NotaEvolucion/AgregarNota";
import { BuscarNota } from "./pages/NotaEvolucion/BuscarNota";
import { BuscarDoctor } from "./pages/Doctores/BuscarDoctor";
import { EditarDoctor } from "./pages/Doctores/EditarDoctor";
import { AgregarEpicrisis } from "./pages/Epicrisis/AgregarEpicrisis";
import { BuscarEpicrisis } from "./pages/Epicrisis/BuscarEpicrisis";
import { EditarEpicrisis } from "./pages/Epicrisis/EditarEpicrisis";
import { AgregarHistoriaClinicaGeneral } from "./pages/HistoriaClinicaGeneral/AgregarHistoriaClinicaGeneral";
import { EditHistoriaClinicaGeneral } from "./pages/HistoriaClinicaGeneral/EditHistoriaClinicaGeneral";
import { NotaDetalle } from "./pages/NotaEvolucion/NotaDetalle";
import { EditarNota } from "./pages/NotaEvolucion/EditarNota";
import { ListaEpicrisis } from "./pages/Epicrisis/ListaEpicrisis";
import { EpicrisisDetalle } from "./pages/Epicrisis/EpicrisisDetalle";
import { AgregarUsuarios } from "./pages/Usuarios/AgregarUsuarios";
import { BuscarUsuario } from "./pages/Usuarios/BuscarUsuario";
import { EditarUsuario } from "./pages/Usuarios/EditarUsuario";
import { BuscarHCGeneral } from "./pages/HistoriaClinicaGeneral/BuscarHCGeneral";
import { HistoriasCG } from "./pages/HistoriaClinicaGeneral/HistoriasCG";
import { HistoriaIndividual } from "./pages/HistoriaClinicaGeneral/HistoriaIndividual";
import { ObstetricosDetalles } from "./pages/HistoriaClinicaGeneral/ObstetricosDetalles";
import { Obstetrico } from "./pages/HistoriaClinicaGeneral/Obstetrico";
import { EditarObstetrico } from "./pages/HistoriaClinicaGeneral/EditarObstetrico";
import { Unidos } from "./pages/HistoriaClinicaGeneral/Unidos";
import { UnidoIndividual } from "./pages/HistoriaClinicaGeneral/UnidoIndividual";
import { Embarazos } from "./pages/HistoriaClinicaGeneral/Embarazos";
import { EmbarazoIndividual } from "./pages/HistoriaClinicaGeneral/EmbarazoIndividual";
import { EditarEmbarazo } from "./pages/HistoriaClinicaGeneral/EditarEmbarazo";

import { useAuth } from "./context/AuthContext";
import { CambiarContra } from "./pages/Usuarios/CambiarContra";
import { Bitacoras } from "./pages/Bitacoras/Bitacoras";
import { BuscarPorCentro } from "./pages/HistoriaClinica/Buscar/BuscarPorCentro.jsx";
import { HistoriaCentro } from "./pages/HistoriaClinica/Buscar/HistoriaClinicaCentro.jsx";

const { Header, Sider, Content } = Layout;

  export const App = () => {

    const { isAuth, logout, user } = useAuth();
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal
    const location = useLocation();

    // Estado para manejar el mensaje que se muestra
    const [currentMessage, setCurrentMessage] = useState(`BIENVENIDO AL SISTEMA DE IXCHEN, ${user?.nombre ?? ''} ${user?.apellido ?? ''}`);

    // Cambiar el mensaje dinámico cada ciertos segundos
    useEffect(() => {
      const messages = [
        `Bienvenido, ${user?.nombre ?? ''} ${user?.apellido ?? ''}`,
        "SISTEMA DE EXPEDIENTES CLINICOS DIGITALES IXCHEN"
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setCurrentMessage(messages[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, [user?.nombre, user?.apellido]);

    const {
      token: { colorBgContainer },
    } = theme.useToken();

    const shouldShowLayout = () => {
      return location.pathname !== '/';
    };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    logout();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {shouldShowLayout() && (
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" className="sidebar" style={{ position: 'fixed' }}>
            <Logo />
            <MenuList />
          </Sider>
          <Layout className={collapsed ? 'collapsed' : 'expanded'} style={{ marginLeft: collapsed ? 80 : 230 }}>
            <Header style={{ padding: 0, background: colorBgContainer, transition: 'margin-left 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                onClick={() => setCollapsed(!collapsed)}
                className="toggle"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            
              {/* {isAuth && (
                <div className="d-flex align-items-center gap-3">
                  <p className="m-0">BIENVENIDO AL SISTEMA DE IXCHEN, {user.nombre} {user.apellido}</p>
                  <Button onClick={showModal} style={{ marginRight: '40px', backgroundColor: 'red', color: 'white' }}>
                    <LogoutOutlined />Cerrar Sesión
                  </Button>
                </div>
              )} */}

            {isAuth && (
              <div className="d-flex align-items-center gap-3">
                <p className="bounce-message m-0">{currentMessage}</p>
                <Button onClick={showModal} style={{ marginRight: '40px', backgroundColor: 'red', color: 'white' }}>
                  <LogoutOutlined />Cerrar Sesión
                </Button>
              </div>
            )}
              
            </Header>
            <Content style={{ margin: '24px 16px 30px', overflow: 'initial', transition: 'margin-left 0.2s' }}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/agregar-historia-clinica" element={<AgregarHistoria />} />
                <Route path="/buscar-historia-clinica" element={<BuscarHistoria />} />
                <Route path="/agregar-problema" element={<AgregarProblema />} />
                <Route path="/notas-evolucion" element={<NotaEvolucion />} />
                <Route path="/buscar-problema" element={<BuscarProblema />} />
                <Route path="/problemas/:numExpediente" element={<ProblemaDetalles />} />
                <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
                <Route path="/editar-antecedentes-personales/:id" element={<EditarAntPersonales />} />
                <Route path="/editar-antecedentes-patologicos-personales/:id" element={<EditarAntPatPersonales />} />
                <Route path="/editar-antecedentes-patologicos-familiares/:id" element={<EditarAntPatFam />} />
                <Route path="/editar-informacion/:id" element={<EditarInformacion />} />

                <Route path="/agregar-nota-evolucion" element={<AgregarNota />} />
                <Route path="/buscar-nota-evolucion" element={<BuscarNota />} />
                <Route path="/notas-de-evolucion/:numExpediente" element={<NotaDetalle />} />
                <Route path="/nota/:codNota" element={<NotaEvolucion />} />
                <Route path="/editar-nota/:codNota" element={<EditarNota />} />


                <Route path="/doctores" element={<Doctores />} />
                <Route path="/agregar-doctor" element={<AgregarDoctor />} />
                <Route path="/buscar-doctor" element={<BuscarDoctor />} />
                <Route path="/editar-doctor/:id" element={<EditarDoctor />} />

                <Route path="/agregar-epicrisis" element={<AgregarEpicrisis />} />
                <Route path="/buscar-epicrisis" element={<BuscarEpicrisis />} />
                <Route path="/editar-epicrisis/:id" element={<EditarEpicrisis />} />
                <Route path="/epicrisis/:numExpediente" element={<ListaEpicrisis />} />
                <Route path="/epicrisis-detalle/:codEpicrisis" element={<EpicrisisDetalle />} />

                <Route path="/agregar-historia-clinica-general" element={<AgregarHistoriaClinicaGeneral />} />
                <Route path="/buscar-historia-clinica-general" element={<BuscarHCGeneral />} />
                <Route path="/editar-historia-clinica-general/:id" element={<EditHistoriaClinicaGeneral />} />
                <Route path="/historias-generales/:numExpediente" element={<HistoriasCG />} />
                <Route path="/historia/:codHistoriaClinica" element={<HistoriaIndividual />} />
                <Route path="/obstetricos/:numExpediente" element={<ObstetricosDetalles />} />
                <Route path="/obstetrico/:id" element={<Obstetrico />} />
                <Route path="/editar-obstetrico/:id" element={<EditarObstetrico />} />
                <Route path="/unidos/:id" element={<Unidos />} />
                <Route path="/unido/:id" element={<UnidoIndividual />} />
                <Route path="/embarazos/:id" element={<Embarazos />} />
                <Route path="/embarazo/:id" element={<EmbarazoIndividual />} />
                <Route path="/editar-embarazo/:id" element={<EditarEmbarazo />} />

                <Route path="/agregar-usuarios" element={<AgregarUsuarios />} />
                <Route path="/buscar-usuario" element={<BuscarUsuario />} />
                <Route path="/editar-usuario/:codAdmin" element={<EditarUsuario />} />

                <Route path="/cambiar-contraseña" element={<CambiarContra/>} />

                <Route path="/bitacoras" element={<Bitacoras/>} />
                <Route path="/buscar-por-centro" element={<BuscarPorCentro/>} />
                <Route path="/historia-centro/:numExp" element={<HistoriaCentro/>} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
      {!shouldShowLayout() && (
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      )}

      {/* Modal de confirmación */}
      <Modal
        title="Confirmar Cierre de Sesión"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Sí, Cerrar Sesión"
        cancelText="Cancelar"
      >
        <p>¿Está seguro que desea cerrar sesión?</p>
      </Modal>

      {/* Estilos del mensaje de bienvenida */}
      <style jsx>{`
        .bounce-message {
          font-size: 1.2rem;
          font-weight: bold;
          color: #c41d7f; 
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.3);
          animation: bounce 1.5s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
     `}</style>

    </>
  )
}

// Ultimo codigo actualizado
// import { useState } from "react";
// import { useEffect } from "react"; // Importamos useEffect para gestionar el intervalo de cambio
// import { Route, Routes, useLocation } from "react-router-dom";

// import { Login } from "./pages/Login/Login";
// import { Home } from "./pages/Home/Home";

// import { AgregarHistoria } from "./pages/HistoriaClinica/Agregar/AgregarHistoria";
// import { BuscarHistoria } from "./pages/HistoriaClinica/Buscar/BuscarHistoria";
// import { Logo } from "./components/Logo";
// import { MenuList } from "./components/MenuList";

// import { Layout, Button, Modal, theme } from "antd";  // Importa Modal
// import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from "@ant-design/icons";
// import { NotaEvolucion } from "./pages/NotaEvolucion/NotaEvolucion";
// import { Doctores } from "./pages/Doctores/Doctores";
// import { AgregarProblema } from "./pages/ListaProblema/AgregarProblema";
// import { BuscarProblema } from "./pages/ListaProblema/BuscarProblema";
// import { ProblemaDetalles } from "./pages/ListaProblema/ProblemaDetalles";
// import { EditarPaciente } from "./pages/HistoriaClinica/Editar/EditarPaciente";
// import { EditarAntPersonales } from "./pages/HistoriaClinica/Editar/EditarAntPersonales";
// import { EditarAntPatPersonales } from "./pages/HistoriaClinica/Editar/EditarAntPatPersonales";
// import { EditarAntPatFam } from "./pages/HistoriaClinica/Editar/EditarAntPatFam";
// import { EditarInformacion } from "./pages/HistoriaClinica/Editar/EditarInformacion";
// import { AgregarDoctor } from "./pages/Doctores/AgregarDoctor";
// import { AgregarNota } from "./pages/NotaEvolucion/AgregarNota";
// import { BuscarNota } from "./pages/NotaEvolucion/BuscarNota";
// import { BuscarDoctor } from "./pages/Doctores/BuscarDoctor";
// import { EditarDoctor } from "./pages/Doctores/EditarDoctor";
// import { AgregarEpicrisis } from "./pages/Epicrisis/AgregarEpicrisis";
// import { BuscarEpicrisis } from "./pages/Epicrisis/BuscarEpicrisis";
// import { EditarEpicrisis } from "./pages/Epicrisis/EditarEpicrisis";
// import { AgregarHistoriaClinicaGeneral } from "./pages/HistoriaClinicaGeneral/AgregarHistoriaClinicaGeneral";
// import { EditHistoriaClinicaGeneral } from "./pages/HistoriaClinicaGeneral/EditHistoriaClinicaGeneral";
// import { NotaDetalle } from "./pages/NotaEvolucion/NotaDetalle";
// import { EditarNota } from "./pages/NotaEvolucion/EditarNota";
// import { ListaEpicrisis } from "./pages/Epicrisis/ListaEpicrisis";
// import { EpicrisisDetalle } from "./pages/Epicrisis/EpicrisisDetalle";
// import { AgregarUsuarios } from "./pages/Usuarios/AgregarUsuarios";
// import { BuscarUsuario } from "./pages/Usuarios/BuscarUsuario";
// import { EditarUsuario } from "./pages/Usuarios/EditarUsuario";
// import { BuscarHCGeneral } from "./pages/HistoriaClinicaGeneral/BuscarHCGeneral";
// import { HistoriasCG } from "./pages/HistoriaClinicaGeneral/HistoriasCG";
// import { HistoriaIndividual } from "./pages/HistoriaClinicaGeneral/HistoriaIndividual";
// import { ObstetricosDetalles } from "./pages/HistoriaClinicaGeneral/ObstetricosDetalles";
// import { Obstetrico } from "./pages/HistoriaClinicaGeneral/Obstetrico";
// import { EditarObstetrico } from "./pages/HistoriaClinicaGeneral/EditarObstetrico";
// import { Unidos } from "./pages/HistoriaClinicaGeneral/Unidos";
// import { UnidoIndividual } from "./pages/HistoriaClinicaGeneral/UnidoIndividual";
// import { Embarazos } from "./pages/HistoriaClinicaGeneral/Embarazos";
// import { EmbarazoIndividual } from "./pages/HistoriaClinicaGeneral/EmbarazoIndividual";
// import { EditarEmbarazo } from "./pages/HistoriaClinicaGeneral/EditarEmbarazo";

// import { useAuth } from "./context/AuthContext";
// import { CambiarContra } from "./pages/Usuarios/CambiarContra";
// import { Bitacoras } from "./pages/Bitacoras/Bitacoras";
// import { BuscarPorCentro } from "./pages/HistoriaClinica/Buscar/BuscarPorCentro.jsx";
// import { HistoriaCentro } from "./pages/HistoriaClinica/Buscar/HistoriaClinicaCentro.jsx";

// const { Header, Sider, Content } = Layout;

// export const App = () => {

//   const { isAuth, logout, user } = useAuth();
//   const [collapsed, setCollapsed] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);  // Estado para controlar la visibilidad del modal
//   const location = useLocation();

//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();

//   const shouldShowLayout = () => {
//     return location.pathname !== '/';
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//     logout();
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <>
//       {shouldShowLayout() && (
//         <Layout>
//           <Sider trigger={null} collapsible collapsed={collapsed} theme="dark" className="sidebar" style={{ position: 'fixed' }}>
//             <Logo />
//             <MenuList />
//           </Sider>
//           <Layout className={collapsed ? 'collapsed' : 'expanded'} style={{ marginLeft: collapsed ? 80 : 230 }}>
//             <Header style={{ padding: 0, background: colorBgContainer, transition: 'margin-left 0.2s', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Button
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="toggle"
//                 type="text"
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               />
            
//               {isAuth && (
//                 <div className="d-flex align-items-center gap-3">
//                   <p className="m-0">BIENVENIDO AL SISTEMA DE IXCHEN, {user.nombre} {user.apellido}</p>
//                   <Button onClick={showModal} style={{ marginRight: '40px', backgroundColor: 'red', color: 'white' }}>
//                     <LogoutOutlined />Cerrar Sesión
//                   </Button>
//                 </div>
//               )}
              
//             </Header>
//             <Content style={{ margin: '24px 16px 30px', overflow: 'initial', transition: 'margin-left 0.2s' }}>
//               <Routes>
//                 <Route exact path="/" element={<Login />} />
//                 <Route path="/home" element={<Home />} />
//                 <Route path="/agregar-historia-clinica" element={<AgregarHistoria />} />
//                 <Route path="/buscar-historia-clinica" element={<BuscarHistoria />} />
//                 <Route path="/agregar-problema" element={<AgregarProblema />} />
//                 <Route path="/notas-evolucion" element={<NotaEvolucion />} />
//                 <Route path="/buscar-problema" element={<BuscarProblema />} />
//                 <Route path="/problemas/:numExpediente" element={<ProblemaDetalles />} />
//                 <Route path="/editar-paciente/:id" element={<EditarPaciente />} />
//                 <Route path="/editar-antecedentes-personales/:id" element={<EditarAntPersonales />} />
//                 <Route path="/editar-antecedentes-patologicos-personales/:id" element={<EditarAntPatPersonales />} />
//                 <Route path="/editar-antecedentes-patologicos-familiares/:id" element={<EditarAntPatFam />} />
//                 <Route path="/editar-informacion/:id" element={<EditarInformacion />} />

//                 <Route path="/agregar-nota-evolucion" element={<AgregarNota />} />
//                 <Route path="/buscar-nota-evolucion" element={<BuscarNota />} />
//                 <Route path="/notas-de-evolucion/:numExpediente" element={<NotaDetalle />} />
//                 <Route path="/nota/:codNota" element={<NotaEvolucion />} />
//                 <Route path="/editar-nota/:codNota" element={<EditarNota />} />


//                 <Route path="/doctores" element={<Doctores />} />
//                 <Route path="/agregar-doctor" element={<AgregarDoctor />} />
//                 <Route path="/buscar-doctor" element={<BuscarDoctor />} />
//                 <Route path="/editar-doctor/:id" element={<EditarDoctor />} />

//                 <Route path="/agregar-epicrisis" element={<AgregarEpicrisis />} />
//                 <Route path="/buscar-epicrisis" element={<BuscarEpicrisis />} />
//                 <Route path="/editar-epicrisis/:id" element={<EditarEpicrisis />} />
//                 <Route path="/epicrisis/:numExpediente" element={<ListaEpicrisis />} />
//                 <Route path="/epicrisis-detalle/:codEpicrisis" element={<EpicrisisDetalle />} />

//                 <Route path="/agregar-historia-clinica-general" element={<AgregarHistoriaClinicaGeneral />} />
//                 <Route path="/buscar-historia-clinica-general" element={<BuscarHCGeneral />} />
//                 <Route path="/editar-historia-clinica-general/:id" element={<EditHistoriaClinicaGeneral />} />
//                 <Route path="/historias-generales/:numExpediente" element={<HistoriasCG />} />
//                 <Route path="/historia/:codHistoriaClinica" element={<HistoriaIndividual />} />
//                 <Route path="/obstetricos/:numExpediente" element={<ObstetricosDetalles />} />
//                 <Route path="/obstetrico/:id" element={<Obstetrico />} />
//                 <Route path="/editar-obstetrico/:id" element={<EditarObstetrico />} />
//                 <Route path="/unidos/:id" element={<Unidos />} />
//                 <Route path="/unido/:id" element={<UnidoIndividual />} />
//                 <Route path="/embarazos/:id" element={<Embarazos />} />
//                 <Route path="/embarazo/:id" element={<EmbarazoIndividual />} />
//                 <Route path="/editar-embarazo/:id" element={<EditarEmbarazo />} />

//                 <Route path="/agregar-usuarios" element={<AgregarUsuarios />} />
//                 <Route path="/buscar-usuario" element={<BuscarUsuario />} />
//                 <Route path="/editar-usuario/:codAdmin" element={<EditarUsuario />} />

//                 <Route path="/cambiar-contraseña" element={<CambiarContra/>} />

//                 <Route path="/bitacoras" element={<Bitacoras/>} />
//                 <Route path="/buscar-por-centro" element={<BuscarPorCentro/>} />
//                 <Route path="/historia-centro/:numExp" element={<HistoriaCentro/>} />
//               </Routes>
//             </Content>
//           </Layout>
//         </Layout>
//       )}
//       {!shouldShowLayout() && (
//         <Routes>
//           <Route exact path="/" element={<Login />} />
//         </Routes>
//       )}

//       {/* Modal de confirmación */}
//       <Modal
//         title="Confirmar Cierre de Sesión"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Sí, Cerrar Sesión"
//         cancelText="Cancelar"
//       >
//         <p>¿Está seguro que desea cerrar sesión?</p>
//       </Modal>
//     </>
//   )
// }