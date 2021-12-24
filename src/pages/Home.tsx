import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((task) => task.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

      return;
    }

    setTasks((oldState) => [
      ...oldState,
      {
        id: Number(new Date().getTime()),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    const updateTask = tasks.map((item) => {
      if (item.id === id) {
        if (item.done) {
          return {
            id: item.id,
            title: item.title,
            done: false,
          };
        } else {
          return {
            id: item.id,
            title: item.title,
            done: true,
          };
        }
      }

      return item;
    });

    setTasks(updateTask);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((item) => item.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updateTaskTitle = tasks.map((item) => {
      if (item.id === taskId) {
        if (item.done) {
          return {
            id: item.id,
            title: item.title,
            done: item.done,
          };
        } else {
          return {
            id: item.id,
            title: item.title,
            done: item.done,
          };
        }
      }

      return item;
    });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        editTask={handleEditTask}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
