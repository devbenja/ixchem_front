import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, Table } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';

import { baseURL } from '../../api/apiURL';


export const EmbarazoIndividual = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(`${baseURL}/bdtbembarazoactual/listarporcodigo/${id}`);

        console.log(response.data);

        setFormData(response.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

  }, [id]);

  const columns1 = [
    { title: 'No. Expediente', dataIndex: 'numExpediente', key: 'numExpediente' },
    {
      title: 'Diagnostico Embarazo', dataIndex: 'diagnostico', key: 'diagnostico', render: (diagnostico) => {
        if (diagnostico === null || diagnostico === undefined) {
          return '';
        }
        return diagnostico ? 'Sí' : 'No';
      }
    },
    {
      title: 'Isoinmunizacion', dataIndex: 'isoinmunizacion', key: 'isoinmunizacion', render: (isoinmunizacion) => {
        if (isoinmunizacion === null || isoinmunizacion === undefined) {
          return '';
        }
        return isoinmunizacion ? 'Sí' : 'No';
      }
    },
    {
      title: 'Sangrado Vaginal', dataIndex: 'sangradov', key: 'sangradov', render: (sangradov) => {
        if (sangradov === null || sangradov === undefined) {
          return '';
        }
        return sangradov ? 'Sí' : 'No';
      }
    },
  ]

  const columns2 = [
    {
      title: 'Masa Pelvica', dataIndex: 'masaPelvica', key: 'masaPelvica', render: (masaPelvica) => {
        if (masaPelvica === null || masaPelvica === undefined) {
          return '';
        }
        return masaPelvica ? 'Sí' : 'No';
      }
    },
    {
      title: 'Presion Arterial', dataIndex: 'presionArterial', key: 'presionArterial', render: (presionArterial) => {
        if (presionArterial === null || presionArterial === undefined) {
          return '';
        }
        return presionArterial ? 'Sí' : 'No';
      }
    },
    {
      title: 'Menor de 20', dataIndex: 'menor20', key: 'menor20', render: (menor20) => {
        if (menor20 === null || menor20 === undefined) {
          return '';
        }
        return menor20 ? 'Sí' : 'No';
      }
    },
    {
      title: 'Mayor de 35', dataIndex: 'mayorde35', key: 'mayorde35', render: (mayorde35) => {
        if (mayorde35 === null || mayorde35 === undefined) {
          return '';
        }
        return mayorde35 ? 'Sí' : 'No';
      }
    },
  ]

  const handleBack = () => {
    navigate(`/embarazos/${formData.numExpediente}`)
  }

  return (
    <div className='container-fluid'>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h4>Embarazo Actual del Expediente</h4>
        {/* <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button> */}
        <Button style={{ variant:'outlined', color: 'Black' }} onClick={handleBack}><ArrowLeftOutlined />Volver Atrás</Button>
      </div>
      <Table columns={columns1} dataSource={[formData]} className='custom-table mt-4' pagination={false} />
      <Table columns={columns2} dataSource={[formData]} className='custom-table mt-4' pagination={false} />
    </div>
  )
}


