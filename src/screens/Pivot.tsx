
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet, Text } from 'react-native';
import { ViroARSceneNavigator } from '@viro-community/react-viro';
import Test from '../components/TestIa';

const Pivot = ()=>{
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        flex: 1,  // Add flex: 1 to make it take the full screen
        backgroundColor: isDarkMode ? '#f0f0f0' : '#f0f0f0',
    };

    return(
        <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ViroARSceneNavigator initialScene={{ scene: Test }} style={{ flex: 1 }} />
      </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    // Define your styles if needed
});

export default Pivot