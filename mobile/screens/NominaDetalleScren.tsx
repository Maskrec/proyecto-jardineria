import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';
import { ApiService, NominaDetalleResponse } from '../services/api.service';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;
type Route = RouteProp<RootStackParamList, 'NominaDetalleScren'>;

export default function NominaDetalleScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const { empleado, tipo } = route.params;

  const [detalle, setDetalle] = useState<NominaDetalleResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDetalle();
  }, []);

  const loadDetalle = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getNominaDetalle(empleado.id_empleado);
      setDetalle(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo cargar el detalle de la nomina');
    } finally {
      setLoading(false);
    }
  };

  const datosBancarios = [
    { label: 'CLABE Interbancaria', valor: 'Pendiente de configurar' },
    { label: 'Numero de tarjeta', valor: 'Pendiente' },
    { label: 'Banco', valor: 'Pendiente' },
    { label: 'RFC', valor: 'Pendiente' },
    { label: 'CURP', valor: 'Pendiente' },
    { label: 'No. de Seguro Social', valor: 'Pendiente' },
    { label: 'Clave de empleado', valor: empleado.id_empleado },
  ];

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      {/* Título */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Nomina: </Text>
        <Text style={styles.titleName}>{empleado.nombre_completo}</Text>
      </View>

      {loading || !detalle ? (
        <ActivityIndicator size="large" color="#BCF0AE" style={{ marginTop: 20 }} />
      ) : (
        <>
          {/* Card nómina */}
          <View style={styles.nominaCard}>
            <Text style={styles.nominaTitle}>Nomina</Text>
            <Text style={styles.nominaSubtext}>Ultimo pago: Pendiente</Text>
            <Text style={styles.nominaSubtext}>Proximo pago: Fin de mes</Text>

            <Text style={styles.fieldLabel}>Folio</Text>
            <Text style={styles.fieldValue}>{detalle.nomina.folio}</Text>

            <View style={styles.divider} />

            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.fieldLabel}>Periodicidad</Text>
                <Text style={styles.fieldValue}>14</Text>
              </View>
              <View style={[styles.tableCol, styles.tableBorder]}>
                <Text style={styles.fieldLabel}>Dias pagados</Text>
                <Text style={styles.fieldValue}>{detalle.nomina.diasPagados}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.fieldLabel}>Faltas</Text>
                <Text style={styles.fieldValue}>{detalle.nomina.faltas}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <Text style={styles.fieldLabel}>Percepciones</Text>
            <Text style={styles.fieldValue}>P001 Sueldo Base ${detalle.nomina.percepciones.sueldoBase.toFixed(2)}</Text>
            <Text style={styles.fieldValue}>P002 Bonos Activos ${detalle.nomina.percepciones.bonos.toFixed(2)}</Text>

            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>Deducciones</Text>
            <Text style={styles.fieldValue}>D001 ISR (10%) ${detalle.nomina.deducciones.isr.toFixed(2)}</Text>
            <Text style={styles.fieldValue}>D002 IMSS (5%) ${detalle.nomina.deducciones.imss.toFixed(2)}</Text>

            <View style={styles.divider} />

            <View style={styles.totalesRow}>
              <View>
                <Text style={styles.fieldLabel}>Subtotal</Text>
                <Text style={styles.fieldValue}>${detalle.nomina.totales.subtotal.toFixed(2)}</Text>
              </View>
              <View>
                <Text style={styles.fieldLabel}>Descuentos</Text>
                <Text style={styles.fieldValue}>${detalle.nomina.totales.descuentos.toFixed(2)}</Text>
              </View>
              <View>
                <Text style={styles.fieldLabel}>Total</Text>
                <Text style={styles.fieldValue}>${detalle.nomina.totales.total.toFixed(2)}</Text>
              </View>
            </View>

            {/* Botones solo si es "por aprobar" */}
            {tipo === 'aprobar' && (
              <View style={styles.botonesRow}>
                <Pressable style={styles.aprobarBtn}>
                  <Text style={styles.aprobarBtnText}>Aprobar pago</Text>
                </Pressable>
                <Pressable style={styles.modificarBtn}>
                  <Text style={styles.modificarBtnText}>Modificar informacion</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Card datos bancarios */}
          <View style={styles.bancarioCard}>
            {datosBancarios.map((d, i) => (
              <View key={i} style={{ marginBottom: 12 }}>
                <Text style={styles.fieldLabel}>{d.label}</Text>
                <Text style={styles.fieldValue}>{d.valor}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 36,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
  },
  titleName: {
    fontSize: 20,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
  },
  nominaCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  nominaTitle: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 4,
  },
  nominaSubtext: {
    fontSize: 12,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    textAlign: 'center',
    lineHeight: 18,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    marginTop: 10,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  tableRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tableCol: {
    flex: 1,
  },
  tableBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 8,
  },
  totalesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  botonesRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  aprobarBtn: {
    backgroundColor: '#BCF0AE',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  aprobarBtnText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
  },
  modificarBtn: {
    borderWidth: 1.5,
    borderColor: '#111',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  modificarBtnText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
  },
  bancarioCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    padding: 18,
  },
});