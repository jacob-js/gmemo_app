import React, { PureComponent, useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { RNCamera } from 'react-native-camera';
import Icon from "react-native-vector-icons/AntDesign";

export default class Camera extends PureComponent {

    render(){
        const { setCamera, setData } = this.props;
        this.state = {
            data: {}
        }
        
        return(
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    captureAudio={false}
                    
                    androidCameraPermissionOptions={{
                        title: "Permission d'acceder à la camera",
                        message: "GMemo a besoin de votre authorisation pour utiliser la camera",
                        buttonPositive: 'Accorder',
                        buttonNegative: 'Refusser',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    //     console.log(barcodes);
                    // }}

                    onTextRecognized={data => this.recognizeText(data)}
                />
                <TouchableOpacity onPress={() =>setCamera(false)} style={styles.capture}>
                    <Icon name='close' size={30} color='black' />
                </TouchableOpacity>
            </View>
        )
    }

    recognizeText = async(res) =>{
        const { setCamera, setData, stackNav, data } = this.props;
        const {textBlocks} = res;
        let arr = [];
        const cName = "CARTE D'ELECTEUR";
        if(textBlocks.length > 0){
            await textBlocks.forEach((block, index) =>{
                arr.push({ index: index, value: block.value })
            });
            const card = arr.find(elmt => elmt.value.indexOf(cName) === 0);
            const cardNum = arr.find(elmt => elmt.value.indexOf("NN") !== -1 );
            const name1 = arr.find(elmt => elmt.value.indexOf("Nom") === 0);
            const name2 = arr.find(elmt => elmt.value.indexOf("Post") === 0);
            const address = arr.find(elmt => elmt.value.indexOf("Adresse") === 0);
            const regex = new RegExp('/', 'g')
            if(cardNum && name1 && name2 && address){
                const numIndex = cardNum.value.indexOf("NN");
                const numCard = cardNum.value.substr(numIndex + 2);
                const lsNameIndex = name2.value.indexOf("Pr");
                const lsName = name2.value.substr(lsNameIndex + 8).replace(regex, ' ')
                const adIndex = address.value.indexOf('Ad');
                const add = address.value.substr(adIndex + 8, 30).replace(regex, ' ');
                this.setState({
                    data: { cardNum: numCard, firstName: name1, lastName: lsName, address: address }
                });
                setData({ cardNum: numCard, firstName: name1.value.split(' ')[1],
                     lastName: lsName,
                     address: add });
                console.log("name", name1.value.split(' ')[1]);
                console.log("name2", lsName);
                console.log("cardNum", numCard);
                console.log("address", add);
                // setCamera(false);
                stackNav.navigate('personForm', { cardNum: numCard, firstName: name1.value.split(' ')[1],lastName: lsName, address: add })
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    preview: {
      flex: 0.6,
      width: Dimensions.get('window').width / 1.2,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'white',
      borderWidth: 3
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
});
  