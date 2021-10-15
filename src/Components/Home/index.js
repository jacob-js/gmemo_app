import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native'
import theme from '../../Utils/theme'
import Icon from 'react-native-vector-icons/Feather';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Camera from '../Camera';
import { currUser } from '../../Utils/helpers';

export default function Home({stackNav}) {
    const [scaleValue] = useState(new Animated.Value(-50));
    const [camera, setcamera] = useState(false)
    const [data, setData] = useState({});
    const [ cred, setCred ] = useState({ company: {} });

    useEffect(() =>{
        (() =>{
            Animated.spring(scaleValue, {
                toValue: 0,
                velocity: 100,
                useNativeDriver: true
            }).start()
        })()
    }, []);

    useEffect(() =>{
        (async() =>{
            const data = await currUser()
            setCred(data)
        })()
    }, [])

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: scaleValue }] }]}>
            <View style={styles.intro}>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                    <MIcon name='warehouse' size={18} /> { cred.company.name }
                </Text>
                <Text style={{color: 'rgba(0, 0, 0, 0.5)'}}> { cred.company.companyPhone } </Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>Votre registre graphique de toutes les personnes entrées et sorties au sein de votre organisation pour une meuillere 
                    assurance de la securité
                </Text>
                <TouchableOpacity onPress={() =>setcamera(true)} style={styles.addBtn}>
                    <Icon name='user-plus' color='white' size={30} />
                </TouchableOpacity>
                {
                    camera && <Camera setData={setData} data={data} setCamera={setcamera} stackNav={stackNav} />
                }
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        backgroundColor: 'white'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: theme.primary300,
        fontSize: 15,
        fontWeight: '100',
        textAlign: 'center',
        paddingHorizontal: 40
    },
    addBtn: {
        width: '40%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.primary,
        borderTopLeftRadius: 50,
        borderBottomRightRadius: 50,
        marginTop: 20
    },
    intro: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        color: 'black',
        padding: 10
    }
})