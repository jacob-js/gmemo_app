import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Button, FormControl, Input} from 'native-base'
import theme from '../../Utils/theme'
import { CommonInput } from '../../Commons/commons'
import Icon from 'react-native-vector-icons/FontAwesome'
import FIcon from 'react-native-vector-icons/Feather'
import { Formik } from 'formik'
import * as yup from 'yup';

export default function Signup({navigation}) {
   const [cValues, setCValues] = useState({ name: '', city: '', activity: '', email: '', phone: '' })
    const [visible, setVisible] = useState(false)
    const [active, setactive] = useState(1)
    const [uValues, setUValues] = useState({})
    const [translateAnim] = useState(new Animated.Value(-Dimensions.get('window').width * 2));

    const translateIn = () =>{
        Animated.spring(translateAnim, {
            toValue: 0,
            velocity: 50,
            useNativeDriver: true
        }).start()
    };

    const translateOut = () =>{
        Animated.spring(translateAnim, {
            toValue: Dimensions.get('window').width * 2,
            velocity: 50,
            useNativeDriver: true
        }).start()
    };

    useEffect(() =>{
        translateIn()
    }, [active]);

    const next = (values) =>{
        translateOut();
        setCValues(values);
        setTimeout(() => {
            setactive(2)
        }, 100);
    };

    const prev = () =>{
        translateOut()
        setTimeout(() => {
            setactive(1)
        }, 100);
    };

    const Credentials = (handleChange, errors) =>(
        <>
            <CommonInput required error={errors.chiefName} onChangeText={handleChange('chiefName')} 
                label="Nom du chef de l'entreprise" placeholder='(DG, CEO, CO-FOUNDER,...)' />
            <CommonInput required error={errors.chiefPhone} onChangeText={handleChange('chiefPhone')} 
                label="Téléphone du chef" placeholder='phone number' 
                leftIcon={<FIcon style={{ marginLeft:10 }} name="phone-call" />} />
            <CommonInput required error={errors.username} label="Nom d'utilisateur" onChangeText={handleChange('username')} 
                placeholder='username' leftIcon={<Icon name="user-o" style={{ marginLeft:10 }} />} />
            <CommonInput required error={errors.password} onChangeText={handleChange('password')} placeholder='password' 
                label='Mot de passe' leftIcon={<FIcon name="lock" style={{ marginLeft:10 }} />} type={!visible && 'password'}
                rightIcon={ <TouchableOpacity onPress={() =>setVisible(!visible)}>
                    <FIcon style={{ fontSize: 15, marginRight: 10 }} name={visible ? 'eye': 'eye-off'} />
                </TouchableOpacity> } />
            <CommonInput required error={errors.confirmPwd} onChangeText={handleChange('confirmPwd')}
                label='Confirmation mot de passe' placeholder='confirm password' leftIcon={<FIcon name="lock" style={{ marginLeft:10 }} />} type={!visible && 'password'}
                rightIcon={ <TouchableOpacity onPress={() =>setVisible(!visible)}>
                    <FIcon style={{ fontSize: 15, marginRight: 10 }} name={visible ? 'eye': 'eye-off'} />
                </TouchableOpacity> } />
        </>
    )

    const CompanyForm = (handleChange, errors, handleBlur) =>(
        <>
            <CommonInput required onBlur={handleBlur('name')} error={errors.name} label="Nom de l'entreprise" onChangeText={handleChange('name')} leftIcon={<Icon style={{ marginLeft:10 }} name="user-o" />} />
            <CommonInput required onBlur={handleBlur('phone')} error={errors.phone} label="Numéro de téléphone" kType='phone-pad' onChangeText={handleChange('phone')} leftIcon={<FIcon style={{ marginLeft:10 }} name="phone" />} />
            <CommonInput error={errors.email} label="Email de l'entreprise" kType='email-address' onChangeText={handleChange('email')} leftIcon={<FIcon style={{ marginLeft:10 }} name="mail" />} />
            <CommonInput required error={errors.city} label="Ville" onChangeText={handleChange('city')} leftIcon={<FIcon style={{ marginLeft:10 }} name="map-pin" />} />
            <CommonInput required error={errors.activity} label="Secteur d'activité" onChangeText={handleChange('activity')} leftIcon={<FIcon style={{ marginLeft:10 }} name="git-branch" />} />
        </>
    )

    const companyValidationSchema = yup.object({
        name: yup.string().required('le nom est obligatoire'),
        phone: yup.number().required("le numéro de téléphone est obligatoire"),
        email: yup.string().email("email incorrect"),
        city: yup.string().required("la ville est obligatoire"),
        activity: yup.string().required("le secteur d'activité est obligatoire"),
    });

    const credentialsValidationSchema = yup.object({
        username: yup.string().required("le nom d'utilisateur est obligatoire"),
        chiefName: yup.string().required('le nom du chef est obligatoire'),
        chiefPhone: yup.number().required("le numéro de téléphone est obligatoire"),
        password: yup.string().min(6).matches(/[a-z]/i, "votre mot de passe doit contenir aumoins une lettre")
                    .matches(/[0-9]/, "votre mot de passe doit contenir aumoins 1 chiffre")
                    .required("la ville est obligatoire"),
        confirmPwd: yup.string().when('password', {
            is: val => (val && val.length > 0 ? true: false),
            then: yup.string().oneOf([yup.ref('password')], "Les mots de passes ne correspondent pas")
        }).required("vous devez confirmer le mot de passe")
    })

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
                        <Text style={{ color: theme.primary, fontSize: 34 }} >Enregistrement</Text>
                        <Text>Avez-vous un compte ?
                            <Text onPress={() =>navigation.navigate('login')} style={{ color: theme.primary300}}> Conntectez-vous </Text>
                        </Text>

                        {/* Forms view */}
                        <View style={{ marginTop: 50}}>
                            {/* <CompanyForm /> */}
                            <Animated.View style={[active !== 1 && { display: 'none' }, { transform: [{ translateX: translateAnim }] }]}>
                                <Formik
                                    validationSchema={companyValidationSchema}
                                    initialValues={cValues}
                                    onSubmit={next}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors }) =>(
                                        <>
                                            {CompanyForm(handleChange, errors, handleBlur)}
                                            <View style={{
                                                height: 100,
                                                justifyContent: 'center',
                                                alignItems: 'flex-end'
                                            }}>
                                                <Button variant='subtle' endIcon={ <FIcon name='arrow-right' style={{ color: theme.primary }} /> } rounded={100} onPress={handleSubmit}>Suivant</Button>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                            </Animated.View>
                            <Animated.View style={[active !== 2 && { display: 'none' }, { transform: [{ translateX: translateAnim }] }]}>
                                <Formik
                                    validationSchema={credentialsValidationSchema}
                                    initialValues={{ username: '', chiefName: '', chiefPhone: '', password: '', confirmPwd: '' }}
                                    onSubmit={values => {setUValues(values)}}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors }) =>(
                                        <>
                                            {Credentials(handleChange, errors, values)}
                                            <View style={{
                                                marginTop: 50,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Button variant='subtle' endIcon={ <FIcon name='arrow-left' style={{ color: theme.primary }} /> } rounded={100} onPress={prev}></Button>
                                                <Button rounded={100} onPress={handleSubmit} style={styles.loginBtn}>Soumettre</Button>
                                            </View>
                                        </>
                                    )}
                                </Formik>
                            </Animated.View>
                            {/* login btn view */}
                        </View>

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
        top: -50
    },
    loginBtn: {
        backgroundColor: theme.primary,
        width: Dimensions.get('window').width /3.5,
        shadowOpacity: 0.4,
        shadowColor: theme.primary, 
        elevation: 15
    }
})
