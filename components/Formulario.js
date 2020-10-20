import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Platform, View, TouchableHighlight,  
    TextInput, TouchableWithoutFeedback ,Animated,Alert} from 'react-native'
import { Picker } from '@react-native-community/picker'
const Formulario = ({busqueda,guardarBusqueda,guardarConsultar}) => {
    const {pais,ciudad}=busqueda
    const [animacionboton] = useState(new Animated.Value(1))
    const  consultarClima = () => {
      if(pais.trim() === '' || ciudad.trim() === ''){
          mostrarAlerta()
          return
      }
      guardarConsultar(true)
    }
    const mostrarAlerta = () => {
      Alert.alert(
          'Error',
          'Agrege una ciudad y pais',
          [{text:'Entendido'}]
      )
    }
    

    const animacionEntrada = () => {
      Animated.spring(animacionboton,{
          toValue:.7
      }).start()
    }
    const animacionSalida = () => {
        Animated.spring(animacionboton,{
            toValue:1,
            friction:4,
            tension:30
        }).start()
    }
    const estiloAnimacion = {
        transform:[{scale:animacionboton}]
    }
    return (
        <>
            <View >
                <View>
                    <TextInput
                    value={ciudad}
                        style={styles.input}
                        onChangeText={ciudad=>guardarBusqueda({...busqueda,ciudad})}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                    />
                </View>
                <View>
                    <Picker
                    selectedValue={pais}
                        itemStyle={{ height: 100, backgroundColor: '#fff' }}
                        onValueChange={pais => guardarBusqueda({...busqueda,pais})}
                    >
                        <Picker.Item label="- Seleccione un pais -" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="Ecuador" value="EC" />
                        <Picker.Item label="Mexico" value="MX" />
                        <Picker.Item label="Argentina" value="AR" />
                        <Picker.Item label="Colombia" value="CO" />
                        <Picker.Item label="cOSTA Rica" value="CR" />
                        <Picker.Item label="Espan" value="ES" />
                        <Picker.Item label="Peru" value="PE" />
                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={()=> animacionEntrada()}
                    onPressOut={()=> animacionSalida()}
                    onPress={()=>consultarClima()}
                >
                    <Animated.View
                        style={[styles.btnBuscar,estiloAnimacion]}
                    >
                        <Text style={styles.txtBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#fff',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: '#000',
        padding: 10,
        justifyContent: 'center'
    },
    txtBuscar: {
        color:'#fff',
        fontWeight:"bold",
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18

    }
});
export default Formulario
