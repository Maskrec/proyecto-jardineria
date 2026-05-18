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

export default function AñadirEmpleadoScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      {/* Breadcrumb */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.breadcrumb}>&lt;-- Página de Onboarding</Text>
      </Pressable>

      {/* Título */}
      <Text style={styles.title}>Añadir empleado</Text>

      {/* Formulario */}
      <View style={styles.formCard}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Natanael Cano"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>ID de empleado</Text>
        <TextInput
          style={styles.input}
          placeholder="123456..."
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="lorem@ipsum.dolor"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Fecha de nacimiento</Text>
        <TextInput
          style={styles.input}
          placeholder="12345"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Departamento</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Puesto</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <Pressable style={styles.addButton} onPress={() => navigation.navigate('Onboarding')}>
          <Text style={styles.addButtonText}>Anadir</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  breadcrumb: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    lineHeight: 46,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#D6F5CC',
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#222',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#FFF',
  },
});