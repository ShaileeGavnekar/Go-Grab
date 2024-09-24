import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { addGroup, fetchGroups } from '../db/db';

const GroupList = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchGroups(setGroups);
  }, []);

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup(groupName, () => {
        setGroupName('');
        fetchGroups(setGroups); 
      });
    }
  };

  return (
    <View>
      <Text>Groups</Text>
      <TextInput
        placeholder="New Group Name"
        value={groupName}
        onChangeText={setGroupName}
      />
      <Button title="Add Group" onPress={handleAddGroup} />
      
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TodoList', { groupId: item.id })}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default GroupList;
