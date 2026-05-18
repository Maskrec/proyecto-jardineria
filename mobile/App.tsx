import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, FunnelDisplay_400Regular, FunnelDisplay_700Bold } from '@expo-google-fonts/funnel-display';
import * as SplashScreen from 'expo-splash-screen';

import Asterisk from './assets/file.svg';
import ImgHome from './assets/imgHome.svg';
import RegAdminScreen from './screens/regAdmin';
import IniciarSesionScreen from './screens/IniciarSesionScreen';
import DashboardAdminScreen from './screens/DashboardAdminScreen';

import OnboardingScreen from './screens/OnboardingScreen';
import OffboardingScreen from './screens/OffboardingScreen';
import AsistenciasScreen from './screens/AsistenciasScreen';
import NominaScreen from './screens/NominaScreen';
import ReclutamientoScreen from './screens/ReclutamientoScreen';
import PerfilScreen from './screens/PerfilScreen';
import AnadirEmpleadoScreen from './screens/AddEmpleadoScreen';
import DetalleEmpleadoScreen from './screens/DetalleEmpleadoScreen';
import DetalleCandidatoScreen from './screens/DetalleCandidatoScreen';
import DetalleOffboardingScreen from './screens/DetalleOffboardingScreen';
import NominaDetalleScreen from './screens/NominaDetalleScren';
import AsistenciasDetalleScreen from './screens/AsistenciaDetalleScreen';
import AsistenciaCalendarioScreen from './screens/AsistenciaCalendarioScreen';

SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  RegAdmin: undefined;
  IniciarSesion: undefined;
  DashboardAdmin: undefined;
  Onboarding: undefined;
  Offboarding: undefined;
  Asistencias: undefined;
  Nomina: undefined;
  Reclutamiento: undefined;
  Perfil: undefined;
  AnadirEmpleado: undefined;
  DetalleEmpleado: { empleado: {nombre: string; departamento: string; puesto: string; email: string; fecha: string} };
  DetalleCandidato: { candidato: {nombre: string; departamento: string; puesto: string} };
  DetalleOffboarding: { empleado: {nombre: string; departamento: string; puesto: string; email: string; fecha: string} };
  NominaDetalle: { empleado: {nombre: string; departamento: string; puesto: string;}; tipo: 'aprobar' | 'ver' };
  AsistenciaDetalle: { empleado: {nombre: string; departamento: string; puesto: string;}; tipo: 'validar' | 'ver' };
  AsistenciaCalendario: { empleado: {nombre: string; departamento: string; puesto: string;}; };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Pantalla Splash
function SplashScreenView({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.logoGroup}>
        <Asterisk width={200} height={200} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 </Text>
        <Text style={styles.footerText}>Sistemas de Gestión de Recursos Humanos.</Text>
        <Text style={styles.footerText}>v2.4.0</Text>
      </View>
    </View>
  );
}

// Pantalla Home
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <Text style={{ fontSize: 38, fontFamily: 'FunnelDisplay_700Bold', bottom: height * 0.25, color: '#BCF0AE' }}>
        ¡Bienvenido!
      </Text>
      <Text style={[styles.descriptionText, { top: height * 0.03 }]}>
        Vive la experiencia SGRH! Gestiona tramites, accede a informacion relevante y disfruta de beneficios exclusivos, todo desde tu celular.
      </Text>
      <View style={styles.imgHStyle}>
        <ImgHome width={211} height={210} />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={() => navigation.navigate('RegAdmin')}>
          <Text style={[styles.buttonText, { color: '#FFFF' }]}>Soy administrador</Text>
        </Pressable>
        <Pressable style={[styles.button, { backgroundColor: '#FFFF', borderWidth: 3, borderColor: '#BCF0AE' }]}>
          <Text style={[styles.buttonText, { color: '#BCF0AE' }]}>Soy empleado</Text>
        </Pressable>
      </View>
      <Text style={{ fontSize: 10, fontWeight: '200', color: '#78716C', bottom: height * 0.05, position: 'absolute', paddingHorizontal: 20, lineHeight: 16 }}>
        Si tienes problemas con la aplicacion por favor envia un correo a lorem@ipsum.com
      </Text>
    </View>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    FunnelDisplay_400Regular,
    FunnelDisplay_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true, gestureDirection: 'horizontal', animation: 'slide_from_right' }}>
        <Stack.Screen name="Splash" component={SplashScreenView} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="RegAdmin" component={RegAdminScreen} />
        <Stack.Screen name="IniciarSesion" component={IniciarSesionScreen} />
        <Stack.Screen name="DashboardAdmin" component={DashboardAdminScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Offboarding" component={OffboardingScreen} />
        <Stack.Screen name="Asistencias" component={AsistenciasScreen} />
        <Stack.Screen name="Nomina" component={NominaScreen} />
        <Stack.Screen name="Reclutamiento" component={ReclutamientoScreen} />
        <Stack.Screen name="Perfil" component={PerfilScreen} />
        <Stack.Screen name="AnadirEmpleado" component={AnadirEmpleadoScreen} />
        <Stack.Screen name="DetalleEmpleado" component={DetalleEmpleadoScreen} />
        <Stack.Screen name="DetalleCandidato" component={DetalleCandidatoScreen} />
        <Stack.Screen name="DetalleOffboarding" component={DetalleOffboardingScreen} />
        <Stack.Screen name="NominaDetalle" component={NominaDetalleScreen} />
        <Stack.Screen name="AsistenciaDetalle" component={AsistenciasDetalleScreen} />
        <Stack.Screen name="AsistenciaCalendario" component={AsistenciaCalendarioScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGroup: {
    width: 340,
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.34,
  },
  imgHStyle: {
    width: 311,
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.25,
  },
  footer: {
    position: 'absolute',
    bottom: height * 0.30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#78716C',
    lineHeight: 16,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    paddingHorizontal: 50,
    marginTop: 8,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: height * 0.15,
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    backgroundColor: '#BCF0AE',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: 330,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    fontWeight: '500',
  },
});