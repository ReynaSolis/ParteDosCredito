import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Modal, TouchableOpacity } from "react-native";
import logo from "../assets/img/logo.png";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validacionCurp } from './api/validacionCurp';
import Footer from './Footer/Footer';
import MediaQuery from 'react-responsive';
//curp
export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      curpv: '',
      show: false,
      registro: false,
      identificadorJourney: ''
    }
  }
  //funcion para poder cambiar el input
  changecurp(curpv) {
    this.setState({ curpv })
  }


  async validado() {
    if (this.state.curpv.length == 18) {

      const obj = { 
        curp: this.state.curpv,
        identificadorJourney: "501"
      }

      const apiResponseCurp = await validacionCurp(obj);
      if (apiResponseCurp.codigo === "000") {
        //console.log("registrado")
        this.props.navigation.navigate('Upin', { curp: this.state.curpv })
      } else {
        //console.log("No estas registrado")
        this.props.navigation.navigate('Registro', { curp: this.state.curpv })
      }
    } else {
      this.setState({ show: true })
    }
  }

  //oculta los modales.
  hidden() {
    this.setState({ show: false })
  }
  //oculta los modales.
  hidden2() {
    this.setState({ registro: false })
  }
  //una vez ingresado el curp valida que tenga 18 caracteres
  registro() {
    if (this.state.curpv.length == 18) {
      this.props.navigation.navigate('Registro', { curp: this.state.curpv })
    } else {
      this.setState({ registro: true })
    }
  }


  render() {

    return (
      <KeyboardAwareScrollView style={{backgroundColor:"white"}}>

        <View >
          <Text style={styles.title}>Bienvenida/o</Text>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.curp}>Ingresa tu CURP:</Text>

          <TextInput style={styles.input}
            placeholder=" Ingresa los 18 caracteres"
            maxLength={18}
            autoCapitalize='characters'
            password={true}
            onChangeText={(curpv) => this.changecurp(curpv)}

          />

          <Text onPress={() => Linking.openURL('https://www.gob.mx/curp/')}
            style={styles.curpgob}>¿Olvidaste tu CURP?</Text>

          <View style={styles.btn}>
          <TouchableOpacity style={styles.btn2}
            onPress={() => this.validado()}
            >
          <Text style={{color:'white'}}>ENTENDIDO</Text>
          </TouchableOpacity>
            
          </View>


          <Modal
            transparent={true}
            visible={this.state.show}
          >

            <View style={styles.modalcontainer}>
              <View style={styles.modaltextcontainer}>
                <Text style={styles.modaltext}>CURP Incorrecto.</Text>
                <Text style={styles.modaltext2}>Recuerda que tu CURP tiene 18 caracteres.
                  Si lo olvidaste puedes consultar en:</Text>
                <Text onPress={() => Linking.openURL('https://www.gob.mx/curp/')}
                  style={styles.curpgob}>¿Olvidaste tu CURP?</Text>

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
            visible={this.state.registro}
          >

            <View style={styles.modalcontainer}>
              <View style={styles.modaltextcontainer}>
                <Text style={styles.modaltext}>Introduce tu CURP para el registro.</Text>

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





//styles
const styles = StyleSheet.create({
  
  container:{
    marginLeft:5,
    marginRight:5,
    marginTop:20,
    height:"35%",
    backgroundColor:"white"
} , 
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop:30,
    fontSize:20,
    fontWeight:'bolder',
  
  },
  logo: {
    width: 170,
    height: 170,
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    marginTop:10
    
  },
  curp: {
    color: "black",
    marginLeft: 20,

    fontSize: 20
  },
  input: {
    
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
   
    textTransform: 'uppercase',
    height: 40, 
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
  curpgob: {
    color: "blue",
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    textDecorationLine: 'underline',
   
    fontSize:15,
  },
  btn: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 70,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',

  },
  modaltextcontainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 3,
    margin: 50,
    padding: 40,
    

  },
  modaltext: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',


  },
  modaltext2: {
    fontSize: 20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
   

  },

});
