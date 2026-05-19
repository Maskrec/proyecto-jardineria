import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const DIAS_SEMANA = ['do', 'lu', 'ma', 'mi', 'ju', 'vi', 'sa'];
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const colorMap: Record<string, string> = {
  green: '#BCF0AE',
  red: '#F87171',
  blue: '#93C5FD',
};

const peticionesNormal = [
  { fecha: '14/05/26', horario: '7:00h - 13:00h', motivo: 'Vacaciones anulaes', estado: 'Aprobada', estadoColor: '#7CB342' },
  { fecha: '14/05/26', horario: '7:00h - 13:00h', motivo: null, estado: 'Pendiente', estadoColor: '#F5A623' },
];

const peticionesDia = [
  { titulo: 'Solicitar permiso', horario: '7:00h - 13:00h' },
  { titulo: 'Solicitar vacaciones', horario: '7:00h - 13:00h' },
];

function getDiasEnMes(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getPrimerDia(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getHoraActual() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function AsistenciaEmpleadoScreen() {
  const navigation = useNavigation<Nav>();
  const [mes, setMes] = useState(4);
  const [anio, setAnio] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number | null>(null);
  const [horaEntrada, setHoraEntrada] = useState<string | null>(null);
  const [horaSalida, setHoraSalida] = useState<string | null>(null);
  const [marcadosDinamicos, setMarcadosDinamicos] = useState<Record<number, 'green' | 'red' | 'blue'>>({
    1: 'green', 2: 'green', 3: 'green', 4: 'green', 5: 'green', 6: 'green',
    7: 'green', 8: 'green', 9: 'red', 10: 'blue', 22: 'blue', 23: 'blue',
  });
  const [pendientes, setPendientes] = useState<Record<number, string>>({});

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

  const handleCheckIn = () => {
    setHoraEntrada(getHoraActual());
    setHoraSalida(null);
  };

  const handleCheckOff = () => {
    setHoraSalida(getHoraActual());
    const hoy = new Date().getDate();
    setMarcadosDinamicos(prev => ({ ...prev, [hoy]: 'green' }));
  };

  const handleSolicitud = (tipo: string) => {
    if (diaSeleccionado !== null) {
      setMarcadosDinamicos(prev => ({ ...prev, [diaSeleccionado]: 'blue' }));
      setPendientes(prev => ({ ...prev, [diaSeleccionado]: tipo }));
      setDiaSeleccionado(null);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      <Text style={styles.title}>Asistencia</Text>

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
              <Text style={styles.diaVacio}> </Text>
            </View>
          ))}
          {dias.map(d => {
            const marca = marcadosDinamicos[d];
            const seleccionado = diaSeleccionado === d;
            return (
              <Pressable
                key={d}
                style={styles.diaCell}
                onPress={() => setDiaSeleccionado(seleccionado ? null : d)}
              >
                <View style={[
                  styles.diaCirculo,
                  marca ? { backgroundColor: colorMap[marca] } : {},
                  seleccionado && !marca ? styles.diaSeleccionado : {},
                ]}>
                  <Text style={[
                    styles.diaNum,
                    !marca && { color: '#111' },
                    seleccionado && !marca && { color: '#111' },
                  ]}>{d}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Registrar Turno */}
      <Text style={styles.turnoTitle}>Registrar Turno</Text>

      {horaEntrada && (
        <View style={styles.turnoRow}>
          <Text style={styles.turnoLabel}>Entrada</Text>
          <Text style={styles.turnoHora}>{horaEntrada}</Text>
        </View>
      )}

      {horaSalida && (
        <View style={styles.turnoRow}>
          <Text style={styles.turnoLabel}>Salida</Text>
          <Text style={styles.turnoHora}>{horaSalida}</Text>
        </View>
      )}

      {!horaEntrada && (
        <Pressable style={styles.checkInBtn} onPress={handleCheckIn}>
          <Text style={styles.checkBtnText}>Check-in</Text>
        </Pressable>
      )}

      {horaEntrada && !horaSalida && (
        <Pressable style={styles.checkInBtn} onPress={handleCheckOff}>
          <Text style={styles.checkBtnText}>Check-off</Text>
        </Pressable>
      )}

      {/* Peticiones */}
      <Text style={styles.peticionesTitle}>Peticiones</Text>

      {diaSeleccionado !== null ? (
        peticionesDia.map((p, i) => (
          <Pressable key={i} style={styles.peticionCard} onPress={() => handleSolicitud(p.titulo)}>
            <View style={styles.peticionBarra} />
            <View style={styles.peticionInfo}>
              <Text style={styles.peticionTituloBold}>{p.titulo}</Text>
              <Text style={styles.peticionHorario}>{p.horario}</Text>
            </View>
          </Pressable>
        ))
      ) : (
        peticionesNormal.map((p, i) => (
          <View key={i} style={styles.peticionCard}>
            <View style={styles.peticionBarra} />
            <View style={styles.peticionInfo}>
              <View style={styles.peticionRow}>
                <Text style={styles.peticionFecha}>{p.fecha}</Text>
                <View style={[styles.estadoBadge, { backgroundColor: p.estadoColor }]}>
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
        ))
      )}

      {/* Leyendas de días pendientes */}
      {Object.entries(pendientes).map(([dia, tipo]) => (
        <View key={dia} style={styles.pendienteCard}>
          <View style={[styles.peticionBarra, { backgroundColor: '#93C5FD' }]} />
          <View style={styles.peticionInfo}>
            <View style={styles.peticionRow}>
              <Text style={styles.peticionTituloBold}>{tipo}</Text>
              <View style={[styles.estadoBadge, { backgroundColor: '#F5A623' }]}>
                <Text style={styles.estadoText}>Pendiente</Text>
              </View>
            </View>
            <Text style={styles.peticionHorario}>Día {dia} — pendiente por aprobar</Text>
          </View>
        </View>
      ))}

      <Text style={styles.footer}>Para aclaraciones consulta a tu encargado..</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 24 },
  calCard: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 16, padding: 16, marginBottom: 28 },
  calHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  calMes: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  calNav: { flexDirection: 'row', gap: 12 },
  navBtn: { fontSize: 18, color: '#111', paddingHorizontal: 4 },
  calGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  diaSemana: { width: `${100 / 7}%`, textAlign: 'center', fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#888', marginBottom: 8 },
  diaCell: { width: `${100 / 7}%`, alignItems: 'center', marginBottom: 6 },
  diaCirculo: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  diaSeleccionado: { borderWidth: 2, borderColor: '#111' },
  diaNum: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#FFF' },
  diaVacio: { width: 32, height: 32 },
  turnoTitle: { fontSize: 28, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 16 },
  turnoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#BCF0AE',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  turnoLabel: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  turnoHora: { fontSize: 15, fontFamily: 'FunnelDisplay_400Regular', color: '#555' },
  checkInBtn: {
    backgroundColor: '#BCF0AE',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  checkBtnText: { fontSize: 16, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  peticionesTitle: { fontSize: 28, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 16 },
  peticionCard: { flexDirection: 'row', backgroundColor: '#F0FBF0', borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  pendienteCard: { flexDirection: 'row', backgroundColor: '#EFF6FF', borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  peticionBarra: { width: 6, backgroundColor: '#111' },
  peticionInfo: { flex: 1, padding: 14 },
  peticionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  peticionFecha: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  peticionTituloBold: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 4 },
  estadoBadge: { borderRadius: 20, paddingVertical: 4, paddingHorizontal: 12 },
  estadoText: { fontSize: 13, fontFamily: 'FunnelDisplay_700Bold', color: '#FFF' },
  peticionHorario: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#555', marginBottom: 4 },
  peticionMotivo: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#333' },
  footer: { fontSize: 12, fontFamily: 'FunnelDisplay_400Regular', color: '#888', marginTop: 24, textAlign: 'left' },
});