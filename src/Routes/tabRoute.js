import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, {useRef} from 'react'
import { View, Text, StatusBar } from 'react-native';
import { tabRoutes } from './routes';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import theme from '../Utils/theme';
import TabBar from './tabBar';

const Tab = createBottomTabNavigator()

const tabs = {
    Accueil: {
      icon: {
        component: <Icon name="home" />
      },
      background: {
        activeColor: theme.primary100,
        inactiveColor: 'white'
      }
    },
    Personnes: {
      icon: {
        component: <FIcon name="users" />
      },
      background: {
        activeColor: theme.primary100,
        inactiveColor: 'white'
      }
    },
    Parametres: {
      icon: {
        component: <Icon name="setting" />
      },
      background: {
        activeColor: theme.primary100,
        inactiveColor: 'white'
      }
    }
  }
  

export default function TabRoute(props) {
  const stackNavigation = props.navigation;

  return (
      <Tab.Navigator
          screenOptions={{
              header: () => <StatusBar translucent={true} style="light" backgroundColor={theme.primary} />,
              tabBarStyle: {
                position: 'absolute',
                // paddingHorizontal: 20,
                width: '90%',
                marginLeft: '5%',
                marginBottom: 20,
                borderRadius: 50,
                height: 55,
              },
              unmountOnBlur: true
          }}
          tabBar={props => <TabBar {...props} /> }
      >
          {
              tabRoutes.map((route, index) =>(
                  <Tab.Screen key={index} options={{title: route.title,  tabBarIcon: ({ size, color }) =><FIcon name={route.icon} size={size-5} color={color} />}}
                      name={route.name}>
                        {(props) =><route.component {...props} stackNav={stackNavigation} />}
                  </Tab.Screen>
              ))
          }
      </Tab.Navigator>
  )
}
