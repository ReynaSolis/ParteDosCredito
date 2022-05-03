import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, Modal, TouchableOpacity  } from "react-native";
import logo from "../../../assets/img/logo.png";
import { validaCodigoTelefono } from '../../api/validaCodigoTelefono';
import { validacionTelefono } from '../../api/validacionTelefono';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Footer from '../../Footer/Footer';
import MediaQuery from 'react-responsive';
//validacion telefono
export default class ValidarTelefono extends React.Component{
  constructor(){
    super()
    this.state={
      telva: '',
      show: false,
      reenviado: false
    }
  }
  hidden(){
    this.setState({show:false})
  }

  hidden2(){
    this.setState({reenviado:false})
  }
  
  changetelva(telva){
  this.setState({telva})
  }
  
  async reenviar(){
    const obj={numero: this.props.route.params.telefono}
    const telefono = await validacionTelefono(obj);
    
    //console.log(obj);
    //console.log(telefono);
    
    if(telefono.respuesta==="000"){
      this.setState({reenviado:true})
    }
  }
  
async validado(){
  if(this.state.telva.length==4){
    const objModel={telefono:this.props.route.params.telefono,curp:this.props.route.params.curp};
    //console.log(objModel);
    const obj={codigo:this.state.telva, numero:objModel.telefono,curp:objModel.curp }
    const valCode= await validaCodigoTelefono(obj);
    //console.log(obj);
    //console.log(valCode);
    if(valCode.respuesta==="000"){
        this.props.navigation.navigate('GeneraUpin',objModel)
    }else{this.setState({show:true})}
  }else{
    this.setState({show:true})
  }
  }
  render(){
  return (
    <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <View style={{backgroundColor: 'white'}}>
         
         <Image style={styles.logo} source={logo}/>
         <Text style={styles.title}>Ingresar codigo de validacion.</Text>
         <Text style={styles.instruccion}>Ingresa el codigo de numeros que enviamos a tu celular via SMS:</Text>
         

         <TextInput style={styles.input} 
         placeholder=" codigo 4 digitos"
         maxLength={4}
         keyboardType="numeric"
         onChangeText={(telva)=>this.changetelva(telva)}
         value={this.state.telva}
         
         />

      
                  <View style={styles.btn}>
                  <TouchableOpacity style={styles.btn2}
                  onPress={() => this.validado()}
                  >
                    <Text style={{color:'white'}}>VALIDAR CELULAR</Text>
                  </TouchableOpacity>
                  </View>

        <Text style={styles.advertencia}>Tu codigo expira en 60 segundos.</Text>
        <Text style={styles.advertencia}>Este proceso puede durar algunos minutos. Si no lo recibes haz click aqui para reenviar.</Text>

        <Text onPress={() => this.reenviar()}
        style={styles.reenviar}>ENVIARMELO DE NUEVO</Text>

        <Modal
        transparent={true}
        visible={this.state.show}
        >
          
            <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Codigo de validacion incorrecto</Text>
              <Text style={styles.modaltext2}>Revisa tus SMS para ingresar correctamente el codigo. 
              De no haber recibido el codigo favor de seleccionar "ENVIARMELO DE NUEVO".</Text>

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
        visible={this.state.reenviado}
        >
          
            <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Codigo de verificacion reenviado.</Text>
              

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
        <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
              <MediaQuery minDeviceWidth={530}>
                  <Footer></Footer>
              </MediaQuery>
          </MediaQuery>  

           <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
             <MediaQuery maxDeviceWidth={529}> 
                <View style={{position:"relative",top:"30%"}}>
                  <Footer></Footer>
                </View>
             </MediaQuery>
           </MediaQuery>  
         </View>
        
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
    marginLeft:20,
    marginRight:20,
    borderWidth: 1,
   

    borderColor:'rgba(164, 167, 169, 1)',
    "borderTopLeftRadius": 5,
    "borderTopRightRadius": 4,
    "borderBottomLeftRadius": 4,
    "borderBottomRightRadius": 4,
    "shadowColor": "rgb(0,  0,  0)",
    "shadowOpacity": 0.47058823529411764,
    "shadowOffset": {
      "width": 0,
      "height": 3
    },
    "shadowRadius": 6,
    
   },
   btn: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
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
  instruccion: {
    color: "black",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    
    fontSize:20,
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

    fontsize:20
   },
   reenviar: {
    color: "black",
    marginTop:30,
    marginBottom:30,
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    fontWeight: 'bold',
 
    fontSize:15
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
