import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ProjectUser } from '../types/api42.types';

interface ProjectListProps {
  data: ProjectUser[];
}

export default function ProjectList({ data }: ProjectListProps) {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.name}>{item.project.name}</Text>

          <Text
            style={{
              color: item.final_mark ? item['validated?'] === true ? '#00ff00' : '#fe0202' : '#ffffffc7',
              fontWeight: item.final_mark ? 'bold' : 'normal',
              fontSize: item.final_mark ? 16 : 13
            }}
          >
            {item.final_mark ? item.final_mark : 'in progress'}
          </Text>
        </View>
      )}
      keyExtractor={(item) => item.project.name}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.25)',
  },
  name: {
    flex: 1,
    color: '#e7e5e5',
    fontSize: 16,
    maxWidth: 250,
    flexWrap: 'wrap',
  },
}); 