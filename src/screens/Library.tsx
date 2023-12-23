
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet, Text } from 'react-native';

const Library = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        flex: 1,  // Add flex: 1 to make it take the full screen
        backgroundColor: isDarkMode ? '#f0f0f0' : '#f0f0f0',
    };

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <Text>
                ASdadsasdjads
            </Text>
            
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    // Define your styles if needed
});

export default Library