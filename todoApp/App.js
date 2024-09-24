import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GroupList from './components/GroupList';
import TodoList from './components/TodoList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';
import { initDb } from './db/db';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    initDb(); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="GroupList" component={GroupList} />
        <Stack.Screen name="TodoList" component={TodoList} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
