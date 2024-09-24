import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addTodo } from '../db/db';

const TaskForm = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      addTodo(title, description, groupId, () => {
        navigation.goBack();
      });
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Task Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Task Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Task" onPress={handleSubmit} />
    </View>
  );
};

export default TaskForm;
