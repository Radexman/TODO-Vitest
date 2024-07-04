import { screen, render, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';

describe('Button component should', () => {
  test('render correctly with given text', () => {
    render(<Button onClick={() => {}}>Click</Button>);

    const buttonElement = screen.getByRole('button', {
      name: /click/i,
    });

    expect(buttonElement).toBeInTheDocument();
  });

  test('have correct passed attribute', () => {
    render(
      <Button type="submit" onClick={() => {}}>
        Click
      </Button>
    );

    const buttonElement = screen.getByRole('button', {
      name: /click/i,
    });

    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  test('have correct default attribute', () => {
    render(<Button onClick={() => {}}>Click</Button>);

    const buttonElement = screen.getByRole('button', {
      name: /click/i,
    });

    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  test('execute onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);

    const buttonElement = screen.getByRole('button', {
      name: /click/i,
    });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
