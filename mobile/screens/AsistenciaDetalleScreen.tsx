import {
  StyleSheet, Text, View, ScrollView, Dimensions, Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'AsistenciaDetalle'>;

export default function AsistenciaDetalleScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { empleado } = route.params;

  const detalles = [
    'email@example.com',
    '+00 111 111 1111',
    'Lunes a viernes, de 9:00 a 18:00',
    'Fecha de nacimiento: 05 mayo 2026',
    'Fecha de contratacion: 05 mayo 2026',
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#FFF' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <StatusBar style="dark" />

        <View style={styles.header}>
          <Asterisk width={120} height={36} />
          <BrightView width={120} height={36} />
        </View>

        <View style={styles.profileRow}>
          <View style={styles.avatar} />
          <View style={styles.profileInfo}>
            <Text style={styles.nombre}>{empleado.nombre}</Text>
            <Text style={styles.detailGray}>{empleado.departamento}</Text>
            <Text style={styles.detailGray}>{empleado.puesto}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          {detalles.map((d, i) => (
            <View key={i}>
              <Text style={styles.infoText}>{d}</Text>
              {i < detalles.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.confirmarBtn} onPress={() => navigation.navigate('Asistencias')}>
          <Text style={styles.btnText}>Confirmar</Text>
        </Pressable>
        <Pressable style={styles.anularBtn} onPress={() => navigation.navigate('Asistencias')}>
          <Text style={styles.btnText}>Anular</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 20, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 24, marginBottom: 32 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#D9D9D9', flexShrink: 0 },
  profileInfo: { flex: 1, gap: 4 },
  nombre: { fontSize: 22, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 4 },
  detailGray: { fontSize: 15, fontFamily: 'FunnelDisplay_400Regular', color: '#888', lineHeight: 22 },
  infoCard: { backgroundColor: '#FFF', borderRadius: 16, paddingVertical: 8, paddingHorizontal: 20, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  infoText: { fontSize: 15, fontFamily: 'FunnelDisplay_400Regular', color: '#111', paddingVertical: 16 },
  divider: { height: 1, backgroundColor: '#F0F0F0' },
  bottomContainer: { position: 'absolute', bottom: 32, left: 24, right: 24, flexDirection: 'row', gap: 12 },
  confirmarBtn: { flex: 1, backgroundColor: '#111', borderRadius: 30, paddingVertical: 18, alignItems: 'center' },
  anularBtn: { flex: 1, backgroundColor: '#111', borderRadius: 30, paddingVertical: 18, alignItems: 'center' },
  btnText: { fontSize: 16, fontFamily: 'FunnelDisplay_700Bold', color: '#FFF' },
});