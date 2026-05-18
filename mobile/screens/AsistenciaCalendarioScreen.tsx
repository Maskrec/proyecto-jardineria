import {
  StyleSheet, Text, View, ScrollView, Dimensions, Pressable, TextInput,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'AsistenciaCalendario'>;

const DIAS_SEMANA = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'];

// Días con color: verde=asistencia, rojo=falta, azul=permiso
const marcados: Record<number, 'green' | 'red' | 'blue'> = {
  1: 'green', 2: 'green', 3: 'green', 4: 'green', 5: 'green', 6: 'green',
  7: 'green', 8: 'green', 9: 'red', 10: 'blue', 22: 'blue', 23: 'blue',
};

const peticiones = [
  { fecha: '14/05/26', horario: '7:00h - 13:00h', motivo: 'Vacaciones anulaes', estado: 'Aprobada', color: '#BCF0AE' },
  { fecha: '14/05/26', horario: '7:00h - 13:00h', motivo: null, estado: 'Pendiente', color: '#F5C842' },
];

function getDiasEnMes(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getPrimerDia(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function AsistenciaCalendarioScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { empleado } = route.params;

  const [mes, setMes] = useState(4); // Mayo = 4
  const [anio, setAnio] = useState(2026);

  const diasEnMes = getDiasEnMes(anio, mes);
  const primerDia = getPrimerDia(anio, mes);
  const diasPrevios = Array(primerDia).fill(null);
  const dias = Array.from({ length: diasEnMes }, (_, i) => i + 1);

  const anteriorMes = () => {
    if (mes === 0) { setMes(11); setAnio(a => a - 1); }
    else setMes(m => m - 1);
  };

  const siguienteMes = () => {
    if (mes === 11) { setMes(0); setAnio(a => a + 1); }
    else setMes(m => m + 1);
  };

  const colorMap: Record<string, string> = {
    green: '#BCF0AE',
    red: '#F87171',
    blue: '#93C5FD',
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      <Text style={styles.title}>Asistencias{'\n'}pasadas</Text>
      <Text style={styles.nombreSubtitle}>{empleado.nombre}</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Busca una fecha en especifico..."
        placeholderTextColor="#aaa"
      />

      {/* Calendario */}
      <View style={styles.calCard}>
        <View style={styles.calHeader}>
          <Text style={styles.calMes}>{MESES[mes]} {anio}</Text>
          <View style={styles.calNav}>
            <Pressable onPress={anteriorMes}><Text style={styles.navBtn}>{'<'}</Text></Pressable>
            <Pressable onPress={siguienteMes}><Text style={styles.navBtn}>{'>'}</Text></Pressable>
          </View>
        </View>

        <View style={styles.calGrid}>
          {DIAS_SEMANA.map(d => (
            <Text key={d} style={styles.diaSemana}>{d}</Text>
          ))}
          {diasPrevios.map((_, i) => (
            <View key={`prev-${i}`} style={styles.diaCell}>
              <Text style={styles.diaVacio}>{' '}</Text>
            </View>
          ))}
          {dias.map(d => {
            const marca = marcados[d];
            return (
              <View key={d} style={styles.diaCell}>
                <View style={[styles.diaCirculo, marca ? { backgroundColor: colorMap[marca] } : {}]}>
                  <Text style={[styles.diaNum, !marca && { color: '#111' }]}>{d}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* Peticiones */}
      <Text style={styles.peticionesTitle}>Peticiones</Text>
      {peticiones.map((p, i) => (
        <View key={i} style={styles.peticionCard}>
          <View style={styles.peticionBarra} />
          <View style={styles.peticionInfo}>
            <View style={styles.peticionRow}>
              <Text style={styles.peticionFecha}>{p.fecha}</Text>
              <View style={[styles.estadoBadge, { backgroundColor: p.color }]}>
                <Text style={styles.estadoText}>{p.estado}</Text>
              </View>
            </View>
            <Text style={styles.peticionHorario}>{p.horario}</Text>
            {p.motivo && (
              <Text style={styles.peticionMotivo}>
                <Text style={{ fontFamily: 'FunnelDisplay_700Bold' }}>Motivo: </Text>{p.motivo}
              </Text>
            )}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', lineHeight: 46, marginBottom: 8 },
  nombreSubtitle: { fontSize: 15, fontFamily: 'FunnelDisplay_400Regular', color: '#555', textAlign: 'center', marginBottom: 16 },
  searchInput: { borderWidth: 1.5, borderColor: '#ccc', borderRadius: 30, paddingVertical: 14, paddingHorizontal: 20, fontSize: 14, fontFamily: 'FunnelDisplay_400Regular', color: '#333', marginBottom: 20 },
  calCard: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 16, padding: 16, marginBottom: 28 },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calMes: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  calNav: { flexDirection: 'row', gap: 12 },
  navBtn: { fontSize: 18, color: '#111', paddingHorizontal: 4 },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  diaSemana: { width: `${100 / 7}%`, textAlign: 'center', fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#888', marginBottom: 8 },
  diaCell: { width: `${100 / 7}%`, alignItems: 'center', marginBottom: 6 },
  diaCirculo: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  diaNum: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#FFF' },
  diaVacio: { width: 32, height: 32 },
  peticionesTitle: { fontSize: 28, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 16 },
  peticionCard: { flexDirection: 'row', backgroundColor: '#F0FBF0', borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  peticionBarra: { width: 6, backgroundColor: '#111' },
  peticionInfo: { flex: 1, padding: 14 },
  peticionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  peticionFecha: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  estadoBadge: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12 },
  estadoText: { fontSize: 13, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  peticionHorario: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#555', marginBottom: 4 },
  peticionMotivo: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#333' },
});