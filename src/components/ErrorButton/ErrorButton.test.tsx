import { render, screen, fireEvent } from '@testing-library/react';
import ErrorButton from './ErrorButton';

describe('ErrorButton', () => {
  it('calls onError when the button is clicked', () => {
    const mockOnError = jest.fn();
    render(<ErrorButton onError={mockOnError} />);

    const button = screen.getByRole('button', { name: 'Trigger an error' });
    fireEvent.click(button);

    expect(mockOnError).toHaveBeenCalledTimes(1);
  });
});
