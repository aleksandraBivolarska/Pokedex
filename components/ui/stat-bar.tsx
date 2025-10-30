import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatBarProps {
  name: string;
  value: number;
  max?: number; 
}

export function StatBar({ name, value, max = 255 }: StatBarProps) {
  const percentage = (value / max) * 100;

  return (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.statName}>
                {name
                    .replace(/-/g, ' ')                  
                    .split(' ')                          
                    .map((word) =>                       
                    word.charAt(0).toUpperCase() + word.slice(1)
                    )
                    .join(' ')}                          
                </Text>
                <Text style={styles.statValue}>{value}</Text>
        </View>
      <View style={styles.barBackground}>
        <View style={[styles.barFill, { width: `${percentage}%` }]} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  statName: {
    fontSize: 14,
    color: '#0E0940',
    fontWeight: '500',
    marginBottom: 4,
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
  statValue: {
    fontSize: 12,
    color: '#333',
    marginTop: 2,
  },
});
