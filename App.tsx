import React, { useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { FocusHistory } from './src/features/focus/FocusHistory';

import { colors, spacing } from './src/util';

import { IFocusHistory, STATUSES, StringOrNull } from './src/interfaces';

const App = () => {

    const [focusSubject, setFocusSubject] = useState<StringOrNull>(null);
    const [focusHistory, setFocusHistory] = useState<IFocusHistory[]>([]);

    const addFocusHistorySubjectWithStatus = (subject: string, status: STATUSES) => {
        setFocusHistory([...focusHistory, { subject, status }]);
    };

    const onClear = () => {
    };

    return (
        <View style={ styles.container }>
            { focusSubject ? (
                <Timer
                    focusSubject={ focusSubject }
                    onTimerEnd={ () => {
                        addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETE);
                        setFocusSubject(null);
                    } }
                    clearSubject={ () => {
                        setFocusSubject(null);
                        addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELED);
                    } }
                />
            ) : (
                <>
                    <Focus addSubject={ setFocusSubject }/>
                    <FocusHistory focusHistory={ focusHistory } onClear={ () => onClear() }/>
                </>
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
