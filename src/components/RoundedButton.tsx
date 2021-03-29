import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../util';
import { IRoundedButtonProps } from '../interfaces';

export const RoundedButton:React.FC<IRoundedButtonProps> = ({ style = {}, textStyle = {}, size = 125, ...props }) => {
    return (
        <TouchableOpacity { ...props } style={ [styles(size).radius, style] }>
            <Text style={ [styles(size).text, textStyle] }>{ props.title }</Text>
        </TouchableOpacity>
    );
};

const styles = (size: number) =>
    StyleSheet.create({
        radius: {
            borderRadius: size / 2,
            width: size,
            height: size,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: colors.white,
            borderWidth: 2,
        },
        text: {
            color: colors.white,
            fontSize: size / 3,
        },
    });
