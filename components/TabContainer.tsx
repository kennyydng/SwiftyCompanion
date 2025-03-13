import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

interface TabButtonProps {
    title: string;
    isActive: boolean;
    onPress: () => void;
    coalitionColor: string;
}

const TabButton: React.FC<TabButtonProps> = ({ title, isActive, onPress, coalitionColor }) => (
    <TouchableOpacity
        style={[styles.tab, isActive && { borderBottomColor: coalitionColor }]}
        onPress={onPress}
    >
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>{title}</Text>
    </TouchableOpacity>
);

interface TabContainerProps {
    activeTab: 'projects' | 'skills';
    setActiveTab: (tab: 'projects' | 'skills') => void;
    coalitionColor: string;
}

const TabContainer: React.FC<TabContainerProps> = ({ activeTab, setActiveTab, coalitionColor }) => {
    return (
        <View style={styles.tabContainer}>
            <TabButton
                title="Projects"
                isActive={activeTab === 'projects'}
                onPress={() => setActiveTab('projects')}
                coalitionColor={coalitionColor}
            />
            <TabButton
                title="Skills"
                isActive={activeTab === 'skills'}
                onPress={() => setActiveTab('skills')}
                coalitionColor={coalitionColor}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        marginTop: 5,
        paddingHorizontal: 15,
        marginBottom: 1,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabText: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 16,
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
});

export default TabContainer; 