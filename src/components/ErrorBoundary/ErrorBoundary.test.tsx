import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders fallback UI when an error occurs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const BrokenComponent = () => {
      throw new Error('Test error');
    };
    render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });

  it('calls componentDidCatch and logs error when an error occurs', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    const BrokenComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Caught error:',
      expect.any(Error)
    );
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Component Stack:',
      expect.any(String)
    );

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
