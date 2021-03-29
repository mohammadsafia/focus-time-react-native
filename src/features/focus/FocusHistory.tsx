import React from 'react';
import { FlatList, ListRenderItemInfo, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { IFocusHistory, IFocusHistoryComponent, STATUSES } from '../../interfaces';

import { colors, fontSizes } from '../../util';

export const FocusHistory: React.FC<IFocusHistoryComponent> = ({ focusHistory, setFocusHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    };
    const HistoryItem = ({ item, index }: ListRenderItemInfo<IFocusHistory>): React.ReactElement => {
        return (
            <Text style={ styles(item.status).historyItem }>
                { item.subject }
            </Text>
        );
    };
    return (
        <View>
            <SafeAreaView style={ { flex: 1 } }>
                <Text style={ styles().title }>Things we've focused on</Text>
                { focusHistory && focusHistory.length && (
                    <FlatList
                        style={ { flex: 1 } }
                        contentContainerStyle={ { flex: 1, alignItems: 'center' } }
                        data={ focusHistory }
                        renderItem={ HistoryItem }
                    />
                ) }
            </SafeAreaView>
        </View>
    );
};
const styles = (status?: STATUSES) => StyleSheet.create({
    historyItem: {
        color: status && status > 1 ? 'red' : 'green',
        fontSize: fontSizes.md,
    },
    title: {
        color: colors.white,
        fontSize: fontSizes.lg,
    },
});


