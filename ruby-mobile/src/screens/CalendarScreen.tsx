/**
 * =============<< ********* >>=============
 * Author       : Taj Macé
 * Email        : taj.mac101@gmail.com
 * Organization : Taj Macé
 * Created On   : 2026-01-21
 * Title        : CalendarScreen.tsx
 * Description  : displays Calendar events in month view
 * Copyright (c) 2025 Taj Macé.
 * =============<< ********* >>=============
 */

import { View, StyleSheet } from 'react-native'
import { calendarColors, spacing } from '../theme'
import MonthCard from '../components/calendar/MonthView';

export default function CalendarScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.monthCard}>
                <MonthCard />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: calendarColors.background,
        paddingVertical: spacing.xxl
    },
    monthCard: {
        flex: 1
    }
});