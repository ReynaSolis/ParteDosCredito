import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, Modal, TouchableOpacity } from "react-native";
import logo from "../assets/img/logo.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validaCodigoTelefono } from './api/validaCodigoTelefono';
import { nuevoUpin } from './api/nuevoUpin';
import Footer from './Footer/Footer';
import ContextoUsuario from './componentsInbox/context';
//nuevo upin
export default class NuevoUpin extends React.Component{
  static contextType = ContextoUsuario;
  constructor(props){
    super(props)
    this.state={
      upinew1: '',
      upinew2: '',
      upinewt: '',
      show: false,
      temporal: false,
    }
  }
  //oculta modales
  hidden(){
    this.setState({show:false})
  }
  hidden2(){
    this.setState({temporal:false})
  }
  
  //cambios de input
  changeupinew1(upinew1){
    this.setState({upinew1})
    }
  changeupinew2(upinew2){
  this.setState({upinew2})
  }

  changeupinewt(upinewt){
    this.setState({upinewt})
    }
  
  //validacion
  async validado(upin){
     
      //primero se verifica el codigo temporal
      if(this.state.upinewt.length!==''){
        let num = this.state.upinewt.replace(".", '');
     if(isNaN(num)){
       //no es un numero o esta incorrecto
    this.setState({temporal:true})

     }else{
       //es un numero y sigue con los upin y valida el codigo
       const objModel={
        telefono:this.context.tel,
        curp:this.context.curp,
        identificadorJourney:this.context.identificadorJourney
      };
      
      //console.log(objModel);
  
      const obj={codigo:this.state.upinewt, numero:this.context.tel,curp:this.context.curp }
      const valCode= await validaCodigoTelefono(obj);
      //console.log(obj);
      //console.log(valCode);
      if(valCode.respuesta==="000"){

        //codigo celular correcto
      let num1 = upin.replace(".", '');
      let num2 = this.state.upinew2.replace(".", '');
      if(isNaN(num1) && isNaN(num2)){
        //no es un numero los upin
        this.setState({show:true})
      }else{

          //validacion de upins iguales
        if(upin.length==6 && this.state.upinew2.length==6 &&
            upin === this.state.upinew2){

              const objUpin ={
                curp: this.context.curp, 
                identificadorJourney:this.context.identificadorJourney,
                upin: upin
              }
            const renuevaUpin = await nuevoUpin(objUpin);
            if(renuevaUpin.codigo=="001" || renuevaUpin.codigo=="000"){
              //console.log(renuevaUpin.codigo)
              this.props.navigation.navigate('ContinuarUpin')
            }
            else{
              this.setState({show:true})
            }
            
          }else{
            this.setState({show:true})
          }}
      }else {
        this.setState({temporal:true})
      }
      }
      }else{
        this.setState({temporal:true})
      }
  
  }

  
  
  
  

  render(){
    const {upin,setUpin,tel,curp} = this.context;
    
    
  return (
    <KeyboardAwareScrollView>
        <View style={{backgroundColor: 'white'}}>
         
         <Image style={styles.logo} source={logo}/>
         <Text style={styles.title}>Codigo de verificacion</Text>
         <Text style={styles.instruccion}>Ingresa el codigo que se te envio:</Text>

         <TextInput style={styles.input} 
         placeholder="Codigo temporal"
         maxLength={4}
         keyboardType="numeric"
         password={true}
         onChangeText={(upinewt)=>this.changeupinewt(upinewt)}
         value={this.state.upinewt}
         />

         <Text style={styles.instruccion}>Nuevo uPIN:</Text>

         <TextInput style={styles.input} 
         placeholder="Nuevo uPIN 6 digitos"
         maxLength={6}
         secureTextEntry={true}
         keyboardType="numeric"
         password={true}
         onChangeText={(upinew1)=> {
          setUpin(upinew1)
         }}
       
         
         
         />

        <Text style={styles.instruccion}>Confirmar uPIN:</Text>

        <TextInput style={styles.input} 
        placeholder="Confirmar uPIN"
        maxLength={6}
        secureTextEntry={true}
        keyboardType="numeric"
        password={true}
        onChangeText={(upinew2)=>this.changeupinew2(upinew2)}
        value={this.state.upinew2}
       

        />

          <View style={styles.btn}>
          <TouchableOpacity style={styles.btn2}
            onPress={() => this.validado(upin)}
            >
          <Text style={{color:'white'}}>RESTABLECER UPIN</Text>
          </TouchableOpacity>
            
          </View>

        <Modal
        transparent={true}
        visible={this.state.show}
        >
          
            <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
            <Text style={styles.modaltext}>uPIN incorrecto/No coincide</Text>
              <Text style={styles.modaltext2}>Recuerda que tu uPIN tiene 6 numeros y debe coincidir en ambos recuadros.</Text>
            
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

        <Modal
        transparent={true}
        visible={this.state.temporal}
        >
          
            <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
            <Text style={styles.modaltext}>Codigo temporal incorrecto/No coincide</Text>
              <Text style={styles.modaltext2}>Verifica que tu codigo temporal sea el mismo que se mando a tu telefono previamente.</Text>
              <Text style={styles.modaltext2}>De lo contrario no podras generar uno nuevo.</Text>
              <View style={styles.btn}>
                  <TouchableOpacity style={styles.btn2}
                  onPress={() => this.hidden2()}
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
    marginLeft: 20,
    marginBottom: 20,
    fontSize:20,
    fontWeight:'bolder',
   },
   logo: {
    width: 150,
    height: 150,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
   },
   input: {
    height:40, 
    marginTop: 10,
    marginBottom: 30,
    marginLeft:20,
    marginRight:20,
    borderWidth: 1,
    borderColor:'rgba(206, 31, 40, 1)',
   },
   btn: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor:'rgba(206, 31, 40, 1)',
   
    alignItems:'center',
    fontSize:20

  },
  btn2: {
    marginLeft: 20,
    marginRight: 20,
    marginTop:10,
    marginBottom:10,
    backgroundColor:'rgba(206, 31, 40, 1)',
   
    alignItems:'center',
    fontSize:20

  },
  instruccion: {
    color: "black",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    
    fontSize:20
   },
   advertencia: {
    color: "black",
    marginTop:20,
    marginBottom:20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
   
    fontSize:20
   },
   reenviar: {
    color: "black",
    marginTop:30,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontWeight: 'bold',
    
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
    margin:50,
    padding:40,
    
    
  },
  modaltext: {
    fontSize:20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    
    
  },
  modaltext2: {
    fontSize:20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  
    
  },

});
