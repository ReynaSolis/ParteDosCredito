import React, { useState, Component } from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, Modal, TouchableOpacity} from "react-native";
import logo from "../../../assets/img/logo.png";
import {validacionCuenta } from "../../api/auth";
import { CheckBox } from 'react-native-elements';

export default class ContinuarUpin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      check: false,
      aviso: true,
      avisop: false,
    }
  }

  async continuar() {
 
    if (this.state.check == false) {
        this.setState( {show:true});
    } else {
      const obj = { curp: this.props.route.params.curp, upin: this.props.route.params.upin }

      const apiResponse = await validacionCuenta(obj);
      if (apiResponse.codigo === "000") {
        this.props.navigation.navigate('Menu')
      }else{
        console.log("no inicio sesion.")
      }

    }

  }

  checked() {
    this.setState({ check: true })
  }

  inbox() {
    if (this.state.check == true) {
      this.setState({ show: false })
      this.setState({ aviso: false })
      this.setState({ avisop: false })
      this.props.navigation.navigate('Menu')
    } else {
      this.setState({ show: false })
      this.setState({ avisop: true })
    }

  }

  hidden() {
    this.setState({ aviso: false })
  }

  hidden2() {
    this.setState({ avisop: false })
    this.setState({ show: true })
  }


  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Image style={styles.logo} source={logo} />
        <Text style={styles.title}>Acceso con uPIN</Text>
        <Text style={styles.upin}>uPIN:</Text>

        <TextInput style={styles.input}
          placeholder=""
          maxLength={6}
          secureTextEntry={true}
          keyboardType="numeric"
          password={true}
          value={this.props.route.params.upin}
        />
        <View style={styles.btn}>
          <TouchableOpacity style={styles.btn2}
                  onPress={() => this.continuar()}
                  >
                    <Text style={{color:'white'}}>CONTINUAR</Text>
                  </TouchableOpacity>
        </View>


        <Modal
          //modal si no se acepta la politica de privacidad
          transparent={true}
          visible={this.state.avisop}
        >

          <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Acepta la Politica de Privacidad</Text>

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

        <Modal
          transparent={true}
          visible={this.state.aviso}
        >

          <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Tu uPIN se ha registrado con exito.</Text>

              <View style={styles.btn}>
              <TouchableOpacity style={styles.btn2}
                  onPress={() => this.hidden()}
                  >
                    <Text style={{color:'white'}}>ACEPTAR</Text>
                  </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>

        <Modal
          transparent={true}
          visible={this.state.show}
        >

          <View style={styles.modalcontainer}>
            <View style={styles.modaltextcontainer}>
              <Text style={styles.modaltext}>Terminos y Condiciones.</Text>
              <Text style={styles.modaltext2}>El aviso de privacidad y proteccion de los datos de DPR es para proteger los datos personales
                de sus Clientes y de los interesados receptores de informacion del cliente, por lo que los datos recabados en la plataforma,
                estaran protegidos conforme a los dispuesto por la Ley General de Proteccion de Datos Personales en Posesion de los Sujetos
                Obligados.</Text>



              <View>
                <CheckBox
                  title="Acepto la Politica de Privacidad"
                  checked={this.state.check}
                  onPress={() => this.checked()}
                />
              </View>


              <View style={styles.btn}>
              <TouchableOpacity style={styles.btn2}
                  onPress={() => this.inbox()}
                  >
                    <Text style={{color:'white'}}>ACEPTAR</Text>
                  </TouchableOpacity>
                
              </View>

              <Text onPress={() => Linking.openURL('https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf')}
                style={styles.ley}>CONSULTAR POLITICA DE PRIVACIDAD</Text>
            </View>
          </View>
        </Modal>

      </View>



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
  upin: {
    color: "black",
    marginLeft: 20,
    fontSize:20
  },
  input: {
    height: 40,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,

  },
  btn: {
    marginTop: 20,
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  

  },
  modaltext2: {
    fontSize: 10,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  

  },
  ley: {
    fontSize: 10,
    textDecorationLine: 'underline',
    marginTop: 20,
   
  },
});
