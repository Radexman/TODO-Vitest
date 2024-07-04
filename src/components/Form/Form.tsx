import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Form.module.css';
import type { FormProps } from './Form.types';
import Button from '../Button/Button';

const Form = ({ isInputToggled, handleAdd }: FormProps) => {
  const [task, setTask] = useState('');
  const [inputHelper, setInputHelper] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTask = event.target.value;
    setTask(inputTask);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!task || task.length <= 3) {
      setInputHelper(
        'Please fill the form, task has to be at least 4 characters long'
      );
      return;
    }

    handleAdd(task);
    setInputHelper('');
    setTask('');
  };

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmit} className={styles.form}>
        {isInputToggled && (
          <>
            <input
              type="text"
              className={styles.input}
              value={task}
              onChange={handleChange}
            />
            <Button type="submit">Dodaj</Button>
          </>
        )}
      </form>
      <p className={styles.helper}>{inputHelper}</p>
    </>
  );
};

export default Form;
