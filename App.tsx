import React, { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';

import { colors, spacing } from './src/util';

const App = () => {

    const [focusSubject, setFocusSubject] = useState<string | null>('gardening');

    return (
        <View style={ styles.container }>
            { focusSubject ? (
                <Timer focusSubject={ focusSubject } onTimerEnd = {()=>{
                    setFocusSubject(null)
                }}/>
            ) : (
                <Focus addSubject={ setFocusSubject }/>
            ) }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.xl,
        backgroundColor: colors.darkBlue,
    },
});

export default App;
