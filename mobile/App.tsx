import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
} from 'react-native';
import { useEffect, useState } from 'react';
import Asterisk from './assets/file.svg';
import ImgHome from './assets/imgHome.svg';
import { useFonts, FunnelDisplay_400Regular, FunnelDisplay_700Bold } from '@expo-google-fonts/funnel-display';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();




const { width, height } = Dimensions.get('window');

export default function App() {
   const [showNext, setShowNext] = useState(false);
   const [fontsLoaded] = useFonts({
    FunnelDisplay_400Regular,
    FunnelDisplay_700Bold,
  });

  useEffect (() => {
    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    } 
  }, [fontsLoaded]);
   
  useEffect(() => {
    if (!fontsLoaded) return;
    const timer = setTimeout(() => {
      setShowNext(true);

    }, 3000);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  
  // pantalla home
  if (showNext){
    return (
      <View style={styles.root}>
        <StatusBar style="dark" />
        <Text style={{ fontSize: 38, fontFamily: 'FunnelDisplay_700Bold', bottom: height* 0.25, color:'#BCF0AE' }}>¡Bienvenido!</Text>
        <Text style={[styles.descriptionText, { top: height * 0.03}]}>Vive la experiencia SGRH! Gestiona tramites, accede a informacion relevante y disfruta de beneficios exclusivos, todo desde tu celular.</Text>
        <View style={styles.imgHStyle}>
          <ImgHome width={211} height={210}  />
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.button}>
            <Text style={[styles.buttonText, {color: '#FFFF'}]}>Soy administrador</Text>
          </Pressable>
          <Pressable style={[styles.button, {backgroundColor: '#FFFF', borderWidth: 3, borderColor: '#BCF0AE'}]}>
            <Text style={[styles.buttonText, {color: '#BCF0AE'}]}>Soy empleado</Text>
          </Pressable>
        </View>



        {/* Footer */}
        
        <Text style={{ fontSize: 10, fontWeight: '200', color: '#78716C', bottom: height * 0.05, position: 'absolute', paddingHorizontal: 20, lineHeight: 16   }}>Si tienes problemas con la aplicacion por favor envia un correo a lorem@ipsum.com</Text>
        


      </View>
    );
  }

  //pantalla inicio 
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />

      {/* Componente central: logo SGRH + asterisco */}
      <View style={styles.logoGroup}>
        
          <Asterisk width={200} height={200} />
        
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 </Text>
        <Text style={styles.footerText}>Sistemas de Gestión de Recursos Humanos.</Text>
        <Text style={styles.footerText}>v2.4.0</Text>
      </View>
    </View>
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
    //textAlign: 'center',
    lineHeight: 16,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    //textAlign: 'center',
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
    //color: '#333333',
    fontWeight: '500',
  },
});