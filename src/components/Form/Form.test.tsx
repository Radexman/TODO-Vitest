import { screen, render, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form component should', () => {
  test('render correctly', () => {
    const handleAdd = vi.fn();
    render(<Form isInputToggled handleAdd={handleAdd} />);

    const formElement = screen.getByTestId('form');
    expect(formElement).toBeInTheDocument();
  });

  test('render form group if isInputToggled is true', () => {
    const handleAdd = vi.fn();
    render(<Form isInputToggled handleAdd={handleAdd} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', {
      name: /dodaj/i,
    });

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  test('not render form group if isInputToggled is false', () => {
    const handleAdd = vi.fn();
    render(<Form isInputToggled={false} handleAdd={handleAdd} />);

    const inputElement = screen.queryByRole('textbox');
    const buttonElement = screen.queryByRole('button', {
      name: /dodaj/i,
    });

    expect(inputElement).not.toBeInTheDocument();
    expect(buttonElement).not.toBeInTheDocument();
  });

  test('call handleAdd on enter click on form element', () => {
    const handleAdd = vi.fn();
    render(<Form isInputToggled handleAdd={handleAdd} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', {
      name: /dodaj/i,
    });

    fireEvent.change(inputElement, { target: { value: 'New Task' } });
    fireEvent.click(buttonElement);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith('New Task');

    expect(inputElement).toHaveValue('');
  });

  test('display alert and does not call handleAdd on invalid input', () => {
    const handleAdd = vi.fn();
    render(<Form isInputToggled handleAdd={handleAdd} />);

    const inputElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', {
      name: /dodaj/i,
    });

    fireEvent.change(inputElement, { target: { value: 'abc' } });

    fireEvent.click(buttonElement);

    const alert = screen.getByText(
      'Please fill the form, task has to be at least 4 characters long'
    );
    expect(alert).toBeInTheDocument();
    expect(handleAdd).not.toHaveBeenCalled();
  });
});
