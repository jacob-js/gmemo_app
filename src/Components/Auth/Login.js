import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Alert, Button, CloseIcon, FormControl, HStack, IconButton, Input, VStack} from 'native-base'
import theme from '../../Utils/theme'
import { CommonInput } from '../../Commons/commons'
import Icon from 'react-native-vector-icons/FontAwesome'
import FIcon from 'react-native-vector-icons/Feather'
import SIcon from 'react-native-vector-icons/SimpleLineIcons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as yup from 'yup';
import { Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Redux/Actions/auth'

export default function Login({navigation}) {
    const [visible, setVisible] = useState(false)
    const [translateAnim] = useState(new Animated.Value(-Dimensions.get('window').width * 2));
    const { error, loading } = useSelector(({ auth: { loginState } }) =>loginState);
    const dispatch = useDispatch()

    const translateIn = () =>{
        Animated.spring(translateAnim, {
            toValue: 0,
            velocity: 50,
            useNativeDriver: true
        }).start()
    };

    useEffect(() =>{
        translateIn()
    }, [])

    const validationSchema = yup.object({
        username: yup.string().required("le nom d'utilisateur est obligatoire"),
        password: yup.string().required("le mot de passe est obligatoire")
    });

    const submit = (values) =>{
        login(values, navigation)(dispatch);
    };

    const errors = typeof(error) === 'string' && error !== '' ? error.split(','): [];

    return (
        <ScrollView
            style={styles.viewContainer}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.bg}>
                <View style={styles.brandView}>
                    <Text style={styles.brandViewText}>gMemo</Text>
                </View>
            </View>
            {/* Bottom view */}

            <View style={styles.bottomView}>
                
                {/* Welcome view */}
                <View style={{ padding: 40 }}>
                    <Text style={{ color: theme.primary, fontSize: 34 }} >Bienvenue</Text>
                    <Text>Vous etes nouveau ?
                        <Text style={{ color: theme.primary300}} onPress={() =>navigation.navigate('signup')}> Enregistrez-vous </Text>
                    </Text>

                    {/* Forms view */}
                    <Animated.View style={{ marginTop: 30, transform: [{ translateX: translateAnim }] }}>
                        {
                            <View style={{ marginBottom: 20 }}>
                                {
                                    errors.map((err, index) =>(
                                        <Alert w="100%" status='error' key={index}>
                                            <VStack space={2} flexShrink={1} w="100%">
                                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                                <HStack space={2} flexShrink={1}>
                                                <Alert.Icon mt="1" />
                                                <Text fontSize="md" color="coolGray.800">
                                                    {err}
                                                </Text>
                                                </HStack>
                                            </HStack>
                                            </VStack>
                                        </Alert>
                                    ))
                                }
                            </View>
                        }
                        <Formik
                            initialValues={{ username: '', password: '' }}
                            validationSchema={validationSchema}
                            onSubmit={values => submit(values)}
                        >
                            {({ handleSubmit, errors, handleChange }) =>(
                                <>
                                    
                                    <CommonInput required error={errors.username} label="Nom d'utilisateur" onChangeText={handleChange('username')} 
                                        placeholder='username' leftIcon={<SIcon name="user" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} />
                                    <CommonInput required error={errors.password} onChangeText={handleChange('password')} placeholder='password' 
                                        label='Mot de passe' leftIcon={<MIcon name="key-outline" size={15} color='rgba(0, 0, 0, 0.6)' style={{ marginLeft: 15 }} />} 
                                        type={!visible && 'password'}
                                        rightIcon={ <TouchableOpacity onPress={() =>setVisible(!visible)}>
                                            <FIcon style={{ fontSize: 15, marginRight: 15 }} name={visible ? 'eye': 'eye-off'} />
                                        </TouchableOpacity> } />

                                    <View style={{
                                        height: 100,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Button isLoading={loading} isLoadingText={<Text style={{ color: 'white' }}>Patientez...</Text>}
                                         rounded={100} style={styles.loginBtn} onPress={handleSubmit}>Connexion</Button>
                                    </View>
                                </>
                            )}
                        </Formik>
                    </Animated.View> 
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
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
        bottom: 50
    },
    loginBtn: {
        backgroundColor: theme.primary,
        width: Dimensions.get('window').width /2,
        shadowOpacity: 0.4,
        shadowColor: theme.primary, 
        elevation: 15
    }
})
