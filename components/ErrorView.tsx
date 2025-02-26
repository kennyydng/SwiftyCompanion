import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from './ui/Text';
import { Button } from './ui/Button';

interface ErrorViewProps {
  message: string;
  onRetry: () => void;
}

export function ErrorView({ message, onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onRetry} title="Retry" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    textAlign: 'center',
    marginBottom: 20,
  },
}); 