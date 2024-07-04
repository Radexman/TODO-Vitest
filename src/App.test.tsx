import { screen, render, fireEvent } from '@testing-library/react';
import App from './App';

describe('App should', () => {
  test('render correctly', () => {
    render(<App />);
    const listElement = screen.getByRole('list');
    expect(listElement).toBeInTheDocument();
  });

  test('render correct amount of items', () => {
    const initialState = [
      {
        taskName: 'task1',
        isDone: true,
      },
      {
        taskName: 'task2',
        isDone: true,
      },
      {
        taskName: 'task3',
        isDone: false,
      },
    ];
    render(<App />);
    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(initialState.length);
  });

  test('not render "Brak Zadań" is there are items in the tasks array', () => {
    render(<App />);
    const paragraphElement = screen.queryByText('Brak Zadań');
    expect(paragraphElement).not.toBeInTheDocument();
  });

  test('add a new task correctly', () => {
    render(<App />);
    const inputElement = screen.getByRole('textbox');
    const addButton = screen.getByRole('button', {
      name: /dodaj/i,
    });

    fireEvent.change(inputElement, { target: { value: 'new task' } });
    fireEvent.click(addButton);

    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(4);
    expect(screen.getByText('new task')).toBeInTheDocument();
  });

  test('delete task correctly', () => {
    render(<App />);

    const deleteButtons = screen.getAllByRole('button', {
      name: /usuń/i,
    });
    const deleteButton = deleteButtons[0];

    fireEvent.click(deleteButton);

    const listItemElements = screen.getAllByRole('listitem');
    expect(listItemElements).toHaveLength(2);
  });
});
