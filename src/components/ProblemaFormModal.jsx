import React from 'react';
import { Modal, Button, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

export const ProblemaFormModal = ({ visible, handleClose, handleSubmit, problema }) => {
    const [form] = Form.useForm();
    const isEdit = !!problema;

    const onFinish = (values) => {

        if (values.fecha && moment.isMoment(values.fecha)) {
            values.fecha = values.fecha.format('YYYY-MM-DD');
        }

        handleSubmit(values);
        handleClose();
    };

    return (
        <Modal
            visible={visible}
            title={isEdit ? 'Editar Problema' : 'Crear Problema'}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    Cancelar
                </Button>,
                <Button key="submit" type="primary" onClick={() => form.submit()}>
                    {isEdit ? 'Actualizar' : 'Crear'}
                </Button>,
            ]}
        >
            <Form
                form={form}
                initialValues={problema}
                onFinish={onFinish}
                layout="vertical"
            >
                <Form.Item
                    name="nombreProblema"
                    label="Nombre del Problema"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre del problema' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="numExpediente"
                    label="Número de Expediente"
                    rules={[{ required: true, message: 'Por favor ingrese el número de expediente' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="activo"
                    label="Activo"
                    rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                >
                    <Select>
                        <Option value="true">Sí</Option>
                        <Option value="false">No</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="resuelto"
                    label="Resuelto"
                    rules={[{ required: true, message: 'Por favor seleccione una opción' }]}
                >
                    <Select>
                        <Option value="true">Sí</Option>
                        <Option value="false">No</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="fecha"
                    label="Fecha"
                    rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}
                >
                    <DatePicker />
                </Form.Item>
            </Form>
        </Modal>
    );
};