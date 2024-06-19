// HistoriaClinicaPDF.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';


// Definir los estilos para el PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    section: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        fontSize: 18,
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 12,
        marginBottom: 5,
    },
    value: {
        fontSize: 12,
        marginBottom: 10,
        paddingBottom: 5,
        borderBottom: '1 solid black',
        marginLeft: '10px',
        width: '300px'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export const HistoriaClinicaPDF = ({ data }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>HISTORIA CLINICA</Text>
            <View style={styles.section}>
                <Text style={styles.label}>CENTRO DE MUJERES IXCHEN</Text>
                <Text style={styles.value}>{data.centro || ''}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>FECHA</Text>
                <Text style={styles.value}>{data.fechaIngreso || ''}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>NOMBRES Y APELLIDOS</Text>
                <Text style={styles.value}>{`${data.primerNombre || ''} ${data.segundoNombre || ''} ${data.primerApellido || ''} ${data.segundoApellido || ''}`}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.label}>EDAD</Text>
                <Text style={styles.value}>{data.edad || ''}</Text>
            </View>
        </Page>
    </Document>
);


