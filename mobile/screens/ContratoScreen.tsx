import {
  StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const campos = [
  { label: 'Tipo de contrato:', valor: 'Indefinido' },
  { label: 'Fecha de ingreso:', valor: '12 Enero 2025' },
  { label: 'Fecha de vencimiento:', valor: 'Sin vencimiento' },
  { label: 'Jornada:', valor: 'Tiempo completo' },
  { label: 'Horario:', valor: 'Lunes a Viernes\n7:00 AM - 4:00 PM' },
  { label: 'Zona de trabajo:', valor: 'Residencial Campestre' },
];

const sueldo = [
  { label: 'Salario mensual:', valor: '$14,800 MXN' },
  { label: 'Bonos:', valor: 'Puntualidad\nProductividad\nMantenimiento premium' },
  { label: 'Horas extra:', valor: '$120 MXN por hora' },
  { label: 'Prestaciones:', valor: 'IMSS\nVacaciones\nAguinaldo\nUniformes\nHerramientas' },
];

export default function ContratoScreen() {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Contrato</Text>

          {campos.map((c, i) => (
            <View key={i} style={styles.campo}>
              <Text style={styles.label}>{c.label}</Text>
              <Text style={styles.valor}>{c.valor}</Text>
            </View>
          ))}

          <Text style={styles.seccion}>SUELDO Y PRESTACIONES</Text>

          {sueldo.map((c, i) => (
            <View key={i} style={styles.campo}>
              <Text style={styles.label}>{c.label}</Text>
              <Text style={styles.valor}>{c.valor}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#BCF0AE' },
  container: { padding: 20, paddingTop: 56, paddingBottom: 40 },
  card: {
    backgroundColor: '#F0FBF0',
    borderRadius: 24,
    padding: 28,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 28,
  },
  campo: { marginBottom: 20 },
  label: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
    lineHeight: 24,
  },
  seccion: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginTop: 12,
    marginBottom: 20,
    letterSpacing: 0.5,
  },
});