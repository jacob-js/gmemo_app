import React, { useEffect, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { tabRoutes } from './routes'
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import theme from '../Utils/theme';

const Label = ({text}) => {
    const labelSize = useRef(new Animated.Value(-10)).current;

    const animeLabel = () =>{
        Animated.spring(labelSize, {
            toValue: 0,
            velocity: 20,
            useNativeDriver: true
        }).start()
    };

    useEffect(() =>{
        animeLabel()
    }, [])

    return(
        <Animated.Text style={{ color: theme.primary, fontSize: 10, transform: [{ translateY: labelSize }] }} > {text} </Animated.Text>
    )
};

const AnimatedItem = ({route}) =>{
    const [itemSize, setItemSize] = useState(new Animated.Value(0))
    const tabWidth = Dimensions.get('window').width / 3.5;

    const animeSize = () =>{
        Animated.spring(itemSize, {
            toValue: 1,
            velocity: 50,
            useNativeDriver: true
        }).start()
    };

    useEffect(() => {
        animeSize()
    })

    return(
        <Animated.View style={[styles.item, {width: tabWidth}, styles.current, { transform: [{ scaleY: itemSize }] }]}>
            <Text style={{ marginBottom: -5 }}> <Icon name={route.icon} size={16} color={theme.primary} /> </Text>
             <Label text={route.title} />
        </Animated.View>
    )
}

export default function TabBar({ navigation, state, descriptors }) {
    const getRoute = (name) => state.routes.find(elmt => elmt.name === name);
    const tabWidth = Dimensions.get('window').width / 3.5;

    const onPress = (route) =>{
        navigation.navigate(route.name);
    };
    return (
        <View style={styles.container}>
            <View style={styles.tab}>
                {
                    tabRoutes.map((route, index) =>{
                        const isFocused = state.index === index;
                        return(
                            <TouchableOpacity onPress={() =>onPress(route)} accessibilityRole='button' key={index}>
                                {
                                    isFocused ?
                                    <AnimatedItem route={route} />
                                    :
                                    <View style={[styles.item, { width: tabWidth }]}>
                                        <Text style={{ marginBottom: -5 }}> <Icon name={route.icon} size={16} /> </Text>
                                    </View>
                                }
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        backgroundColor: 'white',
        marginLeft: '5%',
        padding: 10,
        paddingVertical: 5,
        marginBottom: 20,
        borderRadius: 50,
        height: 50,
        elevation: 30
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        height: '100%',
    },
    current: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        color: theme.primary,
        borderRadius: 50,
        paddingVertical: 20,
    }
})
