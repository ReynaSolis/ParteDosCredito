import React, {useState, useContext} from 'react';
import logo from "../../assets/img/logo.png"
import Footer from './Footer';

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


  const Menu = ({ navigation }) => {
     const [nombreUsuario,setNombreUsuario]=useState("Jose Antonio Santos Cruz");

     const cargarDocumentos=()=>{
        navigation.navigate("DocumentosRequeridos");
    }

      return (
          <ScrollView  style={{backgroundColor:"white"}}>
            <View style={styles.container}>
               <Image style={styles.logo} source={logo} />
               <Text style={styles.textTitle}>Bienvenido {nombreUsuario}</Text> 
               <View style={styles.menu}>
                    
                      <TouchableOpacity style={{flexDirection: "row",justifyContent:"flex-start",}} >                  
                          <View >
                           <View style={styles.redondo}>
                              <Text style={{position:"absolute",top:12,left:4}}>CPT</Text>
                           </View>
                             
                          </View>
                          <View style={{ marginLeft:10,marginTop:12 }}>
                               <Text style={styles.textContenido}>Descargar solicitud de crédito</Text>
                          </View>
                      </TouchableOpacity>



                      <TouchableOpacity style={{flexDirection: "row",justifyContent:"flex-start",marginTop:30}} onPress={()=>cargarDocumentos()} >                  
                          <View>
                           <View style={styles.redondo}>
                              <Text style={{position:"absolute",top:12,left:4}}>CPT</Text>
                           </View>
                             
                          </View>
                          <View style={{ marginLeft:10,marginTop:12 }}>
                               <Text style={styles.textContenido}>Crédito Para Ti: Solicitud de Envío de Documentos</Text>
                          </View>
                      </TouchableOpacity>
                                 
               </View>
             
             
            </View>  
            <View style={{position:'relative',top:"100%"}}>
              <Footer></Footer>
            </View>              
          </ScrollView>
      )
  }

  export default Menu;

  const styles = StyleSheet.create({
    container:{
           marginLeft:5,
           marginRight:5,
           marginTop:20,
    } , 
    logo: {
      width: 150,
      height: 150,
      display: 'flex',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 5
    },
    textTitle: {
      color: "black",
      alignSelf:"center",
      fontFamily: "Helvetica Neue LT Std",
      fontSize:18,
      fontWeight:"bold",
    
    },
    textContenido: {
        color: "black",
       
        fontFamily: "Helvetica Neue LT Std",
        fontSize:12,
        fontWeight:500,
     
      },
    menu:{
       flex:1,
       marginTop:40,
       marginLeft:20,
       marginRight:20
    },
    redondo:{
        borderRadius:"50%",
        width:40,
        height:40,
        borderColor: "black",
        borderWidth:2,
        
    },
})