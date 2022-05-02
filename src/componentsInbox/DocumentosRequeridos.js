import React, {useState, useContext} from 'react';

//importar componentes que podriamos usar de react
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Modal,
    Pressable
  } from 'react-native';




  const DocumentosRequeridos = ({ navigation }) => {
     const [nombreUsuario,setNombreUsuario]=useState("Jose Antonio Santos Cruz");

     const cargarDocumentos=()=>{
        navigation.navigate("Inbox");
    }

      return (
          <ScrollView  style={{backgroundColor:"white"}}>
            <View style={styles.container}>
               <Text style={styles.textTitle}>Bienvenido {nombreUsuario}</Text> 
               <View style={styles.menu}>

                     <View style={{flexDirection: "row",justifyContent:"flex-start",}} >                  
                          <View >
                              <View style={styles.redondo}>
                                 <Text style={{position:"absolute",top:12,left:4}}>CPT</Text>
                               </View>
                             
                          </View>
                          <View style={{ marginLeft:5,marginTop:12 }}>
                               <Text style={styles.textContenido}>Crédito Para Ti: Solicitud de Envío de Documentos</Text>
                          </View>
                      </View>

                      <View style={{marginTop:40}}>
                           <Text style={{}}>El siguiente paso para la Solicitud de tu Crédito
                            Para Ti es enviarnos los siguientes documentos:</Text>
                            <View style={{marginLeft:20,marginTop:20}}>
                                 <Text style={styles.textDocumento}>{'\u2022'} Comprobante de domicilio no mayo a 2 meses.</Text>
                                 <Text style={styles.textDocumento}>{'\u2022'} Recibo de nómina no mayor a 2 meses.</Text>
                                 <Text style={styles.textDocumento}>{'\u2022'} Identificación Oficial</Text>
                                 <Text style={styles.textDocumento}>{'\u2022'} Solicitud de crédito firmada</Text>
                            </View>
                            <Text style={styles.textEnvianos}>Favor de dar clik en el siguiente link para enviárnos tu documentación.</Text>
                           <TouchableOpacity onPress={()=>cargarDocumentos()}>
                                <Text style={styles.textEnviar}>Enviar mi documentación</Text>
                           </TouchableOpacity>
                            
                      
                      
                      </View>



                                 
               </View>
            </View>             
          </ScrollView>
      )
  }

  export default DocumentosRequeridos;

  

const styles = StyleSheet.create({
  container:{
         marginLeft:10,
         marginRight:10,
         marginTop:20,
  } , 
  textDocumento:{
    color: "black",
    alignSelf:"",
    fontFamily: "Helvetica Neue LT Std",
    fontSize:17,
    fontWeight:500,
    marginTop:20
  },
  textEnviar:{
    color: "black",
    alignSelf:"center",
    fontFamily: "Helvetica Neue LT Std",
    fontSize:17,
    fontWeight:500,
    marginTop:20
  },
  textEnvianos:{
    color: "black",
    alignSelf:"",
    fontFamily: "Helvetica Neue LT Std",
    fontSize:18,
    fontWeight:500,
    marginTop:30
  },

  textTitle: {
    color: "black",
    alignSelf:"center",
    fontFamily: "Helvetica Neue LT Std",
    fontSize:18,
    fontWeight:"bold",
    marginTop:40
  },
  textContenido: {
      color: "black",
      fontFamily: "Helvetica Neue LT Std",
      fontSize:12,
      fontWeight:500,
      textAlign:"justify"
    },
  menu:{
     flex:1,
     marginTop:40,
     marginLeft:5,
     marginRight:5
  },
  redondo:{
      borderRadius:"50%",
      width:40,
      height:40,
      borderColor: "black",
      borderWidth:2,
      
  },
})