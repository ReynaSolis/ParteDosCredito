import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import ContextoUsuario from '../src/componentsInbox/context'
import MediaQuery from 'react-responsive'
import logo from '../assets/img/logo.png';

export default function WebcamComponent({ variableGuardado }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const [capturar, setCapturar] = useState(true)
  const [confirmar, setConfirmar] = useState(false)
  const [tomarOtra, setTomarOtra] = useState(false)
  const [foto, setFoto] = useState();


  //usar el contexto 
  const { domicilio, setDomicilio } = useContext(ContextoUsuario)
  const { nomina, setNomina } = useContext(ContextoUsuario)
  const { identificacion, setIdentificacion } = useContext(ContextoUsuario)
  const { credito, setCredito } = useContext(ContextoUsuario)
  const { identidad, setIdentidad } = useContext(ContextoUsuario)
  const { confirmarDocumentos, setConfirmarDatos } = useContext(ContextoUsuario)
  const { mostrarCamara, setMostarCamara } = useContext(ContextoUsuario)
  const { capturaCredito, setCapturaCredito } = useContext(ContextoUsuario)
  const { capturaNomina, setCapturaNomina } = useContext(ContextoUsuario)
  const { capturaIdentificacion, setCapturaIdentificacion } = useContext(ContextoUsuario)
  const { capturaDomicilio, setCapturaDomicilio } = useContext(ContextoUsuario)
  const { capturaIdentidad, setCapturaIdentidad } = useContext(ContextoUsuario)
  const {curp}=useContext(ContextoUsuario)

  const ref = useRef(null)

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  const capturarFoto = async () => {
    const options = { quality: 1, base64: true, fixOrientation: true, exif: true };
    await ref.current.takePictureAsync(options)

      .then(photo => {
        setFoto(photo)

        if (variableGuardado == "domicilio") {
          setCapturaDomicilio(photo)
        } else if (variableGuardado == "nomina") {
          setCapturaNomina(photo)
        } else if (variableGuardado == "identificacion") {
          setCapturaIdentificacion(photo)
        } else if (variableGuardado == "credito") {
          setCapturaCredito(photo)
        } else if (variableGuardado == "identidad") {
          setCapturaIdentidad(photo)
        }
      })

      .then(() => {
        setCapturar(false)
      })
  }

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ia], {type:mimeString});
  }

  const confirmarFoto = async() => {
    setMostarCamara(false)
    if (variableGuardado == "domicilio") {
      setDomicilio(true)
    }
    else if (variableGuardado == "nomina") {
      setNomina(true)
    }
    else if (variableGuardado == "identificacion") {
      setIdentificacion(true)
    }
    else if (variableGuardado == "credito") {
      setCredito(true)
    }
    else if (variableGuardado == "identidad") {
      
      let conversion= dataURItoBlob(foto.uri)
   
      const data = new FormData();
      data.append("file", conversion);
      data.append("fileName",curp+"/selfie.png")
      await fetch("https://labsdsmooi.execute-api.us-west-2.amazonaws.com/file/upload", {
        method: "post",
        body: data,
      })
      setIdentidad(true)
    }
  }

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
       

      {capturar &&
        <>
        
       <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
          <MediaQuery minDeviceWidth={530}>
          {variableGuardado != "identidad" &&
            <View style={{ flex: 1 }}>
              <Camera ref={ref} style={styles.camera} type={type} autoFocus={Camera.Constants.AutoFocus.on} >
                <Text style={styles.textCamera}>  </Text>
              </Camera>
            </View>
          }

          {variableGuardado == "identidad" &&
            <View style={{ flex: 1 }}>
              <Camera ref={ref} style={styles.camera_530} type={Camera.Constants.Type.front} autoFocus={Camera.Constants.AutoFocus.on} >
                <Text style={styles.textCamera_530}>  </Text>
              </Camera>
            </View>
          }

              <View style={{ marginTop: "5%", height: "5%", bottom: "5%" }}>
                 <TouchableOpacity style={{ height: "100%" }} onPress={capturarFoto} >
                   <View style={styles.vista_530}>
                    <Text style={styles.buttonText2}>CAPTURAR</Text>
                   </View>
                </TouchableOpacity>
             </View>
          </MediaQuery>
       </MediaQuery>   

       <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
          <MediaQuery maxDeviceWidth={529}>  
          {variableGuardado != "identidad" &&
            <View style={{ flex: 1 }}>
              <Camera ref={ref} style={styles.camera} type={type} autoFocus={Camera.Constants.AutoFocus.on} >
                <Text style={styles.textCamera}>  </Text>
              </Camera>
            </View>
          }

          {variableGuardado == "identidad" &&
            <View style={{ flex: 1 }}>
              <Camera ref={ref} style={styles.camera} type={Camera.Constants.Type.front} autoFocus={Camera.Constants.AutoFocus.on} >
                <Text style={styles.textCamera}>  </Text>
              </Camera>
            </View>
          }

          <View style={{ marginTop: "25%", height: "10%", bottom: "5%" }}>
            <TouchableOpacity style={{ height: "100%" }} onPress={capturarFoto} >
              <View style={styles.vista}>
                <Text style={styles.buttonText2}>CAPTURAR</Text>
              </View>
            </TouchableOpacity>
          </View>
          </MediaQuery>
       </MediaQuery> 
        </>
      }


      {!capturar &&
        <>
          <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
            <MediaQuery minDeviceWidth={530}>
              <View style={{ flex: 1 }}>
               <Image style={styles.logo_530}
                 source={{
                 uri: foto.uri
                 }} />
            
          </View>

          <View>
            <View style={{ marginTop: "5%", height: "35%" }}>
              <TouchableOpacity style={{ height: "100%", padding: "0%" }} onPress={() => setCapturar(true)}  >
                <View style={styles.vistaTomarOtra_530}>
                  <Text style={styles.buttonText2}>Tomar otra</Text>
                </View>
              </TouchableOpacity>
            </View>

           

            <View style={{ marginTop: "5%", height: "35%", bottom: "25%" }}>
              <TouchableOpacity onPress={confirmarFoto} style={{ height: "100%", padding: "0%" }}>
                <View style={styles.vistaConfirmar_530}>
                  <Text style={styles.buttonText2}>Confirmar</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/*} <View style={{ marginTop: "55%", height: "20%", bottom: "5%" }}>
                <button onClick={confirmarFoto}  disabled = {!confirmarDocumentos} style = {{height: "100%",background: 'none', outline: 'none', border: 'none'}} type = 'button'>
                  <View style={styles.vistaConfirmar1}>
                     <Text style={styles.buttonText}>Confirmar</Text>
                </View>
              </button>
            </View>*/}

          </View>

           {/*
              
               <View style={{ flex: 1 }}>
               <Image source={logo} style={styles.logo_530} />
                {/*}  <Image style={styles.imagenCapturada_530}
                   source={{
                   uri: foto.uri
                   }} />
               </View>

              <View>

               <View style={{ marginTop: "0%"}}>
                  <TouchableOpacity style={{ height: "100%", padding: "0%" }} onPress={() => setCapturar(true)}  >
                    <View style={styles.vistaTomarOtra_530}>
                       <Text style={styles.buttonText2_530}>Tomar otra</Text>
                    </View>
                  </TouchableOpacity>
                </View>

           

            <View style={{ marginTop: "5%", bottom: "25%" }}>
              <TouchableOpacity onPress={confirmarFoto} style={{ height: "100%", padding: "0%" }}>
                <View style={styles.vistaConfirmar_530}>
                  <Text style={styles.buttonText2_530}>Confirmar</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/*} <View style={{ marginTop: "55%", height: "20%", bottom: "5%" }}>
                <button onClick={confirmarFoto}  disabled = {!confirmarDocumentos} style = {{height: "100%",background: 'none', outline: 'none', border: 'none'}} type = 'button'>
                  <View style={styles.vistaConfirmar1}>
                     <Text style={styles.buttonText}>Confirmar</Text>
                </View>
              </button>
                  </View>

          </View>
            */}

          </MediaQuery>
       </MediaQuery> 

        <MediaQuery minDeviceWidth={400} device={{ deviceWidth: 1500 }}>
          <MediaQuery maxDeviceWidth={529}> 

          <View style={{ flex: 1 }}>
            <Image style={styles.imagenCapturada}
              source={{
                uri: foto.uri
              }} />
          </View>
          <View>
            <View style={{ marginTop: "35%", height: "25%" }}>
              <TouchableOpacity style={{ height: "100%", padding: "0%" }} onPress={() => setCapturar(true)}  >
                <View style={styles.vistaTomarOtra}>
                  <Text style={styles.buttonText2}>Tomar otra</Text>
                </View>
              </TouchableOpacity>
            </View>

           

            <View style={{ marginTop: "30%", height: "25%", bottom: "25%" }}>
              <TouchableOpacity onPress={confirmarFoto} style={{ height: "100%", padding: "0%" }}>
                <View style={styles.vistaConfirmar}>
                  <Text style={styles.buttonText2}>Confirmar</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/*} <View style={{ marginTop: "55%", height: "20%", bottom: "5%" }}>
                <button onClick={confirmarFoto}  disabled = {!confirmarDocumentos} style = {{height: "100%",background: 'none', outline: 'none', border: 'none'}} type = 'button'>
                  <View style={styles.vistaConfirmar1}>
                     <Text style={styles.buttonText}>Confirmar</Text>
                </View>
              </button>
            </View>*/}

          </View>


          </MediaQuery>
       </MediaQuery>  

          
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },

  camera: {
    marginTop: "5%",
    marginBottom: "5%",
    width: "100%",
    height: "100%",
  },
  textCamera: {
    marginTop: "1%",
    marginBottom: "100%",
    width: "100%",
    height: 200,
    "fontFamily": "Helvetica Neue LT Std",
  },

  logo_530: {
    width: 300,
    height: 500,
    alignSelf:"center"
  },
  camera_530: {
    marginTop: "1%",
    marginBottom: "1%",
    width: "40%",
    height: "40%",
    alignSelf:"center"
  },
  textCamera_530: {
    marginTop: "1%",
    marginBottom: "100%",
    width: "100%",
    height: 200,
    "fontFamily": "Helvetica Neue LT Std",
  },
  imagenCapturada: {
    marginTop: "20%",
    marginBottom: "100%",
    width: "100%",
    height: "100%",
  },
  imagenCapturada_530: {
    marginTop: "0%",
    marginBottom: "10%",
    width: "35%",
    height: "100%",
    alignSelf:"center"
  },
  buttonContainer: {
    width: "30%",
    height: "30%"
  },
  button: {
    top: "40%",
    width: "30%",
    height: "30%"
  },

  text: {
    fontSize: 15,
    "fontFamily": "Helvetica Neue LT Std",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    "fontFamily": "Helvetica Neue LT Std",
  },
  vista7: {
    backgroundColor: `#d3d3d3`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "50%",
    width: "100%",
  },
  vista: {
    backgroundColor: `rgba(206, 31, 40, 1)`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "80%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  vista_530: {
    backgroundColor: `rgba(206, 31, 40, 1)`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "65%",
    width: "55%",
    display: "flex",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  vistaConfirmar: {
    backgroundColor: `rgba(164, 167, 169, 1)"`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "80%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  vistaConfirmar_530: {
    backgroundColor: `rgba(164, 167, 169, 1)"`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "80%",
    width: "55%",
    display: "flex",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  vistaTomarOtra: {
    backgroundColor: `rgba(206, 31, 40, 1)`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "80%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },  
  vistaTomarOtra_530: {
    backgroundColor: `rgba(206, 31, 40, 1)`,
    borderRadius: 40,
    borderColor: "black",
    borderWidth: 2,
    height: "80%",
    width: "55%",
    display: "flex",
    alignSelf:"center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: 'center',
    paddingTop: "6%",
    paddingBottom: "6%",
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    "fontFamily": "Helvetica Neue LT Std",
  },
  buttonText2: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    "fontFamily": "Helvetica Neue LT Std",
  },
  buttonText2_530: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    "fontFamily": "Helvetica Neue LT Std",
  },
})

