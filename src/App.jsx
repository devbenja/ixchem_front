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


const { Header, Sider, Content } = Layout;

export const App = () => {

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
          <Layout className={collapsed ? 'collapsed' : 'expanded'} style={{ marginLeft: collapsed ? 80 : 200 }}>
            <Header style={{ padding: 0, background: colorBgContainer, transition: 'margin-left 0.2s' }}>
              <Button
                onClick={() => setCollapsed(!collapsed)}
                className="toggle"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </Header>
            <Content style={{ margin: '24px 16px 30px', overflow: 'initial' }}>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/agregar-historia-clinica" element={<AgregarHistoria />} />
                <Route path="/buscar-historia-clinica" element={<BuscarHistoria />} />
                <Route path="/agregar-problema" element={<AgregarProblema />} />
                <Route path="/notas-evolucion" element={<NotaEvolucion/>}/>           
                <Route path="/buscar-problema" element={<BuscarProblema/>}/>
                <Route path="/problemas/:numExpediente" element={<ProblemaDetalles/>} />
                <Route path="/editar-paciente/:id" element={<EditarPaciente/>}/>
                <Route path="/editar-antecedentes-personales/:id" element={<EditarAntPersonales/>}/>
                <Route path="/editar-antecedentes-patologicos-personales/:id" element={<EditarAntPatPersonales/>} />
                <Route path="/doctores" element={<Doctores/>}/>
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


