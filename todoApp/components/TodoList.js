import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { fetchTodos } from '../db/db';

const TodoList = ({ route, navigation }) => {
  const { groupId } = route.params;
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos(groupId, setTodos);
  }, []);

  return (
    <View>
      <Text>Todo List</Text>
      <Button title="Add Task" onPress={() => navigation.navigate('TaskForm', { groupId })} />
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('TaskDetail', { todo: item })}>
            <Text>{item.title} - {item.completed ? 'Completed' : 'Pending'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TodoList;
