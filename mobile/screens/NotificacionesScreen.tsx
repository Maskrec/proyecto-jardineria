import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const notificaciones = [
  {
    tipo: 'nomina',
    titulo: 'Pago de nómina',
    descripcion: 'Periodo 01/05/26 a 15/05/2026',
    tiempo: 'Hace 2 horas',
    iconBg: '#5BB5A2',
    icono: '🗓',
  },
  {
    tipo: 'aprobacion',
    titulo: 'Solicitud aprobada',
    descripcion: 'Vacaciones aprobadas',
    tiempo: 'Hace 1 día',
    iconBg: '#BCF0AE',
    icono: '✓',
  },
];

export default function NotificacionesScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      {/* Título */}
      <Text style={styles.title}>Notificaciones</Text>

      {/* Lista */}
      <View style={styles.lista}>
        {notificaciones.map((n, i) => (
          <View key={i} style={styles.card}>
            <View style={[styles.iconContainer, { backgroundColor: n.iconBg }]}>
              <Text style={styles.iconText}>{n.icono}</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{n.titulo}</Text>
              <Text style={styles.cardDescripcion}>{n.descripcion}</Text>
              <Text style={styles.cardTiempo}>{n.tiempo}</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 28,
  },
  lista: { gap: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F0FBF0',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 24,
    color: '#FFF',
  },
  cardInfo: { flex: 1 },
  cardTitulo: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 4,
  },
  cardDescripcion: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#444',
    marginBottom: 4,
  },
  cardTiempo: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#999',
  },
});