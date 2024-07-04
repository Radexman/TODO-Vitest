import { screen, render, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem component should', () => {
  test('render with correct task name and delete button', () => {
    const handleComplete = vi.fn();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        taskName="Clean room"
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    );

    const taskNameElement = screen.getByText(/clean room/i);
    expect(taskNameElement).toBeInTheDocument();

    const deleteButtonElement = screen.getByRole('button', {
      name: /usuń/i,
    });
    expect(deleteButtonElement).toBeInTheDocument();
  });

  test('render "Zrobione" button if isDone is false', () => {
    const handleComplete = vi.fn();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        taskName="Clean room"
        isDone={false}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    );

    const doneButtonElement = screen.getByRole('button', {
      name: /zrobione/i,
    });
    expect(doneButtonElement).toBeInTheDocument();
  });

  test('does not render "Zrobione" button if isDone is true', () => {
    const handleComplete = vi.fn();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        taskName="Clean room"
        isDone={true}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    );

    const doneButtonElement = screen.queryByRole('button', {
      name: /zrobione/i,
    });
    expect(doneButtonElement).not.toBeInTheDocument();
  });

  test('call handleComplete once on "Zrobione" button click', () => {
    const handleComplete = vi.fn();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        taskName="Clean room"
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    );

    const doneButtonElement = screen.getByRole('button', {
      name: /zrobione/i,
    });
    fireEvent.click(doneButtonElement);

    expect(handleComplete).toHaveBeenCalledTimes(1);
  });

  test('call handleDelete once on "Usuń" button click', () => {
    const handleComplete = vi.fn();
    const handleDelete = vi.fn();
    render(
      <TodoItem
        taskName="Clean room"
        isDone={true}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
      />
    );

    const deleteButtonElement = screen.getByRole('button', {
      name: /usuń/i,
    });
    fireEvent.click(deleteButtonElement);

    expect(handleDelete).toHaveBeenCalledTimes(1);
  });
});
