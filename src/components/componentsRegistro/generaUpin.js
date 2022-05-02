import React from 'react';
import { StyleSheet, Text, View, Image, Linking, TextInput, Alert, TouchableOpacity } from "react-native";
import logo from "../../../assets/img/logo.png";


export default class GeneraUpin extends React.Component{


async  validandoObj(){
  const ojbM={telefono:this.props.route.params.telefono,curp:this.props.route.params.curp};
  //console.log(ojbM);
  this.props.navigation.navigate('CrearUpin',ojbM)
}

render(){
  return (
    <View style={{backgroundColor: 'white'}}>
        <Image style={styles.logo} source={logo}/>
         <Text style={styles.title}>A continuacion genera tu uPIN de 6 números secretos y no lo compartas con nadie.</Text>
         <Image style={styles.logo2} source={logo}/>

        <View style={styles.btn}>
        <TouchableOpacity style={styles.btn2}
            onPress={() =>
              this.validandoObj()
            } 
            >
          <Text style={{color:'white'}}>ENTENDIDO</Text>
          </TouchableOpacity>
        
        </View>

         </View>
  );}
}

const styles = StyleSheet.create({
    title: {
     color: "black",
     marginLeft: '10',
     marginRight: '10',
     textAlign: 'center',
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
 
 });