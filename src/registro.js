import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, Modal, TouchableOpacity } from "react-native";
import logo from "../assets/img/logo.png";
import { validacionCurp } from './api/validacionCurp';
//registro login
export default class Registro extends React.Component {

  constructor(){
    super()
    this.state={
      show: true,
    }
  }

  hidden(){
    this.setState({show:false})
  }

  async validaCurp(){
    const curpG= {curp: this.props.route.params.curp.toUpperCase()}
   const apiResponse=await validacionCurp(curpG);
   //console.log(curpG);
   //console.log(apiResponse);
   if(apiResponse.codigo!="000"){
    this.props.navigation.navigate('Telefono', {curp: this.props.route.params.curp})
   }else{
    this.props.navigation.navigate('Login')
   }
  }

  render(){
  return (
    <View style={{backgroundColor: 'white'}}>
     
        <Image style={styles.logo} source={logo}/>
         <Text style={styles.title}>A continuacion crearas tu cuenta IDe</Text>
         <Image style={styles.logo2} source={logo}/>
         <Text style={styles.title}>Tus documentos de identidad Electronica estaran cifrados y seguros.</Text>

         <View style={styles.btn}>
                  <TouchableOpacity style={styles.btn2}
                  onPress={() => this.validaCurp()}
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
              <Text style={styles.modaltext}>Telefono celular propio.</Text>
              <Text style={styles.modaltext2}>Recuerda que por fines de provacidad es importante que lo realices desde tu telefono celular propio.</Text>


  

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
  );
}
}

const styles = StyleSheet.create({
    title: {
    color: "black",
    textAlign: 'center',
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
     marginBottom: 20
    },
    logo2: {
        width: 250,
        height: 150,
        display: 'flex',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 20,
        marginTop: 30,
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