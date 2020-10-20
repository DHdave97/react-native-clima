

import React,{ useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';
import Formulario from './components/Formulario'
import Clima from './components/Clima'
import { act } from 'react-test-renderer';
const App = () => {
  const [busqueda,guardarBusqueda] = useState({
    ciudad:'',
    pais:''
  })
  const [consultar,guardarConsultar]=useState(false)
  const [resultado,guardarresultado]=useState({})
  const [bgcolor,guardarBgColor]=useState('rgb(71,149,212)')
  const {ciudad,pais} = busqueda
  useEffect(()=>{
    const consultarClima = async ()=>{
      if(consultar){
        const appId = '285f6b2b10469dcdc6cace3c5777f76b'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais},{country code}&appid=${appId}`
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          guardarresultado(resultado)
          guardarConsultar(false)
          //cambiar color de fondo
          const kelvin = 273.15
          const { main} = resultado
          const actual = main.temp - kelvin
          if(actual < 10){
            guardarBgColor('rgb(105,108,149)')
          }else if(actual >= 10 && actual < 25){
            guardarBgColor('rgb(71,149,212)')
          }else{
            guardarBgColor('rgb(178,28,61)')
          }
        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  },[consultar])
  const mostrarAlerta = () => {
    Alert.alert(
        'Error',
        'No hay resultados. Intente con otra ciudad',
        [{text:'Entendido'}]
    )
  }
  const ocultarTeclado = ()=>{
    Keyboard.dismiss()
  }
  const bgColorApp={
    backgroundColor:bgcolor
  }
  return (
    <>
      <TouchableWithoutFeedback
      onPress={()=>ocultarTeclado()}
      >
        <View style={[styles.app,bgColorApp]}>
          <View style={styles.contenido}>
            <Clima
              resultado={resultado}
            />
            <Formulario 
              busqueda={busqueda}
              guardarBusqueda={guardarBusqueda}
              guardarConsultar={guardarConsultar}
            />

          </View>
        </View>
      </TouchableWithoutFeedback>

    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
