import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';
import { ApiService, NominaResumenResponse } from '../services/api.service';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function NominaScreen() {
  const navigation = useNavigation<Nav>();
  const [nominas, setNominas] = useState<NominaResumenResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadNominas();
    }, [])
  );

  const loadNominas = async () => {
    try {
      setLoading(true);
      const data = await ApiService.listNominas();
      setNominas(data);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudieron cargar las nominas');
    } finally {
      setLoading(false);
    }
  };

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
        <Text style={styles.title}>Nomina</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#BCF0AE" style={{ marginTop: 20 }} />
        ) : (
          <>
            {/* Nóminas por aprobar */}
            <Text style={styles.sectionLabel}>Nominas por aprobar</Text>
            {nominas.map((e, i) => (
              <Pressable
                key={`aprobar-${i}`}
                style={styles.card}
                onPress={() => navigation.navigate('NominaDetalleScren', { empleado: e, tipo: 'aprobar' })}
              >
                <View style={styles.avatar} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{e.nombre_completo}</Text>
                  <Text style={styles.cardDetail}>{e.departamento}</Text>
                  <Text style={styles.cardDetail}>{e.cargo}</Text>
                  <Text style={[styles.cardDetail, { color: '#111', marginTop: 4 }]}>Total a pagar: ${e.resumen.total.toFixed(2)}</Text>
                </View>
              </Pressable>
            ))}

            {/* Buscador */}
            <View style={styles.searchRow}>
              <TextInput
                style={styles.searchInput}
                placeholder="Ingresa tu busqueda..."
                placeholderTextColor="#aaa"
              />
              <View style={styles.searchButton} />
            </View>

            {/* Lista general */}
            {nominas.map((e, i) => (
              <Pressable
                key={`detalle-${i}`}
                style={styles.card}
                onPress={() => navigation.navigate('NominaDetalleScren', { empleado: e, tipo: 'detalle' })}
              >
                <View style={styles.avatar} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{e.nombre_completo}</Text>
                  <Text style={styles.cardDetail}>{e.departamento}</Text>
                  <Text style={styles.cardDetail}>{e.cargo}</Text>
                </View>
              </Pressable>
            ))}
          </>
        )}

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
    marginBottom: 8,
  },
  sectionLabel: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#555',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 24,
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
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    flexShrink: 0,
  },
  cardInfo: { flex: 1, gap: 4 },
  cardName: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginBottom: 2,
  },
  cardDetail: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    lineHeight: 20,
  },
});