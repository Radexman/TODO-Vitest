import { useState } from 'react';
import type { TaskType } from './types';
import styles from './App.module.css';
import Heading from './components/Heading/Heading';
import Form from './components/Form/Form';
import TodoItem from './components/TodoItem/TodoItem';

const initialState: TaskType[] = [
  {
    taskName: 'Wyrzucić śmieci',
    isDone: true,
  },
  {
    taskName: 'Zapłacić rachunki',
    isDone: false,
  },
  {
    taskName: 'Nakarmić psa',
    isDone: false,
  },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(initialState as []);
  const [isInputToggled, setIsInputToggled] = useState(true);

  const handleToggleInput = () => {
    setIsInputToggled((prevState) => !prevState);
  };

  const handleAdd = (task: string) => {
    const newTask: TaskType = {
      taskName: task,
      isDone: false,
    };

    setTasks((prevState) => [...prevState, newTask]);
  };

  const handleComplete = (id: string) => {
    setTasks((prevState) =>
      prevState.map((task: TaskType) =>
        task.taskName === id ? { ...task, isDone: true } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prevState) =>
      prevState.filter((task: TaskType) => task.taskName !== id && task)
    );
  };

  return (
    <div className={styles.container}>
      <Heading
        tasks={tasks}
        isInputToggled={isInputToggled}
        handleToggleInput={handleToggleInput}
      />
      <Form isInputToggled={isInputToggled} handleAdd={handleAdd} />
      {tasks === null || tasks.length === 0 ? (
        <p>Brak Zadań</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            const { taskName, isDone } = task;
            return (
              <TodoItem
                key={taskName}
                taskName={taskName}
                isDone={isDone}
                handleComplete={handleComplete}
                handleDelete={handleDelete}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default App;
