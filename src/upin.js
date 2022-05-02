import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, Modal, TouchableOpacity } from "react-native";
import logo from "../assets/img/logo.png";
import {validacionCuenta } from "./api/auth"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Footer from './Footer/Footer';
//upin
export default class Upin extends React.Component{
  
  constructor(){
    super()
    this.state={
      upinv: '',
      show: false,
      identificadorJourney: ''
    }
  }
  
  changeupin(upinv){
  this.setState({upinv})
  }
  
  
  async validado(){
  if(this.state.upinv.length==6){
 
    const obj= {
      curp: this.props.route.params.curp,
      upin:this.state.upinv,
      identificadorJourney: "501"
    }

    const apiResponse=await validacionCuenta(obj);
    //console.log(apiResponse);

    if(apiResponse.codigo==="000"){
      //inicio sesion corrctamente lo dirige al inbox
      this.props.navigation.navigate('Menu', {curp: this.props.route.params.curp})
      
    }else{
      this.setState({show:true});
    }
    
    
  }else{
    this.setState({show:true})
  }
  }
//oculta modales
  hidden(){
    this.setState({show:false})
  }



  render(){
  return (
    <KeyboardAwareScrollView>
    <View style={{backgroundColor: 'white'}}>
      
        <Image style={styles.logo} source={logo}/>
         <Text style={styles.title}>Ingresa tu contraseña / uPIN</Text>
         <Image style={styles.logo2} source={logo}/>
         <Text style={styles.upin}>Ingresa tu contraseña / uPIN:</Text>

         <TextInput style={styles.input} 
         placeholder="Ingresa los 6 caracteres"
         maxLength={6}
         keyboardType="numeric"
         password={true}
         secureTextEntry={true}
         onChangeText={(upinv)=>this.changeupin(upinv)}
         value={this.state.upinv}
         />

        <Text onPress={() => this.props.navigation.navigate('ConsultarUpin', {curp: this.props.route.params.curp})}
        style={styles.forgetUpin}>¿Olvidaste tu uPIN?</Text>
        
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btn2}
            onPress={() => this.validado()}
            >
          <Text style={{color:'white'}}>INICIAR SESION</Text>
          </TouchableOpacity>
            
          </View>

        <Modal
        transparent={true}
        visible={this.state.show}
        >
          
            <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>UPIN Incorrecto</Text>
              <Text style={styles.modaltext2}>Recuerda que tu uPIN contiene 6 caracteres. 
              Si lo olvidaste puedes consultar en:</Text>
              <Text onPress={() => this.props.navigation.navigate('ConsultarUpin', {curp: this.props.route.params.curp})}
              style={styles.forgetUpin}>¿Olvidaste tu uPIN?</Text>

  

                  <View style={styles.btn}>
                  <TouchableOpacity style={styles.btn2}
                  onPress={() => this.hidden()}
                  >
                    <Text style={{color:'white'}}>ENTENDIDO</Text>
                  </TouchableOpacity>
                  </View>
            </View>
            </View>

        </Modal>
         </View>
         <Footer></Footer>
         </KeyboardAwareScrollView>
  );
}
}

const styles = StyleSheet.create({
    title: {
     color: "black",
     marginLeft: 'auto',
     marginRight: 'auto',
    fontSize:20,
    fontWeight:'bolder',
    
    },
    logo: {
     width: 150,
     height: 150,
     display: 'flex',
     marginLeft: 'auto',
     marginRight: 'auto',
     marginTop:10
    },
    logo2: {
        width: 250,
        height: 150,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        marginTop: 20,
       },
    upin: {
     color: "black",
     marginLeft:20,
   
     fontSize:15
    },
    input: {
     height:40, 
     marginTop: 10,
     marginLeft:20,
     marginRight:20,
     borderWidth: 1,
     borderColor:'rgba(206, 31, 40, 1)',
     
    },
    forgetUpin: {
     color: "blue",
     marginTop:30,
     marginLeft: 'auto',
     marginRight: 'auto',
     textDecorationLine: 'underline',
     
     fontSize:15
   },
   btn: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'rgba(206, 31, 40, 1)',
    
    alignItems:'center'

  },
  btn2: {
    marginLeft: 20,
    marginRight: 20,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'rgba(206, 31, 40, 1)',
    
    alignItems:'center'

  },
   //modal
  modalcontainer: {
    flex:1,
    alignItems:'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    
  },
  modaltextcontainer: {
    alignItems: 'center',
    backgroundColor:'white',
    borderWidth:3,
    margin:30,
    padding:20,
   
    
  },
  modaltext: {
    fontSize:15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    
    
  },
  modaltext2: {
    fontSize:15,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    
    
  },
 
 });
 