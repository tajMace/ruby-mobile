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
import { colours, spacing } from '../theme'
import DayCell from '../components/calendar/DayCell'

export default function CalendarScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.dayCell}>
                <DayCell 
                    date={new Date(2026, 0, 22)}
                    events={[]}
                    isCurrentMonth={true}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colours.dark,
        padding: spacing.md,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dayCell: {
        width: 80,
        height: 80
    }
});