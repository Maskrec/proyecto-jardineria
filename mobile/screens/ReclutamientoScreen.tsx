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
import { ApiService, EmpleadoResponse } from '../services/api.service';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function ReclutamientoScreen() {
  const navigation = useNavigation<Nav>();
  const [candidatos, setCandidatos] = useState<EmpleadoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadCandidatos();
    }, [])
  );

  const loadCandidatos = async () => {
    try {
      setLoading(true);
      const data = await ApiService.listEmployees();
      // Filtrar solo los empleados
      const empleados = data.filter(e => e.role === 'EMPLEADO');
      setCandidatos(empleados);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudieron cargar los candidatos');
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
        <Text style={styles.title}>Reclutamiento</Text>

        {/* Buscador */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Ingresa tu busqueda..."
            placeholderTextColor="#aaa"
          />
          <View style={styles.searchButton} />
        </View>

        {/* Lista de candidatos */}
        {loading ? (
          <ActivityIndicator size="large" color="#BCF0AE" style={{ marginTop: 20 }} />
        ) : (
          candidatos.map((c, i) => (
            <Pressable key={i} style={styles.card} onPress={() => navigation.navigate('DetalleCandidatoScreen', { candidato: c })}>
              <View style={styles.avatar} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{c.nombre_completo}</Text>
                <Text style={styles.cardDetail}>{c.departamento}</Text>
                <Text style={styles.cardDetail}>{c.cargo}</Text>
              </View>
            </Pressable>
          ))
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
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D9D9D9',
    flexShrink: 0,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
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