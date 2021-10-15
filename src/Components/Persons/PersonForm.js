import { Formik } from 'formik'
import { Button } from 'native-base';
import React, { useEffect, useState } from 'react'
import { View, Text, Animated, Dimensions, StyleSheet, ScrollView } from 'react-native'
import * as yup from 'yup'
import { CommonInput } from '../../Commons/commons';
import theme from '../../Utils/theme';
import Icon from 'react-native-vector-icons/FontAwesome'
import FIcon from 'react-native-vector-icons/Feather'

export default function PersonForm({route}) {
    const [translateAnim] = useState(new Animated.Value(-Dimensions.get('window').width * 2));
    const {firstName, lastName, cardNum, address} = route.params;

    useEffect(() =>{
        const translateIn = () =>{
            Animated.spring(translateAnim, {
                toValue: 0,
                velocity: 50,
                useNativeDriver: true
            }).start()
        };
        translateIn()
    }, []);

    const personValidationSchema = yup.object({
        fullname: yup.string().required("le nom de la personne est obligatoire"),
        cardNum: yup.string(),
        target: yup.string().required("Vous devez definir la cible"),
    })

    const Person = (handleChange, errors, values) =>(
        <>
            <CommonInput value={values.fullname} required error={errors.fullname} onChangeText={handleChange('fullname')} 
                label="Nom complet" placeholder='fullname' />
            <CommonInput required error={errors.cardNum} value={values.cardNum} label="N° de la carte" onChangeText={handleChange('cardNum')} 
                placeholder='Numéro de la carte' />
            <CommonInput required error={errors.address} value={values.address} label="Adresse" onChangeText={handleChange('address')} 
                placeholder='address' />
            <CommonInput required error={errors.cardNum} label="Bagage" value={values.luggage} onChangeText={handleChange('luggage')} 
                placeholder='(ordinateur,sac,..)' />
            <CommonInput required error={errors.target} label="Cible" value={values.target} onChangeText={handleChange('target')} 
                placeholder='(personne, bureau, salle) à visiter' />
        </>
    )


    return (
        <ScrollView>
            <Animated.View style={[ styles.container, { transform: [{ translateX: translateAnim }] }]}>
                <Formik
                    validationSchema={personValidationSchema}
                    initialValues={{ fullname: `${firstName} ${lastName}`, cardNum: cardNum, address: address, target: '', luggage: '' }}
                    onSubmit={values => {setUValues(values)}}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors }) =>(
                        <>
                            {Person(handleChange, errors, values)}
                            <View style={{
                                marginTop: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Button rounded={100} onPress={handleSubmit} style={styles.loginBtn}>Enregister</Button>
                            </View>
                        </>
                    )}
                </Formik>
            </Animated.View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 20
    },
    bg: {
        backgroundColor: theme.primary,
        height: Dimensions.get('window').height / 2.5,
        width: '100%'
    },
    brandView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandViewText: {
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: 'white',
        borderTopStartRadius: 60,
        top: -50
    },
    loginBtn: {
        backgroundColor: theme.primary,
        width: Dimensions.get('window').width /2,
        shadowOpacity: 0.4,
        shadowColor: theme.primary, 
        elevation: 15
    }
})