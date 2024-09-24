import React from 'react';
import { View, Text, Button } from 'react-native';
import { deleteTodo, updateTodoStatus } from '../db/db';

const TaskDetail = ({ route, navigation }) => {
  const { todo } = route.params;

  const handleComplete = () => {
    updateTodoStatus(todo.id, todo.completed ? 0 : 1, () => {
      navigation.goBack();
    });
  };

  const handleDelete = () => {
    deleteTodo(todo.id, () => {
      navigation.goBack();
    });
  };

  return (
    <View>
      <Text>{todo.title}</Text>
      <Text>{todo.description}</Text>
      <Text>{todo.completed ? 'Completed' : 'Pending'}</Text>
      
      <Button title={todo.completed ? 'Mark as Pending' : 'Mark as Completed'} onPress={handleComplete} />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

export default TaskDetail;
