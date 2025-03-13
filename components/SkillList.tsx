import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import LevelBar from './LevelBar';

interface SkillItem {
  name: string;
  value: number;
}

interface SkillListProps {
  data: SkillItem[];
  color: string;
}

export default function SkillList({ data, color }: SkillListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.levelContainer}>
            <LevelBar level={item.value} color={color} />
          </View>
        </View>
      )}
      keyExtractor={(item) => item.name}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
    height: 38,
  },
  name: {
    color: '#e3e3e3',
    fontSize: 14,
    maxWidth: '50%',
    fontWeight: 'bold',
  },
  levelContainer: {
    width: '48%',
  },
}); 