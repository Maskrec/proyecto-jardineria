import {
  StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const cursos = [
  { titulo: 'Seguridad en el Uso de Herramientas de Jardinería', tipo: 'Obligatorio', progreso: 45 },
  { titulo: 'Manejo Integral de Plantas Ornamentales', tipo: 'Obligatorio', progreso: 100 },
];

const logros = [
  {
    categoria: 'Reconocimiento',
    categoriaColor: '#5BB5A2',
    titulo: 'Innovador del mes',
    descripcion: 'Por la implementación de jardines verticales solares',
    iconBg: '#5BB5A2',
    icono: '🏅',
  },
  {
    categoria: 'Especial',
    categoriaColor: '#E6A817',
    titulo: '1 año de Excelencia',
    descripcion: 'Media de satisfacción 9/10',
    iconBg: '#E6A817',
    icono: '🏆',
  },
];

export default function CertificadosScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      <Text style={styles.title}>Certificados</Text>

      {/* Card Formación */}
      <View style={styles.seccionCard}>
        <Text style={styles.seccionTitulo}>Formación</Text>
        <Text style={styles.seccionSubtitulo}>Cursos</Text>

        {cursos.map((c, i) => (
          <View key={i} style={styles.cursoCard}>
            <Text style={styles.cursoTitulo}>{c.titulo}</Text>
            <Text style={styles.cursoTipo}>{c.tipo}</Text>
            <View style={styles.progressRow}>
              <View style={styles.progressBg}>
                <View style={[styles.progressFill, { width: `${c.progreso}%` }]} />
              </View>
              <Text style={styles.progressText}>{c.progreso}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Card Desempeño */}
      <View style={styles.seccionCard}>
        <Text style={styles.seccionTitulo}>Desempeño</Text>
        <Text style={styles.seccionSubtitulo}>Logros</Text>

        {logros.map((l, i) => (
          <View key={i} style={styles.logroCard}>
            <View style={[styles.logroIcon, { backgroundColor: l.iconBg }]}>
              <Text style={styles.logroIconText}>{l.icono}</Text>
            </View>
            <View style={styles.logroInfo}>
              <Text style={[styles.logroCategoria, { color: l.categoriaColor }]}>{l.categoria}</Text>
              <Text style={styles.logroTitulo}>{l.titulo}</Text>
              <Text style={styles.logroDescripcion}>{l.descripcion}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 24 },
  seccionCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  seccionTitulo: {
    fontSize: 18,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 16,
  },
  seccionSubtitulo: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#BCF0AE',
    marginBottom: 12,
  },
  cursoCard: {
    backgroundColor: '#F0FBF0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cursoTitulo: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 6,
    lineHeight: 22,
  },
  cursoTipo: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBg: {
    flex: 1,
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#BCF0AE',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
    minWidth: 36,
    textAlign: 'right',
  },
  logroCard: {
    flexDirection: 'row',
    backgroundColor: '#F0FBF0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    gap: 16,
  },
  logroIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  logroIconText: { fontSize: 24 },
  logroInfo: { flex: 1 },
  logroCategoria: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    marginBottom: 4,
  },
  logroTitulo: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 4,
  },
  logroDescripcion: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#555',
    lineHeight: 18,
  },
});