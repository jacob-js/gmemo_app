import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import IoIcon from 'react-native-vector-icons/Ionicons'
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/auth';
import { currUser } from '../../Utils/helpers';

export default function Settings({stackNav}) {
    const [scaleValue] = useState(new Animated.Value(-50));
    const [ cred, setCred ] = useState({ company: {} });
    const dispatch = useDispatch()

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

    const items = [
        {
            title: 'Données personnelles',
            icon: <IoIcon name='person' style={styles.itemIcon} />
        },
        {
            title: 'Synchroniser sur le cloud',
            icon: <IoIcon name='cloud-upload-outline' style={styles.itemIcon} />
        },
        {
            title: 'Faqs',
            icon: <IoIcon name='chatbubbles-outline' style={styles.itemIcon} />
        },
        {
            title: 'Communauté',
            icon: <Icon name='users' style={styles.itemIcon} />
        }
    ]

    return (
        <Animated.View style={[styles.container, { transform: [{ translateY: scaleValue }] }]}>
            <View style={styles.header}>
                <View style={styles.pIcon}>
                    <Text style={{ textAlign: 'center' }}><IoIcon name='person' color='gray' size={50}/></Text>
                </View>
                <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>@{cred.username}</Text>
                    <Text style={{ color: 'gray', fontWeight: '100', textTransform: 'uppercase' }}> {cred.company.name} </Text>
                </View>
            </View>

            <View style={styles.items}>
                {
                    items.map((item, index) =>(
                        <TouchableOpacity key={index} style={styles.item}>
                            <Text style={styles.iContainer}> {item.icon} </Text>
                            <Text style={styles.itemTitle}> {item.title} </Text>
                        </TouchableOpacity>
                    ))
                }
                <TouchableOpacity style={styles.item} onPress={() =>logout(stackNav)(dispatch)}>
                    <Text style={styles.iContainer}> <IoIcon name='log-out-outline' style={styles.logoutIcon} /> </Text>
                    <Text style={styles.logoutTitle}> Deconnexion </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 24,
        padding: 20,
        backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        borderBottomWidth: 1,
        paddingBottom: 20,
        paddingTop: 20
    },
    pIcon: {
        borderColor: 'rgba(0, 0, 0, 0.1)', borderWidth: 1, borderRadius: 100, width: 80,
        height: 80,
        alignContent: 'center',
        justifyContent: 'center',
        marginRight: 10,
        backgroundColor: 'white',
        elevation: 60
    },
    items: {
        marginTop: 20
    },
    iContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        padding: 10,
        borderRadius: 10
    },
    itemIcon: {
        color: 'gray',
        fontSize: 20
    },
    item: {
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    itemTitle: {
        fontWeight: 'bold',
        marginLeft: 20
    },
    logoutIcon: {
        fontSize: 20,
        color: 'rgba(202, 11, 0, 1)'
    },
    logoutTitle: {
        color: 'rgba(202, 11, 0, 1)',
        marginLeft: 20,
        fontWeight: 'bold'
    }
})