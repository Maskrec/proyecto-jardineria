import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const empleados = [
  { nombre: 'Natanael Cano', departamento: 'Departamento', puesto: 'Puesto de trabajo', email: 'email@example.com', fecha: '05 enero, 2025' },
  { nombre: 'Natanael Cano', departamento: 'Departamento', puesto: 'Puesto de trabajo', email: 'email@example.com', fecha: '05 enero, 2025' },
  { nombre: 'Natanael Cano', departamento: 'Departamento', puesto: 'Puesto de trabajo', email: 'email@example.com', fecha: '05 enero, 2025' },
  { nombre: 'Natanael Cano', departamento: 'Departamento', puesto: 'Puesto de trabajo', email: 'email@example.com', fecha: '05 enero, 2025' },
];

export default function OffboardingScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <Asterisk width={120} height={36} />
          <BrightView width={120} height={36} />
        </View>

        {/* Título */}
        <Text style={styles.title}>OffBoarding</Text>

        {/* Buscador */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ingresa tu busqueda..."
            placeholderTextColor="#aaa"
          />
          <View style={styles.searchButton} />
        </View>

        {/* Lista */}
        {empleados.map((e, i) => (
          <Pressable key={i} style={styles.card} onPress={() => navigation.navigate('DetalleOffboarding', { empleado: e })}>
            <View style={styles.avatar} />
            <View style={styles.cardInfo}>
              <Text style={styles.cardName}>{e.nombre}</Text>
              <Text style={styles.cardDetail}>{e.departamento}</Text>
              <Text style={styles.cardDetail}>{e.puesto}</Text>
              <Text style={styles.cardDetail}>{e.email}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardFechaLabel}>Fecha de contratación</Text>
                <Text style={styles.cardFecha}>{e.fecha}</Text>
              </View>
            </View>
          </Pressable>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 20,
    backgroundColor: '#FFF',
  },
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
    lineHeight: 46,
    marginBottom: 24,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#111',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
  },
  searchButton: {
    width: 64,
    height: 50,
    backgroundColor: '#BCF0AE',
    borderRadius: 30,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    gap: 16,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    flexShrink: 0,
  },
  cardInfo: { flex: 1 },
  cardName: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    lineHeight: 20,
  },
  cardFooter: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  cardFechaLabel: {
    fontSize: 12,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
  },
  cardFecha: {
    fontSize: 12,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
  },
});