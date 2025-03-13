import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type LevelBarProps = {
  level: number;
  color: string;
};

export default function LevelBar({ level, color }: LevelBarProps) {
  const levelNumber = Math.floor(level);
  const progress = (level % 1) * 100;

  return (
    <View style={styles.levelContainer}>
      <View style={styles.progressContainer}>
        <View style={[ styles.progressBar, { width: `${progress}%`, backgroundColor: color } ]}/>
        <Text style={styles.progressText}>
          Level {levelNumber.toString().padStart(2, '0')} - {progress.toFixed(0)}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
    minWidth: 30,
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 2,
    bottom: 0,
    textAlign: 'center',
  },
}); 