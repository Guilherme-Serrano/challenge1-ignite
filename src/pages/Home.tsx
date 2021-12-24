import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks(tasks.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
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
