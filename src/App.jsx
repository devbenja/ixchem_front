import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";

import { AgregarHistoria } from "./pages/HistoriaClinica/Agregar/AgregarHistoria";
import { BuscarHistoria } from "./pages/HistoriaClinica/Buscar/BuscarHistoria";
import { ListaProblemas } from "./pages/ListaProblema/ListaProblemas";

import { Logo } from "./components/Logo";
import { MenuList } from "./components/MenuList";

import { Layout, Button, theme } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
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
import { BuscarHistoriaClinicaGeneral } from "./pages/HistoriaClinicaGeneral/BuscarHistoriaClinicaGeneral";
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
import { LogoutOutlined } from '@ant-design/icons'


const { Header, Sider, Content } = Layout;

export const App = () => {

  const { isAuth, logout, user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const shouldShowLayout = () => {
    return location.pathname !== '/';
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
            
              {isAuth && (
                <div className="d-flex align-items-center gap-3">
                  <p className="m-0">Bienvenido al Sistema ANFAM, {user.nombre}</p>
                  <Button onClick={logout} style={{ marginRight: '40px', backgroundColor: 'red', color: 'white' }}>
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
    </>
  )
}


