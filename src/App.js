import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import theme from './Utils/theme';
import { routes } from './Routes/routes';
import { Provider, useDispatch } from 'react-redux';
import store from './Redux/store';
import { currUser } from './Utils/helpers';
import Login from './Components/Auth/Login';
import { useSelector } from 'react-redux';
import { setCurrUser } from './Redux/Actions/auth';
import TabRoute from './Routes/tabRoute';

const Stack = createStackNavigator()

function Router() {
  const { data, loading } = useSelector(({ auth: { currUser } }) =>currUser);
  const routesArray = data ? routes.filter(r =>r.name !== 'login' || r.name !== 'signup'): routes;
  const dispatch = useDispatch();

  useEffect(() => {
    (async() =>{
      const data = await currUser();
      setCurrUser(data)(dispatch)
    })()
    return () => {
    }
  }, [])

  return (
      <NativeBaseProvider>
        <StatusBar backgroundColor={theme.primary} />
        {
          loading ?
          <View style={styles.container}>
            <Text>Chargement...</Text>
          </View>:
          <NavigationContainer>
          <Stack.Navigator initialRouteName={data._id ? 'tab': 'login'} screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
          }}>
            {
              routesArray.map(route =>(
                <Stack.Screen key={route.name} options={{ headerShown: route.withHeader, unmountOnBlur: true, title: route.title }} name={route.name} >
                  {(props) =>(
                    route.protected && !data._id ?
                    <Login {...props} />:
                    route.autPage && data._id ?
                    <TabRoute {...props} />:
                    <route.component {...props} />
                  )}
                </Stack.Screen>
              ))
            }
          </Stack.Navigator>
        </NavigationContainer>
        }
      </NativeBaseProvider>
  );
};

export default function App(){

  return(
    <Provider store={store}>
      <Router />
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
