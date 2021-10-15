import AsyncStorage from '@react-native-async-storage/async-storage';

export const currUser = async() =>{

    try {
        const cred = await AsyncStorage.getItem('credentials');
        // console.log(JSON.parse(cred));
        return JSON.parse(cred);
    } catch (error) {
        
    }
};

export const logout = async(nav) =>{
    await AsyncStorage.removeItem('credentials');
    await AsyncStorage.removeItem('token');
    nav.push('login')
}