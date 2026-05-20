import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useAuth } from '../contexts/AuthContext';
import LogoSGRH from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';
import Onboarding from '../assets/onboarding.svg';
import Offboarding from '../assets/offboarding.svg';
import Reclutamiento from '../assets/reclutamiento.svg';
import Perfil from '../assets/perfil.svg';
import Nomina from '../assets/nomina.svg';
import Asistencias from '../assets/asistencias.svg';

const { width, height } = Dimensions.get('window');
const ICON_SIZE = (width - 48 - 32) / 3;
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function DashboardAdminScreen() {
  const navigation = useNavigation<Nav>();
  const { user, logout, loading } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);

  const gridItems = [
    { label: 'Onboarding', Icon: Onboarding, screen: 'Onboarding' as keyof RootStackParamList },
    { label: 'Offboarding', Icon: Offboarding, screen: 'Offboarding' as keyof RootStackParamList },
    { label: 'Asistencias', Icon: Asistencias, screen: 'AsistenciasScreen' as keyof RootStackParamList },
    { label: 'Nómina', Icon: Nomina, screen: 'Nomina' as keyof RootStackParamList },
    { label: 'Reclutamiento', Icon: Reclutamiento, screen: 'Reclutamiento' as keyof RootStackParamList },
    { label: 'Perfil', Icon: Perfil, screen: 'Perfil' as keyof RootStackParamList },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (loading || !user) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#BCF0AE" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <StatusBar style="dark" />

        {/* Header como botón */}
        <Pressable style={styles.header} onPress={() => setMenuVisible(true)}>
          <LogoSGRH width={140} height={50} />
        </Pressable>

        {/* Menú desplegable con datos del usuario */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={styles.menuCard}>
              <View style={styles.userInfo}>
                <Text style={styles.userInfoName}>{user.nombre_completo}</Text>
                <Text style={styles.userInfoEmail}>{user.email_corporativo}</Text>
                <Text style={styles.userInfoRole}>{user.role}</Text>
              </View>
              <View style={styles.menuDivider} />
              <Pressable
                style={[styles.menuItem, { marginTop: 0 }]}
                onPress={() => {
                  setMenuVisible(false);
                  handleLogout();
                }}
              >
                <Text style={[styles.menuItemText, { color: '#D32F2F' }]}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

        {/* Saludo personalizado */}
        <Text style={styles.greeting}>¡Hola, {user?.nombre_completo?.split(' ')[0] || 'Admin'}!</Text>

        {/* Título */}
        <Text style={styles.title}>
          {'Bienvenido a\nSGRH de\n'}
          <Text style={styles.titleGreen}>{'BrightView\nLandscapes.'}</Text>
        </Text>

        {/* Card BrightView */}
        <View style={styles.brightviewCard}>
          <BrightView width={width - 80} height={60} />
        </View>

        {/* Grid de módulos */}
        <View style={styles.grid}>
          {gridItems.map(({ label, Icon, screen }) => (
            <Pressable key={label} style={styles.gridItem} onPress={() => navigation.navigate(screen as any)}>
              <View style={styles.gridIconBox}>
                <Icon width={ICON_SIZE * 0.5} height={ICON_SIZE * 0.5} />
              </View>
              <Text style={styles.gridLabel}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  scroll: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { marginBottom: 20 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-start', paddingTop: 60 },
  menuCard: { 
    backgroundColor: '#FFF', 
    marginHorizontal: 24, 
    borderRadius: 16, 
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  userInfo: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#e0e0e0' },
  userInfoName: { fontSize: 16, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 4 },
  userInfoEmail: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#999', marginBottom: 2 },
  userInfoRole: { fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#BCF0AE', fontWeight: '600' },
  menuDivider: { height: 1, backgroundColor: '#e0e0e0' },
  menuItem: { paddingVertical: 14, paddingHorizontal: 16, marginTop: 8 },
  menuItemText: { fontSize: 14, fontFamily: 'FunnelDisplay_400Regular', color: '#333' },
  greeting: { fontSize: 14, fontFamily: 'FunnelDisplay_400Regular', color: '#BCF0AE', marginBottom: 12 },
  title: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', lineHeight: 46, marginBottom: 24 },
  titleGreen: { color: '#BCF0AE' },
  brightviewCard: { backgroundColor: '#D6F5CC', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 16, alignItems: 'center', marginBottom: 32 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 16 },
  gridItem: { width: ICON_SIZE, alignItems: 'center', gap: 8 },
  gridIconBox: { width: ICON_SIZE, height: ICON_SIZE, backgroundColor: '#D6F5CC', borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  gridLabel: { fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#333', textAlign: 'center' },
});
