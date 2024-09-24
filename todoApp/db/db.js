import * as SQLite from 'expo-sqlite';

// Open or create the SQLite database
const db = SQLite.openDatabase('todoApp.db');

// Initialize database tables
export const initDb = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, group_id INTEGER, completed INTEGER);'
    );
  });
};

// Insert group into the database
export const addGroup = (name, successCallback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO groups (name) VALUES (?)', [name], (_, result) => {
      successCallback(result);
    });
  });
};

// Fetch all groups
export const fetchGroups = (successCallback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM groups', [], (_, { rows }) => {
      successCallback(rows._array);
    });
  });
};

// Insert todo item into the database
export const addTodo = (title, description, groupId, successCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO todos (title, description, group_id, completed) VALUES (?, ?, ?, 0)',
      [title, description, groupId],
      (_, result) => {
        successCallback(result);
      }
    );
  });
};

// Fetch all todos for a specific group
export const fetchTodos = (groupId, successCallback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM todos WHERE group_id = ?', [groupId], (_, { rows }) => {
      successCallback(rows._array);
    });
  });
};

// Update todo item as completed or pending
export const updateTodoStatus = (id, completed, successCallback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE todos SET completed = ? WHERE id = ?', [completed, id], (_, result) => {
      successCallback(result);
    });
  });
};

// Delete a todo item
export const deleteTodo = (id, successCallback) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM todos WHERE id = ?', [id], (_, result) => {
      successCallback(result);
    });
  });
};
