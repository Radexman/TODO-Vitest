import { useState, useEffect } from 'react';
import styles from './Heading.module.css';
import type { HeadingProps } from './Heading.types';
import type { TaskType } from '../../types';

const Heading = ({
  tasks,
  isInputToggled,
  handleToggleInput,
}: HeadingProps) => {
  const [tasksText, setTasksText] = useState('');

  useEffect(() => {
    displayCorrectAmount(tasks);
  }, [tasks]);

  const displayCorrectAmount = (tasks: TaskType[] | null) => {
    if (tasks === null || tasks.length === 0) {
      setTasksText('0 zadań');
    } else if (tasks.length === 1) {
      setTasksText(`${tasks.length} zadanie`);
    } else if (tasks.length <= 4) {
      setTasksText(`${tasks.length} zadania`);
    } else {
      setTasksText(`${tasks.length} zadań`);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Do zrobienia</h1>
          <h2>{tasksText}</h2>
        </div>
        <button
          type="button"
          onClick={handleToggleInput}
          className={styles.button}
        >
          {isInputToggled ? '-' : '+'}
        </button>
      </header>
    </div>
  );
};

export default Heading;
