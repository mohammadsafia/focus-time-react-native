import React, { useState } from 'react';
import { Platform, StyleSheet, Text, Vibration, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { Timing } from './Timing';

import { colors, spacing } from '../../util';

import { ITimerComponentProps } from '../../interfaces';

const DEFAULT_TIME = 1;

export const Timer: React.FC<ITimerComponentProps> = ({ focusSubject, onTimerEnd }) => {
    useKeepAwake();

    const [minutes, setMinutes] = useState<number>(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(1);

    const onProgress = (progress: number) => {
        setProgress(progress);
    };

    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);

            setTimeout(() => clearInterval(interval), 10000);
        }
        else {
            Vibration.vibrate(10000);
        }
    };

    const clearState = (min: number) => {
        setMinutes(min);
        setProgress(1);
        setIsStarted(false);
    };

    const onEnd = () => {
        vibrate();
        clearState(DEFAULT_TIME);
        onTimerEnd();
    };

    const changeTime = (min: number) => {
        clearState(min);
    };

    return (
        <View style={ styles.container }>
            <View style={ styles.countdown }>
                <Countdown minutes={ minutes } isPaused={ !isStarted } onProgress={ onProgress } onEnd={ onEnd }/>
            </View>

            <View style={ { paddingTop: spacing.xxxxl } }>
                <Text style={ styles.title }>Focusing on:</Text>
                <Text style={ styles.task }>{ focusSubject }</Text>
            </View>

            <View style={ { paddingTop: spacing.sm } }>
                <ProgressBar progress={ progress } color="#5E84E2" style={ { height: 10 } }/>
            </View>

            <View style={ styles.buttonWrapper }>
                <Timing onChangeTime={ changeTime }/>
            </View>

            <View style={ styles.buttonWrapper }>
                { isStarted ? (
                    <RoundedButton onPress={ () => setIsStarted(false) } title="pause"/>
                ) : (
                    <RoundedButton onPress={ () => setIsStarted(true) } title="start"/>
                ) }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
