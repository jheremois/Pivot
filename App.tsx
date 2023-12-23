import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Pivot from './src/screens/Pivot';
import Library from './src/screens/Library';
import { Text } from 'react-native';
import { BuildingLibraryIcon, CubeTransparentIcon } from "react-native-heroicons/outline";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function PivotTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Library"
      screenOptions={{
          tabBarStyle: { backgroundColor: "#515151", height: 80, paddingVertical: 5, borderTopColor: '#f0f0f020',},
          tabBarItemStyle: {justifyContent: 'center', alignItems: 'center'},
          tabBarLabelStyle: {marginBottom: 5,},
          headerShown: false,
          tabBarActiveTintColor: "#f0f0f0", 
          tabBarInactiveBackgroundColor: 'f0f0f880', 
      }}
    >
      <Tab.Screen name="Library" component={Library} 
        options={{
          tabBarIcon: ()=>(
            <BuildingLibraryIcon 
              width={30} height={30} 
              color="white"
              fill="white" size={42}
            />
          ),
          /* tabBarLabelStyle: {
              display: "none"
          } */
        }}
      />
      <Tab.Screen name="Pivot" component={Pivot}
        options={{
          tabBarIcon: ()=>(
            <CubeTransparentIcon
              width={30} height={30} 
              color="white"
              fill="white"
              size={42}
            />
          ),
          /* tabBarLabelStyle: {
              display: "none"
          } */
        }}
      />
    </Tab.Navigator>
  );
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PivotTabs"
          component={PivotTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
