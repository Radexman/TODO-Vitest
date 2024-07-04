import Button from '../Button/Button';
import styles from './TodoItem.module.css';
import type { TodoItemProps } from './TodoItem.types';

const TodoItem = ({
  taskName,
  isDone = false,
  handleComplete,
  handleDelete,
}: TodoItemProps) => {
  return (
    <li className={styles.item}>
      <span className={`${styles.taskName} ${isDone && styles.done}`}>
        {taskName}
      </span>
      {!isDone && (
        <Button onClick={() => handleComplete(taskName)}>Zrobione</Button>
      )}
      <Button onClick={() => handleDelete(taskName)}>Usuń</Button>
    </li>
  );
};

export default TodoItem;
