import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/use-theme-color';

interface StatBarProps {
  name: string;
  value: number;
  max?: number;
}

export function StatBar({ name, value, max = 255 }: StatBarProps) {
  const percentage = (value / max) * 100;
  
  const textColor = useThemeColor({}, 'text');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.statName, { color: textColor }]}>
          {name
            .replace(/-/g, ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Text>
        <Text style={[styles.statValue, { color: textColor }]}>{value}</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statName: {
    fontSize: 14,
    fontFamily: 'Rubik-Medium',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  barBackground: {
    height: 6,
    backgroundColor: '#eee',
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: 6,
    backgroundColor: '#5631E8',
    borderRadius: 6,
  },
});