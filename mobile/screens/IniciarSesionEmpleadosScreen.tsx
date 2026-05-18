import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function IniciarSesionScreen() {
  const navigation = useNavigation<Nav>();
  
  const [keepSession, setKeepSession] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.logoContainer}>
        <View style={styles.logoRow}>
          <Asterisk width={220} height={220} />
        </View>
        <Text style={styles.logoSubtitle}>Acceso corporativo</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Email corporativo</Text>
        <TextInput
          style={styles.input}
          placeholder="lorem@ipsum.dolor"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.passwordRow}>
          <Text style={styles.label}>Contraseña</Text>
          <Text style={styles.forgotText}>olvido su clave?</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="123456..."
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <Pressable style={styles.checkboxRow} onPress={() => setKeepSession(!keepSession)}>
          <View style={[styles.checkbox, keepSession && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>Mantener sesión iniciada</Text>
        </Pressable>
      </View>

      

      <View style={styles.bottomContainer}>
        <Pressable
          style={styles.loginButton}
          onPress={() => navigation.navigate('DashboardEmpleadoScreen')}
        >
          <Text style={styles.loginButtonText}>Ingresar</Text>
        </Pressable>

        <Text style={styles.registerText}>
          No tienes una cuenta?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('RegEmpleado')}
          >
            Regístrate aquí
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.10,
    marginBottom: height * 0.05,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoSubtitle: {
    fontSize: 18,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    marginTop: 12,
  },
  formContainer: {
    width: width - 48,
    gap: 4,
  },
  label: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    marginTop: 16,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 15,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
    borderWidth: 1.5,
    borderColor: '#e0e0e0',
  },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
    marginTop: 16,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#aaa',
    backgroundColor: '#f0f0f0',
  },
  checkboxChecked: {
    backgroundColor: '#BCF0AE',
    borderColor: '#BCF0AE',
  },
  checkboxText: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
  },
  rolRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    width: width - 48,
  },
  rolBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  rolBtnActive: {
    backgroundColor: '#BCF0AE',
    borderColor: '#BCF0AE',
  },
  rolText: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
  },
  rolTextActive: {
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    width: width - 48,
    alignItems: 'center',
    gap: 16,
  },
  loginButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 18,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#FFFFFF',
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#888',
  },
  registerLink: {
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#333',
  },
});