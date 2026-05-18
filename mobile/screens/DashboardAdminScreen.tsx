import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
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

const vacantes = [
  {
    titulo: 'Desarrollador Frontend',
    area: 'Tecnología',
    modalidad: 'Remoto',
    salario: '$25,000 - $35,000',
    estado: 'Active',
    estadoColor: '#4CAF50',
    descripcion: 'Buscamos desarrollador frontend con experiencia en React, TypeScript y Next.js para unirse a nuestro equipo de desarrollo.',
    requisitos: ['3+ años de experiencia en React', 'Conosimiento de TypeScript', 'Experiencia con Next.js', 'Manejo de CSS frameworks'],
  },
  {
    titulo: 'Contador General',
    area: 'Finanzas',
    modalidad: 'Híbrido',
    salario: '$22,000 - $32,000',
    estado: 'Filed',
    estadoColor: '#F44336',
    descripcion: 'Responsable de la contabilidad general de la empresa, elaboración de estados financieros y cumplimiento fisca.',
    requisitos: ['Titulado en contaduría', 'Experiencia en SAP', 'Conocimiento de normas fiscales', 'Experiencia en auditoría'],
  },
  {
    titulo: 'PlaceHolder',
    area: 'Tecnología',
    modalidad: 'Remoto',
    salario: '$25,000 - $35,000',
    estado: 'Active',
    estadoColor: '#4CAF50',
    descripcion: 'Lorem ipsum dolor sit amet',
    requisitos: [],
  },
];

export default function DashboardAdminScreen() {
  const navigation = useNavigation<Nav>();
  const [menuVisible, setMenuVisible] = useState(false);

  const gridItems = [
    { label: 'Onboarding', Icon: Onboarding, screen: 'Onboarding' as keyof RootStackParamList },
    { label: 'Offboarding', Icon: Offboarding, screen: 'Offboarding' as keyof RootStackParamList },
    { label: 'Asistencias', Icon: Asistencias, screen: 'AsistenciasScreen' as keyof RootStackParamList },
    { label: 'Nomina', Icon: Nomina, screen: 'Nomina' as keyof RootStackParamList },
    { label: 'Reclutamiento', Icon: Reclutamiento, screen: 'Reclutamiento' as keyof RootStackParamList },
    { label: 'Perfil', Icon: Perfil, screen: 'Perfil' as keyof RootStackParamList },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
        <StatusBar style="dark" />

        {/* Header como botón */}
        <Pressable style={styles.header} onPress={() => setMenuVisible(true)}>
          <LogoSGRH width={140} height={50} />
        </Pressable>

        {/* Menú desplegable */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
            <View style={styles.menuCard}>
              <Pressable
                style={styles.menuItem}
                onPress={() => {
                  setMenuVisible(false);
                  navigation.reset({ index: 0, routes: [{ name: 'IniciarSesion' }] });
                }}
              >
                <Text style={styles.menuItemText}> Cerrar sesión</Text>
              </Pressable>
            </View>
          </Pressable>
        </Modal>

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

        {/* Vacantes */}
        <Text style={styles.vacantesTitle}>{'Vacantes\ndisponibles'}</Text>

        {vacantes.map((v, i) => (
          <View key={i} style={styles.vacanteCard}>
            <Text style={styles.vacanteTitle}>{v.titulo}</Text>
            <Text style={styles.vacanteArea}>{v.area}</Text>
            <View style={styles.tagsRow}>
              <View style={styles.tagDark}><Text style={styles.tagDarkText}>{v.modalidad}</Text></View>
              <View style={styles.tagDark}><Text style={styles.tagDarkText}>{v.salario}</Text></View>
              <View style={[styles.tagStatus, { backgroundColor: v.estadoColor }]}>
                <Text style={styles.tagStatusText}>{v.estado}</Text>
              </View>
            </View>
            <Text style={styles.vacanteDesc}>{v.descripcion}</Text>
            {v.requisitos.length > 0 && (
              <>
                <Text style={styles.requisitosTitle}>Requisitos</Text>
                {v.requisitos.map((r, j) => (
                  <Text key={j} style={styles.requisito}>• {r}</Text>
                ))}
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { marginBottom: 20 },
  title: { fontSize: 36, fontFamily: 'FunnelDisplay_700Bold', color: '#111', lineHeight: 42, marginBottom: 20 },
  titleGreen: { color: '#BCF0AE' },
  brightviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 32 },
  gridItem: { width: ICON_SIZE, alignItems: 'center', gap: 8 },
  gridIconBox: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    backgroundColor: '#BCF0AE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridLabel: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#111', textAlign: 'center' },
  vacantesTitle: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', lineHeight: 46, marginBottom: 20 },
  vacanteCard: { backgroundColor: '#D6F5CC', borderRadius: 16, padding: 18, marginBottom: 16 },
  vacanteTitle: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 2 },
  vacanteArea: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#555', marginBottom: 10 },
  tagsRow: { flexDirection: 'row', gap: 6, marginBottom: 12, flexWrap: 'wrap' },
  tagDark: { backgroundColor: '#111', borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  tagDarkText: { fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#FFF' },
  tagStatus: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 10 },
  tagStatusText: { fontSize: 12, fontFamily: 'FunnelDisplay_700Bold', color: '#FFF' },
  vacanteDesc: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#333', lineHeight: 18, marginBottom: 10 },
  requisitosTitle: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#333', marginBottom: 4 },
  requisito: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#333', lineHeight: 20, paddingLeft: 4 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 100,
    paddingLeft: 24,
  },
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 180,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
  },
});