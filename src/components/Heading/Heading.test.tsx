import { screen, render, fireEvent } from '@testing-library/react';
import type { TaskType } from '../../types';
import Heading from './Heading';

describe('Heading component should', () => {
  test('render correctly', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
      {
        taskName: 'task 2',
        isDone: true,
      },
      {
        taskName: 'task 3',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();
    render(
      <Heading
        tasks={tasks}
        isInputToggled={true}
        handleToggleInput={handleToggleInput}
      />
    );

    const headingOneElement = screen.getByRole('heading', {
      level: 1,
      name: /do zrobienia/i,
    });
    expect(headingOneElement).toBeInTheDocument();
  });

  test('render "0 zadań" if tasks is null', () => {
    const tasks = null;
    const handleToggleInput = vi.fn();

    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const secondHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: /0 zadań/i,
    });
    expect(secondHeadingElement).toBeInTheDocument();
  });

  test('render "0 zadań" if tasks length is 0', () => {
    const tasks: TaskType[] = [];
    const handleToggleInput = vi.fn();

    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const secondHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: /0 zadań/i,
    });

    expect(secondHeadingElement).toBeInTheDocument();
  });

  test('render length of tasks with correct spelling "zadanie" if tasks length is 1', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();

    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const secondHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: /1 zadanie/i,
    });
    expect(secondHeadingElement).toBeInTheDocument();
  });

  test('render length of tasks with correct spelling "zadania" if tasks length is from 2 - 4', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
      {
        taskName: 'task 2',
        isDone: true,
      },
      {
        taskName: 'task 3',
        isDone: true,
      },
      {
        taskName: 'task 4',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();

    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const secondHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: /4 zadania/i,
    });
    expect(secondHeadingElement).toBeInTheDocument();
  });

  test('render length of tasks with correct spelling "zadań" if tasks length id 5 or more', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
      {
        taskName: 'task 2',
        isDone: true,
      },
      {
        taskName: 'task 3',
        isDone: true,
      },
      {
        taskName: 'task 4',
        isDone: true,
      },
      {
        taskName: 'task 5',
        isDone: true,
      },
      {
        taskName: 'task 6',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();

    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const secondHeadingElement = screen.getByRole('heading', {
      level: 2,
      name: /6 zadań/i,
    });
    expect(secondHeadingElement).toBeInTheDocument();
  });
});

describe('Plus button inside Heading component should', () => {
  test('render "-" if isInputToggled is false', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();
    render(
      <Heading
        tasks={tasks}
        isInputToggled={true}
        handleToggleInput={handleToggleInput}
      />
    );

    const toggleInputButtonElement = screen.getByRole('button', {
      name: '-',
    });

    expect(toggleInputButtonElement).toBeInTheDocument();
  });

  test('render "+" if isInputToggled is true', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();
    render(
      <Heading
        tasks={tasks}
        isInputToggled={false}
        handleToggleInput={handleToggleInput}
      />
    );

    const toggleInputButtonElement = screen.getByRole('button', {
      name: '+',
    });

    expect(toggleInputButtonElement).toBeInTheDocument();
  });

  test('toggle "-" button to "+" on handleToggleInput call and then on another click render back "-"', () => {
    const tasks: TaskType[] = [
      {
        taskName: 'task 1',
        isDone: true,
      },
    ];
    const handleToggleInput = vi.fn();
    render(
      <Heading
        tasks={tasks}
        isInputToggled={true}
        handleToggleInput={handleToggleInput}
      />
    );

    const toggleInputButtonElement = screen.getByRole('button', {
      name: '-',
    });
    fireEvent.click(toggleInputButtonElement);
    expect(handleToggleInput).toHaveBeenCalledTimes(1);
  });
});
