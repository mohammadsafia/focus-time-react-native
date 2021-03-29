import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { ICountdownProps } from '../interfaces/count-down-model';
import { colors, fontSizes, spacing } from '../util';

const minutesToMillis = (min: number): number => min * 1000 * 60;

const formatTime = (time: number): string | number => time < 10 ? `0${ time }` : time;

export const Countdown: React.FC<ICountdownProps> = ({ minutes = 1, isPaused, onProgress,onEnd }) => {
    const [mille, setMillis] = useState<number>(minutesToMillis(minutes));

    const countDown = () => {
        setMillis((time: number) => {
            if (time === 0) {
                clearInterval(interval.current);
                onEnd();
                return time;
            }
            const timeLeft = time - 1000;
            onProgress(timeLeft / minutesToMillis(minutes));
            return timeLeft;
        });
    };

    useEffect(() => {
        setMillis(minutesToMillis(minutes));
    }, [minutes]);

    const interval: any = useRef(null);

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current);
            return;
        }

        interval.current = setInterval(countDown, 1000);

        return () => clearInterval(interval.current);
    }, [isPaused]);

    const minute: number = Math.floor(mille / 1000 / 60) % 60;
    const seconds: number = Math.floor(mille / 1000) % 60;

    return (
        <Text style={ styles.text }>{ formatTime(minute) }: { formatTime(seconds) }</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: fontSizes.xxxxl,
        fontWeight: 'bold',
        color: colors.white,
        padding: spacing.lg,
        backgroundColor: 'rgba(94,132,226,0.3)',
        textAlign: 'center',
    },
});
