import React ,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//importaciones de pantallas componentes
import Login from './src/login';
import Upin from './src/upin';
import ConsultarUpin from './src/consultarUpin';
import Registro from './src/registro';

import Telefono from './src/components/componentsRegistro/telefono';
import ValidarTelefono from './src/components/componentsRegistro/validarTelefono';
import GeneraUpin from './src/components/componentsRegistro/generaUpin';
import CrearUpin from './src/components/componentsRegistro/crearUpin';
import ContinuarUpin from './src/components/componentsRegistro/continuarUpin';
import NuevoUpin from './src/nuevoUpin';
import HomeScreen from './src/componentsInbox/inbox';
import Menu from './src/componentsInbox/Menu';
import ConfirmarIdentidad from './src/componentsInbox/ConfirmarIdentidad';
import DocumentosRequeridos from './src/componentsInbox/DocumentosRequeridos';
import ContextoUsuario from './src/componentsInbox/context'; 

const Stack = createNativeStackNavigator();

export default function App() {
  const [domicilio,setDomicilio]=useState(false);
  const [nomina,setNomina]=useState(false);
  const [identificacion,setIdentificacion]=useState(false);
  const [credito,setCredito]=useState(false);
  const [identidad,setIdentidad ]=useState(false);
  const [ confirmarDocumentos,setConfirmarDatos]=useState(false);


  const [mostrarCamara,setMostarCamara]=useState(false);

  const [capturaDomicilio,setCapturaDomicilio]=useState();
  const [capturaNomina,setCapturaNomina]=useState();
  const [capturaIdentificacion,setCapturaIdentificacion]=useState();
  const [capturaCredito,setCapturaCredito]=useState();
  const [capturaIdentidad,setCapturaIdentidad]=useState();
  //datosReyna
  const [curp,setCurp]=useState();
  const [tel,setTel]=useState();
  const [telefonoValido,setTelefonoValido]=useState()
  const [upin,setUpin]=useState()
  const [nombre,setNombre]=useState()
  const [telBase,setTelBase]=useState()
  const [identificadorJourney,setIdentificadorJourney]=useState();

  
 /* const config = {
    screens: {
      Login: 'login/',
      Upin: 'login/Upin/',
      Registro:'login/registro',
      Telefono:'login/telefono'
    },
  };*/

  const config = {
   
    screens: {
      Login:{
        path:'inbox'
      },
      Registro: {
        path: '/inbox/registro/', 
      },
      Telefono: {
        path: '/inbox/telefono/', 
      },
      ValidarTelefono:{
        path: '/inbox/validarTelefono', 
      },
      GeneraUpin:{
        path: '/inbox/generaUpin', 
      },
      CrearUpin:{
        path: '/inbox/crearUpin', 
      },
      ContinuarUpin:{
        path: '/inbox/continuarUpin', 
      },
      Inbox:{
        path: '/inbox/subirDocumentos', 
      },
      NuevoUpin:{
        path: '/inbox/nuevoUpin', 
      },
      Menu:{
        path: '/inbox/menu', 
      },
      DocumentosRequeridos:{
        path: '/inbox/documentosRequeridos', 
      },

      ConfirmarIdentidad:{
        path: '/inbox/confirmarIdentidad', 
      },
      Upin:{
        path: '/inbox/upin', 
      },
      ConsultarUpin:{
        path: '/inbox/consultarUpin', 
      },
    },
  };

  const linking = {
    prefixes:  [],
    config,
  };
  

  return (
    <ContextoUsuario.Provider value={{domicilio,setDomicilio,
      nomina,setNomina,
      identificacion,setIdentificacion,
      credito,setCredito,
      identidad,setIdentidad,
      confirmarDocumentos,setConfirmarDatos,
      mostrarCamara,setMostarCamara,   
      capturaCredito,setCapturaCredito,
      capturaNomina,setCapturaNomina,
      capturaIdentificacion,setCapturaIdentificacion,
      capturaDomicilio,setCapturaDomicilio,
      capturaIdentidad,setCapturaIdentidad,
      curp,setCurp,
      tel,setTel,
      telefonoValido,setTelefonoValido,
      upin,setUpin,
      nombre,setNombre,
      telBase,setTelBase,
      identificadorJourney,setIdentificadorJourney
                            }}>
                              
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{headerShown:false}}
       initialRouteName="Login" >
        <Stack.Screen name= "Login" component={Login} options={{title:''}} />
        <Stack.Screen name= "Upin" component={Upin} options={{title:''}} />
        <Stack.Screen name= "ConsultarUpin" component={ConsultarUpin} options={{title:''}} />
        <Stack.Screen name= "Registro" component={Registro} options={{title:''}} />
        <Stack.Screen name= "Telefono" component={Telefono} options={{title:''}} />
        <Stack.Screen name= "ValidarTelefono" component={ValidarTelefono} options={{title:''}} />
        <Stack.Screen name= "GeneraUpin" component={GeneraUpin} options={{title:''}} />
        <Stack.Screen name= "CrearUpin" component={CrearUpin} options={{title:''}} />
        <Stack.Screen name= "ContinuarUpin" component={ContinuarUpin} options={{title:''}} />
        <Stack.Screen name= "Inbox" component={HomeScreen} options={{title:''}} />
        <Stack.Screen name= "NuevoUpin" component={NuevoUpin} options={{title:''}} />
        <Stack.Screen name= "Menu" component={Menu}  options={{title:''}} />
        <Stack.Screen name= "DocumentosRequeridos" component={DocumentosRequeridos} options={{title:''}} />
        <Stack.Screen name="ConfirmarIdentidad" component={ConfirmarIdentidad} options={{title:''}} />
      </Stack.Navigator>
      </NavigationContainer>
      </ContextoUsuario.Provider>
      
  );
}


